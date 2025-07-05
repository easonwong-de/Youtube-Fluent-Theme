// ==UserScript==
// @name         No YouTube Mini Guide
// @namespace    easonwong
// @version      1.0
// @description  Removes YouTube's mini guide
// @match        https://www.youtube.com/*
// @icon         https://raw.githubusercontent.com/dheereshagrwal/coloured-icons/refs/heads/master/public/logos/social%20media/youtube/youtube.svg
// @grant        none
// ==/UserScript==

(function () {
	"use strict";

	const css = `
ytd-page-manager.ytd-app {
    margin-left: 0 !important;
}
ytd-mini-guide-renderer.ytd-app,
ytd-mini-guide-renderer.ytd-app * {
    width: 0 !important;
}
ytd-playlist-sidebar-renderer.ytd-browse,
ytd-playlist-header-renderer.ytd-browse {
    left: 0 !important;
}
tp-yt-app-drawer#guide {
    width: auto !important;
    right: 0 !important;
    transition-property: visibility !important;
    transition-duration: 200ms !important;
}
#contentContainer.tp-yt-app-drawer {
    width: var(--app-drawer-width, 256px) !important;
    transform: translateX(-100%) !important;
    transition: transform 200ms cubic-bezier(0, 0.8, 0.2, 1) !important;
    background-color: var(--yt-frosted-glass-desktop);
    backdrop-filter: blur(48px);
}
tp-yt-app-drawer#guide[opened][reveal-nav-bar] #scrim.tp-yt-app-drawer {
    opacity: 1 !important;
}
*[reveal-nav-bar] #contentContainer.tp-yt-app-drawer[opened] {
    transform: translateX(0) !important;
}
ytd-app {
    --app-drawer-width: 340px !important;
}
ytd-guide-renderer.ytd-app {
    width: var(--app-drawer-width, 256px) !important;
}
ytd-guide-entry-renderer {
    width: 100% !important;
}
#scrim,
#scrim.tp-yt-app-drawer {
    transition-property: opacity, backdrop-filter !important;
    transition-duration: 200ms !important;
    transition-timing-function: cubic-bezier(0, 0.8, 0.2, 1) !important;
    backdrop-filter: blur(5px) !important;
    background-color: transparent !important;
    left: var(--app-drawer-width, 256px) !important;
}
#guide-button.ytd-app:hover {
    background-color: var(--yt-spec-10-percent-layer) !important;
    border-radius: 24px !important;
}
#contents.ytd-rich-grid-renderer {
    margin-left: calc(var(--ytd-rich-grid-item-margin)/2 + var(--ytd-rich-grid-gutter-margin)) !important;
}
ytd-rich-item-renderer[rendered-from-rich-grid][is-in-first-column] {
    margin-left: calc(var(--ytd-rich-grid-item-margin)/2) !important;
}
#content.ytd-rich-section-renderer {
    margin-left: calc(var(--ytd-rich-grid-item-margin)/2) !important;
}
#contents.ytd-rich-shelf-renderer {
    padding-bottom: 24px !important;
}
.ytd-rich-grid-renderer,
.ytd-rich-shelf-renderer {
    --ytd-rich-grid-items-per-row: 5 !important;
}
.ytp-caption-segment {
    color: white !important;
    font-family: sans-serif !important;
    font-size: 2rem !important;
    background: none !important;
    text-shadow: 0 0 5px black;
}
.tp-yt-paper-toast,
tp-yt-paper-toast,
#text.yt-notification-action-renderer,
#sub-text.yt-notification-action-renderer {
    background: rgba(50,50,50,0.5) !important;
    color: var(--yt-spec-text-primary) !important;
    backdrop-filter: blur(25px);
    -webkit-backdrop-filter: blur(25px);
    border-radius: 10px !important;
    z-index: 100;
}
#infoImage,
#sbSkipIconControlBarImage {
    height: 45% !important;
}
.ytp-right-controls #ytp-efyt-controls {
    transition: max-width 0.5s cubic-bezier(0, 0.8, 0.2, 1) !important;
    mask-image: linear-gradient(to right, transparent 0px, black 10px) !important;
    padding-left: 10px !important;
}
.ytp-right-controls #ytp-efyt-controls > :not(#efyt-controls-button) {
    opacity: 0 !important;
    transition: opacity 0.4s cubic-bezier(0, 0.8, 0.2, 1) !important;
}
.ytp-right-controls #ytp-efyt-controls:hover > :not(#efyt-controls-button),
.ytp-right-controls #ytp-efyt-controls.visible > :not(#efyt-controls-button) {
    opacity: 1 !important;
}
#efyt-controls-button,
.ytp-efyt-button {
    display: grid !important;
    justify-content: center !important;
    align-items: center !important;
}
#efyt-controls-button[hidden],
.ytp-efyt-button[hidden] {
    display: none !important;
}
#efyt-controls-button svg,
.ytp-efyt-button svg {
    max-height: 40px !important;
}
`;

	const injectStyle = () => {
		const style = document.createElement("style");
		style.textContent = css;
		document.head.appendChild(style);
	};

	const init = () => {
		const guide = document.querySelector("#guide");
		const title = document.querySelector("title");
		const container = document.querySelector("#contentContainer");
		const guideButton = document.querySelector("#guide-button");

		if (!(guide && title && container && guideButton)) return;

		guide.removeAttribute("guide-persistent-and-visible");
		guide.removeAttribute("opened");
		guide.setAttribute("mini-guide-visible", "");
		container.removeAttribute("opened");

		guideButton.addEventListener("click", () => guide.setAttribute("reveal-nav-bar", ""));
		document.addEventListener("afterscriptexecute", () => window.dispatchEvent(new Event("resize")));

		new MutationObserver(() => {
			if (container.hasAttribute("opened")) guideButton.click();
		}).observe(title, { childList: true });
	};

	injectStyle();

	const observer = new MutationObserver(() => {
		if (document.querySelector("#guide-button")) {
			init();
			observer.disconnect();
		}
	});

	observer.observe(document, { childList: true, subtree: true });
})();
