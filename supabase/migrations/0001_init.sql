-- FundPatients MVP schema — Phase 1 (public site)
-- Run via `supabase db push` or paste into the Supabase SQL editor.

create extension if not exists "pgcrypto";

-- ============================================================
-- profiles
-- Extends auth.users. Created automatically on signup via trigger below.
-- ============================================================
create table if not exists profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  role text not null default 'donor'
    check (role in ('donor','requester','partner_admin','admin')),
  created_at timestamptz not null default now()
);

create function handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, full_name)
  values (new.id, new.raw_user_meta_data ->> 'full_name');
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function handle_new_user();

-- ============================================================
-- organizations
-- Medical partners (hospitals/clinics). Submitted via the "become a partner"
-- form (status starts 'pending'); an admin approves before a partner's name
-- or case count is shown publicly. No admin UI yet (phase 2) — approval
-- happens via the service role / SQL editor for now.
-- ============================================================
create table if not exists organizations (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  specialization text,
  year_established int,
  contact_email text not null,
  contact_phone text,
  reason text,
  status text not null default 'pending'
    check (status in ('pending','approved','rejected')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists organizations_status_idx on organizations(status);

-- ============================================================
-- cases
-- The "stories" — a beneficiary's fundraising case. Submitted via the
-- "request help" wizard (status starts 'pending'); an admin publishes it
-- before it's visible on /stories. organization_id is assigned by an admin
-- after verifying with a medical partner (nullable until then).
-- ============================================================
create table if not exists cases (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text not null,
  goal_amount numeric not null check (goal_amount > 0),
  currency text not null default 'NGN' check (currency in ('NGN','USD','EUR')),
  amount_raised numeric not null default 0 check (amount_raised >= 0),
  status text not null default 'pending'
    check (status in ('pending','published','fully_funded','closed')),
  beneficiary_name text not null,
  organization_id uuid references organizations(id),
  requester_name text not null,
  requester_phone text not null,
  requester_email text not null,
  cover_image_url text,
  location text,
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists cases_status_idx on cases(status);
create index if not exists cases_organization_id_idx on cases(organization_id);

-- ============================================================
-- donations
-- Written exclusively by server-side API routes with the service role key
-- (app/api/donations/{paystack,stripe}/{init,webhook}) — never directly from
-- the browser — so donor PII and payment state never need a public write
-- policy. amount_raised on `cases` is updated by the webhook handler once a
-- provider confirms payment.
-- ============================================================
create table if not exists donations (
  id uuid primary key default gen_random_uuid(),
  case_id uuid not null references cases(id) on delete cascade,
  donor_name text,
  donor_email text,
  amount numeric not null check (amount > 0),
  tip_amount numeric not null default 0 check (tip_amount >= 0),
  currency text not null check (currency in ('NGN','USD','EUR')),
  is_recurring boolean not null default false,
  relationship_to_patient text,
  message text,
  is_anonymous boolean not null default false,
  payment_provider text not null check (payment_provider in ('paystack','stripe')),
  payment_reference text,
  status text not null default 'pending' check (status in ('pending','paid','failed')),
  created_at timestamptz not null default now()
);

create index if not exists donations_case_id_idx on donations(case_id);
create unique index if not exists donations_payment_reference_idx
  on donations(payment_provider, payment_reference)
  where payment_reference is not null;

-- ============================================================
-- case_updates
-- Progress updates posted against a case. Written by partner/admin accounts
-- (phase 2 dashboard) — publicly readable once a case is published.
-- ============================================================
create table if not exists case_updates (
  id uuid primary key default gen_random_uuid(),
  case_id uuid not null references cases(id) on delete cascade,
  body text not null,
  published_at timestamptz not null default now()
);

create index if not exists case_updates_case_id_idx on case_updates(case_id);

-- ============================================================
-- case_comments
-- ============================================================
create table if not exists case_comments (
  id uuid primary key default gen_random_uuid(),
  case_id uuid not null references cases(id) on delete cascade,
  author_id uuid not null references auth.users(id) on delete cascade,
  body text not null,
  created_at timestamptz not null default now()
);

create index if not exists case_comments_case_id_idx on case_comments(case_id);

-- ============================================================
-- case_follows
-- ============================================================
create table if not exists case_follows (
  id uuid primary key default gen_random_uuid(),
  case_id uuid not null references cases(id) on delete cascade,
  follower_id uuid not null references auth.users(id) on delete cascade,
  created_at timestamptz not null default now(),
  unique (case_id, follower_id)
);

-- ============================================================
-- Row Level Security
-- Public (anon) traffic can only READ published cases / approved
-- organizations / their updates & comments. All writes to organizations,
-- cases, and donations happen server-side via the service role key (the
-- become-partner form, request-help wizard, and donate flow all post to
-- Next.js API routes) — so there are no anon/authenticated INSERT policies
-- on those tables. Comments and follows require a signed-in user.
-- ============================================================

alter table profiles enable row level security;
alter table organizations enable row level security;
alter table cases enable row level security;
alter table donations enable row level security;
alter table case_updates enable row level security;
alter table case_comments enable row level security;
alter table case_follows enable row level security;

create policy "users can read own profile" on profiles
  for select to authenticated using (auth.uid() = id);

create policy "users can update own profile" on profiles
  for update to authenticated using (auth.uid() = id) with check (auth.uid() = id);

create policy "anyone can read approved organizations" on organizations
  for select to anon, authenticated using (status = 'approved');

create policy "anyone can read published cases" on cases
  for select to anon, authenticated
  using (status in ('published','fully_funded','closed'));

create policy "anyone can read updates for visible cases" on case_updates
  for select to anon, authenticated using (
    exists (
      select 1 from cases
      where cases.id = case_updates.case_id
        and cases.status in ('published','fully_funded','closed')
    )
  );

create policy "anyone can read comments for visible cases" on case_comments
  for select to anon, authenticated using (
    exists (
      select 1 from cases
      where cases.id = case_comments.case_id
        and cases.status in ('published','fully_funded','closed')
    )
  );

create policy "authenticated users can comment" on case_comments
  for insert to authenticated with check (auth.uid() = author_id);

create policy "authenticated users can follow cases" on case_follows
  for all to authenticated using (auth.uid() = follower_id) with check (auth.uid() = follower_id);

-- ============================================================
-- Grants
-- RLS policies alone don't grant table access — Postgres also requires the
-- base GRANT below (Supabase's default template revokes it for new tables).
-- ============================================================

grant select on organizations, cases, case_updates to anon, authenticated;
grant select, insert on case_comments to authenticated;
grant select, insert, update, delete on case_follows to authenticated;
grant select, update on profiles to authenticated;

grant all on profiles, organizations, cases, donations, case_updates,
  case_comments, case_follows to service_role;

-- ============================================================
-- Storage buckets
-- ============================================================
insert into storage.buckets (id, name, public)
values ('case-covers', 'case-covers', true)
on conflict (id) do nothing;

insert into storage.buckets (id, name, public)
values ('organization-logos', 'organization-logos', true)
on conflict (id) do nothing;
