import test from 'node:test';
import assert from 'node:assert/strict';
import {Run,LANES} from './model.mjs';
import {RANDOM_EVENTS,startEvent,tickEvents} from './random-events.mjs';
import {difficultyAt} from './endless.mjs';
function empty(seed=42){const r=new Run(seed);r.entities=[];r.platforms=[];r.blockades=[];r.exits=[];r.nextRow=r.nextPowerup=r.nextCrate=r.nextPlatformGroup=r.nextEventAt=Infinity;return r;}
function finish(r){r.time=r.activeEvent.endsAt;tickEvents(r);}

test('random event schedule gives warning, never overlaps, and cycles all five without repeats',()=>{
 const a=new Run(14),b=new Run(14),order=[];assert(a.nextEventAt>=45&&a.nextEventAt<=65);
 for(let i=0;i<15;i++)for(const r of [a,b]){
  r.time=r.nextEventAt-4;tickEvents(r);assert(r.eventWarning);assert(!r.activeEvent);
  const id=r.eventWarning.id;r.time=r.nextEventAt;tickEvents(r);assert.equal(r.activeEvent.id,id);assert(!r.eventWarning);
  assert(!startEvent(r,'clear'));if(r===a)order.push(id);finish(r);assert(!r.activeEvent);assert(r.nextEventAt-r.time>=40);
 }
 for(let i=0;i<15;i+=5)assert.equal(new Set(order.slice(i,i+5)).size,5);
 for(let i=1;i<order.length;i++)assert.notEqual(order[i],order[i-1]);
 assert.deepEqual(a.events,b.events);assert(new Set(Array.from({length:12},(_,i)=>new Run(i).nextEventAt)).size>10);
});
test('all event timers freeze in card drafts, weapon crates and after death',()=>{
 for(const flag of ['drafting','choosingWeapon','dead']){const r=empty();startEvent(r,'clear');r[flag]=true;const state=JSON.stringify(r.activeEvent);r.update(.25);assert.equal(r.time,0);assert.equal(JSON.stringify(r.activeEvent),state);assert.equal(r.totalXp,0);}
 const r=empty();r.nextEventAt=3;r.drafting=true;r.update(.25);assert(!r.eventWarning);assert(!r.activeEvent);
});
test('horde preserves living zombies and spawns nonelite walkers behind them across all four lanes',()=>{
 const r=empty();r.time=1000;const original=r.zombie('brute',-.5,100);original.hp-=9;original.burning=2;const hp=original.hp;r.add('barrier',.5,120);r.add('supply',1.5,80);startEvent(r,'horde');r.generate();
 assert(r.entities.includes(original));assert.equal(original.hp,hp);assert.equal(original.burning,2);
 const zombies=r.entities.filter(e=>e.horde);assert(zombies.length>=20);assert(zombies.every(e=>e.kind==='walker'&&!e.elite));assert.equal(new Set(zombies.map(e=>e.lane)).size,4);assert(zombies.every(e=>e.at>=118));assert(r.entities.some(e=>e.kind==='barrier'));assert(r.entities.some(e=>e.kind==='supply'));
 r.distance=240;r.exits=[{lane:-.5,start:240,end:470}];r.generate();assert(!r.entities.some(e=>e.hp>0&&e.lane===-.5&&e.at>=240));
 finish(r);const count=r.entities.length;r.distance+=300;r.generate();assert.equal(r.entities.length,count);
});
test('Clear Skies immediately removes zombies, suppresses generated zombies and preserves obstacles',()=>{
 const r=new Run(42);r.add('car',-.5,120);r.zombie('runner',.5,30);startEvent(r,'clear');assert(!r.entities.some(e=>e.hp>0));assert(r.entities.some(e=>e.kind==='car'));
 for(let i=0;i<4;i++){r.distance+=150;r.generate();assert(!r.entities.some(e=>e.hp>0));}assert(r.entities.some(e=>['barrier','gate','spikes','barrels','car'].includes(e.kind)));
});
test('Clear Skies doubles current speed, freezes chase pressure and restores speed after expiry',()=>{
 for(const board of [false,true]){const r=empty();if(board)r.activatePowerup('skateboard');startEvent(r,'clear');const chase=r.chase;r.update(.1);assert.equal(r.speed,difficultyAt(r.time).speed*(board?1.35:1)*2);assert.equal(r.chase,chase);finish(r);r.xp=0;r.update(.01);assert.equal(r.speed,difficultyAt(r.time).speed*(board?1.35:1));}
});
test('Clear Skies still damages obstacle collisions and pays survival XP exactly once',()=>{
 const r=empty();startEvent(r,'clear');r.add('car',r.lane,2);r.update(.02);assert(r.hp<100);assert.equal(r.totalXp,0);finish(r);assert.equal(r.totalXp,60);assert.equal(r.xp,60);tickEvents(r);assert.equal(r.totalXp,60);assert(r.checkLevelUp());assert.equal(r.level,2);
 const dead=empty();startEvent(dead,'clear');dead.hp=1;dead.add('car',dead.lane,2);dead.update(.02);assert(dead.dead);dead.update(.25);assert.equal(dead.totalXp,0);
});
test('Bucket Heads blocks crit bonuses on both weapon slots, while ordinary damage and fire work',()=>{
 const r=empty();r.crit=1;r.critDamage=3;r.pierce=2;r.burn=8;const z=r.zombie('brute',r.lane,35);z.hp=z.maxHp=1000;startEvent(r,'buckets');r.shoot();assert.equal(z.hp,1000-r.damage);assert(z.burning>0);assert(r.events.filter(e=>e.type==='shot').every(e=>!e.critical));
 r.weaponSlots[1]='barrett';r.swapWeapon(1);r.swapTimer=0;const before=z.hp;r.shoot();assert.equal(z.hp,before-r.damage);r.hit(z,10,'fire');assert.equal(z.hp,before-r.damage-10);
 finish(r);const hp=z.hp;r.shoot();assert.equal(z.hp,hp-r.damage*3);
});
test('Sword Fight multiplies runner contact damage only, keeps thorns, and expires cleanly',()=>{
 for(const kind of ['walker','runner','brute']){const a=empty(),b=empty();startEvent(b,'swords');for(const r of [a,b]){r.shotTimer=100;r.thorns=5;r.zombie(kind,r.lane,2);}a.update(.02);b.update(.02);assert(Math.abs((100-b.hp)/(100-a.hp)-(kind==='runner'?2.5:1))<1e-9);assert(b.entities[0].hp<b.entities[0].maxHp);}
 const r=empty();startEvent(r,'swords');finish(r);r.shotTimer=100;const z=r.zombie('runner',r.lane,r.distance+2);r.update(.02);assert.equal(r.hp,100-z.damage);
 const jumper=empty();startEvent(jumper,'swords');jumper.shotTimer=100;jumper.elevation=2;jumper.grounded=false;jumper.zombie('runner',jumper.lane,2);jumper.update(.02);assert.equal(jumper.hp,100);
});
test('Supply Drop doubles existing and newly generated supply pickups without doubling crates or powerups',()=>{
 const r=new Run(80);const initial=r.entities.filter(e=>e.kind==='supply').length,other=r.entities.filter(e=>['weaponcrate','powerup'].includes(e.kind)).length;startEvent(r,'supply');assert.equal(r.entities.filter(e=>e.kind==='supply').length,initial*2);r.generate();assert.equal(r.entities.filter(e=>e.kind==='supply').length,initial*2);assert.equal(r.entities.filter(e=>['weaponcrate','powerup'].includes(e.kind)).length,other);
 r.distance=300;r.generate();const normal=r.entities.filter(e=>e.kind==='supply'&&!e.bonusSupply),bonus=r.entities.filter(e=>e.bonusSupply);assert.equal(normal.length,bonus.length);for(const e of normal)assert(bonus.some(b=>b.lane===e.lane&&b.at===e.at+2&&b.elevation===e.elevation));
 finish(r);r.entities=[];r.distance=700;r.generate();assert(!r.entities.some(e=>e.bonusSupply));
});
test('weapon crate spacing is roughly halved in frequency and supply events do not alter it',()=>{
 const r=empty();r.nextCrate=350;r.distance=200;r.generate();let crate=r.entities.find(e=>e.kind==='weaponcrate');assert(crate);assert.equal(crate.at,350);
 for(let i=0;i<15;i++){const previous=crate.at;r.distance=r.nextCrate-180;r.entities=[];r.generate();crate=r.entities.find(e=>e.kind==='weaponcrate');assert(crate);assert(crate.at-previous>=840&&crate.at-previous<=1280);}
});
test('new runs reset event state, and event IDs reject invalid inputs',()=>{
 const r=empty();assert(!startEvent(r,'invalid'));assert.equal(r.activeEvent,null);assert.equal(Object.keys(RANDOM_EVENTS).length,5);startEvent(r,'buckets');const next=new Run(r.seed);assert(!next.activeEvent);assert(!next.eventWarning);assert.equal(next.lastEvent,null);
});
