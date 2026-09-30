import { ROADS, LOOP, roadPoint, loopPoint, inGroundCut, terrainBlocked } from './terrain.mjs?v=neon-city-1';

export const PICKUP_COLORS=['#37e7ff','#bb75ff','#ffbd4b','#efffff'];
export const PICKUP_NAMES=['Cyan charge','Violet cell','Amber cache','White core'];
export const pickupKind=value=>value>=6?3:value>=3.5?2:value>=1.8?1:0;

export function populateFood(arena,count) {
  if(!count)return;
  const clear=(x,z)=>!arena.blocked(x,z,12)&&!inGroundCut(x,z,8)&&!terrainBlocked({},x,z,4);
  const add=(p,value,pattern)=>arena.addFood(p.x,p.z,value,0,{y:p.y||0,nx:-Math.cos(p.angle||0)*Math.sin(p.pitch||0),ny:Math.cos(p.pitch||0),nz:-Math.sin(p.angle||0)*Math.sin(p.pitch||0),pattern,home:{x:p.x,y:p.y||0,z:p.z},route:p.route||null});
  // Color is a promise of energy value, not a random decoration.
  const values=[1,1,1,2,2,4];
  const scatter=Math.floor(count*.3);
  for(let i=0;i<scatter;i++) {const p=arena.randomPosition();arena.addFood(p.x,p.z,values[Math.floor(arena.random()*values.length)]);}
  const routeBudget=Math.floor(count*.15), routePaths=[...ROADS,LOOP];
  const totalRouteLength=ROADS.reduce((sum,r)=>sum+r.end-r.start,LOOP.length);
  for(let n=0;n<routePaths.length;n++) {
    const road=routePaths[n],length=road===LOOP?LOOP.length:road.end-road.start,steps=Math.floor(routeBudget*length/totalRouteLength);
    for(let i=0;i<steps;i++) {
      const s=(i+.5)/steps*length,p=road===LOOP?loopPoint(s):roadPoint(road,s);
      add({...p,route:road.id},i%13===0?4:2,'route');
    }
  }
  const lineBudget=Math.floor(count*.34);
  for(let n=0;n<Math.ceil(lineBudget/56);n++) {
    const center=n===0?{x:arena.player.x+12,z:arena.player.z}:arena.randomPosition();
    const angle=n===0?0:arena.random()*Math.PI*2, bend=n===0?0:(arena.random()-.5)*.6;
    for(let i=0;i<56&&n*56+i<lineBudget;i++) {
      const along=i*6.5,side=Math.sin(i/56*Math.PI)*bend*45;
      const x=center.x+Math.cos(angle)*along-Math.sin(angle)*side,z=center.z+Math.sin(angle)*along+Math.cos(angle)*side;
      if(clear(x,z))add({x,z},i%12===11?4:1,'line');
    }
  }
  // Compact rings, crescent caches, and small three-row banks reward detours.
  const remaining=count-arena.food.length;
  for(let i=0;i<remaining;) {
    const center=arena.randomPosition(),countHere=Math.min(48,remaining-i);
    for(let j=0;j<countHere;j++,i++) {
      const angle=j*2.399963229728653,radius=4+Math.sqrt(j)*3.6;
      const x=center.x+Math.cos(angle)*radius,z=center.z+Math.sin(angle)*radius;
      if(clear(x,z))add({x,z},j===0?6:j%5===0?4:2,'cache');
      else {const p=arena.randomPosition();arena.addFood(p.x,p.z,1);}
    }
  }
}

export function matureTrail(arena,r,index) {
  const target=index<6?2200+arena.random()*1600:index<18?750+arena.random()*1100:150+arena.random()*600;
  r.length=target;r.kills=index<6?8+Math.floor(arena.random()*16):Math.floor(arena.random()*7);
  let x=r.x-Math.cos(r.angle)*3.1005,z=r.z-Math.sin(r.angle)*3.1005,heading=r.angle+Math.PI;
  const points=[{x,y:0,z}],cells=new Map(),cellSize=12;
  const key=(x,z)=>Math.floor(x/cellSize)*4096+Math.floor(z/cellSize)+2048;
  const insert=p=>{const k=key(p.x,p.z);if(!cells.has(k))cells.set(k,[]);cells.get(k).push(p);};
  let bias=(index%2?1:-1)*.009;
  for(let d=2.8;d<=target;d+=2.8) {
    if(points.length>8)insert(points[points.length-8]);
    let found=null;
    if(points.length%65===0)bias=(arena.random()-.5)*.028;
    for(const turn of [bias,.07,-.07,.18,-.18,.4,-.4,.8,-.8,1.2,-1.2]) {
      const angle=arena.mode==='90'?Math.round((heading+turn*2)/(Math.PI/2))*(Math.PI/2):heading+turn;
      const nx=x+Math.cos(angle)*2.8,nz=z+Math.sin(angle)*2.8;
      if(arena.blocked(nx,nz,16)||inGroundCut(nx,nz,6)||terrainBlocked({},nx,nz,4))continue;
      if(Math.hypot(nx-arena.player.x,nz-arena.player.z)<90)continue;
      let crossed=false;
      for(let dx=-1;dx<=1&&!crossed;dx++)for(let dz=-1;dz<=1;dz++) {
        for(const p of cells.get(key(nx+dx*cellSize,nz+dz*cellSize))||[])if((p.x-nx)**2+(p.z-nz)**2<8**2){crossed=true;break;}
      }
      if(!crossed){found={x:nx,y:0,z:nz};heading=angle;break;}
    }
    if(!found)break;
    points.push(found);x=found.x;z=found.z;
  }
  r.trail=points.reverse();r.length=Math.max(65,Math.min(target,(points.length-1)*2.8));r.peak=r.length;
}
