// assets/js/pokemon.jsx
import React2, { useEffect, useMemo, useState } from "https://esm.sh/react@18";
import { createRoot } from "https://esm.sh/react-dom@18/client";
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  onSnapshot,
  updateDoc,
  serverTimestamp,
  collection,
  runTransaction,
  query,
  orderBy,
  limit
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import { v4 as uuidv4 } from "https://esm.sh/uuid@9";

// node_modules/react/jsx-dev-runtime.js
import React from "https://esm.sh/react@18";
function create(type, props, key) {
  const finalProps = props == null ? {} : props;
  if (key !== undefined) {
    return React.createElement(type, { ...finalProps, key });
  }
  return React.createElement(type, finalProps);
}
function jsxDEV(type, props, key) {
  return create(type, props, key);
}
var Fragment = React.Fragment;

// assets/js/pokemon.jsx
var fallbackUUID = () => Math.random().toString(36).slice(2) + Date.now().toString(36);
var defaultConfig = {
  apiKey: "AIzaSyDRniZatGeylxphjHQadYjucOcirNBRIdk",
  authDomain: "multiplayer-640ec.firebaseapp.com",
  databaseURL: "https://multiplayer-640ec-default-rtdb.firebaseio.com",
  projectId: "multiplayer-640ec",
  storageBucket: "multiplayer-640ec.firebasestorage.app",
  messagingSenderId: "94914236381",
  appId: "1:94914236381:web:55ab00cc690140180cf034",
  measurementId: "G-V43J1S8RGF"
};
var firebaseConfig = window.POKEMON_FIREBASE_CONFIG || defaultConfig;
var db = null;
var firebaseReady = false;
var firebaseInitError = null;
if (firebaseConfig && firebaseConfig.apiKey && firebaseConfig.apiKey !== "YOUR_API_KEY") {
  try {
    const app = initializeApp(firebaseConfig);
    db = getFirestore(app);
    firebaseReady = true;
  } catch (err) {
    firebaseInitError = err;
    console.error("Pokémon Typing Battle Firebase init failed", err);
  }
} else {
  firebaseInitError = new Error("Add your Firebase config in pokemon.html or define window.POKEMON_FIREBASE_CONFIG before loading.");
  console.warn(firebaseInitError.message);
}
var normalizeName = (s) => s.toLowerCase().replace(/[^a-z0-9]/g, "");
var useLocalId = () => {
  const [id] = useState(() => {
    const existing = localStorage.getItem("ptb_player_id");
    if (existing)
      return existing;
    const generated = uuidv4 ? uuidv4() : fallbackUUID();
    localStorage.setItem("ptb_player_id", generated);
    return generated;
  });
  return id;
};
var nowMs = () => Date.now();
var secondsLeft = (endsAtMs) => Math.max(0, Math.ceil((endsAtMs - nowMs()) / 1000));
var DEFAULT_DURATION_MS = 60000;
var DURATION_OPTIONS = [
  { id: "60", label: "1 minute", value: 60000 },
  { id: "120", label: "2 minutes", value: 120000 },
  { id: "300", label: "5 minutes", value: 300000 },
  { id: "unlimited", label: "Unlimited", value: null }
];
var getDurationOptionById = (id) => {
  const found = DURATION_OPTIONS.find((opt) => opt.id === id);
  return found || DURATION_OPTIONS[0];
};
var getDurationOptionByValue = (value) => DURATION_OPTIONS.find((opt) => opt.value === value);
var usePokedex = () => {
  const [names, setNames] = useState(new Set);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const cached = localStorage.getItem("ptb_pokedex_v2");
    if (cached) {
      try {
        const arr = JSON.parse(cached);
        setNames(new Set(arr));
        setLoading(false);
        return;
      } catch {}
    }
    const fetchAll = async () => {
      try {
        setLoading(true);
        const url = "https://pokeapi.co/api/v2/pokemon?limit=2000";
        const res = await fetch(url);
        if (!res.ok)
          throw new Error("Failed to fetch Pokédex");
        const data = await res.json();
        const raw = data.results?.map((p) => p.name) || [];
        const arr = Array.from(new Set(raw));
        localStorage.setItem("ptb_pokedex_v2", JSON.stringify(arr));
        setNames(new Set(arr));
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };
    fetchAll();
  }, []);
  const isValid = (input) => {
    if (!input)
      return false;
    const norm = input.toLowerCase().trim();
    if (names.has(norm))
      return true;
    const aliases = {
      "nidoran♀": "nidoran-f",
      "nidoran♂": "nidoran-m",
      "farfetch’d": "farfetchd",
      "mr mime": "mr-mime",
      "mime jr": "mime-jr",
      "type null": "type-null",
      "jangmo o": "jangmo-o",
      "hakamo o": "hakamo-o",
      "kommo o": "kommo-o",
      "tapu koko": "tapu-koko",
      "tapu lele": "tapu-lele",
      "tapu bulu": "tapu-bulu",
      "tapu fini": "tapu-fini"
    };
    const alt = aliases[norm];
    return alt ? names.has(alt) : false;
  };
  return { loading, error, isValid };
};
async function createRoom(db2, roomCode, hostId) {
  const roomRef = doc(db2, "rooms", roomCode);
  const snap = await getDoc(roomRef);
  if (snap.exists())
    throw new Error("Room already exists");
  await setDoc(roomRef, {
    status: "lobby",
    createdAt: serverTimestamp(),
    hostId,
    startedAt: null,
    endsAt: null,
    durationMs: DEFAULT_DURATION_MS
  });
}
async function joinRoom(db2, roomCode, playerId, name) {
  const roomRef = doc(db2, "rooms", roomCode);
  const roomSnap = await getDoc(roomRef);
  if (!roomSnap.exists())
    throw new Error("Room not found");
  await setDoc(doc(db2, "rooms", roomCode, "players", playerId), {
    name,
    score: 0,
    joinedAt: serverTimestamp()
  }, { merge: true });
}
async function startGame(db2, roomCode, durationMs = DEFAULT_DURATION_MS) {
  const roomRef = doc(db2, "rooms", roomCode);
  const startMs = Date.now() + 3000;
  const hasDuration = typeof durationMs === "number" && !Number.isNaN(durationMs);
  const endMs = hasDuration ? startMs + durationMs : null;
  await updateDoc(roomRef, {
    status: "countdown",
    startedAt: startMs,
    endsAt: endMs,
    durationMs: hasDuration ? durationMs : null
  });
  setTimeout(async () => {
    await updateDoc(roomRef, { status: "playing" });
    if (hasDuration) {
      setTimeout(async () => {
        await updateDoc(roomRef, { status: "ended" });
      }, durationMs);
    }
  }, 3000);
}
async function submitEntry(db2, roomCode, playerId, inputName) {
  const norm = normalizeName(inputName);
  const roomRef = doc(db2, "rooms", roomCode);
  const entryRef = doc(db2, "rooms", roomCode, "entries", norm);
  const playerRef = doc(db2, "rooms", roomCode, "players", playerId);
  return await runTransaction(db2, async (tx) => {
    const roomSnap = await tx.get(roomRef);
    if (!roomSnap.exists())
      throw new Error("Room missing");
    const { status, endsAt } = roomSnap.data();
    if (status !== "playing") {
      throw new Error("Round is not active");
    }
    if (endsAt && Date.now() > endsAt) {
      throw new Error("Round is not active");
    }
    const exists = await tx.get(entryRef);
    if (exists.exists()) {
      throw new Error("That Pokémon was already used!");
    }
    tx.set(entryRef, {
      name: inputName.trim(),
      playerId,
      createdAt: serverTimestamp()
    });
    const playerSnap = await tx.get(playerRef);
    const curr = playerSnap.exists() ? playerSnap.data().score || 0 : 0;
    tx.set(playerRef, { score: curr + 1 }, { merge: true });
  });
}
function App() {
  const playerId = useLocalId();
  const { loading: dexLoading, error: dexError, isValid } = usePokedex();
  const [roomCode, setRoomCode] = useState("");
  const [name, setName] = useState("");
  const [me, setMe] = useState(null);
  const [room, setRoom] = useState(null);
  const [players, setPlayers] = useState([]);
  const [entries, setEntries] = useState([]);
  const [input, setInput] = useState("");
  const [feedback, setFeedback] = useState("");
  const [selectedDurationId, setSelectedDurationId] = useState(() => DURATION_OPTIONS[0].id);
  const roomRef = useMemo(() => roomCode ? doc(db, "rooms", roomCode) : null, [roomCode]);
  useEffect(() => {
    if (!roomRef)
      return;
    const unsub = onSnapshot(roomRef, (snap) => {
      setRoom(snap.exists() ? { id: snap.id, ...snap.data() } : null);
    });
    return () => unsub();
  }, [roomRef]);
  useEffect(() => {
    if (!roomCode)
      return;
    const playersRef = collection(db, "rooms", roomCode, "players");
    const unsub = onSnapshot(playersRef, (snap) => {
      const arr = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
      arr.sort((a, b) => (b.score || 0) - (a.score || 0));
      setPlayers(arr);
      const mine = arr.find((p) => p.id === playerId);
      setMe(mine || null);
    });
    return () => unsub();
  }, [roomCode, playerId]);
  useEffect(() => {
    if (!roomCode)
      return;
    const entriesRef = collection(db, "rooms", roomCode, "entries");
    const q = query(entriesRef, orderBy("createdAt", "desc"), limit(20));
    const unsub = onSnapshot(q, (snap) => {
      const arr = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
      setEntries(arr);
    });
    return () => unsub();
  }, [roomCode]);
  useEffect(() => {
    if (!room)
      return;
    if (room.durationMs === null) {
      setSelectedDurationId("unlimited");
      return;
    }
    if (typeof room.durationMs === "number") {
      const preset = getDurationOptionByValue(room.durationMs);
      if (preset) {
        setSelectedDurationId(preset.id);
      }
    }
  }, [room?.durationMs]);
  const selectedDuration = useMemo(() => getDurationOptionById(selectedDurationId), [selectedDurationId]);
  const startButtonLabel = useMemo(() => {
    if (!selectedDuration)
      return "Start round";
    return selectedDuration.label === "Unlimited" ? "Start unlimited round" : `Start ${selectedDuration.label} round`;
  }, [selectedDuration]);
  const activeDurationLabel = useMemo(() => {
    if (!room)
      return null;
    if (room.status === "lobby")
      return selectedDuration?.label || null;
    if (room.durationMs === null)
      return "Unlimited";
    if (typeof room.durationMs === "number") {
      const preset = getDurationOptionByValue(room.durationMs);
      return preset ? preset.label : `${Math.round(room.durationMs / 1000)}s`;
    }
    return null;
  }, [room?.status, room?.durationMs, selectedDuration]);
  const handleCreateRoom = async () => {
    try {
      const code = (Math.random().toString(36).slice(2, 6) + Math.random().toString(36).slice(2, 6)).slice(0, 6).toUpperCase();
      await createRoom(db, code, playerId);
      setRoomCode(code);
    } catch (e) {
      alert(e.message);
    }
  };
  const handleJoinRoom = async () => {
    try {
      if (!roomCode || !name.trim())
        throw new Error("Enter room code and name");
      await joinRoom(db, roomCode.toUpperCase(), playerId, name.trim());
      setRoomCode(roomCode.toUpperCase());
    } catch (e) {
      alert(e.message);
    }
  };
  const isHost = room?.hostId === playerId;
  const handleStart = async () => {
    try {
      if (!room)
        return;
      if (room.hostId !== playerId)
        throw new Error("Only host can start");
      await startGame(db, room.id, selectedDuration?.value ?? DEFAULT_DURATION_MS);
    } catch (e) {
      alert(e.message);
    }
  };
  const handleDurationSelect = async (optionId) => {
    setSelectedDurationId(optionId);
    if (!isHost || !roomRef)
      return;
    const preset = getDurationOptionById(optionId);
    try {
      await updateDoc(roomRef, { durationMs: preset.value === null ? null : preset.value });
    } catch (err) {
      console.error("Failed to update round duration", err);
    }
  };
  const canType = room?.status === "playing";
  const [tick, setTick] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setTick((x) => x + 1), 200);
    return () => clearInterval(t);
  }, []);
  const countdown = useMemo(() => {
    if (!room?.startedAt)
      return null;
    const diff = Math.ceil((room.startedAt - nowMs()) / 1000);
    return diff > 0 ? diff : null;
  }, [room?.startedAt, tick]);
  const timeLeft = useMemo(() => {
    if (!room?.endsAt)
      return null;
    return secondsLeft(room.endsAt);
  }, [room?.endsAt, tick]);
  const onSubmit = async (e) => {
    e.preventDefault();
    const guess = input.trim();
    if (!guess)
      return;
    if (!canType) {
      setFeedback("Wait for the round to start!");
      return;
    }
    if (!isValid(guess)) {
      setFeedback("Not a valid Pokémon name!");
      return;
    }
    try {
      await submitEntry(db, room.id, playerId, guess);
      setInput("");
      setFeedback("Nice!");
      setTimeout(() => setFeedback(""), 600);
    } catch (e2) {
      setFeedback(e2.message);
      setTimeout(() => setFeedback(""), 1000);
    }
  };
  return /* @__PURE__ */ jsxDEV("div", {
    style: {
      fontFamily: "Plus Jakarta Sans, Inter, system-ui, -apple-system, sans-serif",
      maxWidth: 960,
      margin: "0 auto",
      padding: 16,
      display: "grid",
      gap: 16
    },
    children: [
      /* @__PURE__ */ jsxDEV("header", {
        children: [
          /* @__PURE__ */ jsxDEV("p", {
            style: { letterSpacing: "0.35em", textTransform: "uppercase", fontSize: 12, color: "var(--accent-blue)", margin: 0 },
            children: "Real-time challenge"
          }, undefined, false, undefined, this),
          /* @__PURE__ */ jsxDEV("h1", {
            style: { fontSize: 32, fontWeight: 800, margin: "4px 0 8px" },
            children: "Pokémon Typing Battle"
          }, undefined, false, undefined, this),
          /* @__PURE__ */ jsxDEV("p", {
            style: { opacity: 0.8, margin: 0 },
            children: "Create a room, invite friends, and type unique Pokémon faster than anyone else."
          }, undefined, false, undefined, this)
        ]
      }, undefined, true, undefined, this),
      dexLoading && /* @__PURE__ */ jsxDEV("div", {
        children: "Loading Pokédex… (first run can take a few seconds)"
      }, undefined, false, undefined, this),
      dexError && /* @__PURE__ */ jsxDEV("div", {
        style: { color: "#ff6b8a" },
        children: [
          "Pokédex error: ",
          dexError
        ]
      }, undefined, true, undefined, this),
      !room && /* @__PURE__ */ jsxDEV("div", {
        style: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 16 },
        children: [
          /* @__PURE__ */ jsxDEV("div", {
            style: { border: "1px solid rgba(147,198,255,0.25)", borderRadius: 16, padding: 16, background: "rgba(17, 10, 35, 0.65)", boxShadow: "var(--shadow-strong)" },
            children: [
              /* @__PURE__ */ jsxDEV("h2", {
                style: { fontSize: 22, fontWeight: 700, marginTop: 0 },
                children: "Create Room"
              }, undefined, false, undefined, this),
              /* @__PURE__ */ jsxDEV("p", {
                style: { marginTop: 0, color: "var(--text-muted)", fontSize: 14 },
                children: "Generate a one-time code and share it with your party."
              }, undefined, false, undefined, this),
              /* @__PURE__ */ jsxDEV("button", {
                onClick: handleCreateRoom,
                style: btnPrimary,
                children: "Create code"
              }, undefined, false, undefined, this)
            ]
          }, undefined, true, undefined, this),
          /* @__PURE__ */ jsxDEV("div", {
            style: { border: "1px solid rgba(147,198,255,0.25)", borderRadius: 16, padding: 16, background: "rgba(17, 10, 35, 0.65)", boxShadow: "var(--shadow-strong)" },
            children: [
              /* @__PURE__ */ jsxDEV("h2", {
                style: { fontSize: 22, fontWeight: 700, marginTop: 0 },
                children: "Join Room"
              }, undefined, false, undefined, this),
              /* @__PURE__ */ jsxDEV("p", {
                style: { marginTop: 0, color: "var(--text-muted)", fontSize: 14 },
                children: "Enter the host code and your name to jump in."
              }, undefined, false, undefined, this),
              /* @__PURE__ */ jsxDEV("div", {
                style: { display: "grid", gap: 8 },
                children: [
                  /* @__PURE__ */ jsxDEV("input", {
                    placeholder: "Room Code",
                    value: roomCode,
                    onChange: (e) => setRoomCode(e.target.value.toUpperCase()),
                    style: inputStyle
                  }, undefined, false, undefined, this),
                  /* @__PURE__ */ jsxDEV("input", {
                    placeholder: "Your Name",
                    value: name,
                    onChange: (e) => setName(e.target.value),
                    style: inputStyle
                  }, undefined, false, undefined, this),
                  /* @__PURE__ */ jsxDEV("button", {
                    onClick: handleJoinRoom,
                    style: btnSecondary,
                    children: "Join room"
                  }, undefined, false, undefined, this)
                ]
              }, undefined, true, undefined, this)
            ]
          }, undefined, true, undefined, this)
        ]
      }, undefined, true, undefined, this),
      room && /* @__PURE__ */ jsxDEV("section", {
        style: { border: "1px solid rgba(147,198,255,0.25)", borderRadius: 20, padding: 20, background: "rgba(15, 9, 30, 0.75)", boxShadow: "var(--shadow-strong)", display: "grid", gap: 20 },
        children: [
          /* @__PURE__ */ jsxDEV("div", {
            style: { display: "flex", flexWrap: "wrap", gap: 16, alignItems: "center", justifyContent: "space-between" },
            children: [
              /* @__PURE__ */ jsxDEV("div", {
                children: [
                  /* @__PURE__ */ jsxDEV("div", {
                    style: { fontSize: 12, color: "var(--text-muted)" },
                    children: "Room code"
                  }, undefined, false, undefined, this),
                  /* @__PURE__ */ jsxDEV("div", {
                    style: { fontSize: 24, fontWeight: 800, letterSpacing: "0.18em" },
                    children: room.id
                  }, undefined, false, undefined, this)
                ]
              }, undefined, true, undefined, this),
              /* @__PURE__ */ jsxDEV("div", {
                children: [
                  /* @__PURE__ */ jsxDEV("div", {
                    style: { fontSize: 12, color: "var(--text-muted)" },
                    children: "Round length"
                  }, undefined, false, undefined, this),
                  /* @__PURE__ */ jsxDEV("div", {
                    style: { fontSize: 18, fontWeight: 700 },
                    children: activeDurationLabel || "—"
                  }, undefined, false, undefined, this)
                ]
              }, undefined, true, undefined, this),
              /* @__PURE__ */ jsxDEV("div", {
                children: [
                  /* @__PURE__ */ jsxDEV("div", {
                    style: { fontSize: 12, color: "var(--text-muted)" },
                    children: "Status"
                  }, undefined, false, undefined, this),
                  /* @__PURE__ */ jsxDEV("div", {
                    style: { fontSize: 18, fontWeight: 700, textTransform: "capitalize" },
                    children: room.status
                  }, undefined, false, undefined, this)
                ]
              }, undefined, true, undefined, this),
              /* @__PURE__ */ jsxDEV("div", {
                style: { fontSize: 24, fontWeight: 800 },
                children: [
                  room.status === "countdown" && /* @__PURE__ */ jsxDEV(Fragment, {
                    children: [
                      "Starting in ",
                      countdown ?? 0
                    ]
                  }, undefined, true, undefined, this),
                  room.status === "playing" && (room.endsAt ? /* @__PURE__ */ jsxDEV(Fragment, {
                    children: [
                      "Time left ",
                      timeLeft,
                      "s"
                    ]
                  }, undefined, true, undefined, this) : /* @__PURE__ */ jsxDEV(Fragment, {
                    children: "Unlimited time"
                  }, undefined, false, undefined, this)),
                  room.status === "ended" && /* @__PURE__ */ jsxDEV(Fragment, {
                    children: "Round over"
                  }, undefined, false, undefined, this)
                ]
              }, undefined, true, undefined, this),
              isHost && room.status === "lobby" && /* @__PURE__ */ jsxDEV("button", {
                onClick: handleStart,
                style: btnPrimary,
                children: startButtonLabel
              }, undefined, false, undefined, this)
            ]
          }, undefined, true, undefined, this),
          isHost && room.status === "lobby" && /* @__PURE__ */ jsxDEV("div", {
            style: { display: "grid", gap: 8 },
            children: [
              /* @__PURE__ */ jsxDEV("div", {
                style: { fontSize: 14, color: "var(--text-muted)" },
                children: "Choose a round duration:"
              }, undefined, false, undefined, this),
              /* @__PURE__ */ jsxDEV("div", {
                style: { display: "flex", flexWrap: "wrap", gap: 8 },
                children: DURATION_OPTIONS.map((option) => /* @__PURE__ */ jsxDEV("button", {
                  type: "button",
                  onClick: () => handleDurationSelect(option.id),
                  "aria-pressed": selectedDurationId === option.id,
                  style: {
                    ...btnSecondary,
                    padding: "10px 16px",
                    fontSize: 14,
                    background: selectedDurationId === option.id ? "linear-gradient(135deg, rgba(147,198,255,0.85), rgba(247,167,218,0.8))" : "linear-gradient(135deg, rgba(31,21,58,0.85), rgba(11,7,27,0.88))",
                    color: selectedDurationId === option.id ? "#110720" : "var(--text-primary)",
                    border: selectedDurationId === option.id ? "1px solid rgba(247, 167, 218, 0.75)" : "1px solid rgba(147,198,255,0.32)",
                    boxShadow: selectedDurationId === option.id ? "0 20px 36px rgba(5, 3, 17, 0.55)" : "0 18px 32px rgba(5, 3, 17, 0.45)"
                  },
                  children: option.label
                }, option.id, false, undefined, this))
              }, undefined, false, undefined, this)
            ]
          }, undefined, true, undefined, this),
          /* @__PURE__ */ jsxDEV("div", {
            style: { display: "grid", gap: 20, gridTemplateColumns: "minmax(0, 3fr) minmax(0, 2fr)" },
            children: [
              /* @__PURE__ */ jsxDEV("div", {
                style: { display: "grid", gap: 16 },
                children: [
                  /* @__PURE__ */ jsxDEV("form", {
                    onSubmit,
                    style: { display: "flex", flexWrap: "wrap", gap: 12 },
                    children: [
                      /* @__PURE__ */ jsxDEV("input", {
                        disabled: !canType,
                        value: input,
                        onChange: (e) => setInput(e.target.value),
                        placeholder: "Type a Pokémon and press Enter…",
                        style: { ...inputStyle, flex: "1 1 220px", fontSize: 18 }
                      }, undefined, false, undefined, this),
                      /* @__PURE__ */ jsxDEV("button", {
                        disabled: !canType,
                        style: btnSecondary,
                        children: "Submit"
                      }, undefined, false, undefined, this)
                    ]
                  }, undefined, true, undefined, this),
                  feedback && /* @__PURE__ */ jsxDEV("div", {
                    style: { fontWeight: 600 },
                    children: feedback
                  }, undefined, false, undefined, this),
                  /* @__PURE__ */ jsxDEV("div", {
                    children: [
                      /* @__PURE__ */ jsxDEV("h3", {
                        style: { margin: "12px 0 8px", fontSize: 18 },
                        children: "Recent entries"
                      }, undefined, false, undefined, this),
                      /* @__PURE__ */ jsxDEV("ul", {
                        style: { margin: 0, paddingLeft: 18, display: "grid", gap: 4 },
                        children: entries.map((e) => /* @__PURE__ */ jsxDEV("li", {
                          style: { opacity: 0.9 },
                          children: [
                            e.name,
                            " ",
                            /* @__PURE__ */ jsxDEV("span", {
                              style: { opacity: 0.6 },
                              children: [
                                "— ",
                                players.find((p) => p.id === e.playerId)?.name || "someone"
                              ]
                            }, undefined, true, undefined, this)
                          ]
                        }, e.id, true, undefined, this))
                      }, undefined, false, undefined, this)
                    ]
                  }, undefined, true, undefined, this)
                ]
              }, undefined, true, undefined, this),
              /* @__PURE__ */ jsxDEV("aside", {
                children: [
                  /* @__PURE__ */ jsxDEV("h3", {
                    style: { margin: "12px 0 8px", fontSize: 18 },
                    children: "Leaderboard"
                  }, undefined, false, undefined, this),
                  /* @__PURE__ */ jsxDEV("ol", {
                    style: { margin: 0, paddingLeft: 20, display: "grid", gap: 6 },
                    children: players.map((p) => /* @__PURE__ */ jsxDEV("li", {
                      style: { display: "flex", justifyContent: "space-between", gap: 12 },
                      children: [
                        /* @__PURE__ */ jsxDEV("span", {
                          children: [
                            p.name,
                            p.id === room.hostId ? " (Host)" : "",
                            p.id === playerId ? " — You" : ""
                          ]
                        }, undefined, true, undefined, this),
                        /* @__PURE__ */ jsxDEV("strong", {
                          children: p.score || 0
                        }, undefined, false, undefined, this)
                      ]
                    }, p.id, true, undefined, this))
                  }, undefined, false, undefined, this)
                ]
              }, undefined, true, undefined, this)
            ]
          }, undefined, true, undefined, this)
        ]
      }, undefined, true, undefined, this),
      /* @__PURE__ */ jsxDEV(Footer, {
        me
      }, undefined, false, undefined, this)
    ]
  }, undefined, true, undefined, this);
}
var inputStyle = {
  padding: "12px 14px",
  border: "1px solid rgba(147,198,255,0.25)",
  borderRadius: 12,
  background: "rgba(8, 4, 22, 0.75)",
  color: "var(--text-primary)",
  fontFamily: "inherit"
};
var btnBase = {
  padding: "12px 16px",
  borderRadius: 999,
  border: "1px solid rgba(147,198,255,0.32)",
  cursor: "pointer",
  fontWeight: 600,
  letterSpacing: "0.01em",
  transition: "transform 0.2s ease, box-shadow 0.2s ease",
  background: "linear-gradient(135deg, rgba(31,21,58,0.85), rgba(11,7,27,0.88))",
  color: "var(--text-primary)",
  boxShadow: "0 18px 32px rgba(5, 3, 17, 0.45)"
};
var btnPrimary = {
  ...btnBase,
  background: "linear-gradient(135deg, var(--accent-blue), var(--accent-pink))",
  color: "#110720",
  border: "1px solid rgba(247, 167, 218, 0.65)"
};
var btnSecondary = {
  ...btnBase
};
var Footer = ({ me }) => /* @__PURE__ */ jsxDEV("footer", {
  style: { fontSize: 12, color: "var(--text-muted)", marginTop: 12, lineHeight: 1.5 },
  children: [
    /* @__PURE__ */ jsxDEV("p", {
      style: { margin: "0 0 8px" },
      children: "Pro tip: If a name like “Mr. Mime” doesn’t validate, try “mr-mime”. We use canonical spellings from PokéAPI."
    }, undefined, false, undefined, this),
    /* @__PURE__ */ jsxDEV("details", {
      style: { background: "rgba(8, 4, 22, 0.55)", padding: 12, borderRadius: 12, border: "1px solid rgba(147,198,255,0.18)" },
      children: [
        /* @__PURE__ */ jsxDEV("summary", {
          style: { cursor: "pointer", fontWeight: 600, color: "var(--accent-blue)" },
          children: "Firebase setup help"
        }, undefined, false, undefined, this),
        /* @__PURE__ */ jsxDEV("div", {
          style: { marginTop: 8, display: "grid", gap: 8 },
          children: [
            /* @__PURE__ */ jsxDEV("p", {
              style: { margin: 0 },
              children: [
                "Update ",
                /* @__PURE__ */ jsxDEV("code", {
                  children: "firebaseConfig"
                }, undefined, false, undefined, this),
                " in ",
                /* @__PURE__ */ jsxDEV("code", {
                  children: "pokemon.html"
                }, undefined, false, undefined, this),
                " (or define ",
                /* @__PURE__ */ jsxDEV("code", {
                  children: "window.POKEMON_FIREBASE_CONFIG"
                }, undefined, false, undefined, this),
                ") with your Firebase project credentials."
              ]
            }, undefined, true, undefined, this),
            /* @__PURE__ */ jsxDEV("p", {
              style: { margin: 0 },
              children: "Firestore rules (prototype only):"
            }, undefined, false, undefined, this),
            /* @__PURE__ */ jsxDEV("pre", {
              style: { margin: 0, padding: 12, borderRadius: 12, background: "rgba(5, 3, 17, 0.85)", whiteSpace: "pre-wrap" },
              children: `rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /rooms/{room} {
      allow read, write: if true;
      match /players/{player} {
        allow read, write: if true;
      }
      match /entries/{entry} {
        allow read, write: if true;
      }
    }
  }
}`
            }, undefined, false, undefined, this),
            firebaseInitError && /* @__PURE__ */ jsxDEV("p", {
              style: { margin: 0, color: "#ff6b8a" },
              children: [
                "Init status: ",
                firebaseInitError.message
              ]
            }, undefined, true, undefined, this)
          ]
        }, undefined, true, undefined, this)
      ]
    }, undefined, true, undefined, this)
  ]
}, undefined, true, undefined, this);
var SetupNotice = ({ error }) => /* @__PURE__ */ jsxDEV("div", {
  style: {
    fontFamily: "Plus Jakarta Sans, Inter, system-ui, -apple-system, sans-serif",
    maxWidth: 640,
    margin: "0 auto",
    padding: 24,
    borderRadius: 20,
    border: "1px solid rgba(147,198,255,0.25)",
    background: "rgba(12, 7, 28, 0.75)",
    boxShadow: "var(--shadow-strong)",
    display: "grid",
    gap: 12
  },
  children: [
    /* @__PURE__ */ jsxDEV("h1", {
      style: { fontSize: 30, fontWeight: 800, margin: 0 },
      children: "Pokémon Typing Battle"
    }, undefined, false, undefined, this),
    /* @__PURE__ */ jsxDEV("p", {
      style: { margin: 0, color: "var(--text-muted)" },
      children: "Add your Firebase credentials to get the realtime multiplayer lobby running. The UI is ready once configuration is complete."
    }, undefined, false, undefined, this),
    /* @__PURE__ */ jsxDEV("ol", {
      style: { margin: 0, paddingLeft: 20, display: "grid", gap: 6 },
      children: [
        /* @__PURE__ */ jsxDEV("li", {
          children: "Visit the Firebase console → create a project → add a Web app."
        }, undefined, false, undefined, this),
        /* @__PURE__ */ jsxDEV("li", {
          children: [
            "Copy the config keys and paste them into ",
            /* @__PURE__ */ jsxDEV("code", {
              children: "pokemon.html"
            }, undefined, false, undefined, this),
            " (replace the placeholders)."
          ]
        }, undefined, true, undefined, this),
        /* @__PURE__ */ jsxDEV("li", {
          children: "Enable Cloud Firestore and paste the rules from the help panel below."
        }, undefined, false, undefined, this)
      ]
    }, undefined, true, undefined, this),
    error && /* @__PURE__ */ jsxDEV("p", {
      style: { margin: 0, color: "#ff6b8a" },
      children: [
        "Current status: ",
        error.message
      ]
    }, undefined, true, undefined, this),
    /* @__PURE__ */ jsxDEV("p", {
      style: { margin: 0, fontSize: 12, color: "var(--text-muted)" },
      children: [
        "Tip: you can also define ",
        /* @__PURE__ */ jsxDEV("code", {
          children: "window.POKEMON_FIREBASE_CONFIG"
        }, undefined, false, undefined, this),
        " before this script loads to keep secrets out of source control."
      ]
    }, undefined, true, undefined, this)
  ]
}, undefined, true, undefined, this);
function Root() {
  if (!firebaseReady) {
    return /* @__PURE__ */ jsxDEV(SetupNotice, {
      error: firebaseInitError
    }, undefined, false, undefined, this);
  }
  return /* @__PURE__ */ jsxDEV(App, {}, undefined, false, undefined, this);
}
var rootEl = document.getElementById("root");
if (rootEl) {
  createRoot(rootEl).render(/* @__PURE__ */ jsxDEV(Root, {}, undefined, false, undefined, this));
}
