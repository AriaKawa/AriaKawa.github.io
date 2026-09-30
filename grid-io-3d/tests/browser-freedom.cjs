const {chromium}=require(process.env.PLAYWRIGHT_PATH||'playwright');
const assert=require('node:assert/strict'),path=require('node:path'),fs=require('node:fs'),os=require('node:os');
const out=path.join(os.tmpdir(),'grid-io-3d-freedom');fs.mkdirSync(out,{recursive:true});
(async()=>{
 const browser=await chromium.launch({headless:true,channel:'msedge'});
 try {
  const page=await browser.newPage({viewport:{width:1440,height:900}}),errors=[];
  page.on('pageerror',e=>errors.push(e.message));
  await page.goto((process.env.GRID3D_BASE_URL||'http://127.0.0.1:5276')+'/grid-io-3d/?test=1');
  await page.waitForFunction(()=>!document.getElementById('play').disabled);await page.locator('#play').click();
  await page.evaluate(()=>{const a=window.__GRID_TEST__.arena;a.player.grace=1000;for(const r of a.riders.slice(1)){r.alive=false;r.respawn=1e9;}});
  await page.mouse.move(600,500);await page.mouse.move(1200,160);await page.waitForTimeout(250);
  assert.equal(await page.evaluate(()=>window.__GRID_TEST__.graphics.chase.orbitX),0,'unheld mouse leaves camera locked');
  const heading=await page.evaluate(()=>window.__GRID_TEST__.arena.player.angle);
  await page.mouse.down({button:'right'});await page.mouse.move(1400,80,{steps:8});await page.waitForTimeout(350);
  assert(await page.evaluate(()=>window.__GRID_TEST__.graphics.chase.orbitX>.4));
  assert.equal(await page.evaluate(()=>window.__GRID_TEST__.arena.player.angle),heading);
  await page.mouse.up({button:'right'});await page.waitForTimeout(650);
  assert(await page.evaluate(()=>Math.abs(window.__GRID_TEST__.graphics.chase.orbitX)<.02));
  assert(await page.evaluate(()=>window.__GRID_TEST__.graphics.getBike(window.__GRID_TEST__.arena.player).jumpLight.visible));
  await page.screenshot({path:path.join(out,'pixel-pickups-ready-tire.png')});
  await page.keyboard.press('Space');await page.waitForTimeout(120);
  assert(await page.evaluate(()=>!window.__GRID_TEST__.graphics.getBike(window.__GRID_TEST__.arena.player).jumpLight.visible));
  await page.keyboard.press('Escape');
  const scenarios=await page.evaluate(async()=>{
    const {Arena,riderHeight}=await import('../grid-io-3d/simulation.mjs?v=pixel-freedom-1');
    const {ROADS,LOOP,loopPoint,roadPoint}=await import('../grid-io-3d/terrain.mjs?v=pixel-freedom-1');
    const {bikeSpheres}=await import('../grid-io-3d/collisions.mjs?v=pixel-freedom-1');
    const g=window.__GRID_TEST__.graphics,results=[];
    function fresh(pos){const a=new Arena({bots:0,food:0});Object.assign(a.player,{...pos,grace:0,length:1000});a.player.trail=[];a.worldCollision=g.collisionWorld;return a;}
    function run(name,a,n,input=()=>({})){let death=null;for(let i=0;i<n&&a.player.alive;i++){const events=a.step(1/60,input(a.player,i));death=events.find(e=>e.type==='death')?.reason||death;}results.push({name,alive:a.player.alive,x:a.player.x,y:a.player.y,z:a.player.z,loop:a.player.loopS,road:a.player.road,hit:g.collisionWorld.hit(a.player,bikeSpheres(a.player,riderHeight(a.player))),death});return a;}
    for(const road of ROADS)for(const dir of [1,-1]) {
      const p=roadPoint(road,dir>0?0:road.end-road.start);
      run(road.id+' '+dir,fresh({...p,angle:p.angle+(dir<0?Math.PI:0)}),Math.ceil((road.end-road.start+20)/29*60));
    }
    for(const dir of [1,-1]){const p=loopPoint(dir>0?0:LOOP.length);run('loop '+dir,fresh({...p,angle:p.angle+(dir<0?Math.PI:0)}),Math.ceil((LOOP.length+15)/29*60));}
    const tunnel=ROADS[2],under=roadPoint(tunnel,500);
    const jumping=fresh({...under,road:tunnel.id});jumping.jump(jumping.player);run('underground jump',jumping,75);
    const platform={x:-430-36.5,z:-440-20,angle:Math.PI/2};
    const ground=fresh(platform);run('visible platform crash',ground,70);
    const air=fresh(platform);air.jump(air.player);run('jump platform rim',air,90,()=>({boost:true}));
    const bridge=ROADS[0],edge=roadPoint(bridge,1000,bridge.width/2-7);
    const rail=fresh({...edge,road:bridge.id,angle:Math.PI/2});run('visible rail crash',rail,30);
    const clear=fresh({...edge,road:bridge.id,angle:Math.PI/2});clear.jump(clear.player);run('jump rail and fall',clear,160);
    const p=loopPoint(LOOP.approach+LOOP.circle*.5),loop=fresh({...p,loopS:LOOP.approach+LOOP.circle*.5,loopLane:0});
    loop.jump(loop.player);run('jump off inverted loop',loop,120);
    const steer=fresh({...loopPoint(LOOP.approach+10),loopS:LOOP.approach+10,loopLane:0});
    const start=steer.player.angle;run('loop free steering',steer,8,r=>({angle:r.angle+.04}));results.at(-1).angleChange=steer.player.angle-start;
    const wheel=fresh({x:0,y:0,z:150,angle:0});wheel.player.trail=wheel.initialTrail(wheel.player);
    const old=JSON.stringify(wheel.player.trail.map(p=>[p.x,p.y,p.z]));run('wheelie visible trail',wheel,170,()=>({wheelie:true}));
    const kept=JSON.stringify(wheel.player.trail.slice(0,JSON.parse(old).length).map(p=>[p.x,p.y,p.z]))===old;
    g.draw(wheel,0,0,1);results.at(-1).kept=kept;results.at(-1).segments=g.walls.count;
    const collisionSamples={floor:g.collisionWorld.hit(wheel.player,bikeSpheres(wheel.player,riderHeight(wheel.player))),cube:g.crystals.geometry.type,sparks:g.sparks.geometry.type};
    return {results,collisionSamples};
  });
  console.log(JSON.stringify(scenarios,null,2));
  for(const r of scenarios.results){
    if(r.name==='visible platform crash'||r.name==='visible rail crash')assert(!r.alive,r.name);
    else assert(r.alive,r.name+' unexpectedly crashed: '+r.death);
    if(r.name==='loop free steering')assert(r.angleChange>.25);
    if(r.name==='wheelie visible trail')assert(r.kept&&r.segments>20);
  }
  assert.equal(scenarios.collisionSamples.cube,'BoxGeometry');assert.equal(scenarios.collisionSamples.sparks,'BoxGeometry');
  await page.locator('#resume').click();
  await page.evaluate(()=>{const {arena:a}=window.__GRID_TEST__;a.kill(a.player,null,'barrier');a.events=[];});
  // Exercise the ordinary game death event path using visible arena boundary.
  await page.evaluate(()=>{const p=window.__GRID_TEST__.arena.player;Object.assign(p,{alive:true,grace:0,x:1193,z:100,y:0,angle:0,jump:0,airborne:null,road:null,loopS:null});p.trail=[];});
  await page.waitForFunction(()=>window.__GRID_TEST__.state==='dead');
  assert(await page.evaluate(()=>window.__GRID_TEST__.graphics.particles.length>=140));
  await page.waitForTimeout(250);await page.screenshot({path:path.join(out,'pixel-crash.png')});
  assert.deepEqual(errors,[]);console.log('PASS camera hold/release, rear-tire indicator, shared visible-mesh collisions, free terrain steering, jumps, continuous wheelies and pixel crash.',out);
 } finally {await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
