"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function ResetPasswordPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  // null = still checking. The recovery session is created by /auth/callback.
  const [hasSession, setHasSession] = useState<boolean | null>(null);

  useEffect(() => {
    createClient()
      .auth.getUser()
      .then(({ data }) => setHasSession(!!data.user));
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    const supabase = createClient();
    const { error: updateError } = await supabase.auth.updateUser({ password });

    if (updateError) {
      setError(updateError.message);
      setSubmitting(false);
      return;
    }

    // The recovery session is already signed in with the new password.
    router.push("/users/overview");
    router.refresh();
  }

  if (hasSession === false) {
    return (
      <div className="w-full max-w-sm">
        <h1 className="font-display text-2xl font-semibold text-brand-forest">Reset link expired</h1>
        <p className="mt-2 text-sm text-brand-muted-sage">
          This page needs a valid reset link. Request a new one to set your password.
        </p>
        <Link
          href="/forgot-password"
          className="mt-6 inline-block rounded-full bg-brand-deep-green px-5 py-2 text-white hover:bg-brand-forest"
        >
          Request a new link
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full max-w-sm">
      <h1 className="font-display text-2xl font-semibold text-brand-forest">
        Set a new password
      </h1>

      <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
        <label className="flex flex-col gap-1 text-sm">
          New password*
          <input
            required
            minLength={6}
            type="password"
            className="rounded-md border border-border px-3 py-2"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        {error && <p className="text-sm text-red-600">{error}</p>}
        <button
          type="submit"
          disabled={submitting || hasSession === null}
          className="rounded-full bg-brand-deep-green px-5 py-2 text-white hover:bg-brand-forest disabled:opacity-60"
        >
          {submitting ? "Saving..." : "Update password"}
        </button>
      </form>
    </div>
  );
}
