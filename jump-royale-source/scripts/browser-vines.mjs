import assert from 'node:assert/strict';
import {createRequire} from 'node:module';
const require=createRequire(import.meta.url),{chromium}=require('C:/Users/Swagg/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const browser=await chromium.launch({headless:true,channel:'msedge'});
try{
const p=await browser.newPage({viewport:{width:1440,height:900}}),errors=[];p.on('pageerror',e=>errors.push(e.message));p.on('response',r=>{if(r.status()>=400)errors.push(r.status()+' '+r.url())});
await p.goto('http://127.0.0.1:5260');await p.waitForFunction(()=>window.__FORGE_DEV__?.scene.isActive('Menu'));
await p.evaluate(()=>window.__FORGE_DEV__.scene.getScene('Menu').scene.start('Game',{name:'ARIA',mapId:'jungle'}));await p.waitForFunction(()=>window.__FORGE_DEV__.scene.getScene('Game').snapshot?.players.length>0);
await p.waitForTimeout(250);await p.screenshot({path:'../../output/canopy-tutorial.png'});
await p.evaluate(()=>{const s=window.__FORGE_DEV__.scene.getScene('Game'),h=s.client.hosted;clearInterval(h.loop);h.pendingPlayers=[];h.players=new Map([[h.localId,h.players.get(h.localId)]]);h.phase='playing';h.roundStartedAt=h.clock;h.tick();});
await p.keyboard.down('ArrowLeft');await p.keyboard.down('Space');await p.waitForTimeout(80);
await p.evaluate(()=>{const h=window.__FORGE_DEV__.scene.getScene('Game').client.hosted;for(let i=0;i<12;i++)h.tick();});await p.keyboard.up('Space');await p.waitForTimeout(80);
const grip=await p.evaluate(()=>{const s=window.__FORGE_DEV__.scene.getScene('Game'),h=s.client.hosted,me=h.players.get(h.localId);for(let i=0;i<20&&!me.vineId;i++)h.tick();return {vine:me.vineId,radius:me.vineRadius,x:me.x,y:me.y}});assert.equal(grip.vine,'canopy-vine');await p.keyboard.up('ArrowLeft');
await p.keyboard.down('w');await p.waitForTimeout(80);const up=await p.evaluate(()=>{const h=window.__FORGE_DEV__.scene.getScene('Game').client.hosted;for(let i=0;i<8;i++)h.tick();return h.players.get(h.localId).vineRadius});assert(up<grip.radius-15);
await p.keyboard.up('w');await p.keyboard.down('ArrowDown');await p.waitForTimeout(80);const down=await p.evaluate(()=>{const h=window.__FORGE_DEV__.scene.getScene('Game').client.hosted;for(let i=0;i<5;i++)h.tick();return h.players.get(h.localId).vineRadius});assert(down>up+10);await p.keyboard.up('ArrowDown');await p.waitForTimeout(100);await p.screenshot({path:'../../output/canopy-swing.png'});
await p.keyboard.down('Space');await p.waitForTimeout(80);const released=await p.evaluate(()=>{const s=window.__FORGE_DEV__.scene.getScene('Game'),h=s.client.hosted;h.tick();const me=h.players.get(h.localId);return {vine:me.vineId,vx:me.vx,vy:me.vy,cooldown:me.vineCooldown}});assert(!released.vine);assert(Math.abs(released.vx)>100);assert(released.cooldown>0);await p.keyboard.up('Space');
for(const width of [390,768,1440]){await p.setViewportSize({width,height:900});await p.waitForTimeout(200);assert(await p.evaluate(()=>{const s=window.__FORGE_DEV__.scene.getScene('Game');return !!s.canopyVine.active&&s.jungleBackground.displayWidth>=s.scale.width}));}
// Outgoing party controls keep vertical input, matching the receiving host.
const packet=await p.evaluate(()=>{const h=window.__FORGE_DEV__.scene.getScene('Game').client.hosted;let sent;h.onlinePath='test-match';h.onlineHost=false;h.net={at:x=>x,update:(_path,data)=>{sent=data;return Promise.resolve()}};h.sendInput({left:false,right:false,up:true,down:false,jumpHeld:false,seq:10});h.onlinePath='';return sent});assert.equal(packet.up,true);assert.equal(packet.down,false);
assert.deepEqual(errors,[]);console.log('PASS browser: keyboard auto-grab, W climb, Down descend, Space momentum release, party up/down serialization, 3 widths, no console/network failures',{grip,up,down,released});
}finally{await browser.close()}
