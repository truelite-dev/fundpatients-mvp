"use client";

import { useEffect, useRef, useState } from "react";
import { Check, ChevronDown, Trophy } from "lucide-react";
import { formatCurrency } from "@/lib/formatCurrency";
import type { TopDonation } from "@/lib/donor";

const periods = [
  { value: "today", label: "Today" },
  { value: "week", label: "This week" },
  { value: "month", label: "This month" },
  { value: "all", label: "All time" },
];

function PeriodDropdown({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const current = periods.find((p) => p.value === value) ?? periods[0];

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [open]);

  // Escape closes (returning focus to the trigger); arrows move between options.
  function onKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Escape" && open) {
      setOpen(false);
      ref.current?.querySelector<HTMLElement>("button[aria-haspopup]")?.focus();
    } else if ((e.key === "ArrowDown" || e.key === "ArrowUp") && open) {
      e.preventDefault();
      const items = [...(ref.current?.querySelectorAll<HTMLElement>("[role=option]") ?? [])];
      const i = items.indexOf(document.activeElement as HTMLElement);
      const next = e.key === "ArrowDown" ? (i + 1) % items.length : (i - 1 + items.length) % items.length;
      items[next]?.focus();
    }
  }

  return (
    <div ref={ref} className="relative" onKeyDown={onKeyDown}>
      <button
        type="button"
        aria-label="Top donations period"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-1.5 whitespace-nowrap rounded-full border border-border bg-white px-3 py-1.5 text-sm text-brand-forest transition hover:border-brand-deep-green"
      >
        {current.label}
        <ChevronDown className={`h-4 w-4 text-brand-muted-sage transition ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <div
          role="listbox"
          aria-label="Top donations period"
          className="absolute right-0 z-20 mt-2 min-w-[160px] rounded-2xl border border-border bg-white p-2 shadow-[0_16px_40px_-12px_rgba(11,31,14,0.18)]"
        >
          {periods.map((p) => {
            const selected = p.value === value;
            return (
              <button
                key={p.value}
                type="button"
                role="option"
                aria-selected={selected}
                onClick={() => {
                  onChange(p.value);
                  setOpen(false);
                }}
                className={`flex w-full items-center justify-between gap-3 rounded-xl px-3 py-2 text-left text-sm transition hover:bg-brand-soft-sage focus:bg-brand-soft-sage focus:outline-none ${
                  selected ? "font-semibold text-brand-deep-green" : "text-brand-forest"
                }`}
              >
                {p.label}
                {selected && <Check className="h-4 w-4" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

export function TopDonationsCard({ donations }: { donations: TopDonation[] }) {
  const [period, setPeriod] = useState("today");

  return (
    <section className="rounded-3xl bg-white p-5 sm:p-6">
      <div className="flex items-center justify-between gap-3">
        <h2 className="whitespace-nowrap font-display text-lg font-semibold text-brand-forest">Top donations</h2>
        <PeriodDropdown value={period} onChange={setPeriod} />
      </div>

      {donations.length === 0 ? (
        <div className="mt-6 rounded-2xl bg-brand-soft-sage px-4 py-8 text-center">
          <span className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-white text-brand-deep-green">
            <Trophy className="h-6 w-6" aria-hidden="true" />
          </span>
          <p className="font-display font-semibold text-brand-deep-green">Top Donations</p>
          <p className="mt-1 text-sm text-brand-muted-sage">
            No top donations for the selected filter.
          </p>
        </div>
      ) : (
        <ul className="mt-4 divide-y divide-border">
          {donations.map((d) => (
            <li key={d.id} className="flex justify-between gap-3 py-2 text-sm">
              <span className="text-brand-forest">{d.donor}</span>
              <span className="font-semibold text-brand-deep-green">
                {formatCurrency(d.amount, d.currency)}
              </span>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
