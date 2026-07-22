import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

// Refreshes the Supabase auth session on every request. Phase 1 has no
// protected routes yet (no dashboards) — the only auth-aware behavior is
// bouncing an already-signed-in user away from /login and /register.
export async function updateSession(request: NextRequest) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    console.warn(
      "[middleware] Supabase env vars not configured — skipping session refresh. See CLAUDE.md."
    );
    return NextResponse.next({ request });
  }

  let response = NextResponse.next({ request });

  const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
        response = NextResponse.next({ request });
        cookiesToSet.forEach(({ name, value, options }) =>
          response.cookies.set(name, value, options)
        );
      },
    },
  });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const authOnlyPaths = ["/login", "/register", "/forgot-password"];
  if (user && authOnlyPaths.includes(request.nextUrl.pathname)) {
    const target = request.nextUrl.clone();
    target.pathname = "/";
    return NextResponse.redirect(target);
  }

  return response;
}
