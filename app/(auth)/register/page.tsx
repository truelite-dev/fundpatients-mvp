"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

export default function RegisterPage() {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    const supabase = createClient();
    const { error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { full_name: fullName } },
    });

    if (signUpError) {
      setError(signUpError.message);
      setSubmitting(false);
      return;
    }

    router.push("/login?registered=1");
  }

  return (
    <div className="w-full max-w-sm">
      <h1 className="font-display text-2xl font-semibold text-brand-forest">
        Join FundPatients
      </h1>
      <p className="mt-1 text-sm text-brand-muted-sage">
        Tell us your story, make a donation or become a partner
      </p>

      <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
        <label className="flex flex-col gap-1 text-sm">
          Full Name*
          <input
            required
            className="rounded-md border border-border px-3 py-2"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
        </label>
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
          disabled={submitting}
          className="rounded-full bg-brand-deep-green px-5 py-2 text-white hover:bg-brand-forest disabled:opacity-60"
        >
          {submitting ? "Creating account..." : "Continue with your email"}
        </button>
      </form>

      <p className="mt-4 text-sm text-brand-muted-sage">
        Already have an account?{" "}
        <Link href="/login" className="text-brand-deep-green">
          Login
        </Link>
      </p>
    </div>
  );
}
