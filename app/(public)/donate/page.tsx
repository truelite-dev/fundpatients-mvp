import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { getCaseById, listPublishedCases } from "@/lib/cases";
import { formatCurrency } from "@/lib/formatCurrency";
import { DonateForm } from "@/components/public/DonateForm";
import { GeneralDonateForm } from "@/components/public/GeneralDonateForm";
import { CasePlaceholder } from "@/components/public/CasePlaceholder";
import { CaseCard } from "@/components/public/CaseCard";
import { Reveal } from "@/components/motion/Reveal";

export const metadata = { title: "Donate | FundPatients" };

export default async function DonatePage({
  searchParams,
}: {
  searchParams: Promise<{ case?: string; recurring?: string }>;
}) {
  const { case: caseId, recurring } = await searchParams;

  // ── Case-specific donate flow ─────────────────────────────────
  if (caseId) {
    const activeCase = await getCaseById(caseId);
    if (!activeCase) notFound();
    const left = Math.max(0, activeCase.goal_amount - activeCase.amount_raised);

    return (
      <main className="mx-auto w-full max-w-2xl flex-1 px-6 py-16">
        <Link href={`/stories/${activeCase.id}`} className="group flex items-center gap-4">
          <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-brand-soft-sage">
            {activeCase.cover_image_url ? (
              <Image
                src={activeCase.cover_image_url}
                alt={activeCase.title ?? ""}
                fill
                unoptimized
                className="object-cover transition group-hover:scale-105"
              />
            ) : (
              <CasePlaceholder seed={activeCase.id} iconClassName="h-6 w-6 opacity-60" />
            )}
          </div>
          <div>
            <h1 className="font-display text-2xl font-semibold leading-snug text-brand-forest transition group-hover:text-brand-deep-green sm:text-3xl">
              {activeCase.title}
            </h1>
            <p className="mt-0.5 text-sm text-brand-muted-sage">
              {formatCurrency(left, activeCase.currency)} left of{" "}
              {formatCurrency(activeCase.goal_amount, activeCase.currency)}
            </p>
          </div>
        </Link>
        <DonateForm
          caseId={activeCase.id}
          defaultCurrency={activeCase.currency as "NGN" | "USD" | "EUR"}
          defaultRecurring={recurring === "true"}
        />
      </main>
    );
  }

  // ── General donate landing page ───────────────────────────────
  const cases = await listPublishedCases();
  const listingCases = cases.slice(0, 9);

  return (
    <div className="flex flex-col scroll-smooth">

      {/* ── Hero ── */}
      <section
        className="mx-[12px] mt-8 overflow-hidden rounded-3xl sm:mx-[20px]"
        style={{
          background:
            "linear-gradient(145deg, #1a6b35 0%, #0f3d1d 45%, #071a0d 100%)",
        }}
      >
        <div className="mx-auto max-w-7xl px-8 py-16 sm:px-12 sm:py-20 lg:grid lg:grid-cols-2 lg:items-center lg:gap-12 lg:py-24">

          {/* Left — copy + photo collage */}
          <div>
            <h1 className="font-display text-3xl font-semibold leading-tight text-white sm:text-4xl lg:text-5xl">
              Your contribution is able to give hope to a dying dream
            </h1>
            <p className="mt-5 max-w-lg text-base leading-relaxed text-white/70 sm:text-lg">
              Donate monthly or make a one-time payment directly to patients in urgent need of medical care across Nigeria.
            </p>
            <a
              href="#cases"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-white/15 px-6 py-3 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/25"
            >
              Donate to specific cases <ArrowRight className="h-4 w-4" />
            </a>

          </div>

          {/* Right — general donation form */}
          <div className="mt-12 lg:mt-0">
            <div className="rounded-2xl bg-white p-7 shadow-2xl">
              <GeneralDonateForm />
            </div>
          </div>
        </div>
      </section>

      {/* ── Specific cases ── */}
      {listingCases.length > 0 && (
        <section id="cases" className="mx-auto w-full max-w-7xl px-6 py-16 sm:px-12 sm:py-20">
          <Reveal>
            <div className="text-center">
              <h2 className="font-display text-3xl font-semibold text-brand-forest sm:text-4xl">
                Donate to a specific case
              </h2>
              <p className="mt-3 text-brand-muted-sage">
                Directly support individuals facing urgent medical expenses and help them access vital care.
              </p>
            </div>
          </Reveal>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {listingCases.map((c, i) => (
              <Reveal key={c.id} delay={i * 0.06}>
                <CaseCard case={c} className="h-full" />
              </Reveal>
            ))}
          </div>

          {cases.length > 9 && (
            <div className="mt-10 flex justify-center">
              <Link
                href="/stories"
                className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 text-sm font-medium text-brand-forest transition hover:border-brand-deep-green hover:text-brand-deep-green"
              >
                View all cases <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          )}
        </section>
      )}

    </div>
  );
}
