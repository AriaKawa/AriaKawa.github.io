import * as THREE from "../grid-io/vendor/three.module.min.js";
import { COLORS, riderHeight } from "./simulation.mjs?v=neon-city-1";

// Far riders keep a readable bike/rider silhouette without rendering every
// wheel spoke, armor plate, and suspension piece in dozens of separate draws.
export class DistantBikes extends THREE.Group {
  constructor(capacity=48) {
    super(); this.name="distant-riders"; this.count=0;
    this.root=new THREE.Object3D(); this.part=new THREE.Object3D(); this.matrix=new THREE.Matrix4();
    this.palette=COLORS.map(c=>new THREE.Color(c));
    const dark=new THREE.MeshLambertMaterial({color:0x24202a});
    const glow=new THREE.MeshBasicMaterial({color:0xffffff,toneMapped:false});
    this.parts=[
      {geo:new THREE.BoxGeometry(6.5,1.4,1.4),mat:dark,pos:[0,1.9,0]},
      {geo:new THREE.CylinderGeometry(1.25,1.25,0.7,8).rotateX(Math.PI/2),mat:dark,pos:[2.65,1.35,0]},
      {geo:new THREE.CylinderGeometry(1.25,1.25,0.7,8).rotateX(Math.PI/2),mat:dark,pos:[-2.65,1.35,0]},
      {geo:new THREE.BoxGeometry(1.2,1.6,1.1),mat:dark,pos:[-0.3,3.1,0]},
      {geo:new THREE.IcosahedronGeometry(0.65,0),mat:dark,pos:[0.2,4.15,0]},
      {geo:new THREE.BoxGeometry(5.9,0.22,1.55),mat:glow,pos:[0,2.65,0]},
    ];
    for(const part of this.parts) {
      part.mesh=new THREE.InstancedMesh(part.geo,part.mat,capacity);
      part.mesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
      part.mesh.frustumCulled=false; part.mesh.count=0; this.add(part.mesh);
    }
  }
  begin() { this.count=0; }
  rider(r) {
    const i=this.count++; this.root.position.set(r.x,riderHeight(r),r.z);
    this.root.rotation.set(0,-r.angle,r.pitch||0,'YXZ'); this.root.scale.setScalar(1.17); this.root.updateMatrix();
    for(const part of this.parts) {
      this.part.position.fromArray(part.pos); this.part.updateMatrix();
      this.matrix.multiplyMatrices(this.root.matrix,this.part.matrix); part.mesh.setMatrixAt(i,this.matrix);
      if(part===this.parts[5]) part.mesh.setColorAt(i,this.palette[r.skin]);
    }
  }
  finish() {
    for(const part of this.parts) {
      part.mesh.count=this.count; part.mesh.instanceMatrix.needsUpdate=true;
      if(part.mesh.instanceColor)part.mesh.instanceColor.needsUpdate=true;
    }
  }
}
