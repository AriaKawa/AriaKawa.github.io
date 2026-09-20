import assert from 'node:assert/strict';
import fs from 'node:fs';
import {createRequire} from 'node:module';
const require=createRequire(import.meta.url);
const {chromium}=require('C:/Users/Swagg/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const qa='docs/axolotl-animation/qa';fs.mkdirSync(qa,{recursive:true});
const browser=await chromium.launch({headless:true,channel:'msedge',args:['--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader']});
try {
 const page=await browser.newPage({viewport:{width:1440,height:900}}),errors=[],loaded=[];
 page.on('response',r=>{if(r.ok())loaded.push(r.url());});
 page.on('pageerror',e=>errors.push(e.message));
 await page.addInitScript(()=>{
  localStorage.setItem('forge-outfit-v1',JSON.stringify({character:'axolotl'}));
  localStorage.setItem('jump-wallpaper','moonwalk');
  localStorage.setItem('jump-royale-wallet-v1',JSON.stringify({gold:0,owned:['character:axolotl','wallpaper:moonwalk'],rewards:[],spinPoints:0,freeSpins:0}));
 });
 await page.goto('http://127.0.0.1:5278');
 await page.waitForFunction(()=>window.__FORGE_DEV__?.scene.isActive('Menu'));
 const validation=await page.evaluate(async()=>{
  const {outfitTexture,sanitizeOutfit}=await import('/src/assets/cosmetics.ts');
  const {footOrigin}=await import('/src/game/spriteFeet.ts');
  const s=window.__FORGE_DEV__.scene.getScene('Menu'),key=outfitTexture(s,sanitizeOutfit({character:'axolotl'}));
  const texture=s.textures.get(key),source=texture.getSourceImage();
  const frames=[];
  for(let i=0;i<22;i++){
   const f=texture.get(i),c=document.createElement('canvas');c.width=c.height=256;
   const ctx=c.getContext('2d');ctx.drawImage(source,f.cutX,f.cutY,256,256,0,0,256,256);
   const p=ctx.getImageData(0,0,256,256).data;
   let count=0,edge=0;
   for(let y=0;y<256;y++)for(let x=0;x<256;x++)if(p[(y*256+x)*4+3]){count++;if(x===0||y===0||x===255||y===255)edge++;}
   frames.push({index:i,count,edge,origin:footOrigin(s,key,i)});
  }
  const names=['idle','charge-start','charge-loop','jump','fall','land','eliminated','walk','victory'];
  const animations=names.map(name=>({name,frames:s.anims.get(key+'-'+name).frames.map(f=>Number(f.textureFrame))}));
  const other={};for(const id of ['pirate','astro-monkey']){const k=outfitTexture(s,sanitizeOutfit({character:id}));other[id]=s.anims.get(k+'-walk').frames.map(f=>Number(f.textureFrame));}
  return {source:source.src,frames,animations,other,key:s.animationPrefix};
 });
 assert(loaded.some(url=>url.endsWith('/axolotl-classic-v3.png')));
 assert.equal(validation.key,'expedition-axolotl');
 for(const f of validation.frames){assert(f.count>3000,`Empty frame ${f.index}`);assert.equal(f.edge,0);assert.equal(f.origin,232/256);}
 for(const a of validation.animations)for(const f of a.frames)assert(f>=0&&f<22);
 assert.deepEqual(validation.animations.find(a=>a.name==='walk').frames,[16,17,18,19,20,21]);
 for(const frames of Object.values(validation.other))assert.deepEqual(frames,[16,17,18,19,20,21]);
 await page.screenshot({path:qa+'/lobby.png'});
 // Observe the real lobby state transitions from keyboard input.
 await page.keyboard.down('ArrowRight');await page.waitForTimeout(250);
 assert.equal(await page.evaluate(()=>window.__FORGE_DEV__.scene.getScene('Menu').preview.anims.currentAnim.key),'expedition-axolotl-walk');
 await page.screenshot({path:qa+'/run.png'});await page.keyboard.up('ArrowRight');
 await page.keyboard.down('Space');await page.waitForTimeout(300);
 assert.equal(await page.evaluate(()=>window.__FORGE_DEV__.scene.getScene('Menu').preview.anims.currentAnim.key),'expedition-axolotl-charge-loop');
 await page.screenshot({path:qa+'/charge.png'});await page.keyboard.up('Space');
 await page.waitForFunction(()=>window.__FORGE_DEV__.scene.getScene('Menu').preview.anims.currentAnim.key==='expedition-axolotl-jump');
 await page.screenshot({path:qa+'/jump.png'});
 await page.waitForFunction(()=>window.__FORGE_DEV__.scene.getScene('Menu').preview.anims.currentAnim.key==='expedition-axolotl-fall');
 await page.waitForFunction(()=>window.__FORGE_DEV__.scene.getScene('Menu').lobbyPlayer.grounded);
 await page.waitForTimeout(250);
 assert.equal(await page.evaluate(()=>window.__FORGE_DEV__.scene.getScene('Menu').preview.anims.currentAnim.key),'expedition-axolotl-idle');
 await page.getByRole('button',{name:'Open wardrobe',exact:true}).click();await page.screenshot({path:qa+'/wardrobe.png'});
 await page.getByRole('button',{name:'Close wardrobe',exact:true}).click();
 await page.getByRole('button',{name:'Start',exact:true}).click();
 await page.waitForFunction(()=>window.__FORGE_DEV__.scene.getScene('Game').snapshot?.phase==='playing');
 assert.equal(await page.evaluate(()=>{const s=window.__FORGE_DEV__.scene.getScene('Game');return s.playerEntities.get(s.localId).animationPrefix;}),'expedition-axolotl');
 await page.screenshot({path:qa+'/match.png'});
 assert.deepEqual(errors,[]);
 fs.writeFileSync(qa+'/validation.json',JSON.stringify(validation,null,2));
 console.log('PASS: 22 transparent unclipped poses, fixed foot baselines, all 9 animations, other characters unchanged, lobby run/charge/jump/fall/land, wardrobe and match; no browser errors.');
} finally {await browser.close();}
