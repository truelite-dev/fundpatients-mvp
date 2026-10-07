"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export function LogoutButton({
  className,
  children,
  role,
  onDone,
}: {
  className?: string;
  children: React.ReactNode;
  role?: string;
  onDone?: () => void;
}) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  async function logout() {
    setBusy(true);
    await createClient().auth.signOut();
    onDone?.();
    router.push("/login");
    router.refresh();
  }

  return (
    <button type="button" role={role} onClick={logout} disabled={busy} className={className}>
      {children}
    </button>
  );
}
