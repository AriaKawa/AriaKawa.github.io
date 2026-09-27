import test from 'node:test';
import assert from 'node:assert/strict';
import {existsSync} from 'node:fs';
import {Run,CARDS,WEAPONS} from './model.mjs';
import {replacementStats} from './arsenal.mjs';
import {playerAnimation} from './animation.mjs';
import {ASSETS,CARD_ART} from './visuals.mjs';
function empty(weapon='carbine',profile){const r=new Run(38,weapon,'dead-city',profile);r.entities=[];r.platforms=[];r.exits=[];r.nextRow=r.nextCrate=r.nextPowerup=r.nextPlatformGroup=Infinity;return r;}
function card(r,id){r.drafting=true;r.choices=[id];assert(r.choose(id));}
function advance(r,t){for(let i=0;i<Math.round(t*60);i++)r.update(1/60);}
function target(r,kind='brute',lane=r.lane,z=60,hp=10000){const e=r.zombie(kind,lane,r.distance+z);e.hp=e.maxHp=hp;return e;}

test('all kill sources and elites grant exactly half the old XP',()=>{
 for(const kind of ['walker','runner','brute'])for(const elite of [false,true])for(const source of ['weapon','fire','thorns','grenade']){
  const r=empty(),e=target(r,kind);e.elite=elite;r.hit(e,100000,source);const expected={walker:5,runner:7,brute:15}[kind]*(elite?2:1);assert.equal(r.totalXp,expected);r.hit(e,100000,source);assert.equal(r.totalXp,expected);
 }
});
test('ice slows the approach of walkers and runners for a finite duration',()=>{
 for(const kind of ['walker','runner']){const a=empty(),b=empty();card(b,'ice');const ea=target(a,kind),eb=target(b,kind);a.shoot();b.shoot();a.shotTimer=b.shotTimer=100;advance(a,1);advance(b,1);assert(eb.at-ea.at>10);assert(eb.chilled>1.9);advance(b,2.1);assert.equal(eb.chilled,0);}
});
test('air doubles jump height and clears a brute with a correctly timed jump',()=>{
 const a=empty(),b=empty();card(b,'air');let maxA=0,maxB=0;for(const r of [a,b]){r.action('jump');r.shotTimer=100;}
 for(let i=0;i<80;i++){a.update(1/60);b.update(1/60);maxA=Math.max(maxA,a.elevation);maxB=Math.max(maxB,b.elevation);}
 assert(Math.abs(maxB/maxA-2)<.01);const r=empty();card(r,'air');r.shotTimer=100;r.action('jump');advance(r,.4);assert(r.elevation>2);target(r,'brute',r.lane,1);r.update(1/60);assert.equal(r.hp,100);
});
test('fire attunement and supports scale burn, grenade fire and explosions exactly once',()=>{
 const r=empty();card(r,'fire');assert.equal(r.burn,18);assert.equal(r.fireBonus,.5);const e=target(r);r.shoot();r.shotTimer=100;const hp=e.hp;r.update(1/60);assert(Math.abs(hp-e.hp-18*1.5/60)<1e-8);
 card(r,'bellows');assert(Math.abs(r.burnDuration-3.6)<1e-9);card(r,'firebomb');const hp2=e.hp;r.action('grenade');assert(Math.abs(hp2-e.hp-130*1.9)<1e-8);assert(Math.abs(e.burning-3.6)<1e-9);
 card(r,'wildfire');card(r,'cinders');r.hp=40;const other=target(r,'brute',.5,62);const before=other.hp;r.hit(e,1e8);assert(Math.abs(before-other.hp-45*1.9)<1e-8);assert.equal(r.hp,43);assert(other.burning>0);
});
test('fire supports require a starter and mutually compatible attunements can coexist',()=>{
 const r=empty();for(const id of ['bellows','wildfire','firebomb','cinders'])assert(!CARDS.find(c=>c.id===id).eligible(r));card(r,'burn');for(const id of ['bellows','wildfire','firebomb','cinders'])assert(CARDS.find(c=>c.id===id).eligible(r));
 for(const id of ['earth','ice','air','fire'])card(r,id);assert(r.thorns>0&&r.chill>0&&r.jumpPower>9&&r.fireBonus>0);for(let i=0;i<60;i++){r.rollCards();assert(!r.choices.some(id=>['earth','ice','air','fire'].includes(id)));}
});
test('earth hurts the colliding zombie while player still takes damage, once per contact',()=>{
 const r=empty();card(r,'earth');r.shotTimer=100;const e=target(r,'brute',r.lane,1,500),damage=e.damage;r.update(1/60);assert.equal(r.hp,100-damage);assert.equal(e.hp,350);advance(r,.1);assert.equal(e.hp,350);
});
test('tank cards combine health scaling, armor, nearby retaliation and limited regeneration',()=>{
 const r=empty();card(r,'earth');card(r,'thorns');card(r,'juggernaut');card(r,'retribution');card(r,'bulwark');assert.equal(r.maxHp,140);assert.equal(r.thornsDamage,252);assert(Math.abs(r.armor-.748)<1e-9);
 r.shotTimer=100;const a=target(r,'brute',r.lane,1),b=target(r,'brute',.5,6);r.update(1/60);assert.equal(a.hp,10000-252);assert.equal(b.hp,10000-126);r.entities=[];r.hp=40;advance(r,1);assert(Math.abs(r.hp-42)<1e-8);r.hp=69.99;advance(r,.1);assert.equal(r.hp,70);
});
test('fatal contact remains fatal even when thorns kills and leech would heal',()=>{
 const r=empty();card(r,'earth');card(r,'leech');r.shotTimer=100;r.hp=1;target(r,'walker',r.lane,1,50);r.update(1/60);assert(r.dead);assert.equal(r.hp,0);assert.equal(r.kills,1);
});
test('two Headshot cards grant critical chance and increased critical damage to guns and sword',()=>{
 for(const w of ['deagle','katana']){const r=empty(w);card(r,'crit');card(r,'headhunter');assert(Math.abs(r.crit-.3)<1e-8);assert.equal(r.critDamage,2.5);r.random=()=>0;const e=target(r,'brute',r.lane,8);r.shoot();assert.equal(e.maxHp-e.hp,r.damage*2.5);}
});
test('crate offers three unique alternatives from all weapons and freezes combat, powers and movement',()=>{
 const seen=new Set();for(let seed=1;seed<45;seed++){const r=new Run(seed);assert(r.openWeaponCrate());assert.equal(new Set(r.weaponChoices).size,3);assert(!r.weaponChoices.includes(r.weapon));r.weaponChoices.forEach(w=>seen.add(w));r.powers.stim=10;const time=r.time,distance=r.distance;r.update(.25);assert.equal(r.time,time);assert.equal(r.distance,distance);assert.equal(r.powers.stim,10);assert(!r.action('grenade'));assert(!r.chooseWeapon('bad'));assert(r.chooseWeapon('keep'));assert.equal(r.weapon,'carbine');assert(!r.chooseWeapon('keep'));}assert.equal(seen.size,7);
});
test('weapon swaps preserve every card and permanent bonus without replaying heals, rerolls or grenades',()=>{
 const r=empty('shotgun',{ranks:{power:3,haste:2}});for(const id of ['caliber','trigger','pierce','fire','ice','air','earth','grenade','rations','vital','crit','headhunter'])card(r,id);
 const before={deck:{...r.deck},hp:r.hp,maxHp:r.maxHp,grenades:r.grenades,rerolls:r.rerolls,burn:r.burn,thorns:r.thorns,crit:r.crit,jump:r.jumpPower};
 for(const id of Object.keys(WEAPONS)){
  r.choosingWeapon=true;r.weaponChoices=[id];const preview=replacementStats(r,id);assert(r.chooseWeapon(id));assert.equal(r.damage,preview.damage);assert(Math.abs(r.damage-WEAPONS[id].damage*1.24*1.3)<1e-8);assert(Math.abs(r.interval-WEAPONS[id].interval/1.1/1.22)<1e-8);assert.equal(r.pierce,WEAPONS[id].pierce+1);assert.equal(r.spread,WEAPONS[id].spread);
  assert.deepEqual({deck:{...r.deck},hp:r.hp,maxHp:r.maxHp,grenades:r.grenades,rerolls:r.rerolls,burn:r.burn,thorns:r.thorns,crit:r.crit,jump:r.jumpPower},before);
 }
 card(r,'spread');r.choosingWeapon=true;r.weaponChoices=['deagle'];r.chooseWeapon('deagle');assert.equal(r.spread,1);
});
test('a crate picked up with a pending level-up resolves before the card draft',()=>{
 const r=empty();r.xp=60;r.totalXp=60;r.add('weaponcrate',r.lane,1,{elevation:0});r.update(1/60);assert(r.choosingWeapon);assert(!r.drafting);assert(r.chooseWeapon('keep'));assert(r.drafting);assert.equal(r.level,2);assert.equal(r.xp,0);
});
test('crate lane/height collision, shield compatibility, safe generation and practice rules',()=>{
 for(const board of [false,true]){const r=empty();if(board)r.activatePowerup('skateboard');r.add('weaponcrate',r.lane,1,{elevation:0});r.update(1/60);assert(r.choosingWeapon);assert(!r.testRun);}
 const miss=empty();miss.add('weaponcrate',1.5,1);miss.update(1/60);assert(!miss.choosingWeapon);const air=empty();air.elevation=3;air.grounded=false;air.add('weaponcrate',air.lane,1);air.update(1/60);assert(!air.choosingWeapon);
 const r=empty();r.openWeaponCrate(true);assert(r.testRun);
 for(let seed=0;seed<40;seed++){const r=new Run(seed);r.distance=4000;r.time=120;r.entities=[];r.generate();const crate=r.entities.find(e=>e.kind==='weaponcrate');if(crate){assert(!r.platformAt(crate.lane,crate.at));assert(!r.clearExit(crate.lane,crate.at));assert(!r.entities.some(e=>e!==crate&&e.lane===crate.lane&&Math.abs(e.at-crate.at)<12));}}
});
test('new weapons have distinct attack patterns, range and animation including an actual sword cut',()=>{
 assert(WEAPONS.scorpion.interval<WEAPONS.glocks.interval&&WEAPONS.scorpion.damage<WEAPONS.glocks.damage);assert(WEAPONS.barrett.interval>1);
 const r=empty('barrett');for(let i=0;i<7;i++)target(r,'walker',r.lane,50+i*8,100);r.shoot();assert.equal(r.kills,6);
 const s=empty('katana');for(const lane of [-1.5,-.5,.5])target(s,'walker',lane,8,80);const far=target(s,'walker',s.lane,13,80);s.shoot();assert.equal(s.kills,3);assert.equal(far.hp,80);assert(s.events.some(e=>e.type==='slash'));assert(!s.events.some(e=>e.type==='shot'));assert.equal(playerAnimation(s).pose,'slash');
 const a=empty('glocks');target(a);a.shoot();a.shoot();assert.deepEqual(a.events.filter(e=>e.type==='shot').map(e=>e.hand),[0,1]);
});
test('all new animation poses and card icons resolve to packaged art',()=>{
 for(const id of ['deagle','glocks','scorpion','barrett','katana']){const r=empty(id);for(const pose of ['run','aim','jump','slash'])for(let i=0;i<8;i++){r.stride=i/8;r.aim=pose==='aim'?1:0;r.grounded=pose!=='jump';r.vy=8-i*2;r.airTime=.1;r.jumping=true;r.slashTimer=pose==='slash'?.28-i*.034:0;const anim=playerAnimation(r);assert(ASSETS[anim.asset],anim.asset);assert(existsSync(new URL(ASSETS[anim.asset],import.meta.url)));}}
 for(const card of CARDS){assert(ASSETS[CARD_ART[card.id]],card.id);assert(existsSync(new URL(ASSETS[CARD_ART[card.id]],import.meta.url)));}
});
