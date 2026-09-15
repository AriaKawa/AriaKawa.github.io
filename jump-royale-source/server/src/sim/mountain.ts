import type { Platform } from './types.js';
import {sizePlatforms} from './platformSizing.js';
/** Authored notation: left edge, rise from preceding landing, width, material.
 * Every row is a placed structure. No random seed or repeated platform phrase. */
type Step = [number,number,number,string?];
export const REGIONS:{name:string;key:string;steps:Step[]}[]=[
{name:'FOOTHILLS',key:'foothills',steps:[
[350,65,220],[556,80,219],[366,95,219],[171,105,218],[377,80,217],
[552,110,217],[747,95,216],[938,110,215],[763,120,214],[568,100,214],
[759,115,213],[949,100,212],[748,85,212],[890,45,400,'trail'],[1350,35,380,'trail'],
[1730,80,210],[1936,105,209],[1761,120,208],[1581,110,208],[1392,115,207],
[1567,130,206],[1747,115,206],[1938,135,205],[1763,120,204],[1584,110,203],
[1759,140,203],[1949,105,202],[2130,120,201],[1940,115,201],[1670,110,280]]},
{name:'ABANDONED VILLAGE',key:'village',steps:[
[1505,100,200,'roof'],[1316,110,199,'roof'],[1491,125,198,'beam'],[1686,105,198,'roof'],[1877,120,197,'roof'],
[1702,115,196,'roof'],[1523,130,195,'beam'],[1318,100,195,'roof'],[1128,105,194,'roof'],[680,35,390,'roof'],
[240,40,380,'roof'],[119,80,192,'roof'],[300,110,191,'beam'],[490,130,190,'roof'],[666,115,189,'roof'],
[486,130,189,'roof'],[281,105,188,'roof'],[107,125,187,'beam'],[287,115,186,'roof'],[477,130,186,'roof'],
[653,120,185,'roof'],[473,110,184,'roof'],[284,135,183,'beam'],[109,120,183,'roof'],[289,130,182,'roof'],
[480,115,181,'roof'],[655,130,180,'roof'],[850,105,180,'roof'],[661,125,179,'roof'],[420,110,280,'roof']]},
{name:'OLD AQUEDUCT',key:'aqueduct',steps:[
[269,110,178,'arch'],[80,125,177,'arch'],[255,130,176,'arch'],[435,110,176,'arch'],[626,130,175,'arch'],
[801,115,174,'arch'],[622,135,173,'arch'],[432,120,173,'arch'],[602,140,172,'arch'],[783,115,171,'arch'],
[988,100,170,'arch'],[1080,40,390,'arch'],[1520,45,360,'arch'],[1930,45,340,'arch'],[2132,100,167,'arch'],
[1952,125,167,'arch'],[1762,130,166,'arch'],[1938,120,165,'arch'],[2118,135,164,'arch'],[1928,125,164,'arch'],
[1759,140,163,'arch'],[1579,115,162,'arch'],[1770,125,161,'arch'],[1945,135,161,'arch'],[2125,120,160,'arch'],
[1951,140,159,'arch'],[1776,110,158,'arch'],[1596,125,158,'arch'],[1772,140,157,'arch'],[1920,100,280,'arch']]},
{name:'CLIFFSIDE MINE',key:'mine',steps:[
[1782,110,156,'beam'],[1593,125,155,'beam'],[1768,130,154,'cart'],[1948,115,154,'beam'],[2124,140,153,'beam'],
[1949,120,152,'beam'],[1770,135,151,'beam'],[1565,105,151,'beam'],[1100,40,390,'rail'],[670,40,370,'rail'],
[230,45,390,'rail'],[151,95,148,'beam'],[332,120,147,'beam'],[507,140,146,'beam'],[333,135,145,'cart'],
[153,120,145,'beam'],[328,145,144,'beam'],[504,115,143,'beam'],[684,135,142,'beam'],[509,140,142,'beam'],
[335,125,141,'beam'],[155,130,140,'beam'],[331,145,139,'beam'],[506,130,139,'beam'],[671,140,138,'beam'],
[482,125,137,'beam'],[312,140,136,'beam'],[492,125,136,'beam'],[668,140,135,'beam'],[720,100,280,'rail']]},
{name:'RUINED CASTLE',key:'castle',steps:[
[593,120,134,'tower'],[404,130,133,'tower'],[574,140,132,'tower'],[754,125,132,'tower'],[930,140,131,'tower'],
[755,125,130,'tower'],[576,135,129,'tower'],[751,140,129,'tower'],[926,125,128,'tower'],[1107,120,127,'tower'],
[1140,45,400,'roof'],[1590,40,380,'roof'],[2030,40,350,'roof'],[2228,110,124,'tower'],[2054,135,123,'tower'],
[1874,125,123,'tower'],[2049,145,122,'tower'],[2225,130,121,'tower'],[2060,140,120,'tower'],[1870,130,120,'tower'],
[1696,135,119,'tower'],[1861,145,118,'tower'],[2052,125,117,'tower'],[2222,140,117,'tower'],[2042,130,116,'tower'],
[1868,145,115,'tower'],[1693,130,114,'tower'],[1858,140,114,'tower'],[2049,130,113,'tower'],[2140,100,280,'tower']]},
{name:'WINDMILL HEIGHTS',key:'windmill',steps:[
[2022,120,112,'beam'],[1833,130,111,'beam'],[2003,140,110,'cart'],[2183,120,110,'beam'],[2009,145,109,'beam'],
[1834,120,108,'beam'],[1655,130,107,'beam'],[1480,140,107,'beam'],[1020,40,380,'trail'],[590,45,380,'trail'],
[180,45,360,'trail'],[138,100,104,'beam'],[319,135,103,'cart'],[509,125,102,'beam'],[680,145,101,'beam'],
[500,135,101,'beam'],[310,130,100,'beam'],[481,145,99,'cart'],[661,130,98,'beam'],[836,140,98,'beam'],
[667,140,97,'beam'],[487,135,96,'beam'],[313,140,95,'beam'],[488,130,95,'beam'],[653,145,94,'beam'],
[844,125,93,'beam'],[674,140,92,'beam'],[494,135,92,'beam'],[320,140,91,'beam'],[360,105,280,'trail']]},
{name:'CLOUD GARDENS',key:'clouds',steps:[
[260,125,90,'garden'],[86,140,89,'garden'],[256,145,88,'garden'],[436,130,88,'garden'],[612,140,87,'garden'],
[442,145,86,'garden'],[263,130,85,'garden'],[438,145,85,'garden'],[613,135,84,'garden'],[794,115,83,'garden'],
[860,45,380,'garden'],[1300,40,380,'garden'],[1740,45,370,'garden'],[2220,70,80,'garden'],[2051,140,79,'garden'],
[1886,145,79,'garden'],[2076,135,78,'cart'],[2247,145,77,'garden'],[2082,140,76,'garden'],[1892,130,76,'garden'],
[1723,145,75,'garden'],[1888,140,74,'garden'],[2064,145,73,'garden'],[2239,130,73,'garden'],[2074,150,72,'garden'],
[1885,135,71,'garden'],[1715,140,70,'garden'],[1880,140,70,'garden'],[2056,145,69,'garden'],[2090,100,280,'garden']]},
{name:'FROZEN PEAK',key:'frozen',steps:[
[2022,130,96,'ice'],[1847,135,67],[1677,140,66],[1842,145,66],[2002,140,96,'ice'],
[1843,130,64],[1679,145,63],[1489,130,63],[1000,45,380],[570,45,380],
[150,50,360],[172,115,96,'ice'],[356,140,59],[531,145,58],[702,140,57],
[517,145,96,'ice'],[362,140,56],[193,145,55],[358,140,54],[533,150,54],
[682,140,96,'ice'],[539,145,52],[365,140,51],[535,145,51],[700,150,50],
[876,140,49],[706,145,48],[541,140,48],[367,150,47],[370,105,280]]},
{name:'CELESTIAL RUINS',key:'celestial',steps:[
[287,135,46,'temple'],[113,145,45,'temple'],[283,150,45,'temple'],[448,140,44,'temple'],[623,150,44,'temple'],
[454,145,43,'temple'],[289,150,43,'temple'],[464,140,42,'temple'],[634,150,42,'temple'],[815,135,41,'temple'],
[850,50,370,'temple'],[1280,50,360,'temple'],[1700,50,350,'temple'],[2156,90,39,'temple'],[1986,150,38,'temple'],
[1821,145,38,'temple'],[1987,150,56,'cart'],[2167,145,37,'temple'],[2002,150,36,'temple'],[1827,145,36,'temple'],
[1658,150,35,'temple'],[1823,145,34,'temple'],[1998,150,34,'temple'],[2169,145,33,'temple'],[2004,150,33,'temple'],
[1829,145,32,'temple'],[1659,150,32,'temple'],[1495,145,31,'temple'],[1320,150,31,'temple'],[1080,110,280,'temple']]},
{name:'SUMMIT',key:'summit',steps:[
[1015,130,30,'temple'],[841,145,29,'temple'],[1012,150,27,'temple'],[1177,150,26,'temple'],[1353,145,25,'temple'],
[1184,150,23,'temple'],[1019,145,22,'temple'],[1195,150,21,'temple'],[1366,150,19,'temple'],[1203,140,18,'temple']]}
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
 return sizePlatforms(out,'mountain');
}
