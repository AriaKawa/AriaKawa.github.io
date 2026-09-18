import {COSMETICS,DEMON_HAIRS} from '../assets/cosmetics';
import {COSTUMES} from '../assets/costumeSets';
import type {LootEntry} from './economy';
export const RARITIES=[{name:'Mil-Spec',color:'#559bff'},{name:'Restricted',color:'#a77aff'},{name:'Classified',color:'#f263cd'},{name:'Covert',color:'#ff6868'},{name:'Legendary',color:'#ffd36b'}];
export const LOOT_POOL:LootEntry[]=[
 {slot:'wallpaper',id:'starlight',name:'Starlight Wallpaper',rarity:1},
 {slot:'wallpaper',id:'moonveil',name:'Moonveil Wallpaper',rarity:0},
 ...[{id:'demon-16',name:'Ember · 16-bit'},{id:'neet-16',name:'Kenji · 16-bit'},{id:'cerberus-16',name:'Cerberus · 16-bit'}].map(p=>({...p,slot:'hdCostume',rarity:3})),
 ...COSTUMES.filter(p=>p.id!=='classic').map(p=>({slot:'costume',id:p.id,name:p.name,rarity:p.id==='finn-16'?3:p.id==='mage'?2:['maid','diver'].includes(p.id)?1:0})),
 ...COSMETICS.character.filter(p=>p.id!=='original').map(p=>({slot:'character',id:p.id,name:p.name,rarity:p.id==='demon'||p.id==='cerberus'?4:p.id==='mushroom'?2:3})),
 ...DEMON_HAIRS.filter(p=>p.id!=='original').map(p=>({slot:'hair',id:p.id,name:p.name,rarity:1})),
 {slot:'hair',id:'star-buns',name:'Starlight Star Buns',rarity:2},
 {slot:'animalHat',id:'party',name:'Party Hat',rarity:2},
 {slot:'animalHat',id:'fedora',name:'Fedora',rarity:1},
 {slot:'animalHat',id:'unicorn',name:'Unicorn Horn',rarity:2},
 {slot:'magicalCostume',id:'starlight-16',name:'Starlight · 16-bit',rarity:3}
];
