import * as THREE from '../grid-io/vendor/three.module.min.js';
import {ROADS,LOOP,GROUND_CUTS,roadPoint,loopPoint} from './terrain.mjs?v=pixel-freedom-1';
import {materialTextures} from './textures.js?v=pixel-freedom-1';

const upAt=p=>new THREE.Vector3(-Math.cos(p.angle)*Math.sin(p.pitch),Math.cos(p.pitch),-Math.sin(p.angle)*Math.sin(p.pitch));
function roadGeometry(sample,length,width) {
  const positions=[],uv=[],indices=[],steps=Math.ceil(length/5);
  for(let i=0;i<=steps;i++) {
    const p=sample(length*i/steps),side=new THREE.Vector3(-Math.sin(p.angle),0,Math.cos(p.angle));
    for(const sign of [-1,1]){positions.push(p.x+side.x*width/2*sign,p.y+.04,p.z+side.z*width/2*sign);uv.push(sign<0?0:2,length*i/steps/24);}
    if(i<steps){const j=i*2;indices.push(j,j+2,j+1,j+1,j+2,j+3);}
  }
  const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.Float32BufferAttribute(positions,3));g.setAttribute('uv',new THREE.Float32BufferAttribute(uv,2));g.setIndex(indices);g.computeVertexNormals();return g;
}
export function buildTerrain(scene) {
  const textures=materialTextures(),root=new THREE.Group();root.name='transit-network';scene.add(root);
  const shape=new THREE.Shape();shape.moveTo(-1200,-1200);shape.lineTo(1200,-1200);shape.lineTo(1200,1200);shape.lineTo(-1200,1200);shape.closePath();
  for(const h of GROUND_CUTS){const hole=new THREE.Path();hole.moveTo(h.x0,-h.z0);hole.lineTo(h.x0,-h.z1);hole.lineTo(h.x1,-h.z1);hole.lineTo(h.x1,-h.z0);hole.closePath();shape.holes.push(hole);}
  const ground=new THREE.ShapeGeometry(shape).rotateX(-Math.PI/2),position=ground.attributes.position;
  for(let i=0;i<position.count;i++)ground.attributes.uv.setXY(i,position.getX(i)/48,position.getZ(i)/48);
  const floor=new THREE.Mesh(ground,new THREE.MeshStandardMaterial({map:textures.floor,bumpMap:textures.relief,bumpScale:.22,roughness:.63,metalness:.48,color:0xaabcc6,side:THREE.DoubleSide}));
  floor.name='textured-ground-with-open-ramps';floor.userData.surface='ground';floor.position.y=-.14;root.add(floor);
  const steel=new THREE.MeshStandardMaterial({map:textures.metal,color:0x617784,roughness:.37,metalness:.72});
  const concrete=new THREE.MeshStandardMaterial({map:textures.road,bumpMap:textures.roadRelief,bumpScale:.25,color:0x5c7484,roughness:.85,metalness:.1});
  const glow=new THREE.MeshBasicMaterial({color:0xffffff,toneMapped:false});
  const structure=[],lights=[],walls=[];
  const object=new THREE.Object3D(),axis=new THREE.Vector3(1,0,0);
  function bar(list,a,b,width,height,color=0xffffff) {
    const start=new THREE.Vector3(a.x,a.y,a.z),end=new THREE.Vector3(b.x,b.y,b.z),delta=end.clone().sub(start),len=delta.length();
    if(len<.001)return;
    object.position.copy(start.add(end).multiplyScalar(.5));object.quaternion.setFromUnitVectors(axis,delta.normalize());object.scale.set(len,height,width);object.updateMatrix();
    list.push({matrix:object.matrix.clone(),color});
  }
  function box(list,x,y,z,sx,sy,sz,color=0xffffff) {object.position.set(x,y,z);object.rotation.set(0,0,0);object.scale.set(sx,sy,sz);object.updateMatrix();list.push({matrix:object.matrix.clone(),color});}
  function at(p,lateral=0,height=0) {
    const up=upAt(p);return {x:p.x-Math.sin(p.angle)*lateral+up.x*height,y:p.y+up.y*height,z:p.z+Math.cos(p.angle)*lateral+up.z*height};
  }
  function sign(text,sub,color,p,angle) {
    for(const side of [-1,1]) {
      const x=p.x-Math.sin(angle)*side*17,z=p.z+Math.cos(angle)*side*17;
      box(structure,x,p.y+10,z,.75,20,.75);
      box(lights,x,p.y+7,z,.18,12,.85,color);
    }
    bar(structure,{x:p.x+Math.sin(angle)*17,y:p.y+20,z:p.z-Math.cos(angle)*17},{x:p.x-Math.sin(angle)*17,y:p.y+20,z:p.z+Math.cos(angle)*17},1.2,1.2);
    const c=document.createElement('canvas');c.width=512;c.height=160;const ctx=c.getContext('2d');
    ctx.fillStyle='#07151eea';ctx.fillRect(0,0,512,160);ctx.strokeStyle='#'+color.toString(16).padStart(6,'0');ctx.lineWidth=6;ctx.strokeRect(3,3,506,154);
    ctx.fillStyle=ctx.strokeStyle;ctx.font='bold 35px sans-serif';ctx.textAlign='center';ctx.fillText(text,256,65);ctx.font='20px monospace';ctx.fillStyle='#bdd4df';ctx.fillText(sub,256,109);
    const map=new THREE.CanvasTexture(c);map.colorSpace=THREE.SRGBColorSpace;
    const mesh=new THREE.Mesh(new THREE.PlaneGeometry(31,9.7),new THREE.MeshBasicMaterial({map,side:THREE.DoubleSide,toneMapped:false}));
    mesh.position.set(p.x,p.y+16,p.z);mesh.rotation.y=-angle-Math.PI/2;mesh.name=text;root.add(mesh);
  }
  for(const road of [...ROADS,LOOP]) {
    const loop=road===LOOP,length=loop?LOOP.length:road.end-road.start,sample=s=>loop?loopPoint(s):roadPoint(road,s),width=road.width;
    const material=new THREE.MeshStandardMaterial({map:textures.road,bumpMap:textures.roadRelief,bumpScale:.16,color:0x99adba,roughness:.46,metalness:.56,side:THREE.DoubleSide});
    const deck=new THREE.Mesh(roadGeometry(sample,length,width),material);deck.name=road.id+'-drivable-surface';deck.userData.surface=road.id;root.add(deck);
    const segmentStep=loop?4:8;
    for(let s=0;s<length;s+=segmentStep) {
      const a=sample(s),b=sample(Math.min(length,s+segmentStep));
      for(const side of [-1,1]) {
        bar(structure,at(a,side*width/2,-.7),at(b,side*width/2,-.7),1.2,1.8);
        bar(structure,at(a,side*(width/2-.4),1.3),at(b,side*(width/2-.4),1.3),.6,.7);
        bar(lights,at(a,side*(width/2-.35),1.75),at(b,side*(width/2-.35),1.75),.3,.24,road.color);
        if(Math.floor(s/8)%4===0)bar(structure,at(a,side*(width/2-.4),0),at(a,side*(width/2-.4),1.7),.5,.5);
      }
      if(Math.floor(s/8)%3===0)bar(lights,at(a,0,.08),at(b,0,.08),.24,.07,0x8da3b1);
      if(!loop&&road.kind==='tunnel') {
        const height=Math.max(1,-(a.y+b.y)/2);
        for(const side of [-1,1]) {
          const mid=at(sample(Math.min(length,s+4)),side*(width/2+.6));
          box(walls,mid.x,mid.y+height/2,mid.z,8.2,height,1.2);
        }

      }
    }
    if(!loop&&road.kind==='bridge') {
      for(let s=road.ramp+60;s<length-road.ramp;s+=140) {
        const p=sample(s);
        for(const side of [-1,1]){const q=at(p,side*13);box(structure,q.x,p.y/2-1,q.z,3,p.y-2,3);box(walls,q.x,.8,q.z,6,1.6,6);}
        bar(structure,at(p,-width/2,-2),at(p,width/2,-2),2,2);
      }
    }
    if(loop)for(let s=LOOP.approach+25;s<LOOP.approach+LOOP.circle;s+=34) {
      const p=sample(s);if(p.y<6)continue;
      for(const side of [-1,1]) {
        const q={x:side<0?LOOP.x-width/2-5:LOOP.x+LOOP.drift+width/2+5,y:p.y,z:p.z};
        bar(structure,{x:q.x,y:0,z:q.z},q,1.3,1.3);
      }
    }
    const first=sample(5),last=sample(length-5);
    sign(loop?'HELIX // 360':road.name.toUpperCase(),loop?'MAGNETIC LOOP  •  FOLLOW THE LIGHT':road.kind==='tunnel'?'DESCENT  /  THROUGH ROUTE':'ELEVATED TRANSIT  /  BOTH DIRECTIONS',road.color,first,first.angle);
    if(!loop)sign(road.name.toUpperCase(),road.kind==='tunnel'?'DESCENT  /  THROUGH ROUTE':'ELEVATED TRANSIT  /  BOTH DIRECTIONS',road.color,last,last.angle);
  }
  function batch(list,material,name,colored=false) {
    const mesh=new THREE.InstancedMesh(new THREE.BoxGeometry(1,1,1),material,list.length);
    for(let i=0;i<list.length;i++){mesh.setMatrixAt(i,list[i].matrix);if(colored)mesh.setColorAt(i,new THREE.Color(list[i].color));}
    mesh.name=name;mesh.computeBoundingSphere();root.add(mesh);return mesh;
  }
  batch(structure,steel,'transit-rails-and-supports');batch(walls,concrete,'tunnel-retaining-walls');
  batch(lights,glow,'transit-neon-and-lane-markings',true).userData.noCollision=true;
  return root;
}
