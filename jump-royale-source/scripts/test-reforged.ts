import { generateSnow, generateJungle } from '../server/src/sim/maps.js';
import assert from 'node:assert/strict';
import { generateLevel } from '../server/src/sim/level.js';
import { stepPlayer } from '../server/src/sim/physics.js';
import { rankPlayers, selectWinner } from '../server/src/sim/round.js';
import type { Platform, PlayerState } from '../server/src/sim/types.js';
function player(p:Platform,x=p.x+p.w/2-7):PlayerState{return {id:'test',name:'Test',x,y:p.y-20,vx:0,vy:0,alive:true,grounded:true,charging:false,charge01:0,chargeDirection:0,groundedPlatformId:p.id,facing:0,isBot:false,colorIndex:0,maxHeight:0,input:{left:false,right:false,jumpHeld:false,seq:0}};}
const level=process.argv.includes('--snow') ? generateSnow() : process.argv.includes('--jungle') ? generateJungle() : generateLevel();
const route=level.filter(p=>!p.id.startsWith('pocket'));
let worst=Infinity;
for(let n=1;n<route.length;n++){
 const from=route[n-1],to=route[n];let solutions=0;
 // Moving links are exercised with real motion and four arrival phases in test-crown-forge.
 if(from.type==='moving'||to.type==='moving')continue;
 for(let x=from.x+8;x<=from.x+from.w-22;x+=8)for(const direction of [-1,0,1])for(let hold=3;hold<=24;hold++){
  const p=player(from,x);p.input={left:direction<0,right:direction>0,jumpHeld:true,seq:0};
  for(let t=0;t<hold;t++)stepPlayer(p,level,1/30);
  p.input.jumpHeld=false;
  for(let t=0;t<50;t++){stepPlayer(p,level,1/30);if(p.grounded){if(p.groundedPlatformId===to.id && p.x>=to.x+2 && p.x+14<=to.x+to.w-2)solutions++;break;}}
 }
 assert(solutions>0,`Unreachable: ${from.id} -> ${to.id}`);worst=Math.min(worst,solutions);
}
const a=player(route[0]),b=player(route[0]);a.id='first';b.id='higher';a.maxHeight=200;b.maxHeight=900;
assert.equal(selectWinner([a,b],300)?.id,'higher');
a.groundedPlatformId='crown';assert.equal(selectWinner([a,b],20)?.id,'first');
assert.equal(rankPlayers([a,b],'first')[0].id,'first');
a.alive=false;a.eliminatedAt=50;b.alive=false;b.eliminatedAt=100;assert.equal(rankPlayers([a,b])[0].id,'higher');
const falling=player(route[0]);falling.x=300;falling.y=650;falling.vy=1800;falling.grounded=false;
stepPlayer(falling,[{id:'lower',x:200,y:715,w:250,h:16,type:'stone'},{id:'upper',x:200,y:695,w:250,h:16,type:'stone'}],1/30);
assert.equal(falling.groundedPlatformId,'upper');
console.log(`PASS: ${route.length-1} required jumps have collision-tested landings (minimum ${worst} launch/charge combinations). Ranking, summit victory and fast-fall collision pass.`);
