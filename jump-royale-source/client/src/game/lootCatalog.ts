import {EXPEDITION_WALLPAPERS} from './expeditionWorlds';
import {isExpeditionCharacter} from '../assets/expeditionCharacters';
import {COSMETICS,DEMON_HAIRS} from '../assets/cosmetics';
import {COSTUMES} from '../assets/costumeSets';
import type {LootEntry} from './economy';
export const RARITIES=[{name:'Mil-Spec',color:'#559bff'},{name:'Restricted',color:'#a77aff'},{name:'Classified',color:'#f263cd'},{name:'Covert',color:'#ff6868'},{name:'Legendary',color:'#ffd36b'}];
export const LOOT_POOL:LootEntry[]=[
 ...EXPEDITION_WALLPAPERS.map(w=>({slot:'wallpaper',id:w.id,name:w.name+' Wallpaper',rarity:w.rarity})),
 {slot:'wallpaper',id:'starlight',name:'Starlight Wallpaper',rarity:1},
 {slot:'wallpaper',id:'moonveil',name:'Moonveil Wallpaper',rarity:0},
 ...COSMETICS.character.filter(c=>!['pogo','aria'].includes(c.id)&&!isExpeditionCharacter(c.id)).map(c=>({id:c.id,name:c.name+' · 8-bit Special',slot:'retroCostume',rarity:3})),
 ...COSTUMES.filter(p=>p.id!=='classic').map(p=>({slot:'costume',id:p.id,name:p.name,rarity:p.id==='finn-16'?3:p.id==='mage'?2:['maid','diver'].includes(p.id)?1:0})),
 ...COSMETICS.character.filter(p=>p.id!=='original').map(p=>({slot:'character',id:p.id,name:p.name,rarity:p.id==='aria'||p.id==='demon'||p.id==='cerberus'?4:p.id==='mushroom'?2:3})),
 ...DEMON_HAIRS.filter(p=>p.id!=='original').map(p=>({slot:'hair',id:p.id,name:p.name,rarity:1})),
 {slot:'hair',id:'star-buns',name:'Starlight Star Buns',rarity:2},
 {slot:'animalHat',id:'party',name:'Party Hat',rarity:2},
 {slot:'animalHat',id:'fedora',name:'Fedora',rarity:1},
 {slot:'animalHat',id:'unicorn',name:'Unicorn Horn',rarity:2},

].sort((a,b)=>a.rarity-b.rarity);

export const itemRarity=(slot:string,id:string)=>LOOT_POOL.find(p=>p.slot===slot&&p.id===id)?.rarity??-1;
