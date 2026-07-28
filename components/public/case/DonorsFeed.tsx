"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import type { PublicDonation } from "@/lib/caseActivity";
import { formatCurrency } from "@/lib/formatCurrency";
import { formatRelativeTime } from "@/lib/formatRelativeTime";

function DonorRow({ d }: { d: PublicDonation }) {
  const initials = d.display_name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <div className="flex items-start gap-3 py-3">
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-soft-sage text-xs font-semibold text-brand-deep-green">
        {initials}
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between gap-2">
          <span className="truncate text-sm font-medium text-brand-forest">{d.display_name}</span>
          <span className="shrink-0 text-sm font-semibold text-brand-deep-green">
            {formatCurrency(d.amount, d.currency)}
          </span>
        </div>
        {d.message && (
          <p className="mt-0.5 text-xs leading-relaxed text-brand-forest/70 line-clamp-2">
            {d.message}
          </p>
        )}
        <p className="mt-0.5 text-xs text-brand-muted-sage/60">{formatRelativeTime(d.created_at)}</p>
      </div>
    </div>
  );
}

export function DonorsFeed({ donations }: { donations: PublicDonation[] }) {
  const [open, setOpen] = useState(false);

  if (donations.length === 0) return null;

  const preview = donations.slice(0, 5);

  return (
    <>
      <div className="mt-6 rounded-2xl border border-border bg-transparent px-4 pb-3 pt-2">
<div className="-mx-4 divide-y divide-border">
          {preview.map((d) => (
            <div key={d.id} className="px-4">
              <DonorRow d={d} />
            </div>
          ))}
        </div>
        {donations.length > 5 && (
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="mt-2 text-xs font-medium text-brand-deep-green hover:underline"
          >
            See all {donations.length} donations →
          </button>
        )}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
            />

            {/* Panel */}
            <motion.div
              className="fixed inset-y-0 right-0 z-50 flex w-full max-w-md flex-col bg-background shadow-2xl"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 32, stiffness: 320 }}
            >
              {/* Header */}
              <div className="flex items-center justify-between border-b border-border px-6 py-4">
                <div>
                  <h2 className="font-semibold text-brand-forest">All Donations</h2>
                  <p className="text-xs text-brand-muted-sage">{donations.length} donors have given to this case</p>
                </div>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="rounded-full p-2 text-brand-muted-sage transition hover:bg-brand-soft-sage hover:text-brand-forest"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* List */}
              <div className="flex-1 overflow-y-auto px-6">
                <div className="divide-y divide-border">
                  {donations.map((d) => <DonorRow key={d.id} d={d} />)}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
