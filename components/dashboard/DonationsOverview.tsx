"use client";

import { useState } from "react";
import { CreditCard, Download, PartyPopper, Pause, Play } from "lucide-react";
import { formatCurrency } from "@/lib/formatCurrency";
import type { Donation, DonationSummary } from "@/lib/donor";

const dateFormat = (iso: string, opts: Intl.DateTimeFormatOptions) =>
  new Date(iso).toLocaleDateString("en-GB", opts);

function downloadHistory(donations: Donation[]) {
  const rows = [
    ["Date", "Case", "Amount", "Currency", "Type", "Status", "Method"],
    ...donations.map((d) => [
      d.createdAt.slice(0, 10),
      d.caseTitle ?? "General Donation",
      String(d.amount),
      d.currency,
      d.frequency,
      d.status,
      d.method,
    ]),
  ];
  const csv = rows.map((r) => r.map((c) => `"${c.replace(/"/g, '""')}"`).join(",")).join("\n");
  const url = URL.createObjectURL(new Blob([csv], { type: "text/csv" }));
  const a = document.createElement("a");
  a.href = url;
  a.download = "fundpatients-donation-history.csv";
  a.click();
  URL.revokeObjectURL(url);
}

export function DonationsOverview({
  summary,
  donations,
}: {
  summary: DonationSummary;
  donations: Donation[];
}) {
  // Mock phase: pausing is local UI state only.
  const [paused, setPaused] = useState(false);
  const { paymentMethod: card } = summary;

  return (
    <div className="mt-6 rounded-2xl border border-border p-5 sm:p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-brand-forest">Thank you for your contribution!</p>
          {summary.firstDonationAt && (
            <p className="mt-1 text-sm text-brand-muted-sage">
              Since {dateFormat(summary.firstDonationAt, { month: "long", year: "numeric" })}, you have
              donated a total of:
            </p>
          )}
          <p className="mt-3 font-display text-3xl font-semibold text-brand-deep-green sm:text-4xl">
            {formatCurrency(summary.totalPaid, summary.currency)}
          </p>
          {summary.pendingCount > 0 && (
            <p className="mt-1 text-xs text-brand-muted-sage">
              Excludes {summary.pendingCount} donation{summary.pendingCount > 1 ? "s" : ""} awaiting
              payment confirmation.
            </p>
          )}
        </div>
        <PartyPopper aria-hidden className="h-10 w-10 shrink-0 text-brand-mint" />
      </div>

      <dl className="mt-6 divide-y divide-border border-y border-border text-sm">
        <div className="flex justify-between gap-3 py-3">
          <dt className="text-brand-muted-sage">Next due amount</dt>
          <dd className={`font-semibold ${paused ? "text-brand-muted-sage line-through" : "text-brand-forest"}`}>
            {formatCurrency(summary.nextDueAmount, summary.currency)}
          </dd>
        </div>
        <div className="flex justify-between gap-3 py-3">
          <dt className="text-brand-muted-sage">Next payment date</dt>
          <dd className="font-semibold text-brand-forest">
            {paused
              ? "Paused"
              : dateFormat(summary.nextPaymentDate, { day: "numeric", month: "long", year: "numeric" })}
          </dd>
        </div>
        <div className="flex items-center justify-between gap-3 py-3">
          <dt className="flex items-center gap-2 text-brand-forest">
            <CreditCard className="h-4 w-4 text-brand-muted-sage" />
            {card.brand} •••• {card.last4}
          </dt>
          <dd>
            {/* Placeholder: card management arrives with the payments integration. */}
            <button type="button" className="font-medium text-brand-deep-green hover:underline">
              Change
            </button>
          </dd>
        </div>
      </dl>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-sm">
        <button
          type="button"
          onClick={() => downloadHistory(donations)}
          className="inline-flex items-center gap-2 font-medium text-brand-deep-green hover:underline"
        >
          <Download className="h-4 w-4" />
          Download history
        </button>
        <button
          type="button"
          onClick={() => setPaused((p) => !p)}
          aria-pressed={paused}
          className="inline-flex items-center gap-2 font-medium text-brand-deep-green hover:underline"
        >
          {paused ? <Play className="h-4 w-4" /> : <Pause className="h-4 w-4" />}
          {paused ? "Resume contribution" : "Pause contribution"}
        </button>
      </div>
    </div>
  );
}
