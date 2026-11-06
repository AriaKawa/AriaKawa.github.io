const {chromium}=require('../../suno-producer/node_modules/playwright');
(async()=>{const browser=await chromium.launch({headless:true,channel:'msedge'});const page=await browser.newPage({viewport:{width:1440,height:960}});const errors=[];page.on('pageerror',e=>errors.push(e.message));
await page.addInitScript(()=>{let phaser;Object.defineProperty(window,'Phaser',{configurable:true,get:()=>phaser,set:value=>{phaser=value;const Game=value.Game;value.Game=class extends Game{constructor(...args){super(...args);window.reviewGame=this;}};}});});
await page.goto('http://127.0.0.1:5183/?offline=1');await page.locator('#local-button').click();await page.waitForTimeout(6000);await page.mouse.click(578,294);await page.locator('#globe-deploy-button').click();await page.waitForTimeout(8000);


console.log(await page.evaluate(async()=>{
 const scene=window.reviewGame.scene.getScene('WorldScene'),sim=scene.network.local,base=sim.bases[0];
 const zombies=sim.zombies.filter(z=>z.home);if(zombies.length>4)throw Error('Too many ambient zombies');
 let queries=0;const original=scene.sceneryWorld.query.bind(scene.sceneryWorld);scene.sceneryWorld.query=(...args)=>{queries++;return original(...args);};
 const start=performance.now();const points=scene.sceneryWorld.roadsideSpawns(scene.baseWorldPoint(base),2100);const scanMs=performance.now()-start;scene.sceneryWorld.query=original;
 if(queries)throw Error('Road population eagerly generates collision chunks');
 scene.followVehicle=false;scene.cameras.main.setZoom(.8);scene.destroySurfaceChunks();
 const frames=[];let previous=performance.now(),deadline=previous+3500,baked=0,minPending=Infinity;
 while(performance.now()<deadline){await new Promise(requestAnimationFrame);const now=performance.now();frames.push(now-previous);previous=now;scene.cameras.main.scrollX+=.2;baked=Math.max(baked,scene.surfaceChunks.size);minPending=Math.min(minPending,Number(scene.game.canvas.dataset.surfaceChunksPending));}
 if(!baked || minPending!==0)throw Error('Terrain never finished while camera moved: '+JSON.stringify({baked,minPending}));
 frames.sort((a,b)=>a-b);
 return {ambient:zombies.length,types:zombies.map(z=>z.type),scanMs,collisionQueries:queries,bakedChunks:baked,minPending,frameP95:frames[Math.floor(frames.length*.95)]};
}));
await page.screenshot({path:'artifacts/sparse-zombies-terrain.png'});await browser.close();console.log('Errors',errors);if(errors.length)process.exitCode=1;
})().catch(e=>{console.error(e);process.exit(1)});
