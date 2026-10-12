"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { MapPin, Quote } from "lucide-react";
import type { TeamMember } from "@/lib/team";

function Portrait({
  member,
  className = "",
}: {
  member: TeamMember;
  className?: string;
}) {
  if (member.photo) {
    return (
      <div
        className={`relative overflow-hidden bg-brand-soft-sage ${className}`}
      >
        <Image
          src={member.photo}
          alt={member.name}
          fill
          sizes="(min-width: 1024px) 160px, 48px"
          className="object-cover"
        />
      </div>
    );
  }

  return (
    <div
      className={`relative flex items-center justify-center overflow-hidden bg-gradient-to-br ${member.tone} ${className}`}
    >
      <div
        aria-hidden
        className="absolute -top-10 -right-10 h-40 w-40 rounded-full bg-brand-mint/20 blur-2xl"
      />
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.12] [background-image:radial-gradient(circle_at_1px_1px,white_1px,transparent_0)] [background-size:18px_18px]"
      />
      <span className="relative font-display font-semibold tracking-tight text-white/95">
        {member.initials}
      </span>
    </div>
  );
}

function Detail({ member }: { member: TeamMember }) {
  return (
    <div>
      <p className="text-sm leading-relaxed text-brand-muted-sage">
        {member.bio}
      </p>
      <figure className="mt-4 rounded-2xl bg-brand-soft-sage p-4">
        <Quote className="h-5 w-5 text-brand-deep-green" />
        <blockquote className="mt-2 font-display text-lg leading-snug text-brand-forest">
          &ldquo;{member.quote}&rdquo;
        </blockquote>
      </figure>
    </div>
  );
}

export function TeamExplorer({ members }: { members: TeamMember[] }) {
  const [activeSlug, setActiveSlug] = useState(members[0].slug);
  const active = members.find((m) => m.slug === activeSlug) ?? members[0];

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-12">
      <div>
        {/* Caption */}
        <div className="mb-5 max-lg:px-4 lg:mb-9">
          <p className="font-serif text-2xl text-brand-forest italic sm:text-3xl">
            Meet the team
          </p>
          <p className="mt-2 text-sm text-brand-muted-sage">
            <span className="hidden lg:inline">
              Hover over a name to see who they are and why they joined.
            </span>
            <span className="lg:hidden">
              Tap a name to see who they are and why they joined.
            </span>
          </p>
        </div>

        {/* Roster */}
        <ul
          role="tablist"
          aria-label="Founding team"
          className="flex flex-col lg:pb-72"
        >
          {members.map((m) => {
            const isActive = m.slug === activeSlug;
            return (
              <li
                key={m.slug}
                className={`border-b border-brand-forest/10 first:border-t max-lg:px-4 max-lg:transition-colors ${
                  isActive
                    ? "max-lg:rounded-2xl max-lg:border-transparent max-lg:bg-white max-lg:shadow-[0_12px_32px_-12px_rgba(11,31,14,0.2)]"
                    : ""
                }`}
              >
                <button
                  type="button"
                  role="tab"
                  id={`tab-${m.slug}`}
                  aria-selected={isActive}
                  aria-controls="team-panel"
                  onClick={() => setActiveSlug(m.slug)}
                  onMouseEnter={() =>
                    window.matchMedia("(hover: hover)").matches &&
                    setActiveSlug(m.slug)
                  }
                  onFocus={() => setActiveSlug(m.slug)}
                  className="group flex w-full items-center gap-4 py-5 text-left"
                >
                  <Portrait
                    member={m}
                    className={`h-12 w-12 shrink-0 rounded-full text-sm ring-2 transition lg:hidden ${
                      isActive ? "ring-brand-deep-green" : "ring-transparent"
                    }`}
                  />
                  <span className="min-w-0 flex-1">
                    <span
                      className={`block truncate font-display text-xl font-semibold transition sm:text-2xl ${
                        isActive
                          ? "text-brand-deep-green"
                          : "text-brand-forest group-hover:text-brand-deep-green/80"
                      }`}
                    >
                      {m.name}
                    </span>
                    <span className="block truncate text-sm text-brand-deep-green">
                      {m.role}
                    </span>
                  </span>
                  <span
                    aria-hidden
                    className={`hidden h-px bg-brand-deep-green transition-all duration-300 sm:block ${
                      isActive
                        ? "w-10 opacity-100"
                        : "w-4 opacity-0 group-hover:opacity-60"
                    }`}
                  />
                </button>

                {/* Mobile: detail expands inline */}
                <AnimatePresence initial={false}>
                  {isActive && (
                    <motion.div
                      key="inline"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                      className="overflow-hidden lg:hidden"
                    >
                      <div className="pb-6 pl-0">
                        <Detail member={m} />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Desktop: sticky spotlight */}
      <div className="hidden lg:block">
        <div className="sticky top-28 self-start">
          <AnimatePresence mode="wait">
            <motion.div
              key={active.slug}
              id="team-panel"
              role="tabpanel"
              aria-labelledby={`tab-${active.slug}`}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="overflow-hidden rounded-3xl bg-white shadow-[0_24px_60px_-24px_rgba(11,31,14,0.25)]"
            >
              <div className="p-8">
                <div className="flex items-center gap-5">
                  <Portrait
                    member={active}
                    className="h-52 w-40 shrink-0 rounded-2xl text-5xl ring-4 ring-brand-soft-sage"
                  />
                  <div className="min-w-0">
                    <h3 className="font-display text-3xl font-semibold leading-tight text-brand-forest">
                      {active.name}
                    </h3>
                    <p className="text-sm text-brand-deep-green">
                      {active.role}
                    </p>
                  </div>
                </div>
                <div className="mt-5 flex flex-wrap items-center gap-2">
                  {active.founder && (
                    <span className="rounded-full bg-brand-deep-green px-3 py-1 text-xs font-semibold text-white">
                      Co-founder
                    </span>
                  )}
                  <span className="rounded-full border border-border px-3 py-1 text-xs text-brand-muted-sage">
                    {active.focus}
                  </span>
                  <span className="inline-flex items-center gap-1 text-xs text-brand-muted-sage">
                    <MapPin className="h-3.5 w-3.5" /> {active.city}
                  </span>
                </div>
                <div className="mt-5">
                  <Detail member={active} />
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
