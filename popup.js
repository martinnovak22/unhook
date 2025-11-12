import { getSetting, setSetting } from "./utils/storageUtils.js";

const redirectToggle = document.getElementById("anti-scroll-toggle");
const hideExploreToggle = document.getElementById("hide-explore-toggle");
const hideReelsToggle = document.getElementById("hide-reels-toggle");

async function init() {
  const [redirectEnabled, hideExploreEnabled, hideReelsEnabled] = await Promise.all([
    getSetting("redirectEnabled", true),
    getSetting("hideExploreEnabled", true),
    getSetting("hideReelsEnabled", true),
  ]);

  redirectToggle.checked = redirectEnabled;
  hideExploreToggle.checked = hideExploreEnabled;
  hideReelsToggle.checked = hideReelsEnabled;

  redirectToggle.addEventListener("change", async () => {
    await setSetting("redirectEnabled", redirectToggle.checked);
  });

  hideExploreToggle.addEventListener("change", async () => {
    await setSetting("hideExploreEnabled", hideExploreToggle.checked);
  });

  hideReelsToggle.addEventListener("change", async () => {
    await setSetting("hideReelsEnabled", hideReelsToggle.checked);
  });
}

init();
