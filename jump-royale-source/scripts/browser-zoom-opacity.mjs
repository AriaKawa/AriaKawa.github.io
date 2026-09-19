import assert from 'node:assert/strict';
import fs from 'node:fs';
import {createRequire} from 'node:module';
const require=createRequire(import.meta.url),{chromium}=require('C:/Users/Swagg/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
fs.mkdirSync('output',{recursive:true});
const b=await chromium.launch({headless:true,channel:'msedge'});
try {
 const p=await b.newPage({viewport:{width:1440,height:900}}),errors=[];
 p.on('pageerror',e=>errors.push(e.message));
 await p.goto(process.env.GAME_URL??'http://127.0.0.1:5245');await p.waitForFunction(()=>window.__FORGE_DEV__?.scene.isActive('Menu'));
 for(const width of [1440,768,390,320]){
  await p.setViewportSize({width,height:900});await p.waitForTimeout(180);
  const rects=await p.evaluate(()=>['.coffee-link','.settings-cog'].map(q=>{const r=document.querySelector(q).getBoundingClientRect();return {w:r.width,h:r.height,cy:r.y+r.height/2,right:r.right,left:r.left}}));
  assert(Math.abs(rects[0].w-rects[1].w)<.1&&Math.abs(rects[0].h-rects[1].h)<.1&&Math.abs(rects[0].cy-rects[1].cy)<.1,JSON.stringify({width,rects}));
  assert(rects.every(r=>r.left>=0&&r.right<=width));await p.screenshot({path:'output/utilities-final-'+width+'.png'});
 }
 await p.setViewportSize({width:1440,height:900});await p.getByRole('button',{name:'Open settings',exact:true}).click();
 assert.equal(await p.getByRole('slider',{name:'Enemy opacity',exact:true}).inputValue(),'25');
 await p.getByRole('slider',{name:'Enemy opacity',exact:true}).fill('10');await p.keyboard.press('Escape');
 await p.reload();await p.waitForFunction(()=>window.__FORGE_DEV__?.scene.isActive('Menu'));
 await p.getByRole('button',{name:'Open settings',exact:true}).click();assert.equal(await p.getByRole('slider',{name:'Enemy opacity',exact:true}).inputValue(),'10');await p.keyboard.press('Escape');
 for(const map of ['magical','forest','mountain','forge','jungle','snow']){
  await p.reload();await p.waitForFunction(()=>window.__FORGE_DEV__?.scene.isActive('Menu'));
  await p.evaluate(map=>window.__FORGE_DEV__.scene.getScene('Menu').scene.start('Game',{name:'Contact test',mapId:map}),map);
  await p.waitForFunction(()=>window.__FORGE_DEV__.scene.getScene('Game').snapshot?.players.length>1);
  const audit=await p.evaluate(async()=>{
   const s=window.__FORGE_DEV__.scene.getScene('Game'),{COSMETICS,outfitTexture,sanitizeOutfit}=await import('/src/assets/cosmetics.ts'),{spriteBounds,spriteScale}=await import('/src/game/spriteSizing.ts');
   if(s.cameras.main.zoom!==1.25||s.uiCamera.zoom!==1)throw Error('Camera zoom');
   const local=s.snapshot.players.find(p=>p.id===s.localId),entity=s.playerEntities.get(s.localId),platform=s.minimapPlatforms[0];
   local.grounded=true;local.alive=true;entity.targetY=platform.y-20;let poses=0;
   for(const c of COSMETICS.character)for(const retro of [false,true])for(const hat of ['none','party','fedora','unicorn']){
    const key=outfitTexture(s,sanitizeOutfit({character:c.id,animalHat:hat,retroCostumes:retro?[c.id]:[]})),scale=spriteScale(s,key,28),body=spriteBounds(s,key).bodyHeight*scale,expected=['puppy','cat','rat','cerberus','kangaroo'].includes(c.id)?16.1:28;
    if(Math.abs(body-expected)>.001)throw Error('Character scale '+key);
    entity.animationPrefix=key;entity.sprite.stop().setTexture(key).setScale(scale);
    for(const frame of [0,1,2,3,6,8,9,10,11]){
     entity.sprite.setFrame(frame);s.updateEntities(16);
     const f=entity.sprite.frame,canvas=document.createElement('canvas');canvas.width=f.width;canvas.height=f.height;const ctx=canvas.getContext('2d');ctx.drawImage(entity.sprite.texture.getSourceImage(),f.cutX,f.cutY,f.width,f.height,0,0,f.width,f.height);const pixels=ctx.getImageData(0,0,f.width,f.height).data;let bottom=0;
     for(let y=f.height-1;y>=0&&!bottom;y--)for(let x=0;x<f.width;x++)if(pixels[(y*f.width+x)*4+3]>32){bottom=y+1;break}
     const foot=entity.sprite.y+(bottom-entity.sprite.originY*f.height)*scale;if(Math.abs(foot-platform.y)>.0001)throw Error('Foot gap '+key+' frame '+frame);poses++;
    }
   }
   const enemy=[...s.playerEntities].find(([id])=>id!==s.localId)[1];
   return {poses,enemyAlpha:enemy.sprite.alpha,localAlpha:entity.sprite.alpha,zoom:s.cameras.main.zoom,hudZoom:s.uiCamera.zoom};
  });assert.equal(audit.enemyAlpha,.1);assert.equal(audit.localAlpha,1);console.log(map,audit);
  await p.getByRole('button',{name:'Open settings',exact:true}).click();const slider=p.getByRole('slider',{name:'Enemy opacity',exact:true});await slider.fill('100');
  await p.waitForFunction(()=>{const s=window.__FORGE_DEV__.scene.getScene('Game');return [...s.playerEntities].filter(([id])=>id!==s.localId).every(([,e])=>e.sprite.alpha===1&&e.name.alpha===1)});
  await slider.fill('10');await p.keyboard.press('Escape');
 }
 assert.deepEqual(errors,[]);console.log('PASS equal utility boxes, 25% opacity default and persistence, live 10–100% enemy alpha, 15% animal growth, 1.25 world/1 HUD zoom and grounded poses on all six maps');
} finally {await b.close()}
