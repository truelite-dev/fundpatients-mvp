"use client";

import Link from "next/link";
import Image from "next/image";
import { Share2 } from "lucide-react";
import type { CaseSummary } from "@/lib/cases";
import { formatCurrency } from "@/lib/formatCurrency";
import { CasePlaceholder } from "@/components/public/CasePlaceholder";

export function CaseCard({
  case: c,
  recurring,
  className,
}: {
  case: CaseSummary;
  recurring?: boolean;
  className?: string;
}) {
  const percent = Math.min(100, Math.round((c.amount_raised / c.goal_amount) * 100));
  const amountLeft = Math.max(0, c.goal_amount - c.amount_raised);
  const donateHref = `/donate?case=${c.id}${recurring ? "&recurring=true" : ""}`;

  async function handleShare(e: React.MouseEvent) {
    e.preventDefault();
    const url = `${window.location.origin}/stories/${c.id}`;
    if (navigator.share) {
      try {
        await navigator.share({ title: c.title, url });
      } catch {
        // user cancelled the native share sheet — nothing to do
      }
    } else {
      await navigator.clipboard.writeText(url);
    }
  }

  return (
    <div
      className={`group flex flex-col overflow-hidden rounded-2xl border border-border bg-background shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg ${className ?? ""}`}
    >
      <Link href={`/stories/${c.id}`} className="relative block aspect-[4/3] overflow-hidden rounded-2xl border-8 border-white">
        {c.cover_image_url ? (
          <Image
            src={c.cover_image_url}
            alt={c.title}
            fill
            unoptimized
            className="object-cover transition duration-300 group-hover:scale-105"
          />
        ) : (
          <CasePlaceholder seed={c.id} />
        )}
        <span className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-brand-forest shadow-sm backdrop-blur">
          {formatCurrency(c.amount_raised, c.currency)} raised
        </span>
      </Link>

      <div className="flex flex-1 flex-col gap-3 p-4">
        <Link href={`/stories/${c.id}`}>
          <h3 className="font-display text-lg leading-snug font-semibold text-brand-forest line-clamp-2 group-hover:text-brand-deep-green">
            {c.title}
          </h3>
        </Link>
        <p className="line-clamp-2 text-sm text-brand-muted-sage">{c.description}</p>

        <div className="h-1.5 w-full overflow-hidden rounded-full bg-brand-soft-sage">
          <div className="h-full bg-brand-deep-green" style={{ width: `${percent}%` }} />
        </div>
        <p className="text-xs text-brand-muted-sage">
          <span className="font-semibold text-brand-forest">{formatCurrency(amountLeft, c.currency)}</span> still needed
        </p>

        <div className="mt-auto flex items-center gap-3 pt-1">
          <Link
            href={donateHref}
            className="rounded-full bg-brand-deep-green px-4 py-2 text-sm font-medium text-white transition hover:bg-brand-forest"
          >
            Donate
          </Link>
          <button
            type="button"
            onClick={handleShare}
            aria-label="Share this case"
            className="ml-auto rounded-full border border-border p-2 text-brand-muted-sage transition hover:border-brand-deep-green hover:text-brand-deep-green"
          >
            <Share2 className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
