import { getSetting, setSetting } from "./utils/storageUtils.js";
import { normalizeUrl } from "./utils/urlUtils.js";

const redirectToggle = document.getElementById("anti-scroll-toggle");
const hideExploreToggle = document.getElementById("hide-explore-toggle");
const hideReelsToggle = document.getElementById("hide-reels-toggle");
const customRedirectURLInput = document.getElementById("custom-redirect-url");

async function init() {
  const [redirectEnabled, hideExploreEnabled, hideReelsEnabled, customRedirectURL] = await Promise.all([
    getSetting("redirectEnabled", true),
    getSetting("hideExploreEnabled", true),
    getSetting("hideReelsEnabled", true),
    getSetting("customRedirectURL", "about:blank"),
  ]);

  redirectToggle.checked = redirectEnabled;
  hideExploreToggle.checked = hideExploreEnabled;
  hideReelsToggle.checked = hideReelsEnabled;
  customRedirectURLInput.value = customRedirectURL;

  redirectToggle.addEventListener("change", async () => {
    await setSetting("redirectEnabled", redirectToggle.checked);
  });

  hideExploreToggle.addEventListener("change", async () => {
    await setSetting("hideExploreEnabled", hideExploreToggle.checked);
  });

  hideReelsToggle.addEventListener("change", async () => {
    await setSetting("hideReelsEnabled", hideReelsToggle.checked);
  });

  customRedirectURLInput.addEventListener("change", async () => {
    const sanitized = normalizeUrl(customRedirectURLInput.value);
    await setSetting("customRedirectURL", sanitized);
    customRedirectURLInput.value = sanitized;
  });
}

init();
