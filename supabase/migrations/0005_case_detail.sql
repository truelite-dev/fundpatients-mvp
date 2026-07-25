-- supporter count on cases (incremented when a donation is paid)
alter table cases add column if not exists supporter_count int4 not null default 0;

-- author_name denormalised on comments (captured at insert time)
alter table case_comments add column if not exists author_name text;

-- public-safe view of paid donations (donor_email stays hidden)
create or replace view case_public_donations as
  select
    id,
    case_id,
    case when is_anonymous = true then 'Anonymous'
         else coalesce(nullif(trim(donor_name), ''), 'Anonymous')
    end as display_name,
    amount,
    currency,
    message,
    created_at
  from donations
  where status = 'paid';

grant select on case_public_donations to anon, authenticated;

-- RLS on case_comments: allow anyone to read
do $$
begin
  if not exists (
    select 1 from pg_policies
    where schemaname = 'public' and tablename = 'case_comments' and policyname = 'Anyone can read comments'
  ) then
    execute 'create policy "Anyone can read comments" on case_comments for select to anon, authenticated using (true)';
  end if;
end $$;

-- RLS on case_follows: user can manage their own follows
do $$
begin
  if not exists (
    select 1 from pg_policies
    where schemaname = 'public' and tablename = 'case_follows' and policyname = 'User can manage own follows'
  ) then
    execute 'create policy "User can manage own follows" on case_follows for all to authenticated using (follower_id = auth.uid()) with check (follower_id = auth.uid())';
  end if;
end $$;
