import { Fragment } from "react";
import Link from "next/link";
import Image from "next/image";
import { MessageSquare } from "lucide-react";
import { ActivityItem } from "@/components/dashboard/ActivityItem";
import { RecommendedStories } from "@/components/dashboard/RecommendedStories";
import { UpdateCardActions } from "@/components/dashboard/UpdateCardActions";
import { Reveal } from "@/components/motion/Reveal";
import { CasePlaceholder } from "@/components/public/CasePlaceholder";
import { formatCurrency } from "@/lib/formatCurrency";
import type { CaseSummary } from "@/lib/cases";
import type { ActivityGroup } from "@/lib/donor";

// The "stories you might like" strip sits after this many activity cards.
const RECOMMENDED_AFTER = 2;

export function UpdatesFeed({
  groups,
  recommended = [],
}: {
  groups: ActivityGroup[];
  recommended?: CaseSummary[];
}) {
  const newCount = groups.filter((g) => g.isNew).length;

  return (
    <section className="rounded-3xl bg-white px-3 py-5 sm:p-8">
      <header className="flex flex-wrap items-center justify-between gap-3 px-2 sm:px-0">
        <div className="flex items-center gap-3">
          <h1 className="font-display text-2xl font-semibold text-brand-forest">
            Updates
          </h1>
          {newCount > 0 && (
            <span className="rounded-full bg-brand-soft-sage px-3 py-1 text-xs font-semibold text-brand-deep-green">
              {newCount} New
            </span>
          )}
        </div>
        {/* Placeholder: commenting isn't persisted in the mock phase. */}
        <button
          type="button"
          aria-label="Add comment"
          className="inline-flex items-center gap-2 rounded-full bg-brand-deep-green px-4 py-2 text-sm font-medium text-white transition hover:bg-brand-forest"
        >
          <MessageSquare className="h-4 w-4" />
          <span aria-hidden="true">
            Add<span className="hidden sm:inline"> comment</span>
          </span>
        </button>
      </header>

      {groups.length === 0 ? (
        <p className="mt-8 rounded-2xl bg-brand-soft-sage px-6 py-10 text-center text-sm text-brand-muted-sage">
          No updates yet. Follow a story or make a donation to see activity
          here.
        </p>
      ) : (
        <div className="mt-6 flex flex-col gap-4">
          {groups.map((group, i) => (
            <Fragment key={group.id}>
              {i === RECOMMENDED_AFTER && recommended.length > 0 && (
                <Reveal>
                  <RecommendedStories stories={recommended} />
                </Reveal>
              )}
              <Reveal delay={i * 0.08}>
                <article className="overflow-hidden rounded-2xl border border-border">
                  <header className="flex items-center justify-between gap-3 bg-neutral-100 px-4 py-4 sm:px-5 sm:py-5">
                    <div className="flex min-w-0 items-center gap-3">
                      <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-xl">
                        {group.coverImageUrl ? (
                          <Image
                            src={group.coverImageUrl}
                            alt=""
                            fill
                            unoptimized
                            className="object-cover"
                          />
                        ) : (
                          <CasePlaceholder seed={group.caseId ?? group.id} />
                        )}
                      </div>
                      <div className="min-w-0">
                        <h2 className="truncate font-display text-base font-semibold text-brand-forest">
                          <Link
                            href={group.caseHref}
                            className="transition hover:text-brand-deep-green hover:underline"
                          >
                            {group.caseTitle}
                          </Link>
                        </h2>
                        {group.goalAmount != null &&
                          group.amountRaised != null &&
                          group.currency && (
                            <p className="mt-0.5 text-xs text-brand-muted-sage">
                              <span className="font-semibold text-brand-forest">
                                {formatCurrency(
                                  group.amountRaised,
                                  group.currency,
                                )}
                              </span>{" "}
                              raised ·{" "}
                              {formatCurrency(
                                Math.max(
                                  0,
                                  group.goalAmount - group.amountRaised,
                                ),
                                group.currency,
                              )}{" "}
                              left
                            </p>
                          )}
                      </div>
                    </div>
                    <UpdateCardActions
                      story={{
                        groupId: group.id,
                        caseId: group.caseId,
                        title: group.caseTitle,
                        href: group.caseHref,
                        excerpt: group.caseExcerpt,
                        coverImageUrl: group.coverImageUrl,
                      }}
                    />
                  </header>
                  <div className="px-4 pb-4 sm:px-5 sm:pb-5">
                    <ul className="divide-y divide-border">
                      {group.items.map((item) => (
                        <ActivityItem
                          key={item.id}
                          item={item}
                          caseTitle={group.caseTitle}
                        />
                      ))}
                    </ul>
                    <Link
                      href={group.caseHref}
                      className="mt-2 inline-block text-sm font-medium text-brand-deep-green hover:underline"
                    >
                      Latest updates on: {group.items.length} updates
                    </Link>
                  </div>
                </article>
              </Reveal>
            </Fragment>
          ))}
          {groups.length <= RECOMMENDED_AFTER && recommended.length > 0 && (
            <Reveal>
              <RecommendedStories stories={recommended} />
            </Reveal>
          )}
        </div>
      )}
    </section>
  );
}
