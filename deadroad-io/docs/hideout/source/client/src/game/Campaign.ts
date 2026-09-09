import type { Hideout } from './Hideout';
export const CAMPAIGN_KEY = 'deadroad-campaign-v1';
export type Upgrade = 'armor' | 'turrets' | 'field' | 'salvage';
export type Character = { id: string; name: string; status: 'alive' | 'dead'; xp: number; scrap: number; bankedXp: number; created: number; died?: number; savedAt?: number; run?: any; battleSeed?: any; obituary?: { xp: number; scrap: number } };
export type Campaign = { hideout?: Hideout; version: 1; selected: number; slots: (Character | null)[]; bank: { xp: number; scrap: number }; stash: { type: string; tier: number; path: string }[]; upgrades: Record<Upgrade, number>; history: { name: string; died: number; xp: number }[] };
export const UPGRADES: { id: Upgrade; name: string; section: string; description: string; icon: string }[] = [
  { id: 'armor', name: 'Reinforced chassis', section: 'Convoy bay', description: '+150 convoy hull per level. Applied on the next insertion.', icon: '▰' },
  { id: 'turrets', name: 'Precision fabrication', section: 'Turret workshop', description: '+10% damage per level for every newly built turret.', icon: '⌖' },
  { id: 'field', name: 'Field supply locker', section: 'Field upgrades', description: 'One extra repair kit per level for each new expedition.', icon: '✚' },
  { id: 'salvage', name: 'Recovery network', section: 'Field upgrades', description: '+5% scrap recovered on death per level. Base recovery: 25%.', icon: '◇' }
];
export function loadCampaign(): Campaign {
  const empty: Campaign = { version: 1, selected: 0, slots: [null, null, null], bank: { xp: 0, scrap: 0 }, stash: [], upgrades: { armor: 0, turrets: 0, field: 0, salvage: 0 }, history: [] };
  try {
    const raw = localStorage.getItem(CAMPAIGN_KEY);
    if (!raw) {
      const legacy = JSON.parse(localStorage.getItem('deadroad-progression-v1') || '{}');
      empty.bank.xp = Math.max(0, Number(legacy.researchXp) || 0);
      if (legacy.xp || legacy.research) empty.slots[0] = { id: crypto.randomUUID(), name: 'Roadwarden', status: 'alive', xp: legacy.xp || 0, scrap: 250, bankedXp: legacy.xp || 0, created: Date.now(), run: { player: { ...legacy, scrap: 250, fuel: 100, signal: 0 } } };
      return empty;
    }
    const data = JSON.parse(raw);
    if (data.version !== 1 || !Array.isArray(data.slots) || data.slots.length !== 3) throw new Error('Unsupported save');
    const campaign: Campaign = { ...empty, ...data, stash: data.stash || [], upgrades: { ...empty.upgrades, ...data.upgrades } };
    for (const survivor of campaign.slots) {
      if (survivor?.status === 'alive' && !survivor.run?.bases?.length && survivor.run?.player?.turretRewards?.length) {
        campaign.stash.push(...survivor.run.player.turretRewards);
        survivor.run.player.turretRewards = [];
      }
    }
    return campaign;
  } catch { return empty; }
}
export function saveCampaign(c: Campaign): void { localStorage.setItem(CAMPAIGN_KEY, JSON.stringify(c)); }
export function activeCharacter(c = loadCampaign()): Character | null { return c.slots[c.selected]; }
export function createCharacter(c: Campaign, name: string): Character {
  if (activeCharacter(c)?.status === 'alive') throw new Error('This slot already has a survivor.');
  const character: Character = { id: crypto.randomUUID(), name: name.trim().slice(0, 18) || 'Roadwarden', status: 'alive', xp: 0, scrap: 250, bankedXp: 0, created: Date.now() };
  c.slots[c.selected] = character; saveCampaign(c); return character;
}
export function upgradeCost(level: number) { return { scrap: 100 * (level + 1), xp: 75 * (level + 1) }; }
export function buyUpgrade(c: Campaign, id: Upgrade): boolean {
  const level = c.upgrades[id]; const cost = upgradeCost(level);
  if (level >= 5 || c.bank.scrap < cost.scrap || c.bank.xp < cost.xp || c.slots.some(s => s?.status === 'alive' && s.run?.bases?.length)) return false;
  c.bank.scrap -= cost.scrap; c.bank.xp -= cost.xp; c.upgrades[id]++; saveCampaign(c); return true;
}
export function settleCharacter(c: Campaign, id: string, xp: number, scrap: number, death: boolean) {
  const character = c.slots.find(s => s?.id === id);
  if (!character || character.status !== 'alive') return;
  const earnedXp = Math.max(0, xp - character.bankedXp);
  // The 250 issued supplies are never eligible for banking; creating recruits cannot mint currency.
  const reward = { xp: Math.floor(earnedXp * (death ? .5 : 1)), scrap: Math.floor(Math.max(0, scrap - 250) * (death ? .25 + c.upgrades.salvage * .05 : 1)) };
  c.bank.xp += reward.xp; c.bank.scrap += reward.scrap; character.bankedXp = xp;
  character.xp = xp; character.scrap = Math.min(250, scrap); character.run = undefined; character.battleSeed = undefined;
  if (death) { character.status = 'dead'; character.died = Date.now(); character.obituary = reward; c.history.unshift({ name: character.name, died: character.died, xp }); c.history = c.history.slice(0, 30); }
  saveCampaign(c); return reward;
}
