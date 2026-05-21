const storageKey = "market-scout-state-v3";

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
    image: sampleImage("Jazz Bass", "#b7792f", "#f0c071"),
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
    image: sampleImage("SUB Ray4", "#111820", "#c9a968"),
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
    image: sampleImage("Ibanez SR", "#265a8e", "#54a0d4"),
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
    image: sampleImage("Yamaha TRBX", "#8f2639", "#d2485d"),
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
    image: sampleImage("Rumble 40", "#1e2524", "#d8b96d"),
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
    image: sampleImage("Parts", "#6b4025", "#d15b4b"),
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
    image: sampleImage("Ray4 Blue", "#174c8f", "#2f7bd0"),
  },
];

const state = {
  listings: [],
  favorites: new Set(),
  savedSearches: [],
  activeFilter: "all",
  autoTerms: true,
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
  autoTerms: document.querySelector("#autoTermsBtn"),
  termStrip: document.querySelector("#termStrip"),
  termPreview: document.querySelector("#termPreview"),
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

const baseExcludeTerms = [
  "broken",
  "for parts",
  "parts only",
  "not working",
  "trade only",
  "wanted",
  "iso",
  "read description",
];

const keywordProfiles = [
  {
    name: "storage",
    pattern: /\b(ssd|nvme|m\.?2|solid state|storage|hard drive)\b/i,
    include: ["ssd", "nvme", "m.2", "sata ssd", "samsung", "crucial", "wd", "western digital", "kingston", "sandisk", "1tb", "2tb", "970 evo", "980 pro", "990 pro"],
    exclude: ["hdd", "hard drive", "enclosure only", "adapter only", "caddy only", "used heavily"],
  },
  {
    name: "bass",
    pattern: /\b(bass|guitar|instrument|amp)\b/i,
    include: ["fender", "squier", "ibanez", "yamaha", "sterling", "music man", "jazz bass", "p bass", "active bass", "rumble"],
    exclude: ["case only", "strings only"],
  },
  {
    name: "graphics",
    pattern: /\b(gpu|graphics|rtx|radeon|video card)\b/i,
    include: ["gpu", "graphics card", "rtx", "geforce", "nvidia", "radeon", "amd", "4070", "3080", "3060 ti", "rx 6700", "rx 6800"],
    exclude: ["mining rig", "box only", "artifacting", "no display"],
  },
  {
    name: "laptop",
    pattern: /\b(laptop|macbook|thinkpad|chromebook|notebook)\b/i,
    include: ["laptop", "macbook", "thinkpad", "dell", "hp", "lenovo", "asus", "16gb", "512gb", "i7", "ryzen"],
    exclude: ["icloud locked", "bios locked", "cracked screen", "no charger"],
  },
  {
    name: "camera",
    pattern: /\b(camera|lens|dslr|mirrorless|canon|nikon|sony)\b/i,
    include: ["camera", "lens", "canon", "nikon", "sony", "fuji", "mirrorless", "dslr", "sigma", "tamron"],
    exclude: ["body cap only", "fungus", "haze", "for repair"],
  },
  {
    name: "console",
    pattern: /\b(ps5|playstation|xbox|switch|console|steam deck)\b/i,
    include: ["ps5", "playstation", "xbox", "series x", "nintendo switch", "oled", "steam deck", "controller", "bundle"],
    exclude: ["account only", "banned", "digital code", "shell only"],
  },
  {
    name: "phone",
    pattern: /\b(iphone|ipad|phone|pixel|galaxy|tablet)\b/i,
    include: ["iphone", "ipad", "pixel", "galaxy", "samsung", "unlocked", "128gb", "256gb", "pro max", "cellular"],
    exclude: ["icloud locked", "blacklisted", "bad imei", "cracked back"],
  },
  {
    name: "desk",
    pattern: /\b(chair|desk|office|herman miller|steelcase)\b/i,
    include: ["chair", "desk", "office", "herman miller", "aeron", "steelcase", "leap", "standing desk"],
    exclude: ["stained", "missing parts", "needs repair"],
  },
];

const sampleImageByTitle = new Map(sampleListings.map((listing) => [normalizeTitle(listing.title), listing.image]));

function normalizeList(value) {
  return value
    .split(",")
    .map((item) => item.trim().toLowerCase())
    .filter(Boolean);
}

function sampleImage(label, accent, secondary) {
  const safeLabel = escapeSvg(label);
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 420" role="img" aria-label="${safeLabel} listing image"><rect width="640" height="420" fill="#0b1013"/><path d="M0 300h640v120H0z" fill="#070a0c"/><circle cx="178" cy="226" r="96" fill="${accent}"/><circle cx="228" cy="244" r="66" fill="${secondary}" opacity=".92"/><rect x="252" y="193" width="296" height="26" rx="13" fill="#211915" transform="rotate(-6 252 193)"/><rect x="520" y="154" width="86" height="42" rx="14" fill="#15100d" transform="rotate(-6 520 154)"/><rect x="208" y="218" width="76" height="20" rx="4" fill="#080b0d"/><g stroke="#f2eadb" stroke-width="3" opacity=".88"><path d="M255 200l346-38"/><path d="M256 207l346-38"/><path d="M257 214l346-38"/><path d="M258 221l346-38"/></g><text x="38" y="370" fill="#eff7f2" font-family="Arial, sans-serif" font-size="42" font-weight="800">${safeLabel}</text></svg>`;
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}

function escapeSvg(value = "") {
  return String(value).replace(/[&<>"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&apos;",
  }[char]));
}

function normalizeTitle(value = "") {
  return String(value).toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
}

function uniqueTerms(terms) {
  const seen = new Set();
  return terms
    .map((term) => term.trim().toLowerCase())
    .filter(Boolean)
    .filter((term) => {
      if (seen.has(term)) return false;
      seen.add(term);
      return true;
    });
}

function tokenizeQuery(query) {
  const stopWords = new Set(["the", "and", "with", "for", "near", "used", "new", "cheap", "good"]);
  return query
    .toLowerCase()
    .replace(/[^a-z0-9. ]+/g, " ")
    .split(/\s+/)
    .filter((term) => term.length > 1 && !stopWords.has(term));
}

function keywordProfileFor(query) {
  return keywordProfiles.find((profile) => profile.pattern.test(query)) || null;
}

function generatedKeywordSet(query) {
  const profile = keywordProfileFor(query);
  const tokens = tokenizeQuery(query);
  const include = uniqueTerms([
    query.toLowerCase(),
    ...tokens,
    ...(profile?.include || []),
  ]).slice(0, 18);
  const exclude = uniqueTerms([
    ...baseExcludeTerms,
    ...(profile?.exclude || []),
  ]).slice(0, 16);

  return { include, exclude, profileName: profile?.name || "general" };
}

function updateAutoTerms(force = false) {
  if (!force && !state.autoTerms) return;
  const generated = generatedKeywordSet(els.query.value.trim());
  els.include.value = generated.include.join(",");
  els.exclude.value = generated.exclude.join(",");
  state.autoTerms = true;
  renderTermPreview(generated.include);
}

function renderTermPreview(terms = normalizeList(els.include.value)) {
  [els.termStrip, els.termPreview].forEach((container) => {
    container.replaceChildren();
    terms.slice(0, 10).forEach((term) => {
      const chip = document.createElement("span");
      chip.textContent = term;
      container.append(chip);
    });
  });
  els.autoTerms.classList.toggle("active", state.autoTerms);
  els.autoTerms.textContent = state.autoTerms ? "Auto terms on" : "Auto terms";
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
  renderTermPreview();
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
  const image = card.querySelector(".thumb-image");
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

  thumb.style.backgroundImage = fallbackImage(listing.title, listing.source);
  thumb.classList.toggle("has-image", Boolean(listing.image));
  if (listing.image) {
    image.src = listing.image;
    image.alt = `${listing.title || "Listing"} photo`;
    image.hidden = false;
    image.addEventListener("error", () => {
      image.hidden = true;
      thumb.classList.remove("has-image");
    }, { once: true });
  } else {
    image.hidden = true;
  }

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

function sampleImageForTitle(title = "") {
  const normalized = normalizeTitle(title);
  return sampleImageByTitle.get(normalized) || "";
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
  state.autoTerms = search.autoTerms ?? true;
  if (state.autoTerms) updateAutoTerms(true);
  else renderTermPreview();
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
    autoTerms: state.autoTerms,
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
    image: row.image || row.imageUrl || row.thumbnail || row.thumbnailUrl || row.picture || row.photo || sampleImageForTitle(row.title || row.name),
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
    state.autoTerms = saved.settings?.autoTerms ?? true;
    if (state.autoTerms) updateAutoTerms(true);
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
  state.autoTerms = true;
  updateAutoTerms(true);
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
els.autoTerms.addEventListener("click", () => {
  updateAutoTerms(true);
  render();
});

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

[els.city, els.radius, els.maxPrice, els.source, els.minScore, els.exclude, els.sort, els.view].forEach((input) => {
  input.addEventListener("input", render);
  input.addEventListener("change", render);
});

els.query.addEventListener("input", () => {
  updateAutoTerms();
  render();
});

els.include.addEventListener("input", () => {
  state.autoTerms = false;
  renderTermPreview();
  render();
});

hydrate();
if (state.autoTerms) updateAutoTerms(true);
else renderTermPreview();
render();
