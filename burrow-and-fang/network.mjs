import { snapshot, validateSnapshot, makeOpponent } from "./engine.mjs";
import { firebaseConfig } from "../assets/js/firebase-config.js";
const ROOT =
  "https://multiplayer-640ec-default-rtdb.firebaseio.com/burrowAndFang/v1";
const cacheKey = "burrow-fang-armies-v1";
const hash = (s) =>
  Array.from(s).reduce((h, c) => (Math.imul(h, 31) + c.charCodeAt(0)) >>> 0, 7);
let sessionPromise;
async function token() {
  if (!sessionPromise)
    sessionPromise = (async () => {
      const [appSDK, authSDK] = await Promise.all([
        import("https://www.gstatic.com/firebasejs/12.7.0/firebase-app.js"),
        import("https://www.gstatic.com/firebasejs/12.7.0/firebase-auth.js"),
      ]);
      const app =
        appSDK.getApps().find((a) => a.name === "burrow-fang") ||
        appSDK.initializeApp(firebaseConfig, "burrow-fang");
      const auth = authSDK.getAuth(app);
      await auth.authStateReady();
      if (!auth.currentUser) await authSDK.signInAnonymously(auth);
      return auth;
    })().catch((error) => {
      sessionPromise = null;
      throw error;
    });
  let timer;
  try {
    const auth = await Promise.race([
      sessionPromise,
      new Promise((_, reject) => {
        timer = setTimeout(() => reject(Error("Connection timed out")), 5000);
      }),
    ]);
    return await auth.currentUser.getIdToken();
  } finally {
    clearTimeout(timer);
  }
}
async function request(url, options = {}) {
  if (options.method === "PUT") {
    const auth = await token();
    url += (url.includes("?") ? "&" : "?") + "auth=" + encodeURIComponent(auth);
  }
  const controller = new AbortController(),
    timer = setTimeout(() => controller.abort(), 4500);
  try {
    const res = await fetch(url, { ...options, signal: controller.signal });
    if (!res.ok) throw Error(`Snapshot service ${res.status}`);
    return await res.json();
  } finally {
    clearTimeout(timer);
  }
}
function readLocal() {
  try {
    return JSON.parse(localStorage.getItem(cacheKey) || "[]");
  } catch {
    return [];
  }
}
export async function matchmaking(state) {
  const own = snapshot(state),
    slot = hash(state.runId) % 96;
  let list = [],
    online = false,
    published = false;
  // Round-specific, bounded pools; only public army composition is sent.
  const results = await Promise.allSettled([
    request(`${ROOT}/rounds/${state.round}.json`),
    request(`${ROOT}/rounds/${state.round}/${slot}.json`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(own),
    }),
  ]);
  if (results[0].status === "fulfilled") {
    online = true;
    list = Object.values(results[0].value || {});
  }
  published = results[1].status === "fulfilled";
  let candidates = list
    .map((v) => validateSnapshot(v, state.round))
    .filter(
      (v) =>
        v && v.runId !== own.runId && Date.now() - v.created < 30 * 86400000,
    );
  let source = "Saved army";
  if (!candidates.length) {
    candidates = readLocal()
      .map((v) => validateSnapshot(v, state.round))
      .filter((v) => v && v.runId !== own.runId);
    source = "Local saved army";
  }
  candidates.sort(
    (a, b) => Math.abs(a.level - state.level) - Math.abs(b.level - state.level),
  );
  const opponent = candidates.length
    ? candidates[
        hash(state.runId + state.round) % Math.min(8, candidates.length)
      ]
    : makeOpponent(state);
  if (!candidates.length) source = "Practice village";
  try {
    const local = readLocal().filter(
      (v) => v.runId !== own.runId || v.round !== own.round,
    );
    local.push(own);
    localStorage.setItem(cacheKey, JSON.stringify(local.slice(-200)));
  } catch {}
  return { opponent, source, online, published };
}
export async function ping() {
  try {
    await request(`${ROOT}/rounds/1.json?shallow=true`);
    return true;
  } catch {
    return false;
  }
}
