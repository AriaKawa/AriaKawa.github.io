import {COSMETICS,DEMON_HAIRS} from '../assets/cosmetics';
import {COSTUMES} from '../assets/costumeSets';
import type {LootEntry} from './economy';
export const RARITIES=[{name:'Mil-Spec',color:'#559bff'},{name:'Restricted',color:'#a77aff'},{name:'Classified',color:'#f263cd'},{name:'Covert',color:'#ff6868'},{name:'Legendary',color:'#ffd36b'}];
export const LOOT_POOL:LootEntry[]=[
 ...COSTUMES.filter(p=>p.id!=='classic').map(p=>({slot:'costume',id:p.id,name:p.name,rarity:p.id==='mage'?2:['maid','diver'].includes(p.id)?1:0})),
 ...COSMETICS.character.filter(p=>p.id!=='original').map(p=>({slot:'character',id:p.id,name:p.name,rarity:p.id==='demon'?4:p.id==='mushroom'?2:3})),
 ...DEMON_HAIRS.filter(p=>p.id!=='original').map(p=>({slot:'hair',id:p.id,name:'Ember · '+p.name,rarity:1}))
];
