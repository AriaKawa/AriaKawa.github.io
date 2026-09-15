import assert from 'node:assert/strict';
import {writeFileSync} from 'node:fs';
import {generateMountain,REGIONS,MOUNTAIN_FLOOR,MOUNTAIN_HEIGHT} from '../server/src/sim/mountain.js';
import {worldForMap} from '../server/src/sim/world.js';
import {stepPlayer} from '../server/src/sim/physics.js';
import {updateMovingPlatforms} from '../server/src/sim/platforms.js';
import type {Platform,PlayerState} from '../server/src/sim/types.js';
import {solve, type Action} from './vertical-solver.js';
const make=(p:Platform,x=p.x+p.w/2-7):PlayerState=>({id:'test',name:'test',x,y:p.y-20,vx:0,vy:0,alive:true,grounded:true,groundedPlatformId:p.id,charging:false,charge01:0,chargeDirection:0,facing:0,isBot:false,colorIndex:0,maxHeight:0,input:{left:false,right:false,jumpHeld:false,seq:0}});
const level=generateMountain(),route=level.filter(p=>p.route),replay:{source:string;target:string;actions:Action[];margin:number}[]=[];
assert.equal(REGIONS.length,10);assert(level.length>280);assert(MOUNTAIN_HEIGHT>30000);
for(const phase of [0,3]){
 let p=make(level[0],313),time=phase;let min=999;
 for(const target of route){
  const from=p.groundedPlatformId!,result=solve(p,level,time,target);
  assert(result,`Impossible authored transition ${from} -> ${target.id} at ${time.toFixed(2)}s, x=${p.x}`);
  // Replay inputs through the full world, never reposition the player.
  for(const a of result.actions)for(let n=0;n<a.ticks;n++){
   p.input={left:a.direction<0,right:a.direction>0,jumpHeld:a.held,seq:0};updateMovingPlatforms(level,time*1000);stepPlayer(p,level,1/30,{...worldForMap('mountain'),time});time+=1/30;
  }
  assert.equal(p.groundedPlatformId,target.id,`Full-world replay intercepted ${from} -> ${target.id}`);
  min=Math.min(min,result.margin);if(phase===0)replay.push({source:from,target:target.id,actions:result.actions,margin:result.margin});
  if(target.id.endsWith('-29')||target.id==='crown')console.log('PASS',target.id,'time',time.toFixed(1),'margin',min.toFixed(1));
 }
 console.log(`PASS continuous phase ${phase}: ${route.length} authored jumps, ${time.toFixed(1)} seconds, minimum margin ${min.toFixed(1)}`);
}
for(const secret of level.filter(p=>p.secret)){
 const sources=level.filter(p=>p.y>secret.y&&p.y<secret.y+180);assert(sources.some(s=>solve(make(s),level,0,secret)),`Secret unreachable ${secret.id}`);
 const p=make(secret),other=make(secret);for(let n=0;n<100;n++)stepPlayer(p,level,1/30);assert.equal(p.crumblingPlatforms?.[secret.id],0);assert.equal(other.crumblingPlatforms,undefined);
}
const drops:number[]=[];
for(const s of level.slice(1))for(const x of [s.x-17,s.x+s.w+3]){
 const p=make(s,x);p.grounded=false;p.groundedPlatformId=undefined;for(let n=0;n<300&&!p.grounded;n++)stepPlayer(p,level,1/30);
 assert(p.grounded,`Unrecoverable fall ${s.id}`);drops.push(p.y+20-s.y);
}
assert(drops.some(d=>d>600));assert(drops.some(d=>d>0&&d<180));
console.log(`PASS ${drops.length} fall probes, drops ${Math.min(...drops)}..${Math.max(...drops)}px, floor ${MOUNTAIN_FLOOR}; five secrets accessible and private collapse`);
writeFileSync('docs/vertical-route.json',JSON.stringify(replay,null,2));
writeFileSync('docs/vertical-validation.json',JSON.stringify({platforms:level.length,requiredJumps:route.length,height:MOUNTAIN_HEIGHT,fallProbes:drops.length,maxDrop:Math.max(...drops)},null,2));
// Moving surfaces: optional rotors are reachable and carry both axes for a cycle.
for(const rotor of level.filter(p=>p.orbitY)){
 updateMovingPlatforms(level,0);
 const sources=level.filter(p=>p.y>rotor.y&&p.y<rotor.y+180&&!p.orbitY);
 assert(sources.some(s=>solve(make(s),level,0,rotor)),`Rotor inaccessible ${rotor.id}`);
 const p=make(rotor),offset=p.x-rotor.x;p.input.jumpHeld=true;
 for(let n=0;n<210;n++){
  updateMovingPlatforms(level,n/30*1000);stepPlayer(p,level,1/30,{...worldForMap('mountain'),time:n/30});
  assert.equal(p.groundedPlatformId,rotor.id);assert(Math.abs(p.x-rotor.x-offset)<.01);assert(Math.abs(p.y+20-rotor.y)<.01);
 }
}
for(const catchPlatform of level.filter(p=>p.id.startsWith('catch-'))){
 const targets=level.filter(p=>p.route&&p.y<catchPlatform.y&&p.y>catchPlatform.y-180);
 assert(targets.some(t=>solve(make(catchPlatform),level,0,t)),`Recovery exit inaccessible ${catchPlatform.id}`);
}
console.log('PASS orbit cradle access, full-cycle two-axis carry, and all recovery bridge exits');
