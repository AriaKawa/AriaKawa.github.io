import { loadCampaign, saveCampaign, type Campaign } from './Campaign';
import { EQUIPMENT_INFO } from './Equipment';
import type { EquipmentType } from './types';
export const CONVOYS = [{id:'warden',name:'Roadwarden',hull:1000,speed:1,description:'Balanced command convoy'}, {id:'bastion',name:'Iron Bastion',hull:1200,speed:.9,description:'Reinforced survival convoy'}, {id:'scout',name:'Scavenger',hull:1000,speed:1,description:'Economy convoy · +20% scrap from kills'}];
export const TURRETS = ['rifle','cannon','flame','shock','floodlight'];
export const SUPPLY_COSTS: Record<EquipmentType,number> = {barbedWire:30,overclockBooster:60,proximityMine:45,fieldRepairKit:40,roadFlare:25,airstrike:180};
export type Hideout = { convoy:string; convoys:Record<string,Record<string,number>>; turrets:Record<string,number>; supplies:Partial<Record<EquipmentType,number>> };
export function hideout(c:Campaign):Hideout { return c.hideout ??= {convoy:'warden',convoys:{},turrets:{},supplies:{}}; }
export function purchase(kind:string,id:string,stat=''):boolean {
 const c=loadCampaign(), h=hideout(c); let cost=0; let level=0;
 if(kind==='supply') { if(!(id in SUPPLY_COSTS))return false; cost=SUPPLY_COSTS[id as EquipmentType]; }
 else if(kind==='turret') { if(!TURRETS.includes(id))return false; level=h.turrets[id]||0; cost=125*(level+1); }
 else if(kind==='convoy') {if(!CONVOYS.some(v=>v.id===id)||!['health','speed','capacity'].includes(stat))return false; level=h.convoys[id]?.[stat]||0;cost=100*(level+1);}
 else return false;
 if(level>=5||c.bank.scrap<cost)return false;
 c.bank.scrap-=cost;
 if(kind==='supply')h.supplies[id as EquipmentType]=(h.supplies[id as EquipmentType]||0)+1;
 if(kind==='turret')h.turrets[id]=level+1;
 if(kind==='convoy')(h.convoys[id]??={})[stat]=level+1;
 saveCampaign(c);return true;
}
export function convoyStats(c=loadCampaign()) {const h=hideout(c), rig=CONVOYS.find(v=>v.id===h.convoy)||CONVOYS[0], u=h.convoys[rig.id]||{};return {id:rig.id,hull:rig.hull+(u.health||0)*150,speed:rig.speed*(1+(u.speed||0)*.05),capacity:6+(u.capacity||0)*2};}
