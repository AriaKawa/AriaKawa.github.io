import type { ScraproadRunState } from "./RoguelikeRun";

export type RiggedRoomPhase = "lobby" | "starter_draft" | "vehicle_select" | "playing" | "upgrade_draft";

export type RiggedRoomPlayer = {
  id: string;
  name: string;
  joinedAt: number;
};

export type RiggedRoomPick = {
  id: number;
  playerId: string;
  optionId: string;
  optionName: string;
  pickedAt: number;
};

export type RiggedRoom = {
  code: string;
  hostId: string;
  phase: RiggedRoomPhase;
  round: number;
  players: Record<string, Omit<RiggedRoomPlayer, "id">>;
  playerOrder: string[];
  activePickerId: string;
  draftOptions: string[];
  draftTurn: number;
  pickSequence: number;
  lastPick: RiggedRoomPick | null;
  vehicleSelections: Record<string, string>;
  roundReady: Record<string, boolean>;
  runState: ScraproadRunState | null;
  createdAt: number;
  updatedAt: number;
};

export type RiggedPickInput = {
  optionId: string;
  optionName: string;
  nextRunState: ScraproadRunState;
  nextOptions: string[];
};

type FirebaseRef = unknown;
type Unsubscribe = () => void;
type FirebaseSdk = {
  auth: unknown;
  db: unknown;
  ref: (db: unknown, path: string) => FirebaseRef;
  get: (reference: FirebaseRef) => Promise<{ exists: () => boolean; val: () => unknown }>;
  onValue: (reference: FirebaseRef, callback: (snapshot: { val: () => unknown }) => void) => Unsubscribe;
  onDisconnect: (reference: FirebaseRef) => { remove: () => Promise<void> };
  runTransaction: (
    reference: FirebaseRef,
    update: (current: RiggedRoom | null) => RiggedRoom | undefined,
  ) => Promise<{ committed: boolean; snapshot: { val: () => unknown } }>;
  signInAnonymously: (auth: unknown) => Promise<{ user: { uid: string } }>;
};

const FIREBASE_CONFIG = {
  apiKey: "AIzaSyDRniZatGeylxphjHQadYjucOcirNBRIdk",
  authDomain: "multiplayer-640ec.firebaseapp.com",
  databaseURL: "https://multiplayer-640ec-default-rtdb.firebaseio.com",
  projectId: "multiplayer-640ec",
  storageBucket: "multiplayer-640ec.firebasestorage.app",
  messagingSenderId: "94914236381",
  appId: "1:94914236381:web:55ab00cc690140180cf034",
};

const ROOM_ROOT = "riggedRooms";
const ROOM_ALPHABET = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
const FIREBASE_APP_URL = "https://www.gstatic.com/firebasejs/12.7.0/firebase-app.js";
const FIREBASE_AUTH_URL = "https://www.gstatic.com/firebasejs/12.7.0/firebase-auth.js";
const FIREBASE_DATABASE_URL = "https://www.gstatic.com/firebasejs/12.7.0/firebase-database.js";

export function cleanPlayerName(value: string): string {
  return value.replace(/\s+/g, " ").trim().slice(0, 18) || "Road warrior";
}

export function cleanRoomCode(value: string): string {
  return value.toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 5);
}

export function makeRoomCode(random = Math.random): string {
  return Array.from({ length: 5 }, () => ROOM_ALPHABET[Math.floor(random() * ROOM_ALPHABET.length)]).join("");
}

export function roomPlayers(room: RiggedRoom | null): RiggedRoomPlayer[] {
  if (!room) return [];
  return Object.entries(room.players ?? {})
    .map(([id, player]) => ({ id, ...player }))
    .sort((left, right) => left.joinedAt - right.joinedAt);
}

export function resolveRoomPick(room: RiggedRoom, playerId: string, input: RiggedPickInput, now = Date.now()): RiggedRoom | undefined {
  const isDraft = room.phase === "starter_draft" || room.phase === "upgrade_draft";
  if (!isDraft || room.activePickerId !== playerId || !room.draftOptions.includes(input.optionId)) return undefined;
  const order = normalizedOrder(room);
  const nextTurn = room.draftTurn + 1;
  const finished = nextTurn >= order.length,starterFinished=finished&&room.phase==="starter_draft";
  return {
    ...room,
    phase: starterFinished ? "vehicle_select" : finished ? "playing" : room.phase,
    round: finished && room.phase === "upgrade_draft" ? room.round + 1 : room.round,
    activePickerId: starterFinished ? order[0] : finished ? "" : order[nextTurn],
    draftOptions: starterFinished ? input.nextOptions : finished ? [] : input.nextOptions,
    draftTurn: starterFinished ? 0 : nextTurn,
    pickSequence: (room.pickSequence ?? 0) + 1,
    lastPick: {
      id: (room.pickSequence ?? 0) + 1,
      playerId,
      optionId: input.optionId,
      optionName: input.optionName,
      pickedAt: now,
    },
    roundReady: finished ? {} : room.roundReady,
    runState: input.nextRunState,
    updatedAt: now,
  };
}

export function resolveVehiclePick(room: RiggedRoom, playerId: string, optionId: string, optionName: string, now = Date.now()): RiggedRoom | undefined {
  if(room.phase!=="vehicle_select"||room.activePickerId!==playerId||!room.draftOptions.includes(optionId))return undefined;
  const order=normalizedOrder(room),nextTurn=room.draftTurn+1,finished=nextTurn>=order.length;
  return {
    ...room,
    phase:finished?"playing":"vehicle_select",
    activePickerId:finished?"":order[nextTurn],
    draftTurn:nextTurn,
    draftOptions:finished?[]:room.draftOptions,
    pickSequence:(room.pickSequence??0)+1,
    lastPick:{id:(room.pickSequence??0)+1,playerId,optionId,optionName,pickedAt:now},
    vehicleSelections:{...(room.vehicleSelections??{}),[playerId]:optionId},
    updatedAt:now,
  };
}

export function resolveRoundReady(room: RiggedRoom, playerId: string, options: string[], state: ScraproadRunState, now = Date.now()): RiggedRoom | undefined {
  if (room.phase !== "playing") return undefined;
  const order = normalizedOrder(room);
  const roundReady = { ...(room.roundReady ?? {}), [playerId]: true };
  const everyoneReady = order.length === 2 && order.every(id => roundReady[id]);
  return {
    ...room,
    phase: everyoneReady ? "upgrade_draft" : room.phase,
    activePickerId: everyoneReady ? order[0] : room.activePickerId,
    draftOptions: everyoneReady ? options : room.draftOptions,
    draftTurn: everyoneReady ? 0 : room.draftTurn,
    lastPick: everyoneReady ? null : room.lastPick,
    roundReady,
    runState: state,
    updatedAt: now,
  };
}

async function loadFirebase(): Promise<FirebaseSdk> {
  const [appModule, authModule, databaseModule] = await Promise.all([
    import(/* @vite-ignore */ FIREBASE_APP_URL),
    import(/* @vite-ignore */ FIREBASE_AUTH_URL),
    import(/* @vite-ignore */ FIREBASE_DATABASE_URL),
  ]);
  const app = appModule.initializeApp(FIREBASE_CONFIG);
  return {
    auth: authModule.getAuth(app),
    db: databaseModule.getDatabase(app),
    ref: databaseModule.ref,
    get: databaseModule.get,
    onValue: databaseModule.onValue,
    onDisconnect: databaseModule.onDisconnect,
    runTransaction: databaseModule.runTransaction,
    signInAnonymously: authModule.signInAnonymously,
  } as FirebaseSdk;
}

export class RiggedMultiplayerClient {
  readonly playerId: string;
  room: RiggedRoom | null = null;
  private readonly sdk: FirebaseSdk;
  private unsubscribe: Unsubscribe | null = null;
  private roomListener: (room: RiggedRoom | null) => void = () => undefined;

  private constructor(sdk: FirebaseSdk, playerId: string) {
    this.sdk = sdk;
    this.playerId = playerId;
  }

  static async connect(): Promise<RiggedMultiplayerClient> {
    const sdk = await loadFirebase();
    const credential = await sdk.signInAnonymously(sdk.auth);
    return new RiggedMultiplayerClient(sdk, credential.user.uid);
  }

  onRoom(listener: (room: RiggedRoom | null) => void): void {
    this.roomListener = listener;
    listener(this.room);
  }

  isHost(): boolean {
    return this.room?.hostId === this.playerId;
  }

  isMyTurn(): boolean {
    return this.room?.activePickerId === this.playerId;
  }

  async createRoom(name: string): Promise<string> {
    for (let attempt = 0; attempt < 8; attempt += 1) {
      const code = makeRoomCode();
      const now = Date.now();
      const room: RiggedRoom = {
        code,
        hostId: this.playerId,
        phase: "lobby",
        round: 1,
        players: { [this.playerId]: { name: cleanPlayerName(name), joinedAt: now } },
        playerOrder: [this.playerId],
        activePickerId: "",
        draftOptions: [],
        draftTurn: 0,
        pickSequence: 0,
        lastPick: null,
        vehicleSelections: {},
        roundReady: {},
        runState: null,
        createdAt: now,
        updatedAt: now,
      };
      const result = await this.sdk.runTransaction(this.roomRef(code), current => current ? undefined : room);
      if (result.committed) {
        await this.watchRoom(code);
        return code;
      }
    }
    throw new Error("Could not reserve a room code. Try again.");
  }

  async joinRoom(rawCode: string, name: string): Promise<string> {
    const code = cleanRoomCode(rawCode);
    if (code.length !== 5) throw new Error("Enter the five-character room code.");
    const now = Date.now();
    const result = await this.sdk.runTransaction(this.roomRef(code), current => {
      if (!current || current.phase !== "lobby") return undefined;
      const existingPlayers = Object.keys(current.players ?? {});
      if (!current.players?.[this.playerId] && existingPlayers.length >= 2) return undefined;
      const players = { ...(current.players ?? {}), [this.playerId]: { name: cleanPlayerName(name), joinedAt: current.players?.[this.playerId]?.joinedAt ?? now } };
      const playerOrder = [...(current.playerOrder ?? []).filter(id => players[id])];
      if (!playerOrder.includes(this.playerId)) playerOrder.push(this.playerId);
      return { ...current, players, playerOrder, updatedAt: now };
    });
    if (!result.committed) {
      const snapshot = await this.sdk.get(this.roomRef(code));
      if (!snapshot.exists()) throw new Error("That room does not exist.");
      throw new Error("That room is already running or full.");
    }
    await this.watchRoom(code);
    return code;
  }

  async startRun(): Promise<void> {
    const result = await this.transact(current => {
      const order = normalizedOrder(current);
      if (current.hostId !== this.playerId || current.phase !== "lobby" || order.length !== 2) return undefined;
      return {
        ...current,
        phase: "starter_draft",
        playerOrder: order,
        activePickerId: order[0],
        draftOptions: ["mg", "rocket", "sniper"],
        draftTurn: 0,
        pickSequence: 0,
        lastPick: null,
        vehicleSelections: {},
        runState: null,
        updatedAt: Date.now(),
      };
    });
    if (!result) throw new Error("The host can launch once two players are in the room.");
  }

  async submitPick(input: RiggedPickInput): Promise<void> {
    const result = await this.transact(current => resolveRoomPick(current, this.playerId, input));
    if (!result) throw new Error("That pick is no longer available.");
  }

  async submitVehiclePick(optionId:string,optionName:string):Promise<void>{
    const result=await this.transact(current=>resolveVehiclePick(current,this.playerId,optionId,optionName));
    if(!result)throw new Error("That vehicle pick is no longer available.");
  }

  async markRoundComplete(options: string[], state: ScraproadRunState): Promise<void> {
    const result = await this.transact(current => resolveRoundReady(current, this.playerId, options, state));
    if (!result) throw new Error("The room is not accepting round results.");
  }

  private roomRef(code = this.room?.code ?? ""): FirebaseRef {
    return this.sdk.ref(this.sdk.db, `${ROOM_ROOT}/${code}`);
  }

  private async transact(update: (current: RiggedRoom) => RiggedRoom | undefined): Promise<boolean> {
    if (!this.room?.code) return false;
    const result = await this.sdk.runTransaction(this.roomRef(), current => current ? update(current) : undefined);
    return result.committed;
  }

  private async watchRoom(code: string): Promise<void> {
    this.unsubscribe?.();
    const playerReference = this.sdk.ref(this.sdk.db, `${ROOM_ROOT}/${code}/players/${this.playerId}`);
    await this.sdk.onDisconnect(playerReference).remove();
    this.unsubscribe = this.sdk.onValue(this.roomRef(code), snapshot => {
      this.room = (snapshot.val() as RiggedRoom | null) ?? null;
      this.roomListener(this.room);
    });
  }
}

function normalizedOrder(room: RiggedRoom): string[] {
  const ids = new Set(Object.keys(room.players ?? {}));
  const order = [...(room.playerOrder ?? []).filter(id => ids.has(id))];
  for (const player of roomPlayers(room)) if (!order.includes(player.id)) order.push(player.id);
  return order.slice(0, 2);
}
