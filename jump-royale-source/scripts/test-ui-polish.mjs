import assert from 'node:assert/strict';
import {createRequire} from 'node:module';
const require=createRequire(import.meta.url),{chromium}=require('C:/Users/Swagg/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const browser=await chromium.launch({headless:true,channel:'msedge',args:['--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader']});
const errors=[];
try {
const p=await browser.newPage({viewport:{width:1440,height:900}});
p.on('pageerror',e=>errors.push(e.message));
await p.goto('http://127.0.0.1:5218');await p.waitForSelector('.wardrobe-toggle');
await p.evaluate(()=>localStorage.setItem('jump-royale-wallet-v1',JSON.stringify({gold:96,owned:[],rewards:[],spinPoints:2,freeSpins:0})));
await p.reload();await p.waitForSelector('.wardrobe-toggle');
assert.equal(await p.locator('.gold-balance').textContent(),'96');
await p.mouse.click(450,480);assert.equal(await p.evaluate(()=>window.__FORGE_DEV__.scene.getScene('Menu').held),false);
await p.getByRole('button',{name:'Open loot box',exact:true}).click();
const layout=await p.evaluate(()=>{const b=document.querySelector('.loot-free').getBoundingClientRect(),d=document.querySelector('.loot-points').getBoundingClientRect(),c=document.querySelector('.loot-close').getBoundingClientRect(),s=document.querySelector('.loot-close svg').getBoundingClientRect();return {dotsBelow:d.top>=b.bottom,dotCenter:Math.abs(d.x+d.width/2-b.x-b.width/2),xCenter:Math.abs(s.x+s.width/2-c.x-c.width/2),yCenter:Math.abs(s.y+s.height/2-c.y-c.height/2),line:getComputedStyle(document.querySelector('.loot-contents')).borderTopWidth}});
assert(layout.dotsBelow);assert(layout.dotCenter<1);assert(layout.xCenter<1&&layout.yCenter<1);assert.equal(layout.line,'0px');await p.screenshot({path:'docs/ui-loot-polish.png'});
await p.getByRole('button',{name:'Close loot box'}).click();await p.getByRole('button',{name:'Open wardrobe',exact:true}).click();await p.waitForTimeout(500);await p.screenshot({path:'docs/ui-platform-polish.png'});
const feet=await p.evaluate(async()=>{
 const {COSMETICS,sanitizeOutfit}=await import('/src/assets/cosmetics.ts');
 const {COSTUMES,costumeFields}=await import('/src/assets/costumeSets.ts');
 const s=window.__FORGE_DEV__.scene.getScene('Menu');
 const outfits=[...COSMETICS.character.map(c=>sanitizeOutfit({...s.outfit,character:c.id})),...COSTUMES.map(c=>sanitizeOutfit({...s.outfit,character:'original',...costumeFields(c.id)}))];
 return outfits.map(o=>{s.showOutfit(o);const f=s.preview.texture.get(0),c=document.createElement('canvas');c.width=f.width;c.height=f.height;const x=c.getContext('2d');x.drawImage(s.preview.texture.getSourceImage(),f.cutX,f.cutY,f.width,f.height,0,0,f.width,f.height);const a=x.getImageData(0,0,f.width,f.height).data;let bottom=0;for(let y=0;y<f.height;y++)for(let i=0;i<f.width;i++)if(a[(y*f.width+i)*4+3]>32)bottom=y+1;return {character:o.character,costume:o.costume,gap:Math.abs(bottom-f.height*s.preview.originY)};});
});assert(feet.length>10);assert(feet.every(f=>f.gap<.01),JSON.stringify(feet));console.log('Foot baselines checked:',feet.length);
await p.getByRole('button',{name:'Close wardrobe',exact:true}).click();await p.getByRole('button',{name:'Start',exact:true}).click();
await p.waitForFunction(()=>window.__FORGE_DEV__.scene.isActive('Game') && window.__FORGE_DEV__.scene.getScene('Game').snapshot?.phase==='playing');
const before=await p.evaluate(()=>{const s=window.__FORGE_DEV__.scene.getScene('Game'),h=s.client.hosted;clearInterval(h.loop);return {minimap:!!s.minimap,alpha:[...s.playerEntities.values()].find(e=>e.isBot).sprite.alpha,round:s.snapshot.roundStartedAt};});assert.equal(before.minimap,false);assert(Math.abs(before.alpha-.864)<.001);
await p.setViewportSize({width:1835,height:447});await p.waitForTimeout(200);
const clearance=await p.evaluate(()=>{const s=window.__FORGE_DEV__.scene.getScene('Game');const frame=s.children.list.find(o=>o.type==='NineSlice'&&o.height===146),rect=s.game.canvas.getBoundingClientRect(),cog=document.querySelector('#game>.settings-cog').getBoundingClientRect();return frame.y*rect.height/s.scale.height-cog.bottom;});assert(clearance>=3,clearance);await p.screenshot({path:'docs/ui-hud-polish.png'});
await p.evaluate(()=>{const s=window.__FORGE_DEV__.scene.getScene('Game');s.applySnapshot({...s.snapshot,players:s.snapshot.players.map(v=>v.id===s.client.localId?{...v,alive:false}:v)});});
await p.getByRole('button',{name:'Leave',exact:true}).click();await p.waitForSelector('.results-ui');assert.equal(await p.locator('.results-ui h1').textContent(),'Standings when you left');
const frozen=await p.locator('tbody').textContent();await p.waitForTimeout(500);assert.equal(await p.locator('tbody').textContent(),frozen);
const wallet=await p.evaluate(()=>JSON.parse(localStorage.getItem('jump-royale-wallet-v1')));assert.equal(wallet.freeSpins,1);assert.equal(wallet.spinPoints,0);assert.equal(wallet.rewards.filter(r=>r.startsWith('spin-point:')).length,1);await p.screenshot({path:'docs/ui-leave-polish.png'});
await p.getByRole('button',{name:'Lobby',exact:true}).click();await p.setViewportSize({width:390,height:844});await p.getByRole('button',{name:/Open loot box/}).click();await p.screenshot({path:'docs/ui-loot-mobile.png'});
await p.getByRole('button',{name:'Close loot box'}).click();await p.setViewportSize({width:1440,height:900});await p.getByRole('button',{name:'Start',exact:true}).click();await p.waitForFunction(()=>window.__FORGE_DEV__.scene.isActive('Game') && window.__FORGE_DEV__.scene.getScene('Game').snapshot?.phase==='playing');
await p.getByRole('button',{name:'Open settings',exact:true}).click();await p.getByRole('button',{name:'Leave match',exact:true}).click();await p.waitForSelector('.results-ui');assert.equal(await p.locator('.results-ui h1').textContent(),'Standings when you left');
const nextWallet=await p.evaluate(()=>JSON.parse(localStorage.getItem('jump-royale-wallet-v1')));assert.equal(nextWallet.spinPoints,1);assert.equal(nextWallet.freeSpins,1);
assert.deepEqual(errors,[]);console.log('PASS: keyboard-only jumping, loot layout, HUD, opacity, frozen leave scoreboard and single reward',JSON.stringify(layout));
} finally {await browser.close();}
