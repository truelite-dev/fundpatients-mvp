import { FileText } from "lucide-react";
import type { CaseUpdate, PublicDonation } from "@/lib/caseActivity";
import { formatRelativeTime } from "@/lib/formatRelativeTime";

export function UpdatesFeed({
  updates,
  donations: _donations,
}: {
  updates: CaseUpdate[];
  donations: PublicDonation[];
}) {
  if (updates.length === 0) return null;

  return (
    <div className="mt-6">
      <h3 className="text-sm font-semibold text-brand-forest">Latest updates</h3>
      <div className="mt-2 divide-y divide-border">
        {updates.slice(0, 10).map((u) => (
          <div key={u.id} className="py-4">
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
        ))}
      </div>
    </div>
  );
}
