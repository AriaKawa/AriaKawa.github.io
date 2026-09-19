import assert from 'node:assert/strict';
import {createRequire} from 'node:module';
const require=createRequire(import.meta.url),{chromium}=require('C:/Users/Swagg/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const browser=await chromium.launch({headless:true,channel:'msedge',args:['--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader']});
try {
 const page=await browser.newPage({viewport:{width:1440,height:900}}),errors=[];
 page.on('pageerror',e=>errors.push(e.message));page.on('response',r=>{if(r.status()>=400)errors.push(r.status()+' '+r.url());});
 await page.goto('http://127.0.0.1:5231/');await page.waitForFunction(()=>window.__FORGE_DEV__?.scene.isActive('Menu'));
 await page.evaluate(()=>{const g=window.__FORGE_DEV__;g.registry.set('mapId','forge');g.scene.getScene('Menu').scene.restart();});
 await page.getByRole('button',{name:'Start',exact:true}).click();await page.waitForFunction(()=>window.__FORGE_DEV__.scene.getScene('Game').snapshot?.phase==='playing');
 await page.evaluate(()=>{const s=window.__FORGE_DEV__.scene.getScene('Game'),h=s.client.hosted;clearInterval(h.loop);h.godPowers=true;});
 await page.waitForTimeout(300);await page.screenshot({path:'docs/crown-forge-start.png'});
 const checks=await page.evaluate(()=>{const s=window.__FORGE_DEV__.scene.getScene('Game'),h=s.client.hosted,p=h.players.get(h.localId),dock=h.platforms.find(p=>p.id==='dock-0');Object.assign(p,{x:dock.x+30,y:dock.y-20,vx:0,vy:0,grounded:true,groundedPlatformId:dock.id});h.tick();return {platforms:s.minimapPlatforms.length,solid:s.minimapPlatforms.every(p=>p.solid),pools:s.forgePools.length,stone:s.textures.get('platforms-new').source[0].width};});
 assert.equal(checks.solid,true);assert.equal(checks.pools,6);assert.equal(checks.stone,512);
 await page.waitForTimeout(1300);await page.screenshot({path:'docs/crown-forge-ferry.png'});
 await page.setViewportSize({width:900,height:650});await page.waitForTimeout(500);await page.screenshot({path:'docs/crown-forge-small.png'});
 assert.deepEqual(errors,[]);console.log('PASS Crown Forge browser',checks,'no load/runtime errors');
} finally {await browser.close();}
