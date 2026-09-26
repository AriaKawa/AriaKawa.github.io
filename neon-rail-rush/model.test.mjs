import test from 'node:test';
import assert from 'node:assert/strict';
import {Run,BASE_SPEED,MAX_SPEED,TRAIN_LENGTH,travelTime} from './model.mjs';

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
test('starting speed is 35 percent faster and trains move in world space',()=>{
  const r=new Run(10);assert(Math.abs(BASE_SPEED-24*1.35)<1e-10);assert.equal(r.speed,32.4);
  r.entities=[];const train=r.add('train',1,120,{speed:20});
  for(let frame=0;frame<60;frame++)r.update(1/60);
  assert(Math.abs(train.at-100)<1e-8);assert(r.distance>32.4);
  assert.equal(train.length,54);assert(train.at-r.distance<68);
});
test('the middle and tail of a passing train remain solid and visible until clear',()=>{
  const r=new Run(11);r.entities=[];
  const train=r.add('train',0,-20);r.update(1/60);
  assert(r.dead,'entering the side of a train must collide after its nose passes');
  assert(!train.done);assert(r.entities.includes(train));
  const clear=new Run(12);clear.entities=[];clear.add('train',0,-TRAIN_LENGTH-3);clear.update(1/60);assert(!clear.dead);
  const passing=new Run(13);passing.entities=[];const t=passing.add('train',1,-20);
  passing.update(1/60);assert(passing.entities.includes(t));
  for(let i=0;i<120;i++)passing.update(1/60);assert(!passing.entities.includes(t));
});
test('train motion is frame-rate independent and shield protection covers its full body',()=>{
  function advance(dt){const r=new Run(44);r.entities=[];const t=r.add('train',1,200);for(let i=0;i<Math.round(2/dt);i++)r.update(dt);return t.at;}
  assert(Math.abs(advance(1/30)-advance(1/120))<1e-8);
  const r=new Run(15);r.entities=[];r.shield=true;r.add('train',0,1,{length:150});
  for(let i=0;i<120;i++)r.update(1/60);
  assert(!r.dead);assert(!r.shield);assert.equal(r.events.filter(e=>e.type==='save').length,1);
});
test('moving train noses arrive at the intended row and the next row waits for the tail',()=>{
  for(const start of [0,2300,10000]){
    const r=new Run(33);r.distance=start;r.entities=[];r.nextRow=start+100;r.rows=8;r.generate();
    const train=r.entities.find(e=>e.kind==='train');assert(train);
    const encounter=train.encounterAt;
    assert(travelTime(start,encounter)>0);
    const expected=train.at-train.speed*travelTime(start,encounter);assert(Math.abs(expected-encounter)<1e-8);
    const next=r.entities.find(e=>e.row===train.row+1);
    if(next){const elapsed=travelTime(start,next.encounterAt-20);const tail=train.at+train.length-train.speed*elapsed;
      assert(tail<next.encounterAt-20,'tail must clear before switching toward next row coins');}
  }
});
test('following the generated safe route survives the speed ramp and speed cap',()=>{
  for(const start of [0,10000])for(let seed=0;seed<20;seed++){
    const r=new Run(seed);if(start){r.distance=start;r.entities=[];r.nextRow=start+75;r.generate();}
    for(let frame=0;frame<60*180;frame++){
      const row=r.entities.find(e=>['train','barrier','gate'].includes(e.kind)&&!e.done&&e.at+(e.length||0)-r.distance>=-2);
      if(row&&row.at-r.distance<50)r.lane=row.safeLane;
      r.update(1/60);assert(!r.dead,`seed ${seed}, frame ${frame}`);
    }
    assert(r.coins>100);assert(r.entities.length<100);
  }
});
