"use client";

import { useState } from "react";
import { formatCurrency } from "@/lib/formatCurrency";
import type { TopDonation } from "@/lib/donor";

const periods = [
  { value: "today", label: "Today" },
  { value: "week", label: "This week" },
  { value: "month", label: "This month" },
  { value: "all", label: "All time" },
];

export function TopDonationsCard({ donations }: { donations: TopDonation[] }) {
  const [period, setPeriod] = useState("today");

  return (
    <section className="rounded-3xl bg-white p-5 sm:p-6">
      <div className="flex items-center justify-between gap-3">
        <h2 className="font-display text-lg font-semibold text-brand-forest">Top donations</h2>
        <select
          aria-label="Top donations period"
          value={period}
          onChange={(e) => setPeriod(e.target.value)}
          className="rounded-lg border border-border bg-white px-3 py-1.5 text-sm text-brand-forest"
        >
          {periods.map((p) => (
            <option key={p.value} value={p.value}>
              {p.label}
            </option>
          ))}
        </select>
      </div>

      {donations.length === 0 ? (
        <div className="mt-6 rounded-2xl bg-brand-soft-sage px-4 py-8 text-center">
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
