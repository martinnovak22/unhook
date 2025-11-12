import { getSetting, setSetting } from "./utils/storageUtils.js";

const toggle = document.getElementById("anti-scroll-toggle");

async function init() {
    const enabled = await getSetting("enabled", true);
    toggle.checked = enabled;

    toggle.addEventListener("change", async () => {
        await setSetting("enabled", toggle.checked);
    });
}

init();
