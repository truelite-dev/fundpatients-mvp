"use client";

import { useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import Image from "next/image";
import { Check, HeartHandshake, Link2, MessageSquare, MoreHorizontal, Share2, X } from "lucide-react";
import { CasePlaceholder } from "@/components/public/CasePlaceholder";
import { createClient } from "@/lib/supabase/client";
import { copyStoryLink, shareStory } from "@/lib/shareStory";
import { inputClass } from "@/lib/formStyles";

export type UpdateCardCase = {
  groupId: string;
  caseId?: string;
  title: string;
  href: string;
  excerpt?: string;
  coverImageUrl?: string | null;
};

const iconButton =
  "flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white text-brand-deep-green transition hover:bg-brand-deep-green hover:text-white disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-white disabled:hover:text-brand-deep-green";
const menuItem =
  "flex w-full items-center gap-3 rounded-xl px-3 py-2 text-left text-sm text-brand-forest transition hover:bg-brand-soft-sage";

export function UpdateCardActions({ story }: { story: UpdateCardCase }) {
  const [commentOpen, setCommentOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!menuOpen) return;
    const onDown = (e: MouseEvent) => {
      if (!menuRef.current?.contains(e.target as Node)) setMenuOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenuOpen(false);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  function flashCopied() {
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  }

  async function share() {
    if (await shareStory(story.title, story.href)) flashCopied();
  }

  async function copy() {
    if (await copyStoryLink(story.href)) flashCopied();
  }

  return (
    <div className="flex shrink-0 items-center gap-2">
      <button
        type="button"
        aria-label="Add comment"
        title="Add comment"
        disabled={!story.caseId}
        onClick={() => setCommentOpen(true)}
        className={iconButton}
      >
        <MessageSquare className="h-4 w-4" />
      </button>
      <button type="button" aria-label="Share case" title="Share case" onClick={share} className={iconButton}>
        <Share2 className="h-4 w-4" />
      </button>

      <div ref={menuRef} className="relative">
        <button
          type="button"
          aria-label="More actions"
          title="More"
          aria-haspopup="menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((o) => !o)}
          className={iconButton}
        >
          <MoreHorizontal className="h-4 w-4" />
        </button>
        {menuOpen && (
          <div
            role="menu"
            className="absolute right-0 z-20 mt-2 min-w-[200px] rounded-2xl border border-border bg-white p-2 shadow-[0_16px_40px_-12px_rgba(11,31,14,0.18)]"
          >
            <Link role="menuitem" href={story.href} className={menuItem} onClick={() => setMenuOpen(false)}>
              <HeartHandshake className="h-4 w-4 text-brand-muted-sage" />
              View story
            </Link>
            {story.caseId && (
              <Link
                role="menuitem"
                href={`/donate?case=${story.caseId}`}
                className={menuItem}
                onClick={() => setMenuOpen(false)}
              >
                <HeartHandshake className="h-4 w-4 text-brand-muted-sage" />
                Donate to this story
              </Link>
            )}
            <button
              type="button"
              role="menuitem"
              className={menuItem}
              onClick={async () => {
                await copy();
                setMenuOpen(false);
              }}
            >
              {copied ? (
                <Check className="h-4 w-4 text-brand-deep-green" />
              ) : (
                <Link2 className="h-4 w-4 text-brand-muted-sage" />
              )}
              {copied ? "Link copied" : "Copy link"}
            </button>
          </div>
        )}
      </div>

      {commentOpen && story.caseId && (
        <CommentModal story={{ ...story, caseId: story.caseId }} onClose={() => setCommentOpen(false)} />
      )}
    </div>
  );
}

function CommentModal({
  story,
  onClose,
}: {
  story: UpdateCardCase & { caseId: string };
  onClose: () => void;
}) {
  const titleId = useId();
  const [body, setBody] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [posted, setPosted] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    textareaRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  useEffect(() => {
    if (!posted) return;
    const t = setTimeout(onClose, 1200);
    return () => clearTimeout(t);
  }, [posted, onClose]);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    const text = body.trim();
    if (!text) return;
    setBusy(true);
    setError(null);
    const supabase = createClient();
    const { data } = await supabase.auth.getUser();
    const user = data.user;
    if (!user) {
      setError("Please log in to comment.");
      setBusy(false);
      return;
    }
    const authorName =
      (user.user_metadata?.full_name as string | undefined)?.trim() || user.email?.split("@")[0] || "Donor";
    const { error: insertError } = await supabase
      .from("case_comments")
      .insert({ case_id: story.caseId, author_id: user.id, author_name: authorName, body: text });
    setBusy(false);
    if (insertError) {
      setError("Couldn't post your comment. Please try again.");
      return;
    }
    setPosted(true);
  }

  return createPortal(
    <div className="fixed inset-0 z-[100] flex items-end justify-center bg-brand-forest/40 p-3 backdrop-blur-sm sm:items-center sm:p-6">
      <div className="absolute inset-0" onClick={onClose} aria-hidden="true" />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="relative w-full max-w-lg overflow-hidden rounded-3xl bg-white shadow-[0_24px_60px_-12px_rgba(11,31,14,0.35)]"
      >
        <div className="flex items-center justify-between border-b border-border px-5 py-4">
          <h2 id={titleId} className="font-display text-lg font-semibold text-brand-forest">
            Add a comment
          </h2>
          <button
            type="button"
            aria-label="Close"
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-full text-brand-muted-sage transition hover:bg-brand-soft-sage hover:text-brand-forest"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <form onSubmit={submit} className="px-5 py-4">
          <div className="flex gap-3 rounded-2xl bg-neutral-100 p-3">
            <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl">
              {story.coverImageUrl ? (
                <Image src={story.coverImageUrl} alt="" fill unoptimized className="object-cover" />
              ) : (
                <CasePlaceholder seed={story.caseId} />
              )}
            </div>
            <div className="min-w-0">
              <p className="line-clamp-2 font-display text-sm font-semibold text-brand-forest">{story.title}</p>
              {story.excerpt && (
                <p className="mt-1 line-clamp-3 text-xs text-brand-muted-sage">{story.excerpt}</p>
              )}
            </div>
          </div>

          <label htmlFor={`${titleId}-body`} className="mt-4 block text-sm font-medium text-brand-forest">
            Your comment
          </label>
          <textarea
            id={`${titleId}-body`}
            ref={textareaRef}
            value={body}
            onChange={(e) => setBody(e.target.value)}
            rows={4}
            maxLength={1000}
            placeholder="Share a word of encouragement…"
            className={`mt-2 w-full resize-none ${inputClass} text-sm text-brand-forest placeholder:text-brand-muted-sage`}
          />

          {error && (
            <p role="alert" className="mt-2 text-sm text-red-600">
              {error}
            </p>
          )}
          {posted && (
            <p role="status" className="mt-2 text-sm font-medium text-brand-deep-green">
              Comment posted. Thank you!
            </p>
          )}

          <div className="mt-4 flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-full border border-border px-4 py-2 text-sm font-medium text-brand-forest transition hover:border-brand-deep-green"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={busy || posted || !body.trim()}
              className="rounded-full bg-brand-deep-green px-5 py-2 text-sm font-medium text-white transition hover:bg-brand-forest disabled:cursor-not-allowed disabled:opacity-50"
            >
              {busy ? "Posting…" : "Post comment"}
            </button>
          </div>
        </form>
      </div>
    </div>,
    document.body
  );
}
