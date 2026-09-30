import * as THREE from '../vendor/three.module.min.js';
let cache;
// Small, deterministic material maps: no runtime downloads or large texture packs.
export function materialTextures() {
  if(cache)return cache;
  if(typeof document==='undefined')return {};
  let seed=8431;
  const random=()=>{seed=(seed*1664525+1013904223)>>>0;return seed/4294967296;};
  function texture(kind,size=512) {
    const canvas=document.createElement('canvas');canvas.width=canvas.height=size;
    const c=canvas.getContext('2d');
    c.fillStyle=kind==='floor'?'#34414b':kind==='road'?'#263540':kind==='carbon'?'#697178':kind==='rubber'?'#50575b':'#969fa5';c.fillRect(0,0,size,size);
    for(let i=0;i<10000;i++) {
      const v=Math.floor(random()*100);c.fillStyle=`rgba(${v+110},${v+117},${v+124},${kind==='metal'?.12:.065})`;
      c.fillRect(random()*size,random()*size,kind==='metal'?10+random()*60:1+random()*3,1);
    }
    if(kind==='floor'||kind==='road') {
      const step=kind==='floor'?128:256;
      for(let x=0;x<size;x+=step)for(let y=0;y<size;y+=128) {
        c.fillStyle='#0f1d28';c.fillRect(x,y,step,4);c.fillRect(x,y,3,128);
        c.strokeStyle='#5b6b76';c.lineWidth=1;c.strokeRect(x+5,y+6,step-12,115);
        c.strokeStyle='#202c36';c.strokeRect(x+10,y+11,step-22,105);
        for(const dx of [12,step-13])for(const dy of [14,113]) {
          c.fillStyle='#14222d';c.beginPath();c.arc(x+dx,y+dy,2.5,0,Math.PI*2);c.fill();
          c.fillStyle='#91a1aa';c.fillRect(x+dx-1,y+dy-1,2,1);
        }
        c.fillStyle='#73868d';c.font='8px monospace';c.fillText(kind==='floor'?'SECTOR // 09':'MAG-RAIL //',x+19,y+23);
        c.fillStyle='#112630';for(let k=0;k<6;k++)c.fillRect(x+19+k*5,y+29,2,8);
      }
      c.strokeStyle=kind==='floor'?'#316679':'#708e9a';c.lineWidth=2;c.strokeRect(1,1,size-2,size-2);
      // Tread scuffs and short machining marks, subtle enough to keep hazards legible.
      for(let i=0;i<180;i++){c.strokeStyle=`rgba(5,15,24,${random()*.25})`;c.beginPath();const x=random()*size,y=random()*size;c.moveTo(x,y);c.lineTo(x+8+random()*40,y+random()*3);c.stroke();}
    } else if(kind==='carbon') {
      for(let x=0;x<size;x+=8)for(let y=0;y<size;y+=8){c.fillStyle=(x+y)%16?'#48525a':'#7b858c';c.fillRect(x,y,6,3);c.fillStyle='#252f38';c.fillRect(x+4,y+4,3,6);}
    } else if(kind==='rubber') {
      c.strokeStyle='#1b252b';c.lineWidth=7;
      for(let y=-size;y<size*2;y+=24){c.beginPath();c.moveTo(0,y);c.lineTo(size/2,y+45);c.lineTo(size,y);c.stroke();}
    }
    const map=new THREE.CanvasTexture(canvas);map.colorSpace=THREE.SRGBColorSpace;map.wrapS=map.wrapT=THREE.RepeatWrapping;map.anisotropy=4;
    return map;
  }
  cache={floor:texture('floor'),road:texture('road'),metal:texture('metal',256),carbon:texture('carbon',256),rubber:texture('rubber',256)};
  cache.relief=cache.floor.clone();cache.relief.colorSpace=THREE.NoColorSpace;
  cache.roadRelief=cache.road.clone();cache.roadRelief.colorSpace=THREE.NoColorSpace;
  return cache;
}
export function reflectionEnvironment() {
  const faces=[];
  for(let face=0;face<6;face++) {
    const c=document.createElement('canvas');c.width=c.height=128;const ctx=c.getContext('2d'),g=ctx.createLinearGradient(0,0,0,128);
    g.addColorStop(0,'#728c9c');g.addColorStop(.47,'#293f53');g.addColorStop(.52,'#8b9ba5');g.addColorStop(1,'#07111e');ctx.fillStyle=g;ctx.fillRect(0,0,128,128);
    if(face!==3){ctx.fillStyle=face%2?'#3c9ba8':'#b69c80';ctx.fillRect(22,10,7,96);ctx.fillStyle='#c3d0d5';ctx.fillRect(72,8,3,85);}
    faces.push(c);
  }
  const texture=new THREE.CubeTexture(faces);texture.colorSpace=THREE.SRGBColorSpace;texture.needsUpdate=true;return texture;
}
