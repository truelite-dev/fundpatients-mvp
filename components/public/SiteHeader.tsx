"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion } from "motion/react";
import { Menu, Search, X } from "lucide-react";

const navLinks = [
  { href: "/stories", label: "Stories" },
  { href: "/about", label: "Why FundPatients?" },
  { href: "/partners", label: "Partners" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  // Homepage duplicates the nav as a card-header inside the hero at desktop
  // widths (see HeroCarousel), so the real floating header steps aside there
  // — mobile still relies on this one, since that duplicate is desktop-only.
  const isHome = pathname === "/";

  const [isDesktop, setIsDesktop] = useState(
    () => typeof window !== "undefined" && window.matchMedia("(min-width: 768px)").matches
  );
  const [scrolledPastHero, setScrolledPastHero] = useState(() => {
    if (typeof window === "undefined") return false;
    const heroEl = document.getElementById("hero-card");
    // Default false (header hidden) if hero isn't in DOM yet — effect checks after mount
    if (!heroEl) return false;
    return heroEl.getBoundingClientRect().bottom <= 0;
  });

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const handleChange = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    mq.addEventListener("change", handleChange);
    return () => mq.removeEventListener("change", handleChange);
  }, []);

  useEffect(() => {
    if (!isHome) return;

    function check() {
      const heroEl = document.getElementById("hero-card");
      if (heroEl) setScrolledPastHero(heroEl.getBoundingClientRect().bottom <= 0);
    }

    // Sync immediately after mount in case lazy init ran before hero was in DOM
    check();

    window.addEventListener("scroll", check, { passive: true });
    return () => window.removeEventListener("scroll", check);
  }, [isHome]);

  // On the homepage's desktop layout, the real header stays tucked away
  // until the hero card has fully scrolled past, then slides in — and
  // slides back out when scrolling back up into the hero.
  const hideForHero = isHome && isDesktop && !scrolledPastHero;

  return (
    <motion.header
      initial={false}
      animate={{ y: hideForHero ? -96 : 0, opacity: hideForHero ? 0 : 1 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      style={{ pointerEvents: hideForHero ? "none" : "auto" }}
      className={`top-4 z-50 mx-[12px] rounded-2xl bg-background/70 shadow-[0_8px_24px_-8px_rgba(11,31,14,0.10)] backdrop-blur-lg sm:mx-[20px] ${
        isHome ? "sticky md:fixed md:inset-x-0" : "sticky"
      }`}
    >
      <div className="flex items-center justify-between gap-4 px-6 py-4">
        <div className="flex items-center gap-10">
          <Link href="/" className="shrink-0" onClick={() => setOpen(false)}>
            <Image src="/logos/logomark-dark.svg" alt="FundPatients" width={140} height={40} priority />
          </Link>

          <nav className="hidden items-center gap-6 text-base text-brand-forest md:flex">
            {navLinks.map((link) => {
              const isActive = pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative transition ${
                    isActive
                      ? "font-semibold text-brand-deep-green"
                      : "hover:text-brand-deep-green"
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute -bottom-1 left-0 right-0 h-0.5 rounded-full bg-brand-deep-green" />
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="hidden items-center gap-3 text-sm md:flex">
          <Link
            href="/stories"
            aria-label="Search stories"
            className="rounded-full border border-border p-2 text-brand-muted-sage transition hover:border-brand-deep-green hover:text-brand-deep-green"
          >
            <Search className="h-4 w-4" />
          </Link>
          <Link href="/request-help" className="rounded-full border border-border px-4 py-2">
            Request Help
          </Link>
          <Link
            href="/donate"
            className="rounded-full bg-brand-deep-green px-4 py-2 text-white hover:bg-brand-forest"
          >
            Donate
          </Link>
          <Link href="/login" className="rounded-full border border-border px-4 py-2">
            Login
          </Link>
        </div>

        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((o) => !o)}
          className="rounded-full border border-border p-2 text-brand-forest md:hidden"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="flex flex-col gap-1 border-t border-border px-6 py-4 md:hidden">
          {navLinks.map((link) => {
            const isActive = pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={`rounded-lg px-3 py-2 text-sm transition ${
                  isActive
                    ? "bg-brand-soft-sage font-medium text-brand-deep-green"
                    : "text-brand-forest hover:bg-brand-soft-sage"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
          <div className="mt-2 flex flex-col gap-2 border-t border-border pt-4">
            <Link
              href="/request-help"
              onClick={() => setOpen(false)}
              className="rounded-full border border-border px-4 py-2 text-center text-sm"
            >
              Request Help
            </Link>
            <Link
              href="/donate"
              onClick={() => setOpen(false)}
              className="rounded-full bg-brand-deep-green px-4 py-2 text-center text-sm text-white"
            >
              Donate
            </Link>
            <Link
              href="/login"
              onClick={() => setOpen(false)}
              className="rounded-full border border-border px-4 py-2 text-center text-sm"
            >
              Login
            </Link>
          </div>
        </div>
      )}
    </motion.header>
  );
}
