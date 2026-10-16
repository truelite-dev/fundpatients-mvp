import { Gift, MessageCircle, ShieldCheck, Star, HeartHandshake, type LucideIcon } from "lucide-react";
import { formatCurrency } from "@/lib/formatCurrency";
import { formatRelativeTime } from "@/lib/formatRelativeTime";
import type { ActivityItem as Item, ActivityItemType } from "@/lib/donor";

const icons: Record<ActivityItemType, LucideIcon> = {
  donation: Gift,
  follow: Star,
  comment: MessageCircle,
  admin: ShieldCheck,
  "thank-you": HeartHandshake,
};

function Headline({ item }: { item: Item }) {
  const amount =
    item.amount !== undefined ? formatCurrency(item.amount, item.currency ?? "NGN") : "";
  switch (item.type) {
    case "donation":
      return (
        <>
          <strong>{item.actor}</strong> made a donation of {amount}
        </>
      );
    case "follow":
      return (
        <>
          <strong>{item.actor}</strong> started following this campaign
        </>
      );
    case "comment":
      return (
        <>
          <strong>{item.actor}</strong> left a comment
        </>
      );
    case "admin":
      return <strong>Admin</strong>;
    case "thank-you":
      return <>Thank you! Your donation of {amount} was received{item.anonymous ? " anonymously" : "."}</>;
  }
}

// "Yesterday" for 24-48h, otherwise the usual relative time.
function thankYouTime(dateStr: string) {
  const hours = (Date.now() - new Date(dateStr).getTime()) / 3_600_000;
  return hours >= 24 && hours < 48 ? "Yesterday" : formatRelativeTime(dateStr);
}

function ThankYouBanner({ item, caseTitle }: { item: Item; caseTitle?: string }) {
  return (
    <li className="py-3">
      <div className="flex items-start gap-4 rounded-2xl bg-[#14AE9D] p-4">
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#FFE8A6] text-[#C26A00]">
          <Gift className="h-6 w-6" />
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-bold text-white sm:text-base">
            <Headline item={item} />
          </p>
          {caseTitle && <p className="mt-1 text-sm font-semibold text-brand-forest">{caseTitle}</p>}
        </div>
        <span className="shrink-0 text-xs text-brand-forest/70 sm:text-sm">{thankYouTime(item.createdAt)}</span>
      </div>
    </li>
  );
}

export function ActivityItem({ item, caseTitle }: { item: Item; caseTitle?: string }) {
  if (item.type === "thank-you") return <ThankYouBanner item={item} caseTitle={caseTitle} />;

  const Icon = icons[item.type];

  return (
    <li className="flex gap-3 py-3">
      <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-soft-sage text-brand-deep-green">
        <Icon className="h-4 w-4" />
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-sm text-brand-forest">
          <Headline item={item} />
        </p>
        {item.body && <p className="mt-0.5 text-sm text-brand-muted-sage">{item.body}</p>}
        <p className="mt-0.5 text-xs text-brand-muted-sage">{formatRelativeTime(item.createdAt)}</p>
      </div>
    </li>
  );
}
