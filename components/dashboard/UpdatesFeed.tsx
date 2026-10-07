import Link from "next/link";
import { MessageSquare } from "lucide-react";
import { ActivityItem } from "@/components/dashboard/ActivityItem";
import { Reveal } from "@/components/motion/Reveal";
import type { ActivityGroup } from "@/lib/donor";

export function UpdatesFeed({ groups }: { groups: ActivityGroup[] }) {
  const newCount = groups.filter((g) => g.isNew).length;

  return (
    <section className="rounded-3xl bg-white p-5 sm:p-8">
      <header className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <h1 className="font-display text-2xl font-semibold text-brand-forest">Updates</h1>
          {newCount > 0 && (
            <span className="rounded-full bg-brand-soft-sage px-3 py-1 text-xs font-semibold text-brand-deep-green">
              {newCount} New
            </span>
          )}
        </div>
        {/* Placeholder: commenting isn't persisted in the mock phase. */}
        <button
          type="button"
          className="inline-flex items-center gap-2 rounded-full bg-brand-deep-green px-4 py-2 text-sm font-medium text-white transition hover:bg-brand-forest"
        >
          <MessageSquare className="h-4 w-4" />
          Add comment
        </button>
      </header>

      {groups.length === 0 ? (
        <p className="mt-8 rounded-2xl bg-brand-soft-sage px-6 py-10 text-center text-sm text-brand-muted-sage">
          No updates yet. Follow a story or make a donation to see activity here.
        </p>
      ) : (
        <div className="mt-6 flex flex-col gap-4">
          {groups.map((group, i) => (
            <Reveal key={group.id} delay={i * 0.08}>
              <article className="rounded-2xl border border-border p-4 sm:p-5">
                <h2 className="font-display text-base font-semibold text-brand-forest">
                  {group.caseTitle}
                </h2>
                <ul className="mt-1 divide-y divide-border">
                  {group.items.map((item) => (
                    <ActivityItem key={item.id} item={item} />
                  ))}
                </ul>
                <Link
                  href={group.caseHref}
                  className="mt-2 inline-block text-sm font-medium text-brand-deep-green hover:underline"
                >
                  Latest updates on: {group.items.length} updates
                </Link>
              </article>
            </Reveal>
          ))}
        </div>
      )}
    </section>
  );
}
