import test from 'node:test';
import assert from 'node:assert/strict';
import {Run,CARDS,WEAPONS,LANES,SWAP_DURATION} from './model.mjs';
import {playerAnimation} from './animation.mjs';
function empty(weapon='carbine'){const r=new Run(77,weapon);r.entities=[];r.platforms=[];r.blockades=[];r.exits=[];r.nextRow=r.nextPowerup=r.nextCrate=r.nextPlatformGroup=Infinity;return r;}
function step(r,t){for(let i=0;i<Math.ceil(t*60);i++)r.update(1/60);}
function give(r,id,slot){r.choosingWeapon=true;r.weaponChoices=[id];assert(r.chooseWeapon(id,slot));}
function card(r,id){r.drafting=true;r.choices=[id];assert(r.choose(id));}
test('two slots start with the selected weapon and an empty secondary; crate can fill or replace either',()=>{
 const r=empty();assert.deepEqual(r.weaponSlots,['carbine',null]);assert(!r.swapWeapon(1));give(r,'katana',1);assert.deepEqual(r.weaponSlots,['carbine','katana']);assert.equal(r.weapon,'katana');assert.equal(r.activeSlot,1);give(r,'scorpion',0);assert.deepEqual(r.weaponSlots,['scorpion','katana']);assert.equal(r.weapon,'scorpion');
 r.openWeaponCrate();const slots=[...r.weaponSlots];assert(!r.chooseWeapon(r.weaponChoices[0],2));assert(r.choosingWeapon);assert(r.chooseWeapon('keep'));assert.deepEqual(r.weaponSlots,slots);
});
test('crate offers exclude both held weapons and remain unique',()=>{
 const r=empty();give(r,'katana',1);for(let i=0;i<50;i++){assert(r.openWeaponCrate());assert.equal(new Set(r.weaponChoices).size,3);assert(r.weaponChoices.every(id=>!r.weaponSlots.includes(id)));r.chooseWeapon('keep');}
});
test('swaps preserve all card bonuses on both weapons, without replaying consumables',()=>{
 const r=empty();give(r,'shotgun',1);for(const id of ['caliber','trigger','pierce','fire','earth','grenade'])card(r,id);const hp=r.hp,grenades=r.grenades;
 step(r,SWAP_DURATION);assert(r.swapWeapon(0));assert.equal(r.weapon,'carbine');assert.equal(r.pierce,2);assert.equal(r.spread,0);assert(Math.abs(r.damage-24*1.3)<1e-9);
 card(r,'caliber');step(r,SWAP_DURATION);assert(r.swapWeapon(1));assert.equal(r.weapon,'shotgun');assert.equal(r.pierce,3);assert.equal(r.spread,1);assert(Math.abs(r.damage-64*1.3**2)<1e-9);assert(Math.abs(r.interval-.85/1.22)<1e-9);assert.equal(r.burn,18);assert.equal(r.thorns,150);assert.equal(r.hp,hp);assert.equal(r.grenades,grenades);
});
test('swap animation holsters old weapon then draws new, blocks shots, and freezes with drafts/crates',()=>{
 const r=empty();give(r,'deagle',1);assert.equal(playerAnimation(r).pose,'swap');assert(playerAnimation(r).asset.includes('carbine'));assert(!r.shoot());assert(!r.swapWeapon(0));step(r,.25);assert(playerAnimation(r).asset.includes('deagle'));
 const remaining=r.swapTimer;r.drafting=true;step(r,1);assert.equal(r.swapTimer,remaining);assert(!r.swapWeapon(0));r.drafting=false;r.openWeaponCrate();step(r,1);assert.equal(r.swapTimer,remaining);r.chooseWeapon('keep');step(r,.25);assert.equal(r.swapTimer,0);assert.notEqual(playerAnimation(r).pose,'swap');
});
test('holstered weapon cooldowns expire with time and swaps cannot reset a Barrett shot',()=>{
 const r=empty('barrett');give(r,'deagle',1);step(r,.5);r.swapWeapon(0);step(r,.5);r.shotTimer=1.55;assert(r.swapWeapon(1));step(r,.45);assert(r.swapWeapon(0));assert(r.shotTimer>1);step(r,.45);assert(r.shotTimer>.6);assert.equal(r.weapon,'barrett');
});
test('swapping works during a jump and a temporary minigun returns to the selected slot',()=>{
 const r=empty();give(r,'katana',1);step(r,.5);r.action('jump');assert(r.swapWeapon(0));assert(!r.grounded);step(r,.5);r.activatePowerup('minigun');assert(r.swapWeapon(1));assert(r.activeMinigun);r.powers.minigun=.1;step(r,.5);assert(!r.activeMinigun);assert.equal(r.weapon,'katana');assert.equal(r.activeSlot,1);
});
test('Scorpion fires exactly two bullets across two adjacent lanes with half damage each',()=>{
 for(const lane of LANES){const r=empty('scorpion');r.x=r.lane=lane;const targets=LANES.map(l=>{const e=r.zombie('brute',l,40);e.hp=e.maxHp=1000;return e;});r.shoot();const shots=r.events.filter(e=>e.type==='shot');assert.equal(shots.length,2);assert.equal(new Set(shots.map(e=>e.lane)).size,2);assert(shots.some(e=>e.lane===lane));assert.equal(Math.abs(shots[0].lane-shots[1].lane),1);assert.equal(targets.filter(e=>e.hp<1000).length,2);assert.equal(targets.reduce((sum,e)=>sum+1000-e.hp,0),10);assert(targets.filter(e=>e.hp<1000).every(e=>e.hp===995));}
});
test('Scorpion still emits two half-damage bullets with only one target; Crossfire cannot widen it',()=>{
 const r=empty('scorpion');card(r,'spread');card(r,'caliber');const e=r.zombie('brute',r.lane,40),hp=e.hp;r.shoot();assert.equal(r.events.filter(e=>e.type==='shot').length,2);assert.equal(hp-e.hp,6.5);assert.equal(r.aimLanes().length,2);
 r.entities=[];r.events=[];assert(!r.shoot());assert.equal(r.events.length,0);
});
test('new runs reset both inventory slots and all swap state',()=>{
 const r=empty('revolver');assert.deepEqual(r.weaponSlots,['revolver',null]);assert.equal(r.activeSlot,0);assert.equal(r.swapTimer,0);assert(!r.swapWeapon(-1));assert(!r.swapWeapon(2));assert(!r.swapWeapon(0));r.dead=true;assert(!r.swapWeapon(1));
});
test('Crossfire considers the holstered weapon when the active weapon already spreads',()=>{
 const r=empty();give(r,'shotgun',1);const c=CARDS.find(c=>c.id==='spread');assert(c.eligible(r));card(r,'spread');assert(!c.eligible(r));step(r,.5);r.swapWeapon(0);assert.equal(r.spread,1);
});
