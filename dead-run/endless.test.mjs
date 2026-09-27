import test from 'node:test';
import assert from 'node:assert/strict';
import {Run,CARDS} from './model.mjs';
import {difficultyAt,POWERUPS} from './endless.mjs';
import {normalizeProfile,buySkill,skillState,runReward,SKILLS} from './progression.mjs';
function empty(profile){const r=new Run(24,'carbine','dead-city',profile);r.entities=[];r.platforms=[];r.exits=[];r.nextRow=r.nextPowerup=r.nextCrate=r.nextPlatformGroup=Infinity;return r;}
function step(r,seconds){for(let t=0;t<seconds;t+=1/60){if(r.drafting)r.choose(r.choices[0]);if(r.choosingWeapon)r.chooseWeapon('keep');r.update(1/60);}}
test('speed increases gently while combat difficulty continues beyond the old six districts',()=>{
 const a=difficultyAt(0),b=difficultyAt(60),c=difficultyAt(600),d=difficultyAt(1200);
 const previousAtOneMinute=25*Math.exp(60/190);
 assert.equal(a.speed,27);assert(b.speed>previousAtOneMinute&&b.speed<previousAtOneMinute*1.1);assert(c.speed>b.speed);assert(d.health>c.health*2);assert(d.damage>c.damage);assert(d.pack>=c.pack);assert(d.spacing<=c.spacing);
 assert(!difficultyAt(44).surge);assert(difficultyAt(45).surge);assert(!difficultyAt(60).surge);assert(difficultyAt(105).surge);
});
test('minigun sweeps all lanes and pierces whole packs without changing permanent weapon stats',()=>{
 const r=empty(),damage=r.damage,range=r.range,interval=r.interval;
 for(const lane of [-1.5,-.5,.5,1.5])for(let i=0;i<5;i++)r.zombie('brute',lane,80+i*8);
 r.activatePowerup('minigun');assert(r.shoot());assert.equal(r.kills,20);assert(r.totalXp>0);assert.equal(r.damage,damage);assert.equal(r.range,range);assert.equal(r.interval,interval);
 r.entities=[];r.xp=0;r.powers.minigun=.01;r.update(.02);assert(!r.activeMinigun);assert.deepEqual(r.aimLanes(),[-.5]);assert.equal(r.weapon,'carbine');
});
test('stim multiplies bullets, grenades and burning by exactly 1.5, refreshes rather than stacking',()=>{
 const a=empty(),b=empty();b.activatePowerup('stim');b.activatePowerup('stim');assert.equal(b.powers.stim,15);
 const x=a.zombie('brute',a.lane,100),y=b.zombie('brute',b.lane,100),hp=x.hp;a.shoot();b.shoot();assert(Math.abs((hp-y.hp)/(hp-x.hp)-1.5)<1e-10);
 for(const r of [a,b]){r.entities=[];r.blast=10;}const ga=a.zombie('brute',a.lane,50),gb=b.zombie('brute',b.lane,50);a.action('grenade');b.action('grenade');assert.equal(ga.maxHp-ga.hp,10);assert.equal(gb.maxHp-gb.hp,15);
 for(const r of [a,b]){r.shotTimer=100;r.burn=12;r.entities.forEach(e=>e.burning=2);}const ha=ga.hp,hb=gb.hp;a.update(1/60);b.update(1/60);assert(Math.abs((hb-gb.hp)/(ha-ga.hp)-1.5)<1e-10);
 b.powers.stim=.01;b.update(.02);assert.equal(b.damageMultiplier,1);assert.equal(b.damage,24);
});
test('spikeboard shields damage, speeds the runner and crushes zombies and obstacles',()=>{
 const a=empty(),b=empty();b.activatePowerup('skateboard');b.hurt(999,'test');assert.equal(b.hp,100);
 const z=b.zombie('brute',b.lane,9);z.hp=z.maxHp=1e8;b.add('car',b.lane,10);const supply=b.add('supply',b.lane,12);a.update(.1);b.update(.1);
 assert.equal(b.kills,1);assert(z.done);assert(!b.entities.some(e=>e.kind==='car'));assert(!supply.done);assert(Math.abs(b.speed/a.speed-1.35)<1e-8);assert(Math.abs(b.distance/a.distance-1.35)<1e-8);
 b.powers.skateboard=.001;b.update(.02);b.hurt(20,'test');assert.equal(b.hp,80);
});
test('power-ups are collected by lane and height and remain deterministic random drops',()=>{
 const r=empty();r.add('powerup',r.lane,1,{powerup:'stim',elevation:0});r.update(1/60);assert(r.powers.stim>14.9);assert(!r.testRun);
 const missed=empty();missed.add('powerup',1.5,1,{powerup:'minigun'});missed.update(1/60);assert.equal(missed.powers.minigun,0);
 const kinds=new Set();for(let seed=0;seed<30;seed++){const a=new Run(seed),b=new Run(seed);for(let i=0;i<30;i++){for(const x of [a,b]){x.distance=i*300;x.time=i*9;x.entities=[];x.generate();}assert.deepEqual(a.entities,b.entities);a.entities.filter(e=>e.kind==='powerup').forEach(e=>kinds.add(e.powerup));}}
 assert.equal(kinds.size,3);
});
test('drafts freeze power timers and practice activation forfeits currency',()=>{
 const r=empty();r.activatePowerup('minigun',true);r.drafting=true;r.update(.25);assert.equal(r.powers.minigun,10);r.distance=5000;r.kills=1000;r.time=150;assert.equal(runReward(r),0);assert(!r.activatePowerup('stim'));
 r.drafting=false;r.dead=true;assert(!r.activatePowerup('stim'));assert(!r.activatePowerup('bad'));
});
test('permanent tree enforces prerequisite ranks, costs and caps',()=>{
 const p=normalizeProfile({scrap:10000});assert(!buySkill(p,'plating'));assert(buySkill(p,'vitality'));assert.equal(p.scrap,9975);assert(!buySkill(p,'plating'));assert(buySkill(p,'vitality'));assert.equal(p.scrap,9930);assert(buySkill(p,'plating'));
 while(buySkill(p,'vitality')){}assert.equal(p.ranks.vitality,5);const before=p.scrap;assert(!buySkill(p,'vitality'));assert.equal(p.scrap,before);assert(!buySkill(p,'bad'));
 const poor=normalizeProfile();assert(!buySkill(poor,'power'));assert.equal(skillState(poor,'power').cost,25);
});
test('profile survives JSON round trip, sanitizes invalid data and applies only to fresh runs',()=>{
 const p=normalizeProfile({scrap:1000,ranks:{vitality:3,plating:2,recovery:1,power:3,haste:2,critical:1,fortune:2,duration:2,prepared:1}}),r=empty(p);
 assert.equal(r.maxHp,130);assert.equal(r.hp,130);assert.equal(r.damage,24*1.24);assert.equal(r.interval,.28/1.1);assert.equal(r.armor,.92);assert.equal(r.crit,.05);assert.equal(r.rations,3);assert.equal(r.grenades,3);assert.equal(r.rerolls,2);r.activatePowerup('stim');assert.equal(r.powers.stim,18);
 buySkill(p,'vitality');assert.equal(r.maxHp,130);assert.equal(empty(p).maxHp,140);assert.deepEqual(normalizeProfile(JSON.parse(JSON.stringify(p))),p);assert.equal(empty().maxHp,100);
 const bad=normalizeProfile({scrap:-3,ranks:{vitality:999,plating:-5,haste:4,prepared:Infinity}});assert.equal(bad.scrap,0);assert.equal(bad.ranks.vitality,5);assert.equal(bad.ranks.plating,0);assert.equal(bad.ranks.haste,0);assert.equal(bad.ranks.prepared,0);assert.deepEqual(normalizeProfile(null),normalizeProfile());
});
test('scrap rewards reward survival, kills and fortune without free zero-time farming',()=>{
 const r=empty();assert.equal(runReward(r),0);r.distance=1200;r.kills=40;r.time=65;assert.equal(runReward(r),26);r.scrapBonus=1.3;assert.equal(runReward(r),33);
});
test('an exhausted build always gets a usable recovery card',()=>{
 const r=empty();for(const c of CARDS)r.deck[c.id]=c.max;r.hp=r.maxHp;r.drafting=true;r.rollCards();assert.deepEqual(r.choices,['reserves']);assert(r.choose('reserves'));assert(!r.drafting);assert.equal(r.grenades,3);
});
test('a simulated long run keeps spawning every system and retains bounded state',()=>{
 const r=new Run(199);let highestEntities=0,highestPlatforms=0,seenLatePickups=0;
 for(let i=0;i<60*60*20;i++){
  r.hp=r.maxHp;r.invincible=1;r.update(1/60);r.events=[];
  if(r.drafting)r.choose(r.choices[0]);if(r.choosingWeapon)r.chooseWeapon('keep');
  highestEntities=Math.max(highestEntities,r.entities.length);highestPlatforms=Math.max(highestPlatforms,r.platforms.length);
  if(r.time>600&&r.entities.some(e=>e.kind==='powerup'))seenLatePickups++;
 }
 assert(r.distance>40000);assert(!r.won&&!r.dead);assert(r.sector>70);assert(r.level>10);assert(seenLatePickups>0);assert(highestEntities<260);assert(highestPlatforms<=24);assert(r.killLanes.length<8);
});
