import type { EquipmentType } from "./types";

export type EquipmentInfo = {
  name: string;
  shortName: string;
  description: string;
  useHint: string;
  color: string;
  asset: string;
  rarity: "FIELD" | "RARE";
};

export const EQUIPMENT_TYPES: EquipmentType[] = ["barbedWire", "overclockBooster", "proximityMine", "fieldRepairKit", "roadFlare", "airstrike"];

export const EQUIPMENT_INFO: Record<EquipmentType, EquipmentInfo> = {
 airstrike: {name:'Airstrike',shortName:'STRIKE',description:'Hideout exclusive. Strike a 220-unit radius for 600 damage.',useHint:'SELECT, THEN CLICK A TARGET',color:'#edb66d',asset:'./assets/loot/proximity-mine.png',rarity:'RARE'},
  barbedWire: {
    name: "Barbed Wire",
    shortName: "WIRE",
    description: "Place across a horde route. Slows infected by 50% and tears them for steady damage.",
    useHint: "SELECT, THEN CLICK THE TRACK",
    color: "#c68a55",
    asset: "./assets/loot/barbed-wire.png",
    rarity: "FIELD"
  },
  overclockBooster: {
    name: "Overclock Booster",
    shortName: "BOOST",
    description: "Target a tower to raise its damage and fire rate by 50% for the current wave.",
    useHint: "SELECT, THEN CLICK A TOWER",
    color: "#ff9d3f",
    asset: "./assets/loot/overclock-booster.png",
    rarity: "RARE"
  },
  proximityMine: {
    name: "Proximity Mine",
    shortName: "MINE",
    description: "Place on a horde route. Detonates against the first pack for heavy area damage.",
    useHint: "SELECT, THEN CLICK THE TRACK",
    color: "#db6652",
    asset: "./assets/loot/proximity-mine.png",
    rarity: "FIELD"
  },
  fieldRepairKit: {
    name: "Field Repair Kit",
    shortName: "REPAIR",
    description: "Immediately restores 250 integrity to the deployed command core.",
    useHint: "CLICK TO USE",
    color: "#e06a57",
    asset: "./assets/loot/field-repair-kit.png",
    rarity: "FIELD"
  },
  roadFlare: {
    name: "Road Flare",
    shortName: "FLARE",
    description: "Place on a route. Its glare slows nearby infected by 35% for 18 seconds.",
    useHint: "SELECT, THEN CLICK THE TRACK",
    color: "#ff6347",
    asset: "./assets/loot/road-flare.png",
    rarity: "FIELD"
  }
};

export const equipmentTextureKey = (type: EquipmentType): string => `equipment-${type}`;
