import { angleDifference, clamp, jumpHeight, JUMP_DURATION, HALF } from "../grid-io/simulation.mjs?v=speed-1";
import { ROADS, LOOP, roadById, roadCoordinates, roadPoint, loopPoint, terrainBlocked, updateSurface } from './terrain.mjs?v=neon-city-1';

const OFFSETS = [0, -0.35, 0.35, -0.8, 0.8, -1.45, 1.45];
const CARDINAL = [0, -Math.PI / 2, Math.PI / 2];

function chooseGoal(arena, r, brain) {
  const road=roadById(r.road);
  if(road) {
    const {s}=roadCoordinates(road,r.x,r.z),dir=(road.axis==='x'?Math.cos(r.angle):Math.sin(r.angle))>=0?1:-1;
    const p=roadPoint(road,s+dir*140);r.target={x:p.x,z:p.z};brain.intent='route';brain.goalUntil=arena.time+.9;return;
  }
  // Keep a destination long enough to make progress. Food behind the bike must
  // be worth the detour; otherwise nearest-pellet chasing creates endless loops.
  let target = null, best = -Infinity;
  const range = Math.max(130, r.speed * 2.5);
  for (const f of arena.foodHash.query(r.x, r.z, range, brain.food)) {
    if(f.availableAt>arena.time||Math.abs((f.y||0)-(r.y||0))>6)continue;
    const dx = f.x - r.x, dz = f.z - r.z, distance = Math.hypot(dx, dz);
    if (distance < 13 || distance > range || arena.blocked(f.x, f.z, 16)) continue;
    const turn = Math.abs(angleDifference(Math.atan2(dz, dx), r.angle));
    if (turn > 1.7) continue;
    const score = f.value * 16 - distance * 0.13 - turn * 25;
    if (score > best) { best = score; target = { x: f.x, z: f.z }; brain.intent = f.value >= 3 ? "loot" : "forage"; }
  }
  // Some riders attempt a lead/cutoff, rather than steering into a rival's head.
  if (r.length > 120 && r.id % 3 !== 0) {
    for (const rival of arena.riders) {
      if (rival === r || !rival.alive || rival.grace > 0) continue;
      const distance = Math.hypot(rival.x-r.x, rival.z-r.z);
      if (distance < 45 || distance > 135) continue;
      const lead = clamp(distance / Math.max(20, r.speed), 0.7, 1.4);
      const x = rival.x + Math.cos(rival.angle) * (rival.speed * lead + 13);
      const z = rival.z + Math.sin(rival.angle) * (rival.speed * lead + 13);
      const turn = Math.abs(angleDifference(Math.atan2(z-r.z,x-r.x),r.angle));
      if (turn > 0.65 || arena.blocked(x,z,25) || arena.trailAt(r,x,z,7,0)) continue;
      // Don't abandon a rich elimination drop to pick a fight.
      if (brain.intent !== "loot" && r.length > rival.length * 0.65) {
        target = {x,z}; brain.intent = "cutoff"; break;
      }
    }
  }
  if (!target) {
    const turn = Math.abs(r.x) > HALF-160 || Math.abs(r.z) > HALF-160
      ? Math.atan2(-r.z,-r.x) : r.angle + (arena.random()-0.5)*0.9;
    target = {x:r.x+Math.cos(turn)*180,z:r.z+Math.sin(turn)*180};
    brain.intent = "cruise";
  }
  // Riders use entrances instead of trying to collect an elevated pickup from below.
  if(r.id%4===0)for(const route of [...ROADS,LOOP]) {
    const length=route===LOOP?LOOP.length:route.end-route.start;
    for(const s of [0,length]) {
      const p=route===LOOP?loopPoint(s):roadPoint(route,s),distance=Math.hypot(p.x-r.x,p.z-r.z);
      if(distance<140&&distance>8&&Math.cos(Math.atan2(p.z-r.z,p.x-r.x)-r.angle)>.8) {
        const q=route===LOOP?loopPoint(s===0?18:length-18):roadPoint(route,s===0?18:length-18);
        target={x:q.x,z:q.z};brain.intent='route';
      }
    }
  }
  r.target = target;
  brain.goalUntil = arena.time + 0.9 + (r.id % 5)*0.12;
}

// Roll out the actual turn-limited path instead of testing impossible straight
// rays in ten directions. High-speed checks are spaced closely enough for walls.
function probe(arena, r, targetAngle, speed, jumping = false) {
  const horizon = 1.45, steps = Math.max(13, Math.ceil(speed * horizon / 5));
  const dt = horizon / steps;
  let x=r.x,z=r.z,angle=r.angle,clear=0;
  const surface={x,z,y:r.y||0,pitch:r.pitch||0,angle,road:r.road};
  for(let i=0;i<steps;i++) {
    angle = arena.mode === "90" ? targetAngle : angle + clamp(angleDifference(targetAngle,angle),-2.9*dt,2.9*dt);
    x+=Math.cos(angle)*speed*dt; z+=Math.sin(angle)*speed*dt;
    if(arena.blocked(x,z,7)) break;
    if(terrainBlocked(surface,x,z,4.8))break;
    Object.assign(surface,{x,z,angle});updateSurface(surface);
    const remaining = jumping ? JUMP_DURATION-(i+1)*dt : Math.max(0,r.jump-(i+1)*dt);
    const altitude = surface.y+jumpHeight({jump:Math.max(0,remaining)});
    if(arena.trailAt(r,x,z,4.4,altitude)) break;
    // A live rival is a moving source of new laser. Give their nose room.
    let crowded=false;
    for(const other of r.brain.nearby) {
      const t=(i+1)*dt;
      const ox=other.x+Math.cos(other.angle)*other.speed*t;
      const oz=other.z+Math.sin(other.angle)*other.speed*t;
      if(Math.abs((other.y||0)-surface.y)<6&&(x-ox)**2+(z-oz)**2<11**2) { crowded=true; break; }
    }
    if(crowded) break;
    clear=(i+1)*dt;
  }
  return {clear,x,z};
}

export function botControl(arena, r, dt) {
  if(Number.isFinite(r.loopS))return {angle:r.angle,boost:false,steer:0};
  r.think -= dt;
  if (!r.brain) r.brain = {food:[],nearby:[],goalUntil:0,intent:"forage",side:0,control:{angle:r.angle,boost:false}};
  const brain=r.brain;
  if(r.think>0) return brain.control;
  r.think=0.14+(r.id%5)*0.012;
  if(!r.target || arena.time>=brain.goalUntil || Math.hypot(r.x-r.target.x,r.z-r.target.z)<13) chooseGoal(arena,r,brain);
  brain.nearby.length=0;
  for(const other of arena.riders) if(other!==r&&other.alive&&Math.hypot(other.x-r.x,other.z-r.z)<110) brain.nearby.push(other);
  const want=Math.atan2(r.target.z-r.z,r.target.x-r.x);
  const speed=29*arena.speedMultiplier;
  const offsets=arena.mode==="90"?CARDINAL:OFFSETS;
  let choice=r.angle,best=-Infinity,bestClear=0;
  for(const offset of offsets) {
    const angle=r.angle+offset, path=probe(arena,r,angle,speed);
    const alignment=Math.abs(angleDifference(want,angle));
    const switching=brain.side && Math.sign(offset) && Math.sign(offset)!==brain.side ? 1.8 : 0;
    const score=(path.clear<1.44?-1000+path.clear*350:100)-alignment*12-Math.abs(offset)*2-switching;
    if(score>best) {best=score;choice=angle;bestClear=path.clear;}
  }
  let jump=false;
  if(bestClear<0.85&&r.cooldown<=0&&r.jump<=0) {
    for(const offset of offsets) {
      const angle=r.angle+offset,path=probe(arena,r,angle,speed*1.08,true);
      if(path.clear>bestClear+0.35) {choice=angle;bestClear=path.clear;jump=true;}
    }
  }
  const side=Math.sign(angleDifference(choice,r.angle));
  if(side) brain.side=side;
  let boost=false;
  if(bestClear>=1.44&&r.length>100&&(brain.intent==="cutoff"||brain.intent==="loot")&&Math.abs(angleDifference(choice,r.angle))<0.4) {
    boost=probe(arena,r,choice,speed*1.72).clear>=1.44;
  }
  brain.control={angle:choice,boost,jump};
  r.desired=choice; r.wantsBoost=boost;
  // Jump is a one-shot decision, not repeated every simulation tick.
  if(jump) arena.jump(r);
  brain.control.jump=false;
  return brain.control;
}
