const storageKey = "market-scout-board-v1";

const els = {
  form: document.querySelector("#searchForm"),
  query: document.querySelector("#queryInput"),
  location: document.querySelector("#locationInput"),
  radius: document.querySelector("#radiusInput"),
  maxPrice: document.querySelector("#maxPriceInput"),
  facebookLink: document.querySelector("#facebookLink"),
  ebayLink: document.querySelector("#ebayLink"),
  soldLink: document.querySelector("#soldLink"),
  status: document.querySelector("#searchStatus"),
  termStrip: document.querySelector("#termStrip"),
  copyTerms: document.querySelector("#copyTermsBtn"),
  paste: document.querySelector("#pasteBtn"),
  clear: document.querySelector("#clearBtn"),
  importInput: document.querySelector("#importInput"),
  import: document.querySelector("#importBtn"),
  export: document.querySelector("#exportBtn"),
  resultsGrid: document.querySelector("#resultsGrid"),
  resultTemplate: document.querySelector("#resultTemplate"),
  collectorBookmarklet: document.querySelector("#collectorBookmarklet"),
};

const profiles = [
  {
    pattern: /\b(ssd|nvme|m\.?2|solid state|storage)\b/i,
    terms: ["ssd", "nvme", "m.2", "sata ssd", "samsung", "crucial", "western digital", "kingston", "sandisk", "1tb", "2tb"],
  },
  {
    pattern: /\b(gpu|graphics|rtx|radeon|video card)\b/i,
    terms: ["gpu", "graphics card", "rtx", "geforce", "nvidia", "radeon", "amd"],
  },
  {
    pattern: /\b(laptop|macbook|thinkpad|chromebook|notebook)\b/i,
    terms: ["laptop", "macbook", "thinkpad", "dell", "hp", "lenovo", "asus", "16gb", "512gb"],
  },
  {
    pattern: /\b(camera|lens|dslr|mirrorless|canon|nikon|sony)\b/i,
    terms: ["camera", "lens", "canon", "nikon", "sony", "fuji", "mirrorless", "dslr"],
  },
  {
    pattern: /\b(ps5|playstation|xbox|switch|console|steam deck)\b/i,
    terms: ["ps5", "playstation", "xbox", "series x", "nintendo switch", "steam deck", "bundle"],
  },
];

const state = {
  results: [],
};

function tokenize(value) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9. ]+/g, " ")
    .split(/\s+/)
    .map((term) => term.trim())
    .filter((term) => term.length > 1);
}

function unique(values) {
  return [...new Set(values.filter(Boolean))];
}

function generatedTerms(query) {
  const profile = profiles.find((item) => item.pattern.test(query));
  return unique([...tokenize(query), ...(profile?.terms || [])]).slice(0, 12);
}

function compactQuery() {
  const raw = els.query.value.trim();
  const terms = generatedTerms(raw);
  return terms.length ? terms.join(" ") : raw;
}

function locationSlug() {
  return els.location.value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "")
    .slice(0, 48);
}

function buildFacebookUrl() {
  const params = new URLSearchParams();
  const query = compactQuery();
  const radius = els.radius.value || "25";
  const maxPrice = els.maxPrice.value.trim();
  const slug = locationSlug();

  if (query) params.set("query", query);
  if (radius) params.set("radius", radius);
  if (maxPrice) params.set("maxPrice", maxPrice);

  return `https://www.facebook.com/marketplace/${slug ? `${slug}/` : ""}search/?${params.toString()}`;
}

function buildEbayUrl(sold = false) {
  const params = new URLSearchParams();
  const query = compactQuery();
  const maxPrice = els.maxPrice.value.trim();
  const location = els.location.value.trim();
  const radius = els.radius.value || "25";

  if (query) params.set("_nkw", query);
  if (maxPrice) params.set("_udhi", maxPrice);
  if (location) {
    params.set("_stpos", location);
    params.set("_sadis", radius);
    params.set("LH_PrefLoc", "99");
  }
  if (sold) {
    params.set("LH_Sold", "1");
    params.set("LH_Complete", "1");
  } else {
    params.set("_sop", "10");
  }

  return `https://www.ebay.com/sch/i.html?${params.toString()}`;
}

function parseMoney(value) {
  const match = String(value || "").match(/\$?\s*([\d,]+(?:\.\d{2})?)/);
  return match ? Number(match[1].replace(/,/g, "")) : 0;
}

function sourceLabel(source) {
  if (source === "ebay") return "eBay";
  if (source === "facebook") return "Facebook";
  return "Listing";
}

function scoreResult(result) {
  const terms = generatedTerms(els.query.value.trim());
  const text = `${result.title || ""} ${result.description || ""}`.toLowerCase();
  const hits = terms.filter((term) => text.includes(term.toLowerCase())).length;
  const price = parseMoney(result.price);
  const maxPrice = Number(els.maxPrice.value || 0);
  const priceBonus = maxPrice && price ? Math.max(-20, Math.min(25, ((maxPrice - price) / maxPrice) * 25)) : 0;
  const imageBonus = result.image ? 10 : 0;
  return Math.max(0, Math.round(hits * 12 + priceBonus + imageBonus));
}

function normalizeResult(row) {
  const url = row.url || row.link || "";
  const source = row.source || (url.includes("ebay.") ? "ebay" : url.includes("facebook.") ? "facebook" : "unknown");
  return {
    id: row.id || `${source}:${url || row.title || crypto.randomUUID()}`,
    source,
    title: String(row.title || row.name || "Untitled listing").trim(),
    price: row.price || "",
    location: row.location || row.place || "",
    posted: row.posted || row.date || "",
    url,
    image: row.image || row.imageUrl || row.thumbnail || row.thumbnailUrl || row.picture || row.photo || "",
    description: row.description || row.text || "",
    collectedAt: row.collectedAt || new Date().toISOString(),
  };
}

function mergeResults(rows) {
  const incoming = rows.map(normalizeResult).filter((row) => row.title && row.url);
  const byKey = new Map(state.results.map((row) => [row.url || row.id, row]));
  incoming.forEach((row) => byKey.set(row.url || row.id, row));
  state.results = [...byKey.values()].slice(-100);
  persist();
  renderResults();
}

function sortedResults() {
  return state.results
    .map((row) => ({ ...row, score: scoreResult(row) }))
    .sort((a, b) => b.score - a.score || parseMoney(a.price) - parseMoney(b.price))
    .slice(0, 24);
}

function renderTerms(terms) {
  els.termStrip.replaceChildren();
  if (!terms.length) {
    const empty = document.createElement("span");
    empty.textContent = "Terms appear here";
    empty.className = "muted-term";
    els.termStrip.append(empty);
    return;
  }

  terms.forEach((term) => {
    const chip = document.createElement("span");
    chip.textContent = term;
    els.termStrip.append(chip);
  });
}

function renderResults() {
  const results = sortedResults();
  els.resultsGrid.replaceChildren();

  if (!results.length) {
    const empty = document.createElement("div");
    empty.className = "empty-state";
    empty.innerHTML = "<strong>No collected listings yet.</strong><span>Open Facebook or eBay, run the collector bookmarklet on the results page, then paste the copied results here.</span>";
    els.resultsGrid.append(empty);
    return;
  }

  results.forEach((result) => {
    const card = els.resultTemplate.content.firstElementChild.cloneNode(true);
    const img = card.querySelector("img");
    const source = card.querySelector(".source-pill");
    const title = card.querySelector("h3");
    const price = card.querySelector(".price");
    const meta = card.querySelector(".meta");
    const description = card.querySelector(".description");
    const score = card.querySelector(".score-pill");
    const link = card.querySelector("a");

    source.textContent = sourceLabel(result.source);
    source.classList.toggle("ebay", result.source === "ebay");
    title.textContent = result.title;
    price.textContent = result.price || "";
    meta.textContent = [result.location, result.posted].filter(Boolean).join(" | ") || sourceLabel(result.source);
    description.textContent = result.description || "";
    score.textContent = `${result.score} score`;
    link.href = result.url;

    if (result.image) {
      img.src = result.image;
      img.alt = `${result.title} image`;
      img.addEventListener("error", () => card.classList.add("image-missing"), { once: true });
    } else {
      card.classList.add("image-missing");
    }

    els.resultsGrid.append(card);
  });
}

function persist() {
  localStorage.setItem(storageKey, JSON.stringify({
    query: els.query.value,
    location: els.location.value,
    radius: els.radius.value,
    maxPrice: els.maxPrice.value,
    results: state.results,
  }));
}

function hydrate() {
  try {
    const saved = JSON.parse(localStorage.getItem(storageKey) || "{}");
    els.query.value = saved.query || "";
    els.location.value = saved.location || "";
    els.radius.value = saved.radius || "25";
    els.maxPrice.value = saved.maxPrice || "";
    state.results = Array.isArray(saved.results) ? saved.results : [];
  } catch {
    els.query.value = "";
    els.location.value = "";
    state.results = [];
  }
}

function update() {
  const item = els.query.value.trim();
  const location = els.location.value.trim();
  const terms = generatedTerms(item);

  els.facebookLink.href = buildFacebookUrl();
  els.ebayLink.href = buildEbayUrl(false);
  els.soldLink.href = buildEbayUrl(true);
  els.facebookLink.classList.toggle("is-disabled", !item);
  els.ebayLink.classList.toggle("is-disabled", !item);
  els.soldLink.classList.toggle("is-disabled", !item);
  renderTerms(terms);

  if (!item) {
    els.status.textContent = "Type what you want, then open Facebook or eBay.";
  } else if (!location) {
    els.status.textContent = `Ready to search for ${item}. Add your city/state so your board is labeled clearly.`;
  } else {
    els.status.textContent = `Ready to collect ${item} listings near ${location}.`;
  }

  persist();
  renderResults();
}

function collectorBookmarkletCode() {
  return `javascript:(async()=>{const clean=s=>(s||'').replace(/\\s+/g,' ').trim();const host=location.hostname;const source=/ebay/i.test(host)?'ebay':/facebook/i.test(host)?'facebook':'unknown';const price=s=>(s.match(/\\$\\s?[\\d,]+(?:\\.\\d{2})?/)||[''])[0];const rows=[...document.querySelectorAll('a[href]')].map(a=>{const box=a.closest('li,article,div')||a;const text=clean(box.innerText||a.innerText||'');const p=price(text);const href=a.href;if(!p||!href||/javascript:|mailto:/.test(href))return null;const img=box.querySelector('img[src],img[data-src],source[srcset]');const rawImg=img?.src||img?.dataset?.src||img?.srcset?.split(' ')[0]||'';const lines=text.split(/\\n| {2,}/).map(clean).filter(Boolean);const title=(lines.find(l=>l!==p&&!/^sponsored$/i.test(l)&&l.length>6)||a.getAttribute('aria-label')||document.title).slice(0,140);return{source,title,price:p,url:href,image:rawImg,description:text.slice(0,260),collectedAt:new Date().toISOString()};}).filter(Boolean);const unique=[...new Map(rows.map(r=>[r.url,r])).values()].slice(0,30);const json=JSON.stringify(unique,null,2);try{await navigator.clipboard.writeText(json);alert('Copied '+unique.length+' listings. Return to Market Scout and click Paste collected results.');}catch(e){prompt('Copy these listings, then paste into Market Scout:',json)}})()`;
}

function importJson(raw) {
  const parsed = JSON.parse(raw);
  const rows = Array.isArray(parsed) ? parsed : parsed.results || parsed.listings || [];
  mergeResults(rows);
}

els.form.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!els.query.value.trim()) {
    els.query.focus();
    return;
  }
  window.open(buildFacebookUrl(), "_blank", "noreferrer");
});

[els.query, els.location, els.radius, els.maxPrice].forEach((input) => {
  input.addEventListener("input", update);
  input.addEventListener("change", update);
});

els.copyTerms.addEventListener("click", async () => {
  const terms = generatedTerms(els.query.value.trim()).join(", ");
  if (!terms) return;
  await navigator.clipboard.writeText(terms);
  els.copyTerms.textContent = "Copied";
  setTimeout(() => {
    els.copyTerms.textContent = "Copy terms";
  }, 900);
});

els.paste.addEventListener("click", async () => {
  try {
    const text = await navigator.clipboard.readText();
    importJson(text);
    els.paste.textContent = "Imported";
  } catch (error) {
    els.paste.textContent = "Paste blocked";
  }
  setTimeout(() => {
    els.paste.textContent = "Paste collected results";
  }, 1200);
});

els.import.addEventListener("click", () => {
  try {
    importJson(els.importInput.value.trim());
    els.importInput.value = "";
  } catch (error) {
    alert(`Import failed: ${error.message}`);
  }
});

els.clear.addEventListener("click", () => {
  state.results = [];
  persist();
  renderResults();
});

els.export.addEventListener("click", () => {
  const blob = new Blob([JSON.stringify(sortedResults(), null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "market-scout-results.json";
  a.click();
  URL.revokeObjectURL(url);
});

hydrate();
els.collectorBookmarklet.href = collectorBookmarkletCode();
update();
