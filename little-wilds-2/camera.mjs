import{W,H}from './core.mjs';
export function createCamera(){
 const c={x:W*24,y:H*24,zoom:1,width:1280,height:720};
 c.world=(x,y)=>({x:c.x+(x-c.width/2)/c.zoom,y:c.y+(y-c.height/2)/c.zoom});
 c.screen=(x,y)=>({x:(x-c.x)*c.zoom+c.width/2,y:(y-c.y)*c.zoom+c.height/2});
 c.clamp=()=>{c.x=Math.max(0,Math.min(W*48,c.x));c.y=Math.max(0,Math.min(H*48,c.y));};
 c.pan=(dx,dy)=>{c.x-=dx/c.zoom;c.y-=dy/c.zoom;c.clamp();};
 c.zoomAt=(factor,x,y)=>{const p=c.world(x,y);c.zoom=Math.max(.18,Math.min(2.5,c.zoom*factor));const q=c.world(x,y);c.x+=p.x-q.x;c.y+=p.y-q.y;c.clamp();};
 return c;
}
