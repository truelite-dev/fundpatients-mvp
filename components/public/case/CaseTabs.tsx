"use client";

import { useState } from "react";
import Link from "next/link";
import { Heart, FileText } from "lucide-react";
import { formatRelativeTime } from "@/lib/formatRelativeTime";
import type { CaseComment } from "@/lib/caseComments";
import type { CaseUpdate } from "@/lib/caseActivity";
import { ShareButton } from "@/components/public/case/ShareButton";

type Props = {
  caseId: string;
  title: string;
  description: string | null;
  publishedAt: string | null;
  organization: { name: string; specialization: string | null } | null;
  comments: CaseComment[];
  updates: CaseUpdate[];
};

const TABS = ["Story", "Comments", "Updates", "Medical partner"] as const;
type Tab = (typeof TABS)[number];

export function CaseTabs({ caseId, title, description, publishedAt, organization, comments, updates }: Props) {
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
          <div className="mt-6 hidden flex-wrap items-center gap-3 sm:flex">
            <Link
              href={`/donate?case=${caseId}`}
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand-deep-green px-6 py-3 text-sm font-semibold text-white transition hover:bg-brand-forest sm:w-auto sm:justify-start"
            >
              <Heart className="h-4 w-4" />
              Donate now
            </Link>
            <div className="hidden sm:contents">
              <ShareButton caseId={caseId} title={title} />
              <Link
                href="/login"
                className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 text-sm font-medium text-brand-muted-sage transition hover:border-brand-deep-green hover:text-brand-deep-green"
              >
                Follow
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Comments */}
      {tab === "Comments" && (
        <div className="mt-6 space-y-4">
          {/* Sign-in prompt — always at top */}
          <div className="rounded-xl border border-border p-4 text-center text-sm text-brand-muted-sage">
            <Link href="/login" className="font-medium text-brand-deep-green hover:underline">
              Sign in
            </Link>{" "}
            to leave a comment.
          </div>

          {comments.length === 0 && (
            <p className="text-sm text-brand-muted-sage">No comments yet.</p>
          )}
          {comments.map((c) => {
            const name = c.author_name ?? "Anonymous";
            const initials = name
              .split(" ")
              .map((w) => w[0])
              .slice(0, 2)
              .join("")
              .toUpperCase();
            return (
              <div key={c.id} className="flex gap-3">
                {/* Avatar */}
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-soft-sage text-xs font-semibold text-brand-deep-green">
                  {initials}
                </div>
                {/* Bubble */}
                <div className="flex-1 rounded-xl border border-border p-4">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-sm font-semibold text-brand-forest">{name}</span>
                    <span className="text-xs text-brand-muted-sage">
                      {formatRelativeTime(c.created_at)}
                    </span>
                  </div>
                  <p className="mt-1.5 text-sm leading-relaxed text-brand-muted-sage">{c.body}</p>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Updates */}
      {tab === "Updates" && (
        <div className="mt-6">
          {updates.length === 0 ? (
            <p className="text-sm text-brand-muted-sage">No updates yet.</p>
          ) : (
            <div className="divide-y divide-border">
              {updates.map((u) => (
                <div key={u.id} className="py-4">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2 text-sm">
                      <FileText className="h-4 w-4 shrink-0 text-brand-muted-sage" />
                      <span className="font-medium text-brand-forest">Case update</span>
                    </div>
                    <span className="text-xs text-brand-muted-sage/60">
                      {formatRelativeTime(u.published_at)}
                    </span>
                  </div>
                  <p className="mt-2 ml-6 text-sm leading-relaxed text-brand-muted-sage">{u.body}</p>
                </div>
              ))}
            </div>
          )}
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
