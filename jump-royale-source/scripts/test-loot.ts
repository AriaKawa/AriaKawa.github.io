import assert from 'node:assert/strict';
import {wallet,rewardSpinPoint,openLoot,rollLoot} from '../client/src/game/economy';
let saved:string|null=null,fail=false;
Object.defineProperty(globalThis,'localStorage',{value:{getItem:()=>saved,setItem:(_:string,v:string)=>{if(fail)throw new Error('storage unavailable');saved=v;}}});
const pool=Array.from({length:5},(_,rarity)=>({slot:'helmet',id:'tier'+rarity,name:'Tier '+rarity,rarity}));
saved=JSON.stringify({gold:10,owned:[],rewards:[]});
assert.equal(wallet().freeSpins,0);
for(let i=0;i<7;i++)assert(rewardSpinPoint('round'+i));
assert.equal(rewardSpinPoint('round0'),false);
assert.equal(wallet().freeSpins,2);assert.equal(wallet().spinPoints,1);
let result=openLoot(pool,false)!;assert(result&&!result.duplicate);assert.equal(wallet().gold,8);assert(wallet().owned.includes('helmet:'+result.item.id));
saved=JSON.stringify({...wallet(),owned:pool.map(p=>'helmet:'+p.id),spinPoints:2});
result=openLoot(pool,false)!;assert(result.duplicate);assert.equal(wallet().gold,7);assert.equal(wallet().freeSpins,3);assert.equal(wallet().spinPoints,0);
openLoot(pool,true);assert.equal(wallet().freeSpins,2);assert.equal(wallet().gold,8);assert.equal(wallet().spinPoints,1);
const before=saved;fail=true;assert.equal(openLoot(pool,false),null);assert.equal(saved,before);fail=false;
saved=JSON.stringify({...wallet(),gold:1,freeSpins:0});assert.equal(openLoot(pool,false),null);assert.equal(openLoot(pool,true),null);
for(const [n,tier] of [[0,0],[.599,0],[.60,1],[.85,2],[.95,3],[.99,4],[.99999,4]]){let calls=0;assert.equal(rollLoot(pool,()=>calls++?0:n).rarity,tier);}
console.log('PASS: legacy wallet, stacking, match idempotency, paid/free spins, duplicates, atomic storage failure, insufficient funds and rarity boundaries');
