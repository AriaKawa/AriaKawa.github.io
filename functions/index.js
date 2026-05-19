const { onRequest } = require("firebase-functions/v2/https");
const { defineSecret } = require("firebase-functions/params");

const openAiApiKey = defineSecret("OPENAI_API_KEY");

const DEFAULT_MODEL = "gpt-5.4-mini";
const MAX_MOVIES = 1500;
const MAX_BODY_BYTES = 900000;
const DEFAULT_ALLOWED_ORIGINS = [
  "https://ariakawa.github.io",
  "http://localhost:5000",
  "http://127.0.0.1:5000",
  "http://localhost:8765",
  "http://127.0.0.1:8765",
  "http://localhost:5173",
  "http://127.0.0.1:5173"
];

exports.recommendMovies = onRequest(
  {
    cors: false,
    memory: "512MiB",
    timeoutSeconds: 120,
    secrets: [openAiApiKey]
  },
  async (req, res) => {
    if (!applyCors(req, res)) {
      return;
    }

    if (req.method === "OPTIONS") {
      res.status(204).send("");
      return;
    }

    if (req.method !== "POST") {
      res.status(405).json({ error: "Use POST for recommendations." });
      return;
    }

    const bodySize = Number(req.headers["content-length"] || 0);
    if (bodySize > MAX_BODY_BYTES) {
      res.status(413).json({ error: "Movie summary is too large. Try trimming the upload." });
      return;
    }

    try {
      const payload = validatePayload(req.body);
      if (payload.movies.length < 8) {
        res.json({
          notEnoughData: true,
          message: "Upload at least eight watched movies for useful recommendations.",
          tasteSummary: "There is not enough movie history to infer a reliable taste profile.",
          recommendations: []
        });
        return;
      }

      const aiResult = await callOpenAi(payload);
      res.json(normalizeAiResult(aiResult));
    } catch (error) {
      console.error("recommendMovies failed", error);
      res.status(error.statusCode || 500).json({
        error: error.publicMessage || "Unable to generate recommendations right now."
      });
    }
  }
);

function applyCors(req, res) {
  const origin = req.headers.origin || "";
  const allowedOrigins = (process.env.ALLOWED_ORIGINS || DEFAULT_ALLOWED_ORIGINS.join(","))
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);

  if (origin && !allowedOrigins.includes(origin)) {
    res.status(403).json({ error: "This origin is not allowed to call the recommender." });
    return false;
  }

  res.set("Access-Control-Allow-Origin", origin || allowedOrigins[0] || "*");
  res.set("Vary", "Origin");
  res.set("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.set("Access-Control-Allow-Headers", "Content-Type");
  res.set("Access-Control-Max-Age", "3600");
  return true;
}

function validatePayload(body) {
  if (!body || typeof body !== "object") {
    throw publicError(400, "Request body must be JSON.");
  }

  if (!Array.isArray(body.movies)) {
    throw publicError(400, "Request body must include a movies array.");
  }

  const movies = body.movies.slice(0, MAX_MOVIES).map((movie) => ({
    title: cleanString(movie.title, 180),
    year: normalizeYear(movie.year),
    source: cleanString(movie.source, 80),
    rating: normalizeRating(movie.rating),
    watchedDate: cleanString(movie.watchedDate, 32),
    rewatchCount: normalizeSmallNumber(movie.rewatchCount),
    tagsOrNotes: cleanString(movie.tagsOrNotes, 260),
    externalId: cleanString(movie.externalId, 160)
  })).filter((movie) => movie.title);

  if (!movies.length) {
    throw publicError(400, "No valid movies were provided.");
  }

  const profile = body.profile && typeof body.profile === "object" ? body.profile : {};
  const recommendationCount = Math.max(5, Math.min(30, normalizeSmallNumber(body.options?.recommendationCount) || 20));

  return {
    movies,
    omittedCount: normalizeSmallNumber(body.omittedCount),
    profile: {
      totalMovies: normalizeSmallNumber(profile.totalMovies) || movies.length,
      favoritesText: cleanString(profile.favoritesText, 6000),
      dislikesText: cleanString(profile.dislikesText, 4000),
      hintsText: cleanString(profile.hintsText, 3000),
      notesText: cleanString(profile.notesText, 2000)
    },
    options: { recommendationCount }
  };
}

function cleanString(value, maxLength) {
  return String(value ?? "").replace(/\s+/g, " ").trim().slice(0, maxLength);
}

function normalizeYear(value) {
  const year = Number.parseInt(value, 10);
  return Number.isFinite(year) && year >= 1870 && year <= 2100 ? year : null;
}

function normalizeRating(value) {
  const rating = Number(value);
  return Number.isFinite(rating) ? Math.max(0, Math.min(10, rating)) : null;
}

function normalizeSmallNumber(value) {
  const number = Number.parseInt(value, 10);
  return Number.isFinite(number) && number > 0 ? Math.min(number, 100000) : 0;
}

async function callOpenAi(payload) {
  const apiKey = openAiApiKey.value();
  if (!apiKey) {
    throw publicError(500, "OPENAI_API_KEY is not configured for this Firebase Function.");
  }

  const response = await fetch("https://api.openai.com/v1/responses", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${apiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: process.env.OPENAI_MODEL || DEFAULT_MODEL,
      input: [
        {
          role: "system",
          content: [
            {
              type: "input_text",
              text: [
                "You are an expert movie recommender.",
                "Infer the user's taste from watched titles, ratings, notes, recency, and genre hints.",
                "Do not recommend movies that are already in the watched list.",
                "Prefer specific, interesting recommendations over generic top-100 staples unless the taste strongly supports them.",
                "Return only JSON matching the schema."
              ].join(" ")
            }
          ]
        },
        {
          role: "user",
          content: [
            {
              type: "input_text",
              text: JSON.stringify({
                task: "Recommend movies for this user.",
                recommendationCount: payload.options.recommendationCount,
                omittedWatchedMovieCount: payload.omittedCount,
                profile: payload.profile,
                watchedMovies: payload.movies
              })
            }
          ]
        }
      ],
      text: {
        format: {
          type: "json_schema",
          name: "movie_recommendation_response",
          strict: true,
          schema: {
            type: "object",
            additionalProperties: false,
            properties: {
              notEnoughData: { type: "boolean" },
              message: { type: "string" },
              tasteSummary: { type: "string" },
              recommendations: {
                type: "array",
                items: {
                  type: "object",
                  additionalProperties: false,
                  properties: {
                    title: { type: "string" },
                    year: { type: ["integer", "null"] },
                    confidence: { type: "string" },
                    reason: { type: "string" },
                    match: { type: "string" }
                  },
                  required: ["title", "year", "confidence", "reason", "match"]
                }
              }
            },
            required: ["notEnoughData", "message", "tasteSummary", "recommendations"]
          }
        }
      },
      max_output_tokens: 5200
    })
  });

  const data = await response.json().catch(() => null);
  if (!response.ok) {
    const message = data?.error?.message || `OpenAI request failed with status ${response.status}.`;
    throw publicError(502, message);
  }

  const outputText = data.output_text || extractOutputText(data);
  if (!outputText) {
    throw publicError(502, "OpenAI returned an empty response.");
  }

  try {
    return JSON.parse(outputText);
  } catch (error) {
    console.error("Failed to parse OpenAI JSON", outputText, error);
    throw publicError(502, "OpenAI returned a response that was not valid JSON.");
  }
}

function extractOutputText(data) {
  const output = Array.isArray(data?.output) ? data.output : [];
  return output
    .flatMap((item) => Array.isArray(item.content) ? item.content : [])
    .map((content) => content.text || "")
    .filter(Boolean)
    .join("\n")
    .trim();
}

function normalizeAiResult(result) {
  const recommendations = Array.isArray(result.recommendations) ? result.recommendations : [];
  return {
    notEnoughData: Boolean(result.notEnoughData),
    message: cleanString(result.message, 500),
    tasteSummary: cleanString(result.tasteSummary, 1200),
    recommendations: recommendations.slice(0, 30).map((item) => ({
      title: cleanString(item.title, 180),
      year: normalizeYear(item.year),
      confidence: cleanString(item.confidence, 80),
      reason: cleanString(item.reason, 700),
      match: cleanString(item.match, 700)
    })).filter((item) => item.title)
  };
}

function publicError(statusCode, publicMessage) {
  const error = new Error(publicMessage);
  error.statusCode = statusCode;
  error.publicMessage = publicMessage;
  return error;
}
