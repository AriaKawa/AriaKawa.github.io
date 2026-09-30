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
  if(Number.isFinite(r.loopS)) {
    const p=loopPoint(r.loopS);return {x:0,y:Math.cos(p.pitch),z:Math.sin(p.pitch)};
  }
  const pitch=r.pitch||0;
  return {x:-Math.cos(r.angle)*Math.sin(pitch),y:Math.cos(pitch),z:-Math.sin(r.angle)*Math.sin(pitch)};
}
export function surfaceForward(r) {
  if(Number.isFinite(r.loopS)) {
    const p=loopPoint(r.loopS),yaw=r.angle+Math.PI/2;
    return {x:Math.sin(yaw),y:Math.sin(p.pitch)*Math.cos(yaw),z:-Math.cos(p.pitch)*Math.cos(yaw)};
  }
  return {x:Math.cos(r.angle)*Math.cos(r.pitch||0),y:Math.sin(r.pitch||0),z:Math.sin(r.angle)*Math.cos(r.pitch||0)};
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
  if(Number.isFinite(r.loopS)||r.airborne)return;
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
    // Steering never clamps to a lane. The visible rail handles contact; a
    // rider clearing it can leave the deck and fall to the surface below.
    if(Math.abs(lateral)>road.width/2) {
      const lift=r.jump>0?Math.sin(Math.PI*(1-r.jump/1.05))*10.5:0;
      const vy=r.jump>0?Math.cos(Math.PI*(1-r.jump/1.05))*Math.PI*10.5/1.05:0;
      r.y+=lift;r.jump=0;r.airborne={vy};r.road=null;r.pitch=0;return;
    }
    r.hitRail=false;
    const {y,slope}=roadProfile(road,s);
    r.y=y;r.pitch=Math.atan(slope*(road.axis==='x'?Math.cos(r.angle):Math.sin(r.angle)));
  } else {r.y=0;r.pitch=0;r.hitRail=false;}
}
export function advanceLoop(r,dt,steer=0) {
  if(r.airborne||r.jump>0)return false;
  if(!Number.isFinite(r.loopS)) {
    for(const [s,dir] of [[0,1],[LOOP.length,-1]]) {
      const p=loopPoint(s),heading=p.angle+(dir<0?Math.PI:0);
      if(Math.abs(r.y||0)<1&&Math.hypot(r.x-p.x,r.z-p.z)<5&&Math.cos(r.angle-heading)>0.65) {
        r.loopS=s;r.loopDir=dir;r.loopLane=r.x-p.x;r.loopPivotS=null;r.road=null;break;
      }
    }
    if(!Number.isFinite(r.loopS))return false;
  }
  const yaw=r.angle+Math.PI/2;
  const offset=2.65*(r.player?1.35:1.17);
  if(r.wheelieActive) {
    if(!Number.isFinite(r.loopPivotS)) {
      const previousYaw=(r.previousAngle??r.angle)+Math.PI/2;
      r.loopPivotS=r.loopS-Math.cos(previousYaw)*offset;
      r.loopPivotLane=(r.loopLane||0)-Math.sin(previousYaw)*offset;
    }
    r.loopPivotS+=r.speed*dt*Math.cos(yaw);r.loopPivotLane+=r.speed*dt*Math.sin(yaw);
    r.loopS=r.loopPivotS+Math.cos(yaw)*offset;r.loopLane=r.loopPivotLane+Math.sin(yaw)*offset;
  } else {
    r.loopPivotS=null;r.loopS+=r.speed*dt*Math.cos(yaw);
    r.loopLane=(r.loopLane||0)+r.speed*dt*Math.sin(yaw);
  }
  const p=loopPoint(r.loopS,r.loopLane);
  Object.assign(r,{x:p.x,y:p.y,z:p.z,pitch:p.pitch});
  if(r.wheelieActive) {const f=surfaceForward(r);r.pivotX=r.x-f.x*offset;r.pivotZ=r.z-f.z*offset;}
  if(Math.abs(r.loopLane)>LOOP.width/2) {
    const f=surfaceForward(r);r.airborne={vy:f.y*r.speed,vx:f.x*r.speed,vz:f.z*r.speed,pitch:r.pitch,angle:r.angle,time:0};r.loopS=null;
  } else if(r.loopS<0||r.loopS>LOOP.length) {r.loopS=null;r.pitch=0;}
  return true;
}

export function advanceAirborne(r,dt) {
  if(!r.airborne)return false;
  const a=r.airborne,oldY=r.y;
  // The same steering input works in the air, including after leaving a loop.
  if(Number.isFinite(a.vx)) {
    const turn=r.angle-a.angle,c=Math.cos(turn),s=Math.sin(turn),vx=a.vx;
    a.vx=vx*c-a.vz*s;a.vz=vx*s+a.vz*c;a.angle=r.angle;
    r.x+=a.vx*dt;r.z+=a.vz*dt;
  } else {r.x+=Math.cos(r.angle)*r.speed*dt;r.z+=Math.sin(r.angle)*r.speed*dt;}
  a.time=(a.time||0)+dt;a.vy-=32*dt;r.y+=a.vy*dt;
  r.pitch=(a.pitch||0)*Math.max(0,1-a.time/.7);
  let height=inGroundCut(r.x,r.z)?-Infinity:0,landing=null;
  for(const road of ROADS) {
    const {s,lateral}=roadCoordinates(road,r.x,r.z);
    if(s<0||s>road.end-road.start||Math.abs(lateral)>road.width/2)continue;
    const y=roadProfile(road,s).y;
    if(y<=oldY+.1 && y>height){height=y;landing=road;}
    if(road.kind==='tunnel'&&oldY<0){height=y;landing=road;}
  }
  if(a.vy<=0&&r.y<=height&&oldY>=height-.1) {
    r.y=height;r.airborne=null;r.road=landing?.id||null;updateSurface(r);
  }
  return true;
}
