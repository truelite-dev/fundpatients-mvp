"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    const supabase = createClient();
    const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });

    if (signInError) {
      setError(signInError.message);
      setSubmitting(false);
      return;
    }

    router.push("/");
    router.refresh();
  }

  return (
    <div className="w-full max-w-sm">
      <h1 className="font-display text-2xl font-semibold text-brand-forest">Welcome back</h1>
      <p className="mt-1 text-sm text-brand-muted-sage">
        Tell your story, make a donation or become a partner
      </p>

      <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
        <label className="flex flex-col gap-1 text-sm">
          Email address*
          <input
            required
            type="email"
            className="rounded-md border border-border px-3 py-2"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label className="flex flex-col gap-1 text-sm">
          Password*
          <input
            required
            type="password"
            className="rounded-md border border-border px-3 py-2"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <Link href="/forgot-password" className="self-end text-sm text-brand-deep-green">
          Forgot Password?
        </Link>
        {error && <p className="text-sm text-red-600">{error}</p>}
        <button
          type="submit"
          disabled={submitting}
          className="rounded-full bg-brand-deep-green px-5 py-2 text-white hover:bg-brand-forest disabled:opacity-60"
        >
          {submitting ? "Signing in..." : "Login"}
        </button>
      </form>

      <p className="mt-4 text-sm text-brand-muted-sage">
        Don&apos;t have an account?{" "}
        <Link href="/register" className="text-brand-deep-green">
          Register
        </Link>
      </p>
    </div>
  );
}
