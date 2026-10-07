export const DEFAULT_AFTER_LOGIN = "/users/overview";

// Post-login redirect targets come from the URL, so only same-origin paths are
// honored: a single leading "/", no protocol-relative "//", no backslashes
// (browsers treat "\" like "/"), and no control characters.
export function safeNext(next: string | null | undefined, fallback = DEFAULT_AFTER_LOGIN): string {
  if (!next) return fallback;
  if (!next.startsWith("/") || next.startsWith("//")) return fallback;
  if (next.includes("\\") || /[\u0000-\u001f]/.test(next)) return fallback;
  return next;
}
