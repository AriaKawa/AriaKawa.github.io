import assert from 'node:assert/strict';
import {HostedGameClient} from '../client/src/net/HostedGameClient';
import {rankPlayers} from '../server/src/sim/round';
import {SURGE_MS,VICTORY_MS,SURGE_TOP} from '../server/src/sim/finale';
import {floodForMap} from '../server/src/sim/world';
import {loadScores,saveScore,SCORE_KEY} from '../client/src/game/scores';
(globalThis as any).window={setInterval:()=>1,clearInterval:()=>{}};
const storage=new Map();(globalThis as any).localStorage={getItem:(k:string)=>storage.get(k),setItem:(k:string,v:string)=>storage.set(k,v)};
for(const map of ['forge','jungle','snow'] as const){
 const h:any=new HostedGameClient(map);await h.connect('Tester');while(h.phase==='waiting')h.tick();h.phase='playing';h.roundStartedAt=h.clock;
 const initial=h.hazardY;
 for(let i=0;i<floodForMap(map).grace*30-1;i++)h.tick();assert.equal(h.hazardY,initial);
 for(let i=0;i<4;i++)h.tick();assert(h.hazardY<initial);
 const p=h.players.get(h.localId),crown=h.platforms.find((x:any)=>x.id==='crown');
 p.x=crown.x+50;p.y=crown.y-20;p.grounded=true;p.groundedPlatformId='crown';p.vx=0;p.vy=0;
 h.tick();assert.equal(h.phase,'surge');const start=h.hazardY;const placements=JSON.stringify(h.placements);
 const startX=p.x;h.sendInput({left:false,right:true,jumpHeld:false,seq:1});for(let i=0;i<4;i++)h.tick();assert(p.x>startX,'Winner retains movement');
 h.sendInput({left:false,right:false,jumpHeld:true,seq:2});for(let i=0;i<12;i++)h.tick();h.sendInput({left:false,right:false,jumpHeld:false,seq:3});h.tick();assert(p.vy<0,'Winner can jump');
 while(h.clock-h.finaleAt<SURGE_MS+50)h.tick();assert.equal(h.phase,'victory');assert.equal(h.hazardY,SURGE_TOP);assert(start>h.hazardY);
 assert.deepEqual([...h.players.values()].filter((x:any)=>x.alive).map((x:any)=>x.id),[h.localId]);
 assert.equal(JSON.stringify(h.placements),placements);
 while(h.clock-h.finaleAt<SURGE_MS+VICTORY_MS+50)h.tick();assert.equal(h.phase,'finished');
 saveScore(map,h.placements[0]);assert.equal(loadScores()[map]?.place,1);
 h.requestRestart();assert.equal(h.phase,'waiting');assert.equal(h.placements,undefined);await h.disconnect();
}
const base:any={id:'late',name:'late',maxHeight:300.8,heightReachedMs:2000,alive:true};
const early={...base,id:'early',heightReachedMs:1000,alive:false};const higher={...base,id:'higher',maxHeight:400,alive:false};
assert.deepEqual(rankPlayers([base,early,higher]).map(x=>x.id),['higher','early','late']);
const best=loadScores().forge!;saveScore('forge',{...best,place:2});assert.equal(loadScores().forge?.place,1);
storage.set(SCORE_KEY,'bad json');assert.deepEqual(loadScores(),{});
console.log('PASS: three maps, early lava, complete surge and elimination, controllable winner, frozen standings, replay, height/time ties and saved records.');

