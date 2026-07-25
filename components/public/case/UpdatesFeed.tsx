import { HandCoins, FileText } from "lucide-react";
import type { CaseUpdate, PublicDonation } from "@/lib/caseActivity";
import { formatCurrency } from "@/lib/formatCurrency";
import { formatRelativeTime } from "@/lib/formatRelativeTime";

type FeedItem =
  | { kind: "update"; data: CaseUpdate }
  | { kind: "donation"; data: PublicDonation };

export function UpdatesFeed({
  updates,
  donations,
}: {
  updates: CaseUpdate[];
  donations: PublicDonation[];
}) {
  const feed: FeedItem[] = [
    ...updates.map((u) => ({ kind: "update" as const, data: u })),
    ...donations.map((d) => ({ kind: "donation" as const, data: d })),
  ].sort((a, b) => {
    const ta = a.kind === "update" ? a.data.published_at : a.data.created_at;
    const tb = b.kind === "update" ? b.data.published_at : b.data.created_at;
    return new Date(tb).getTime() - new Date(ta).getTime();
  });

  if (feed.length === 0) return null;

  return (
    <div className="mt-6">
      <h3 className="text-sm font-semibold text-brand-forest">Latest updates</h3>
      <div className="mt-2 divide-y divide-border">
        {feed.slice(0, 10).map((item) => {
          if (item.kind === "donation") {
            const d = item.data;
            return (
              <div key={`don-${d.id}`} className="py-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex min-w-0 items-start gap-2 text-sm">
                    <HandCoins className="mt-0.5 h-4 w-4 shrink-0 text-brand-deep-green" />
                    <span className="min-w-0">
                      <span className="font-medium text-brand-forest">{d.display_name}</span>
                      <span className="text-brand-muted-sage"> donated </span>
                      <span className="font-semibold text-brand-deep-green">
                        {formatCurrency(d.amount, d.currency)}
                      </span>
                    </span>
                  </div>
                  <span className="shrink-0 text-xs text-brand-muted-sage/60">
                    {formatRelativeTime(d.created_at)}
                  </span>
                </div>
                {d.message && (
                  <p className="mt-1.5 ml-6 text-sm italic text-brand-muted-sage">
                    &ldquo;{d.message}&rdquo;
                  </p>
                )}
              </div>
            );
          }

          const u = item.data;
          return (
            <div key={`upd-${u.id}`} className="py-4">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-2 text-sm">
                  <FileText className="h-4 w-4 shrink-0 text-brand-muted-sage" />
                  <span className="font-medium text-brand-forest">Case update</span>
                </div>
                <span className="shrink-0 text-xs text-brand-muted-sage/60">
                  {formatRelativeTime(u.published_at)}
                </span>
              </div>
              <p className="mt-1.5 ml-6 text-sm leading-relaxed text-brand-muted-sage">{u.body}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
