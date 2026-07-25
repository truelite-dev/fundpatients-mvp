"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight, Flame, MapPin } from "lucide-react";
import type { CaseSummary } from "@/lib/cases";
import { formatCurrency } from "@/lib/formatCurrency";
import { CasePlaceholder } from "@/components/public/CasePlaceholder";

export function FeaturedCasesSlider({ cases }: { cases: CaseSummary[] }) {
  const [active, setActive] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const id = setInterval(() => setActive((a) => (a + 1) % cases.length), 6000);
    return () => clearInterval(id);
  }, [isPaused, cases.length]);

  const c = cases[active];
  const percent = Math.min(100, Math.round((c.amount_raised / c.goal_amount) * 100));
  const amountLeft = Math.max(0, c.goal_amount - c.amount_raised);

  return (
    <div
      className="relative overflow-hidden rounded-3xl bg-brand-forest"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={c.id}
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -24 }}
          transition={{ duration: 0.45, ease: "easeInOut" }}
          className="grid min-h-[340px] lg:grid-cols-[1fr_44%]"
        >
          {/* Content */}
          <div className="flex flex-col justify-between gap-6 p-8 lg:p-12">
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-mint/15 px-3 py-1 text-xs font-semibold text-brand-mint">
                <Flame className="h-3 w-3 fill-brand-mint" />
                Almost funded
              </span>
              <h2 className="mt-4 line-clamp-2 font-display text-2xl font-semibold leading-snug text-white lg:text-3xl">
                {c.title}
              </h2>
              {c.location && (
                <p className="mt-2 flex items-center gap-1 text-xs text-white/40">
                  <MapPin className="h-3 w-3" />
                  {c.location}
                </p>
              )}
              <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-white/55">
                {c.description}
              </p>
            </div>

            {/* Progress */}
            <div>
              <div className="flex items-end justify-between gap-2">
                <div>
                  <p className="text-xs text-white/40">Raised</p>
                  <p className="font-display text-xl font-semibold text-white">
                    {formatCurrency(c.amount_raised, c.currency)}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-white/40">Goal</p>
                  <p className="text-sm font-medium text-white/60">
                    {formatCurrency(c.goal_amount, c.currency)}
                  </p>
                </div>
              </div>
              <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-white/10">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${percent}%` }}
                  transition={{ duration: 0.9, ease: "easeOut" }}
                  className="h-full rounded-full bg-brand-mint"
                />
              </div>
              <div className="mt-1.5 flex items-center justify-between">
                <p className="text-xs font-semibold text-brand-mint">{percent}% funded</p>
                <p className="text-xs text-white/35">{formatCurrency(amountLeft, c.currency)} left</p>
              </div>
            </div>

            {/* CTA + dots */}
            <div className="flex items-center justify-between">
              <Link
                href={`/donate?case=${c.id}`}
                className="inline-flex items-center gap-2 rounded-full bg-brand-mint px-5 py-2.5 text-sm font-medium text-brand-forest transition hover:bg-white"
              >
                Donate now <ArrowRight className="h-4 w-4" />
              </Link>
              <div className="flex items-center gap-2">
                {cases.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    aria-label={`Go to slide ${i + 1}`}
                    onClick={() => setActive(i)}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      i === active ? "w-6 bg-brand-mint" : "w-1.5 bg-white/25 hover:bg-white/50"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Image */}
          <div className="relative hidden overflow-hidden lg:block">
            {c.cover_image_url ? (
              <Image
                src={c.cover_image_url}
                alt={c.title}
                fill
                className="object-cover"
              />
            ) : (
              <CasePlaceholder seed={c.id} />
            )}
            <div className="absolute inset-0 bg-gradient-to-r from-brand-forest via-brand-forest/30 to-transparent" />
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
