import { getSetting } from "./storageUtils.js";

export function isScrollableUrl(url) {
    if (!url) return false;
    try {
        const parsed = new URL(url);
        const { hostname, pathname } = parsed;

        return (
            (hostname.includes("youtube.com") && pathname.startsWith("/shorts")) ||
            (hostname.includes("facebook.com") && pathname.includes("/reel/")) ||
            (hostname.includes("instagram.com") && pathname.includes("/reels/"))
        );
    } catch {
        return false;
    }
}

export async function getSafeRedirectURL(url) {
  const stored = await getSetting("customRedirectURL", "");

  if (stored) return stored;

  if (url.includes("youtube.com")) return "https://www.youtube.com/";
  if (url.includes("facebook.com")) return "https://www.facebook.com/";
  if (url.includes("instagram.com")) return "https://www.instagram.com/";

  return "about:blank";
}

export function normalizeUrl(input) {
  if (!input) return "";
  let url = input.trim();
  if (/^https?:\/\//i.test(url)) {
    try {
      return new URL(url).toString();
    } catch {
      return "";
    }
  }
  try {
    return new URL(`https://${url}`).toString();
  } catch {
    return "";
  }
}
