// Build with: bun build assets/js/pokemon.jsx --outdir assets/js --format esm
import React, { useEffect, useMemo, useState } from "https://esm.sh/react@18";
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

const fallbackUUID = () => Math.random().toString(36).slice(2) + Date.now().toString(36);

const defaultConfig = {
    apiKey: "AIzaSyDRniZatGeylxphjHQadYjucOcirNBRIdk",
    authDomain: "multiplayer-640ec.firebaseapp.com",
    databaseURL: "https://multiplayer-640ec-default-rtdb.firebaseio.com",
    projectId: "multiplayer-640ec",
    storageBucket: "multiplayer-640ec.firebasestorage.app",
    messagingSenderId: "94914236381",
    appId: "1:94914236381:web:55ab00cc690140180cf034",
    measurementId: "G-V43J1S8RGF"
};

const firebaseConfig = window.POKEMON_FIREBASE_CONFIG || defaultConfig;

let db = null;
let firebaseReady = false;
let firebaseInitError = null;

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

const normalizeName = (s) => s.toLowerCase().replace(/[^a-z0-9]/g, "");

const useLocalId = () => {
    const [id] = useState(() => {
        const existing = localStorage.getItem("ptb_player_id");
        if (existing) return existing;
        const generated = (uuidv4 ? uuidv4() : fallbackUUID());
        localStorage.setItem("ptb_player_id", generated);
        return generated;
    });
    return id;
};

const nowMs = () => Date.now();

const secondsLeft = (endsAtMs) => Math.max(0, Math.ceil((endsAtMs - nowMs()) / 1000));

const usePokedex = () => {
    const [names, setNames] = useState(new Set());
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
                if (!res.ok) throw new Error("Failed to fetch Pokédex");
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
        if (!input) return false;
        const norm = input.toLowerCase().trim();
        if (names.has(norm)) return true;
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

async function createRoom(db, roomCode, hostId) {
    const roomRef = doc(db, "rooms", roomCode);
    const snap = await getDoc(roomRef);
    if (snap.exists()) throw new Error("Room already exists");
    await setDoc(roomRef, {
        status: "lobby",
        createdAt: serverTimestamp(),
        hostId,
        startedAt: null,
        endsAt: null
    });
}

async function joinRoom(db, roomCode, playerId, name) {
    const roomRef = doc(db, "rooms", roomCode);
    const roomSnap = await getDoc(roomRef);
    if (!roomSnap.exists()) throw new Error("Room not found");
    await setDoc(doc(db, "rooms", roomCode, "players", playerId), {
        name,
        score: 0,
        joinedAt: serverTimestamp()
    }, { merge: true });
}

async function startGame(db, roomCode, durationMs = 60000) {
    const roomRef = doc(db, "rooms", roomCode);
    const startMs = Date.now() + 3000;
    const endMs = startMs + durationMs;
    await updateDoc(roomRef, {
        status: "countdown",
        startedAt: startMs,
        endsAt: endMs
    });
    setTimeout(async () => {
        await updateDoc(roomRef, { status: "playing" });
        setTimeout(async () => {
            await updateDoc(roomRef, { status: "ended" });
        }, durationMs);
    }, 3000);
}

async function submitEntry(db, roomCode, playerId, inputName) {
    const norm = normalizeName(inputName);
    const roomRef = doc(db, "rooms", roomCode);
    const entryRef = doc(db, "rooms", roomCode, "entries", norm);
    const playerRef = doc(db, "rooms", roomCode, "players", playerId);

    return await runTransaction(db, async (tx) => {
        const roomSnap = await tx.get(roomRef);
        if (!roomSnap.exists()) throw new Error("Room missing");
        const { status, endsAt } = roomSnap.data();
        if (status !== "playing" || !endsAt || Date.now() > endsAt) {
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
        const curr = playerSnap.exists() ? (playerSnap.data().score || 0) : 0;
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

    const roomRef = useMemo(() => roomCode ? doc(db, "rooms", roomCode) : null, [roomCode]);

    useEffect(() => {
        if (!roomRef) return;
        const unsub = onSnapshot(roomRef, (snap) => {
            setRoom(snap.exists() ? { id: snap.id, ...snap.data() } : null);
        });
        return () => unsub();
    }, [roomRef]);

    useEffect(() => {
        if (!roomCode) return;
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
        if (!roomCode) return;
        const entriesRef = collection(db, "rooms", roomCode, "entries");
        const q = query(entriesRef, orderBy("createdAt", "desc"), limit(20));
        const unsub = onSnapshot(q, (snap) => {
            const arr = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
            setEntries(arr);
        });
        return () => unsub();
    }, [roomCode]);

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
            if (!roomCode || !name.trim()) throw new Error("Enter room code and name");
            await joinRoom(db, roomCode.toUpperCase(), playerId, name.trim());
            setRoomCode(roomCode.toUpperCase());
        } catch (e) {
            alert(e.message);
        }
    };

    const handleStart = async () => {
        try {
            if (!room) return;
            if (room.hostId !== playerId) throw new Error("Only host can start");
            await startGame(db, room.id, 60000);
        } catch (e) {
            alert(e.message);
        }
    };

    const canType = room?.status === "playing";

    const [tick, setTick] = useState(0);
    useEffect(() => {
        const t = setInterval(() => setTick((x) => x + 1), 200);
        return () => clearInterval(t);
    }, []);

    const countdown = useMemo(() => {
        if (!room?.startedAt) return null;
        const diff = Math.ceil((room.startedAt - nowMs()) / 1000);
        return diff > 0 ? diff : null;
    }, [room?.startedAt, tick]);

    const timeLeft = useMemo(() => {
        if (!room?.endsAt) return null;
        return secondsLeft(room.endsAt);
    }, [room?.endsAt, tick]);

    const onSubmit = async (e) => {
        e.preventDefault();
        const guess = input.trim();
        if (!guess) return;
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
        } catch (e) {
            setFeedback(e.message);
            setTimeout(() => setFeedback(""), 1000);
        }
    };

    const isHost = room?.hostId === playerId;

    return (
        <div style={{
            fontFamily: "Plus Jakarta Sans, Inter, system-ui, -apple-system, sans-serif",
            maxWidth: 960,
            margin: "0 auto",
            padding: 16,
            display: "grid",
            gap: 16
        }}>
            <header>
                <p style={{ letterSpacing: "0.35em", textTransform: "uppercase", fontSize: 12, color: "var(--accent-blue)", margin: 0 }}>Real-time challenge</p>
                <h1 style={{ fontSize: 32, fontWeight: 800, margin: "4px 0 8px" }}>Pokémon Typing Battle</h1>
                <p style={{ opacity: 0.8, margin: 0 }}>Create a room, invite friends, and type unique Pokémon faster than anyone else.</p>
            </header>

            {dexLoading && <div>Loading Pokédex… (first run can take a few seconds)</div>}
            {dexError && <div style={{ color: "#ff6b8a" }}>Pokédex error: {dexError}</div>}

            {!room && (
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 16 }}>
                    <div style={{ border: "1px solid rgba(147,198,255,0.25)", borderRadius: 16, padding: 16, background: "rgba(17, 10, 35, 0.65)", boxShadow: "var(--shadow-strong)" }}>
                        <h2 style={{ fontSize: 22, fontWeight: 700, marginTop: 0 }}>Create Room</h2>
                        <p style={{ marginTop: 0, color: "var(--text-muted)", fontSize: 14 }}>Generate a one-time code and share it with your party.</p>
                        <button onClick={handleCreateRoom} style={btnPrimary}>Create code</button>
                    </div>
                    <div style={{ border: "1px solid rgba(147,198,255,0.25)", borderRadius: 16, padding: 16, background: "rgba(17, 10, 35, 0.65)", boxShadow: "var(--shadow-strong)" }}>
                        <h2 style={{ fontSize: 22, fontWeight: 700, marginTop: 0 }}>Join Room</h2>
                        <p style={{ marginTop: 0, color: "var(--text-muted)", fontSize: 14 }}>Enter the host code and your name to jump in.</p>
                        <div style={{ display: "grid", gap: 8 }}>
                            <input placeholder="Room Code" value={roomCode} onChange={(e) => setRoomCode(e.target.value.toUpperCase())} style={inputStyle} />
                            <input placeholder="Your Name" value={name} onChange={(e) => setName(e.target.value)} style={inputStyle} />
                            <button onClick={handleJoinRoom} style={btnSecondary}>Join room</button>
                        </div>
                    </div>
                </div>
            )}

            {room && (
                <section style={{ border: "1px solid rgba(147,198,255,0.25)", borderRadius: 20, padding: 20, background: "rgba(15, 9, 30, 0.75)", boxShadow: "var(--shadow-strong)", display: "grid", gap: 20 }}>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 16, alignItems: "center", justifyContent: "space-between" }}>
                        <div>
                            <div style={{ fontSize: 12, color: "var(--text-muted)" }}>Room code</div>
                            <div style={{ fontSize: 24, fontWeight: 800, letterSpacing: "0.18em" }}>{room.id}</div>
                        </div>
                        <div>
                            <div style={{ fontSize: 12, color: "var(--text-muted)" }}>Status</div>
                            <div style={{ fontSize: 18, fontWeight: 700, textTransform: "capitalize" }}>{room.status}</div>
                        </div>
                        <div style={{ fontSize: 24, fontWeight: 800 }}>
                            {room.status === "countdown" && <>Starting in {countdown ?? 0}</>}
                            {room.status === "playing" && <>Time left {timeLeft}s</>}
                            {room.status === "ended" && <>Round over</>}
                        </div>
                        {isHost && room.status === "lobby" && (
                            <button onClick={handleStart} style={btnPrimary}>Start 60s round</button>
                        )}
                    </div>

                    <div style={{ display: "grid", gap: 20, gridTemplateColumns: "minmax(0, 3fr) minmax(0, 2fr)" }}>
                        <div style={{ display: "grid", gap: 16 }}>
                            <form onSubmit={onSubmit} style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
                                <input
                                    disabled={!canType}
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    placeholder="Type a Pokémon and press Enter…"
                                    style={{ ...inputStyle, flex: "1 1 220px", fontSize: 18 }}
                                />
                                <button disabled={!canType} style={btnSecondary}>Submit</button>
                            </form>
                            {feedback && <div style={{ fontWeight: 600 }}>{feedback}</div>}

                            <div>
                                <h3 style={{ margin: "12px 0 8px", fontSize: 18 }}>Recent entries</h3>
                                <ul style={{ margin: 0, paddingLeft: 18, display: "grid", gap: 4 }}>
                                    {entries.map((e) => (
                                        <li key={e.id} style={{ opacity: 0.9 }}>
                                            {e.name} <span style={{ opacity: 0.6 }}>— {players.find((p) => p.id === e.playerId)?.name || "someone"}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        <aside>
                            <h3 style={{ margin: "12px 0 8px", fontSize: 18 }}>Leaderboard</h3>
                            <ol style={{ margin: 0, paddingLeft: 20, display: "grid", gap: 6 }}>
                                {players.map((p) => (
                                    <li key={p.id} style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
                                        <span>
                                            {p.name}
                                            {p.id === room.hostId ? " (Host)" : ""}
                                            {p.id === playerId ? " — You" : ""}
                                        </span>
                                        <strong>{p.score || 0}</strong>
                                    </li>
                                ))}
                            </ol>
                        </aside>
                    </div>
                </section>
            )}

            <Footer me={me} />
        </div>
    );
}

const inputStyle = {
    padding: "12px 14px",
    border: "1px solid rgba(147,198,255,0.25)",
    borderRadius: 12,
    background: "rgba(8, 4, 22, 0.75)",
    color: "var(--text-primary)",
    fontFamily: "inherit"
};

const btnBase = {
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

const btnPrimary = {
    ...btnBase,
    background: "linear-gradient(135deg, var(--accent-blue), var(--accent-pink))",
    color: "#110720",
    border: "1px solid rgba(247, 167, 218, 0.65)"
};

const btnSecondary = {
    ...btnBase
};

const Footer = ({ me }) => (
    <footer style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 12, lineHeight: 1.5 }}>
        <p style={{ margin: "0 0 8px" }}>
            Pro tip: If a name like “Mr. Mime” doesn’t validate, try “mr-mime”. We use canonical spellings from PokéAPI.
        </p>
        <details style={{ background: "rgba(8, 4, 22, 0.55)", padding: 12, borderRadius: 12, border: "1px solid rgba(147,198,255,0.18)" }}>
            <summary style={{ cursor: "pointer", fontWeight: 600, color: "var(--accent-blue)" }}>Firebase setup help</summary>
            <div style={{ marginTop: 8, display: "grid", gap: 8 }}>
                <p style={{ margin: 0 }}>Update <code>firebaseConfig</code> in <code>pokemon.html</code> (or define <code>window.POKEMON_FIREBASE_CONFIG</code>) with your Firebase project credentials.</p>
                <p style={{ margin: 0 }}>Firestore rules (prototype only):</p>
                <pre
                    style={{ margin: 0, padding: 12, borderRadius: 12, background: "rgba(5, 3, 17, 0.85)", whiteSpace: "pre-wrap" }}
                >{`rules_version = '2';
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
}`}</pre>
                {firebaseInitError && (
                    <p style={{ margin: 0, color: "#ff6b8a" }}>Init status: {firebaseInitError.message}</p>
                )}
            </div>
        </details>
    </footer>
);

const SetupNotice = ({ error }) => (
    <div style={{
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
    }}>
        <h1 style={{ fontSize: 30, fontWeight: 800, margin: 0 }}>Pokémon Typing Battle</h1>
        <p style={{ margin: 0, color: "var(--text-muted)" }}>
            Add your Firebase credentials to get the realtime multiplayer lobby running. The UI is ready once configuration is complete.
        </p>
        <ol style={{ margin: 0, paddingLeft: 20, display: "grid", gap: 6 }}>
            <li>Visit the Firebase console &rarr; create a project &rarr; add a Web app.</li>
            <li>Copy the config keys and paste them into <code>pokemon.html</code> (replace the placeholders).</li>
            <li>Enable Cloud Firestore and paste the rules from the help panel below.</li>
        </ol>
        {error && <p style={{ margin: 0, color: "#ff6b8a" }}>Current status: {error.message}</p>}
        <p style={{ margin: 0, fontSize: 12, color: "var(--text-muted)" }}>
            Tip: you can also define <code>window.POKEMON_FIREBASE_CONFIG</code> before this script loads to keep secrets out of source control.
        </p>
    </div>
);

function Root() {
    if (!firebaseReady) {
        return <SetupNotice error={firebaseInitError} />;
    }
    return <App />;
}

const rootEl = document.getElementById("root");
if (rootEl) {
    createRoot(rootEl).render(<Root />);
}
