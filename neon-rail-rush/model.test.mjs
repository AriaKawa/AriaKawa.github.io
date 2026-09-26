import test from 'node:test';
import assert from 'node:assert/strict';
import {Run,BASE_SPEED,MAX_SPEED} from './model.mjs';

test('seeded generation is deterministic, bounded, and leaves adjacent safe routes',()=>{
  for(let seed=0;seed<120;seed++){
    const a=new Run(seed),b=new Run(seed);assert.deepEqual(a.entities,b.entities);
    let lastSafe=0;
    for(let distance=0;distance<7000;distance+=200){
      a.distance=distance;a.entities=[];a.generate();const rows=new Map();
      for(const e of a.entities.filter(e=>['train','barrier','gate'].includes(e.kind))){const row=rows.get(e.row)||[];row.push(e);rows.set(e.row,row);}
      for(const row of rows.values()){assert(row.length<=2);assert(row.every(e=>e.lane!==e.safeLane));assert(Math.abs(row[0].safeLane-lastSafe)<=1);lastSafe=row[0].safeLane;}
    }
  }
});
test('lane boundaries and jump/slide transitions',()=>{
  const r=new Run(1);r.action('left');r.action('left');assert.equal(r.lane,-1);r.action('right');r.action('right');r.action('right');assert.equal(r.lane,1);
  r.action('jump');r.update(.05);assert(r.y>0);assert.equal(r.action('jump'),false);r.action('slide');assert.equal(r.y,0);assert(r.slide>0);
});
function collision(kind,setup){const r=new Run(7);r.entities=[];r.add(kind,0,1);setup?.(r);r.update(1/60);return r;}
test('trains collide even in air, barriers allow jumps, gates require slides',()=>{
  assert(collision('train').dead);assert(collision('train',r=>{r.y=1.5;}).dead);
  assert(collision('barrier').dead);assert(!collision('barrier',r=>{r.y=1.5;}).dead);
  assert(collision('gate').dead);assert(!collision('gate',r=>r.action('slide')).dead);
  assert(!collision('train',r=>{r.lane=1;r.x=1;}).dead);
});
test('shield absorbs one hit, magnet collects adjacent coins, pickups cannot count twice',()=>{
  const shield=collision('train',r=>r.shield=true);assert(!shield.dead);assert(!shield.shield);assert(shield.invincible>0);
  const r=new Run(2);r.entities=[];r.magnet=9;r.add('coin',-1,8);r.update(.05);r.update(.05);assert.equal(r.coins,1);
});
test('distance ramps speed up to a bounded maximum and death freezes the run',()=>{
  const r=new Run(4);r.entities=[];r.distance=2400;r.update(.01);assert(r.speed>BASE_SPEED);r.distance=10000;r.update(.01);assert.equal(r.speed,MAX_SPEED);
  r.dead=true;const at=r.distance;r.update(.05);assert.equal(r.distance,at);
});
test('following the generated safe route survives sustained runs at the speed cap',()=>{
  for(let seed=0;seed<20;seed++){
    const r=new Run(seed);r.distance=10000;r.entities=[];r.nextRow=10075;r.generate();
    for(let frame=0;frame<60*180;frame++){
      const row=r.entities.find(e=>['train','barrier','gate'].includes(e.kind)&&e.at-r.distance>=0);
      if(row&&row.at-r.distance<50)r.lane=row.safeLane;
      r.update(1/60);assert(!r.dead,`seed ${seed}, frame ${frame}`);
    }
    assert(r.coins>100);assert(r.entities.length<100);
  }
});
