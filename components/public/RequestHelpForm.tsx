"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const currencies = ["NGN", "USD", "EUR"] as const;

const initialForm = {
  goalAmount: "",
  currency: "NGN" as (typeof currencies)[number],
  beneficiaryName: "",
  requesterName: "",
  requesterPhone: "",
  requesterEmail: "",
};

export function RequestHelpForm() {
  const router = useRouter();
  const [form, setForm] = useState(initialForm);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      const res = await fetch("/api/request-help", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Something went wrong. Please try again.");

      router.push("/?requested=1");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-6">
      <fieldset className="flex flex-col gap-4">
        <legend className="mb-2 text-sm font-medium text-brand-forest">01 Financial goal</legend>

        <label className="flex flex-col gap-1 text-sm">
          How much do you need to raise?*
          <div className="flex gap-2">
            <select
              className="rounded-md border border-border px-3 py-2"
              value={form.currency}
              onChange={(e) =>
                setForm({ ...form, currency: e.target.value as (typeof currencies)[number] })
              }
            >
              {currencies.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
            <input
              required
              type="number"
              min={1}
              step="0.01"
              placeholder="0.00"
              className="flex-1 rounded-md border border-border px-3 py-2"
              value={form.goalAmount}
              onChange={(e) => setForm({ ...form, goalAmount: e.target.value })}
            />
          </div>
        </label>

        <label className="flex flex-col gap-1 text-sm">
          Who will be the beneficiary of the funds?*
          <input
            required
            className="rounded-md border border-border px-3 py-2"
            value={form.beneficiaryName}
            onChange={(e) => setForm({ ...form, beneficiaryName: e.target.value })}
          />
        </label>
      </fieldset>

      <fieldset className="flex flex-col gap-4">
        <legend className="mb-2 text-sm font-medium text-brand-forest">Personal info</legend>

        <label className="flex flex-col gap-1 text-sm">
          Your name in full*
          <input
            required
            className="rounded-md border border-border px-3 py-2"
            value={form.requesterName}
            onChange={(e) => setForm({ ...form, requesterName: e.target.value })}
          />
        </label>
        <label className="flex flex-col gap-1 text-sm">
          Your phone number*
          <input
            required
            type="tel"
            placeholder="+234 000 000 0000"
            className="rounded-md border border-border px-3 py-2"
            value={form.requesterPhone}
            onChange={(e) => setForm({ ...form, requesterPhone: e.target.value })}
          />
        </label>
        <label className="flex flex-col gap-1 text-sm">
          Your email address*
          <input
            required
            type="email"
            className="rounded-md border border-border px-3 py-2"
            value={form.requesterEmail}
            onChange={(e) => setForm({ ...form, requesterEmail: e.target.value })}
          />
        </label>
      </fieldset>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <button
        type="submit"
        disabled={submitting}
        className="rounded-full bg-brand-deep-green px-5 py-2 text-white hover:bg-brand-forest disabled:opacity-60"
      >
        {submitting ? "Submitting..." : "Continue"}
      </button>
    </form>
  );
}
