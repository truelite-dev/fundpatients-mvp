"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight, HeartHandshake, Search, Stethoscope, Users } from "lucide-react";
import type { CaseSummary } from "@/lib/cases";
import { formatCurrency } from "@/lib/formatCurrency";
import { CasePlaceholder } from "@/components/public/CasePlaceholder";

// Benefit pillars shown in the translucent footer strip below. Also doubles
// as the rotating panel's content when there aren't yet 3 published cases to
// show instead.
const slides = [
  {
    icon: Stethoscope,
    label: "Verified medical partners",
    description: "Every case is confirmed by a vetted healthcare partner before it's published.",
  },
  {
    icon: HeartHandshake,
    label: "Direct, transparent giving",
    description: "Your donation goes straight to the case you choose — track every step.",
  },
  {
    icon: Users,
    label: "A community that shows up",
    description: "Join thousands of donors turning real generosity into real recoveries.",
  },
];

export function HeroCarousel({ cases }: { cases: CaseSummary[] }) {
  const [active, setActive] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const panelCount = cases.length > 0 ? cases.length : slides.length;
  const activeCase = cases[active];
  const fallback = slides[active % slides.length];

  useEffect(() => {
    if (isPaused) return;
    const id = setInterval(() => setActive((a) => (a + 1) % panelCount), 8000);
    return () => clearInterval(id);
  }, [active, panelCount, isPaused]);

  return (
    <section
      id="hero-card"
      className="relative mx-[12px] overflow-hidden rounded-3xl bg-[radial-gradient(150%_140%_at_15%_15%,var(--brand-deep-green)_0%,var(--brand-forest)_55%)] ring-1 ring-inset ring-white/10 sm:mx-[20px]"
    >
      {/* Homepage-only experiment: duplicate the site nav as a card-header.
          The real SiteHeader slides in once this hero card scrolls past. */}
      <div className="relative hidden items-center justify-between gap-4 px-8 py-7 sm:px-14 md:flex">
        <div className="flex items-center gap-10">
          <Image
            src="/logos/logomark-lemon-whtetext.svg"
            alt="FundPatients"
            width={140}
            height={40}
          />
          <nav className="flex items-center gap-6 text-base text-white/80">
            <Link href="/stories" className="hover:text-white">
              Stories
            </Link>
            <Link href="/about" className="hover:text-white">
              Why FundPatients?
            </Link>
            <Link href="/partners" className="hover:text-white">
              Partners
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-3 text-sm">
          <Link
            href="/stories"
            aria-label="Search stories"
            className="rounded-full border border-white/20 p-2 text-white/80 transition hover:border-white/40 hover:text-white"
          >
            <Search className="h-4 w-4" />
          </Link>
          <Link
            href="/request-help"
            className="rounded-full border border-white/20 px-4 py-2 text-white transition hover:bg-white/10"
          >
            Request Help
          </Link>
          <Link
            href="/donate"
            className="rounded-full bg-brand-mint px-4 py-2 font-medium text-brand-forest transition hover:bg-white"
          >
            Donate
          </Link>
          <Link
            href="/login"
            className="rounded-full border border-white/20 px-4 py-2 text-white transition hover:bg-white/10"
          >
            Login
          </Link>
        </div>
      </div>

      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-brand-mint/20 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-32 left-1/3 h-80 w-80 rounded-full bg-brand-mint/10 blur-3xl"
      />

      <div className="relative mx-auto flex w-full max-w-[1250px] flex-col items-center gap-12 px-8 py-16 sm:px-14 sm:py-20 lg:flex-row lg:justify-between">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <h1 className="font-display text-shadow-lg text-shadow-black/15 text-4xl font-semibold leading-tight text-white sm:text-5xl lg:text-6xl">
            Don&apos;t Let Finances
            <br />
            Limit Your Fight.
          </h1>
          <p className="mt-4 max-w-md text-base leading-relaxed text-brand-soft-sage/90 sm:text-xl">
            Discover a supportive platform for medical fundraising and get the care you deserve.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/stories"
              className="rounded-full bg-brand-mint px-6 py-3 text-center font-medium text-brand-forest transition hover:bg-white sm:w-auto"
            >
              Donate now
            </Link>
            <Link
              href="/request-help"
              className="rounded-full border border-white/30 px-6 py-3 text-center font-medium text-white transition hover:bg-white/10 sm:w-auto"
            >
              Request help
            </Link>
          </div>
        </motion.div>

        <div
          className="relative mx-auto aspect-square w-full max-w-sm lg:mx-0 lg:ml-auto"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <AnimatePresence mode="wait">
            {activeCase ? (
              <motion.div
                key={activeCase.id}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
                className="absolute inset-0 overflow-hidden rounded-[2rem] border-8 border-white/15 bg-white shadow-xl"
              >
                <Link href={`/stories/${activeCase.id}`} className="flex h-full flex-col">
                  <div className="relative flex-1">
                    {activeCase.cover_image_url ? (
                      <Image
                        src={activeCase.cover_image_url}
                        alt={activeCase.title}
                        fill
                        unoptimized
                        className="object-cover"
                      />
                    ) : (
                      <CasePlaceholder seed={activeCase.id} iconClassName="h-12 w-12 opacity-70" />
                    )}
                    <span className="absolute top-4 left-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-brand-forest shadow-sm">
                      {formatCurrency(activeCase.amount_raised, activeCase.currency)} raised
                    </span>
                  </div>
                  <div className="flex items-start justify-between gap-2 p-5">
                    <h3 className="font-display line-clamp-2 text-base font-semibold text-brand-forest">
                      {activeCase.title}
                    </h3>
                    <ArrowRight className="h-4 w-4 shrink-0 text-brand-deep-green" />
                  </div>
                </Link>
              </motion.div>
            ) : (
              <motion.div
                key={fallback.label}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
                className="absolute inset-0 flex flex-col items-center justify-center gap-4 rounded-[2rem] border border-white/15 bg-white/10 backdrop-blur-sm"
              >
                <fallback.icon className="h-16 w-16 text-brand-mint" strokeWidth={1.25} />
                <p className="px-6 text-center text-sm font-medium text-white/90">
                  {fallback.label}
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="absolute -bottom-8 left-1/2 flex -translate-x-1/2 gap-2">
            {Array.from({ length: panelCount }).map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`Show slide ${i + 1}`}
                onClick={() => setActive(i)}
                className={`h-2 rounded-full transition-all ${
                  i === active ? "w-6 bg-brand-mint" : "w-2 bg-white/40"
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
        className="relative border-t border-white/15 pt-10 pb-14 sm:pt-12 sm:pb-16"
      >
        <div className="mx-auto grid w-full max-w-[1250px] gap-12 px-8 sm:grid-cols-3 sm:px-14">
          {slides.map((s) => (
            <div key={s.label} className="flex flex-col items-start gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10">
                <s.icon className="h-5 w-5 text-brand-mint" strokeWidth={1.5} />
              </div>
              <h3 className="font-display text-base font-semibold text-white">{s.label}</h3>
              <p className="text-sm text-brand-soft-sage/80">{s.description}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
