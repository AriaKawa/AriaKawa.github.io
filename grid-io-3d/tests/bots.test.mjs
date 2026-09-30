import test from "node:test";
import assert from "node:assert/strict";
import {Arena, HALF, angleDifference} from "../simulation.mjs";
function scene(mode="360") {
 const a=new Arena({seed:45,bots:0,food:0,mode});a.food=[];a.rebuildFoodHash();
 Object.assign(a.player,{x:800,z:800,grace:0});a.player.trail=[];
 const r=a.makeRider("Pilot",1,false,{x:0,z:200});Object.assign(r,{angle:0,grace:0,think:0,cooldown:99,length:120});r.trail=a.initialTrail(r);
 return {a,r};
}
test("bot prefers food ahead over a closer pellet behind and commits to the goal",()=>{
 const {a,r}=scene();a.addFood(-12,200,2);a.addFood(60,200,2);a.rebuildTrails();
 a.botControl(r,1/60);assert(r.target.x>0);const target={...r.target};
 a.addFood(30,210,2);a.time=0.2;r.think=0;a.botControl(r,1/60);
 assert.deepEqual(r.target,target);assert.equal(r.brain.intent,"forage");
});
test("bot turns early around a blocking wall instead of aiming through it",()=>{
 const {a,r}=scene();a.addFood(90,200,2);
 const wall=a.makeRider("Wall",2,false,{x:25,z:245});wall.angle=Math.PI/2;wall.grace=0;
 wall.trail=[];for(let z=155;z<=245;z+=2)wall.trail.push({x:25,z,y:0});
 a.rebuildTrails();const input=a.botControl(r,1/60);assert(Math.abs(angleDifference(input.angle,r.angle))>0.7);assert.equal(input.boost,false);
});
for(const mode of ["360","90"])test(`${mode}: bot avoids the boundary with a turn it can actually execute`,()=>{
 const {a,r}=scene(mode);Object.assign(r,{x:HALF-38,z:250,angle:0});r.trail=a.initialTrail(r);
 a.addFood(HALF-15,250,2);a.rebuildTrails();
 const c=a.botControl(r,1/60);assert(Math.abs(angleDifference(c.angle,0))>0.5);
 for(let i=0;i<120;i++)a.step(1/60);
 assert(r.alive);assert(r.x<HALF-8);
});
test("bot claims dropped energy deliberately and boosts only into a clear corridor",()=>{
 const {a,r}=scene();r.length=200;a.addFood(80,200,5);a.rebuildTrails();
 const c=a.botControl(r,1/60);assert.equal(r.brain.intent,"loot");assert.equal(c.boost,true);
});
