(function normalizeSiteNavigation() {
  const siteMarker = "AriaKawa.github.io/";
  const parentByPage = {
    "games.html": "index.html",
    "education.html": "index.html",
    "other.html": "index.html",
    "misc.html": "other.html",
    "in-progress.html": "other.html",

    "2048-rogue/index.html": "games.html",
    "expansion-io-blob/index.html": "games.html",
    "nightbound-autobattler/index.html": "games.html",
    "nightbound-survivors/index.html": "games.html",
    "rat-royale/index.html": "games.html",
    "isekai-reign.html": "games.html",
    "grid-runners/index.html": "games.html",
    "neon-ouroboros/index.html": "games.html",
    "RatRace.html": "games.html",
    "blackjack.html": "games.html",
    "type-off/index.html": "games.html",
    "trolley-game.html": "games.html",
    "thing-vs-thing.html": "games.html",
    "rat-kingdom.html": "games.html",
    "grand-war.html": "games.html",
    "ForFriends.html": "games.html",
    "newlywed.html": "games.html",
    "reaction-time.html": "games.html",
    "tapple.html": "games.html",
    "matthew-quiz.html": "games.html",

    "japanese-study.html": "education.html",
    "pokemon.html": "education.html",
    "type-helper.html": "education.html",
    "bass-guitar-frets.html": "education.html",

    "voice-scale/index.html": "other.html",
    "movie-recommender.html": "other.html",
    "movie-grid.html": "other.html",
    "Smash.html": "other.html",
    "league-tracker.html": "other.html",
    "innuendo-tee.html": "other.html",

    "AutoRogue/index.html": "other.html",
    "Council.html": "other.html"
  };

  const backSelector = [
    "[data-back-button]",
    "[data-nav-back]",
    ".category__back",
    ".back-link",
    ".back-button",
    ".back-nav__button",
    ".back-nav__link",
    ".back-action"
  ].join(",");

  function normalizeKey(value) {
    if (!value) {
      return "index.html";
    }

    let key = decodeURIComponent(value).replace(/\\/g, "/").split("#")[0].split("?")[0];
    const markerIndex = key.indexOf(siteMarker);
    if (markerIndex >= 0) {
      key = key.slice(markerIndex + siteMarker.length);
    }

    key = key.replace(/^\/+/, "");
    key = key.replace(/^([A-Za-z]:\/)/, "");
    key = key.replace(/^.*\/AriaKawa\.github\.io\//, "");

    if (!key || key === ".") {
      return "index.html";
    }

    if (key.endsWith("/")) {
      return `${key}index.html`;
    }

    const last = key.split("/").pop() || "";
    if (!last.includes(".")) {
      return `${key}/index.html`;
    }

    return key;
  }

  function currentKey() {
    return normalizeKey(window.location.pathname || window.location.href);
  }

  function keyDepth(key) {
    const parts = key.split("/");
    return Math.max(0, parts.length - 1);
  }

  function relativeUrl(targetKey) {
    const prefix = "../".repeat(keyDepth(currentKey()));
    return `${prefix}${targetKey}`;
  }

  function internalReferrerKey() {
    if (!document.referrer) {
      return "";
    }

    try {
      const referrer = new URL(document.referrer);
      const here = new URL(window.location.href);
      const sameWebOrigin = referrer.origin === here.origin;
      const bothFiles = referrer.protocol === "file:" && here.protocol === "file:";
      if (!sameWebOrigin && !bothFiles) {
        return "";
      }

      const key = normalizeKey(referrer.pathname || referrer.href);
      return key === currentKey() ? "" : key;
    } catch {
      return "";
    }
  }

  function targetForCurrentPage() {
    const key = currentKey();
    if (key === "index.html") {
      return "index.html";
    }

    return parentByPage[key] || internalReferrerKey() || "index.html";
  }

  function goBack(event) {
    const trigger = event.target instanceof Element ? event.target.closest(backSelector) : null;
    if (!trigger) {
      return;
    }

    event.preventDefault();
    event.stopImmediatePropagation();
    window.location.href = relativeUrl(targetForCurrentPage());
  }

  function hydrateBackLinks() {
    const target = relativeUrl(targetForCurrentPage());
    document.querySelectorAll(backSelector).forEach((trigger) => {
      if (trigger instanceof HTMLAnchorElement) {
        trigger.href = target;
      }
    });
  }

  document.addEventListener("click", goBack, true);

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", hydrateBackLinks, { once: true });
  } else {
    hydrateBackLinks();
  }
})();
