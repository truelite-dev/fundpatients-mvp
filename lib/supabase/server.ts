import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

// For use in Server Components / Route Handlers where the caller's session
// should be respected and RLS applied.
export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // setAll called from a Server Component without a mutable
            // response — safe to ignore when middleware refreshes sessions.
          }
        },
      },
    }
  );
}

// Service-role client: bypasses RLS. Server-only, never import from a
// component that could end up in a client bundle. Used for writes the public
// (unauthenticated) flow needs to make — request-help submissions,
// become-partner applications, and donation records — since those tables
// have no anon/authenticated write policies (see supabase/migrations/0001_init.sql).
import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import "server-only";

export function createServiceRoleClient() {
  return createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { autoRefreshToken: false, persistSession: false } }
  );
}
