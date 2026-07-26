"use client";

import { useState } from "react";
import Link from "next/link";

type Props = {
  caseId: string;
  description: string | null;
  publishedAt: string | null;
  organization: { name: string; specialization: string | null } | null;
};

const TABS = ["Story", "Comments", "Medical partner"] as const;
type Tab = (typeof TABS)[number];

export function CaseTabs({ caseId, description, publishedAt, organization }: Props) {
  const [tab, setTab] = useState<Tab>("Story");

  return (
    <div className="mt-6">
      {/* Tab bar */}
      <div className="flex gap-0 border-b border-border">
        {TABS.map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setTab(t)}
            className={`px-4 py-2.5 text-sm font-medium transition-colors ${
              tab === t
                ? "-mb-px border-b-2 border-brand-deep-green text-brand-forest"
                : "text-brand-muted-sage hover:text-brand-forest"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Story */}
      {tab === "Story" && (
        <div className="mt-6">
          <p className="whitespace-pre-line leading-relaxed text-brand-muted-sage">
            {description ?? "No story has been added yet."}
          </p>
          {publishedAt && (
            <p className="mt-6 text-xs text-brand-muted-sage/60">
              Published{" "}
              {new Date(publishedAt).toLocaleDateString("en-GB", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </p>
          )}
          <div className="mt-6">
            <Link
              href={`/donate?case=${caseId}`}
              className="inline-flex items-center rounded-full bg-brand-deep-green px-6 py-3 text-sm font-semibold text-white transition hover:bg-brand-forest"
            >
              Donate now
            </Link>
          </div>
        </div>
      )}

      {/* Comments */}
      {tab === "Comments" && (
        <div className="mt-6">
          <p className="text-sm text-brand-muted-sage">No comments yet.</p>
          <div className="mt-4 rounded-xl border border-border p-4 text-center text-sm text-brand-muted-sage">
            <Link href="/login" className="font-medium text-brand-deep-green hover:underline">
              Sign in
            </Link>{" "}
            to leave a comment.
          </div>
        </div>
      )}

      {/* Medical partner */}
      {tab === "Medical partner" && (
        <div className="mt-6">
          {organization ? (
            <div className="rounded-xl border border-border p-5">
              <p className="font-semibold text-brand-forest">{organization.name}</p>
              {organization.specialization && (
                <p className="mt-1 text-sm text-brand-muted-sage">{organization.specialization}</p>
              )}
            </div>
          ) : (
            <p className="text-sm text-brand-muted-sage">No medical partner linked to this case.</p>
          )}
        </div>
      )}
    </div>
  );
}
