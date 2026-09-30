// Shared geometry and riding surfaces. Height is world-space, including below ground.
export const ROADS = [
  { id:'skyway-east', name:'Cyan Skyway', axis:'x', cross:-210, start:-1080, end:1080, ramp:260, height:32, width:38, color:0x35ddff, kind:'bridge' },
  { id:'skyway-north', name:'Amber Flyover', axis:'z', cross:260, start:-1080, end:1080, ramp:320, height:54, width:38, color:0xffb84a, kind:'bridge' },
  { id:'underpass-south', name:'Violet Underpass', axis:'x', cross:310, start:-720, end:720, ramp:250, height:-24, width:34, color:0xaf79ff, kind:'tunnel' },
  { id:'underpass-north', name:'Cyan Underpass', axis:'x', cross:-590, start:-760, end:760, ramp:250, height:-24, width:34, color:0x35ddff, kind:'tunnel' },
];
export const LOOP = { id:'helix-loop', name:'Helix Loop', x:710, z:735, radius:32, drift:44, approach:80, exit:100, width:26, color:0xff64df };
LOOP.circle = Math.hypot(2*Math.PI*LOOP.radius, LOOP.drift);
LOOP.length = LOOP.approach + LOOP.circle + LOOP.exit;
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
const smooth=t=>t*t*(3-2*t);
export const roadById=id=>ROADS.find(road=>road.id===id);
export function roadCoordinates(road,x,z) {
  return {s:(road.axis==='x'?x:z)-road.start, lateral:(road.axis==='x'?z:x)-road.cross};
}
export function roadProfile(road,s) {
  const length=road.end-road.start, edge=Math.min(s,length-s), t=clamp(edge/road.ramp,0,1);
  return {y:road.height*smooth(t), slope:road.height*6*t*(1-t)/road.ramp*(s<length/2?1:-1)};
}
export function roadPoint(road,s,lateral=0) {
  const {y,slope}=roadProfile(road,s);
  return {x:road.axis==='x'?road.start+s:road.cross+lateral,y,z:road.axis==='x'?road.cross+lateral:road.start+s,pitch:Math.atan(slope),angle:road.axis==='x'?0:Math.PI/2};
}
export function loopPoint(s,lane=0) {
  s=clamp(s,0,LOOP.length);
  if(s<LOOP.approach) return {x:LOOP.x+lane,y:0,z:LOOP.z-s,pitch:0,angle:-Math.PI/2};
  if(s>LOOP.approach+LOOP.circle) return {x:LOOP.x+LOOP.drift+lane,y:0,z:LOOP.z-LOOP.approach-(s-LOOP.approach-LOOP.circle),pitch:Math.PI*2,angle:-Math.PI/2};
  const t=(s-LOOP.approach)/LOOP.circle, pitch=t*Math.PI*2;
  return {x:LOOP.x+LOOP.drift*smooth(t)+lane,y:LOOP.radius*(1-Math.cos(pitch)),z:LOOP.z-LOOP.approach-LOOP.radius*Math.sin(pitch),pitch,angle:-Math.PI/2};
}
export const GROUND_CUTS=ROADS.filter(r=>r.kind==='tunnel').flatMap(r=>[
  {x0:r.start,x1:r.start+r.ramp,z0:r.cross-r.width/2,z1:r.cross+r.width/2},
  {x0:r.end-r.ramp,x1:r.end,z0:r.cross-r.width/2,z1:r.cross+r.width/2},
]);
export const inGroundCut=(x,z,pad=0)=>GROUND_CUTS.some(h=>x>h.x0-pad&&x<h.x1+pad&&z>h.z0-pad&&z<h.z1+pad);
export function surfaceUp(r) {
  const pitch=r.pitch||0;
  return {x:-Math.cos(r.angle)*Math.sin(pitch),y:Math.cos(pitch),z:-Math.sin(r.angle)*Math.sin(pitch)};
}
export function terrainBlocked(r,x,z,pad=0) {
  for(const road of ROADS) {
    const {s,lateral}=roadCoordinates(road,x,z);
    if(s<0||s>road.end-road.start)continue;
    if(r.road===road.id) {
      if(Math.abs(lateral)>road.width/2-pad)return true;
    } else if(Math.abs(lateral)<road.width/2+pad&&Math.abs(r.y||0)<7) {
      const {y}=roadProfile(road,s);
      // Side entry to a deep open trench or the solid foot of a ramp is unsafe.
      if(road.kind==='tunnel' && inGroundCut(x,z) && y<-2)return true;
      if(road.kind==='bridge' && y>2 && y<7)return true;
    }
  }
  for(const road of ROADS)if(road.kind==='bridge'&&r.road!==road.id&&(r.y||0)>-4&&(r.y||0)<road.height-4) {
    if(Math.abs((road.axis==='x'?z:x)-road.cross)>20+pad)continue;
    for(let s=road.ramp+60;s<road.end-road.start-road.ramp;s+=140) {
      const p=roadPoint(road,s);
      for(const side of [-1,1]) {
        const px=p.x-Math.sin(p.angle)*side*13,pz=p.z+Math.cos(p.angle)*side*13;
        if(Math.abs(x-px)<2+pad&&Math.abs(z-pz)<2+pad)return true;
      }
    }
  }
  return false;
}
export function updateSurface(r) {
  if(Number.isFinite(r.loopS))return;
  let road=roadById(r.road);
  if(!road) {
    road=ROADS.find(candidate=>{
      const {s,lateral}=roadCoordinates(candidate,r.x,r.z);
      return s>=0&&s<=candidate.end-candidate.start&&Math.abs(lateral)<candidate.width/2-2&&Math.abs(roadProfile(candidate,s).y)<1.4;
    });
    if(road)r.road=road.id;
  }
  if(road) {
    const {s,lateral}=roadCoordinates(road,r.x,r.z);
    if(s<0||s>road.end-road.start) {r.road=null;r.y=0;r.pitch=0;r.hitRail=false;return;}
    // Guardrails contain the deck; there is no invisible fall through the floor.
    const lane=clamp(lateral,-road.width/2+2.5,road.width/2-2.5);
    r.hitRail=Math.abs(lateral)>road.width/2-2.3;
    if(road.axis==='x')r.z=road.cross+lane;else r.x=road.cross+lane;
    const {y,slope}=roadProfile(road,s);
    r.y=y;r.pitch=Math.atan(slope*(road.axis==='x'?Math.cos(r.angle):Math.sin(r.angle)));
  } else {r.y=0;r.pitch=0;r.hitRail=false;}
}
export function advanceLoop(r,dt,steer=0) {
  if(!Number.isFinite(r.loopS)) {
    for(const [s,dir] of [[0,1],[LOOP.length,-1]]) {
      const p=loopPoint(s),heading=p.angle+(dir<0?Math.PI:0);
      if(Math.hypot(r.x-p.x,r.z-p.z)<9&&Math.cos(r.angle-heading)>0.65) {
        r.loopS=s;r.loopDir=dir;r.loopLane=clamp(r.x-p.x,-8,8);r.road=null;break;
      }
    }
    if(!Number.isFinite(r.loopS))return false;
  }
  r.loopS+=r.speed*dt*r.loopDir;
  r.loopLane=clamp((r.loopLane||0)+steer*r.speed*dt*0.28*r.loopDir,-LOOP.width/2+3,LOOP.width/2-3);
  const p=loopPoint(r.loopS,r.loopLane);
  Object.assign(r,{x:p.x,y:p.y,z:p.z,angle:p.angle+(r.loopDir<0?Math.PI:0),pitch:p.pitch*r.loopDir});
  if(r.loopS<0||r.loopS>LOOP.length) {r.loopS=null;r.pitch=0;}
  return true;
}
