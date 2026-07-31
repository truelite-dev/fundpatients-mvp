import Link from "next/link";
import { ArrowRight, Building2, Phone, Stethoscope, CalendarDays } from "lucide-react";
import { listApprovedOrganizations } from "@/lib/organizations";
import { Reveal } from "@/components/motion/Reveal";

export const metadata = { title: "Partners | FundPatients" };

const specializations = [
  "Pediatrics", "Oncology", "Nephrology", "Orthopedics", "General surgery",
  "Cardiology", "Neurology", "Obstetrics", "Ophthalmology", "Dermatology",
];

const stats = [
  { value: "62+", label: "Verified partners" },
  { value: "18", label: "States covered" },
  { value: "₦2.4B+", label: "Disbursed to hospitals" },
  { value: "24h", label: "Average fund release" },
];

export default async function PartnersPage() {
  const organizations = await listApprovedOrganizations();

  return (
    <div className="flex flex-col">

      {/* ── Hero ── */}
      <section
        className="mx-[12px] mt-8 mb-6 overflow-hidden rounded-3xl sm:mx-[20px]"
        style={{ background: "linear-gradient(145deg, #1a6b35 0%, #0f3d1d 45%, #071a0d 100%)" }}
      >
        <div className="mx-auto max-w-[1250px] px-8 py-16 sm:px-14 sm:py-20 lg:grid lg:grid-cols-2 lg:items-center lg:gap-16">
          <div>
            <span className="inline-block rounded-full bg-brand-mint/15 px-4 py-1.5 text-xs font-semibold tracking-widest text-brand-mint uppercase">
              Medical network
            </span>
            <h1 className="mt-5 font-display text-4xl font-semibold leading-tight text-white sm:text-5xl">
              Trusted partners in care
            </h1>
            <p className="mt-5 text-base leading-relaxed text-white/70 sm:text-lg">
              Every fund released through FundPatients goes directly to a verified medical institution. Our partners are licensed, vetted, and committed to treating patients — not receipts.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/partners/become"
                className="inline-flex items-center gap-2 rounded-full bg-brand-mint px-6 py-3 text-sm font-semibold text-brand-forest transition hover:bg-white"
              >
                Become a partner <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href="#partners"
                className="inline-flex items-center gap-2 rounded-full border border-white/25 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                View all partners
              </a>
            </div>
          </div>

          {/* Stats */}
          <div className="mt-12 grid grid-cols-2 gap-4 lg:mt-0">
            {stats.map((s) => (
              <div key={s.label} className="rounded-2xl border border-white/10 bg-white/5 p-6">
                <p className="font-display text-3xl font-semibold text-brand-mint">{s.value}</p>
                <p className="mt-1 text-sm text-white/60">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Partner listing ── */}
      <section id="partners" className="mx-[12px] mb-6 overflow-hidden rounded-3xl bg-white px-8 py-16 sm:mx-[20px] sm:px-14 sm:py-20">
        <Reveal>
          <div className="mx-auto max-w-5xl">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-xs font-semibold tracking-widest text-brand-deep-green uppercase">Verified network</p>
                <h2 className="mt-2 font-display text-4xl font-semibold text-brand-forest">Our partners</h2>
                <p className="mt-2 text-brand-muted-sage">
                  Click any partner to see their profile and active cases.
                </p>
              </div>
              <Link
                href="/partners/become"
                className="mt-4 inline-flex shrink-0 items-center gap-2 rounded-full bg-brand-deep-green px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-forest sm:mt-0"
              >
                Become a partner <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>

            {organizations.length === 0 ? (
              <div className="mt-12 rounded-2xl border border-dashed border-border bg-background p-12 text-center">
                <Building2 className="mx-auto h-10 w-10 text-brand-soft-sage" />
                <p className="mt-4 font-display text-lg font-semibold text-brand-forest">No approved partners yet</p>
                <p className="mt-2 text-sm text-brand-muted-sage">Check back soon — our team is reviewing applications.</p>
              </div>
            ) : (
              <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {organizations.map((org) => (
                  <Link
                    key={org.id}
                    href={`/partners/${org.id}`}
                    className="group flex flex-col gap-3 rounded-2xl border border-border bg-background p-6 transition hover:-translate-y-0.5 hover:border-brand-deep-green/30 hover:shadow-[0_8px_24px_rgba(0,0,0,0.07)]"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gray-100 text-xl font-bold text-brand-deep-green">
                        {org.name.charAt(0).toUpperCase()}
                      </div>
                      <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-border transition group-hover:text-brand-deep-green" />
                    </div>
                    <div>
                      <h3 className="font-display text-lg font-semibold leading-snug text-brand-forest group-hover:text-brand-deep-green">
                        {org.name}
                      </h3>
                      {org.specialization && (
                        <p className="mt-1 flex items-center gap-1.5 text-xs text-brand-muted-sage">
                          <Stethoscope className="h-3 w-3" />
                          {org.specialization}
                        </p>
                      )}
                      {org.year_established && (
                        <p className="mt-1 flex items-center gap-1.5 text-xs text-brand-muted-sage">
                          <CalendarDays className="h-3 w-3" />
                          Est. {org.year_established}
                        </p>
                      )}
                    </div>
                    <span className="mt-auto inline-flex w-fit rounded-full bg-brand-soft-sage px-2.5 py-1 text-xs font-medium text-brand-deep-green">
                      Verified partner
                    </span>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </Reveal>
      </section>

      {/* ── How we verify partners ── */}
      <Reveal>
        <section className="mx-auto w-full max-w-5xl px-6 py-16 sm:px-14">
          <div className="text-center">
            <p className="text-xs font-semibold tracking-widest text-brand-deep-green uppercase">Our process</p>
            <h2 className="mt-3 font-display text-3xl font-semibold text-brand-forest">How we verify partners</h2>
            <p className="mx-auto mt-3 max-w-xl text-brand-muted-sage">
              We don&apos;t just list hospitals — we vet them. Every partner goes through a structured review before a single naira flows through them.
            </p>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-3">
            {[
              { step: "01", title: "Application & licence check", body: "The institution submits their CAC registration, operating licence, and relevant specialty certifications for review." },
              { step: "02", title: "On-site or document audit", body: "Our partnerships team verifies physical location, treatment capacity, and billing practices before approval." },
              { step: "03", title: "Ongoing case accountability", body: "Every case assigned to a partner requires treatment confirmation and fund receipts before the next disbursement." },
            ].map((item) => (
              <div key={item.step} className="rounded-2xl border border-border bg-background p-6">
                <span className="font-display text-4xl font-semibold text-brand-soft-sage">{item.step}</span>
                <h3 className="mt-3 font-display text-base font-semibold text-brand-forest">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-brand-muted-sage">{item.body}</p>
              </div>
            ))}
          </div>
        </section>
      </Reveal>

      {/* ── CTA ── */}
      <Reveal>
        <section className="mx-auto w-full max-w-5xl px-6 pb-16 sm:px-14">
          <div className="rounded-2xl border border-border bg-background p-8 text-center sm:p-12">
            <Building2 className="mx-auto h-10 w-10 text-brand-mint" strokeWidth={1.5} />
            <h2 className="mt-4 font-display text-2xl font-semibold text-brand-forest">Is your hospital not listed?</h2>
            <p className="mx-auto mt-3 max-w-md text-brand-muted-sage">
              Join our network of verified medical institutions. Once approved, your patients can immediately access crowdfunding support through FundPatients.
            </p>
            <Link
              href="/partners/become"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-brand-deep-green px-6 py-3 font-medium text-white transition hover:bg-brand-forest"
            >
              Apply to become a partner <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>
      </Reveal>

    </div>
  );
}
