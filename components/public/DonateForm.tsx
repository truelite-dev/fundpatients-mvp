"use client";

import { useState } from "react";

const currencies = ["NGN", "USD", "EUR"] as const;
type Currency = (typeof currencies)[number];

const tipPresets = [5, 10, 15] as const;

export function DonateForm({
  caseId,
  defaultCurrency,
  defaultRecurring = false,
}: {
  caseId: string;
  defaultCurrency: Currency;
  defaultRecurring?: boolean;
}) {
  const [currency, setCurrency] = useState<Currency>(defaultCurrency);
  const [amount, setAmount] = useState("");
  const [isRecurring, setIsRecurring] = useState(defaultRecurring);
  const [tipPercent, setTipPercent] = useState<number | null>(10);
  const [donorName, setDonorName] = useState("");
  const [donorEmail, setDonorEmail] = useState("");
  const [relationship, setRelationship] = useState("");
  const [message, setMessage] = useState("");
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const amountValue = Number(amount) || 0;
  const tipAmount = tipPercent ? Math.round(amountValue * (tipPercent / 100) * 100) / 100 : 0;

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
          caseId,
          amount: amountValue,
          currency: currency === "NGN" ? undefined : currency,
          tipAmount,
          isRecurring,
          donorName,
          donorEmail,
          relationshipToPatient: relationship,
          message,
          isAnonymous,
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
    <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-6">
      <label className="flex flex-col gap-1 text-sm">
        Enter amount
        <div className="flex gap-2">
          <select
            className="rounded-md border border-border px-3 py-2"
            value={currency}
            onChange={(e) => setCurrency(e.target.value as Currency)}
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
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>
      </label>

      <label className="flex items-center gap-2 text-sm">
        <input
          type="checkbox"
          checked={isRecurring}
          onChange={(e) => setIsRecurring(e.target.checked)}
        />
        Give this amount monthly
      </label>

      <div>
        <p className="text-sm font-medium text-brand-forest">Add a one-time tip (optional)</p>
        <p className="text-sm text-brand-muted-sage">
          As a non-profit organization your tip will be used to fund our operating cost.
        </p>
        <div className="mt-2 flex gap-2">
          {tipPresets.map((p) => (
            <button
              type="button"
              key={p}
              onClick={() => setTipPercent(tipPercent === p ? null : p)}
              className={`rounded-full border px-3 py-1 text-sm ${
                tipPercent === p
                  ? "border-brand-deep-green bg-brand-soft-sage"
                  : "border-border"
              }`}
            >
              {p}%
            </button>
          ))}
        </div>
      </div>

      <fieldset className="flex flex-col gap-4 rounded-lg border border-border p-4">
        <legend className="px-1 text-sm font-medium text-brand-forest">Personal Details</legend>
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="flex flex-col gap-1 text-sm">
            Name in full*
            <input
              required={!isAnonymous}
              disabled={isAnonymous}
              className="rounded-md border border-border px-3 py-2"
              value={donorName}
              onChange={(e) => setDonorName(e.target.value)}
            />
          </label>
          <label className="flex flex-col gap-1 text-sm">
            Email address*
            <input
              required
              type="email"
              className="rounded-md border border-border px-3 py-2"
              value={donorEmail}
              onChange={(e) => setDonorEmail(e.target.value)}
            />
          </label>
        </div>
        <label className="flex flex-col gap-1 text-sm">
          Relationship with patient*
          <select
            required
            className="rounded-md border border-border px-3 py-2"
            value={relationship}
            onChange={(e) => setRelationship(e.target.value)}
          >
            <option value="">Select...</option>
            <option value="family">Family</option>
            <option value="friend">Friend</option>
            <option value="none">None — general well-wisher</option>
          </select>
        </label>
        <label className="flex flex-col gap-1 text-sm">
          Well wishes or comment (optional)
          <textarea
            className="rounded-md border border-border px-3 py-2"
            rows={3}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </label>
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={isAnonymous}
            onChange={(e) => setIsAnonymous(e.target.checked)}
          />
          Give anonymously by hiding your name
        </label>
      </fieldset>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <button
        type="submit"
        disabled={submitting}
        className="rounded-full bg-brand-deep-green px-5 py-3 text-white hover:bg-brand-forest disabled:opacity-60"
      >
        {submitting ? "Redirecting to payment..." : "Continue to payment"}
      </button>
    </form>
  );
}
