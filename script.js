const guide = document.querySelector("#guide");
const title = document.querySelector("title");
const container = document.querySelector("#contentContainer");
const guideButton = document.querySelector("#guide-button");

// Hides nav bar when loaded

guide.removeAttribute("guide-persistent-and-visible");
guide.removeAttribute("opened");
guide.setAttribute("mini-guide-visible", "");
container.removeAttribute("opened");

// Allows transitions to play

guideButton.addEventListener("click", () => guide.setAttribute("reveal-nav-bar", ""));

// Re-arranges thumbnails

document.addEventListener("afterscriptexecute", () => window.dispatchEvent(new Event("resize")));

// When URL changes, hides nav bar

new MutationObserver(() => {
	if (container.hasAttribute("opened")) guideButton.click();
}).observe(title, { childList: true });
