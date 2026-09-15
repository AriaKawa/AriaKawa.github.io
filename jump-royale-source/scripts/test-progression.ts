import assert from 'node:assert/strict';
import {wallet,reward,goldForPlace,buy,owns,lockedPieces,playableOutfit} from '../client/src/game/economy';
import {HostedGameClient} from '../client/src/net/HostedGameClient';
import {stepGhosts,becomeGhost} from '../server/src/sim/ghosts';
const storage=new Map();(globalThis as any).localStorage={getItem:(k:string)=>storage.get(k),setItem:(k:string,v:string)=>storage.set(k,v)};
(globalThis as any).window={setInterval:()=>1,clearInterval:()=>{}};
assert.deepEqual([0,1,2,3,4,5,6,7,24].map(goldForPlace),[0,5,3,3,1,1,1,0,0]);
assert(!buy('character','puppy'));assert.equal(wallet().gold,0);
assert.equal(reward('a',1),5);assert.equal(reward('a',1),0);assert.equal(wallet().gold,5);
assert(buy('character','puppy'));assert(owns('character','puppy'));assert.equal(wallet().gold,0);assert(buy('character','puppy'));assert.equal(wallet().gold,0);
const outfit:any={character:'cat',helmet:'steel',hair:'buns',shirt:'steel',pants:'maid',animalHat:'party'};
assert(lockedPieces(outfit).length);assert.equal(lockedPieces(playableOutfit(outfit)).length,0);
const h:any=new HostedGameClient();await h.connect('Tester');while(h.phase==='waiting')h.tick();const p=h.players.get(h.localId);becomeGhost(p);assert(!p.ghost);
p.alive=false;p.eliminatedAt=h.clock;p.maxHeight=100;p.heightReachedMs=500;
h.spectate();assert(p.ghost);h.sendInput({left:false,right:true,up:true,jumpHeld:false,seq:1});const y=p.y;
stepGhosts(h.players.values(),h.clock,1);assert(p.y<y);assert.equal(p.maxHeight,100);assert.equal(p.heightReachedMs,500);assert(!p.alive);
h.setGodPowers(true);assert(!p.alive);
let ghostCount=0,departedCount=0;
for(const b of h.players.values()){if(!b.isBot)continue;b.bot.pattern=Number(b.id.split('-')[1]);b.alive=false;b.eliminatedAt=h.clock-2000;}
stepGhosts(h.players.values(),h.clock,1/30);
for(const b of h.players.values()){if(!b.isBot)continue;if(b.ghost)ghostCount++;if(b.departed)departedCount++;}
assert(ghostCount>0&&departedCount>ghostCount);assert.equal(ghostCount+departedCount,23);
await h.disconnect();console.log('PASS: reward tiers, duplicate prevention, purchase balance, locked outfit guard, invincible noncompetitive ghost flight, and majority bot departures.');
