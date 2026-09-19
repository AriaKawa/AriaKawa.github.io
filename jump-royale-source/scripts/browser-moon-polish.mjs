import assert from 'node:assert/strict';
import {createRequire} from 'node:module';
import fs from 'node:fs';
const require=createRequire(import.meta.url),{chromium}=require('C:/Users/Swagg/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const browser=await chromium.launch({headless:true,channel:'msedge',args:['--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader']});
const qa='docs/moon-polish/qa';fs.mkdirSync(qa,{recursive:true});
try {
const page=await browser.newPage({viewport:{width:1440,height:900}}),errors=[];page.on('pageerror',e=>errors.push(e.message));
await page.addInitScript(()=>{localStorage.setItem('jump-royale-wallet-v1',JSON.stringify({gold:0,owned:['wallpaper:moonwalk','character:pirate','character:astro-monkey','character:axolotl'],rewards:[],spinPoints:0,freeSpins:0}));localStorage.setItem('jump-wallpaper','moonwalk');localStorage.setItem('forge-outfit-v1',JSON.stringify({character:'axolotl'}));});
await page.goto('http://127.0.0.1:5272');await page.waitForFunction(()=>window.__FORGE_DEV__?.scene.isActive('Menu'));
const result=await page.evaluate(async()=>{
 const {resetMoon,stepMoon,moonGeometry}=await import('/src/game/expeditionWorlds.ts');
 const {createLobbyPlayer}=await import('/src/game/lobbyPhysics.ts');
 const {PLAYER_WIDTH:pw,PLAYER_HEIGHT:ph}=await import('/@fs/C:/Users/Swagg/Documents/Playground/jump-royale-expedition-live/jump-royale-source/server/src/sim/constants.ts');
 const {outfitTexture,sanitizeOutfit}=await import('/src/assets/cosmetics.ts');
 const m=moonGeometry(960,540),p=createLobbyPlayer(960,540),dist=()=>Math.hypot(p.x+pw/2-m.x,p.y+ph-m.y);
 resetMoon(p);stepMoon(p,0,960,540);const x=p.x,y=p.y;p.input.right=true;p.input.jumpHeld=true;
 for(let i=0;i<60;i++)stepMoon(p,1/30,960,540);
 if(p.x!==x||p.y!==y||p.vx!==0)throw Error('Crouching moved');
 p.input.right=false;p.input.jumpHeld=false;stepMoon(p,1/30,960,540);let flight=0;
 while(!p.grounded&&flight<10){stepMoon(p,1/30,960,540);flight+=1/30;}
 if(flight<4.4||flight>4.8)throw Error('Unexpected flight '+flight);
 // Screenshot case: grounded on right-hand name card. Pull diagonally inward without input.
 Object.assign(p,{x:700,y:190,grounded:true,groundedPlatformId:'ui-name'});
 const before=dist(),beforeX=p.x;for(let i=0;i<15;i++)stepMoon(p,1/30,960,540,[{id:'ui-name',x:600,y:210,w:300,h:5,type:'stone'}]);
 if(dist()>=before||p.x>=beforeX||p.grounded)throw Error('UI trapped player');
 for(let i=0;i<180;i++)stepMoon(p,1/30,960,540);
 if(!p.grounded||Math.abs(dist()-m.radius)>.001)throw Error('Did not return to moon');
 // Any point on the full circumference must retain surface contact, crouch lock and jump return.
 for(let q=0;q<4;q++){
 p.input.right=true;for(let i=0;i<160;i++)stepMoon(p,1/30,960,540);p.input.right=false;
 if(Math.abs(dist()-m.radius)>.001)throw Error('Lost contact');
 const px=p.x,py=p.y;p.input.left=true;p.input.jumpHeld=true;
 for(let i=0;i<30;i++)stepMoon(p,1/30,960,540);
 if(p.x!==px||p.y!==py)throw Error('Crouch slipped on quadrant '+q);
 p.input.left=false;p.input.jumpHeld=false;for(let i=0;i<160;i++)stepMoon(p,1/30,960,540);
 if(!p.grounded)throw Error('Gravity failed below horizon');
 }
 const s=window.__FORGE_DEV__.scene.getScene('Menu');let animations=0;
 for(const id of ['pirate','astro-monkey','axolotl']){
 const key=outfitTexture(s,sanitizeOutfit({character:id}));
 if(s.anims.get(key+'-idle').frames.length!==1)throw Error('Unstable idle');
 if(s.anims.get(key+'-charge-loop').frames.length!==1)throw Error('Unstable crouch');
 if(s.anims.get(key+'-walk').frames.length!==6)throw Error('Incomplete stride');
 for(let f=0;f<22;f++)if(!s.textures.getFrame(key,f))throw Error('Missing pose '+f);
 animations++;
 }
 return {flight,radialReturn:true,crouchQuadrants:4,animations};
});
await page.screenshot({path:qa+'/moon-desktop.png'});
for(const id of ['pirate','astro-monkey','axolotl']){
 await page.evaluate(id=>{localStorage.setItem('forge-outfit-v1',JSON.stringify({character:id}));window.__FORGE_DEV__.scene.getScene('Menu').scene.restart();},id);
 await page.waitForTimeout(300);await page.keyboard.down('KeyD');await page.waitForTimeout(350);await page.screenshot({path:qa+'/'+id+'-walk.png'});await page.keyboard.up('KeyD');
}
for(const viewport of [{width:390,height:844},{width:844,height:390}]){await page.setViewportSize(viewport);await page.waitForTimeout(300);await page.screenshot({path:qa+'/moon-'+viewport.width+'.png'});}
await page.setViewportSize({width:1440,height:900});
await page.getByRole('button',{name:'Start',exact:true}).click();
await page.waitForFunction(()=>window.__FORGE_DEV__.scene.getScene('Game').snapshot?.phase==='playing');
assert(await page.evaluate(()=>{const s=window.__FORGE_DEV__.scene.getScene('Game');return s.playerEntities.get(s.localId).animationPrefix==='expedition-axolotl';}));
await page.screenshot({path:qa+'/gameplay.png'});
assert.deepEqual(errors,[]);console.log('PASS',JSON.stringify(result));
}finally{await browser.close();}
