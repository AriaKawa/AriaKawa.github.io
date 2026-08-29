import type { RacekartAssetKey } from "../../assets/riggedRacekartManifest";

import type { OvalBowlConfig } from "./OvalBowlSurface";

export type RiggedLevelId = "dustring" | "ovalbowl";
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

export type RiggedArenaLayout = {
  id: RiggedLevelId;
  name: string;
  callsign: string;
  description: string;
  difficulty: string;
  arenaKind: "ring" | "capsule";
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
  pickups: PickupSpec[];
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
    pickups: [
      { x: -73, z: -22, kind: "tires" },
      { x: 73, z: 24, kind: "engine" },
      { x: -24, z: 73, kind: "weapon" },
      { x: 24, z: -73, kind: "armor" },
      { x: -7, z: -38, kind: "repair" },
    ],
  },
  ovalbowl: {
    id: "ovalbowl",
    name: "Capsule Circuit",
    callsign: "ARENA 02 // CAPSULE WALL-RIDE",
    description: "A flat capsule stadium with long straights, rounded ends, a layered bank, and a hard upper guard.",
    difficulty: "WALL RIDE READY",
    arenaKind: "capsule",
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
    pickups: [
      { x: -20, z: -18, kind: "tires" },
      { x: 20, z: 18, kind: "engine" },
      { x: 0, z: 30, kind: "weapon" },
      { x: 0, z: -35, kind: "repair" },
    ],
  },
};

export const defaultRiggedLevel: RiggedLevelId = "dustring";
