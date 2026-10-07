"use client";

import { useState } from "react";
import Link from "next/link";
import { CreditCard, Pause, Play, Plus, Trash2 } from "lucide-react";
import { Switch } from "@/components/dashboard/Switch";
import type { NotificationKey, NotificationSettings, PaymentMethod } from "@/lib/donor";

const notificationRows: { key: NotificationKey; title: string; description: string }[] = [
  { key: "comment", title: "Comment on a case", description: "Get notified when someone comments on a case you follow" },
  { key: "follow", title: "When someone follows a case", description: "Get notified when someone starts following a case you follow" },
  { key: "reaction", title: "Reaction on a case", description: "Get notified when someone reacts to a case you follow" },
  { key: "share", title: "When someone shares a story", description: "Get notified when someone shares a story you follow" },
  { key: "update", title: "Update on a case", description: "Get notified when there are updates on a case you follow" },
  { key: "donation", title: "Donation on a case", description: "Get notified when someone donates to a case you follow" },
];

const sectionClass = "mt-8 border-t border-border pt-6";

// Mock phase: all changes are local UI state; nothing is persisted.
export function SettingsForm({
  initial,
  card,
}: {
  initial: NotificationSettings;
  card: PaymentMethod;
}) {
  const [settings, setSettings] = useState(initial);
  const [paused, setPaused] = useState(false);
  const [confirmClose, setConfirmClose] = useState(false);
  const [closeRequested, setCloseRequested] = useState(false);

  const allOn = notificationRows.every((r) => settings[r.key]);

  function setAll(next: boolean) {
    setSettings(Object.fromEntries(notificationRows.map((r) => [r.key, next])) as NotificationSettings);
  }

  return (
    <div>
      <div className="mt-6 flex items-center justify-between gap-4 rounded-2xl bg-brand-soft-sage p-4">
        <div>
          <p className="text-sm font-semibold text-brand-forest">All Settings</p>
          <p className="text-xs text-brand-muted-sage">Toggle all settings</p>
        </div>
        <Switch checked={allOn} onChange={setAll} label="Toggle all notification settings" />
      </div>

      <section className={sectionClass} aria-labelledby="notifications-heading">
        <h2 id="notifications-heading" className="font-display text-lg font-semibold text-brand-forest">
          Notifications
        </h2>
        <ul className="mt-2 divide-y divide-border">
          {notificationRows.map((row) => (
            <li key={row.key} className="flex items-center justify-between gap-4 py-3.5">
              <div className="min-w-0">
                <p className="text-sm font-medium text-brand-forest">{row.title}</p>
                <p className="text-xs text-brand-muted-sage">{row.description}</p>
              </div>
              <Switch
                checked={settings[row.key]}
                onChange={(next) => setSettings((s) => ({ ...s, [row.key]: next }))}
                label={row.title}
              />
            </li>
          ))}
        </ul>
      </section>

      <section className={sectionClass} aria-labelledby="payments-heading">
        <h2 id="payments-heading" className="font-display text-lg font-semibold text-brand-forest">
          Payments &amp; Donations
        </h2>

        <div className="mt-3 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-border p-4">
          <div className="flex items-center gap-3">
            <CreditCard className="h-5 w-5 text-brand-muted-sage" />
            <div>
              <p className="text-sm font-medium text-brand-forest">
                {card.brand} •••• {card.last4}
              </p>
              <p className="text-xs text-brand-muted-sage">Expires {card.expiry}</p>
            </div>
          </div>
          {/* Placeholder: card management arrives with the payments integration. */}
          <button
            type="button"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-brand-deep-green hover:underline"
          >
            <Plus className="h-4 w-4" />
            Add new
          </button>
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm font-medium">
          <Link href="/users/donations?tab=history" className="text-brand-deep-green hover:underline">
            Payment history
          </Link>
          <button
            type="button"
            onClick={() => setPaused((p) => !p)}
            aria-pressed={paused}
            className="inline-flex items-center gap-2 text-brand-deep-green hover:underline"
          >
            {paused ? <Play className="h-4 w-4" /> : <Pause className="h-4 w-4" />}
            {paused ? "Resume contribution" : "Pause contribution"}
          </button>
        </div>
      </section>

      <section className={sectionClass} aria-labelledby="danger-heading">
        <h2 id="danger-heading" className="font-display text-lg font-semibold text-brand-forest">
          Close account
        </h2>
        <p className="mt-1 text-sm text-brand-muted-sage">
          Closing your account stops all contributions and removes your donor profile.
        </p>

        {closeRequested ? (
          <p role="status" className="mt-4 rounded-xl bg-brand-soft-sage px-4 py-3 text-sm text-brand-forest">
            Account closure isn&apos;t available yet. No changes were made.
          </p>
        ) : confirmClose ? (
          <div role="alertdialog" aria-label="Confirm close account" className="mt-4 rounded-2xl border border-red-200 bg-red-50 p-4">
            <p className="text-sm font-medium text-red-700">Are you sure you want to close your account?</p>
            <div className="mt-3 flex gap-2">
              <button
                type="button"
                onClick={() => {
                  setConfirmClose(false);
                  setCloseRequested(true);
                }}
                className="rounded-full bg-red-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-700"
              >
                Yes, close account
              </button>
              <button
                type="button"
                onClick={() => setConfirmClose(false)}
                className="rounded-full border border-border bg-white px-4 py-2 text-sm font-medium text-brand-forest"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => setConfirmClose(true)}
            className="mt-4 inline-flex items-center gap-2 rounded-full border border-red-200 px-4 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50"
          >
            <Trash2 className="h-4 w-4" />
            Close account
          </button>
        )}
      </section>
    </div>
  );
}
