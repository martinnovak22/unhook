
import { isScrollableUrl, getSafeRedirectURL } from './utils/urlUtils.js';

function handleRedirect(tabId, changeInfo, tab) {
    if (changeInfo.status === 'complete' && tab.url) {
        if (isScrollableUrl(tab.url)) {
            const redirectUrl = getSafeRedirectURL(tab.url);
            console.log(`Redirecting from: ${tab.url} to ${redirectUrl}`);
            chrome.tabs.update(tabId, { url: redirectUrl });
        }
    }
}

chrome.tabs.onUpdated.addListener(handleRedirect);
chrome.tabs.onActivated.addListener(activeInfo => {
    chrome.tabs.get(activeInfo.tabId, (tab) => {
        handleRedirect(activeInfo.tabId, { status: 'complete' }, tab);
    });
});
