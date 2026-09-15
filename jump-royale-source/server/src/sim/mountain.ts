import type { Platform } from './types.js';
/** Authored notation: left edge, rise from preceding landing, width, material.
 * Every row is a placed structure. No random seed or repeated platform phrase. */
type Step = [number,number,number,string?];
export const REGIONS:{name:string;key:string;steps:Step[]}[]=[
{name:'FOOTHILLS',key:'foothills',steps:[
[405,65,110],[620,80,90],[439,95,72],[250,105,60],[459,80,52],
[642,110,36],[835,95,40],[1029,110,32],[848,120,44],[657,100,36],
[845,115,40],[1039,100,32],[832,85,44],[890,45,400,'trail'],[1350,35,380,'trail'],
[1819,80,32],[2018,105,44],[1847,120,36],[1665,110,40],[1479,115,32],
[1648,130,44],[1832,115,36],[2020,135,40],[1849,120,32],[1663,110,44],
[1842,140,36],[2030,105,40],[2214,120,32],[2018,115,44],[1670,110,280]]},
{name:'ABANDONED VILLAGE',key:'village',steps:[
[1586,100,38,'roof'],[1400,110,30,'roof'],[1573,125,34,'beam'],[1771,105,28,'roof'],[1956,120,38,'roof'],
[1785,115,30,'roof'],[1603,130,34,'beam'],[1401,100,28,'roof'],[1206,105,38,'roof'],[680,35,390,'roof'],
[240,40,380,'roof'],[201,80,28,'roof'],[376,110,38,'beam'],[570,130,30,'roof'],[743,115,34,'roof'],
[566,130,28,'roof'],[356,105,38,'roof'],[185,125,30,'beam'],[363,115,34,'roof'],[556,130,28,'roof'],
[726,120,38,'roof'],[550,110,30,'roof'],[358,135,34,'beam'],[186,120,28,'roof'],[361,130,38,'roof'],
[555,115,30,'roof'],[728,130,34,'roof'],[926,105,28,'roof'],[731,125,38,'roof'],[420,110,280,'roof']]},
{name:'OLD AQUEDUCT',key:'aqueduct',steps:[
[344,110,28,'arch'],[156,125,24,'arch'],[327,130,32,'arch'],[512,110,22,'arch'],[699,130,28,'arch'],
[876,115,24,'arch'],[692,135,32,'arch'],[507,120,22,'arch'],[674,140,28,'arch'],[856,115,24,'arch'],
[1057,100,32,'arch'],[1080,40,390,'arch'],[1520,45,360,'arch'],[1930,45,340,'arch'],[2199,100,32,'arch'],
[2024,125,22,'arch'],[1831,130,28,'arch'],[2008,120,24,'arch'],[2184,135,32,'arch'],[1999,125,22,'arch'],
[1826,140,28,'arch'],[1648,115,24,'arch'],[1834,125,32,'arch'],[2014,135,22,'arch'],[2191,120,28,'arch'],
[2018,140,24,'arch'],[1839,110,32,'arch'],[1664,125,22,'arch'],[1836,140,28,'arch'],[1920,100,280,'arch']]},
{name:'CLIFFSIDE MINE',key:'mine',steps:[
[1846,110,28,'beam'],[1658,125,24,'beam'],[1817,130,56,'cart'],[2014,115,22,'beam'],[2186,140,28,'beam'],
[2013,120,24,'beam'],[1829,135,32,'beam'],[1629,105,22,'beam'],[1100,40,390,'rail'],[670,40,370,'rail'],
[230,45,390,'rail'],[214,95,22,'beam'],[391,120,28,'beam'],[568,140,24,'beam'],[377,135,56,'cart'],
[214,120,22,'beam'],[386,145,28,'beam'],[563,115,24,'beam'],[739,135,32,'beam'],[569,140,22,'beam'],
[391,125,28,'beam'],[213,130,24,'beam'],[384,145,32,'beam'],[564,130,22,'beam'],[726,140,28,'beam'],
[538,125,24,'beam'],[364,140,32,'beam'],[549,125,22,'beam'],[721,140,28,'beam'],[720,100,280,'rail']]},
{name:'RUINED CASTLE',key:'castle',steps:[
[646,120,28,'tower'],[458,130,24,'tower'],[624,140,32,'tower'],[809,125,22,'tower'],[981,140,28,'tower'],
[808,125,24,'tower'],[624,135,32,'tower'],[804,140,22,'tower'],[976,125,28,'tower'],[1158,120,24,'tower'],
[1140,45,400,'roof'],[1590,40,380,'roof'],[2030,40,350,'roof'],[2278,110,24,'tower'],[2099,135,32,'tower'],
[1924,125,22,'tower'],[2096,145,28,'tower'],[2273,130,24,'tower'],[2104,140,32,'tower'],[1919,130,22,'tower'],
[1741,135,28,'tower'],[1908,145,24,'tower'],[2094,125,32,'tower'],[2269,140,22,'tower'],[2086,130,28,'tower'],
[1913,145,24,'tower'],[1734,130,32,'tower'],[1904,140,22,'tower'],[2091,130,28,'tower'],[2140,100,280,'tower']]},
{name:'WINDMILL HEIGHTS',key:'windmill',steps:[
[2064,120,28,'beam'],[1876,130,24,'beam'],[2030,140,56,'cart'],[2227,120,22,'beam'],[2049,145,28,'beam'],
[1876,120,24,'beam'],[1692,130,32,'beam'],[1522,140,22,'beam'],[1020,40,380,'trail'],[590,45,380,'trail'],
[180,45,360,'trail'],[179,100,22,'beam'],[342,135,56,'cart'],[548,125,24,'beam'],[714,145,32,'beam'],
[539,135,22,'beam'],[346,130,28,'beam'],[502,145,56,'cart'],[694,130,32,'beam'],[874,140,22,'beam'],
[701,140,28,'beam'],[523,135,24,'beam'],[344,140,32,'beam'],[524,130,22,'beam'],[686,145,28,'beam'],
[878,125,24,'beam'],[704,140,32,'beam'],[529,135,22,'beam'],[351,140,28,'beam'],[360,105,280,'trail']]},
{name:'CLOUD GARDENS',key:'clouds',steps:[
[291,125,28,'garden'],[118,140,24,'garden'],[284,145,32,'garden'],[469,130,22,'garden'],[641,140,28,'garden'],
[473,145,24,'garden'],[289,130,32,'garden'],[469,145,22,'garden'],[641,135,28,'garden'],[823,115,24,'garden'],
[860,45,380,'garden'],[1300,40,380,'garden'],[1740,45,370,'garden'],[2248,70,24,'garden'],[2074,140,32,'garden'],
[1914,145,22,'garden'],[2087,135,56,'cart'],[2273,145,24,'garden'],[2104,140,32,'garden'],[1919,130,22,'garden'],
[1746,145,28,'garden'],[1913,140,24,'garden'],[2084,145,32,'garden'],[2264,130,22,'garden'],[2096,150,28,'garden'],
[1908,135,24,'garden'],[1734,140,32,'garden'],[1904,140,22,'garden'],[2076,145,28,'garden'],[2090,100,280,'garden']]},
{name:'FROZEN PEAK',key:'frozen',steps:[
[2022,130,96,'ice'],[1870,135,20],[1697,140,26],[1866,145,18],[2002,140,96,'ice'],
[1865,130,20],[1697,145,26],[1511,130,18],[1000,45,380],[570,45,380],
[150,50,360],[172,115,96,'ice'],[373,140,24],[550,145,20],[717,140,26],
[517,145,96,'ice'],[378,140,24],[210,145,20],[372,140,26],[551,150,18],
[682,140,96,'ice'],[555,145,20],[377,140,26],[551,145,18],[713,150,24],
[890,140,20],[717,145,26],[556,140,18],[378,150,24],[370,105,280]]},
{name:'CELESTIAL RUINS',key:'celestial',steps:[
[298,135,24,'temple'],[125,145,20,'temple'],[292,150,26,'temple'],[461,140,18,'temple'],[633,150,24,'temple'],
[465,145,20,'temple'],[297,150,26,'temple'],[476,140,18,'temple'],[643,150,24,'temple'],[825,135,20,'temple'],
[850,50,370,'temple'],[1280,50,360,'temple'],[1700,50,350,'temple'],[2165,90,20,'temple'],[1992,150,26,'temple'],
[1831,145,18,'temple'],[1987,150,56,'cart'],[2175,145,20,'temple'],[2007,150,26,'temple'],[1836,145,18,'temple'],
[1663,150,24,'temple'],[1830,145,20,'temple'],[2002,150,26,'temple'],[2176,145,18,'temple'],[2008,150,24,'temple'],
[1835,145,20,'temple'],[1662,150,26,'temple'],[1501,145,18,'temple'],[1323,150,24,'temple'],[1080,110,280,'temple']]},
{name:'SUMMIT',key:'summit',steps:[
[1018,130,24,'temple'],[845,145,20,'temple'],[1012,150,26,'temple'],[1181,150,18,'temple'],[1353,145,24,'temple'],
[1185,150,20,'temple'],[1017,145,26,'temple'],[1196,150,18,'temple'],[1363,150,24,'temple'],[1200,140,20,'temple']]}
];
export const MOUNTAIN_SECTIONS=REGIONS.map(r=>r.name);
export const MOUNTAIN_RISE=REGIONS.reduce((sum,r)=>sum+r.steps.reduce((n,s)=>n+s[1],0),0)+108;
export const MOUNTAIN_HEIGHT=MOUNTAIN_RISE+280;
export const MOUNTAIN_WIDTH=2560;
export const MOUNTAIN_FLOOR=MOUNTAIN_HEIGHT-208;
export const MOUNTAIN_SPAWN=MOUNTAIN_FLOOR-32;
export const REGION_FLOORS:number[]=[];
let floor=MOUNTAIN_FLOOR;
for(const r of REGIONS){REGION_FLOORS.push(floor);floor-=r.steps.reduce((n,s)=>n+s[1],0);}
export const mountainSection=(y:number)=>{let s=0;while(s<9&&y<REGION_FLOORS[s+1])s++;return s;};
/** Consistent eastward gusts on exposed upper faces; pockets are sheltered. */
export function mountainWind(x:number,y:number,time:number):number{
 const s=mountainSection(y);if((s!==5&&s!==7)||x<700||x>1650)return 0;
 return 12+18*(.5-.5*Math.cos(time*Math.PI/4));
}
export function generateMountain():Platform[]{
 const out:Platform[]=[{id:'spawn',x:54,y:MOUNTAIN_FLOOR,w:MOUNTAIN_WIDTH-108,h:208,type:'stone',mountain:true,region:0,structure:'trail'}];
 let y=MOUNTAIN_FLOOR;
 REGIONS.forEach((region,r)=>region.steps.forEach(([x,rise,w,structure],i)=>{
  y-=rise;const moving=structure==='cart';
  out.push({id:`${region.key}-${i}`,x,y,w,h:structure==='beam'||moving?30:64,type:moving?'moving':structure==='beam'||structure==='rail'?'wood':'stone',mountain:true,region:r,structure:structure??(r===7?'ice-rock':'rock'),slippery:structure==='ice',...(moving?{baseX:x,moveRange:18,movePeriodMs:6000,movePhase:0}:{}),route:true});
 }));
 // Optional fragile shortcuts. The entire permanent route survives a collapse.
 for(const [r,index] of [[1,5],[2,19],[4,18],[6,20],[8,19]]){
  const source=out.find(p=>p.id===`${REGIONS[r].key}-${index}`)!;
  out.push({id:`secret-${r}`,x:source.x+source.w/2-37,y:source.y-72,w:74,h:40,type:'cracked',mountain:true,region:r,structure:r===1?'roof':'temple',crumbleSeconds:2.8,secret:true});
 }
 // Two optional windmill blade cradles orbit an axle. Wide permanent ledges
 // teach timing first; these riskier cradles offer a different line upward.
 for(const i of [5,21]){const p=out.find(p=>p.id==='windmill-'+i)!;
  out.push({id:'rotor-'+i,x:p.x+100,y:p.y-60,w:90,h:24,type:'moving',mountain:true,region:5,structure:'blade',baseX:p.x+100,baseY:p.y-85,orbitY:25,moveRange:35,movePeriodMs:7000});
 }
 // Deep spillways and broad galleries interrupt catastrophic fall channels.
 // Offset below transitions, so they never intercept a successful upward jump.
 for(const r of [2,4,6,8])out.push({id:'catch-'+r,x:54,y:REGION_FLOORS[r]+55,w:MOUNTAIN_WIDTH-108,h:120,type:'stone',mountain:true,region:r,structure:r===2?'arch':r===4?'roof':'garden'});
 out.push({id:'crown',x:1130,y:72,w:140,h:80,type:'stone',mountain:true,region:9,structure:'temple',route:true});
 return out;
}
