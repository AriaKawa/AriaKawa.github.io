export const WORLD_W=96,WORLD_H=64,PLOT_W=24,PLOT_H=16,START_PLOT=5;
const names=['Loess Ridge','Willow Draw','Clover Downs','Pebble Hollow','Prairie Rise','First Clearing','Dry Creek Bend','Sunlit Rise','Bramble Hill','Daisy Vale','Low Prairie','Birch Knoll','Glacial Stones','Honey Meadow','Cottonwood Draw','Prairie Heights'];
const kinds=['hill','swale','hill','stones','hill','clearing','swale','hill','hill','clearing','swale','hill','stones','clearing','swale','hill'];
export const PLOTS=names.map((name,id)=>({id,name,kind:kinds[id],x:id%4*PLOT_W,y:Math.floor(id/4)*PLOT_H}));
export const spawnPoint={x:35.5,y:23.5};
export const plotAt=(x,y)=>x<-.5||y<-.5||x>=WORLD_W-.5||y>=WORLD_H-.5?-1:Math.floor((y+.5)/PLOT_H)*4+Math.floor((x+.5)/PLOT_W);
export const owned=(s,id)=>id>=0&&(s.plots===undefined||s.plots.includes(id));
export const neighbors=id=>[id%4? id-1:-1,id%4<3?id+1:-1,id>=4?id-4:-1,id<12?id+4:-1].filter(i=>i>=0);
export const canReach=(s,id)=>!owned(s,id)&&neighbors(id).some(n=>owned(s,n));
export function plotCost(s,id){if(!PLOTS[id])return Infinity;const distance=Math.abs(id%4-1)+Math.abs(Math.floor(id/4)-1);return Math.floor(100*Math.pow(1.55,Math.max(0,(s.plots?.length??16)-1))*(1+distance*.25)/25)*25;}
export function buyPlot(s,id){if(!Number.isInteger(id)||!PLOTS[id]||!canReach(s,id))return false;const price=plotCost(s,id);if(s.seeds<price)return false;s.seeds-=price;s.plots.push(id);s.plots.sort((a,b)=>a-b);return true;}
// Ponds are not pre-placed. Water creation belongs to a future Rainwisp action.
export const waterAt=()=>false;
export const RESTORABLE=Array.from({length:WORLD_W*WORLD_H},(_,i)=>i).filter(i=>!waterAt(i%WORLD_W,Math.floor(i/WORLD_W)));
export const canWork=(s,x,y)=>owned(s,plotAt(x,y))&&!waterAt(x,y);
export function segmentOpen(s,x0,y0,x1,y1){const steps=Math.max(1,Math.ceil(Math.hypot(x1-x0,y1-y0)*4));for(let i=0;i<=steps;i++)if(!canWork(s,x0+(x1-x0)*i/steps,y0+(y1-y0)*i/steps))return false;return true;}
export function nearestOpen(s,x,y){x=Math.max(0,Math.min(WORLD_W-1,x));y=Math.max(0,Math.min(WORLD_H-1,y));if(canWork(s,x,y))return{x,y};for(let r=1;r<120;r++)for(let dy=-r;dy<=r;dy++)for(const dx of [-r,r]){const xx=Math.round(x)+dx,yy=Math.round(y)+dy;if(canWork(s,xx,yy))return{x:xx,y:yy};}return {...spawnPoint};}
export function migratePlots(s){
 if(s.plots!==undefined){if(!Array.isArray(s.plots)||!s.plots.includes(START_PLOT)||s.plots.length>16||new Set(s.plots).size!==s.plots.length||s.plots.some(id=>!Number.isInteger(id)||!PLOTS[id]))throw Error('Invalid land ownership');const reached=new Set([START_PLOT]);for(let n=0;n<16;n++)for(const id of s.plots)if(neighbors(id).some(i=>reached.has(i)))reached.add(id);if(reached.size!==s.plots.length)throw Error('Disconnected land ownership');return s;}
 const unlocked=new Set([START_PLOT]);
 function retain(id){if(id<0)return;let cursor=START_PLOT;unlocked.add(id);while(cursor%4!==id%4){cursor+=cursor%4<id%4?1:-1;unlocked.add(cursor);}while(Math.floor(cursor/4)!==Math.floor(id/4)){cursor+=cursor<id?4:-4;unlocked.add(cursor);}}
 for(let i=0;i<s.land.length;i++)if(s.land[i]>0||s.cover?.[i]>0)retain(plotAt(i%WORLD_W,Math.floor(i/WORLD_W)));
 for(const a of s.spirits)retain(plotAt(a.x,a.y));s.plots=[...unlocked].sort((a,b)=>a-b);return s;
}
