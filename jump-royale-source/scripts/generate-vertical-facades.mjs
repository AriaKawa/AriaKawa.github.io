import fs from 'node:fs';
import {createRequire} from 'node:module';
const require=createRequire(import.meta.url),sharp=require(process.env.SHARP_PATH||'C:/Users/Swagg/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/sharp');
const regions=['foothills','village','aqueduct','mine','castle','windmill','clouds','frozen','celestial','summit'];
for(let r=0;r<10;r++){
 const stone=['#344c43','#424350','#395862','#252f3a','#3b465f','#455a55','#536980','#405f83','#3d395b','#3e3c58'][r],lit=['#4c6658','#575965','#516f78','#414945','#566179','#647b6a','#718692','#5c7b99','#5b5675','#686177'][r];
 let b=`<defs><linearGradient id="shade"><stop stop-color="${stone}"/><stop offset=".45" stop-color="${lit}"/><stop offset="1" stop-color="${stone}"/></linearGradient></defs>`;
 let d='M42 1024L16 947 39 851 9 767 36 693 17 601 40 515 15 439 33 359 15 251 49 158 26 94 68 25 164 39 235 6 328 35 409 19 483 78 470 171 496 265 476 347 499 451 476 541 492 627 476 724 502 815 479 907 494 1024Z';
 if([1,2,4,8].includes(r))d='M26 1024V72H52V18H103V72H154V18H205V72H256V18H307V72H358V18H409V72H460V18H488V1024Z';
 b+=`<path d="${d}" fill="url(#shade)"/>`;
 if([1,2,4,8].includes(r)){
 for(let y=110;y<1024;y+=50)for(let x=(y%100?30:65);x<478;x+=72)b+=`<path d="M${x} ${y}h65v37" fill="none" stroke="${stone}" stroke-width="3"/>`;
 for(let y=170;y<1000;y+=230)for(const x of [100,305])b+=`<path d="M${x} ${y+125}v-80q38-90 76 0v80Z" fill="${stone}" stroke="${lit}" stroke-width="6"/><path d="M${x+38} ${y-7}v132" stroke="${lit}" stroke-width="6"/>`;
 }else{
 for(let i=0;i<13;i++){const x=60+(i*93)%370,y=55+i*75;b+=`<path d="M${x} ${y}l${i%2?48:-33} 55-21 72 39 56" fill="none" stroke="${stone}" stroke-width="7"/>`;}
 if(r===3||r===5)for(let y=80;y<1000;y+=170)b+=`<path d="M35 ${y}h445M65 ${y}l370 160M65 ${y+160}l370-160" fill="none" stroke="${lit}" stroke-width="11"/>`;
 }
 const svg=`<svg xmlns="http://www.w3.org/2000/svg" width="512" height="1024">${b}</svg>`;const base='client/public/assets/jump-royale/'+regions[r]+'/facade';fs.writeFileSync(base+'.svg',svg);await sharp(Buffer.from(svg)).png().toFile(base+'.png');
}
