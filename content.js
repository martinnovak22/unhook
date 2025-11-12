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

(async () => {
  const { hideExploreEnabled } = await chrome.storage.sync.get("hideExploreEnabled");
  const { hideReelsEnabled } = await chrome.storage.sync.get("hideReelsEnabled");
  if (hideExploreEnabled){
    hideExploreLinks()
  }
  if (hideReelsEnabled){
    hideReelsLinks();
  }
})();
