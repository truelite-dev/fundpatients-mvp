import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { safeNext } from "@/lib/auth/safeNext";

// Refreshes the Supabase auth session on every request, gates the logged-in
// area (/users/*) behind a session, and bounces an already-signed-in user away
// from the auth pages.
const isProtectedPath = (pathname: string) => pathname === "/users" || pathname.startsWith("/users/");

function redirectToLogin(request: NextRequest) {
  const target = request.nextUrl.clone();
  target.pathname = "/login";
  target.search = "";
  target.searchParams.set("next", request.nextUrl.pathname + request.nextUrl.search);
  return NextResponse.redirect(target);
}

export async function updateSession(request: NextRequest) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    console.warn(
      "[middleware] Supabase env vars not configured — skipping session refresh. See CLAUDE.md."
    );
    // Fail closed: without Supabase we can't verify a session, so don't serve
    // the logged-in area.
    if (isProtectedPath(request.nextUrl.pathname)) return redirectToLogin(request);
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
    // next may carry a query string (e.g. /users/donations?tab=history), so
    // split it rather than assigning it to pathname.
    const dest = new URL(safeNext(request.nextUrl.searchParams.get("next")), request.url);
    target.pathname = dest.pathname;
    target.search = dest.search;
    return NextResponse.redirect(target);
  }

  if (!user && isProtectedPath(request.nextUrl.pathname)) {
    const redirect = redirectToLogin(request);
    // Carry over any refreshed-session cookies set above.
    response.cookies.getAll().forEach((c) => redirect.cookies.set(c));
    return redirect;
  }

  return response;
}
