import Link from "next/link";
import Image from "next/image";
import { CheckCircle2, Star } from "lucide-react";
import { CasePlaceholder } from "@/components/public/CasePlaceholder";
import { formatCurrency } from "@/lib/formatCurrency";
import type { MyStory } from "@/lib/donor";

export function MyStoryRow({ story }: { story: MyStory }) {
  const percent = Math.min(100, Math.round((story.amount_raised / story.goal_amount) * 100));
  const left = Math.max(0, story.goal_amount - story.amount_raised);
  const funded = left === 0;

  return (
    <li className="flex flex-col gap-4 py-4 sm:flex-row sm:items-center">
      <Link
        href={`/stories/${story.id}`}
        className="relative block h-32 w-full shrink-0 overflow-hidden rounded-2xl sm:h-20 sm:w-28"
      >
        {story.cover_image_url ? (
          <Image src={story.cover_image_url} alt={story.title} fill unoptimized className="object-cover" />
        ) : (
          <CasePlaceholder seed={story.id} />
        )}
      </Link>

      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <h3 className="truncate font-display text-base font-semibold text-brand-forest">{story.title}</h3>
          {funded && <CheckCircle2 aria-label="Fully funded" className="h-4 w-4 shrink-0 text-brand-deep-green" />}
        </div>
        <div className="mt-1 flex flex-wrap items-center gap-2">
          {story.donatedAmount > 0 && (
            <span className="rounded-full bg-brand-soft-sage px-2.5 py-0.5 text-xs font-semibold text-brand-deep-green">
              You donated {formatCurrency(story.donatedAmount, story.currency)}
            </span>
          )}
          {story.following && (
            <span className="inline-flex items-center gap-1 rounded-full border border-border px-2.5 py-0.5 text-xs font-medium text-brand-forest">
              <Star className="h-3 w-3 fill-brand-deep-green text-brand-deep-green" />
              Following
            </span>
          )}
        </div>
        <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-brand-soft-sage">
          <div className="h-full bg-brand-deep-green" style={{ width: `${percent}%` }} />
        </div>
        <p className="mt-1 text-xs text-brand-muted-sage">
          {formatCurrency(left, story.currency)} left of {formatCurrency(story.goal_amount, story.currency)}
        </p>
      </div>

      <Link
        href={`/stories/${story.id}`}
        className="shrink-0 self-start rounded-full border border-border px-4 py-2 text-sm font-medium text-brand-forest transition hover:border-brand-deep-green hover:text-brand-deep-green sm:self-center"
      >
        View details
      </Link>
    </li>
  );
}
