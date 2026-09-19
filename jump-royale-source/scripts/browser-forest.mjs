import assert from 'node:assert/strict';
import fs from 'node:fs';
import {createRequire} from 'node:module';
const require=createRequire(import.meta.url),{chromium}=require('C:/Users/Swagg/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const browser=await chromium.launch({headless:true,channel:'msedge',args:['--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader']});
try{
 const p=await browser.newPage({viewport:{width:1440,height:900}}),errors=[];p.on('pageerror',e=>errors.push(e.message));p.on('response',r=>{if(r.status()>=400)errors.push(r.status()+' '+r.url());});
 await p.goto('http://127.0.0.1:5224/');await p.waitForFunction(()=>window.__FORGE_DEV__?.scene.isActive('Menu'));
 await p.evaluate(()=>{const g=window.__FORGE_DEV__;g.registry.set('mapId','forest');g.scene.getScene('Menu').scene.restart();});await p.getByRole('button',{name:'Start',exact:true}).click();await p.waitForFunction(()=>window.__FORGE_DEV__.scene.getScene('Game').snapshot?.phase==='playing');
 const initial=await p.evaluate(()=>{const s=window.__FORGE_DEV__.scene.getScene('Game'),h=s.client.hosted;clearInterval(h.loop);return {map:s.mapId,platforms:s.minimapPlatforms.length,width:s.world.width,height:s.world.height};});assert.equal(initial.map,'forest');assert.equal(initial.width,2560);
 await p.screenshot({path:'docs/forest-start.png'});
 // Real keyboard charge/release through the normal simulation and game input.
 await p.evaluate(()=>{const h=window.__FORGE_DEV__.scene.getScene('Game').client.hosted;h.loop=setInterval(()=>h.tick(),1000/30);});
 await p.keyboard.down('Space');await p.waitForTimeout(650);await p.keyboard.up('Space');await p.waitForTimeout(120);
 assert(await p.evaluate(()=>window.__FORGE_DEV__.scene.getScene('Game').snapshot.players.find(p=>p.id==='practice-player').vy<0));
 await p.waitForTimeout(700);await p.getByLabel('God powers',{exact:true}).check();
 await p.evaluate(()=>{const s=window.__FORGE_DEV__.scene.getScene('Game'),h=s.client.hosted;clearInterval(h.loop);const me=h.players.get(h.localId);me.x=1800;me.y=12450;h.tick();});
 await p.waitForTimeout(700);assert(await p.evaluate(()=>window.__FORGE_DEV__.scene.getScene('Game').cameras.main.scrollX>900));await p.screenshot({path:'docs/forest-crossing.png'});
 const cameraStable=await p.evaluate(async()=>{const s=window.__FORGE_DEV__.scene.getScene('Game'),h=s.client.hosted,me=h.players.get(h.localId);await new Promise(r=>setTimeout(r,1200));const positions=[];for(const facing of [1,-1,1]){me.facing=facing;h.tick();await new Promise(r=>setTimeout(r,500));positions.push(s.cameras.main.scrollX);}return {positions,variants:[...new Set([...s.platformEntities.values()].map(c=>c.list.find(o=>o.texture)?.texture.key))],water:s.flood.texture.key};});assert(Math.max(...cameraStable.positions)-Math.min(...cameraStable.positions)<.5,JSON.stringify(cameraStable));assert.equal(cameraStable.variants.length,3);assert.equal(cameraStable.water,'forest-continuous-water');
 await p.setViewportSize({width:900,height:650});await p.waitForTimeout(500);await p.screenshot({path:'docs/forest-small.png'});
 // Elimination and unfinished departure award no points; final 15th does, 16th does not.
 const rewards=await p.evaluate(()=>{const s=window.__FORGE_DEV__.scene.getScene('Game'),h=s.client.hosted;localStorage.removeItem('jump-royale-wallet-v1');
  const make=(place,stamp)=>({...s.snapshot,assisted:false,phase:'surge',roundStartedAt:stamp,placements:[{id:h.localId,name:'Test',place,maxHeight:100,timeMs:1000,isBot:false}]});
  s.snapshot.phase='playing';s.applySnapshot(make(16,101));const sixteen=JSON.parse(localStorage.getItem('jump-royale-wallet-v1')).spinPoints;
  s.snapshot.phase='playing';s.applySnapshot(make(15,102));const fifteen=JSON.parse(localStorage.getItem('jump-royale-wallet-v1')).spinPoints;
  s.snapshot.phase='playing';s.applySnapshot(make(15,102));const duplicate=JSON.parse(localStorage.getItem('jump-royale-wallet-v1')).spinPoints;return {sixteen,fifteen,duplicate};});assert.deepEqual(rewards,{sixteen:0,fifteen:1,duplicate:1});
 const early=await p.evaluate(()=>{const s=window.__FORGE_DEV__.scene.getScene('Game');localStorage.removeItem('jump-royale-wallet-v1');const snap={...s.snapshot,phase:'playing',placements:undefined,roundStartedAt:999,players:s.snapshot.players.map(p=>({...p,alive:p.id==='practice-player'?false:p.alive}))};s.applySnapshot(snap);const eliminated=localStorage.getItem('jump-royale-wallet-v1');s.leaveWithScoreboard();return eliminated;});assert.equal(early,null);
 await p.waitForFunction(()=>window.__FORGE_DEV__.scene.isActive('Results'));assert.equal(await p.evaluate(()=>JSON.parse(localStorage.getItem('jump-royale-wallet-v1')||'{}').spinPoints??0),0);assert(!(await p.locator('.results-ui').innerText()).includes('point credited'));
 await p.getByRole('button',{name:'Climb again',exact:true}).click();await p.waitForFunction(()=>window.__FORGE_DEV__.scene.getScene('Game').snapshot?.phase==='playing');assert.equal(await p.evaluate(()=>window.__FORGE_DEV__.scene.getScene('Game').mapId),'forest');
 assert.deepEqual(errors,[]);console.log('PASS',initial,'keyboard jump, horizontal camera with no turn offset, three generated variants and generated water, responsive render, top-15 rewards, elimination/early leave give no point, replay, no browser errors');
}finally{await browser.close();}
