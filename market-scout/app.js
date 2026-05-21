const storageKey = "market-scout-simple-v1";

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

function buildFacebookUrl() {
  const params = new URLSearchParams();
  const query = compactQuery();
  const radius = els.radius.value || "25";
  const maxPrice = els.maxPrice.value.trim();

  if (query) params.set("query", query);
  if (radius) params.set("radius", radius);
  if (maxPrice) params.set("maxPrice", maxPrice);

  return `https://www.facebook.com/marketplace/search/?${params.toString()}`;
}

function buildEbayUrl(sold = false) {
  const params = new URLSearchParams();
  const query = compactQuery();
  const maxPrice = els.maxPrice.value.trim();

  if (query) params.set("_nkw", query);
  if (maxPrice) params.set("_udhi", maxPrice);
  if (sold) {
    params.set("LH_Sold", "1");
    params.set("LH_Complete", "1");
  } else {
    params.set("_sop", "10");
  }

  return `https://www.ebay.com/sch/i.html?${params.toString()}`;
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

function persist() {
  localStorage.setItem(storageKey, JSON.stringify({
    query: els.query.value,
    location: els.location.value,
    radius: els.radius.value,
    maxPrice: els.maxPrice.value,
  }));
}

function hydrate() {
  try {
    const saved = JSON.parse(localStorage.getItem(storageKey) || "{}");
    els.query.value = saved.query || "";
    els.location.value = saved.location || "";
    els.radius.value = saved.radius || "25";
    els.maxPrice.value = saved.maxPrice || "";
  } catch {
    els.query.value = "";
    els.location.value = "";
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
    els.status.textContent = "Type what you want, then search Marketplace.";
  } else if (!location) {
    els.status.textContent = `Ready to search for ${item}. Add your city/state if you want to track where you are searching.`;
  } else {
    els.status.textContent = `Ready to search for ${item} near ${location}.`;
  }

  persist();
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

hydrate();
update();
