import{canWork}from './land.mjs';
import{W,H}from './core.mjs';
const falls=new Map();
export function stepFalls(dt){for(const[a,f]of falls){f.elapsed+=Math.max(0,dt);if(f.elapsed>=.48)falls.delete(a);}}
export const isFalling=a=>falls.has(a);
export function fallPose(a){const f=falls.get(a);if(!f)return {height:0,squash:1};const t=Math.min(1,f.elapsed/.34),impact=Math.max(0,(f.elapsed-.34)/.14);return {height:f.height*(1-t*t),squash:1-.15*Math.sin(Math.min(1,impact)*Math.PI)};}
export function createCarry(){return {spirit:null,x:0,y:0};}
export function pickUp(carry,spirit,x,y){if(carry.spirit)return false;falls.delete(spirit);carry.spirit=spirit;carry.x=x;carry.y=y;return true;}
export function place(carry,world,cancel=false,fallHeight=0,state=null){const a=carry.spirit;if(!a)return false;if(state&&!cancel&&!canWork(state,world.x/48,world.y/48))cancel=true;if(!cancel){a.x=Math.max(0,Math.min(W-1,world.x/48));a.y=Math.max(0,Math.min(H-1,world.y/48));a.target=-1;a.work=0;if(fallHeight>0)falls.set(a,{height:fallHeight,elapsed:0});}carry.spirit=null;return true;}
