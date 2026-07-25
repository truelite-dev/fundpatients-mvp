"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ChevronLeft, ChevronRight, Quote, User } from "lucide-react";
import { gradientForSeed } from "@/lib/placeholderGradient";

// Placeholder copy until real testimonials are supplied — no invented real names.
const testimonials = [
  {
    name: "Verified Donor",
    role: "Monthly supporter",
    quote:
      "Seeing the update after my gift made it feel real — not just a transaction, but someone's actual recovery.",
  },
  {
    name: "Verified Donor",
    role: "First-time giver",
    quote:
      "The process was simple, and I could tell exactly where my donation was going. That transparency is rare.",
  },
  {
    name: "Verified Donor",
    role: "Case follower",
    quote:
      "I follow a couple of cases now and get updates on their progress. It keeps giving from feeling distant.",
  },
];

export function Testimonials() {
  const [active, setActive] = useState(0);
  const t = testimonials[active];

  return (
    <section className="mx-auto w-full max-w-4xl px-6 py-28">
      <div className="text-center">
        <h2 className="font-display text-2xl font-semibold text-brand-deep-green sm:text-3xl">
          What people have to say
        </h2>
        <p className="mt-2 text-brand-muted-sage">
          Directly support individuals facing urgent medical expenses
        </p>
      </div>

      <div className="relative mt-10 overflow-hidden rounded-3xl border border-border bg-brand-soft-sage/60 p-8 sm:p-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -16 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="flex flex-col items-center gap-6 sm:flex-row"
          >
            <div
              className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-gradient-to-br ${gradientForSeed(
                t.name + active
              )}`}
            >
              <User className="h-7 w-7 text-white/80" strokeWidth={1.5} />
            </div>
            <div>
              <Quote className="h-6 w-6 text-brand-deep-green/40" />
              <p className="mt-2 text-brand-forest">{t.quote}</p>
              <p className="mt-4 text-sm font-semibold text-brand-forest">{t.name}</p>
              <p className="text-xs text-brand-muted-sage">{t.role}</p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="mt-6 flex justify-center gap-3">
        <button
          type="button"
          aria-label="Previous testimonial"
          onClick={() => setActive((a) => (a - 1 + testimonials.length) % testimonials.length)}
          className="rounded-full border border-border p-2 text-brand-muted-sage transition hover:border-brand-deep-green hover:text-brand-deep-green"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        <button
          type="button"
          aria-label="Next testimonial"
          onClick={() => setActive((a) => (a + 1) % testimonials.length)}
          className="rounded-full border border-border p-2 text-brand-muted-sage transition hover:border-brand-deep-green hover:text-brand-deep-green"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </section>
  );
}
