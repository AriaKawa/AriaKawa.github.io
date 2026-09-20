import type { MapId } from '../../../server/src/sim/maps';
import type { Platform } from '../../../server/src/sim/types';
export interface Part { id: string; name: string; image: string; properties: Partial<Platform>; badge?: string }
const item = (id: string, name: string, image: string, properties: Partial<Platform> = {}, badge?: string): Part => ({ id, name, image: 'assets/' + image, properties, badge });
export const mapThumbnail = (map: MapId) => import.meta.env.BASE_URL + (map === 'jungle' ? 'assets/jungle-hd/background.webp' : `assets/menu/map-previews/${map}.png`);
export function partsFor(map: MapId): Part[] {
  const themed: Record<MapId, Part[]> = {
    forge: [item('stone','Basalt','crown-forge/stone.webp'),item('anvil','Rest ledge','crown-forge/rest.webp',{type:'anvil'})],
    forest: [item('stone','Moss slab','forest-ai/moss-slate.webp',{artVariant:0}),item('wood','Root slab','forest-ai/root-slate.webp',{type:'wood',artVariant:1}),item('ruin','Moon ruin','forest-ai/moon-ruin.webp',{type:'anvil',artVariant:2}),item('bucket','Hollow rock','forest-ai/bucket-16.webp',{w:200,h:76,bucket:{left:.2,right:.8,depth:56}}),item('ceiling','Ceiling','forest-ai/moss-slate.webp',{ceiling:true,artVariant:0},'↧')],
    magical: [item('stone','Ribbon palace','magical-ai/ribbon-palace.webp',{artVariant:0}),item('wood','Rose garden','magical-ai/rose-garden.webp',{type:'wood',artVariant:1}),item('ruin','Star crystal','magical-ai/star-crystal.webp',{type:'anvil',artVariant:2})],
    jungle: [item('stone','Floating island','jungle/island.png',{terrain:'island',h:42}),item('wood','Log','jungle/log.png',{terrain:'log',type:'wood'}),item('ruin','Ancient ruin','jungle/ruin.png',{terrain:'ruin',type:'anvil',h:48}),item('cliff','Cliff','jungle/cliff-v3.png',{terrain:'left',w:180,h:100})],
    snow: [item('stone','Snow ledge','snow/ledge.png'),item('wood','Frost log','snow/log.png',{terrain:'log',type:'wood'}),item('ruin','Frozen ruin','snow/ruin.png',{terrain:'ruin',type:'anvil'})],
    mountain: [0,1,2,3].map((n)=>item(n===0?'stone':`rock-${n}`,['Rock','Timber','Masonry','Ledge'][n],`jump-royale-ai/foothills/platform-${n}.webp`,{artVariant:n,region:0}))
  };
  const base = themed[map][0];
  return [...themed[map],
    {...base,id:'ice',name:'Slippery ice',image:map==='snow'?'assets/snow/ice.png':base.image,properties:{...base.properties,type:'ice',slippery:true},badge:'❄'},
    {...base,id:'moving',name:'Moving lift',image:map==='forge'?'assets/crown-forge/moving.webp':base.image,properties:{...base.properties,type:'moving'},badge:'↔'},
    {...base,id:'cracked',name:'Crumbling',properties:{...base.properties,type:'cracked',crumbleSeconds:1.2},badge:'◌'},
    item('slope','Slope','jump-royale-ai/props/slope.webp',{slope:true,h:48}),
    item('finish','Finish','menu/forged-command/scores.png',{type:'anvil',w:160},'⚑')];
}
