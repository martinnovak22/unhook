import { isScrollableUrl, getSafeRedirectURL } from "./utils/urlUtils.js";
import { getSetting } from "./utils/storageUtils.js";

async function handleRedirect(tabId, changeInfo, tab) {
    if (changeInfo.status !== "complete" || !tab.url) return;

    const enabled = await getSetting("enabled", true);
    if (!enabled) return;

    if (isScrollableUrl(tab.url)) {
        const redirectUrl = getSafeRedirectURL(tab.url);
        console.log(`Redirecting from: ${tab.url} to ${redirectUrl}`);
        chrome.tabs.update(tabId, { url: redirectUrl });
    }
}

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) =>
    handleRedirect(tabId, changeInfo, tab)
);

chrome.tabs.onActivated.addListener(async (activeInfo) => {
    const tab = await chrome.tabs.get(activeInfo.tabId);
    handleRedirect(activeInfo.tabId, { status: "complete" }, tab);
});
