"use client";

import { Share2 } from "lucide-react";

export function ShareButton({ caseId, title }: { caseId: string; title: string }) {
  async function handleShare() {
    const url = `${window.location.origin}/stories/${caseId}`;
    if (navigator.share) {
      try {
        await navigator.share({ title, url });
      } catch {
        // user dismissed the share sheet
      }
    } else {
      await navigator.clipboard.writeText(url);
    }
  }

  return (
    <button
      type="button"
      onClick={handleShare}
      className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm font-medium text-brand-muted-sage transition hover:border-brand-deep-green hover:text-brand-deep-green"
    >
      <Share2 className="h-4 w-4" />
      Share
    </button>
  );
}
