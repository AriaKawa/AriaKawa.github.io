// A short-lived footprint field; there is no ambient or time-driven wind.
export function createGrassMotion(){
 const previous=new WeakMap(),trail=new Map();
 return {
  update(spirits,time,carried=null,disabled=false){
   for(const a of spirits){const old=previous.get(a);previous.set(a,{x:a.x,y:a.y});if(disabled||a===carried||!old)continue;
    const dx=a.x-old.x,dy=a.y-old.y,d=Math.hypot(dx,dy);if(d<.001||d>1.5)continue;
    const wx=a.x*48,wy=a.y*48,cx=Math.floor(wx/18),cy=Math.floor(wy/18),direction=Math.abs(dx)>.002?Math.sign(dx):1;
    for(let yy=cy-1;yy<=cy+1;yy++)for(let xx=cx-1;xx<=cx+1;xx++){
     const strength=Math.max(0,1-Math.hypot((xx+.5)*18-wx,(yy+.5)*18-wy)/30);
     if(strength)trail.set(xx+','+yy,{time,strength,direction});
    }
   }
   for(const[k,v]of trail)if(disabled||time-v.time>750)trail.delete(k);
  },
  bend(x,y,time){const v=trail.get(Math.floor(x/18)+','+Math.floor(y/18));return v?v.direction*v.strength*Math.max(0,1-(time-v.time)/750)**2:0;},
  contacts(time){const points=[];for(const[key,v]of trail){const bend=v.direction*v.strength*Math.max(0,1-(time-v.time)/750)**2;if(Math.abs(bend)<.12)continue;const [x,y]=key.split(',').map(Number);points.push({x:x*18,y:y*18,bend});}return points;},
  clear(){trail.clear();}
 };
}
export function fullness(x,y,richness,thickness=0){
 const patch=(Math.sin(x*.9+Math.sin(y*.7)*1.8)+Math.sin(y*1.17-x*.28)+2)/4;
 const base=Math.max(.16,Math.min(.98,.2+patch*.65+Math.min(richness,6)*.025));return base+(1-base)*Math.min(1,thickness);
}

