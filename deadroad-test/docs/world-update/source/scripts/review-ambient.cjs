const {chromium}=require('../../suno-producer/node_modules/playwright');
(async()=>{const browser=await chromium.launch({headless:true,channel:'msedge'});const page=await browser.newPage({viewport:{width:1440,height:960}});const errors=[];page.on('pageerror',e=>errors.push(e.message));
await page.addInitScript(()=>{let phaser;Object.defineProperty(window,'Phaser',{configurable:true,get:()=>phaser,set:value=>{phaser=value;const Game=value.Game;value.Game=class extends Game{constructor(...args){super(...args);window.reviewGame=this;}};}});});
await page.goto('http://127.0.0.1:5183/?offline=1');await page.locator('#local-button').click();await page.waitForTimeout(6000);await page.mouse.click(578,294);await page.locator('#globe-deploy-button').click();await page.waitForTimeout(8000);

console.log('Ambient:',await page.evaluate(async()=>{
 const scene=window.reviewGame.scene.getScene('WorldScene'),sim=scene.network.local,base=sim.bases[0];
 const count=sim.zombies.filter(z=>z.home).length;if(!count)throw Error('No natural roadside zombies');
 const seed=sim.zombies.find(z=>z.home),z={...seed,id:'ambient:browser-runover',x:base.coreX+20,y:base.coreY,hp:99999,home:{x:base.coreX+20,y:base.coreY}};
 sim.zombies.push(z);base.heading=0;base.driveSpeed=60;const before=scene.bloodDecals.length;sim.driveBase(0,1,50,true);sim.emit();
 await new Promise(r=>setTimeout(r,150));
 if(sim.zombies.some(e=>e.id===z.id))throw Error('Run-over survived');
 if(scene.bloodDecals.length!==before+1)throw Error('Missing or duplicate run-over blood');
 return {naturallySpawned:count,bloodSplats:scene.bloodDecals.length-before};
}));
await page.screenshot({path:'artifacts/ambient-runover.png'});
for(const [biome,lat,lon] of [['green',40.133,-89.1507],['autumn',34.2933,-111.6657],['dead',38.3779,-92.4868]]){
 await page.evaluate(async({lat,lon})=>{const {theaterPoint}=await import('/src/game/AmericasTheater.ts');const {BATTLE_WORLD_SCALE}=await import('/src/game/camera.ts');const s=window.reviewGame.scene.getScene('WorldScene');s.followVehicle=false;const p=theaterPoint(lat,lon);s.cameras.main.setZoom(.8).centerOn(p.x*BATTLE_WORLD_SCALE,p.y*BATTLE_WORLD_SCALE);},{lat,lon});
 await page.waitForTimeout(1500);
 console.log(biome,await page.evaluate(()=>{const s=window.reviewGame.scene.getScene('WorldScene');return [...s.expeditionScenery.sprites.values()].reduce((r,i)=>(r[i.texture.key]=(r[i.texture.key]||0)+1,r),{});}));
 await page.screenshot({path:'artifacts/world-'+biome+'.png'});
}
await browser.close();console.log('Errors:',errors);if(errors.length)process.exitCode=1;})().catch(e=>{console.error(e);process.exit(1)});
