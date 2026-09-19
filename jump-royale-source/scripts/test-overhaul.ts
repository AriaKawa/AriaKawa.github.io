import assert from 'node:assert/strict';
import {wallet,owns,buy,price,playableOutfit,lockedPieces,claimGoldGift,rollLoot,lootChance,LOOT_ODDS} from '../client/src/game/economy';
import {GOLD_PACKS} from '../client/src/game/goldStore';
import {COUNTDOWN_SECONDS} from '../server/src/sim/constants';
import {costumeFields} from '../client/src/assets/costumeSets';
const store=new Map<string,string>();
Object.assign(globalThis,{localStorage:{getItem:(key:string)=>store.get(key)??null,setItem:(key:string,value:string)=>store.set(key,value)}});
const save=(owned:string[]=[],gold=100)=>store.set('jump-royale-wallet-v1',JSON.stringify({gold,owned,rewards:[],freeSpins:0,spinPoints:0}));
save(['hdCostume:cat-16','magicalCostume:starlight-16','costume:finn-16']);
for(const id of ['cat','magical-girl','original']){assert(owns('character',id));assert(owns('retroCostume',id));}
save(['character:cat']);
const cat={character:'cat',...costumeFields('classic'),retroCostumes:['cat']};
assert.deepEqual(playableOutfit(cat).retroCostumes,[]);
assert.deepEqual(lockedPieces(cat),[['retroCostume','cat']]);
assert(buy('retroCostume','cat'));assert.equal(wallet().gold,95);assert.deepEqual(playableOutfit(cat).retroCostumes,['cat']);
assert(buy('retroCostume','cat'));assert.equal(wallet().gold,95);
assert.equal(price('retroCostume','pogo'),Infinity);assert(!buy('retroCostume','pogo'));
save();assert(claimGoldGift('#gift=royale-overhaul-20260918-81c62f749a'));assert.equal(wallet().gold,1100);
assert(claimGoldGift('#gift=royale-overhaul-20260918-81c62f749a'));assert.equal(wallet().gold,1100);
assert(!claimGoldGift('#gift=invalid'));assert(!claimGoldGift('#gift=toString'));
const pack=GOLD_PACKS.find(p=>p.usdCents===5000)!;assert.equal(pack.baseGold+pack.bonusGold,60);assert.equal(pack.bonusGold/pack.baseGold,.2);
assert.deepEqual(GOLD_PACKS.map(p=>[p.usdCents,p.baseGold+p.bonusGold]),[[100,1],[500,5],[1000,10],[5000,60]]);
assert.equal(COUNTDOWN_SECONDS,5);
const pool=LOOT_ODDS.flatMap((_,rarity)=>[0,1].map(id=>({slot:'test',id:`${rarity}-${id}`,name:'Test',rarity})));
save();assert(Math.abs(pool.reduce((sum,p)=>sum+lootChance(p,pool),0)-100)<1e-9);
let lower=0;for(let tier=0;tier<5;tier++){for(const r of [lower/100,(lower+LOOT_ODDS[tier]-.000001)/100])assert.equal(rollLoot(pool,()=>r).rarity,tier);lower+=LOOT_ODDS[tier];}
save(['test:0-0']);assert.equal(lootChance(pool[0],pool),0);assert.equal(lootChance(pool[1],pool),60);
save(['test:0-0','test:0-1']);assert.equal(lootChance(pool[0],pool),30);
console.log('PASS legacy ownership, retro purchase/equip, duplicate protection, 1000-gold gift idempotency, $50 pack, rarity boundaries and probability normalization.');
