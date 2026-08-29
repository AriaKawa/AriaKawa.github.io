export type WeaponKind = "mg" | "rocket" | "sniper";
export type CardCategory = "weapon" | "vehicle" | "utility" | "turret";
export type TireVisual = "stock" | "racing" | "offroad" | "heavy";

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
};

export type ScraproadRunState = {
  version: 1;
  round: number;
  ownedTurrets: WeaponKind[];
  activeTurret: WeaponKind;
  turretStats: Record<WeaponKind, TurretUpgradeStats>;
  vehicleStats: RunVehicleStats;
  upgrades: string[];
  repairAfterRound: number;
  roundShield: number;
  swapCooldown: number;
  tireVisual: TireVisual;
};

export type UpgradeCard = {
  id: string;
  name: string;
  rarity: "common" | "rare" | "epic";
  category: CardCategory;
  scope: string;
  description: string;
  stats: string[];
  quote: string;
  apply: (state: ScraproadRunState) => void;
};

const baseTurretStats = (): TurretUpgradeStats => ({
  damageMultiplier: 1,
  fireRateMultiplier: 1,
  projectileSpeedMultiplier: 1,
  rangeMultiplier: 1,
  projectileCount: 1,
  spread: 0,
  ricochets: 0,
  pierces: 0,
  burnDps: 0,
  burnDuration: 0,
  heavyRounds: false,
});

export function createStarterRun(activeTurret: WeaponKind, round = 1): ScraproadRunState {
  return {
    version: 1,
    round,
    ownedTurrets: [activeTurret],
    activeTurret,
    turretStats: { mg: baseTurretStats(), rocket: baseTurretStats(), sniper: baseTurretStats() },
    vehicleStats: {
      maxHealthMultiplier: 1,
      accelerationMultiplier: 1,
      maxSpeedMultiplier: 1,
      handlingMultiplier: 1,
      tractionMultiplier: 1,
      boostMultiplier: 1,
      armorBonus: 0,
      ramMultiplier: 1,
      stabilityMultiplier: 1,
    },
    upgrades: [],
    repairAfterRound: 0,
    roundShield: 0,
    swapCooldown: .16,
    tireVisual: "stock",
  };
}

const currentTurret = (state: ScraproadRunState): TurretUpgradeStats => state.turretStats[state.activeTurret];
const weaponCard = (card: Omit<UpgradeCard, "category" | "scope">): UpgradeCard => ({ ...card, category: "weapon", scope: "Current turret" });
const vehicleCard = (card: Omit<UpgradeCard, "category" | "scope">): UpgradeCard => ({ ...card, category: "vehicle", scope: "Vehicle" });
const utilityCard = (card: Omit<UpgradeCard, "category" | "scope">): UpgradeCard => ({ ...card, category: "utility", scope: "Whole rig" });

export const upgradeCards: UpgradeCard[] = [
  weaponCard({ id:"double-tap", name:"Double Tap", rarity:"common", description:"A twitchy trigger job for the turret you have mounted.", stats:["+35% fire rate", "-10% damage"], quote:"Twice the noise. Almost twice the trouble.", apply:s=>{const t=currentTurret(s);t.fireRateMultiplier*=1.35;t.damageMultiplier*=.9;} }),
  weaponCard({ id:"heavy-rounds", name:"Heavy Rounds", rarity:"rare", description:"Turns the active turret into a slow, brutal wrecking tool.", stats:["+100% damage", "-50% fire rate", "Larger shot VFX"], quote:"Slow. Loud. Final.", apply:s=>{const t=currentTurret(s);t.damageMultiplier*=2;t.fireRateMultiplier*=.5;t.heavyRounds=true;} }),
  weaponCard({ id:"multishot", name:"Multishot", rarity:"epic", description:"The active turret throws a fan of scrap downrange.", stats:["+2 projectiles", "-35% damage", "+12° spread"], quote:"Accuracy is a problem for the other car.", apply:s=>{const t=currentTurret(s);t.projectileCount+=2;t.damageMultiplier*=.65;t.spread+=Math.PI/15;} }),
  weaponCard({ id:"ricochet-rounds", name:"Ricochet Rounds", rarity:"rare", description:"Shots from the active turret rebound from the arena once.", stats:["+1 ricochet", "-15% projectile speed"], quote:"Miss once. Hit later.", apply:s=>{const t=currentTurret(s);t.ricochets+=1;t.projectileSpeedMultiplier*=.85;} }),
  weaponCard({ id:"incendiary-rounds", name:"Incendiary Rounds", rarity:"epic", description:"Orange-hot shots ignite the rival and leave ember impacts.", stats:["12 burn damage / sec", "3 sec burn", "-20% impact damage"], quote:"Make the whole arena smell like bad decisions.", apply:s=>{const t=currentTurret(s);t.burnDps+=12;t.burnDuration=Math.max(t.burnDuration,3);t.damageMultiplier*=.8;} }),
  weaponCard({ id:"piercing-rounds", name:"Piercing Rounds", rarity:"rare", description:"The active turret punches through one target before stopping.", stats:["Pierces 1 target", "-20% damage", "Brighter tracer"], quote:"Armor is just scenery.", apply:s=>{const t=currentTurret(s);t.pierces+=1;t.damageMultiplier*=.8;} }),
  weaponCard({ id:"overclocked-trigger", name:"Overclocked Trigger", rarity:"epic", description:"Unsafe wiring makes the active turret frantic and inaccurate.", stats:["+60% fire rate", "+20° spread"], quote:"The red wire was probably optional.", apply:s=>{const t=currentTurret(s);t.fireRateMultiplier*=1.6;t.spread+=Math.PI/9;} }),
  weaponCard({ id:"long-barrel", name:"Long Barrel", rarity:"common", description:"More velocity and reach, paid for with a heavier firing cycle.", stats:["+30% projectile speed", "+20% range", "-10% fire rate"], quote:"Reach out and ruin somebody's afternoon.", apply:s=>{const t=currentTurret(s);t.projectileSpeedMultiplier*=1.3;t.rangeMultiplier*=1.2;t.fireRateMultiplier*=.9;} }),
  vehicleCard({ id:"racing-tires", name:"Racing Tires", rarity:"common", description:"Sleek dark rubber bites hard on fast corners.", stats:["+30% handling", "+18% traction", "-8% max health"], quote:"Grip now. Regret the pothole later.", apply:s=>{s.vehicleStats.handlingMultiplier*=1.3;s.vehicleStats.tractionMultiplier*=1.18;s.vehicleStats.maxHealthMultiplier*=.92;s.tireVisual="racing";} }),
  vehicleCard({ id:"offroad-tires", name:"Offroad Tires", rarity:"common", description:"Chunky tires calm the rig on ramps and rough ground.", stats:["+32% traction", "+20% stability", "-5% top speed"], quote:"Ugly tires. Beautiful landings.", apply:s=>{s.vehicleStats.tractionMultiplier*=1.32;s.vehicleStats.stabilityMultiplier*=1.2;s.vehicleStats.maxSpeedMultiplier*=.95;s.tireVisual="offroad";} }),
  vehicleCard({ id:"turbocharger", name:"Turbocharger", rarity:"rare", description:"Violent spool turns every straight into a launch lane.", stats:["+35% acceleration", "+18% top speed", "-12% handling"], quote:"Point first. Boost second.", apply:s=>{s.vehicleStats.accelerationMultiplier*=1.35;s.vehicleStats.maxSpeedMultiplier*=1.18;s.vehicleStats.handlingMultiplier*=.88;} }),
  vehicleCard({ id:"reinforced-plating", name:"Reinforced Plating", rarity:"common", description:"Riveted steel keeps the hull together at the cost of response.", stats:["+45% max health", "+10% armor", "-18% acceleration"], quote:"Fast is temporary. Steel is stubborn.", apply:s=>{s.vehicleStats.maxHealthMultiplier*=1.45;s.vehicleStats.armorBonus+=.1;s.vehicleStats.accelerationMultiplier*=.82;} }),
  vehicleCard({ id:"light-frame", name:"Light Frame", rarity:"rare", description:"Strip the rig down until speed is the only defense left.", stats:["+18% top speed", "+25% acceleration", "-30% max health"], quote:"If they hit you, the build was wrong.", apply:s=>{s.vehicleStats.maxSpeedMultiplier*=1.18;s.vehicleStats.accelerationMultiplier*=1.25;s.vehicleStats.maxHealthMultiplier*=.7;} }),
  vehicleCard({ id:"heavy-frame", name:"Heavy Frame", rarity:"rare", description:"A wide, dark wheel-and-frame package built for ramming.", stats:["+55% ramming force", "+8% armor", "-22% handling"], quote:"Cornering is optional when the other car moves.", apply:s=>{s.vehicleStats.ramMultiplier*=1.55;s.vehicleStats.armorBonus+=.08;s.vehicleStats.handlingMultiplier*=.78;s.tireVisual="heavy";} }),
  vehicleCard({ id:"stabilizer-kit", name:"Stabilizer Kit", rarity:"common", description:"Bracing resists ugly rolls and keeps the tires under you.", stats:["+35% stability", "+12% traction", "-6% top speed"], quote:"Land dirty. Drive away clean.", apply:s=>{s.vehicleStats.stabilityMultiplier*=1.35;s.vehicleStats.tractionMultiplier*=1.12;s.vehicleStats.maxSpeedMultiplier*=.94;} }),
  utilityCard({ id:"field-repair", name:"Field Repair", rarity:"common", description:"The pit crew patches the hull after every round.", stats:["Repair 25 hull after each round"], quote:"Nothing a hammer and optimism can't fix.", apply:s=>{s.repairAfterRound+=25;} }),
  utilityCard({ id:"emergency-shield", name:"Emergency Shield", rarity:"rare", description:"A disposable field catches the opening burst each round.", stats:["Start rounds with 35 shield"], quote:"One free mistake. Spend it loudly.", apply:s=>{s.roundShield+=35;} }),
  utilityCard({ id:"quick-swap", name:"Quick Swap", rarity:"common", description:"Powered bearings snap owned turrets into place faster.", stats:["-65% turret swap delay", "+8% handling"], quote:"Wrong gun? Not for long.", apply:s=>{s.swapCooldown=Math.max(.035,s.swapCooldown*.35);s.vehicleStats.handlingMultiplier*=1.08;} }),
];

const turretNames: Record<WeaponKind, string> = { mg:"Scrap Rattler", rocket:"Hellbox Rockets", sniper:"Longlance Rail" };

export function createTurretCard(kind: WeaponKind): UpgradeCard {
  return {
    id:`add-${kind}`,
    name:`Add ${turretNames[kind]}`,
    rarity:"epic",
    category:"turret",
    scope:"New turret slot",
    description:`Bolt ${turretNames[kind]} into the rig's owned turret loadout and equip it now.`,
    stats:["+1 owned turret", "Mouse wheel / number-key swapping"],
    quote:"A new answer to an old problem.",
    apply:state=>{if(!state.ownedTurrets.includes(kind))state.ownedTurrets.push(kind);state.activeTurret=kind;},
  };
}

function seededShuffle<T>(items: T[], seed: number): T[] {
  const copy=[...items];let value=(seed||1)>>>0;
  for(let index=copy.length-1;index>0;index--){value=(value*1664525+1013904223)>>>0;const swap=value%(index+1);[copy[index],copy[swap]]=[copy[swap],copy[index]];}
  return copy;
}

export function draftCards(state: ScraproadRunState): UpgradeCard[] {
  const seed=state.round*7919+state.upgrades.length*104729+state.ownedTurrets.length*31;
  const normal=seededShuffle(upgradeCards.filter(card=>!state.upgrades.includes(card.id)),seed);
  const fallback=normal.length>=3?normal:seededShuffle(upgradeCards,seed);
  if(state.round%3!==0)return fallback.slice(0,3);
  const unowned=(Object.keys(turretNames) as WeaponKind[]).filter(kind=>!state.ownedTurrets.includes(kind));
  if(unowned.length===0){
    const enhancement=weaponCard({id:`mastery-${state.activeTurret}-${state.round}`,name:`${turretNames[state.activeTurret]} Mastery`,rarity:"epic",description:"With every turret slot filled, refine the active weapon instead.",stats:["+45% damage", "+20% projectile speed"],quote:"Three guns. One favorite.",apply:s=>{const t=currentTurret(s);t.damageMultiplier*=1.45;t.projectileSpeedMultiplier*=1.2;}});
    return [enhancement,...fallback.slice(0,2)];
  }
  return [createTurretCard(seededShuffle(unowned,seed)[0]),...fallback.slice(0,2)];
}

export function applyCard(state: ScraproadRunState, card: UpgradeCard): ScraproadRunState {
  card.apply(state);
  state.upgrades.push(card.id);
  return state;
}

export function isRunState(value: unknown): value is ScraproadRunState {
  if(!value||typeof value!=="object")return false;
  const run=value as Partial<ScraproadRunState>;
  return run.version===1&&Array.isArray(run.ownedTurrets)&&run.ownedTurrets.length>0&&typeof run.activeTurret==="string"&&!!run.turretStats&&!!run.vehicleStats&&Array.isArray(run.upgrades);
}
