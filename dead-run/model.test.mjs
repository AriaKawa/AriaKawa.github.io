import test from 'node:test';
import assert from 'node:assert/strict';
import {Run,CARDS,SECTOR_LENGTH,LANES,ROLL_DURATION,xpRequired,platformHeight,nearestLane} from './model.mjs';
function empty(weapon='carbine'){const r=new Run(42,weapon);r.entities=[];r.platforms=[];r.exits=[];r.nextRow=Infinity;r.nextPowerup=r.nextCrate=Infinity;r.nextPlatformGroup=Infinity;return r;}
function advance(r,seconds){for(let t=0;t<seconds;t+=1/60)r.update(1/60);}
function kill(r,kind='walker',lane=r.lane,at=r.distance+70){const e=r.zombie(kind,lane,at);r.hit(e,10000);return e;}

test('four lanes have reachable bounds and aiming tracks the nearest lane',()=>{
 const r=empty();assert.deepEqual(LANES,[-1.5,-.5,.5,1.5]);
 r.action('left');assert.equal(r.lane,-1.5);assert(!r.action('left'));
 for(let i=0;i<3;i++)r.action('right');assert.equal(r.lane,1.5);assert(!r.action('right'));advance(r,.4);assert(r.x>1.49);
 assert.equal(nearestLane(-.8),-.5);assert.equal(nearestLane(.8),.5);assert.equal(nearestLane(1.4),1.5);
});
test('zombie health, damage, runners and elite pressure grow with survival time',()=>{
 const r=empty(),w=r.zombie('walker',-.5,100),b=r.zombie('brute',.5,100);assert.equal(w.hp,35.625);assert.equal(b.hp,126.5625);
 const early=r.zombie('runner',.5,100);r.time=300;const late=r.zombie('walker',-.5,100),runner=r.zombie('runner',.5,100);assert(late.hp>w.hp*4);assert(late.damage>w.damage);assert(runner.speed>early.speed);
});

test('single-lane carbine reaches far while shotgun hits nearby neighboring lanes',()=>{
 const r=empty(),a=r.zombie('walker',-.5,140),b=r.zombie('walker',.5,140),far=r.zombie('walker',-.5,146);r.shoot();assert.equal(a.hp,11.625);assert.equal(b.hp,35.625);assert.equal(far.hp,35.625);
 const s=empty('shotgun');for(const l of LANES){s.zombie('walker',l,20);s.zombie('walker',l,27);}const distant=s.zombie('walker',-.5,35);s.shoot();assert.equal(s.kills,6);assert.equal(distant.hp,35.625);assert(s.entities.filter(e=>e.lane===1.5).every(e=>!e.done));
 s.x=-1.5;assert.deepEqual(s.aimLanes(),[-1.5,-.5]);
 const p=empty('revolver');p.zombie('walker',-.5,40);p.zombie('walker',-.5,55);p.shoot();assert.equal(p.kills,2);
});
test('aiming raises before firing and lowers when targets disappear',()=>{
 const r=empty();r.shotTimer=0;r.zombie('walker',-.5,70);r.update(.05);assert(r.aim>0&&r.aim<1);assert(!r.events.some(e=>e.type==='shot'));advance(r,.2);assert(r.events.some(e=>e.type==='shot'));r.entities=[];advance(r,.5);assert.equal(r.aim,0);assert.equal(r.firePose,0);
});
test('grenades affect all four lanes, consume charges and award kill XP',()=>{
 const r=empty();for(const l of LANES)r.zombie('walker',l,80);const far=r.zombie('brute',-.5,180);r.action('grenade');assert.equal(r.kills,4);assert.equal(r.xp,20);assert.equal(r.grenades,1);assert.equal(far.hp,126.5625);assert(r.chase<5);r.action('grenade');assert(!r.action('grenade'));
});
test('damage respects armor, invulnerability and death',()=>{
 const r=empty();r.armor=.5;r.hurt(40,'hit');assert.equal(r.hp,80);r.hurt(40,'hit');assert.equal(r.hp,80);r.invincible=0;r.hurt(200,'last');assert(r.dead);const d=r.distance;r.update(.1);assert.equal(r.distance,d);
});
test('dodge roll is finite, cannot be restarted mid-roll, and clears low wire',()=>{
 const r=empty();assert(r.action('roll'));assert.equal(r.roll,ROLL_DURATION);assert(!r.action('roll'));advance(r,.18);r.add('gate',r.lane,r.distance+1);r.update(1/60);assert.equal(r.hp,100);advance(r,.7);assert.equal(r.roll,0);assert(r.action('roll'));
 const s=empty();s.add('gate',s.lane,1);s.update(1/60);assert.equal(s.hp,78);
});
test('rolling from a jump fast-drops and begins the roll on landing without teleporting',()=>{
 const r=empty();r.action('jump');advance(r,.25);const high=r.elevation;assert(high>1);r.action('roll');assert.equal(r.elevation,high);assert.equal(r.roll,0);assert(r.rollQueued);advance(r,.2);assert(r.grounded);assert(r.roll>0);assert.equal(r.elevation,0);
});
test('barriers, barrels and spikes are jumpable but wrecks require changing lane',()=>{
 for(const kind of ['barrier','barrels','spikes']){const r=empty();r.action('jump');advance(r,.2);r.add(kind,r.lane,r.distance+1);r.update(1/60);assert.equal(r.hp,100,kind);}
 const r=empty();r.add('car',r.lane,1);r.update(1/60);assert.equal(r.hp,64);
});
test('only kills grant XP; leveling unlocks a paused choice of three upgrades',()=>{
 const r=empty();kill(r);kill(r,'runner');kill(r,'brute');assert.equal(r.totalXp,27);r.update(.1);assert(!r.drafting);for(let i=0;i<7;i++)kill(r);r.update(1/60);assert.equal(r.level,2);assert.equal(r.xp,2);assert.equal(r.totalXp,62);assert(r.drafting);assert.equal(new Set(r.choices).size,3);
 const d=r.distance;r.update(.25);assert.equal(r.distance,d);assert(!r.action('grenade'));assert(!r.choose('invalid'));const id=r.choices[0];assert(r.choose(id));assert.equal(r.deck[id],1);assert(!r.drafting);assert(!r.choose(id));
});
test('overflow XP earns sequential choices without losing XP or duplicating rewards',()=>{
 const r=empty();for(let i=0;i<20;i++)kill(r);for(let i=0;i<6;i++)kill(r,'brute');r.update(1/60);
 assert.equal(r.totalXp,190);assert.equal(r.level,2);assert.equal(r.xp,130);assert(r.choose(r.choices[0]));assert(r.drafting);assert.equal(r.level,3);assert.equal(r.xp,35);assert(r.choose(r.choices[0]));assert(!r.drafting);assert.equal(Object.values(r.deck).reduce((a,b)=>a+b,0),2);assert.equal(r.xp+xpRequired(1)+xpRequired(2),r.totalXp);
});
test('travel, dodging and pickups give no XP or free distance-based cards',()=>{
 const r=empty();r.add('supply',r.lane,1);r.zombie('walker',1.5,40);advance(r,18);assert(r.distance>450);assert.equal(r.sector,1);assert.equal(r.kills,0);assert.equal(r.totalXp,0);assert.equal(r.level,1);assert(!r.drafting);assert.deepEqual(r.deck,{});
});
test('avoiding every fight eventually loses ground while earned levels control late horde pressure',()=>{
 const under=empty(),leveled=empty();for(const r of [under,leveled]){r.distance=1350;r.sector=3;r.nextCheckpoint=1800;r.chase=0;}leveled.level=4;
 advance(under,10);advance(leveled,10);assert(under.chase>leveled.chase*2);
 const pacifist=empty();advance(pacifist,120);assert(pacifist.dead);assert(!pacifist.won);assert.equal(pacifist.totalXp,0);assert(pacifist.distance>900&&pacifist.distance<6000);
});
test('rerolls are limited and never offer exhausted or unusable upgrades',()=>{
 const r=empty('shotgun');r.drafting=true;for(const c of CARDS)if(!['grenade','caliber','trigger'].includes(c.id))r.deck[c.id]=c.max;r.rollCards();assert.deepEqual([...r.choices].sort(),['caliber','grenade','trigger']);assert(r.reroll());assert.equal(r.rerolls,0);assert(!r.reroll());
});
test('every card changes real stats and stacks persist',()=>{
 for(const c of CARDS){const r=empty();r.hp=40;r.drafting=true;r.choices=[c.id];assert(r.choose(c.id));assert.equal(r.deck[c.id],1);}
 const r=empty();for(let i=0;i<2;i++){r.drafting=true;r.choices=['caliber'];r.choose('caliber');}assert(Math.abs(r.damage-40.56)<.001);
});
test('supplies heal, reduce horde pressure, and every fifth adds a grenade',()=>{
 const r=empty();r.hp=50;r.chase=60;r.supplies=4;r.add('supply',r.lane,1);r.update(1/60);assert.equal(r.supplies,5);assert.equal(r.hp,58);assert.equal(r.grenades,3);assert(r.chase<53);assert.equal(r.totalXp,0);
});
test('incendiary kills award XP once and kill healing works',()=>{
 const r=empty();r.burn=100;r.leech=2;r.hp=50;const z=r.zombie('brute',r.lane,60);r.shoot();advance(r,1.5);assert(z.done);assert.equal(r.totalXp,15);assert.equal(r.kills,1);assert(r.hp>50);r.hit(z,1000);assert.equal(r.totalXp,15);
});
test('each route contains six vehicles, a descent, and separation before the next route',()=>{
 const r=new Run(12);assert.equal(r.platforms.length,24);
 for(let group=0;group<4;group++){const route=r.platforms.filter(p=>p.group===group);assert.equal(route.length,6);assert(route[0].ramp);assert(route[5].exitRamp);assert.equal(route[5].end-route[0].at,192);assert.equal(platformHeight(route[5],route[5].end),0);if(group<3)assert(r.platforms[(group+1)*6].at-route[5].end>300);}
});
test('ramps lift and lower the runner without damage or a sudden drop',()=>{
 const r=empty();r.platforms=[{id:'bus',kind:'bus',lane:r.lane,at:5,end:100,height:3,ramp:18,exitRamp:18}];advance(r,1.3);assert.equal(r.hp,100);assert.equal(r.elevation,3);assert(r.grounded);
 r.distance=90;advance(r,.1);assert(r.elevation>0&&r.elevation<2);assert(r.grounded);advance(r,.6);assert.equal(r.elevation,0);assert(r.grounded);assert.equal(r.hp,100);
});
test('generated exits have no zombies or hazards and approaching runners respect the buffer',()=>{
 for(let seed=0;seed<50;seed++){const r=new Run(seed);r.distance=2700;r.generate();for(const exit of r.exits)assert(r.entities.filter(e=>e.kind!=='supply').every(e=>e.lane!==exit.lane||e.at<exit.start||e.at>=exit.end));}
 const r=empty();r.exits=[{lane:1.5,start:100,end:180}];r.distance=115;r.nextCheckpoint=450;const e=r.zombie('runner',1.5,180.1);advance(r,1);assert(e.at>=180);
});
test('roof jump clears a gap and changing lane falls safely to the street',()=>{
 const r=empty();r.platforms=[{id:'a',lane:r.lane,at:0,end:20,height:3,ramp:0},{id:'b',lane:r.lane,at:28,end:100,height:3,ramp:0}];r.distance=12;r.elevation=r.supportHeight=3;r.action('jump');advance(r,.9);assert(r.distance>28);assert.equal(r.elevation,3);assert(r.grounded);r.action('right');advance(r,1);assert.equal(r.elevation,0);assert.equal(r.hp,100);
});
test('roof collision ignores ground hazards and respects rooftop hurdles',()=>{
 const r=empty();r.platforms=[{id:'a',lane:r.lane,at:0,end:200,height:3,ramp:0}];r.elevation=r.supportHeight=3;r.add('car',r.lane,1,{elevation:0});r.update(1/60);assert.equal(r.hp,100);r.add('barrier',r.lane,r.distance+1,{elevation:3});r.update(1/60);assert.equal(r.hp,78);
});
test('vehicle sides block entry and low gunfire but allow shots from the roof',()=>{
 const r=empty();r.platforms=[{id:'a',lane:r.lane,at:5,end:120,height:3,ramp:0}];const z=r.zombie('walker',r.lane,80);assert(!r.shoot());r.distance=7;r.update(1/60);assert.equal(r.elevation,0);assert.equal(r.hp,64);assert.notEqual(r.lane,-.5);
 r.elevation=r.supportHeight=3;r.lane=r.x=-.5;assert(r.shoot());assert.equal(z.hp,11.625);
});
test('endless generation is repeatable, denser later, and remains bounded',()=>{
 for(let seed=0;seed<30;seed++){const r=new Run(seed),b=new Run(seed);assert.deepEqual(r.entities,b.entities);assert.deepEqual(r.platforms,b.platforms);
 const initial=r.entities.filter(e=>e.hp>0).length;r.distance=30000;r.time=800;r.entities=[];r.generate();
 assert(r.entities.filter(e=>e.hp>0).length>initial*2);assert(r.entities.some(e=>e.kind==='brute'));assert(r.entities.some(e=>e.kind==='runner'));assert(r.entities.some(e=>e.elite));
 assert(r.entities.length<240);assert(r.platforms.length<18);assert(r.killLanes.length<8);assert(r.platforms.some(p=>p.at>r.distance));
 for(const lane of LANES)assert(r.entities.some(e=>e.hp>0&&e.lane===lane));for(let i=1;i<r.killLanes.length;i++)assert.notEqual(r.killLanes[i].lane,r.killLanes[i-1].lane);
 }
});

test('combat, rolling and movement remain stable at 30 and 60 Hz',()=>{
 const a=empty(),b=empty();for(const r of [a,b]){r.zombie('brute',r.lane,100);r.zombie('walker',1.5,150);r.action('roll');}for(let i=0;i<120;i++)a.update(1/60);for(let i=0;i<60;i++)b.update(1/30);assert(Math.abs(a.distance-b.distance)<.01);assert.equal(a.kills,b.kills);assert.equal(a.xp,b.xp);assert.equal(a.roll,b.roll);
});
test('XP choices freeze elevated movement and resume on the same roof',()=>{
 const r=empty();r.platforms=[{id:'a',lane:r.lane,at:0,end:600,height:3,ramp:0}];r.elevation=r.supportHeight=3;r.xp=60;r.totalXp=60;r.update(1/60);assert(r.drafting);r.update(.25);assert.equal(r.elevation,3);r.choose(r.choices[0]);r.update(.1);assert.equal(r.elevation,3);
});
test('passing 2700 meters continues the run and new runs reset temporary builds',()=>{
 const r=empty();r.distance=2699.9;r.hp=1;r.add('car',r.lane,2700);r.update(1/60);assert(r.dead);assert(!r.won);
 const w=empty();w.distance=2699.9;w.sector=5;w.nextCheckpoint=2700;w.update(1/60);assert(!w.won);assert(!w.dead);assert(w.distance>2700);assert.equal(w.sector,6);
 const n=new Run(1);assert.deepEqual(n.deck,{});assert.equal(n.level,1);assert.equal(n.xp,0);assert.equal(n.hp,100);assert.equal(n.map,'dead-city');assert.equal(new Run(1,'bad','bad').map,'dead-city');
});
