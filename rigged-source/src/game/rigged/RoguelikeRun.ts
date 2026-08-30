import type { RiggedCameraMode } from "./RiggedCameraController";

export type WeaponKind = "mg" | "rocket" | "sniper";
export type CardDeckId = "weapon" | "body" | "wheel" | "ability";
export type CardCategory = CardDeckId | "turret";
export type ActiveAbilityId = "none" | "bunny_hop" | "mega_boost" | "reflect" | "mega_shroom";
export type TireVisual = "stock" | "racing" | "offroad" | "drift" | "grip" | "turbo" | "heavy" | "wall" | "light";

export type TurretUpgradeStats = {
  damageMultiplier: number;
  fireRateMultiplier: number;
  projectileSpeedMultiplier: number;
  rangeMultiplier: number;
  projectileCount: number;
  spread: number;
  ricochets: number;
  pierces: number;
  burnDps: number;
  burnDuration: number;
  heavyRounds: boolean;
  splitChambers: number;
};

export type RunVehicleStats = {
  maxHealthMultiplier: number;
  accelerationMultiplier: number;
  maxSpeedMultiplier: number;
  handlingMultiplier: number;
  tractionMultiplier: number;
  boostMultiplier: number;
  armorBonus: number;
  ramMultiplier: number;
  stabilityMultiplier: number;
  sizeMultiplier: number;
  massMultiplier: number;
  driftControlMultiplier: number;
  wallGripMultiplier: number;
};

export type ScraproadRunState = {
  version: 2;
  round: number;
  ownedTurrets: WeaponKind[];
  activeTurret: WeaponKind;
  turretStats: Record<WeaponKind, TurretUpgradeStats>;
  vehicleStats: RunVehicleStats;
  activeAbility: ActiveAbilityId;
  upgrades: string[];
  pickedCards: string[];
  remainingDecks: Record<CardDeckId, string[]>;
  repairAfterRound: number;
  roundShield: number;
  swapCooldown: number;
  tireVisual: TireVisual;
  cameraMode: RiggedCameraMode;
};

export type UpgradeCard = {
  id: string;
  name: string;
  rarity: "common" | "rare" | "epic";
  category: CardCategory;
  deck: CardDeckId | null;
  copies: number;
  scope: string;
  description: string;
  stats: string[];
  quote: string;
  abilityId?: Exclude<ActiveAbilityId, "none">;
  apply: (state: ScraproadRunState) => void;
};

const baseTurretStats = (): TurretUpgradeStats => ({
  damageMultiplier: 1, fireRateMultiplier: 1, projectileSpeedMultiplier: 1, rangeMultiplier: 1,
  projectileCount: 1, spread: 0, ricochets: 0, pierces: 0, burnDps: 0, burnDuration: 0,
  heavyRounds: false, splitChambers: 0,
});

const baseVehicleStats = (): RunVehicleStats => ({
  maxHealthMultiplier: 1, accelerationMultiplier: 1, maxSpeedMultiplier: 1, handlingMultiplier: 1,
  tractionMultiplier: 1, boostMultiplier: 1, armorBonus: 0, ramMultiplier: 1, stabilityMultiplier: 1,
  sizeMultiplier: 1, massMultiplier: 1, driftControlMultiplier: 1, wallGripMultiplier: 1,
});

const allTurrets = (state: ScraproadRunState, mutate: (stats: TurretUpgradeStats) => void): void => {
  (Object.keys(state.turretStats) as WeaponKind[]).forEach(kind => mutate(state.turretStats[kind]));
};

type CardInput = Omit<UpgradeCard, "category" | "deck" | "scope" | "copies">;
const weaponCard = (card: CardInput): UpgradeCard => ({ ...card, category: "weapon", deck: "weapon", scope: "All Turrets", copies: 2 });
const bodyCard = (card: CardInput): UpgradeCard => ({ ...card, category: "body", deck: "body", scope: "Vehicle Body", copies: 2 });
const wheelCard = (card: CardInput): UpgradeCard => ({ ...card, category: "wheel", deck: "wheel", scope: "Wheels & Handling", copies: 2 });
const abilityCard = (card: CardInput & { abilityId: Exclude<ActiveAbilityId, "none"> }): UpgradeCard => ({ ...card, category: "ability", deck: "ability", scope: "Q Ability", copies: 1 });

export const weaponCards: UpgradeCard[] = [
  weaponCard({ id:"quick-trigger", name:"Quick Trigger", rarity:"common", description:"A clean trigger tune for every mounted weapon.", stats:["+20% fire rate"], quote:"A little quicker is a lot louder.", apply:s=>allTurrets(s,t=>{t.fireRateMultiplier*=1.2;}) }),
  weaponCard({ id:"sharpened-rounds", name:"Sharpened Rounds", rarity:"common", description:"Better-machined ammunition for the whole turret rack.", stats:["+15% damage"], quote:"File the edges. Find the weak spot.", apply:s=>allTurrets(s,t=>{t.damageMultiplier*=1.15;}) }),
  weaponCard({ id:"heavy-rounds", name:"Heavy Rounds", rarity:"rare", description:"All turret weapons trade cadence for crushing hits.", stats:["+80% damage", "-35% fire rate", "Heavier shot VFX"], quote:"Slow. Loud. Final.", apply:s=>allTurrets(s,t=>{t.damageMultiplier*=1.8;t.fireRateMultiplier*=.65;t.heavyRounds=true;}) }),
  weaponCard({ id:"hair-trigger", name:"Hair Trigger", rarity:"rare", description:"Your turrets fire frantically, with lighter and less disciplined shots.", stats:["+45% fire rate", "-20% damage", "+10° spread"], quote:"Accuracy can wait. The trigger cannot.", apply:s=>allTurrets(s,t=>{t.fireRateMultiplier*=1.45;t.damageMultiplier*=.8;t.spread+=Math.PI/18;}) }),
  weaponCard({ id:"multishot", name:"Multishot", rarity:"epic", description:"All mounted weapons throw an extra projectile downrange.", stats:["+1 projectile", "-25% damage", "+8° spread"], quote:"Accuracy is a problem for the other car.", apply:s=>allTurrets(s,t=>{t.projectileCount+=1;t.damageMultiplier*=.75;t.spread+=Math.PI/22.5;}) }),
  weaponCard({ id:"ricochet-rounds", name:"Ricochet Rounds", rarity:"rare", description:"Every turret shot can rebound from the arena floor.", stats:["+1 ricochet", "-15% projectile speed", "-10% damage"], quote:"Miss once. Hit later.", apply:s=>allTurrets(s,t=>{t.ricochets+=1;t.projectileSpeedMultiplier*=.85;t.damageMultiplier*=.9;}) }),
  weaponCard({ id:"incendiary-rounds", name:"Incendiary Rounds", rarity:"epic", description:"All turret shots glow orange and ignite the rival on impact.", stats:["Shots apply burn", "10 burn damage / sec", "-15% direct damage"], quote:"Make the arena smell like bad decisions.", apply:s=>allTurrets(s,t=>{t.burnDps+=10;t.burnDuration=Math.max(t.burnDuration,3);t.damageMultiplier*=.85;}) }),
  weaponCard({ id:"piercing-rounds", name:"Piercing Rounds", rarity:"rare", description:"All turret projectiles punch through one additional target.", stats:["Pierces +1 target", "-15% damage", "Bright tracer"], quote:"Armor is just scenery.", apply:s=>allTurrets(s,t=>{t.pierces+=1;t.damageMultiplier*=.85;}) }),
  weaponCard({ id:"long-barrel", name:"Long Barrel", rarity:"common", description:"Every turret gains velocity and reach at a modest cadence cost.", stats:["+25% projectile speed", "+20% range", "-10% fire rate"], quote:"Reach out and ruin somebody's afternoon.", apply:s=>allTurrets(s,t=>{t.projectileSpeedMultiplier*=1.25;t.rangeMultiplier*=1.2;t.fireRateMultiplier*=.9;}) }),
  weaponCard({ id:"split-chamber", name:"Split Chamber", rarity:"epic", description:"Every fourth trigger pull adds a side-projectile pair to all turrets.", stats:["Every 4th shot: +2 side shots", "-10% base damage"], quote:"One chamber. Three bad outcomes.", apply:s=>allTurrets(s,t=>{t.splitChambers+=1;t.damageMultiplier*=.9;}) }),
];

export const bodyCards: UpgradeCard[] = [
  bodyCard({ id:"reinforced-frame", name:"Reinforced Frame", rarity:"common", description:"Cross-bracing toughens the body with a small acceleration cost.", stats:["+20% max health", "-5% acceleration"], quote:"Brace it, weld it, send it.", apply:s=>{s.vehicleStats.maxHealthMultiplier*=1.2;s.vehicleStats.accelerationMultiplier*=.95;} }),
  bodyCard({ id:"steel-plating", name:"Steel Plating", rarity:"rare", description:"Layered body armor shrugs off impacts but weighs down the rig.", stats:["+18% damage reduction", "-10% top speed"], quote:"Steel does not need to dodge.", apply:s=>{s.vehicleStats.armorBonus+=.18;s.vehicleStats.maxSpeedMultiplier*=.9;} }),
  bodyCard({ id:"light-frame", name:"Light Frame", rarity:"common", description:"Strip the body down until speed becomes the armor.", stats:["+12% acceleration", "+10% top speed", "-15% max health"], quote:"If they hit you, the build was wrong.", apply:s=>{s.vehicleStats.accelerationMultiplier*=1.12;s.vehicleStats.maxSpeedMultiplier*=1.1;s.vehicleStats.maxHealthMultiplier*=.85;} }),
  bodyCard({ id:"heavy-chassis", name:"Heavy Chassis", rarity:"rare", description:"A dense chassis hits harder and stays together longer.", stats:["+25% max health", "+20% mass & ramming", "-12% handling"], quote:"Cornering is optional when the other car moves.", apply:s=>{s.vehicleStats.maxHealthMultiplier*=1.25;s.vehicleStats.massMultiplier*=1.2;s.vehicleStats.ramMultiplier*=1.2;s.vehicleStats.handlingMultiplier*=.88;} }),
  bodyCard({ id:"roll-cage", name:"Roll Cage", rarity:"common", description:"Internal bracing resists ugly rolls and protects the cabin.", stats:["+25% stability", "+10% max health"], quote:"Land dirty. Drive away clean.", apply:s=>{s.vehicleStats.stabilityMultiplier*=1.25;s.vehicleStats.maxHealthMultiplier*=1.1;} }),
  bodyCard({ id:"battle-bumper", name:"Battle Bumper", rarity:"rare", description:"A reinforced prow rewards direct, aggressive contact.", stats:["+35% ramming damage", "+8% frontal armor", "-5% handling"], quote:"The shortest route is through them.", apply:s=>{s.vehicleStats.ramMultiplier*=1.35;s.vehicleStats.armorBonus+=.08;s.vehicleStats.handlingMultiplier*=.95;} }),
  bodyCard({ id:"compact-rig", name:"Compact Rig", rarity:"rare", description:"A smaller body changes direction quickly but carries less hull.", stats:["-10% vehicle size", "+12% handling", "-10% max health"], quote:"Harder to hit. Easier to dent.", apply:s=>{s.vehicleStats.sizeMultiplier*=.9;s.vehicleStats.handlingMultiplier*=1.12;s.vehicleStats.maxHealthMultiplier*=.9;} }),
  bodyCard({ id:"overbuilt-hull", name:"Overbuilt Hull", rarity:"epic", description:"An excessive slab-sided rebuild turns the car into a moving bunker.", stats:["+45% max health", "-15% acceleration", "-10% handling"], quote:"Too much steel is almost enough.", apply:s=>{s.vehicleStats.maxHealthMultiplier*=1.45;s.vehicleStats.accelerationMultiplier*=.85;s.vehicleStats.handlingMultiplier*=.9;} }),
];

export const wheelCards: UpgradeCard[] = [
  wheelCard({ id:"racing-tires", name:"Racing Tires", rarity:"common", description:"Fast rubber sharpens turn-in and raises the pace.", stats:["+18% handling", "+10% top speed", "-8% rough stability"], quote:"Grip now. Regret the pothole later.", apply:s=>{s.vehicleStats.handlingMultiplier*=1.18;s.vehicleStats.maxSpeedMultiplier*=1.1;s.vehicleStats.stabilityMultiplier*=.92;s.tireVisual="racing";} }),
  wheelCard({ id:"offroad-tires", name:"Offroad Tires", rarity:"common", description:"Chunky tread keeps the rig composed on banks and rough ground.", stats:["+20% traction", "+20% rough stability", "-5% top speed"], quote:"Ugly tires. Beautiful landings.", apply:s=>{s.vehicleStats.tractionMultiplier*=1.2;s.vehicleStats.stabilityMultiplier*=1.2;s.vehicleStats.maxSpeedMultiplier*=.95;s.tireVisual="offroad";} }),
  wheelCard({ id:"drift-tires", name:"Drift Tires", rarity:"rare", description:"Predictable slip makes broad slides easier to hold and recover.", stats:["+25% drift control", "+15% turn-in", "-10% traction"], quote:"Sideways is still forward.", apply:s=>{s.vehicleStats.driftControlMultiplier*=1.25;s.vehicleStats.handlingMultiplier*=1.15;s.vehicleStats.tractionMultiplier*=.9;s.tireVisual="drift";} }),
  wheelCard({ id:"grip-tread", name:"Grip Tread", rarity:"common", description:"Soft tread bites hard at the expense of flat-out speed.", stats:["+25% traction", "-8% top speed"], quote:"Make every tire earn its keep.", apply:s=>{s.vehicleStats.tractionMultiplier*=1.25;s.vehicleStats.maxSpeedMultiplier*=.92;s.tireVisual="grip";} }),
  wheelCard({ id:"turbo-wheels", name:"Turbo Wheels", rarity:"rare", description:"Light high-speed wheels trade calm steering for raw pace.", stats:["+15% acceleration", "+15% top speed", "-10% handling"], quote:"Point first. Launch second.", apply:s=>{s.vehicleStats.accelerationMultiplier*=1.15;s.vehicleStats.maxSpeedMultiplier*=1.15;s.vehicleStats.handlingMultiplier*=.9;s.tireVisual="turbo";} }),
  wheelCard({ id:"armored-wheels", name:"Armored Wheels", rarity:"rare", description:"Heavy hubs and reinforced sidewalls resist roll and impact.", stats:["+20% wheel stability", "+10% anti-roll", "-8% acceleration"], quote:"Keep four on the ground.", apply:s=>{s.vehicleStats.stabilityMultiplier*=1.3;s.vehicleStats.accelerationMultiplier*=.92;s.tireVisual="heavy";} }),
  wheelCard({ id:"wall-grip-tires", name:"Wall-Grip Tires", rarity:"epic", description:"Special tread clings to banks, slopes, and Arena 2 walls.", stats:["+25% wall traction", "+15% wall stability", "-5% flat top speed"], quote:"The wall is another road.", apply:s=>{s.vehicleStats.wallGripMultiplier*=1.25;s.vehicleStats.stabilityMultiplier*=1.15;s.vehicleStats.maxSpeedMultiplier*=.95;s.tireVisual="wall";} }),
  wheelCard({ id:"lightweight-rims", name:"Lightweight Rims", rarity:"common", description:"Cut rotating mass for a livelier rig that hits with less authority.", stats:["+15% acceleration", "+10% handling", "-10% mass & ramming"], quote:"Less wheel. More response.", apply:s=>{s.vehicleStats.accelerationMultiplier*=1.15;s.vehicleStats.handlingMultiplier*=1.1;s.vehicleStats.massMultiplier*=.9;s.vehicleStats.ramMultiplier*=.9;s.tireVisual="light";} }),
];

export const abilityCards: UpgradeCard[] = [
  abilityCard({ id:"ability-bunny-hop", abilityId:"bunny_hop", name:"Bunny Hop", rarity:"epic", description:"Tap Q to pop the car into a short recovery hop.", stats:["Q: short upward hop", "7 second cooldown", "Replaces current ability"], quote:"Four wheels. Briefly optional.", apply:s=>{s.activeAbility="bunny_hop";} }),
  abilityCard({ id:"ability-mega-boost", abilityId:"mega_boost", name:"Mega Boost", rarity:"epic", description:"Tap Q for a violent 1.5-second forward burst.", stats:["Q: massive acceleration", "1.5 second duration", "10 second cooldown"], quote:"The horizon can catch up later.", apply:s=>{s.activeAbility="mega_boost";} }),
  abilityCard({ id:"ability-reflect", abilityId:"reflect", name:"Reflect", rarity:"epic", description:"Tap Q to raise a brief shield that returns incoming shots.", stats:["Q: 2 second reflect shield", "14 second cooldown", "Replaces current ability"], quote:"Return to sender. Add dents.", apply:s=>{s.activeAbility="reflect";} }),
  abilityCard({ id:"ability-mega-shroom", abilityId:"mega_shroom", name:"Mega Shroom", rarity:"epic", description:"Tap Q to become a glowing, oversized wrecking machine.", stats:["Q: 5 seconds at double size", "+100% temporary health & damage", "18 second cooldown"], quote:"Make the rig everybody else's problem.", apply:s=>{s.activeAbility="mega_shroom";} }),
];

export const upgradeCards: UpgradeCard[] = [...weaponCards, ...bodyCards, ...wheelCards, ...abilityCards];

function createRemainingDecks(): Record<CardDeckId, string[]> {
  const entries = (cards: UpgradeCard[], copies: number): string[] => cards.flatMap(card => Array.from({ length: copies }, () => card.id));
  return { weapon:entries(weaponCards,2), body:entries(bodyCards,2), wheel:entries(wheelCards,2), ability:entries(abilityCards,1) };
}

export function createStarterRun(activeTurret: WeaponKind, round = 1): ScraproadRunState {
  return {
    version:2, round, ownedTurrets:[activeTurret], activeTurret,
    turretStats:{ mg:baseTurretStats(), rocket:baseTurretStats(), sniper:baseTurretStats() },
    vehicleStats:baseVehicleStats(), activeAbility:"none", upgrades:[], pickedCards:[], remainingDecks:createRemainingDecks(),
    repairAfterRound:0, roundShield:0, swapCooldown:.16, tireVisual:"stock", cameraMode:"chase",
  };
}

const turretNames: Record<WeaponKind, string> = { mg:"Scrap Rattler", rocket:"Hellbox Rockets", sniper:"Longlance Rail" };

export function createTurretCard(kind: WeaponKind): UpgradeCard {
  return {
    id:`add-${kind}`, name:`Add ${turretNames[kind]}`, rarity:"epic", category:"turret", deck:null, copies:1, scope:"New Turret",
    description:`Bolt ${turretNames[kind]} into the owned loadout. It inherits every All Turrets upgrade immediately.`,
    stats:["+1 owned turret", "Inherits weapon modifiers", "Wheel / number-key swapping"], quote:"A new answer to an old problem.",
    apply:state=>{if(!state.ownedTurrets.includes(kind))state.ownedTurrets.push(kind);state.activeTurret=kind;},
  };
}

function createTurretMasteryCard(round: number): UpgradeCard {
  return {
    id:`all-turret-mastery-${round}`, name:"All-Turret Mastery", rarity:"epic", category:"weapon", deck:null, copies:1, scope:"All Turrets",
    description:"Every turret slot is filled, so the whole weapon rack gets refined instead.", stats:["+25% damage", "+15% projectile speed"], quote:"Three guns. One ruthless system.",
    apply:s=>allTurrets(s,t=>{t.damageMultiplier*=1.25;t.projectileSpeedMultiplier*=1.15;}),
  };
}

function seededShuffle<T>(items: T[], seed: number): T[] {
  const copy=[...items];let value=(seed||1)>>>0;
  for(let index=copy.length-1;index>0;index--){value=(value*1664525+1013904223)>>>0;const swap=value%(index+1);[copy[index],copy[swap]]=[copy[swap],copy[index]];}
  return copy;
}

function availableCards(state: ScraproadRunState, deck: CardDeckId): UpgradeCard[] {
  const ids=new Set(state.remainingDecks[deck]);
  return upgradeCards.filter(card=>card.deck===deck&&ids.has(card.id));
}

export type DraftOptions = { forceAbility?: boolean };

export function draftCards(state: ScraproadRunState, options: DraftOptions = {}): UpgradeCard[] {
  const seed=state.round*7919+state.pickedCards.length*104729+state.ownedTurrets.length*31;
  const offers: UpgradeCard[]=[];
  for(const [index,deck] of (["weapon","body","wheel"] as const).entries()){
    const available=seededShuffle(availableCards(state,deck),seed+index*3571);
    if(available[0])offers.push(available[0]);
  }
  const normalPool=seededShuffle([...availableCards(state,"weapon"),...availableCards(state,"body"),...availableCards(state,"wheel")],seed+1613)
    .filter(card=>!offers.some(offer=>offer.id===card.id));
  while(offers.length<3&&normalPool.length)offers.push(normalPool.shift()!);

  const abilities=availableCards(state,"ability").filter(card=>card.abilityId!==state.activeAbility);
  const abilityAppears=options.forceAbility===true||(abilities.length>0&&((seed>>>2)%8===0));
  if(abilityAppears&&offers.length){const ability=seededShuffle(abilities,seed+8191)[0];if(ability)offers[seed%offers.length]=ability;}

  if(state.round%3===0){
    const unowned=(Object.keys(turretNames) as WeaponKind[]).filter(kind=>!state.ownedTurrets.includes(kind));
    const reward=unowned.length?createTurretCard(seededShuffle(unowned,seed+43)[0]):createTurretMasteryCard(state.round);
    if(offers.length>=3)offers[0]=reward;else offers.unshift(reward);
  }
  return offers.slice(0,3);
}

export function applyCard(state: ScraproadRunState, card: UpgradeCard): ScraproadRunState {
  if(card.deck){const deck=state.remainingDecks[card.deck];const copyIndex=deck.indexOf(card.id);if(copyIndex<0)return state;deck.splice(copyIndex,1);}
  card.apply(state);state.upgrades.push(card.id);state.pickedCards.push(card.id);return state;
}

type LegacyState = Partial<Omit<ScraproadRunState,"version">> & { version?: number; upgrades?: string[] };

export function normalizeRunState(value: unknown): ScraproadRunState | null {
  if(!value||typeof value!=="object")return null;
  const legacy=value as LegacyState;
  if(!Array.isArray(legacy.ownedTurrets)||legacy.ownedTurrets.length===0||!legacy.ownedTurrets.every(kind=>kind==="mg"||kind==="rocket"||kind==="sniper"))return null;
  const active=legacy.activeTurret;if(active!=="mg"&&active!=="rocket"&&active!=="sniper")return null;
  const normalized=createStarterRun(active,typeof legacy.round==="number"?legacy.round:1);normalized.ownedTurrets=[...legacy.ownedTurrets];
  if(legacy.turretStats)normalized.turretStats={mg:{...baseTurretStats(),...legacy.turretStats.mg},rocket:{...baseTurretStats(),...legacy.turretStats.rocket},sniper:{...baseTurretStats(),...legacy.turretStats.sniper}};
  if(legacy.vehicleStats)normalized.vehicleStats={...baseVehicleStats(),...legacy.vehicleStats};
  normalized.activeAbility=legacy.activeAbility??"none";normalized.upgrades=[...(legacy.upgrades??[])];normalized.pickedCards=[...(legacy.pickedCards??legacy.upgrades??[])];
  normalized.repairAfterRound=legacy.repairAfterRound??0;normalized.roundShield=legacy.roundShield??0;normalized.swapCooldown=legacy.swapCooldown??.16;normalized.tireVisual=legacy.tireVisual??"stock";normalized.cameraMode=legacy.cameraMode??"chase";
  if(legacy.remainingDecks){for(const deck of ["weapon","body","wheel","ability"] as const)if(Array.isArray(legacy.remainingDecks[deck]))normalized.remainingDecks[deck]=[...legacy.remainingDecks[deck]];}
  else for(const picked of normalized.pickedCards){const card=upgradeCards.find(candidate=>candidate.id===picked);if(!card?.deck)continue;const index=normalized.remainingDecks[card.deck].indexOf(picked);if(index>=0)normalized.remainingDecks[card.deck].splice(index,1);}
  return normalized;
}

export function isRunState(value: unknown): value is ScraproadRunState { return normalizeRunState(value)?.version===2; }
export function remainingCardCount(state: ScraproadRunState, deck: CardDeckId): number { return state.remainingDecks[deck].length; }
export const abilityNames: Record<ActiveAbilityId, string> = { none:"None", bunny_hop:"Bunny Hop", mega_boost:"Mega Boost", reflect:"Reflect", mega_shroom:"Mega Shroom" };
