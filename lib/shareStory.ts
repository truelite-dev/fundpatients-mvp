// Native share sheet where available, otherwise copy the story link.
// Returns true when the link was copied (so callers can flash "Link copied").
export async function shareStory(title: string, href: string): Promise<boolean> {
  const url = `${window.location.origin}${href}`;
  if (navigator.share) {
    try {
      await navigator.share({ title, url });
    } catch {
      // user dismissed the share sheet
    }
    return false;
  }
  return copyStoryLink(href);
}

export async function copyStoryLink(href: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(`${window.location.origin}${href}`);
    return true;
  } catch {
    return false;
  }
}
