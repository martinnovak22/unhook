function hideExploreLinks() {
  const links = document.querySelectorAll('a[href*="/explore/"]');
  for (const link of links) {
    const target = link.closest("div, li, section, nav") || link;
    target.style.display = "none";
  }
}

function hideReelsLinks() {
  const links = document.querySelectorAll('a[href*="/reel"]');
  for (const link of links) {
    const target = link.closest("div, li, section, nav") || link;
    target.style.display = "none";
  }
}

async function initHideObserver(state) {
  const observer = new MutationObserver(async () => {
    if (state.hideExploreEnabled) hideExploreLinks();
    if (state.hideReelsEnabled) hideReelsLinks();
  });

  observer.observe(document.body, { childList: true, subtree: true });

  if (state.hideExploreEnabled) hideExploreLinks();
  if (state.hideReelsEnabled) hideReelsLinks();
}

(async () => {
  const state = await chrome.storage.sync.get([
    "hideExploreEnabled",
    "hideReelsEnabled"
  ]);
  if (!state.hideExploreEnabled && !state.hideReelsEnabled) return;

  initHideObserver(state);
})();
