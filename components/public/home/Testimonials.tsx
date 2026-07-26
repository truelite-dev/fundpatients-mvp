"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ChevronLeft, ChevronRight, User } from "lucide-react";
import { gradientForSeed } from "@/lib/placeholderGradient";

const testimonials = [
  {
    name: "Verified Donor",
    role: "Monthly supporter",
    quote:
      "Seeing the update after my gift made it feel real — not just a transaction, but someone's actual recovery. I didn't expect to feel that connected to a stranger's journey, but here I am, checking in every week.",
  },
  {
    name: "Verified Donor",
    role: "First-time giver",
    quote:
      "The process was simple, and I could tell exactly where my donation was going. That kind of transparency is rare. I've used other platforms before, but this one made me feel like my contribution actually mattered.",
  },
  {
    name: "Verified Donor",
    role: "Case follower",
    quote:
      "I follow a couple of cases now and get updates as their treatment progresses. It keeps giving from feeling distant or abstract — you see the real impact, and that makes you want to do more.",
  },
];

export function Testimonials() {
  const [active, setActive] = useState(0);
  const t = testimonials[active];

  return (
    <section className="relative overflow-hidden px-6 py-28">
      {/* Subtle radial background tint */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_50%,var(--brand-soft-sage)_0%,transparent_70%)] opacity-40"
      />

      <div className="relative mx-auto w-full max-w-3xl">
        {/* Eyebrow */}
        <p className="text-center text-xs font-semibold tracking-widest text-brand-deep-green uppercase">
          Testimonials
        </p>

        {/* Decorative quote mark */}
        <p
          aria-hidden
          className="mt-4 text-center font-display text-[96px] leading-none text-brand-deep-green/10 select-none"
        >
          &ldquo;
        </p>

        {/* Quote */}
        <div className="-mt-6 min-h-[120px]">
          <AnimatePresence mode="wait">
            <motion.blockquote
              key={active}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="text-center"
            >
              <p className="font-display text-xl font-medium leading-relaxed text-brand-forest sm:text-2xl">
                {t.quote}
              </p>
            </motion.blockquote>
          </AnimatePresence>
        </div>

        {/* Attribution */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active + "-attr"}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="mt-10 flex flex-col items-center gap-3"
          >
            <div
              className={`flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br ${gradientForSeed(t.name + active)} ring-2 ring-brand-deep-green/10`}
            >
              <User className="h-9 w-9 text-white/80" strokeWidth={1.5} />
            </div>
            <div className="text-center">
              <p className="text-sm font-semibold text-brand-forest">{t.name}</p>
              <p className="text-xs text-brand-muted-sage">{t.role}</p>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Controls */}
        <div className="mt-10 flex items-center justify-center gap-5">
          <button
            type="button"
            aria-label="Previous testimonial"
            onClick={() => setActive((a) => (a - 1 + testimonials.length) % testimonials.length)}
            className="rounded-full border border-border p-2 text-brand-muted-sage transition hover:border-brand-deep-green hover:text-brand-deep-green"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>

          <div className="flex gap-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`Go to testimonial ${i + 1}`}
                onClick={() => setActive(i)}
                className={`rounded-full transition-all ${
                  i === active
                    ? "h-2 w-6 bg-brand-deep-green"
                    : "h-2 w-2 bg-brand-muted-sage/30 hover:bg-brand-muted-sage/60"
                }`}
              />
            ))}
          </div>

          <button
            type="button"
            aria-label="Next testimonial"
            onClick={() => setActive((a) => (a + 1) % testimonials.length)}
            className="rounded-full border border-border p-2 text-brand-muted-sage transition hover:border-brand-deep-green hover:text-brand-deep-green"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
