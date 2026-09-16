import assert from 'node:assert/strict';
import {createRequire} from 'node:module';
const require=createRequire(import.meta.url);
const {chromium}=require('C:/Users/Swagg/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const browser=await chromium.launch({headless:true,channel:'msedge',args:['--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader','--disable-background-timer-throttling','--disable-renderer-backgrounding','--disable-backgrounding-occluded-windows']});
const errors=[];
try{
 const host=await browser.newPage({viewport:{width:1440,height:900}}),guest=await browser.newPage({viewport:{width:1440,height:900}});
 for(const p of [host,guest]){p.on('pageerror',e=>errors.push(e.message));await p.goto('http://127.0.0.1:5235/');await p.waitForFunction(()=>window.__FORGE_DEV__?.scene.isActive('Menu'));}
 await host.locator('#climber-name').fill('Test Host');await guest.locator('#climber-name').fill('Test Guest');
 await host.screenshot({path:'../docs-social-menu.png'});
 await host.getByRole('button',{name:'Leaderboards',exact:true}).click();await host.waitForTimeout(2500);console.log('boards',await host.locator('.social-dialog[open]').innerText());await host.getByRole('button',{name:'Close Leaderboards',exact:true}).click();
 await host.getByRole('button',{name:'Party and profile',exact:true}).click();await host.getByRole('button',{name:'Host party',exact:true}).click();
 await host.waitForTimeout(3000);console.log('host panel',await host.locator('.social-dialog[open]').innerText());await host.waitForFunction(()=>document.querySelector('.social-dialog[open]')?.textContent.includes('Party code:'),{},{timeout:10000});
 const code=(await host.locator('.social-dialog[open]').innerText()).match(/Party code: ([A-Z0-9]{6})/)[1];console.log('party',code);
 await guest.getByRole('button',{name:'Party and profile',exact:true}).click();await guest.getByRole('textbox',{name:'Party code',exact:true}).fill(code);await guest.getByRole('button',{name:'Join party',exact:true}).click();
 await guest.waitForTimeout(3000);console.log('guest panel',await guest.locator('.social-dialog[open]').innerText());await guest.waitForFunction(()=>document.querySelector('.social-dialog[open]')?.textContent.includes('2/8'),{},{timeout:10000});
 await host.getByRole('button',{name:'Close Party and profile',exact:true}).click();await guest.getByRole('button',{name:'Close Party and profile',exact:true}).click();
 assert(await host.getByRole('button',{name:'Start',exact:true}).isDisabled());
 await guest.getByRole('button',{name:'Ready',exact:true}).click();await host.waitForFunction(()=>!document.querySelector('.menu-form button').disabled);
 await host.screenshot({path:'../docs-social-party.png'});await host.getByRole('button',{name:'Start',exact:true}).click();
 await host.waitForTimeout(6000);for(const p of [host,guest])console.log('start state',await p.evaluate(()=>{const g=window.__FORGE_DEV__;return {menu:g.scene.isActive('Menu'),game:g.scene.isActive('Game'),phase:g.scene.getScene('Game').snapshot?.phase,notice:document.querySelector('.party-readiness')?.textContent}}));
 for(const p of [host,guest])await p.waitForFunction(()=>window.__FORGE_DEV__?.scene.getScene('Game').snapshot?.phase==='playing',{},{timeout:30000});
 const data=await guest.evaluate(()=>{const s=window.__FORGE_DEV__.scene.getScene('Game');return {id:s.client.localId,players:s.snapshot.players.filter(p=>!p.isBot),minimap:!!s.minimap};});assert.equal(data.players.length,2);assert(data.minimap);console.log('online match',data);
 await guest.bringToFront();await guest.locator('canvas').first().click({position:{x:500,y:300}});await guest.keyboard.down('ArrowRight');await guest.waitForTimeout(1500);console.log('input',await host.evaluate(async()=>{const s=window.__FORGE_DEV__.scene.getScene('Game');const o=await import('/src/game/online.ts');const b=await o.backend();return {players:s.snapshot.players.filter(p=>!p.isBot),inputs:(await b.get(b.at(s.client.hosted.onlinePath+'/inputs'))).val()};}));await guest.keyboard.up('ArrowRight');await guest.waitForTimeout(400);
 const positions=await Promise.all([host,guest].map(p=>p.evaluate(id=>window.__FORGE_DEV__.scene.getScene('Game').snapshot.players.find(p=>p.id===id).x,data.id)));assert(Math.abs(positions[0]-positions[1])<20);assert(positions[0]>data.players.find(p=>p.id===data.id).x+20,'Guest must actually move');console.log('synced guest movement',positions);
 await guest.screenshot({path:'../docs-social-match.png'});assert.deepEqual(errors,[]);
 await host.evaluate(async()=>{const o=await import('/src/game/online.ts');await o.leaveParty();});
 console.log('PASS parties, readiness, shared simulation, minimap, UI and no browser errors');
}catch(e){console.error(errors);throw e;}finally{await browser.close();}
