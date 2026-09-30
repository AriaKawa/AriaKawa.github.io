import * as THREE from '../grid-io/vendor/three.module.min.js';
import { surfaceUp, surfaceForward } from './terrain.mjs?v=pixel-freedom-1';

const point = new THREE.Vector3(), closest = new THREE.Vector3();
const triangle = new THREE.Triangle();
// Small volumes follow the tires, chassis and rider, including a raised front
// wheel. Empty space around the bike is not a single oversized crash box.
export function bikeSpheres(r, altitude = r.y || 0) {
  const scale = r.player ? 1.35 : 1.17, up = surfaceUp(r), f = surfaceForward(r);
  const tilt = (r.wheelie || 0) * .68, c = Math.cos(tilt), s = Math.sin(tilt);
  return [
    [-2.65,1.35,0,1.28], [2.65,1.35,0,1.28],
    [-1.3,1.85,0,.85], [0,1.85,0,.9], [1.25,1.85,0,.85],
    [-.9,2.8,0,.65], [-.35,3.5,0,.6], [.2,4.12,0,.62],
    [.7,2.9,-.85,.23], [.7,2.9,.85,.23],
  ].map(([x,y,z,radius]) => {
    const fx = ((x+2.65)*c-(y-1.35)*s-2.65)*scale;
    const uy = ((x+2.65)*s+(y-1.35)*c+1.35)*scale;
    const side = {x:f.y*up.z-f.z*up.y,y:f.z*up.x-f.x*up.z,z:f.x*up.y-f.y*up.x};
    return {x:r.x+f.x*fx+up.x*uy+side.x*z*scale,
      y:altitude+.06+f.y*fx+up.y*uy+side.y*z*scale,
      z:r.z+f.z*fx+up.z*uy+side.z*z*scale,radius:radius*scale};
  });
}
export function sphereTriangle(s, a, b, c) {
  triangle.set(a,b,c).closestPointToPoint(point.set(s.x,s.y,s.z),closest);
  return closest.distanceToSquared(point) < s.radius*s.radius;
}

// The collision triangles come from the same meshes (and instance transforms)
// shown on screen. The spatial index only selects candidates; it never kills.
export class MeshCollisionWorld {
  constructor(root) {
    this.cells = new Map(); this.size = 32;
    root.updateMatrixWorld(true);
    root.traverse(mesh => {
      if (!mesh.isMesh || mesh.userData.noCollision || /perimeter-|skyline-|orbital-/.test(mesh.name)) return;
      const matrix = new THREE.Matrix4(), instance = new THREE.Matrix4();
      const count = mesh.isInstancedMesh ? mesh.count : 1;
      const position = mesh.geometry.attributes.position, indices = mesh.geometry.index;
      for (let n=0;n<count;n++) {
        if (mesh.isInstancedMesh) {mesh.getMatrixAt(n,instance);matrix.multiplyMatrices(mesh.matrixWorld,instance);}
        else matrix.copy(mesh.matrixWorld);
        for(let i=0;i<(indices?.count||position.count);i+=3) {
          const vertices = [0,1,2].map(j=>new THREE.Vector3().fromBufferAttribute(position,indices?indices.getX(i+j):i+j).applyMatrix4(matrix));
          const bounds = new THREE.Box3().setFromPoints(vertices);
          const entry = {vertices,bounds,name:mesh.name,surface:mesh.userData.surface};
          for(let x=Math.floor(bounds.min.x/this.size);x<=Math.floor(bounds.max.x/this.size);x++)
            for(let z=Math.floor(bounds.min.z/this.size);z<=Math.floor(bounds.max.z/this.size);z++) {
              const key=x+','+z;if(!this.cells.has(key))this.cells.set(key,[]);this.cells.get(key).push(entry);
            }
        }
      }
    });
  }
  hit(r, spheres) {
    for(const s of spheres) {
      const visited=new Set();
      for(let x=Math.floor((s.x-s.radius)/this.size);x<=Math.floor((s.x+s.radius)/this.size);x++)
        for(let z=Math.floor((s.z-s.radius)/this.size);z<=Math.floor((s.z+s.radius)/this.size);z++)
          for(const t of this.cells.get(x+','+z)||[]) {
            if(visited.has(t))continue;visited.add(t);
            if(t.surface && !r.airborne && !r.jump && (t.surface===r.road || t.surface==='helix-loop'&&Number.isFinite(r.loopS)))continue;
            if(s.y+s.radius<t.bounds.min.y || s.y-s.radius>t.bounds.max.y)continue;
            if(sphereTriangle(s,...t.vertices))return t.name||'structure';
          }
    }
    return null;
  }
  sweep(r,before,after) {
    const travel=Math.max(...after.map((s,i)=>Math.hypot(s.x-before[i].x,s.y-before[i].y,s.z-before[i].z)));
    const steps=Math.max(1,Math.ceil(travel/.65));
    for(let i=1;i<=steps;i++) {
      const t=i/steps,pose=after.map((s,j)=>({x:before[j].x+(s.x-before[j].x)*t,y:before[j].y+(s.y-before[j].y)*t,z:before[j].z+(s.z-before[j].z)*t,radius:s.radius}));
      const hit=this.hit(r,pose);if(hit)return hit;
    }
    return null;
  }
}
