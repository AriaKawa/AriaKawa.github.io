const storageKey = "market-scout-state-v2";

const defaultSettings = {
  query: "bass guitar",
  city: "Dallas, TX",
  radius: "25",
  maxPrice: "450",
  source: "all",
  minScore: "0",
  include: "fender,squier,ibanez,yamaha,sterling,music man,jazz bass,p bass",
  exclude: "case only,broken,parts,trade only,wanted,iso",
  sort: "score",
  view: "cards",
};

const sampleListings = [
  {
    id: crypto.randomUUID(),
    source: "facebook",
    title: "Squier Classic Vibe 70s Jazz Bass",
    price: 280,
    location: "Plano, TX",
    distance: 18,
    posted: "Today",
    url: "https://www.facebook.com/marketplace/search/?query=squier%20classic%20vibe%20jazz%20bass",
    description: "Natural finish, upgraded strings, minor buckle rash. Includes gig bag.",
    image: "",
  },
  {
    id: crypto.randomUUID(),
    source: "ebay",
    title: "Sterling by Music Man SUB Ray4 Bass",
    price: 239,
    location: "Ships from Oklahoma",
    distance: 0,
    posted: "Buy it now",
    url: "https://www.ebay.com/sch/i.html?_nkw=sterling+sub+ray4+bass",
    description: "Clean used listing with shipping included. Good comp anchor for local offers.",
    image: "",
  },
  {
    id: crypto.randomUUID(),
    source: "facebook",
    title: "Ibanez SR300E Bass Guitar",
    price: 320,
    location: "Fort Worth, TX",
    distance: 34,
    posted: "2 days ago",
    url: "https://www.facebook.com/marketplace/search/?query=ibanez%20sr300e",
    description: "Active electronics, very clean, open to reasonable offers.",
    image: "",
  },
  {
    id: crypto.randomUUID(),
    source: "ebay",
    title: "Yamaha TRBX174 Electric Bass",
    price: 199,
    location: "Ships from Texas",
    distance: 0,
    posted: "New listing",
    url: "https://www.ebay.com/sch/i.html?_nkw=yamaha+trbx174+bass",
    description: "Comparable eBay listing for quick price ceiling checks.",
    image: "",
  },
  {
    id: crypto.randomUUID(),
    source: "facebook",
    title: "Fender Rumble 40 Bass Amp",
    price: 130,
    location: "Garland, TX",
    distance: 12,
    posted: "Today",
    url: "https://www.facebook.com/marketplace/search/?query=fender%20rumble%2040",
    description: "Practice amp in great condition. Useful bundle target.",
    image: "",
  },
  {
    id: crypto.randomUUID(),
    source: "facebook",
    title: "Broken bass guitar for parts",
    price: 90,
    location: "Denton, TX",
    distance: 41,
    posted: "1 week ago",
    url: "https://www.facebook.com/marketplace/search/?query=broken%20bass%20guitar",
    description: "Needs wiring work. Selling as-is.",
    image: "",
  },
  {
    id: crypto.randomUUID(),
    source: "facebook",
    title: "Sterling by Music Man SUB Ray4",
    price: 225,
    location: "Arlington, TX",
    distance: 22,
    posted: "Yesterday",
    url: "https://www.facebook.com/marketplace/search/?query=sterling%20sub%20ray4",
    description: "Blue finish, plays well. Moving sale price.",
    image: "",
  },
];

const state = {
  listings: [],
  favorites: new Set(),
  savedSearches: [],
  activeFilter: "all",
};

const els = {
  query: document.querySelector("#queryInput"),
  city: document.querySelector("#cityInput"),
  radius: document.querySelector("#radiusInput"),
  maxPrice: document.querySelector("#maxPriceInput"),
  source: document.querySelector("#sourceInput"),
  minScore: document.querySelector("#minScoreInput"),
  minScoreValue: document.querySelector("#minScoreValue"),
  include: document.querySelector("#includeInput"),
  exclude: document.querySelector("#excludeInput"),
  sort: document.querySelector("#sortInput"),
  view: document.querySelector("#viewInput"),
  importInput: document.querySelector("#importInput"),
  listingArea: document.querySelector("#listingArea"),
  cardTemplate: document.querySelector("#listingCardTemplate"),
  matchCount: document.querySelector("#matchCount"),
  dealCount: document.querySelector("#dealCount"),
  avgPrice: document.querySelector("#avgPrice"),
  sourceMix: document.querySelector("#sourceMix"),
  savedSearches: document.querySelector("#savedSearches"),
  soldCompsLink: document.querySelector("#soldCompsLink"),
};

function normalizeList(value) {
  return value
    .split(",")
    .map((item) => item.trim().toLowerCase())
    .filter(Boolean);
}

function money(value) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(Number(value || 0));
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function readSettings() {
  return {
    query: els.query.value.trim(),
    city: els.city.value.trim(),
    radius: Number(els.radius.value || 25),
    maxPrice: Number(els.maxPrice.value || Infinity),
    source: els.source.value,
    minScore: Number(els.minScore.value || 0),
    include: normalizeList(els.include.value),
    exclude: normalizeList(els.exclude.value),
  };
}

function listingSource(listing) {
  const source = String(listing.source || "").toLowerCase();
  if (source.includes("ebay") || String(listing.url || "").includes("ebay.")) return "ebay";
  return "facebook";
}

function listingText(listing) {
  return `${listing.title || ""} ${listing.description || ""}`.toLowerCase();
}

function listingScore(listing, settings) {
  const text = listingText(listing);
  const includeHits = settings.include.filter((word) => text.includes(word)).length;
  const queryHits = settings.query
    .toLowerCase()
    .split(/\s+/)
    .filter((word) => word.length > 2 && text.includes(word)).length;
  const price = Number(listing.price || 0);
  const distance = Number(listing.distance || settings.radius);
  const priceDelta = Number.isFinite(settings.maxPrice) && price ? (settings.maxPrice - price) / settings.maxPrice : 0;
  const priceBonus = price ? clamp(priceDelta * 36, -34, 34) : -18;
  const distanceBonus = listingSource(listing) === "facebook" ? clamp((settings.radius - distance) / 2, -18, 22) : 8;
  const freshBonus = /today|hour|minute|new|yesterday/i.test(listing.posted || "") ? 14 : 0;
  const sourceBonus = listingSource(listing) === "ebay" ? 4 : 0;

  return clamp(Math.round(18 + includeHits * 14 + queryHits * 10 + priceBonus + distanceBonus + freshBonus + sourceBonus), 0, 100);
}

function isExcluded(listing, settings) {
  const text = listingText(listing);
  return settings.exclude.some((word) => text.includes(word));
}

function isLikelyDeal(listing, settings) {
  const price = Number(listing.price || 0);
  return listing.score >= 58 || (price > 0 && price <= settings.maxPrice * 0.72);
}

function enrichedListings() {
  const settings = readSettings();
  return state.listings
    .map((listing) => {
      const source = listingSource(listing);
      return {
        ...listing,
        source,
        score: listingScore({ ...listing, source }, settings),
        favorite: state.favorites.has(listing.id),
      };
    })
    .filter((listing) => Number(listing.price || 0) <= settings.maxPrice)
    .filter((listing) => listing.source === "ebay" || Number(listing.distance || 0) <= settings.radius)
    .filter((listing) => settings.source === "all" || listing.source === settings.source)
    .filter((listing) => listing.score >= settings.minScore)
    .filter((listing) => !isExcluded(listing, settings))
    .filter((listing) => {
      if (state.activeFilter === "favorites") return listing.favorite;
      if (state.activeFilter === "nearby") return listing.source === "facebook" && Number(listing.distance || 999) <= 25;
      if (state.activeFilter === "deals") return isLikelyDeal(listing, settings);
      if (state.activeFilter === "facebook") return listing.source === "facebook";
      if (state.activeFilter === "ebay") return listing.source === "ebay";
      return true;
    });
}

function sortListings(listings) {
  return [...listings].sort((a, b) => {
    if (els.sort.value === "priceAsc") return Number(a.price || 0) - Number(b.price || 0);
    if (els.sort.value === "priceDesc") return Number(b.price || 0) - Number(a.price || 0);
    if (els.sort.value === "distanceAsc") return Number(a.distance || 999) - Number(b.distance || 999);
    if (els.sort.value === "newest") return freshness(b.posted) - freshness(a.posted);
    return b.score - a.score;
  });
}

function freshness(posted = "") {
  if (/minute|hour|today|new/i.test(posted)) return 4;
  if (/yesterday/i.test(posted)) return 3;
  if (/day|2 days|3 days/i.test(posted)) return 2;
  if (/week/i.test(posted)) return 1;
  return 0;
}

function render() {
  const visible = sortListings(enrichedListings());
  els.minScoreValue.textContent = els.minScore.value;
  els.soldCompsLink.href = buildEbaySoldUrl();
  els.listingArea.className = els.view.value === "list" ? "listing-grid list" : "listing-grid";
  els.listingArea.replaceChildren();

  if (!visible.length) {
    const empty = document.createElement("div");
    empty.className = "empty";
    empty.textContent = "No listings match the current filters. Import rows, load the sample set, or loosen the score, price, radius, or hidden keywords.";
    els.listingArea.append(empty);
  } else {
    visible.forEach((listing) => els.listingArea.append(renderCard(listing)));
  }

  renderStats(visible);
  renderSavedSearches();
  persist();
}

function renderCard(listing) {
  const card = els.cardTemplate.content.firstElementChild.cloneNode(true);
  const favorite = card.querySelector(".favorite");
  const thumb = card.querySelector(".thumb");
  const sourcePill = card.querySelector(".source-pill");
  const title = card.querySelector("h3");
  const price = card.querySelector(".price");
  const meta = card.querySelector(".meta");
  const description = card.querySelector(".description");
  const badges = card.querySelector(".badges");
  const link = card.querySelector("a");
  const copy = card.querySelector(".copy-link");
  const settings = readSettings();

  favorite.classList.toggle("active", listing.favorite);
  favorite.textContent = listing.favorite ? "*" : "+";
  favorite.addEventListener("click", () => {
    if (state.favorites.has(listing.id)) state.favorites.delete(listing.id);
    else state.favorites.add(listing.id);
    render();
  });

  if (listing.image) thumb.style.backgroundImage = `url("${listing.image}")`;
  else thumb.style.backgroundImage = fallbackImage(listing.title, listing.source);

  sourcePill.classList.toggle("ebay", listing.source === "ebay");
  sourcePill.textContent = listing.source === "ebay" ? "eBay" : "Facebook";
  title.textContent = listing.title || "Untitled listing";
  price.textContent = money(listing.price);
  meta.textContent = metaText(listing);
  description.textContent = listing.description || "No description imported.";
  link.href = listing.url || (listing.source === "ebay" ? buildEbayUrl() : buildFacebookUrl());

  addBadge(badges, `${listing.score} score`, listing.score >= 58 ? "hot" : "");
  if (isLikelyDeal(listing, settings)) addBadge(badges, "deal signal", "warn");
  if (listing.source === "facebook" && Number(listing.distance) <= 25) addBadge(badges, "nearby", "");
  if (listing.source === "ebay") addBadge(badges, "comp check", "");

  copy.addEventListener("click", async () => {
    await navigator.clipboard.writeText(listing.url || link.href);
    copy.textContent = "Copied";
    setTimeout(() => {
      copy.textContent = "Copy link";
    }, 900);
  });

  return card;
}

function metaText(listing) {
  const parts = [listing.location || "Unknown location"];
  if (listing.source === "facebook") parts.push(`${listing.distance ?? "?"} mi`);
  if (listing.posted) parts.push(listing.posted);
  return parts.join(" | ");
}

function addBadge(container, text, tone) {
  const badge = document.createElement("span");
  badge.className = `badge ${tone}`.trim();
  badge.textContent = text;
  container.append(badge);
}

function fallbackImage(title = "", source = "facebook") {
  const hue = [...title].reduce((sum, char) => sum + char.charCodeAt(0), 0) % 360;
  const accent = source === "ebay" ? 214 : hue;
  return `linear-gradient(135deg, hsl(${accent} 36% 77%), hsl(${(hue + 54) % 360} 42% 90%))`;
}

function renderStats(visible) {
  const settings = readSettings();
  const avg = visible.length ? visible.reduce((sum, item) => sum + Number(item.price || 0), 0) / visible.length : 0;
  const facebookCount = visible.filter((item) => item.source === "facebook").length;
  const ebayCount = visible.filter((item) => item.source === "ebay").length;

  els.matchCount.textContent = visible.length;
  els.dealCount.textContent = visible.filter((item) => isLikelyDeal(item, settings)).length;
  els.avgPrice.textContent = money(avg);
  els.sourceMix.textContent = `${facebookCount} / ${ebayCount}`;
}

function renderSavedSearches() {
  els.savedSearches.replaceChildren();
  if (!state.savedSearches.length) {
    const note = document.createElement("p");
    note.className = "hint";
    note.textContent = "Saved searches will appear here.";
    els.savedSearches.append(note);
    return;
  }

  state.savedSearches.forEach((search, index) => {
    const button = document.createElement("button");
    button.className = "saved-search";
    button.type = "button";
    button.innerHTML = `<strong>${escapeHtml(search.query || "Any item")}</strong><span>${escapeHtml(search.city)} | ${search.radius} mi | ${money(search.maxPrice)} | ${escapeHtml(sourceLabel(search.source))}</span>`;
    button.addEventListener("click", () => applySearch(search));
    button.addEventListener("contextmenu", (event) => {
      event.preventDefault();
      state.savedSearches.splice(index, 1);
      render();
    });
    els.savedSearches.append(button);
  });
}

function escapeHtml(value = "") {
  return String(value).replace(/[&<>"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;",
  }[char]));
}

function sourceLabel(source = "all") {
  if (source === "facebook") return "Facebook";
  if (source === "ebay") return "eBay";
  return "Both";
}

function applySearch(search) {
  Object.entries({ ...defaultSettings, ...search }).forEach(([key, value]) => {
    if (els[key]) els[key].value = value;
  });
  render();
}

function saveCurrentSearch() {
  const search = currentSettingsForStorage();
  state.savedSearches = [
    search,
    ...state.savedSearches.filter((item) => item.query !== search.query || item.city !== search.city || item.source !== search.source),
  ].slice(0, 8);
  render();
}

function currentSettingsForStorage() {
  return {
    query: els.query.value.trim(),
    city: els.city.value.trim(),
    radius: els.radius.value,
    maxPrice: els.maxPrice.value,
    source: els.source.value,
    minScore: els.minScore.value,
    include: els.include.value,
    exclude: els.exclude.value,
    sort: els.sort.value,
    view: els.view.value,
  };
}

function buildFacebookUrl() {
  const params = new URLSearchParams();
  const settings = readSettings();
  if (settings.query) params.set("query", settings.query);
  if (Number.isFinite(settings.maxPrice)) params.set("maxPrice", String(settings.maxPrice));
  params.set("radius", String(settings.radius));
  return `https://www.facebook.com/marketplace/search/?${params.toString()}`;
}

function buildEbayUrl() {
  const params = new URLSearchParams();
  const settings = readSettings();
  if (settings.query) params.set("_nkw", settings.query);
  if (Number.isFinite(settings.maxPrice)) params.set("_udhi", String(settings.maxPrice));
  params.set("_sop", "10");
  return `https://www.ebay.com/sch/i.html?${params.toString()}`;
}

function buildEbaySoldUrl() {
  const params = new URLSearchParams();
  const settings = readSettings();
  if (settings.query) params.set("_nkw", settings.query);
  params.set("LH_Sold", "1");
  params.set("LH_Complete", "1");
  return `https://www.ebay.com/sch/i.html?${params.toString()}`;
}

function openUrl(url) {
  window.open(url, "_blank", "noreferrer");
}

function parseImport(raw) {
  const trimmed = raw.trim();
  if (!trimmed) return [];

  if (trimmed.startsWith("[") || trimmed.startsWith("{")) {
    const parsed = JSON.parse(trimmed);
    const rows = Array.isArray(parsed) ? parsed : parsed.listings || [];
    return rows.map(cleanListing);
  }

  const lines = trimmed.split(/\r?\n/).filter(Boolean);
  const headers = splitCsvLine(lines.shift()).map((header) => header.trim().toLowerCase());
  return lines.map((line) => {
    const values = splitCsvLine(line);
    const row = Object.fromEntries(headers.map((header, index) => [header, values[index] || ""]));
    return cleanListing(row);
  });
}

function splitCsvLine(line) {
  const values = [];
  let current = "";
  let quoted = false;
  for (let index = 0; index < line.length; index += 1) {
    const char = line[index];
    if (char === '"' && line[index + 1] === '"') {
      current += '"';
      index += 1;
    } else if (char === '"') {
      quoted = !quoted;
    } else if (char === "," && !quoted) {
      values.push(current.trim());
      current = "";
    } else {
      current += char;
    }
  }
  values.push(current.trim());
  return values;
}

function cleanListing(row) {
  return {
    id: row.id || crypto.randomUUID(),
    source: listingSource(row),
    title: row.title || row.name || "Untitled listing",
    price: Number(String(row.price || "").replace(/[^0-9.]/g, "")) || 0,
    location: row.location || row.city || "",
    distance: Number(String(row.distance || "").replace(/[^0-9.]/g, "")) || 0,
    url: row.url || row.link || "",
    posted: row.posted || row.date || "",
    image: row.image || row.thumbnail || "",
    description: row.description || row.notes || "",
  };
}

function persist() {
  localStorage.setItem(storageKey, JSON.stringify({
    listings: state.listings,
    favorites: [...state.favorites],
    savedSearches: state.savedSearches,
    settings: currentSettingsForStorage(),
    activeFilter: state.activeFilter,
  }));
}

function hydrate() {
  const raw = localStorage.getItem(storageKey) || localStorage.getItem("market-scout-state-v1");
  if (!raw) {
    state.listings = sampleListings;
    return;
  }
  try {
    const saved = JSON.parse(raw);
    state.listings = saved.listings?.length ? saved.listings.map(cleanListing) : sampleListings;
    state.favorites = new Set(saved.favorites || []);
    state.savedSearches = saved.savedSearches || [];
    Object.entries({ ...defaultSettings, ...(saved.settings || {}) }).forEach(([key, value]) => {
      if (els[key]) els[key].value = value;
    });
    state.activeFilter = saved.activeFilter || "all";
    document.querySelectorAll(".chip").forEach((chip) => {
      chip.classList.toggle("active", chip.dataset.filter === state.activeFilter);
    });
  } catch {
    state.listings = sampleListings;
  }
}

function resetSettings() {
  Object.entries(defaultSettings).forEach(([key, value]) => {
    if (els[key]) els[key].value = value;
  });
  state.activeFilter = "all";
  document.querySelectorAll(".chip").forEach((chip) => {
    chip.classList.toggle("active", chip.dataset.filter === "all");
  });
  render();
}

document.querySelector("#openFacebookBtn").addEventListener("click", () => openUrl(buildFacebookUrl()));
document.querySelector("#openEbayBtn").addEventListener("click", () => openUrl(buildEbayUrl()));
document.querySelector("#openBothBtn").addEventListener("click", () => {
  openUrl(buildFacebookUrl());
  openUrl(buildEbayUrl());
});

document.querySelector("#saveSearchBtn").addEventListener("click", saveCurrentSearch);
document.querySelector("#resetBtn").addEventListener("click", resetSettings);

document.querySelector("#clearSavedBtn").addEventListener("click", () => {
  state.savedSearches = [];
  render();
});

document.querySelector("#loadSampleBtn").addEventListener("click", () => {
  state.listings = sampleListings.map((listing) => ({ ...listing, id: crypto.randomUUID() }));
  render();
});

document.querySelector("#importBtn").addEventListener("click", () => {
  try {
    const imported = parseImport(els.importInput.value);
    state.listings = [...imported, ...state.listings];
    els.importInput.value = "";
    render();
  } catch (error) {
    alert(`Import failed: ${error.message}`);
  }
});

document.querySelector("#exportBtn").addEventListener("click", () => {
  const blob = new Blob([JSON.stringify(enrichedListings(), null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "market-scout-listings.json";
  a.click();
  URL.revokeObjectURL(url);
});

document.querySelectorAll(".chip").forEach((chip) => {
  chip.addEventListener("click", () => {
    document.querySelectorAll(".chip").forEach((item) => item.classList.remove("active"));
    chip.classList.add("active");
    state.activeFilter = chip.dataset.filter;
    render();
  });
});

[els.query, els.city, els.radius, els.maxPrice, els.source, els.minScore, els.include, els.exclude, els.sort, els.view].forEach((input) => {
  input.addEventListener("input", render);
  input.addEventListener("change", render);
});

hydrate();
render();
