const {chromium}=require('../../suno-producer/node_modules/playwright');
(async()=>{
const browser=await chromium.launch({headless:true,channel:'msedge'}),page=await browser.newPage({viewport:{width:1440,height:960}}),errors=[];
page.on('pageerror',e=>errors.push(e.message));
await page.addInitScript(()=>{let phaser;Object.defineProperty(window,'Phaser',{configurable:true,get:()=>phaser,set:value=>{phaser=value;const Game=value.Game;value.Game=class extends Game{constructor(...args){super(...args);window.reviewGame=this;}};}});});
await page.goto('http://127.0.0.1:5182/?offline=1');
await page.waitForFunction(()=>window.reviewGame?.scene.isActive('MenuScene'),null,{timeout:90000});await page.locator('#local-button').click();await page.waitForTimeout(6000);await page.mouse.click(578,294);await page.locator('#globe-deploy-button').click();await page.waitForTimeout(8000);
for(const [biome,lat,lon] of [['green',40.133,-89.1507],['autumn',34.2933,-111.6657],['dead',38.3779,-92.4868]]){
const result=await page.evaluate(async({lat,lon})=>{
const {theaterPoint}=await import('/src/game/AmericasTheater.ts');const {BATTLE_WORLD_SCALE}=await import('/src/game/camera.ts');
const s=window.reviewGame.scene.getScene('WorldScene');s.followVehicle=false;const p=theaterPoint(lat,lon);s.cameras.main.setZoom(.8).centerOn(p.x*BATTLE_WORLD_SCALE,p.y*BATTLE_WORLD_SCALE);return p;
},{lat,lon});await page.waitForTimeout(2500);
console.log(biome,result,await page.evaluate(()=>document.querySelector('canvas').dataset.sceneryBiomes));
await page.screenshot({path:`artifacts/scenery-${biome}.png`});
const stats=await page.evaluate(()=>{const s=window.reviewGame.scene.getScene('WorldScene');return [...s.expeditionScenery.sprites.values()].reduce((r,i)=>(r[i.texture.key]=(r[i.texture.key]||0)+1,r),{});});
console.log(stats);if(biome!=='green'&&!stats[`scenery-${biome}`])throw new Error(`Missing ${biome} trees`);if(!stats['scenery-details'])throw new Error('Missing ground decals');
}
console.log('Errors',errors);await browser.close();if(errors.length)process.exitCode=1;
})().catch(e=>{console.error(e);process.exit(1)});
