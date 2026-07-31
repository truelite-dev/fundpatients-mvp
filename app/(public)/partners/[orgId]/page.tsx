import Link from "next/link";
import { notFound } from "next/navigation";
import { Building2, Stethoscope, CalendarDays, Phone, CheckCircle2 } from "lucide-react";
import { getOrganizationById, listCasesByOrganization } from "@/lib/organizations";
import { CaseCard } from "@/components/public/CaseCard";
import { Reveal } from "@/components/motion/Reveal";

export async function generateMetadata({ params }: { params: Promise<{ orgId: string }> }) {
  const { orgId } = await params;
  const org = await getOrganizationById(orgId);
  return { title: org ? `${org.name} | Partners` : "Partner" };
}

export default async function PartnerDetailPage({
  params,
}: {
  params: Promise<{ orgId: string }>;
}) {
  const { orgId } = await params;

  const [org, cases] = await Promise.all([
    getOrganizationById(orgId),
    listCasesByOrganization(orgId),
  ]);

  if (!org) notFound();

  const totalRaised = cases.reduce((sum, c) => sum + (c.amount_raised ?? 0), 0);

  return (
    <div className="flex flex-col">


      {/* ── Hero card ── */}
      <section className="mx-[12px] mt-8 mb-6 overflow-hidden rounded-3xl bg-brand-forest py-12 sm:mx-[20px] sm:py-16">
        <div className="mx-auto max-w-[1250px] px-6 sm:px-14 lg:grid lg:grid-cols-[1fr_300px] lg:items-center lg:gap-12">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-5">
            {/* Logo */}
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-white/10 text-2xl font-bold text-white sm:h-28 sm:w-28 sm:text-4xl">
              {org.name.charAt(0).toUpperCase()}
            </div>

            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-mint/15 px-3 py-1 text-xs font-semibold text-brand-mint">
                <CheckCircle2 className="h-3.5 w-3.5" /> Verified partner
              </span>

              <h1 className="mt-2 font-display text-3xl font-semibold leading-tight text-white sm:text-4xl">
                {org.name}
              </h1>

              <div className="mt-3 flex flex-wrap gap-x-6 gap-y-2">
              {org.specialization && (
                <p className="flex items-center gap-2 text-sm text-white/60">
                  <Stethoscope className="h-4 w-4 text-brand-mint/70" strokeWidth={1.5} />
                  {org.specialization}
                </p>
              )}
              {org.year_established && (
                <p className="flex items-center gap-2 text-sm text-white/60">
                  <CalendarDays className="h-4 w-4 text-brand-mint/70" strokeWidth={1.5} />
                  Est. {org.year_established}
                </p>
              )}
              {org.contact_phone && (
                <p className="flex items-center gap-2 text-sm text-white/60">
                  <Phone className="h-4 w-4 text-brand-mint/70" strokeWidth={1.5} />
                  {org.contact_phone}
                </p>
              )}
            </div>
            </div>
          </div>

          {/* Stats mini-cards */}
          <div className="mt-8 grid grid-cols-2 gap-3 lg:mt-0">
            <div className="rounded-xl border border-white/10 bg-white/5 p-4">
              <p className="font-display text-2xl font-semibold text-white">{cases.length}</p>
              <p className="mt-0.5 text-xs text-white/50">Active cases</p>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/5 p-4">
              <p className="font-display text-2xl font-semibold text-brand-mint">
                ₦{(totalRaised / 1_000_000).toFixed(1)}M
              </p>
              <p className="mt-0.5 text-xs text-white/50">Total raised</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Cases ── */}
      <section className="mx-auto w-full max-w-[1250px] px-6 pb-16 sm:px-14">
        <Reveal>
          <div className="flex items-end justify-between gap-4">
            <div>
              <h2 className="font-display text-2xl font-semibold text-brand-forest">
                Cases
              </h2>
              <p className="mt-1 text-sm text-brand-muted-sage">
                {cases.length === 0
                  ? "No published cases yet."
                  : `${cases.length} published case${cases.length === 1 ? "" : "s"} — verified and managed by this institution.`}
              </p>
            </div>
          </div>
        </Reveal>

        {cases.length === 0 ? (
          <Reveal>
            <div className="mt-8 rounded-2xl border border-dashed border-border bg-background p-12 text-center">
              <Building2 className="mx-auto h-10 w-10 text-brand-soft-sage" />
              <p className="mt-4 font-display text-lg font-semibold text-brand-forest">No cases yet</p>
              <p className="mt-2 text-sm text-brand-muted-sage">
                Cases added under this partner will appear here once published.
              </p>
            </div>
          </Reveal>
        ) : (
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {cases.map((c, i) => (
              <Reveal key={c.id} delay={i * 0.06}>
                <CaseCard case={c} className="h-full" />
              </Reveal>
            ))}
          </div>
        )}

        <Reveal>
          <div className="mt-12 rounded-2xl border border-border bg-background p-6 sm:p-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h3 className="font-display text-lg font-semibold text-brand-forest">
                  Know someone who needs help at {org.name}?
                </h3>
                <p className="mt-1 text-sm text-brand-muted-sage">
                  Submit a case request and our team will coordinate with the hospital directly.
                </p>
              </div>
              <Link
                href="/request-help"
                className="shrink-0 rounded-full bg-brand-deep-green px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-forest"
              >
                Request help
              </Link>
            </div>
          </div>
        </Reveal>
      </section>

    </div>
  );
}
