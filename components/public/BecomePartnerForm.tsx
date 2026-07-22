"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const initialForm = {
  name: "",
  contactEmail: "",
  contactPhone: "",
  specialization: "",
  yearEstablished: "",
  reason: "",
};

export function BecomePartnerForm() {
  const router = useRouter();
  const [form, setForm] = useState(initialForm);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      const res = await fetch("/api/partners/become", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Something went wrong. Please try again.");

      router.push("/partners?submitted=1");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-4">
      <label className="flex flex-col gap-1 text-sm">
        Name of the Organization*
        <input
          required
          className="rounded-md border border-border px-3 py-2"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
      </label>
      <label className="flex flex-col gap-1 text-sm">
        Contact Email*
        <input
          required
          type="email"
          className="rounded-md border border-border px-3 py-2"
          value={form.contactEmail}
          onChange={(e) => setForm({ ...form, contactEmail: e.target.value })}
        />
      </label>
      <label className="flex flex-col gap-1 text-sm">
        Contact phone number
        <input
          type="tel"
          className="rounded-md border border-border px-3 py-2"
          value={form.contactPhone}
          onChange={(e) => setForm({ ...form, contactPhone: e.target.value })}
        />
      </label>
      <label className="flex flex-col gap-1 text-sm">
        Health specialisation*
        <input
          required
          className="rounded-md border border-border px-3 py-2"
          value={form.specialization}
          onChange={(e) => setForm({ ...form, specialization: e.target.value })}
        />
      </label>
      <label className="flex flex-col gap-1 text-sm">
        Year Established*
        <input
          required
          type="number"
          min={1800}
          max={new Date().getFullYear()}
          className="rounded-md border border-border px-3 py-2"
          value={form.yearEstablished}
          onChange={(e) => setForm({ ...form, yearEstablished: e.target.value })}
        />
      </label>
      <label className="flex flex-col gap-1 text-sm">
        Reason for Joining
        <textarea
          className="rounded-md border border-border px-3 py-2"
          rows={4}
          value={form.reason}
          onChange={(e) => setForm({ ...form, reason: e.target.value })}
        />
      </label>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <button
        type="submit"
        disabled={submitting}
        className="mt-2 rounded-full bg-brand-deep-green px-5 py-2 text-white hover:bg-brand-forest disabled:opacity-60"
      >
        {submitting ? "Submitting..." : "Submit for approval"}
      </button>
    </form>
  );
}
