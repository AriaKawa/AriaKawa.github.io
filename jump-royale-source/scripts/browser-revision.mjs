import assert from 'node:assert/strict';import {createRequire} from 'node:module';
const require=createRequire(import.meta.url),{chromium}=require('C:/Users/Swagg/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const browser=await chromium.launch({headless:true,channel:'msedge',args:['--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader']});
const errors=[];
try{
 const p=await browser.newPage({viewport:{width:1440,height:900}});p.on('pageerror',e=>errors.push(e.message));p.on('response',r=>{if(r.status()>=400)errors.push(r.status()+' '+r.url());});
 await p.goto('http://127.0.0.1:5215/');
 await p.evaluate(()=>localStorage.setItem('jump-royale-wallet-v1',JSON.stringify({gold:30,owned:['shirt:steel'],rewards:[]})));
 await p.getByRole('button',{name:'Open wardrobe',exact:true}).click();
 assert.deepEqual(await p.getByRole('tab').allTextContents(),['Character','Costumes']);assert.equal(await p.getByRole('button',{name:'Open Wardrobe 2',exact:true}).count(),0);
 await p.getByRole('button',{name:'Froststitch Knight',exact:true}).click();
 const saved=await p.evaluate(()=>({o:JSON.parse(localStorage.getItem('forge-outfit-v1')),w:JSON.parse(localStorage.getItem('jump-royale-wallet-v1'))}));
 assert.equal(saved.o.costume,'steel');assert.equal(saved.o.helmet,'steel');assert.equal(saved.o.shirt,'steel');assert.equal(saved.o.pants,'steel');assert.equal(saved.w.gold,24);
 await p.getByRole('button',{name:'Celestial Guard',exact:true}).click();await p.screenshot({path:'docs/costumes-revision.png'});
 await p.getByRole('button',{name:'Close wardrobe',exact:true}).click();await p.reload();
 assert.equal(await p.evaluate(()=>window.__FORGE_DEV__.scene.getScene('Menu').outfit.costume),'celestial');
 await p.getByRole('button',{name:'Start the Climb'}).click();await p.waitForFunction(()=>window.__FORGE_DEV__.scene.getScene('Game').snapshot?.phase==='playing');
 const normal=await p.evaluate(()=>{
  const s=window.__FORGE_DEV__.scene.getScene('Game'),h=s.client.hosted;clearInterval(h.loop);s.climbInput.snapshot=()=>({left:false,right:false,jumpHeld:false,seq:0});
  const before=h.hazardY;for(let i=0;i<450;i++)h.tick();
  return {before,after:h.hazardY,alive:h.players.get(h.localId).alive,mode:h.godPowers,art:s.flood.texture.key};
 });assert(!normal.mode);assert(normal.alive);assert(normal.before-normal.after>30);assert.equal(normal.art,'ascent-ai-props/water');
 const bounds=()=>p.evaluate(()=>{const s=window.__FORGE_DEV__.scene.getScene('Game');return [...s.platformEntities].flatMap(([id,c])=>c.list.filter(i=>i.texture?.key.includes('/platform-')).map(i=>({id,width:i.displayWidth,height:i.displayHeight,allowed:s.minimapPlatforms.find(p=>p.id===id).w*1.55})));});
 const before=await bounds();assert(before.length>=293);for(const a of before){assert(a.width>0&&a.width<=a.allowed,JSON.stringify(a));assert(a.height>0&&a.height<180,JSON.stringify(a));}
 await p.getByLabel('God powers',{exact:true}).check();
 const flight=await p.evaluate(()=>{const s=window.__FORGE_DEV__.scene.getScene('Game'),h=s.client.hosted;const before=h.hazardY;for(let i=0;i<740;i++){h.sendInput({left:false,right:false,up:true,jumpHeld:false,seq:i});h.tick();}return {y:h.players.get(h.localId).y,before,after:h.hazardY,god:h.godPowers};});
 assert(flight.god);assert(flight.y<24000);assert(flight.after<flight.before);await p.waitForTimeout(900);await p.screenshot({path:'docs/god-mine-revision.png'});
 assert.deepEqual(await bounds(),before);await p.getByLabel('God powers',{exact:true}).uncheck();await p.waitForTimeout(200);assert.deepEqual(await bounds(),before);
 await p.setViewportSize({width:900,height:650});await p.waitForTimeout(200);assert.deepEqual(await bounds(),before);assert.deepEqual(errors,[]);
 console.log('PASS costume tabs, full-set purchase, saved selection; water rises after ten seconds in normal and god mode; every platform retains bounded dimensions across flight, landing and resize.');
}finally{await browser.close();}
