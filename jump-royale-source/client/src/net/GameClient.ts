import type { MapId } from "../../../server/src/sim/maps";
import type { InputMessage, LevelMessage, Snapshot } from "../game/types";
import { HostedGameClient } from "./HostedGameClient";

declare const Colyseus: {
  Client: new (endpoint: string) => { joinOrCreate: (roomName: string, options: Record<string, unknown>) => Promise<any> };
};

type Listener<T> = (payload: T) => void;

export class GameClient {
  private room?: any;
  private hosted?: HostedGameClient;
  private listeners = new Map<string, Set<Listener<unknown>>>();
  public localId = "";

  async connect(name: string, mapId: MapId = "forge"): Promise<void> {
    const hostedMode = !import.meta.env.VITE_SERVER_URL && (import.meta.env.VITE_HOSTED_MODE === "true" || location.hostname.toLowerCase() === "ariakawa.github.io");
    if (hostedMode || (mapId!=="forge" && mapId!=="mountain")) {
      this.hosted = new HostedGameClient(mapId);
      this.hosted.on<LevelMessage>("level", (message) => this.emit("level", message));
      this.hosted.on<Snapshot>("snapshot", (message) => this.emit("snapshot", message));
      this.hosted.on<{ id: string; name: string }>("eliminated", (message) => this.emit("eliminated", message));
      await this.hosted.connect(name);
      this.localId = this.hosted.localId;
      return;
    }
    const protocol = location.protocol === "https:" ? "wss" : "ws";
    const host = import.meta.env.VITE_SERVER_HOST || location.hostname || "localhost";
    const endpoint = import.meta.env.VITE_SERVER_URL || `${protocol}://${host}:2567`;
    const client = new Colyseus.Client(endpoint);
    this.room = await client.joinOrCreate("climb", { name, mapId });
    this.localId = this.room.sessionId;
    this.room.onMessage("welcome", (message: { id: string }) => { this.localId = message.id; });
    this.room.onMessage("level", (message: LevelMessage) => {this.emit("level", message);this.room?.send("ready");});
    this.room.onMessage("snapshot", (message: Snapshot) => this.emit("snapshot", message));
    this.room.onMessage("eliminated", (message: { id: string; name: string }) => this.emit("eliminated", message));
    this.room.onLeave(() => this.emit("leave", undefined));
    this.room.send("requestLevel");
  }

  on<T>(event: string, listener: Listener<T>): () => void {
    if (!this.listeners.has(event)) this.listeners.set(event, new Set());
    this.listeners.get(event)!.add(listener as Listener<unknown>);
    return () => this.listeners.get(event)?.delete(listener as Listener<unknown>);
  }

  spectate():void {this.hosted?.spectate();this.room?.send("spectate");}
  get supportsGodPowers(): boolean { return !!this.hosted; }
  get isFlying(): boolean { return this.hosted?.isFlying ?? false; }
  setGodPowers(enabled: boolean): void { this.hosted?.setGodPowers(enabled); }
  sendInput(input: InputMessage): void { this.hosted?.sendInput(input); this.room?.send("input", input); }
  requestRestart(): void { this.hosted?.requestRestart(); this.room?.send("restart"); }
  async disconnect(): Promise<void> {
    const room = this.room;
    this.room = undefined;
    const hosted = this.hosted;
    this.hosted = undefined;
    this.listeners.clear();
    await hosted?.disconnect();
    await room?.leave();
  }

  private emit<T>(event: string, payload: T): void {
    this.listeners.get(event)?.forEach((listener) => listener(payload));
  }
}
