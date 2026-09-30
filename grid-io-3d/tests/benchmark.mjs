import { Arena as OldArena } from '../../grid-io/simulation.mjs';
import { Arena as NewArena } from '../simulation.mjs';
for(const [label,Type] of [['before',OldArena],['after',NewArena]]) {
 const start=performance.now();let deaths=0,turnChanges=0,stalled=0;
 for(const seed of [22,47,91]){
  const a=new Type({seed}); a.player.grace=999;
  for(let i=0;i<3600;i++){
   for(const r of a.riders){r.oldAngle=r.angle;}
   for(const e of a.step(1/60))if(e.type==='death'&&!e.rider.player)deaths++;
   if(i%60===0)for(const r of a.riders.slice(1)){
    if(r.oldPos && r.alive){const moved=Math.hypot(r.x-r.oldPos.x,r.z-r.oldPos.z);if(moved<10)stalled++;}
    r.oldPos={x:r.x,z:r.z};
    const delta=Math.atan2(Math.sin(r.angle-r.oldAngle),Math.cos(r.angle-r.oldAngle));
    if(Math.abs(delta)>0.003){const sign=Math.sign(delta);if(r.turnSign&&sign!==r.turnSign)turnChanges++;r.turnSign=sign;}
   }
  }
 }
 console.log(JSON.stringify({label,threeMinutesMs:performance.now()-start,deaths,turnChanges,stalled}));
}
