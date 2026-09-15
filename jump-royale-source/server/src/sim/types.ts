export type PlatformType = "stone" | "wood" | "anvil" | "ice" | "cracked" | "moving";
export type Skill = "bad" | "average" | "good" | "cracked";
export type RoundPhase = "waiting" | "countdown" | "playing" | "surge" | "victory" | "finished";

export interface Platform {
  region?: number; structure?: string; route?: boolean; secret?: boolean;
  mountain?: boolean;
  crumbleSeconds?: number;
  slippery?: boolean;
  terrain?: "ground" | "left" | "right" | "island" | "log" | "ruin";
  solid?: boolean;
  id: string;
  x: number;
  y: number;
  w: number;
  h: number;
  type: PlatformType;
  baseY?: number; orbitY?: number; deltaY?: number;
  baseX?: number;
  moveRange?: number;
  movePeriodMs?: number;
  movePhase?: number;
  deltaX?: number;
}

export interface InputMessage {
  up?: boolean; down?: boolean; toggleFlight?: boolean;
  left: boolean;
  right: boolean;
  jumpHeld: boolean;
  jumpPressed?: boolean;
  jumpReleased?: boolean;
  seq: number;
}

export interface PlayerState {
  ghost?: boolean; departed?: boolean;
  crumblingPlatforms?: Record<string, number>;
  id: string;
  name: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  alive: boolean;
  grounded: boolean;
  charging: boolean;
  charge01: number;
  chargeDirection: -1 | 0 | 1;
  groundedPlatformId?: string;
  facing: -1 | 0 | 1;
  isBot: boolean;
  colorIndex: number;
  maxHeight: number;
  heightReachedMs?: number;
  eliminatedAt?: number;
  skill?: Skill;
  input: InputMessage;
  bot?: BotBrain;
}

export interface BotBrain {
  supportId?: string;
  alignedUntil?: number;
  rng?: number;
  plannedTicks?: number;
  plannedDirection?: -1 | 0 | 1;
  targetId?: string;
  launchX?: number;
  holdUntil: number;
  cooldownUntil: number;
  pattern: number;
  jumpCount: number;
  initialized: boolean;
}

export interface PublicPlayerState extends Omit<PlayerState, "input" | "bot" | "chargeDirection" | "groundedPlatformId"> {}

export interface Placement {
  timeMs: number;
  id: string;
  name: string;
  place: number;
  maxHeight: number;
  isBot: boolean;
}

// Future Blacksmith.io data hooks. Intentionally data-only in this prototype.
export interface ScrapNode { id: string; x: number; y: number; value: number }
export interface AnvilStation { id: string; x: number; y: number; recipes: string[] }
export interface CraftRecipe { id: string; scrapCost: number; gearId: string }
export interface TemporaryGear { id: string; durationMs: number }
