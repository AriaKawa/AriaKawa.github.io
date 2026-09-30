import { HALF, LANDMARKS, angleDifference, riderHeight, clamp } from "./simulation.mjs?v=pixel-freedom-1";

// Keyboard and touch steer. Holding the right mouse button unlocks the view.
export function steeringAxis(value) {
  return Math.sign(value) * clamp((Math.abs(value) - 0.12) / 0.88, 0, 1);
}
export function steeringTarget(heading, axis, dt) {
  return heading + clamp(axis, -1, 1) * 2.9 * dt;
}
export function relativeTurn(heading, side) {
  return Math.round(heading / (Math.PI / 2)) * (Math.PI / 2) + Math.sign(side) * Math.PI / 2;
}

export class ChaseCamera {
  constructor() { this.heading = 0; this.elevation = 0; this.boost = 0;this.orbitX=0;this.orbitY=0;this.pitch=0; }
  reset(rider) {
    this.heading = rider.angle;
    this.elevation = riderHeight(rider);
    this.pitch=rider.pitch||0;this.orbitX=this.orbitY=0;
    this.boost = 0;
  }
  update(rider, dt, { aspect = 1.6, lookBack = false, reducedMotion = false, orbit={x:0,y:0} } = {}) {
    dt = clamp(dt, 0, 0.1);
    this.heading += angleDifference(rider.angle, this.heading) * (1 - Math.exp(-dt * 14));
    this.elevation += (riderHeight(rider) - this.elevation) * (1 - Math.exp(-dt * 18));
    this.orbitX+=(clamp(orbit.x||0,-1,1)*.85-this.orbitX)*(1-Math.exp(-dt*7));
    this.orbitY+=(clamp(orbit.y||0,-1,1)-this.orbitY)*(1-Math.exp(-dt*7));
    this.pitch+=angleDifference(rider.pitch||0,this.pitch)*(1-Math.exp(-dt*18));
    this.boost += ((rider.boost && !reducedMotion ? 1 : 0) - this.boost) * (1 - Math.exp(-dt * 4));
    const heading = this.heading + (lookBack ? Math.PI : 0)+this.orbitX;
    const dx = Math.cos(heading), dz = Math.sin(heading);
    const portrait = aspect < 1;
    const inLoop=Number.isFinite(rider.loopS),underground=(rider.y||0)<-3;
    const distance = (inLoop?14:underground?17:portrait?31:25) + this.boost * (inLoop?0:3);
    let boom = distance;
    // Shorten the boom before entering the original reactor footprints.
    // This changes the view only; the original simulation owns collisions.
    for (const o of LANDMARKS) {
      if(Math.abs(rider.y||0)>12||inLoop)continue;
      const ox = rider.x - o.x, oz = rider.z - o.z, radius = o.r + 3;
      const projection = ox * dx + oz * dz;
      const discriminant = projection ** 2 - (ox * ox + oz * oz - radius ** 2);
      if (discriminant < 0) continue;
      const entry = projection - Math.sqrt(discriminant);
      const exit = projection + Math.sqrt(discriminant);
      if (exit > 0 && entry < boom) boom = Math.max(3, entry - 1);
    }
    const pitch=this.pitch,sin=Math.sin(pitch),cos=Math.cos(pitch);
    const height=(inLoop?9:underground?7:portrait?13:10.5)-this.orbitY*5;
    const yaw=this.heading+Math.PI/2;
    const upX=inLoop?0:-Math.cos(this.heading)*sin,upY=cos,upZ=inLoop?sin:-Math.sin(this.heading)*sin;
    const forward=inLoop?{x:Math.sin(yaw),y:sin*Math.cos(yaw),z:-cos*Math.cos(yaw)}:{x:Math.cos(this.heading)*cos,y:sin,z:Math.sin(this.heading)*cos};
    const side={x:forward.y*upZ-forward.z*upY,y:forward.z*upX-forward.x*upZ,z:forward.x*upY-forward.y*upX};
    const orbitAngle=this.orbitX+(lookBack?Math.PI:0),c=Math.cos(orbitAngle),s=Math.sin(orbitAngle);
    const fx=forward.x*c+side.x*s,fy=forward.y*c+side.y*s,fz=forward.z*c+side.z*s;
    return {
      x: clamp(rider.x-fx*boom+upX*height,-HALF+2,HALF-2),
      y: this.elevation-fy*boom+upY*height+(distance-boom)*.4,
      z: clamp(rider.z-fz*boom+upZ*height,-HALF+2,HALF-2),
      targetX: rider.x+fx*(inLoop?10:18)+upX*2.8,
      targetY: this.elevation+fy*(inLoop?10:18)+upY*(2.8-this.orbitY*2),
      targetZ: rider.z+fz*(inLoop?10:18)+upZ*2.8,
      upX,upY,upZ,
      fov: (portrait ? 76 : 68) + this.boost * 5,
    };
  }
}
