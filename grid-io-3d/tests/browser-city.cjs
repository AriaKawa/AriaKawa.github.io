const {chromium}=require(process.env.PLAYWRIGHT_PATH||'playwright');
const assert=require('node:assert/strict'),path=require('node:path'),os=require('node:os'),fs=require('node:fs');
const out=path.join(os.tmpdir(),'grid-io-3d-city');fs.mkdirSync(out,{recursive:true});
const base=process.env.GRID3D_BASE_URL||'http://127.0.0.1:5276';
(async()=>{
 const browser=await chromium.launch({headless:true,channel:'msedge'});
 try {
  const page=await browser.newPage({viewport:{width:1440,height:900}}),errors=[];
  page.on('pageerror',e=>errors.push(e.message));page.on('console',m=>{if(m.type()==='error')errors.push(m.text());});
  await page.goto(base+'/grid-io-3d/?test=1');await page.waitForFunction(()=>!document.getElementById('play').disabled);await page.locator('#play').click();
  await page.evaluate(()=>{window.__GRID_TEST__.arena.player.grace=1000;window.__GRID_TEST__.arena.player.length=500;});
  const heading=await page.evaluate(()=>window.__GRID_TEST__.arena.player.angle);
  await page.mouse.move(1300,180);await page.waitForTimeout(350);
  const camera=await page.evaluate(()=>({angle:window.__GRID_TEST__.arena.player.angle,x:window.__GRID_TEST__.graphics.chase.orbitX,y:window.__GRID_TEST__.graphics.chase.orbitY}));
  assert.equal(camera.angle,heading);assert(camera.x>.2&&camera.y<-.3);
  await page.mouse.click(1300,180);await page.mouse.click(1300,180,{button:'right'});
  assert(await page.evaluate(()=>!window.__GRID_TEST__.arena.player.boost&&window.__GRID_TEST__.arena.player.jump===0));
  const audio=await page.evaluate(async()=>{
    const {context:c,engine}=window.__GRID_TEST__.audio,analyser=c.createAnalyser();engine.output.connect(analyser);analyser.fftSize=1024;
    await new Promise(r=>setTimeout(r,150));const data=new Float32Array(1024);analyser.getFloatTimeDomainData(data);engine.output.disconnect(analyser);
    return {state:c.state,rpm:engine.rpm,rms:Math.sqrt(data.reduce((a,b)=>a+b*b,0)/data.length)};
  });
  assert.equal(audio.state,'running');assert(audio.rms>.002,'engine should produce audible samples');
  await page.keyboard.down('ShiftLeft');await page.waitForTimeout(220);assert(await page.evaluate(rpm=>window.__GRID_TEST__.audio.engine.rpm>rpm+30,audio.rpm));await page.keyboard.up('ShiftLeft');
  await page.keyboard.down('ControlLeft');await page.waitForFunction(()=>window.__GRID_TEST__.arena.player.wheelieActive);
  const frozen=await page.evaluate(()=>JSON.stringify(window.__GRID_TEST__.arena.player.trail));
  await page.waitForFunction(()=>window.__GRID_TEST__.arena.player.wheelieElapsed>2.45);
  assert.equal(await page.evaluate(()=>JSON.stringify(window.__GRID_TEST__.arena.player.trail)),frozen);
  assert(await page.evaluate(()=>window.__GRID_TEST__.arena.player.speed<.001));
  await page.waitForFunction(()=>!window.__GRID_TEST__.arena.player.wheelieActive&&window.__GRID_TEST__.arena.player.speed>10);
  assert(await page.evaluate(()=>window.__GRID_TEST__.arena.player.wheelieLocked));await page.keyboard.up('ControlLeft');
  await page.keyboard.press('KeyM');await page.waitForTimeout(150);assert(await page.evaluate(()=>window.__GRID_TEST__.audio.engine.level===0));await page.keyboard.press('KeyM');
  await page.mouse.move(720,450);await page.screenshot({path:path.join(out,'neon-arena.png')});
  await page.keyboard.press('Escape');
  async function pose(kind,progress) {
    await page.evaluate(async({kind,progress})=>{
      const {ROADS,LOOP,roadPoint,loopPoint}=await import('./terrain.mjs?v=neon-city-1');const {arena:a,graphics:g}=window.__GRID_TEST__;
      for(const r of a.riders.slice(1)){r.alive=false;r.respawn=1e9;}
      const road=ROADS.find(r=>r.id===kind),q=road?roadPoint(road,progress):loopPoint(progress);
      Object.assign(a.player,{...q,jump:0,previousJump:0,wheelie:0,previousWheelie:0,wheelieActive:false,laserAnchor:null,road:road?.id||null,loopS:road?null:progress,loopDir:1,loopLane:0,boost:false,grace:1000,angle:q.angle,previousX:q.x,previousY:q.y,previousZ:q.z,previousAngle:q.angle,previousPitch:q.pitch});
      a.player.trail=[];for(let s=progress-80;s<progress;s+=2.8){if(s<0)continue;const t=road?roadPoint(road,s):loopPoint(s);a.player.trail.push({x:t.x,y:t.y,z:t.z,nx:-Math.cos(t.angle)*Math.sin(t.pitch),ny:Math.cos(t.pitch),nz:-Math.sin(t.angle)*Math.sin(t.pitch)});}
      g.reset(a);g.orbit={x:0,y:0};g.draw(a,1/60,a.time,1);
    },{kind,progress});
    await page.addStyleTag({content:'dialog[open]{visibility:hidden}dialog::backdrop{background:transparent}'});
    await page.waitForTimeout(80);await page.screenshot({path:path.join(out,kind+'-'+Math.round(progress)+'.png')});
  }
  await pose('skyway-east',950);await pose('underpass-south',190);await pose('underpass-south',700);
  await pose('helix-loop',80+Math.hypot(2*Math.PI*32,44)*.25);await pose('helix-loop',80+Math.hypot(2*Math.PI*32,44)*.5);
  const scene=await page.evaluate(()=>{const t=window.__GRID_TEST__;return {terrain:t.graphics.terrain.children.length,ringInstances:t.graphics.crystalRings.count,drawCalls:t.graphics.renderer.info.render.calls,cameraY:t.graphics.camera.position.y,bikePitch:t.graphics.getBike(t.arena.player).group.rotation.z};});
  assert(scene.terrain>12);assert(scene.ringInstances>0);assert(scene.cameraY>0);assert(Math.abs(scene.bikePitch-Math.PI)<.1);assert.deepEqual(errors,[]);
  console.log('PASS neon pickups, keyboard-only driving, mouse pan, audible variable-speed engine, mute, frozen laser, automatic wheelie release, textured skyways/underpasses and inverted loop rendering.',{audio,scene,out});
 } finally {await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
