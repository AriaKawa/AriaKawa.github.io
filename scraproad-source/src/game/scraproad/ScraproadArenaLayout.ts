import type { RacekartAssetKey } from "../../assets/scraproadRacekartManifest";

export type ScraproadLevelId = "dustbowl" | "stuntworks";
export type PickupKind = "tires" | "engine" | "armor" | "weapon" | "repair";

export type AssetPlacement = {
  asset: RacekartAssetKey;
  x: number;
  z: number;
  y?: number;
  rotation?: number;
  scale?: number;
  label?: string;
};

export type DriveSurfaceSpec = AssetPlacement & {
  width: number;
  length: number;
  startHeight: number;
  endHeight: number;
  kind: "ramp" | "bridge";
  assetYaw?: number;
};

export type BarrierSpec = { x: number; z: number; rotation: number; length: number; boundary?: boolean };
export type TargetSpec = { x: number; z: number; rotation: number };
export type PickupSpec = { x: number; z: number; kind: PickupKind };

export type ScraproadArenaLayout = {
  id: ScraproadLevelId;
  name: string;
  callsign: string;
  description: string;
  difficulty: string;
  radius: number;
  spawn: { x: number; z: number; heading: number };
  opponentSpawn: { x: number; z: number; heading: number };
  objective: string;
  surfaces: DriveSurfaceSpec[];
  track: AssetPlacement[];
  terrain: AssetPlacement[];
  props: AssetPlacement[];
  barriers: BarrierSpec[];
  targets: TargetSpec[];
  pickups: PickupSpec[];
};

const quarter = Math.PI / 2;
const half = Math.PI;

export const scraproadArenaLayouts: Record<ScraproadLevelId, ScraproadArenaLayout> = {
  dustbowl: {
    id: "dustbowl",
    name: "Dustbowl Tour",
    callsign: "LEVEL 01 // SAFE PICK",
    description: "A readable open loop with gentle jumps, a low bridge, and generous landing lanes.",
    difficulty: "CONTROLLED",
    radius: 126,
    spawn: { x: 0, z: -42, heading: 0 },
    opponentSpawn: { x: 0, z: 48, heading: half },
    objective: "Run the loop. Clear the targets. Learn the rig.",
    surfaces: [
      { asset: "stuntRamp", kind: "ramp", x: -55, z: -24, rotation: 0, width: 11, length: 21, startHeight: 0, endHeight: 5.5, scale: 10.5, assetYaw: -quarter, label: "west learner jump" },
      { asset: "stuntRamp", kind: "ramp", x: -31, z: 36, rotation: quarter, width: 11, length: 21, startHeight: 0, endHeight: 5.5, scale: 10.5, assetYaw: -quarter, label: "north learner jump" },
      { asset: "bridgeIncline", kind: "bridge", x: 62, z: -28, rotation: 0, width: 13, length: 24, startHeight: 0, endHeight: 7, scale: 10, assetYaw: -quarter, label: "bridge south incline" },
      { asset: "bridgeFlat", kind: "bridge", x: 62, z: -7, rotation: 0, width: 13, length: 19, startHeight: 7, endHeight: 7, scale: 11, assetYaw: -quarter, label: "bridge deck one" },
      { asset: "bridgeFlat", kind: "bridge", x: 62, z: 11, rotation: 0, width: 13, length: 19, startHeight: 7, endHeight: 7, scale: 11, assetYaw: -quarter, label: "bridge deck two" },
      { asset: "bridgeIncline", kind: "bridge", x: 62, z: 32, rotation: 0, width: 13, length: 24, startHeight: 7, endHeight: 0, scale: 10, assetYaw: quarter, label: "bridge north incline" },
    ],
    track: [
      { asset: "trackStraightStriped", x: 0, z: -78, scale: 12 },
      { asset: "trackStraight", x: 0, z: 78, scale: 12 },
      { asset: "trackStraight", x: 78, z: 0, rotation: quarter, scale: 12 },
      { asset: "trackStraightStriped", x: -78, z: 0, rotation: quarter, scale: 12 },
      { asset: "trackCurve", x: 70, z: 67, rotation: 0, scale: 11 },
      { asset: "trackCurveStriped", x: -70, z: 67, rotation: -quarter, scale: 11 },
      { asset: "trackCurve", x: -70, z: -67, rotation: half, scale: 11 },
      { asset: "trackCurveStriped", x: 70, z: -67, rotation: quarter, scale: 11 },
      { asset: "trackBank", x: 2, z: 75, rotation: quarter, scale: 10 },
    ],
    terrain: [
      { asset: "terrainHillSide", x: -102, z: 57, rotation: quarter, scale: 13 },
      { asset: "terrainHillCorner", x: 98, z: 74, rotation: half, scale: 12 },
      { asset: "terrainHillSide", x: 91, z: -74, rotation: -quarter, scale: 14 },
    ],
    props: [
      { asset: "trackArch", x: 0, z: -26, rotation: quarter, scale: 8.2, label: "player spawn arch" },
      { asset: "trackArch", x: 0, z: 42, rotation: quarter, scale: 8.2, label: "opponent spawn arch" },
      { asset: "rockWide", x: -18, z: 8, scale: 5.5, label: "center rock" },
      { asset: "rockTall", x: 23, z: -3, scale: 4.5, label: "center rock" },
      { asset: "hayBale", x: -42, z: 68, scale: 4 },
      { asset: "hayBale", x: -36, z: 68, scale: 4 },
    ],
    barriers: [
      { x: -29, z: 12, rotation: .15, length: 14 },
      { x: 31, z: 15, rotation: -.2, length: 14 },
      { x: -5, z: 29, rotation: quarter, length: 12 },
    ],
    targets: [
      { x: -18, z: 54, rotation: .2 }, { x: 0, z: 64, rotation: 0 }, { x: 19, z: 55, rotation: -.2 },
      { x: 83, z: 24, rotation: -quarter }, { x: 50, z: -54, rotation: half },
      { x: -48, z: -54, rotation: half }, { x: -84, z: 25, rotation: quarter }, { x: 20, z: 15, rotation: -.6 },
    ],
    pickups: [
      { x: -72, z: -40, kind: "tires" }, { x: 67, z: 50, kind: "engine" },
      { x: 0, z: 81, kind: "weapon" }, { x: 82, z: -48, kind: "armor" },
      { x: -20, z: -79, kind: "repair" }, { x: -83, z: 49, kind: "repair" },
    ],
  },
  stuntworks: {
    id: "stuntworks",
    name: "Scraproad Stuntworks",
    callsign: "LEVEL 02 // HILLY PROVING GROUND",
    description: "A wide stunt-combat playground: jump line west, elevated route east, banked north run, and a live-fire lane.",
    difficulty: "UNTAMED",
    radius: 148,
    spawn: { x: 0, z: -58, heading: 0 },
    opponentSpawn: { x: 0, z: 60, heading: half },
    objective: "Hit ramps. Cross the bridge. Destroy every target.",
    surfaces: [
      { asset: "stuntRamp", kind: "ramp", x: -84, z: -44, rotation: 0, width: 11, length: 21, startHeight: 0, endHeight: 5.8, scale: 10.8, assetYaw: -quarter, label: "west beginner jump" },
      { asset: "stuntRamp", kind: "ramp", x: -58, z: -36, rotation: 0, width: 13, length: 27, startHeight: 0, endHeight: 10.5, scale: 13, assetYaw: -quarter, label: "west mega jump" },
      { asset: "stuntRamp", kind: "ramp", x: -57, z: 22, rotation: half, width: 11, length: 22, startHeight: 0, endHeight: 7, scale: 11, assetYaw: -quarter, label: "return jump" },
      { asset: "bridgeIncline", kind: "bridge", x: 68, z: -38, rotation: 0, width: 14, length: 29, startHeight: 0, endHeight: 10, scale: 12, assetYaw: -quarter, label: "east bridge climb" },
      { asset: "bridgeFlat", kind: "bridge", x: 68, z: -13, rotation: 0, width: 14, length: 22, startHeight: 10, endHeight: 10, scale: 13, assetYaw: -quarter, label: "east bridge deck one" },
      { asset: "bridgeFlat", kind: "bridge", x: 68, z: 8, rotation: 0, width: 14, length: 22, startHeight: 10, endHeight: 10, scale: 13, assetYaw: -quarter, label: "east bridge deck two" },
      { asset: "bridgeIncline", kind: "bridge", x: 68, z: 34, rotation: 0, width: 14, length: 29, startHeight: 10, endHeight: 0, scale: 12, assetYaw: quarter, label: "east bridge descent" },
      { asset: "stuntRamp", kind: "ramp", x: 99, z: 9, rotation: -quarter, width: 10, length: 20, startHeight: 0, endHeight: 7.5, scale: 10, assetYaw: -quarter, label: "risky shortcut" },
    ],
    track: [
      { asset: "trackStraightStriped", x: -75, z: 78, rotation: quarter, scale: 12 },
      { asset: "trackBankStriped", x: -22, z: 88, rotation: quarter, scale: 12 },
      { asset: "trackBank", x: 25, z: 88, rotation: quarter, scale: 12 },
      { asset: "trackCurveStriped", x: 78, z: 78, rotation: 0, scale: 12 },
      { asset: "trackStraight", x: 103, z: 28, scale: 12 },
      { asset: "trackCurve", x: 94, z: -74, rotation: quarter, scale: 12 },
      { asset: "trackStraightStriped", x: 35, z: -99, rotation: quarter, scale: 12 },
      { asset: "trackStraight", x: -22, z: -99, rotation: quarter, scale: 12 },
      { asset: "trackCurveStriped", x: -95, z: -76, rotation: half, scale: 12 },
      { asset: "trackStraight", x: -112, z: -8, scale: 12 },
    ],
    terrain: [
      { asset: "terrainHillCorner", x: -121, z: 96, rotation: -quarter, scale: 10.5 },
      { asset: "terrainHillSide", x: -121, z: 38, rotation: quarter, scale: 10.5 },
      { asset: "terrainHillCorner", x: 118, z: 98, rotation: half, scale: 10.5 },
      { asset: "terrainHillSide", x: 124, z: -69, rotation: -quarter, scale: 10.5 },
    ],
    props: [
      { asset: "trackArch", x: 0, z: -42, rotation: quarter, scale: 9, label: "player spawn arch" },
      { asset: "trackArch", x: 0, z: 46, rotation: quarter, scale: 9, label: "opponent spawn arch" },
      { asset: "rockWide", x: -20, z: 4, scale: 6.5, label: "combat bowl rock" },
      { asset: "rockTall", x: 24, z: 18, scale: 5.4, label: "combat bowl rock" },
      { asset: "rockWide", x: 10, z: -1, scale: 4.5, label: "combat bowl rock" },
      { asset: "hayBale", x: 30, z: 48, rotation: .3, scale: 4.5 },
      { asset: "hayBale", x: 36, z: 48, rotation: -.2, scale: 4.5 },
      { asset: "hayBale", x: 42, z: 48, rotation: .15, scale: 4.5 },
    ],
    barriers: [
      { x: -8, z: 35, rotation: .15, length: 16 }, { x: 19, z: 39, rotation: -.2, length: 16 },
      { x: -33, z: -4, rotation: quarter, length: 13 }, { x: 37, z: -10, rotation: quarter, length: 13 },
      { x: -1, z: 20, rotation: 0, length: 11 },
    ],
    targets: [
      { x: -36, z: -82, rotation: 0 }, { x: -18, z: -82, rotation: 0 }, { x: 0, z: -82, rotation: 0 },
      { x: 18, z: -82, rotation: 0 }, { x: 36, z: -82, rotation: 0 },
      { x: -58, z: 52, rotation: half }, { x: -83, z: 9, rotation: quarter },
      { x: 68, z: 9, rotation: -quarter }, { x: 102, z: 55, rotation: -quarter }, { x: 22, z: 66, rotation: half },
    ],
    pickups: [
      { x: -104, z: -55, kind: "tires" }, { x: 95, z: 69, kind: "engine" },
      { x: -36, z: 89, kind: "weapon" }, { x: 106, z: -49, kind: "armor" },
      { x: -56, z: 35, kind: "repair" }, { x: 68, z: -5, kind: "repair" },
    ],
  },
};

export const defaultScraproadLevel: ScraproadLevelId = "dustbowl";
