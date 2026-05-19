const MAX_FILE_BYTES = 35 * 1024 * 1024;
const MAX_MOVIES_SENT = 1400;
const DEFAULT_STATUS = "Waiting for a movie export.";

const state = {
  movies: [],
  ignoredRows: [],
  stats: null,
  lastResult: null
};

const els = {
  input: document.querySelector("#movieFileInput"),
  dropzone: document.querySelector("[data-dropzone]"),
  status: document.querySelector("[data-status]"),
  preview: document.querySelector("[data-preview]"),
  stats: document.querySelector("[data-stats]"),
  favorites: document.querySelector("[data-favorites]"),
  dislikes: document.querySelector("[data-dislikes]"),
  hints: document.querySelector("[data-hints]"),
  notes: document.querySelector("[data-notes]"),
  movieList: document.querySelector("[data-movie-list]"),
  ignored: document.querySelector("[data-ignored]"),
  generate: document.querySelector("[data-generate]"),
  copyPrompt: document.querySelector("[data-copy-prompt]"),
  reset: document.querySelector("[data-reset]"),
  endpoint: document.querySelector("[data-endpoint]"),
  results: document.querySelector("[data-results]"),
  tasteSummary: document.querySelector("[data-taste-summary]"),
  recList: document.querySelector("[data-rec-list]"),
  copyResults: document.querySelector("[data-copy-results]"),
  exportResults: document.querySelector("[data-export-results]")
};

els.input?.addEventListener("change", (event) => {
  handleFiles(Array.from(event.target.files || []));
});

["dragenter", "dragover"].forEach((eventName) => {
  els.dropzone?.addEventListener(eventName, (event) => {
    event.preventDefault();
    els.dropzone.classList.add("is-dragging");
  });
});

["dragleave", "drop"].forEach((eventName) => {
  els.dropzone?.addEventListener(eventName, (event) => {
    event.preventDefault();
    els.dropzone.classList.remove("is-dragging");
  });
});

els.dropzone?.addEventListener("drop", (event) => {
  handleFiles(Array.from(event.dataTransfer?.files || []));
});

els.reset?.addEventListener("click", resetState);
els.generate?.addEventListener("click", generateRecommendations);
els.copyPrompt?.addEventListener("click", () => copyText(buildPrompt(), "Prompt copied."));
els.copyResults?.addEventListener("click", () => copyText(formatResultsText(state.lastResult), "Recommendations copied."));
els.exportResults?.addEventListener("click", exportResults);

function setStatus(message, isError = false) {
  if (!els.status) return;
  els.status.textContent = message;
  els.status.classList.toggle("is-error", isError);
}

function resetState() {
  state.movies = [];
  state.ignoredRows = [];
  state.stats = null;
  state.lastResult = null;
  if (els.input) {
    els.input.value = "";
  }
  if (els.preview) {
    els.preview.hidden = true;
  }
  if (els.results) {
    els.results.hidden = true;
  }
  if (els.generate) {
    els.generate.disabled = true;
  }
  if (els.copyPrompt) {
    els.copyPrompt.disabled = true;
  }
  setStatus(DEFAULT_STATUS);
}

async function handleFiles(files) {
  if (!files.length) {
    return;
  }

  try {
    setStatus(`Reading ${files.length} file${files.length === 1 ? "" : "s"}...`);
    const parsedRows = [];
    const ignored = [];

    for (const file of files) {
      if (file.size > MAX_FILE_BYTES) {
        ignored.push({ file: file.name, reason: "File is larger than 35 MB." });
        continue;
      }

      if (isZipFile(file)) {
        const entries = await readZipCsvEntries(file);
        if (!entries.length) {
          ignored.push({ file: file.name, reason: "ZIP contained no CSV files." });
        }
        for (const entry of entries) {
          parsedRows.push(...rowsFromCsvText(entry.text, entry.name));
        }
      } else {
        const text = await file.text();
        parsedRows.push(...rowsFromCsvText(text, file.name));
      }
    }

    const normalized = normalizeRows(parsedRows, ignored);
    state.movies = normalized.movies;
    state.ignoredRows = normalized.ignoredRows;
    state.stats = summarizeMovies(state.movies);

    if (!state.movies.length) {
      setStatus("No movies could be parsed. Try a Letterboxd export ZIP or an IMDb CSV.", true);
      return;
    }

    renderPreview();
    setStatus(`Parsed ${state.movies.length.toLocaleString()} movie${state.movies.length === 1 ? "" : "s"} from ${parsedRows.length.toLocaleString()} row${parsedRows.length === 1 ? "" : "s"}.`);
  } catch (error) {
    console.error(error);
    setStatus(error.message || "Something went wrong while reading the export.", true);
  }
}

function isZipFile(file) {
  const name = file.name.toLowerCase();
  return name.endsWith(".zip") || file.type.includes("zip");
}

function rowsFromCsvText(text, fileName) {
  const rows = parseCsv(text);
  if (rows.length < 2) {
    return [];
  }
  const headers = rows[0].map((value) => value.trim());
  return rows.slice(1).map((values, index) => ({
    fileName,
    rowNumber: index + 2,
    row: objectFromHeaders(headers, values)
  }));
}

function objectFromHeaders(headers, values) {
  const row = {};
  headers.forEach((header, index) => {
    const key = header || `Column ${index + 1}`;
    row[key] = index === headers.length - 1
      ? values.slice(index).join(",")
      : values[index] ?? "";
  });
  return row;
}

function parseCsv(text) {
  const rows = [];
  let row = [];
  let field = "";
  let inQuotes = false;
  const cleanText = text.replace(/^\uFEFF/, "");

  for (let index = 0; index < cleanText.length; index += 1) {
    const char = cleanText[index];
    const next = cleanText[index + 1];

    if (char === "\"") {
      if (inQuotes && next === "\"") {
        field += "\"";
        index += 1;
      } else {
        inQuotes = !inQuotes;
      }
      continue;
    }

    if (char === "," && !inQuotes) {
      row.push(field);
      field = "";
      continue;
    }

    if ((char === "\n" || char === "\r") && !inQuotes) {
      if (char === "\r" && next === "\n") {
        index += 1;
      }
      row.push(field);
      rows.push(row);
      row = [];
      field = "";
      continue;
    }

    field += char;
  }

  if (field.length || row.length) {
    row.push(field);
    rows.push(row);
  }

  return rows.filter((item) => item.some((fieldValue) => fieldValue.trim()));
}

async function readZipCsvEntries(file) {
  const buffer = await file.arrayBuffer();
  const view = new DataView(buffer);
  const eocdOffset = findEndOfCentralDirectory(view);
  if (eocdOffset < 0) {
    throw new Error("That ZIP file could not be read.");
  }

  const totalEntries = view.getUint16(eocdOffset + 10, true);
  const centralDirectoryOffset = view.getUint32(eocdOffset + 16, true);
  const entries = [];
  let cursor = centralDirectoryOffset;

  for (let index = 0; index < totalEntries; index += 1) {
    if (view.getUint32(cursor, true) !== 0x02014b50) {
      break;
    }

    const compressionMethod = view.getUint16(cursor + 10, true);
    const compressedSize = view.getUint32(cursor + 20, true);
    const fileNameLength = view.getUint16(cursor + 28, true);
    const extraLength = view.getUint16(cursor + 30, true);
    const commentLength = view.getUint16(cursor + 32, true);
    const localHeaderOffset = view.getUint32(cursor + 42, true);
    const fileNameBytes = new Uint8Array(buffer, cursor + 46, fileNameLength);
    const fileName = new TextDecoder().decode(fileNameBytes);
    cursor += 46 + fileNameLength + extraLength + commentLength;

    if (!fileName.toLowerCase().endsWith(".csv") || fileName.endsWith("/")) {
      continue;
    }

    const localNameLength = view.getUint16(localHeaderOffset + 26, true);
    const localExtraLength = view.getUint16(localHeaderOffset + 28, true);
    const dataOffset = localHeaderOffset + 30 + localNameLength + localExtraLength;
    const compressedData = buffer.slice(dataOffset, dataOffset + compressedSize);
    const text = await inflateZipEntry(compressedData, compressionMethod);
    entries.push({ name: fileName, text });
  }

  return entries;
}

function findEndOfCentralDirectory(view) {
  const minOffset = Math.max(0, view.byteLength - 66000);
  for (let offset = view.byteLength - 22; offset >= minOffset; offset -= 1) {
    if (view.getUint32(offset, true) === 0x06054b50) {
      return offset;
    }
  }
  return -1;
}

async function inflateZipEntry(data, compressionMethod) {
  if (compressionMethod === 0) {
    return new TextDecoder().decode(data);
  }

  if (compressionMethod !== 8) {
    throw new Error("This ZIP uses an unsupported compression method.");
  }

  if (!("DecompressionStream" in window)) {
    throw new Error("This browser cannot unpack compressed ZIP files. Upload the extracted CSV files instead.");
  }

  const stream = new Response(data).body.pipeThrough(new DecompressionStream("deflate-raw"));
  const inflated = await new Response(stream).arrayBuffer();
  return new TextDecoder().decode(inflated);
}

function normalizeRows(parsedRows, existingIgnored) {
  const byKey = new Map();
  const ignoredRows = [...existingIgnored];

  parsedRows.forEach(({ fileName, rowNumber, row }) => {
    const normalized = normalizeMovieRow(row, fileName);
    if (!normalized.title) {
      ignoredRows.push({ file: fileName, row: rowNumber, reason: "Missing movie title." });
      return;
    }

    const key = movieKey(normalized);
    const current = byKey.get(key);
    if (!current) {
      byKey.set(key, normalized);
      return;
    }

    mergeMovie(current, normalized);
  });

  const movies = Array.from(byKey.values()).sort(compareMoviesForTaste);
  return { movies, ignoredRows };
}

function normalizeMovieRow(row, fileName) {
  const source = detectSource(row, fileName);
  const title = pick(row, ["Name", "Title", "Original Title", "Const Title", "Film"]);
  const year = parseYear(pick(row, ["Year", "Release Year", "Title Year", "Release Date"]));
  const sourceRating = pick(row, ["Rating", "Your Rating", "User Rating", "Rating10", "Rated"]);
  const rating = normalizeRating(sourceRating, source);
  const watchedDate = parseDateValue(pick(row, ["Watched Date", "Date", "Date Rated", "Created", "Modified"]));
  const externalId = pick(row, ["Const", "IMDb ID", "Letterboxd URI", "URL", "IMDb URL"]);
  const genres = pick(row, ["Genres", "Genre"]);
  const tags = pick(row, ["Tags", "Description", "Review", "Notes"]);
  const rewatchValue = pick(row, ["Rewatch", "Rewatched"]);
  const rewatchCount = isTruthy(rewatchValue) ? 2 : 1;
  const listHint = fileName.toLowerCase().includes("list") ? `From ${fileName}` : "";

  return {
    title: title.trim(),
    year,
    source,
    rating,
    watchedDate,
    rewatchCount,
    tagsOrNotes: [genres, tags, listHint].filter(Boolean).join(" | "),
    externalId: externalId.trim(),
    genres: splitList(genres)
  };
}

function detectSource(row, fileName) {
  const normalizedHeaders = Object.keys(row).map(normalizeHeader);
  const lowerFile = fileName.toLowerCase();
  if (normalizedHeaders.includes("letterboxduri") || lowerFile.includes("letterboxd")) {
    return "Letterboxd";
  }
  if (normalizedHeaders.includes("const") || normalizedHeaders.includes("yourrating") || lowerFile.includes("imdb")) {
    return "IMDb";
  }
  return "CSV";
}

function pick(row, candidates) {
  const normalized = new Map(Object.keys(row).map((key) => [normalizeHeader(key), row[key]]));
  for (const candidate of candidates) {
    const value = normalized.get(normalizeHeader(candidate));
    if (value !== undefined && String(value).trim()) {
      return String(value).trim();
    }
  }
  return "";
}

function normalizeHeader(value) {
  return String(value).toLowerCase().replace(/[^a-z0-9]/g, "");
}

function parseYear(value) {
  const match = String(value || "").match(/\b(18|19|20)\d{2}\b/);
  return match ? Number(match[0]) : null;
}

function parseDateValue(value) {
  const clean = String(value || "").trim();
  if (!clean) {
    return "";
  }
  const date = new Date(clean);
  if (Number.isNaN(date.getTime())) {
    return clean;
  }
  return date.toISOString().slice(0, 10);
}

function normalizeRating(value, source) {
  const number = Number.parseFloat(String(value || "").replace(/[^\d.]/g, ""));
  if (!Number.isFinite(number)) {
    return null;
  }
  if (source === "Letterboxd" && number <= 5) {
    return Math.round(number * 20) / 10;
  }
  return Math.max(0, Math.min(10, number));
}

function isTruthy(value) {
  return ["yes", "true", "1", "y"].includes(String(value || "").trim().toLowerCase());
}

function splitList(value) {
  return String(value || "")
    .split(/[|,;]/)
    .map((item) => item.trim())
    .filter(Boolean);
}

function movieKey(movie) {
  return `${movie.title.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim()}::${movie.year || ""}`;
}

function mergeMovie(target, incoming) {
  if (incoming.rating !== null && (target.rating === null || incoming.rating > target.rating)) {
    target.rating = incoming.rating;
  }
  if (!target.year && incoming.year) {
    target.year = incoming.year;
  }
  if (!target.externalId && incoming.externalId) {
    target.externalId = incoming.externalId;
  }
  if (!target.watchedDate || (incoming.watchedDate && incoming.watchedDate < target.watchedDate)) {
    target.watchedDate = incoming.watchedDate;
  }
  target.rewatchCount = Math.max(target.rewatchCount || 1, (target.rewatchCount || 1) + (incoming.rewatchCount || 1) - 1);
  target.source = Array.from(new Set(`${target.source},${incoming.source}`.split(",").map((item) => item.trim()))).join(", ");
  target.genres = Array.from(new Set([...(target.genres || []), ...(incoming.genres || [])]));
  target.tagsOrNotes = Array.from(new Set([target.tagsOrNotes, incoming.tagsOrNotes].filter(Boolean))).join(" | ");
}

function compareMoviesForTaste(a, b) {
  const ratingDelta = (b.rating ?? -1) - (a.rating ?? -1);
  if (ratingDelta) return ratingDelta;
  return String(b.watchedDate || "").localeCompare(String(a.watchedDate || ""));
}

function summarizeMovies(movies) {
  const rated = movies.filter((movie) => movie.rating !== null);
  const years = movies.map((movie) => movie.year).filter(Boolean);
  const genreCounts = new Map();

  movies.forEach((movie) => {
    (movie.genres || []).forEach((genre) => {
      genreCounts.set(genre, (genreCounts.get(genre) || 0) + 1);
    });
  });

  const decadeCounts = new Map();
  years.forEach((year) => {
    const decade = `${Math.floor(year / 10) * 10}s`;
    decadeCounts.set(decade, (decadeCounts.get(decade) || 0) + 1);
  });

  return {
    total: movies.length,
    rated: rated.length,
    sources: countValues(movies.flatMap((movie) => movie.source.split(",").map((item) => item.trim()))),
    avgRating: rated.length ? rated.reduce((sum, movie) => sum + movie.rating, 0) / rated.length : null,
    topGenres: sortCounts(genreCounts).slice(0, 10),
    topDecades: sortCounts(decadeCounts).slice(0, 8),
    favorites: rated.filter((movie) => movie.rating >= 8).slice(0, 35),
    dislikes: rated.filter((movie) => movie.rating <= 5).sort((a, b) => (a.rating ?? 0) - (b.rating ?? 0)).slice(0, 25)
  };
}

function countValues(values) {
  const counts = new Map();
  values.filter(Boolean).forEach((value) => counts.set(value, (counts.get(value) || 0) + 1));
  return sortCounts(counts);
}

function sortCounts(counts) {
  return Array.from(counts.entries()).sort((a, b) => b[1] - a[1]);
}

function renderPreview() {
  if (!els.preview || !state.stats) {
    return;
  }

  els.preview.hidden = false;
  els.generate.disabled = false;
  els.copyPrompt.disabled = false;

  const stats = state.stats;
  els.stats.innerHTML = [
    statMarkup("Movies", stats.total.toLocaleString()),
    statMarkup("Rated", stats.rated.toLocaleString()),
    statMarkup("Average", stats.avgRating === null ? "n/a" : `${stats.avgRating.toFixed(1)}/10`),
    statMarkup("Sources", stats.sources.map(([name]) => name).join(", ") || "CSV")
  ].join("");

  els.favorites.value = formatMovieLines(stats.favorites);
  els.dislikes.value = formatMovieLines(stats.dislikes);
  els.hints.value = buildHintLines(stats).join("\n");
  renderMovieList();
}

function statMarkup(label, value) {
  return `<div class="movie-rec-stat"><span>${escapeHtml(label)}</span><strong>${escapeHtml(value)}</strong></div>`;
}

function buildHintLines(stats) {
  const lines = [];
  if (stats.topGenres.length) {
    lines.push(`Genres: ${stats.topGenres.map(([genre, count]) => `${genre} (${count})`).join(", ")}`);
  }
  if (stats.topDecades.length) {
    lines.push(`Decades: ${stats.topDecades.map(([decade, count]) => `${decade} (${count})`).join(", ")}`);
  }
  if (!lines.length) {
    lines.push("No genre data found in the export; infer taste from titles, ratings, and recency.");
  }
  return lines;
}

function formatMovieLines(movies) {
  return movies.map((movie) => {
    const year = movie.year ? ` (${movie.year})` : "";
    const rating = movie.rating === null ? "" : ` - ${movie.rating}/10`;
    const notes = movie.tagsOrNotes ? ` - ${movie.tagsOrNotes}` : "";
    return `${movie.title}${year}${rating}${notes}`;
  }).join("\n");
}

function renderMovieList() {
  const sample = state.movies.slice(0, 300);
  els.movieList.innerHTML = `
    <table class="movie-rec-table">
      <thead>
        <tr><th>Title</th><th>Year</th><th>Rating</th><th>Source</th></tr>
      </thead>
      <tbody>
        ${sample.map((movie) => `
          <tr>
            <td>${escapeHtml(movie.title)}</td>
            <td>${escapeHtml(movie.year || "")}</td>
            <td>${movie.rating === null ? "" : `${escapeHtml(movie.rating)}/10`}</td>
            <td>${escapeHtml(movie.source)}</td>
          </tr>
        `).join("")}
      </tbody>
    </table>
    ${state.movies.length > sample.length ? `<p>Showing first ${sample.length} of ${state.movies.length.toLocaleString()} parsed movies.</p>` : ""}
  `;

  els.ignored.innerHTML = state.ignoredRows.length
    ? `<p>${state.ignoredRows.length.toLocaleString()} ignored row${state.ignoredRows.length === 1 ? "" : "s"}:</p><ul>${state.ignoredRows.slice(0, 40).map((row) => `<li>${escapeHtml(row.file || "File")}${row.row ? ` row ${escapeHtml(row.row)}` : ""}: ${escapeHtml(row.reason)}</li>`).join("")}</ul>`
    : "<p>No ignored rows.</p>";
}

async function generateRecommendations() {
  if (!state.movies.length) {
    setStatus("Upload a movie export first.", true);
    return;
  }

  const endpoint = els.endpoint.value.trim();
  if (!endpoint) {
    setStatus("Add the Firebase Function endpoint first.", true);
    return;
  }

  const payload = buildRecommendationPayload();
  els.generate.disabled = true;
  setStatus("Asking the AI for recommendations...");

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    let data = null;
    try {
      data = await response.json();
    } catch {
      data = null;
    }

    if (!response.ok) {
      throw new Error(data?.error || `Recommendation request failed (${response.status}).`);
    }

    state.lastResult = data;
    renderResults(data);
    setStatus("Recommendations ready.");
  } catch (error) {
    console.error(error);
    setStatus(`${error.message || "AI request failed."} You can still use Copy AI prompt.`, true);
  } finally {
    els.generate.disabled = false;
  }
}

function buildRecommendationPayload() {
  const movies = state.movies.slice(0, MAX_MOVIES_SENT).map((movie) => ({
    title: movie.title,
    year: movie.year,
    source: movie.source,
    rating: movie.rating,
    watchedDate: movie.watchedDate,
    rewatchCount: movie.rewatchCount,
    tagsOrNotes: movie.tagsOrNotes,
    externalId: movie.externalId
  }));

  return {
    movies,
    omittedCount: Math.max(0, state.movies.length - movies.length),
    profile: {
      totalMovies: state.movies.length,
      favoritesText: els.favorites.value.trim(),
      dislikesText: els.dislikes.value.trim(),
      hintsText: els.hints.value.trim(),
      notesText: els.notes.value.trim()
    },
    options: {
      recommendationCount: 20
    }
  };
}

function buildPrompt() {
  const payload = buildRecommendationPayload();
  return [
    "You are an expert movie recommender. Use the movie history below to infer taste like a thoughtful ChatGPT or Claude recommendation session.",
    "Return a ranked list of 20 movies the user has probably not seen. For each recommendation include title, year if known, confidence, a concise reason, and why it matches the user's taste.",
    "Avoid recommending movies already present in the watched list.",
    "",
    JSON.stringify(payload, null, 2)
  ].join("\n");
}

function renderResults(data) {
  const recommendations = Array.isArray(data.recommendations) ? data.recommendations : [];
  els.results.hidden = false;
  els.tasteSummary.textContent = data.notEnoughData
    ? data.message || "Not enough data for confident recommendations."
    : data.tasteSummary || "The AI returned recommendations based on your parsed movie history.";
  els.recList.innerHTML = recommendations.length
    ? recommendations.map((item) => `
      <li>
        <h3>
          ${escapeHtml(item.title || "Untitled")}${item.year ? ` (${escapeHtml(item.year)})` : ""}
          ${item.confidence ? `<span class="movie-rec-confidence">${escapeHtml(item.confidence)}</span>` : ""}
        </h3>
        ${item.reason ? `<p>${escapeHtml(item.reason)}</p>` : ""}
        ${item.match ? `<p><strong>Why it fits:</strong> ${escapeHtml(item.match)}</p>` : ""}
      </li>
    `).join("")
    : "<li>No recommendations returned.</li>";
}

function formatResultsText(data) {
  if (!data) {
    return "";
  }
  const lines = [data.tasteSummary || data.message || "Movie recommendations", ""];
  (data.recommendations || []).forEach((item, index) => {
    lines.push(`${index + 1}. ${item.title || "Untitled"}${item.year ? ` (${item.year})` : ""}`);
    if (item.reason) lines.push(`   ${item.reason}`);
    if (item.match) lines.push(`   Why it fits: ${item.match}`);
  });
  return lines.join("\n");
}

async function copyText(text, successMessage) {
  if (!text) {
    return;
  }
  try {
    await navigator.clipboard.writeText(text);
    setStatus(successMessage);
  } catch {
    setStatus("Clipboard access failed. Select and copy the text manually from the browser console.", true);
    console.log(text);
  }
}

function exportResults() {
  if (!state.lastResult) {
    return;
  }
  const blob = new Blob([JSON.stringify(state.lastResult, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = "movie-recommendations.json";
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  URL.revokeObjectURL(url);
}

function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
