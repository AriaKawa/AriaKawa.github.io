import fs from 'node:fs';
import {createRequire} from 'node:module';
const require=createRequire(import.meta.url),sharp=require(process.env.SHARP_PATH||'C:/Users/Swagg/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/sharp');
const root='client/public/assets/jump-royale/';
const palettes=[['foothills','#8ea56c','#617858','#35483d','#e4d8a5'],['village','#be846d','#765864','#3c4054','#efd7a2'],['aqueduct','#9bbab3','#63818b','#354f61','#d6e5c6'],['mine','#b99870','#726054','#303d47','#f0d29b'],['castle','#a4aabd','#69728d','#38445d','#e8dab3'],['windmill','#c5b681','#8b8564','#4a605c','#f4e6ba'],['clouds','#b6cfc0','#829d9b','#506887','#f4f0d7'],['frozen','#c0e4e9','#85acc6','#466a93','#f7fff4'],['celestial','#bcb2d6','#887ca7','#4e496d','#f7dfab'],['summit','#d6c7dd','#93849e','#504960','#fff0be']];
const path=(d,f,s='#293642',w=3)=>`<path d="${d}" fill="${f}" stroke="${s}" stroke-width="${w}" stroke-linejoin="round"/>`;
const rect=(x,y,w,h,f)=>`<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${f}"/>`;
const circle=(x,y,r,f)=>`<circle cx="${x}" cy="${y}" r="${r}" fill="${f}"/>`;
async function asset(region,name,body,w=480,h=240){fs.mkdirSync(root+region,{recursive:true});const svg=`<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">${body}</svg>`;fs.writeFileSync(root+region+'/'+name+'.svg',svg);await sharp(Buffer.from(svg)).png().toFile(root+region+'/'+name+'.png');}
for(let r=0;r<10;r++){
 const [key,light,mid,dark,rim]=palettes[r];let b='';
 if([0,6,7,9].includes(r)){
 b+=path('M0 5H480L466 40 430 54 414 112 357 142 329 216 278 190 229 231 186 163 130 151 94 81 43 66 14 39Z',mid)+path('M34 17L165 23 186 163 130 151 94 81 43 66Z',light,'none')+path('M252 14L424 14 414 112 357 142 329 216 278 190 302 88Z',dark,'none');
 for(let n=0;n<10;n++)b+=path(`M${25+n*43} 24l20 16-8 35`,'none',light,2);
 if(r===0||r===6){b+=path('M0 3H480L462 18 432 14 405 28 363 14 329 25 291 14 260 24 216 14 167 24 121 13 73 24 31 15 10 22Z',light,'none');for(let n=0;n<8;n++)b+=path(`M${44+n*57} 30q-12 48 5 75t-6 49`,'none','#729a72',4);}
 if(r===7)for(let n=0;n<15;n++)b+=path(`M${n*31} 15l12 47 13-47Z`,n%2?light:rim,'none');
 }else if(r===1){
 b+=path('M8 20H472V220L436 235H28L8 215Z',dark)+rect(30,36,420,185,mid)+path('M0 5H480L464 35H15Z',light)+rect(0,2,480,8,rim);
 for(let x=25;x<470;x+=45)b+=path(`M${x} 9l-7 20`,'none',dark,2);
 for(let x=62;x<440;x+=105)b+=path(`M${x} 80q22-28 44 0v66h-44Z`,dark)+rect(x+8,87,28,43,'#d4a670')+rect(x+20,79,4,66,mid)+rect(x-5,149,55,8,light);
 b+=rect(31,53,10,169,light)+rect(435,53,10,169,light)+rect(32,173,412,10,light)+path('M41 182l61 40M435 182l-60 40','none',light,7);
 }else if(r===2){
 b+=path('M0 6H480V238H417V136Q417 75 348 75T279 136V238H201V136Q201 75 132 75T63 136V238H0Z',mid)+path('M12 45H468M16 67H89M193 67H286M397 67H465M25 160H60M421 158H455','none',light,5);
 for(const x of [132,348])b+=path(`M${x-78} 137q0-74 78-74t78 74`,'none',light,11);
 b+=rect(0,3,480,14,rim)+rect(0,21,480,15,light)+path('M29 42q-12 61 0 99M463 39q-24 70-5 116','none','#6d936c',5);
 }else if(r===3||r===5){
 b+=rect(10,1,460,26,mid)+rect(0,2,480,7,rim)+rect(0,30,480,10,dark);
 for(let x=30;x<470;x+=110)b+=path(`M${x} 30v203h18V30Z`,mid)+path(`M${x+9} 159l93-117M${x+18} 159l-75-105`,'none',mid,10)+circle(x+9,48,4,rim);
 b+=rect(22,60,8,36,dark)+rect(13,85,25,31,'#dea65c')+rect(18,91,15,17,'#ffe4a3');
 }else{
 b+=path('M0 4H480V43H461V237H392V110Q392 63 354 63T316 110V237H164V110Q164 63 126 63T88 110V237H18V43H0Z',mid)+rect(0,2,480,11,rim)+rect(0,17,480,13,light);
 for(let y=45;y<230;y+=35)for(let x=0;x<480;x+=54)if(x<85||x>395||(x>165&&x<312))b+=path(`M${x} ${y}h48m-24 0v24`,'none',light,2);
 for(const x of [24,224,424])b+=rect(x,45,26,160,light)+rect(x-5,42,36,11,rim);
 if(r===4)b+=path('M238 63h43v93l-21-16-22 16Z','#b17b90')+path('M248 73l12 12 12-12-12 30Z',rim,'none');
 if(r===8)for(let x=62;x<460;x+=92)b+=path(`M${x} 26l8 8-8 8-8-8Z`,rim,'none');
 }
 b+=rect(0,0,480,3,rim);await asset(key,'platform',b);
 let land='';
 if(r===0){for(const x of [110,310,520])land+=path(`M${x} 550l12-280h17l11 280Z`,mid)+path(`M${x-80} 330l103-260 112 260-65-26 50 94-99-30-96 28 48-91Z`,light);}
 if(r===1){land+=rect(65,270,480,290,dark)+rect(85,310,440,250,mid)+path('M10 275L300 94 590 275Z',light)+rect(420,150,50,120,mid);for(let x=125;x<520;x+=130)land+=path(`M${x} 350q25-30 50 0v70h-50Z`,dark)+rect(x+13,355,24,50,rim);land+=path('M210 560V450q70-80 140 0v110Z',dark);}
 if(r===2)land+=path('M20 100H580V550H490V340Q490 185 300 185T110 340V550H20Z',mid)+path('M72 334Q72 140 300 140T528 334','none',light,28)+rect(10,92,580,25,rim)+rect(125,126,32,440,'#79bdcb88')+rect(162,126,10,440,'#b7e3d688');
 if(r===3){land+=path('M20 570V70L150 10 450 10 580 100V570Z',dark)+path('M75 570V150L170 75H430L525 150V570Z',mid)+path('M124 570V220Q300-20 476 220V570Z',dark);for(let y=175;y<550;y+=100)land+=rect(130,y,340,18,mid);land+=rect(130,70,23,500,light)+rect(447,70,23,500,light)+circle(300,125,22,'#f4cc84')+circle(300,125,10,'#fff0b9');}
 if(r===4){land+=path('M90 580V80H130V30H170V80H210V30H250V80H290V580Z',mid)+path('M360 580V170H400V120H440V170H480V120H520V580Z',dark);for(let y=130;y<550;y+=110)land+=path(`M165 ${y}q25-45 50 0v60h-50Z`,dark)+rect(173,y+4,7,42,light);land+=path('M273 180h84v170l-42-33-42 33Z','#a66e81')+path('M294 208l21 28 21-28-21 57Z',rim,'none');}
 if(r===5){land+=path('M160 560L220 130H380L445 560Z',mid)+path('M196 134L300 48 404 134Z',light)+path('M268 560V455q32-50 64 0v105Z',dark)+circle(300,235,36,dark);for(let i=0;i<4;i++)land+=`<g transform="rotate(${i*90} 300 235)">${path('M289 226L277 16H334L318 226Z',light)}${path('M283 52h43M284 87h40M286 122h36M288 157h32','none',dark,3)}</g>`;}
 if(r===6){land+=path('M60 510L155 550 220 592 292 551 390 584 540 510Z',mid)+path('M150 490V195H186V490M414 490V195H450V490','none',light,24)+path('M70 195L300 50 530 195Z',rim)+rect(80,200,440,22,light);for(let x=150;x<460;x+=70)land+=path(`M${x} 215q-25 140 7 255`,'none','#6f9d87',10);land+=path('M112 520v70m20-65v65','none','#b2e5e0',12);}
 if(r===7){land+=path('M10 580L80 340 140 370 250 45 325 223 380 167 590 580Z',mid)+path('M170 280L250 45 325 223 280 195 257 235 225 195Z',rim)+path('M325 223L380 167 487 374 420 310 390 319Z',light);for(let x=60;x<580;x+=70)land+=path(`M${x} 550l35-120 35 120-31-12v50h-9v-50Z`,light);}
 if(r===8)land+=path('M120 565V480L205 440 223 260 185 197 233 136 236 65 300 30 364 65 367 136 415 197 377 260 395 440 480 480V565Z',mid)+path('M236 65L300 30 364 65 350 125 300 146 250 125Z',light)+path('M263 98h16m42 0h16','none',rim,6)+path('M223 260l77 80 77-80M300 146v194','none',dark,8)+circle(300,225,35,dark)+path('M300 191l20 34-20 34-20-34Z',rim,'none');
 if(r===9)land+=path('M130 570L210 425 270 190 330 190 390 425 470 570Z',mid)+path('M182 191L300 73 418 191Z',rim)+rect(228,196,18,225,light)+rect(354,196,18,225,light)+path('M265 250q35-52 70 0l12 92h-94Z','#d6b879')+circle(300,353,10,rim)+path('M300 203v27','none',rim,6);
 await asset(key,'landmark',land,600,600);
}
await asset('props','cart',path('M4 8H156L140 48H20Z','#8a7468')+rect(0,0,160,6,'#d9d5b3')+circle(35,53,11,'#293b49')+circle(125,53,11,'#293b49')+circle(35,53,5,'#bcc3be')+circle(125,53,5,'#bcc3be'),160,68);
await asset('props','sigil',path('M20 2L36 12V32L20 42 4 32V12Z','#e9cc85')+path('M20 9L28 21 20 33 12 21Z','#487b8c'),40,44);
let bg='<defs><linearGradient id="sky" x2="0" y2="1"><stop stop-color="#101c3c"/><stop offset=".45" stop-color="#657f9c"/><stop offset="1" stop-color="#d6c6a7"/></linearGradient></defs>'+rect(0,0,1600,1000,'url(#sky)');
for(let i=0;i<65;i++)bg+=circle((i*283)%1600,20+(i*97)%470,i%3===0?2:1,'#e4e4d4');bg+=circle(1230,170,51,'#e4dfc3');
for(let l=0;l<3;l++)bg+=path(`M0 1000V${720+l*65}L160 ${420+l*105} 245 ${640+l*62} 440 ${280+l*125} 630 ${690+l*65} 840 ${430+l*90} 1010 ${710+l*65} 1190 ${360+l*110} 1420 ${680+l*65} 1600 ${420+l*120}V1000Z`,['#788e9d','#576f80','#344f60'][l],'none');
await asset('props','sky',bg,1600,1000);
let cloud='';for(let i=0;i<8;i++)cloud+=`<ellipse cx="${70+i*76}" cy="${75+(i%3)*12}" rx="95" ry="${28+(i%2)*15}" fill="#ebeddf" opacity=".65"/>`;await asset('props','cloud',cloud,720,150);
fs.writeFileSync(root+'ASSET_CREDITS.md','# Original Long Mountain artwork\n\nSVG illustrations and PNG exports authored for Jump Royale on 2026-09-15. Generated by scripts/generate-vertical-art.mjs. No external assets or franchise artwork. Editable SVG sources included. Existing character and audio credits remain in their original folders.\n');
console.log('Generated 24 original illustrated assets and editable SVG sources.');
