import assert from 'node:assert/strict';
import {createRequire} from 'node:module';
const require=createRequire(import.meta.url),{chromium}=require('C:/Users/Swagg/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const b=await chromium.launch({headless:true,channel:'msedge',args:['--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader']});const errors=[];
try{const pages=await Promise.all([b.newPage(),b.newPage()]);for(const p of pages){p.on('pageerror',e=>errors.push(e.message));await p.goto('http://127.0.0.1:5216/');await p.getByRole('button',{name:'Start the Climb'}).click();}
for(const p of pages)await p.waitForFunction(()=>window.__FORGE_DEV__.scene.getScene('Game').snapshot?.phase==='playing');
const states=await Promise.all(pages.map(p=>p.evaluate(()=>{const s=window.__FORGE_DEV__.scene.getScene('Game');return {room:s.client.room.roomId,map:s.mapId,width:s.world.width,height:s.world.height,humans:s.snapshot.players.filter(p=>!p.isBot).length,platforms:s.minimapPlatforms.length,rotor:s.snapshot.platforms.find(p=>p.id==='rotor-5')};})));assert.equal(states[0].room,states[1].room);assert.equal(states[1].humans,2);assert.equal(states[0].width,2560);assert.equal(states[0].platforms,293);assert(states[0].rotor.y>0);
await pages[0].keyboard.down('Space');await pages[0].waitForTimeout(600);await pages[0].keyboard.up('Space');await pages[0].waitForTimeout(100);assert(await pages[0].evaluate(()=>{const s=window.__FORGE_DEV__.scene.getScene('Game');return s.snapshot.players.find(p=>p.id===s.localId).vy<0;}));
await pages[0].setViewportSize({width:900,height:650});await pages[0].waitForTimeout(100);assert.deepEqual(errors,[]);console.log('PASS two browsers share authoritative mountain room; dimensions, 293 platforms, rotor X/Y snapshots, charged keyboard jump, resize and zero runtime errors.');
}finally{await b.close();}
