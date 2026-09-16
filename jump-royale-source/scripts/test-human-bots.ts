import assert from 'node:assert/strict';
import {HostedGameClient} from '../client/src/net/HostedGameClient';
import {stepGhosts} from '../server/src/sim/ghosts';
(globalThis as any).window={setInterval:()=>1,clearInterval:()=>{}};
(globalThis as any).localStorage={getItem:()=>null,setItem:()=>{}};
const h:any=new HostedGameClient('mountain');await h.connect('Test');while(h.phase==='waiting')h.tick();h.phase='playing';h.roundStartedAt=h.clock;
let footwork=0,falls=0;const last=new Map<string,number>();
for(let i=0;i<1800;i++){h.tick();for(const p of h.players.values()){if(!p.isBot)continue;if(p.grounded&&!p.charging&&(p.input.left||p.input.right))footwork++;if(p.alive&&p.y>(last.get(p.id)??p.y)+10&&p.vy>100)falls++;last.set(p.id,p.y);}}
const bots=[...h.players.values()].filter((p:any)=>p.isBot) as any[];
assert(footwork>100);assert(falls>0);assert(new Set(bots.map(p=>Math.round(p.maxHeight))).size>5);
const samples=bots.slice(0,10).map((p,i)=>({...p,alive:false,ghost:false,departed:false,eliminatedAt:0,bot:{...p.bot,pattern:i}}));
stepGhosts(samples,2000,1/30,{left:0,right:2000,height:40000});assert.equal(samples.filter(p=>p.ghost).length,8);assert(samples.some(p=>p.ghost&&p.vx!==0));
console.log('PASS human bot behavior:',{footwork,falls,distinctHeights:new Set(bots.map(p=>Math.round(p.maxHeight))).size,eliminated:bots.filter(p=>!p.alive).length,ghosts:bots.filter(p=>p.ghost).length});
