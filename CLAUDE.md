# FundPatients — Web Frontend

## Project overview

Next.js 16 App Router app for FundPatients, a medical-crowdfunding platform connecting patients needing financial help for treatment with donors and verified medical partners. Rebuild of the previous Vite/React SPA (`web-qa.fundpatients.com`, Netlify), on the same stack pattern as the TrueLite frontend, deployed to **Vercel**.

**Phase 1 scope**: public-facing site only — home, case browsing, case detail, donation flow, request-help intake, about, partners directory, become-a-partner, and basic auth (login/register/forgot-password). No authenticated dashboards yet (donor/beneficiary/partner/admin) — that's a later phase.

## Stack

- **Framework**: Next.js 16 (App Router, Turbopack)
- **Database / Auth**: Supabase (Postgres + RLS + Auth)
- **Styling**: Tailwind CSS v4 with custom design tokens (see `app/globals.css`)
- **Animations**: `motion/react`
- **Payments**: Paystack (NGN) + Stripe (USD/EUR)
- **Deployment**: Vercel

## Design tokens

Sourced from `docs/Fund_Patients_Cheatsheet.pdf` (brand cheatsheet). Defined in `app/globals.css`:

- Fonts: `Bricolage Grotesque` (`--font-display`, headings) / `DM Sans` (`--font-sans`, body & UI)
- Colors: `--brand-forest` `#0B1F0E` (dark bg / primary text), `--brand-deep-green` `#1A6B2A` (primary/CTAs/links), `--brand-mint` `#6EE07A` (hover), `--brand-muted-sage` `#6B7C6E` (secondary text), `--brand-soft-sage` `#E4F7E6` (tinted backgrounds/pills)

Final page-level visual design is pending a Figma UI file — until it lands, pages should stay functionally correct with minimal/placeholder styling rather than being polished against guesswork.

## Route structure

```
app/
  (public)/          # No auth required
    page.tsx          # Homepage
    stories/           # Browse cases
      [caseId]/        # Case detail
    donate/            # Donation flow
    request-help/      # Beneficiary intake wizard
    about/
    partners/
      become/          # Become-a-partner form
  (auth)/
    login/ register/ forgot-password/ reset-password/
  api/
    donations/
      paystack/init route.ts, paystack/webhook route.ts
      stripe/init route.ts, stripe/webhook route.ts
```

## Environment variables

| Variable | Required | Description |
|----------|----------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Yes | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Yes | Supabase anon key |
| `SUPABASE_SERVICE_ROLE_KEY` | Yes | Supabase service role key (server only) |
| `PAYSTACK_SECRET_KEY` | Yes | Paystack secret key (server only) |
| `NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY` | Yes | Paystack public key |
| `STRIPE_SECRET_KEY` | Yes | Stripe secret key (server only) |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Yes | Stripe publishable key |
| `STRIPE_WEBHOOK_SECRET` | Yes | Stripe webhook signing secret |

## Database migrations

Located in `supabase/migrations/`. See migration file headers for details on each table.

## GitHub

- Repo: https://github.com/truelite-dev/fundpatients-mvp
- Org: `truelite-dev`

## Branching strategy

Never commit directly to `main`. Always create a feature branch (`git checkout -b feat/...` or `fix/...`), work there, and open a PR to merge into `main`.
