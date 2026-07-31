"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";

const currencies = ["NGN", "USD", "EUR"] as const;
type Currency = (typeof currencies)[number];

export function GeneralDonateForm() {
  const [currency, setCurrency] = useState<Currency>("NGN");
  const [amount, setAmount] = useState("");
  const [donorName, setDonorName] = useState("");
  const [donorEmail, setDonorEmail] = useState("");
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [marketing, setMarketing] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    const endpoint =
      currency === "NGN" ? "/api/donations/paystack/init" : "/api/donations/stripe/init";

    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: Number(amount),
          currency: currency === "NGN" ? undefined : currency,
          donorName,
          donorEmail,
          isAnonymous,
          isRecurring: true,
        }),
      });

      const json = await res.json();
      if (!res.ok) throw new Error(json.error ?? "Something went wrong. Please try again.");
      window.location.href = json.url;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <div>
        <p className="text-xs text-brand-muted-sage">Make a donation</p>
        <h3 className="mt-0.5 font-display text-xl font-semibold text-brand-forest">
          Support FundPatients monthly
        </h3>
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-medium text-brand-deep-green">
          Enter amount
        </label>
        <div className="flex overflow-hidden rounded-xl border border-border bg-background focus-within:ring-2 focus-within:ring-brand-deep-green/30">
          <select
            className="border-r border-border bg-background px-3 py-3 text-sm text-brand-forest focus:outline-none"
            value={currency}
            onChange={(e) => setCurrency(e.target.value as Currency)}
          >
            {currencies.map((c) => (
              <option key={c} value={c}>
                {c === "NGN" ? "₦" : c === "USD" ? "$" : "€"} {c}
              </option>
            ))}
          </select>
          <input
            required
            type="number"
            min={1}
            step="0.01"
            placeholder="0.00"
            className="flex-1 bg-transparent px-4 py-3 text-sm text-brand-forest placeholder:text-border focus:outline-none"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>
      </div>

      <div>
        <p className="mb-2 text-sm font-medium text-brand-deep-green">Personal Details</p>
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="flex flex-col gap-1">
            <label className="text-xs text-brand-muted-sage">Name in full *</label>
            <input
              required={!isAnonymous}
              disabled={isAnonymous}
              placeholder="Name in full"
              className="rounded-xl border border-border bg-background px-3 py-2.5 text-sm text-brand-forest placeholder:text-border focus:outline-none focus:ring-2 focus:ring-brand-deep-green/30 disabled:opacity-50"
              value={donorName}
              onChange={(e) => setDonorName(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs text-brand-muted-sage">Email address *</label>
            <input
              required
              type="email"
              placeholder="Email address"
              className="rounded-xl border border-border bg-background px-3 py-2.5 text-sm text-brand-forest placeholder:text-border focus:outline-none focus:ring-2 focus:ring-brand-deep-green/30"
              value={donorEmail}
              onChange={(e) => setDonorEmail(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-2.5">
        <label className="flex items-start gap-2.5 text-sm text-brand-muted-sage">
          <input
            type="checkbox"
            className="mt-0.5 accent-brand-deep-green"
            checked={isAnonymous}
            onChange={(e) => setIsAnonymous(e.target.checked)}
          />
          Give anonymously by hiding your name
        </label>
        <label className="flex items-start gap-2.5 text-sm text-brand-muted-sage">
          <input
            type="checkbox"
            className="mt-0.5 accent-brand-deep-green"
            checked={marketing}
            onChange={(e) => setMarketing(e.target.checked)}
          />
          <span>
            Get occasional marketing updates.{" "}
            <span className="text-xs">You may unsubscribe at any time</span>
          </span>
        </label>
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <button
        type="submit"
        disabled={submitting}
        className="flex w-full items-center justify-center gap-2 rounded-xl bg-brand-deep-green py-3.5 text-sm font-semibold text-white transition hover:bg-brand-forest disabled:opacity-60"
      >
        {submitting ? "Redirecting…" : "Continue to payment"}
        {!submitting && <ArrowRight className="h-4 w-4" />}
      </button>
    </form>
  );
}
