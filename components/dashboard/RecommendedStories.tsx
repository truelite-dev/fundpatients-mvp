"use client";

import { useRef } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { CaseCard } from "@/components/public/CaseCard";
import type { CaseSummary } from "@/lib/cases";

const iconBtn =
  "flex h-8 w-8 items-center justify-center rounded-full text-brand-forest transition hover:bg-brand-soft-sage";

export function RecommendedStories({ stories }: { stories: CaseSummary[] }) {
  const scroller = useRef<HTMLDivElement>(null);

  if (stories.length === 0) return null;

  const scrollBy = (dir: 1 | -1) => {
    const el = scroller.current;
    if (el) el.scrollBy({ left: dir * (el.clientWidth * 0.8), behavior: "smooth" });
  };

  return (
    <div className="rounded-2xl bg-neutral-100 p-4 sm:p-5">
      <div className="flex items-center justify-between gap-3">
        <h2 className="font-display text-base font-semibold text-brand-forest sm:text-lg">
          Stories you might be interested in
        </h2>
        <div className="flex shrink-0 gap-1">
          <button type="button" aria-label="Previous stories" onClick={() => scrollBy(-1)} className={iconBtn}>
            <ArrowLeft className="h-4 w-4" />
          </button>
          <button type="button" aria-label="Next stories" onClick={() => scrollBy(1)} className={iconBtn}>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div
        ref={scroller}
        className="-mb-2 mt-3 flex snap-x gap-4 overflow-x-auto pb-4 pt-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {stories.map((s) => (
          <CaseCard key={s.id} case={s} compact className="w-64 shrink-0 snap-start sm:w-72" />
        ))}
      </div>
    </div>
  );
}
