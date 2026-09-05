import test from 'node:test';
import assert from 'node:assert/strict';
import {Expedition,TOWERS} from '../sequel/engine.js';
function tick(g,seconds=1){for(let n=0;n<seconds*60;n++)g.update(1/60);g.events=[];}
test('convoy salvage, movement boundaries, deployment and occupied pads',()=>{
 const g=new Expedition({seed:3});g.core.x=420;g.core.y=655;g.update(.02);assert.equal(g.scrap,365);assert.equal(g.loot.length,2);g.update(.02);assert.equal(g.scrap,365);
 for(let n=0;n<600;n++)g.update(1/60,{x:-1,y:1});assert.ok(g.core.x>=220);assert.ok(g.core.y<=850);
 assert.equal(g.build(0,0),false);assert.ok(g.deploy());assert.equal(g.pads.length,10);assert.ok(g.build(0,0));assert.equal(g.build(0,0),false);assert.equal(g.deploy(),false);assert.equal(g.startWave(),true);assert.equal(g.startWave(),false);
});
test('upgrade economy, max level, salvage and repair are bounded',()=>{
 const g=new Expedition();g.deploy();g.scrap=1000;g.build(0,0);let t=g.towers[0];g.upgrade(t.id);g.upgrade(t.id);assert.equal(t.level,3);assert.equal(g.upgrade(t.id),false);let scrap=g.scrap;let refund=Math.floor(t.spent*.7);g.sell(t.id);assert.equal(g.scrap,scrap+refund);assert.equal(g.towers.length,0);assert.equal(g.repair(),false);g.hp=900;g.repair();assert.equal(g.hp,1000);g.scrap=0;assert.equal(g.build(4,0),false);
});
test('support targets enemies, honors cooldowns and resets through upgrade',()=>{
 const g=new Expedition();g.deploy();assert.equal(g.strike(0,0),false);g.startWave();g.spawn();g.enemies[0].x=g.core.x;g.enemies[0].y=g.core.y;assert.ok(g.pulse());assert.equal(g.pulse(),false);assert.ok(g.strike(g.core.x,g.core.y));assert.equal(g.strike(0,0),false);g.phase='reward';g.chooseBoon('support');assert.equal(g.cooldowns.strike,0);assert.equal(g.cooldowns.pulse,0);
});
test('checkpoint restores built defenses and rejects unsupported save versions',()=>{
 const g=new Expedition({rig:'bastion',seed:9});g.deploy();g.build(0,0);let restored=Expedition.restore(g.serialize());assert.equal(restored.hp,1200);assert.equal(restored.towers.length,1);assert.equal(restored.phase,'build');assert.equal(restored.routes[0].at(-1).x,g.core.x);assert.throws(()=>Expedition.restore('{"version":99}'));
});
test('an undefended base loses; completed games stop advancing',()=>{
 const g=new Expedition();g.deploy();g.hp=10;g.startWave();for(let n=0;n<60*150&&g.phase==='wave';n++)g.update(1/60);assert.equal(g.phase,'lost');let time=g.time;tick(g,5);assert.equal(g.time,time);assert.equal(g.hp,0);
});
test('a reasonable mixed-defense strategy can finish all nine standard waves',()=>{
 const g=new Expedition({seed:2048});let report=[];
 for(let wave=1;wave<=9;wave++){
  if(g.phase==='convoy'){for(const l of [...g.loot]){g.core.x=l.x;g.core.y=l.y;g.update(.02);}g.core.x=790;g.core.y=600;g.deploy();}
  const loadout=[1,0,4,2,0,3,0,1,2,4];const padOrder=[7,8,6,9,5,0,4,1,3,2];
  for(let i=0;i<10;i++)if(!g.towers.some(t=>t.pad===padOrder[i]))g.build(loadout[i],padOrder[i]);
  for(let t of g.towers)if(g.scrap>g.upgradeCost(t)+65)g.upgrade(t.id);
  if(g.hp<g.maxHp-200)g.repair();assert.equal(g.startWave(),true);
  for(let n=0;n<60*180&&g.phase==='wave';n++){
   if(g.cooldowns.strike===0&&g.enemies.length>14){let target=g.enemies.find(e=>e.type==='boss')||g.enemies[Math.floor(g.enemies.length/2)];g.strike(target.x,target.y);}
   if(g.cooldowns.pulse===0&&g.enemies.some(e=>Math.hypot(e.x-g.core.x,e.y-g.core.y)<200))g.pulse();
   g.update(1/60);g.events=[];
  }
  report.push({wave,hp:Math.round(g.hp),towers:g.towers.length,scrap:g.scrap});assert.notEqual(g.phase,'lost',JSON.stringify(report));
  if(wave<9){assert.equal(g.phase,'reward');g.chooseBoon(wave%2?'damage':'haste');}else assert.equal(g.phase,'won');
 }
 console.log('Standard expedition balance:',JSON.stringify(report));
});
