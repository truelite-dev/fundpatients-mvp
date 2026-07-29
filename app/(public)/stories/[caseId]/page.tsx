import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MapPin, Calendar } from "lucide-react";
import { getCaseById, listPublishedCases } from "@/lib/cases";
import { listCaseUpdates, listCasePublicDonations } from "@/lib/caseActivity";
import { listCaseComments } from "@/lib/caseComments";
import { CasePlaceholder } from "@/components/public/CasePlaceholder";
import { DonationGauge } from "@/components/public/case/DonationGauge";
import { CaseTabs } from "@/components/public/case/CaseTabs";
import { ShareButton } from "@/components/public/case/ShareButton";
import { DonorsFeed } from "@/components/public/case/DonorsFeed";
import { CaseCard } from "@/components/public/CaseCard";
import { Reveal } from "@/components/motion/Reveal";
import { formatRelativeTime } from "@/lib/formatRelativeTime";
import { formatCurrency } from "@/lib/formatCurrency";

export async function generateMetadata({ params }: { params: Promise<{ caseId: string }> }) {
  const { caseId } = await params;
  const c = await getCaseById(caseId);
  return { title: c?.title ?? "Story" };
}

export default async function CaseDetailPage({
  params,
}: {
  params: Promise<{ caseId: string }>;
}) {
  const { caseId } = await params;

  const [activeCase, allCases, updates, donations, comments] = await Promise.all([
    getCaseById(caseId),
    listPublishedCases(),
    listCaseUpdates(caseId),
    listCasePublicDonations(caseId),
    listCaseComments(caseId),
  ]);

  if (!activeCase) notFound();

  const related = allCases.filter((c) => c.id !== caseId).slice(0, 3);

  return (
    <div className="flex flex-1 flex-col">
    <main className="mx-auto w-full max-w-[1250px] flex-1 px-4 pt-4 pb-10 sm:px-6 sm:py-10 lg:pb-20">
      {/* Two-column hero */}
      <div className="lg:grid lg:grid-cols-[1fr_420px] lg:gap-10">

        {/* ── LEFT ── */}
        <div>
          {/* Hero image */}
          <div className="relative h-[220px] overflow-hidden rounded-2xl bg-brand-soft-sage sm:h-[442px]">
            {activeCase.cover_image_url ? (
              <Image
                src={activeCase.cover_image_url}
                alt={activeCase.title ?? ""}
                fill
                unoptimized
                className="object-cover"
                priority
              />
            ) : (
              <CasePlaceholder seed={activeCase.id} />
            )}

            {/* Date + location badge */}
            <div className="absolute left-3 top-3 flex items-center gap-2 rounded-full bg-black/50 px-3 py-1.5 text-xs text-white backdrop-blur-sm">
              {activeCase.published_at && (
                <span className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  {formatRelativeTime(activeCase.published_at)}
                </span>
              )}
              {activeCase.location && activeCase.published_at && (
                <span className="opacity-50">|</span>
              )}
              {activeCase.location && (
                <span className="flex items-center gap-1">
                  <MapPin className="h-3 w-3" />
                  {activeCase.location}
                </span>
              )}
            </div>
          </div>

          {/* Title */}
          <h1 className="mt-5 font-display text-2xl font-semibold leading-snug text-brand-forest sm:text-3xl">
            {activeCase.title}
          </h1>

          {/* Mobile-only donation stats */}
          {(() => {
            const goal = activeCase.goal_amount ?? 0;
            const raised = activeCase.amount_raised ?? 0;
            const left = Math.max(0, goal - raised);
            const pct = goal > 0 ? Math.min(100, Math.round((raised / goal) * 100)) : 0;
            return (
              <div className="mt-4 lg:hidden">
                <div className="flex items-end justify-between text-sm">
                  <div>
                    <p className="text-xs text-brand-muted-sage">Raised</p>
                    <p className="font-display text-lg font-semibold text-brand-forest">
                      {formatCurrency(raised, activeCase.currency)}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-brand-muted-sage">Left</p>
                    <p className="font-display text-lg font-semibold text-brand-forest">
                      {formatCurrency(left, activeCase.currency)}
                    </p>
                  </div>
                </div>
                <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-border">
                  <div
                    className="h-full rounded-full bg-brand-deep-green"
                    style={{ width: `${pct}%` }}
                  />
                </div>
                <p className="mt-1 text-xs font-medium text-brand-deep-green">{pct}% funded</p>
              </div>
            );
          })()}

          {/* Mobile-only CTA row */}
          <div className="mt-4 flex items-center gap-3 lg:hidden [&>*]:flex-1 [&>*]:justify-center">
            <Link
              href={`/donate?caseId=${activeCase.id}`}
              className="inline-flex items-center gap-2 rounded-full bg-brand-deep-green px-4 py-2 text-sm font-medium text-white transition hover:bg-brand-forest"
            >
              Donate
            </Link>
            <ShareButton caseId={activeCase.id} title={activeCase.title ?? ""} />
          </div>

          {/* Tabs: Story / Comments / Medical partner */}
          <CaseTabs
            caseId={activeCase.id}
            title={activeCase.title ?? ""}
            description={activeCase.description}
            publishedAt={activeCase.published_at}
            organization={activeCase.organizations ?? null}
            comments={comments}
            updates={updates}
          />
        </div>

        {/* ── RIGHT ── */}
        <div className="mt-10 lg:mt-0">
          <div className="lg:sticky lg:top-6 space-y-4">
            {/* Gauge */}
            <DonationGauge
              id={activeCase.id}
              goal_amount={activeCase.goal_amount}
              currency={activeCase.currency}
              amount_raised={activeCase.amount_raised}
              supporter_count={activeCase.supporter_count}
            />

            {/* Share bar */}
            <div className="flex items-center gap-3 [&>*]:flex-1 [&>*]:justify-center">
              <ShareButton caseId={activeCase.id} title={activeCase.title ?? ""} />
              <Link
                href="/login"
                className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm font-medium text-brand-muted-sage transition hover:border-brand-deep-green hover:text-brand-deep-green"
              >
                Follow
              </Link>
            </div>

            {/* Donors feed */}
            <DonorsFeed donations={donations} />
          </div>
        </div>
      </div>

    </main>

      {/* Related stories — full width, outside the constrained main */}
      {related.length > 0 && (
        <div className="mx-[12px] mb-6 overflow-hidden rounded-3xl bg-brand-soft-sage/40 px-6 py-16 sm:mx-[20px] sm:px-10 sm:py-20">
          <div className="mx-auto max-w-5xl">
            <div className="text-center">
              <h2 className="font-display text-xl font-semibold text-brand-forest sm:text-2xl">
                More stories you might be interested in
              </h2>
              <p className="mt-2 text-sm text-brand-muted-sage">
                Directly support individuals facing urgent medical expenses and help them access vital care.
              </p>
            </div>
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((c, i) => (
                <Reveal key={c.id} delay={i * 0.08}>
                  <CaseCard case={c} className="h-full" />
                </Reveal>
              ))}
            </div>
            <div className="mt-8 flex justify-center">
              <Link
                href="/stories"
                className="inline-flex items-center gap-2 rounded-full border border-brand-forest/20 bg-white px-6 py-3 text-sm font-medium text-brand-forest transition hover:border-brand-deep-green hover:text-brand-deep-green"
              >
                View more
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
