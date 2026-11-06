import type { Progression, ResearchPath } from "./progression.js";
export type Vec2 = { x: number; y: number };
export type TerritoryStateName = "safe" | "contested" | "infested" | "overrun" | "reclaiming";
export type WarSectorState = "secure" | "contested" | "infested" | "overrun" | "reclaiming";
export type OperationStatus = "staging" | "active" | "survived" | "failed" | "evacuated";
export type RoadClass = "highway" | "secondary" | "dirt";
export type TownKind = "town" | "city" | "checkpoint" | "gas_station" | "radio_tower" | "bridge";
export type InfestationKind = "hive" | "hospital" | "mall" | "tunnel" | "graveyard" | "factory";
export type ZombieType = "walker" | "shambler" | "crawler" | "runner" | "stalker" | "bloater" | "armored" | "skitter" | "ravager" | "brute" | "zombieKing";
export type TowerType = "rifle" | "cannon" | "flame" | "shock" | "floodlight" | "squadBeacon";
export type UtilityStructureType = "squad_beacon";
export type SquadSlotStatus = "empty" | "ai_joined" | "player_joined" | "locked";
export type SquadRole = "builder" | "repair" | "gunner" | "scavenger" | "signal";
export type BaseSquadSlot = { id: string; baseId: string; status: SquadSlotStatus; commanderId?: string; commanderName?: string; isAI: boolean; role?: SquadRole; joinedAt?: number };
export type SquadCommander = { id: string; name: string; isAI: boolean; role: SquadRole; baseId: string; contribution: number; status: "joining" | "active" | "downed" | "left"; joinedAt: number };

export type Territory = {
  id: string; name: string; x: number; y: number; w: number; h: number;
  polygon?: Vec2[]; labelPoint?: Vec2;
  state: TerritoryStateName; threatLevel: number; infestation: number;
  pressure: number; neighbors: string[];
};
export type RoadNodeDefinition = { id: string; x: number; y: number; kind: "hub" | "junction" | "landmark" | "infestation" };
export type RoadSegment = { id: string; territoryId: string; points: Vec2[]; nodeIds?: string[]; width: number; kind?: RoadClass; label?: string; showLabel?: boolean; lotEligible?: boolean };
export type TownDefinition = { id: string; name: string; x: number; y: number; territoryId: string; kind: TownKind };
export type InfestationPointDefinition = { id: string; name: string; x: number; y: number; territoryId: string; nodeId: string; kind: InfestationKind };
export type BuildPad = { id: string; x: number; y: number; radius: number; kind: "tower"; occupiedBy?: string };
export type RoadsideLot = {
  id: string; territoryId: string; roadSegmentId: string; x: number; y: number; w: number; h: number;
  side: "left" | "right"; status: "empty" | "reserved" | "occupied" | "blocked" | "overrun";
  ownerPlayerId?: string; nearbyRoadPoint: Vec2; entrancePoint: Vec2; drivewayPoints?: Vec2[]; pads: BuildPad[];
};
export type PlayerState = Progression & {
  id: string; name: string; scrap: number; fuel: number; signal: number; baseId?: string;
  protectedUntil: number; redeployCooldownUntil: number;
};
export type BaseState = { worldX?: number; worldY?: number;
  id: string; ownerPlayerId: string; ownerName: string; isAI: boolean; territoryId: string; lotId: string;
  coreX: number; coreY: number; anchorX?: number; anchorY?: number; entryX?: number; entryY?: number; insertedAt?: number; lastMovedAt?: number; driveSpeed?: number; hp: number; maxHp: number; shieldEndsAt: number;
  status: "setup" | "active" | "underAttack" | "packed" | "destroyed"; heading?: number; kind: "command" | "reclaim"; joinable?: boolean; squadBeaconLevel?: number; squadSlots?: BaseSquadSlot[];
};
export type TowerState = { pathTiers?: Partial<Record<ResearchPath, number>>;
  id: string; ownerPlayerId: string; baseId: string; padId: string; type: TowerType; x: number; y: number;
  level: number; range: number; damage: number; fireRate: number; lastFiredAt: number; shotX?: number; shotY?: number; packed?: boolean;
};
export type ZombieState = {
  id: string; contractId: string; territoryId: string; type: ZombieType; x: number; y: number;
  hp: number; maxHp: number; speed: number; routeIndex: number; alive: boolean; reachedCore: boolean; routePoints: Vec2[];
  burningUntil?: number; burnDamagePerSecond?: number; burnOwnerPlayerId?: string;
};
export type DefenseContract = { deployedAt?: number;
  id: string; ownerPlayerId: string; baseId: string; territoryId: string; spawnPointId: string;
  routePoints: Vec2[]; nextWaveAt: number; nextSpawnAt: number; waveIndex: number; difficulty: number;
  status: "setup" | "active" | "paused" | "failed"; queue: ZombieType[];
};
export type WorldStatic = { worldWidth: number; worldHeight: number; territories: Territory[]; roads: RoadSegment[]; outline?: Vec2[]; roadNodes?: RoadNodeDefinition[]; towns?: TownDefinition[]; infestations?: InfestationPointDefinition[] };
export type WarSector = { id: string; name: string; regionId?: string; centerLat?: number; centerLon?: number; centerX?: number; centerY?: number; state: WarSectorState; threatLevel: number; pressure: number; infestation: number; supply: number; activeOperationIds: string[]; aiOperationCount: number; playerOperationCount: number; recommended: boolean; isFrontline: boolean; lastEventText?: string };
export type WarOperation = { id: string; sectorId: string; ownerPlayerId: string; ownerName: string; isAI: boolean; kind: "defense" | "reclaim"; status: OperationStatus; startedAt: number; updatedAt: number; lotId?: string; baseId?: string; contribution: number; wavesSurvived: number; pressureReduced: number; casualties: number; visibleMarkerX?: number; visibleMarkerY?: number; visibleLat?: number; visibleLon?: number; sharedBaseSlots: number; squadFilledSlots?: number; joinable: boolean; squadBeaconBuilt: boolean };
export type Snapshot = {
  serverTime: number; localPlayerId?: string; players: PlayerState[]; territories: Territory[]; lots: RoadsideLot[];
  bases: BaseState[]; towers: TowerState[]; zombies: Omit<ZombieState, "routePoints">[]; contracts: DefenseContract[]; warSectors: WarSector[]; warOperations: WarOperation[]; squadCommanders: SquadCommander[]; activityFeed: string[]; radio: string;
};
