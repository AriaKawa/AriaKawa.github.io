import{W,H}from './core.mjs';
const reflect=(v,max)=>{const n=((v%(max*2))+max*2)%(max*2);return n>max?max*2-n:n;};
export function wander(s,a){
 if(!Number.isFinite(a.heading))a.heading=s.spirits.indexOf(a)*2.399963+Math.random()*.8;
 let best=null,score=Infinity;
 for(let n=0;n<10;n++){
  const angle=a.heading+(Math.random()-.5)*(n<5?1.8:Math.PI*2),distance=2+Math.random()*6;
  const x=reflect(a.x+Math.cos(angle)*distance,W-1),y=reflect(a.y+Math.sin(angle)*distance,H-1);
  let cost=Math.random()*2;
  for(const b of s.spirits){if(b===a)continue;const dx=x-(Number.isFinite(b.goalX)?b.goalX:b.x),dy=y-(Number.isFinite(b.goalY)?b.goalY:b.y),d2=dx*dx+dy*dy;if(d2<16)cost+=(16-d2)*3;}
  if(cost<score){score=cost;best={x,y};}
 }
 a.goalX=best.x;a.goalY=best.y;a.heading=Math.atan2(best.y-a.y,best.x-a.x);a.target=Math.round(best.y)*W+Math.round(best.x);a.work=.001;
 if(!Number.isFinite(a.stride))a.stride=Math.random()*.7;
 a.rest=1.2+Math.random()*1.5;
}
