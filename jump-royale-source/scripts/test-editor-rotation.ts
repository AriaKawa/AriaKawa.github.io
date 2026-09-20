import assert from 'node:assert/strict';
import {stepPlayer} from '../server/src/sim/physics';
import {standingY,supportAt,canStand,toWorld,toLocal,sweep} from '../server/src/sim/platformGeometry';
import {fitBucket,BUCKET_ART} from '../server/src/sim/bucketGeometry';
import {PLAYER_HEIGHT,PLAYER_WIDTH} from '../server/src/sim/constants';
import {parseDraft,createDraft} from '../client/src/editor/maps';
import type {Platform,PlayerState} from '../server/src/sim/types';
const bounds={left:-2000,right:2000,top:-2000};
const part=(rotation=0):Platform=>({id:'test',x:200,y:500,w:400,h:32,solid:true,type:'stone',rotation});
function actor(platform:Platform,x=platform.x+platform.w/2-PLAYER_WIDTH/2):PlayerState{
 return{id:'p',name:'test',x,y:standingY(platform,x),vx:0,vy:0,alive:true,grounded:true,groundedPlatformId:platform.id,charging:false,charge01:0,chargeDirection:0,facing:1,isBot:false,colorIndex:0,maxHeight:0,input:{left:false,right:false,jumpHeld:false,seq:0}};
}
for(const rotation of [0,15,44,45,-15,-45,135,180]){
 const platform=part(rotation),p=actor(platform),start={x:p.x,y:p.y};
 const support=supportAt(p.x,p.y,[platform]);assert(support&&canStand(support.normal),'Standable '+rotation);
 for(let i=0;i<30;i++)stepPlayer(p,[platform],1/30,bounds);
 assert(Math.abs(p.x-start.x)<.01&&Math.abs(p.y-start.y)<.01,'No idle drift at '+rotation);
 p.input.jumpHeld=true;for(let i=0;i<20;i++)stepPlayer(p,[platform],1/30,bounds);
 p.input.jumpHeld=false;stepPlayer(p,[platform],1/30,bounds);assert(!p.grounded&&p.vy<0,'Can jump from '+rotation);
}
for(const rotation of [46,60,-60,120,-120]){
 const platform=part(rotation),p=actor(platform),x=p.x,y=p.y;
 const n=supportAt(p.x,p.y,[platform])!.normal;assert(!canStand(n));
 for(let i=0;i<10;i++)stepPlayer(p,[platform],1/30,bounds);
 assert(p.y>y+.2,'Slides downward '+rotation);assert(Math.sign(p.x-x)===Math.sign(n.x),'Correct downhill direction '+rotation);
 assert(Math.hypot(p.vx,p.vy)<151,'Gradual controlled slide '+rotation);
}
const bucket:Platform={...part(),forest:true,w:800,h:240,bucket:{left:.2,right:.8,depth:56}};
fitBucket(bucket);assert.equal(bucket.bucket!.left,BUCKET_ART.left);assert.equal(bucket.bucket!.depth,240*107/221);
for(const t of [.1,.5,.8]){
 const x=bucket.x+bucket.w*t-PLAYER_WIDTH/2,p=actor(bucket,x);
 const expected=bucket.y+(t===.5?bucket.bucket!.depth:0);
 assert(Math.abs(p.y+PLAYER_HEIGHT-expected)<.01,'Bucket cap/floor matches art '+t);
 p.y=bucket.y-100;p.grounded=false;p.groundedPlatformId=undefined;
 for(let i=0;i<45;i++)stepPlayer(p,[bucket],1/30,bounds);
 assert(Math.abs(p.y+PLAYER_HEIGHT-expected)<.01,'Landing at '+t);
}
const floor=actor(bucket);floor.input.right=true;for(let i=0;i<120;i++)stepPlayer(floor,[bucket],1/30,bounds);
assert(floor.x+PLAYER_WIDTH<=bucket.x+bucket.w*BUCKET_ART.right+.01,'Inner wall blocks walking through rock');
assert(floor.x+PLAYER_WIDTH>=bucket.x+bucket.w*BUCKET_ART.right-1,'No collision snag along the recessed floor');
const upsideDown={...bucket,rotation:180};
assert(standingY(upsideDown,upsideDown.x+upsideDown.w/2)+PLAYER_HEIGHT>upsideDown.y+5,'Rotated underside follows rock, not transparent image bounds');
for(const rotation of [90,-90,30]){
 const platform=part(rotation),center=toWorld(platform,platform.w/2,platform.h/2),local=toLocal(platform,center.x,center.y);
 assert(Math.abs(local.x-platform.w/2)<1e-8);
 const wall=sweep(-100,center.y-10,1200,0,[platform]);assert(wall,'Fast side collision '+rotation);
 const ceiling=sweep(center.x-7,1000,0,-1000,[platform]);assert(ceiling&&ceiling.normal.y>0,'Rotated underside '+rotation);
}
const slope={...part(),slope:true,h:100};
const a=actor(slope);const start=a.x;for(let i=0;i<20;i++)stepPlayer(a,[slope],1/30,bounds);assert.equal(a.x,start,'Gentle triangular slope stands');
const map=createDraft('forest');map.platforms=[bucket];map.platforms[0].rotation=60;
const loaded=parseDraft(JSON.stringify(map));assert.equal(loaded.platforms[0].rotation,60);
assert.equal(loaded.platforms[0].bucket!.depth,bucket.h*BUCKET_ART.depth);
assert.throws(()=>parseDraft(JSON.stringify({...map,platforms:[{...bucket,rotation:Infinity}]})));
console.log('PASS rotation: stable floors through 45°, gradual downhill slides, bucket caps/floor/walls, rotated ceilings and fast side contacts, jump takeoff, and saved angles.');
