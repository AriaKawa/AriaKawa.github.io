import assert from 'node:assert/strict';
const LOOT_POOL=Array.from({length:5},(_,rarity)=>Array.from({length:3},(_,i)=>({slot:rarity===0&&i<2?'wallpaper':'test',id:rarity+'-'+i,name:'Test',rarity}))).flat();
import {rollLoot,lootChance,LOOT_ODDS,wallet,grantMissionGold} from '../client/src/game/economy';
import {MAGICAL_HEIGHT,generateMagical} from '../server/src/sim/magical';
const data=new Map<string,string>();Object.assign(globalThis,{localStorage:{getItem:(k:string)=>data.get(k)??null,setItem:(k:string,v:string)=>data.set(k,v)}});
assert.equal(MAGICAL_HEIGHT,15600*.7);
assert.equal(new Set(LOOT_POOL.map(i=>i.slot+':'+i.id)).size,LOOT_POOL.length);
assert.equal(LOOT_POOL.filter(i=>i.slot==='wallpaper').length,2);
let cumulative=0;
for(let rarity=0;rarity<5;rarity++){
 const tier=LOOT_POOL.filter(p=>p.rarity===rarity),remaining=tier.at(-1)!;
 data.set('jump-royale-wallet-v1',JSON.stringify({gold:10,owned:tier.slice(0,-1).map(i=>i.slot+':'+i.id),rewards:[]}));
 for(let n=0;n<10;n++){let call=0;assert.equal(rollLoot(LOOT_POOL,()=>call++===0?(cumulative+.1)/100:n/10),remaining);}
 assert.equal(lootChance(remaining,LOOT_POOL),LOOT_ODDS[rarity]);
 for(const p of tier.slice(0,-1))assert.equal(lootChance(p,LOOT_POOL),0);
 data.set('jump-royale-wallet-v1',JSON.stringify({gold:10,owned:tier.map(i=>i.slot+':'+i.id),rewards:[]}));
 for(const p of tier)assert.equal(lootChance(p,LOOT_POOL),LOOT_ODDS[rarity]/tier.length);
 assert(Math.abs(LOOT_POOL.reduce((s,i)=>s+lootChance(i,LOOT_POOL),0)-100)<1e-8);
 cumulative+=LOOT_ODDS[rarity];
}
data.clear();assert(grantMissionGold('2026-09-16:height',2));assert(grantMissionGold('2026-09-16:height',2));assert.equal(wallet().gold,2);
assert(grantMissionGold('2026-09-17:height',2));assert.equal(wallet().gold,4);
assert(generateMagical().every(p=>p.y>=0&&p.y<MAGICAL_HEIGHT));
console.log('PASS map shortening, unique loot, wallpapers, all five rarity odds, duplicate exhaustion fallback, exact 100% totals and idempotent daily rewards');
