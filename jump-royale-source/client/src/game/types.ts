export type RoundPhase = "waiting" | "countdown" | "playing" | "surge" | "victory" | "finished";
export type PlatformType = "stone" | "wood" | "anvil" | "ice" | "cracked" | "moving";
export interface Platform {
  region?: number; structure?: string; route?: boolean; secret?: boolean;
  magical?: boolean;
  forest?: boolean;
  mountain?: boolean;
  crumbleSeconds?: number;
  slippery?: boolean;
  terrain?: "ground" | "left" | "right" | "island" | "log" | "ruin";
  solid?: boolean;
  id: string; x: number; y: number; w: number; h: number; type: PlatformType;
  baseY?: number; orbitY?: number; deltaY?: number;
  baseX?: number; moveRange?: number; movePeriodMs?: number; movePhase?: number; deltaX?: number;
}
export interface PlatformPosition { id: string; x: number; y?: number }
export interface PlayerSnapshot {
  ghost?: boolean; departed?: boolean;
  crumblingPlatforms?: Record<string, number>;
  id: string; name: string; x: number; y: number; vx: number; vy: number; alive: boolean;
  grounded: boolean; charging: boolean; charge01: number; facing: -1 | 0 | 1; isBot: boolean;
  colorIndex: number; maxHeight: number; heightReachedMs?: number; eliminatedAt?: number; skill?: string;
}
export interface Placement { timeMs: number; id: string; name: string; place: number; maxHeight: number; isBot: boolean }
export interface Snapshot {
  assisted?: boolean;
  serverTime: number; phase: RoundPhase; countdownEndsAt: number; roundStartedAt: number;
  hazardY: number; winnerId?: string; players: PlayerSnapshot[]; platforms?: PlatformPosition[]; placements?: Placement[];
}
export interface LevelMessage { platforms: Platform[]; worldWidth: number; worldHeight: number; spawnY: number }
export interface InputMessage {
  up?: boolean; down?: boolean; toggleFlight?: boolean;
  left: boolean; right: boolean; jumpHeld: boolean; jumpPressed: boolean; jumpReleased: boolean; seq: number;
}
