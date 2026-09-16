import type { Platform } from './types.js';

/** Stable per-platform variation keeps clients, physics and replays in agreement. */
function noise(key:string):number {
  let hash=2166136261;
  for(const char of key)hash=Math.imul(hash^char.charCodeAt(0),16777619);
  hash^=hash>>>16;hash=Math.imul(hash,0x7feb352d);hash^=hash>>>15;
  return (hash>>>0)/4294967295*2-1;
}

export function sizePlatforms(platforms:Platform[],map:string):Platform[] {
  const floor=platforms.find(p=>p.id==='spawn')!.y;
  const summit=platforms.find(p=>p.id==='crown')!.y;
  let previousHard=false;
  return platforms.map(p=>{
    const progress=Math.max(0,Math.min(1,(floor-p.y)/(floor-summit)));
    // Smaller normal landings, broad local variety, and occasional precision jumps.
    const precisionAllowance=Math.max(0,Math.min(1,(p.w-18)/40));
    const widthScale=(p.w<32?1+noise(`${map}:${p.id}:width`)*.06:.9+noise(`${map}:${p.id}:width`)*.12)-.06*Math.pow(progress,1.15)*precisionAllowance;
    // Full-width safety floors retain their coverage; their thickness still varies.
    const safety=p.id==='spawn'||p.id.startsWith('catch-');
    const hard=!safety&&p.id!=='crown'&&p.w>=40&&p.w<=260&&p.terrain!=='left'&&p.terrain!=='right'&&!previousHard&&noise(`${map}:${p.id}:hard`)<-.64;
    previousHard=hard;
    const w=safety?p.w:Math.max(18,Math.round(p.w*(hard?.5:widthScale)));
    let h=Math.max(8,Math.round(p.h*(1+noise(`${map}:${p.id}:height`)*.04)));
    if(h===p.h)h+=noise(`${map}:${p.id}:height`)<0?-1:1;
    // Keep cliffs attached to their banks and other landings on their authored centers.
    const shift=safety||p.terrain==='left'?0:p.terrain==='right'?p.w-w:map==='snow'&&p.id.startsWith('snow-')?(p.x===54?p.w-w:0):(p.w-w)/2;
    return {...p,x:p.x+shift,w,h,...(p.baseX===undefined?{}:{baseX:p.baseX+shift})};
  });
}
