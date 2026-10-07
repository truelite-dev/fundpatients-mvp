import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { safeNext } from "@/lib/auth/safeNext";

// Landing point for Supabase email links (signup confirmation, password
// recovery). Supabase verifies the token, then redirects here with a PKCE
// `?code=`; we exchange it for a session (sets the auth cookies) and send the
// user on to `next`. The exchange needs the code_verifier cookie set when the
// flow started, so the link has to be opened in the same browser.
export async function GET(request: NextRequest) {
  const { searchParams, origin } = request.nextUrl;
  const next = safeNext(searchParams.get("next"));
  const code = searchParams.get("code");

  // Recovery links should fail back to the page that can issue a new one.
  const failure = next.startsWith("/reset-password") ? "/forgot-password" : "/login";
  const fail = () => NextResponse.redirect(new URL(`${failure}?error=link_invalid`, origin));

  // Supabase reports expired/used links as ?error=... instead of a code.
  if (searchParams.get("error") || !code) return fail();

  const supabase = await createClient();
  const { error } = await supabase.auth.exchangeCodeForSession(code);
  if (error) return fail();

  return NextResponse.redirect(new URL(next, origin));
}
