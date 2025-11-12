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

export function getSafeRedirectURL(url) {
    if (url.includes("youtube.com")) return "https://www.youtube.com/";
    if (url.includes("facebook.com")) return "https://www.facebook.com/";
    if (url.includes("instagram.com")) return "https://www.instagram.com/";
    return "about:blank";
}
