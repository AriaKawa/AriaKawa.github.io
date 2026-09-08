import { resolveUsaTerrainBiome } from './TerrainBiomeResolver';
import type { Vec2 } from './types';
const hash = (x: number, y: number, salt: number) => {
  let v = Math.imul(x ^ salt, 73856093) ^ Math.imul(y, 19349663);
  v = Math.imul(v ^ (v >>> 16), 2246822519);
  return ((v ^ (v >>> 13)) >>> 0) / 4294967296;
};
export type ScenerySite = Vec2 & { id: string; kind: string };

export type SceneryProp = Vec2 & { id: string; frame: number; size: number };
export type SceneryBody = Vec2 & { radius: number };
export const SCENERY_HITBOX_SCALE = .35;
export function sceneryBodies(p: SceneryProp): SceneryBody[] {
  // Upright atlas trees contact the ground below the canopy center.
  if (p.frame <= 2) return [{ x: p.x, y: p.y + p.size * .36, radius: p.size * .022 }];
  if (p.frame === 15) return [];
  if (p.frame === 8) return [-1, 0, 1].map(t => ({ x: p.x + t * p.size * .20 * SCENERY_HITBOX_SCALE, y: p.y + p.size * (.06 - t * .13 * SCENERY_HITBOX_SCALE), radius: p.size * .17 * SCENERY_HITBOX_SCALE }));
  return [{ x: p.x, y: p.y + p.size * .12, radius: p.size * .38 * SCENERY_HITBOX_SCALE }];
}
function generate(left: number, right: number, top: number, bottom: number, roads: Vec2[][], sites: ScenerySite[], isLand: (p: Vec2) => boolean): SceneryProp[] {
 const cell = 160;
      const segments: [Vec2, Vec2][] = [];
      for (const road of roads) for (let i = 1; i < road.length; i++) {
        const a = road[i - 1], b = road[i];
        if (Math.max(a.x,b.x) < left*cell-1200 || Math.min(a.x,b.x) > right*cell+1200 || Math.max(a.y,b.y) < top*cell-1200 || Math.min(a.y,b.y) > bottom*cell+1200) continue;
        segments.push([a,b]);
      }
      const clear = (p: Vec2, radius: number) => isLand(p) && !segments.some(([a,b]) => {
        const dx=b.x-a.x, dy=b.y-a.y, t=Math.max(0,Math.min(1,((p.x-a.x)*dx+(p.y-a.y)*dy)/(dx*dx+dy*dy || 1)));
        return Math.hypot(p.x-a.x-t*dx,p.y-a.y-t*dy) < radius+44;
      });
      const result: SceneryProp[] = [];
      const put = (id: string, p: Vec2, frame: number, size: number) => result.push({ id, ...p, frame, size });
      const visibleSites = sites;
      for (let y=top;y<=bottom;y++) for (let x=left;x<=right;x++) {
        const p={x:(x+.15+hash(x,y,1)*.7)*cell,y:(y+.15+hash(x,y,2)*.7)*cell};
        const biome=resolveUsaTerrainBiome(p.x,p.y).primary, r=hash(x,y,3);
        if (r > (biome === "forest" ? .9 : .53)) continue;
        const rocky=["mountain","rocky_desert","desert"].includes(biome);
        const frame=rocky ? (r<.28?2:3) : r<.07?2:r<.2?0:r<.4?1:15;
        const size=(frame<2?120:75)*( .8+hash(x,y,4)*.45);
        if (visibleSites.some(s=>Math.hypot(s.x-p.x,s.y-p.y)<220) || !clear(p,size*.5)) continue;
        put(`prop:${x}:${y}`,p,frame,size);
      }
      // Sparse roadside ruins use the same stable world grid as vegetation.
      // They are scenery; existing POIs retain their gameplay and labels.
      for (let y=top;y<=bottom;y++) for (let x=left;x<=right;x++) {
        if (x%3 || y%3 || hash(x,y,8)>.55) continue;
        const p={x:(x+.5)*cell,y:(y+.5)*cell};
        if (visibleSites.some(s=>Math.hypot(s.x-p.x,s.y-p.y)<350) || !clear(p,90)) continue;
        const nearRoad=segments.some(([a,b])=>{
          const dx=b.x-a.x,dy=b.y-a.y,t=Math.max(0,Math.min(1,((p.x-a.x)*dx+(p.y-a.y)*dy)/(dx*dx+dy*dy||1)));
          return Math.hypot(p.x-a.x-t*dx,p.y-a.y-t*dy)<370;
        });
        if (nearRoad) put(`ruin:${x}:${y}`,p,[4,5,7,8,12,13][Math.floor(hash(x,y,9)*6)],170);
      }
      for (const p of visibleSites) {
        const frame=/fuel|gas/.test(p.kind)?4:/radio|relay/.test(p.kind)?6:/camp|survivor/.test(p.kind)?7:/military|checkpoint/.test(p.kind)?13:/hive|bunker/.test(p.kind)?14:/town|farm/.test(p.kind)?12:5;
        // Keep artwork beside the existing POI and out of the road corridor.
        for (const [dx,dy] of [[140,140],[-140,140],[140,-140],[-140,-140],[260,0],[0,260]]) {
          const at={x:p.x+dx,y:p.y+dy};
          if (clear(at,100)) { put(`site:${p.id}`,at,frame,200); break; }
        }
      }
 return result;
}
/** Stable cached world data, independent of camera visibility and moving bases. */
export class SceneryWorld {
 private chunks = new Map<string, SceneryProp[]>();
 constructor(private roads: Vec2[][], private sites: ScenerySite[], private isLand: (p: Vec2) => boolean) {}
 query(left: number, top: number, right: number, bottom: number): SceneryProp[] {
  const found = new Map<string, SceneryProp>(), chunk = 1280;
  for (let y = Math.floor((top-400)/chunk); y <= Math.floor((bottom+400)/chunk); y++) for (let x = Math.floor((left-400)/chunk); x <= Math.floor((right+400)/chunk); x++) {
   const key = `${x}:${y}`;
   let props = this.chunks.get(key);
   if (!props) {
    props = generate(x*8, x*8+7, y*8, y*8+7, this.roads, this.sites.filter(s => s.x > x*chunk-500 && s.x < (x+1)*chunk+500 && s.y > y*chunk-500 && s.y < (y+1)*chunk+500), this.isLand);
    // POI artwork belongs to exactly one chunk so adjacent queries agree.
    props = props.filter(p => !p.id.startsWith('site:') || (Math.floor(p.x/chunk)===x && Math.floor(p.y/chunk)===y));
    this.chunks.set(key, props);
    if (this.chunks.size > 512) this.chunks.delete(this.chunks.keys().next().value!);
   }
   for (const p of props) if (p.x+p.size >= left && p.x-p.size <= right && p.y+p.size >= top && p.y-p.size <= bottom) found.set(p.id,p);
  }
  return [...found.values()];
 }
 bodies(a: Vec2, b: Vec2, radius: number): SceneryBody[] {
  return this.query(Math.min(a.x,b.x)-radius, Math.min(a.y,b.y)-radius, Math.max(a.x,b.x)+radius, Math.max(a.y,b.y)+radius).flatMap(sceneryBodies);
 }
 blocked(p: Vec2, radius: number): boolean { return this.bodies(p,p,radius).some(b => Math.hypot(p.x-b.x,p.y-b.y) < radius+b.radius); }
 clear(a: Vec2, b: Vec2, radius: number): boolean {
  const dx=b.x-a.x,dy=b.y-a.y,l=dx*dx+dy*dy;
  return !this.bodies(a,b,radius).some(o => {
   const t=Math.max(0,Math.min(1,((o.x-a.x)*dx+(o.y-a.y)*dy)/(l||1)));
   return Math.hypot(a.x+t*dx-o.x,a.y+t*dy-o.y) < o.radius+radius;
  });
 }
 move(a: Vec2, b: Vec2, radius: number): Vec2 {
  if (this.clear(a,b,radius)) return b;
  // Sweep the whole step, including high speed travel, to prevent tunneling.
  let low=0,high=1;
  for(let i=0;i<20;i++) { const t=(low+high)/2,p={x:a.x+(b.x-a.x)*t,y:a.y+(b.y-a.y)*t}; if(this.clear(a,p,radius)) low=t; else high=t; }
  return {x:a.x+(b.x-a.x)*low,y:a.y+(b.y-a.y)*low};
 }
 nearestFree(p: Vec2, radius: number): Vec2 {
  if (!this.blocked(p,radius)) return p;
  for(let r=24;r<=480;r+=24) for(let i=0;i<24;i++) { const q={x:p.x+Math.cos(i*Math.PI/12)*r,y:p.y+Math.sin(i*Math.PI/12)*r}; if(!this.blocked(q,radius)) return q; }
  throw new Error('No clear ground near scenery');
 }
 private routeClear(a: Vec2,b: Vec2,radius: number): boolean {
  if(!this.clear(a,b,radius)) return false;
  const steps=Math.max(1,Math.ceil(Math.hypot(b.x-a.x,b.y-a.y)/20));
  for(let i=0;i<=steps;i++) {
   const p={x:a.x+(b.x-a.x)*i/steps,y:a.y+(b.y-a.y)*i/steps};
   if(![p,{x:p.x-radius,y:p.y},{x:p.x+radius,y:p.y},{x:p.x,y:p.y-radius},{x:p.x,y:p.y+radius}].every(q=>this.isLand(q)))return false;
  } return true;
 }
 route(points: Vec2[], radius: number): Vec2[] {
  if(!points.length) return [];
  const clean=points.map(p=>this.nearestFree(p,radius+2)), result=[clean[0]];
  for (const end of clean.slice(1)) result.push(...this.detour(result[result.length-1],end,radius));
  return result;
 }
 /** One bounded route shared by the road renderer and horde simulation. */
 deploymentRoute(points: Vec2[], radius: number, scale = 1): Vec2[] {
  const end = points.at(-1)!;
  const length = (p: Vec2[]) => p.slice(1).reduce((sum,b,i)=>sum+Math.hypot(b.x-p[i].x,b.y-p[i].y),0);
  const candidates: {join: Vec2; approach: Vec2}[] = [];
  for(const road of this.roads) for(let i=1;i<road.length;i++) {
   const a=road[i-1],b=road[i],dx=b.x-a.x,dy=b.y-a.y;
   const t=Math.max(0,Math.min(1,((end.x-a.x)*dx+(end.y-a.y)*dy)/(dx*dx+dy*dy||1)));
   const p={x:a.x+t*dx,y:a.y+t*dy},d=Math.hypot(p.x-end.x,p.y-end.y);
   if(d<=700*scale) {
    // Choose an entry a little along the existing road to leave room for defenses.
    const direction=t>.5 ? -1 : 1;
    let remaining=450*scale, approach={...p}, cursor=direction>0?i:i-1;
    while(cursor>=0 && cursor<road.length && remaining>0) {
     const target=road[cursor],distance=Math.hypot(target.x-approach.x,target.y-approach.y);
     if(distance>=remaining) { const ratio=remaining/(distance||1);approach={x:approach.x+(target.x-approach.x)*ratio,y:approach.y+(target.y-approach.y)*ratio};remaining=0; }
     else {approach={...target};remaining-=distance;cursor+=direction;}
    }
    if(Math.hypot(approach.x-end.x,approach.y-end.y)<=700*scale) candidates.push({join:p,approach});
   }
  }
  candidates.sort((a,b)=>Math.hypot(a.join.x-end.x,a.join.y-end.y)-Math.hypot(b.join.x-end.x,b.join.y-end.y));
  for(const {approach:start} of candidates.slice(0,6)) {
   try { const route=this.smooth(this.route([start,end],radius+3),radius);
    if(length(route)>=400*scale && length(route)<=Math.min(1000*scale,Math.hypot(start.x-end.x,start.y-end.y)*1.6)) return route;
   } catch { /* Nearby roads may be separated by impassable scenery. */ }
  }
  const route=this.smooth(this.route(points,radius+3),radius);
  if(length(route)>1650*scale) throw new Error('Deployment detour too long');
  return route;
 }
 private smooth(points: Vec2[], radius: number): Vec2[] {
  let path=points;
  for(let pass=0;pass<3;pass++) {
   const next: Vec2[]=[path[0]];
   for(let i=0;i<path.length-1;i++) {
    const a=path[i],b=path[i+1];
    next.push({x:a.x*.75+b.x*.25,y:a.y*.75+b.y*.25},{x:a.x*.25+b.x*.75,y:a.y*.25+b.y*.75});
   }
   next.push(path.at(-1)!);
   // Never smooth a corner through the obstacle it was avoiding.
   if(!next.slice(1).every((p,i)=>this.routeClear(next[i],p,radius))) break;
   path=next;
  }
  return path;
 }
 private detour(start: Vec2, end: Vec2, radius: number): Vec2[] {
  if (this.routeClear(start,end,radius)) return [end];
  // Swept A* edges prevent diagonal corner cutting. Connect directly to the
  // original destination as soon as the remaining segment is clear.
  type Node = Vec2 & { key: string; g: number; f: number; parent?: Node };
  const step=40, first: Node={...start,key:'0:0',g:0,f:Math.hypot(end.x-start.x,end.y-start.y)};
  const open=[first], best=new Map<string,number>([[first.key,0]]);
  for(let count=0;open.length && count<4000;count++) {
   open.sort((a,b)=>b.f-a.f); const n=open.pop()!;
   if(n.g !== best.get(n.key)) continue;
   if(this.routeClear(n,end,radius)) { const path: Vec2[]=[end]; let cur: Node|undefined=n; while(cur?.parent) {path.push({x:cur.x,y:cur.y});cur=cur.parent;} return path.reverse(); }
   for(let y=-1;y<=1;y++) for(let x=-1;x<=1;x++) {
    if(!x&&!y) continue;
    const p={x:n.x+x*step,y:n.y+y*step},key=`${Math.round((p.x-start.x)/step)}:${Math.round((p.y-start.y)/step)}`,g=n.g+Math.hypot(x,y)*step;
    if(p.x<Math.min(start.x,end.x)-480 || p.x>Math.max(start.x,end.x)+480 || p.y<Math.min(start.y,end.y)-480 || p.y>Math.max(start.y,end.y)+480) continue;
    if(g >= (best.get(key)??Infinity) || !this.routeClear(n,p,radius)) continue;
    best.set(key,g);open.push({...p,key,g,f:g+Math.hypot(end.x-p.x,end.y-p.y),parent:n});
   }
  }
  throw new Error('No scenery-safe horde route found');
 }
}

