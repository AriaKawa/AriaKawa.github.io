import type { ResearchPath } from '../../../server/src/sim/progression';
import type { SceneryWorld } from "../game/SceneryWorld";
import type { EquipmentType, Snapshot, SquadRole, StrategicDeploymentContext, TowerType, Vec2, WorldStatic } from "../game/types";
import { LocalSimulation } from "./LocalSimulation";
import type { AiScenery, AiViewport } from './AiSimulationProtocol';

declare const Colyseus: {
  Client: new (endpoint: string) => { joinOrCreate: (roomName: string, options: Record<string, unknown>) => Promise<any> };
};

export type ChatMessage = { id: string; playerId: string; playerName: string; text: string; sentAt: number; system?: boolean };
type Events = { world: WorldStatic; snapshot: Snapshot; notice: { text: string; error?: boolean }; chat: ChatMessage; leave: undefined };
type Listener<T> = (payload: T) => void;

export class GameClient {
  private room?: any;
  private previewSequence = 0;
  private previewRequests = new Map<number, (value: ReturnType<LocalSimulation['previewDeployment']>) => void>();
  private listeners = new Map<keyof Events, Set<Listener<any>>>();
  public localId = "";
  public latestWorld?: WorldStatic;
  public latestSnapshot?: Snapshot;
  private local?: LocalSimulation;
  private commanderName = "Roadwarden";

  setPaused(paused: boolean): void { this.local?.setPaused(paused); }
  saveCharacter(): void { this.local?.saveCharacter(); }
  disconnect(): void { this.local?.dispose(); this.local = undefined; this.room?.leave(); this.room = undefined; this.latestSnapshot = undefined; this.latestWorld = undefined; }
  extractToHideout(): boolean { return this.local?.extractToHideout() ?? false; }

  async connect(name: string): Promise<void> {
    this.local?.dispose(); this.local = undefined;
    this.commanderName = name.trim().slice(0, 18) || "Roadwarden";
    if (new URLSearchParams(location.search).has("offline") || !(["localhost", "127.0.0.1"].includes(location.hostname))) {
      this.local = new LocalSimulation(name, (snapshot) => { this.latestSnapshot = snapshot; this.emit("snapshot", snapshot); }, (notice) => this.emit("notice", notice));
      try { this.local.enableAiWorker(new Worker(new URL('./AiSimulationWorker.ts', import.meta.url), { type: 'module' })); }
      catch { this.emit('notice', { text: 'Background AI unavailable; AI tests will use the main thread.', error: true }); }
      this.localId = this.local.playerId; this.latestWorld = this.local.world;
      queueMicrotask(() => this.emit("world", this.local!.world));
      return;
    }
    const protocol = location.protocol === "https:" ? "wss" : "ws";
    const host = import.meta.env.VITE_SERVER_HOST || location.hostname || "localhost";
    const endpoint = import.meta.env.VITE_SERVER_URL || `${protocol}://${host}:2567`;
    const client = new Colyseus.Client(endpoint);
    this.room = await client.joinOrCreate("continent", { name });
    this.localId = this.room.sessionId;
    this.room.onMessage("welcome", (message: { id: string; world: WorldStatic }) => { this.localId = message.id; this.latestWorld = message.world; this.emit("world", message.world); });
    this.room.onMessage("world", (message: WorldStatic) => { this.latestWorld = message; this.emit("world", message); });
    this.room.onMessage("snapshot", (message: Snapshot) => { this.latestSnapshot = message; this.emit("snapshot", message); });
    this.room.onMessage('deploymentPreview', (message: { requestId: number; preview: ReturnType<LocalSimulation['previewDeployment']> }) => { this.previewRequests.get(message.requestId)?.(message.preview); this.previewRequests.delete(message.requestId); });
    this.room.onMessage("notice", (message: { text: string; error?: boolean }) => this.emit("notice", message));
    this.room.onMessage("chat", (message: ChatMessage) => this.emit("chat", message));
    this.room.onLeave(() => this.emit("leave", undefined));
    this.room.send("requestWorld");
  }

  on<K extends keyof Events>(event: K, listener: Listener<Events[K]>): () => void {
    if (!this.listeners.has(event)) this.listeners.set(event, new Set());
    this.listeners.get(event)!.add(listener); return () => this.listeners.get(event)?.delete(listener);
  }

  setScenery(world: SceneryWorld, project: (p: Vec2) => Vec2, unproject: (p: Vec2) => Vec2, scale: number): void { this.local?.setScenery(world,project,unproject,scale); }
  addAiConvoy(): void { this.local?.addAiConvoy(); }
  setAiViewport(viewport: AiViewport): void { this.local?.setAiViewport(viewport); }
  getAiMetrics() { return this.local?.getAiMetrics(); }
  setAiScenery(data: AiScenery): void { this.local?.setAiScenery(data); }
  clearAiConvoys(): void { this.local?.clearAiConvoys(); }
  reserveLot(lotId: string): void { this.local ? this.local.reserveLot(lotId) : this.room?.send("reserveLot", { lotId }); }
  deploy(lotId: string, strategicContext?: StrategicDeploymentContext): void { this.local ? this.local.deploy(lotId, false, strategicContext) : this.room?.send("deploy", { lotId, strategicContext }); }
  reclaim(lotId: string, strategicContext?: StrategicDeploymentContext): void { this.local ? this.local.deploy(lotId, true, strategicContext) : this.room?.send("reclaim", { lotId, strategicContext }); }
  build(padId: string, towerType: TowerType): void { this.local ? this.local.build(padId, towerType) : this.room?.send("build", { padId, towerType }); }
  upgrade(towerId: string, path: ResearchPath = "power"): void { this.local ? this.local.upgrade(towerId, path) : this.room?.send("upgrade", { towerId, path }); }
  research(type: TowerType, path: ResearchPath): void { this.local ? this.local.research(type, path) : this.room?.send("research", { type, path }); }
  async previewDeployment(reroll = false): Promise<ReturnType<LocalSimulation['previewDeployment']>> { if(this.local) return this.local.previewDeployment(reroll); if(!this.room) return; const requestId=++this.previewSequence; return new Promise(resolve=>{ const timer=window.setTimeout(()=>{this.previewRequests.delete(requestId);resolve(undefined);},5000); this.previewRequests.set(requestId,preview=>{window.clearTimeout(timer);resolve(preview);}); this.room.send('previewDeployment',{requestId,reroll}); }); }
  redeploy(lotId: string, strategicContext?: StrategicDeploymentContext): void { this.local ? this.local.redeploy(lotId, strategicContext) : this.room?.send("redeploy", { lotId, strategicContext }); }
  packConvoy(): void { this.local ? this.local.packConvoy() : this.room?.send("packConvoy"); }
  deployConvoy(strategicOnLand?: boolean, previewStamp?: string): void { this.local ? this.local.deployConvoy(strategicOnLand, previewStamp) : this.room?.send("deployConvoy", { strategicOnLand, previewStamp }); }
  startDefenseNow(): void { this.local ? this.local.startDefenseNow() : this.room?.send("startDefenseNow"); }
  openLootSatchel(satchelId: string): void { this.local ? this.local.openLootSatchel(satchelId) : this.room?.send("openLootSatchel", { satchelId }); }
  useEquipment(type: EquipmentType, point?: Vec2, towerId?: string): void { this.local ? this.local.useEquipment(type, point, towerId) : this.room?.send("useEquipment", { type, point, towerId }); }
  sendChat(message: string): void {
    const text = message.replace(/\s+/g, " ").trim().slice(0, 180); if (!text) return;
    if (this.local) this.emit("chat", { id: `local-chat-${Date.now()}`, playerId: this.localId, playerName: this.commanderName, text, sentAt: Date.now() });
    else this.room?.send("chat", { text });
  }
  driveBase(steering: number, throttle: number, deltaMs: number, onVisibleHighway = false): void { this.local ? this.local.driveBase(steering, throttle, deltaMs, onVisibleHighway) : this.room?.send("driveBase", { steering, throttle, deltaMs, onVisibleHighway }); }
  buildSquadBeacon(padId: string): void { this.build(padId, "squadBeacon"); }
  callBackup(baseId: string): void { this.local ? this.local.callBackup(baseId) : this.room?.send("callBackup", { baseId }); }
  toggleBaseJoinable(baseId: string): void { this.local ? this.local.toggleBaseJoinable(baseId) : this.room?.send("toggleBaseJoinable", { baseId }); }
  // Future multiplayer transport hooks share the same base/slot model used by LocalSimulation AI helpers.
  requestJoinBase(baseId: string, preferredRole?: SquadRole): void { this.local ? this.local.requestJoinBase(baseId, preferredRole) : this.room?.send("requestJoinBase", { baseId, preferredRole }); }
  acceptJoinRequest(baseId: string, commanderId: string): void { this.local ? this.local.acceptJoinRequest(baseId, commanderId) : this.room?.send("acceptJoinRequest", { baseId, commanderId }); }
  leaveSquad(baseId: string): void { this.local ? this.local.leaveSquad(baseId) : this.room?.send("leaveSquad", { baseId }); }
  restart(): void { this.local ? this.local.restart() : this.room?.send("restart"); }

  private emit<K extends keyof Events>(event: K, payload: Events[K]): void {
    this.listeners.get(event)?.forEach((listener) => listener(payload));
  }
}
