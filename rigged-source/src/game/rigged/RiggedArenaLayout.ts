import type { RacekartAssetKey } from "../../assets/riggedRacekartManifest";

import type { OvalBowlConfig } from "./OvalBowlSurface";

export type RiggedLevelId = "dustring" | "ovalbowl" | "skyfoundry" | "redmesa";

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
  rails?: boolean;
};

export type BarrierSpec = { x: number; z: number; rotation: number; length: number; boundary?: boolean };
export type TargetSpec = { x: number; z: number; rotation: number };

export type RiggedArenaLayout = {
  id: RiggedLevelId;
  name: string;
  callsign: string;
  description: string;
  difficulty: string;
  arenaKind: "ring" | "capsule";
  terrainProfile: "flat" | "rolling";
  bowl?: OvalBowlConfig;
  radius: number;
  ringInnerRadius: number;
  ringOuterRadius: number;
  spawn: { x: number; z: number; heading: number };
  opponentSpawn: { x: number; z: number; heading: number };
  objective: string;
  surfaces: DriveSurfaceSpec[];
  track: AssetPlacement[];
  terrain: AssetPlacement[];
  props: AssetPlacement[];
  barriers: BarrierSpec[];
  targets: TargetSpec[];
};

const quarter = Math.PI / 2;
const half = Math.PI;

export const riggedArenaLayouts: Record<RiggedLevelId, RiggedArenaLayout> = {
  dustring: {
    id: "dustring",
    name: "Dust Ring",
    callsign: "LEVEL 01 // SCRAP RING",
    description: "One clean combat loop with an open center, four readable jumps, and room to hunt the rival.",
    difficulty: "COMBAT READY",
    arenaKind: "ring",
    terrainProfile: "flat",
    radius: 100,
    ringInnerRadius: 60,
    ringOuterRadius: 88,
    spawn: { x: 0, z: -74, heading: 0 },
    opponentSpawn: { x: 0, z: 74, heading: half },
    objective: "Run the circuit. Hit the ramps. Scrap the rival.",
    surfaces: [
      { asset: "stuntRamp", kind: "ramp", x: 0, z: -57, rotation: 0, width: 12, length: 22, startHeight: 0, endHeight: 4.8, scale: 11, assetYaw: quarter, label: "south inward ramp" },
      { asset: "stuntRamp", kind: "ramp", x: 0, z: 57, rotation: 0, width: 12, length: 22, startHeight: 0, endHeight: 4.8, scale: 11, assetYaw: quarter, label: "north outward ramp" },
      { asset: "stuntRamp", kind: "ramp", x: -57, z: 0, rotation: -quarter, width: 12, length: 22, startHeight: 0, endHeight: 4.8, scale: 11, assetYaw: quarter, label: "west outward ramp" },
      { asset: "stuntRamp", kind: "ramp", x: 57, z: 0, rotation: -quarter, width: 12, length: 22, startHeight: 0, endHeight: 4.8, scale: 11, assetYaw: quarter, label: "east inward ramp" },
    ],
    track: [],
    terrain: [],
    props: [
      { asset: "rockWide", x: -23, z: 19, rotation: .25, scale: 5.2, label: "center west rock" },
      { asset: "rockTall", x: -18, z: -18, rotation: -.4, scale: 4.2, label: "center south rock" },
      { asset: "hayBale", x: 18, z: -24, rotation: .15, scale: 3.8, label: "center hay one" },
      { asset: "hayBale", x: 23, z: -24, rotation: -.12, scale: 3.8, label: "center hay two" },
    ],
    barriers: [
      { x: 31, z: -21, rotation: quarter, length: 19 },
      { x: 31, z: 21, rotation: quarter, length: 19 },
      { x: -8, z: 31, rotation: 0, length: 13 },
      { x: -31, z: -4, rotation: quarter, length: 13 },
    ],
    targets: [],
  },
  ovalbowl: {
    id: "ovalbowl",
    name: "Capsule Circuit",
    callsign: "ARENA 02 // CAPSULE WALL-RIDE",
    description: "A flat capsule stadium with long straights, rounded ends, a layered bank, and a hard upper guard.",
    difficulty: "WALL RIDE READY",
    arenaKind: "capsule",
    terrainProfile: "flat",
    radius: 112,
    ringInnerRadius: 44,
    ringOuterRadius: 62,
    bowl: { straightHalfLength: 46, flatRadius: 44, outerRadius: 62, wallRise: 11.5, guardHeight: 4.5 },
    spawn: { x: 0, z: -22, heading: 0 },
    opponentSpawn: { x: 0, z: 22, heading: half },
    objective: "Own the open floor. Carry speed into the bank. Scrap the rival.",
    surfaces: [],
    track: [],
    terrain: [],
    props: [
      { asset: "stuntRailing", x: -63.2, z: -17, rotation: quarter, scale: 8, label: "west rim racing rail south" },
      { asset: "stuntRailing", x: -63.2, z: 17, rotation: quarter, scale: 8, label: "west rim racing rail north" },
      { asset: "stuntRailing", x: 63.2, z: -17, rotation: quarter, scale: 8, label: "east rim racing rail south" },
      { asset: "stuntRailing", x: 63.2, z: 17, rotation: quarter, scale: 8, label: "east rim racing rail north" },
    ],
    barriers: [],
    targets: [],
  },
  skyfoundry: {
    id: "skyfoundry",
    name: "Sky Foundry",
    callsign: "ARENA 03 // HIGH STEEL",
    description: "Four bridge inclines converge on a raised combat cross, leaving fast ground routes around the steelwork.",
    difficulty: "VERTICAL COMBAT",
    arenaKind: "ring",
    terrainProfile: "flat",
    radius: 106,
    ringInnerRadius: 50,
    ringOuterRadius: 90,
    spawn: { x: 0, z: -78, heading: 0 },
    opponentSpawn: { x: 0, z: 78, heading: half },
    objective: "Take the high deck. Break line of sight. Drop on the rival.",
    surfaces: [
      { asset: "bridgeIncline", kind: "bridge", x: 0, z: -43, rotation: 0, width: 18, length: 30, startHeight: 0, endHeight: 9, assetYaw: quarter, label: "south foundry climb" },
      { asset: "bridgeIncline", kind: "bridge", x: 0, z: 43, rotation: 0, width: 18, length: 30, startHeight: 9, endHeight: 0, assetYaw: quarter, label: "north foundry descent" },
      { asset: "bridgeIncline", kind: "bridge", x: -43, z: 0, rotation: quarter, width: 18, length: 30, startHeight: 0, endHeight: 9, assetYaw: quarter, label: "west foundry climb" },
      { asset: "bridgeIncline", kind: "bridge", x: 43, z: 0, rotation: quarter, width: 18, length: 30, startHeight: 9, endHeight: 0, assetYaw: quarter, label: "east foundry descent" },
      { asset: "bridgeFlat", kind: "bridge", x: 0, z: 0, y: 9, rotation: 0, width: 18, length: 58, startHeight: 9, endHeight: 9, assetYaw: quarter, rails: false, label: "north south high deck" },
      { asset: "bridgeFlat", kind: "bridge", x: 0, z: 0, y: 9, rotation: quarter, width: 18, length: 58, startHeight: 9, endHeight: 9, assetYaw: quarter, rails: false, label: "east west high deck" },
    ],
    track: [],
    terrain: [],
    props: [
      { asset: "trackArch", x: 0, z: -61, rotation: quarter, scale: 7.5, label: "south foundry gate" },
      { asset: "trackArch", x: 0, z: 61, rotation: quarter, scale: 7.5, label: "north foundry gate" },
      { asset: "rockWide", x: -29, z: -29, rotation: .4, scale: 4.8, label: "southwest foundation rubble" },
      { asset: "rockTall", x: 29, z: 29, rotation: -.35, scale: 4.2, label: "northeast foundation rubble" },
    ],
    barriers: [
      { x: -31, z: -31, rotation: -quarter / 2, length: 13 },
      { x: 31, z: 31, rotation: -quarter / 2, length: 13 },
      { x: -31, z: 31, rotation: quarter / 2, length: 13 },
      { x: 31, z: -31, rotation: quarter / 2, length: 13 },
    ],
    targets: [],
  },
  redmesa: {
    id: "redmesa",
    name: "Red Mesa",
    callsign: "ARENA 04 // ROLLING BADLANDS",
    description: "A broad dirt circuit rolls over crests, bowls, and off-camber hills with long sightlines across the valley.",
    difficulty: "HILL COUNTRY",
    arenaKind: "ring",
    terrainProfile: "rolling",
    radius: 108,
    ringInnerRadius: 51,
    ringOuterRadius: 92,
    spawn: { x: 0, z: -78, heading: 0 },
    opponentSpawn: { x: 0, z: 78, heading: half },
    objective: "Use the crests for cover. Hunt through the low ground. Own the ridge.",
    surfaces: [
      { asset: "stuntRamp", kind: "ramp", x: -55, z: -18, rotation: -quarter, width: 11, length: 20, startHeight: 0, endHeight: 4.2, scale: 10, assetYaw: quarter, label: "west ridge kicker" },
      { asset: "stuntRamp", kind: "ramp", x: 54, z: 24, rotation: quarter, width: 11, length: 20, startHeight: 0, endHeight: 4.2, scale: 10, assetYaw: quarter, label: "east ridge kicker" },
    ],
    track: [],
    terrain: [],
    props: [
      { asset: "rockWide", x: -34, z: 8, rotation: .2, scale: 6.2, label: "west mesa crown" },
      { asset: "rockTall", x: 32, z: 29, rotation: -.45, scale: 5.4, label: "east mesa crown" },
      { asset: "rockWide", x: 19, z: -36, rotation: .75, scale: 4.7, label: "south valley rock" },
      { asset: "hayBale", x: -13, z: -33, rotation: -.2, scale: 3.5, label: "valley hay one" },
      { asset: "hayBale", x: -8, z: -35, rotation: .12, scale: 3.5, label: "valley hay two" },
      { asset: "trackArch", x: 0, z: -65, rotation: quarter, scale: 7, label: "red mesa south gate" },
    ],
    barriers: [
      { x: -17, z: 31, rotation: -.22, length: 14 },
      { x: 17, z: -29, rotation: -.22, length: 14 },
    ],
    targets: [],
  },
};

export const defaultRiggedLevel: RiggedLevelId = "dustring";

export const riggedArenaOrder: readonly RiggedLevelId[] = ["dustring", "ovalbowl", "skyfoundry", "redmesa"];

export function nextRiggedLevel(current: RiggedLevelId): RiggedLevelId {
  const index = riggedArenaOrder.indexOf(current);
  return riggedArenaOrder[(index + 1) % riggedArenaOrder.length];
}
