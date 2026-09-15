import type { Platform } from './types.js';
/** Authored notation: left edge, rise from preceding landing, width, material.
 * Every row is a placed structure. No random seed or repeated platform phrase. */
type Step = [number,number,number,string?];
export const REGIONS:{name:string;key:string;steps:Step[]}[]=[
{name:'FOOTHILLS',key:'foothills',steps:[
[350,65,220],[470,80,180],[350,95,200],[200,105,210],[100,80,250],
[250,110,180],[420,95,190],[570,110,170],[450,120,180],[280,100,220],
[410,115,170],[590,100,190],[720,85,220],[890,45,400,'trail'],[1350,35,380,'trail'],
[1730,80,210],[1860,105,190],[1720,120,190],[1540,110,200],[1390,115,220],
[1510,130,170],[1680,115,160],[1800,135,170],[1660,120,210],[1500,110,210],
[1610,140,160],[1780,105,180],[1930,120,190],[1810,115,200],[1670,110,280]]},
{name:'ABANDONED VILLAGE',key:'village',steps:[
[1510,100,190,'roof'],[1380,110,160,'roof'],[1490,125,160,'beam'],[1640,105,170,'roof'],[1770,120,180,'roof'],
[1600,115,210,'roof'],[1430,130,170,'beam'],[1280,100,200,'roof'],[1120,105,210,'roof'],[680,35,390,'roof'],
[240,40,380,'roof'],[110,80,210,'roof'],[270,110,160,'beam'],[400,130,155,'roof'],[540,115,150,'roof'],
[410,130,170,'roof'],[230,105,210,'roof'],[140,125,180,'beam'],[300,115,180,'roof'],[470,130,170,'roof'],
[600,120,160,'roof'],[460,110,200,'roof'],[280,135,180,'beam'],[150,120,190,'roof'],[310,130,160,'roof'],
[460,115,170,'roof'],[620,130,170,'roof'],[750,105,190,'roof'],[580,125,200,'roof'],[420,110,280,'roof']]},
{name:'OLD AQUEDUCT',key:'aqueduct',steps:[
[270,110,175,'arch'],[130,125,150,'arch'],[270,130,150,'arch'],[430,110,155,'arch'],[580,130,150,'arch'],
[720,115,160,'arch'],[580,135,170,'arch'],[430,120,180,'arch'],[570,140,150,'arch'],[740,115,180,'arch'],
[900,100,200,'arch'],[1080,40,390,'arch'],[1520,45,360,'arch'],[1930,45,340,'arch'],[2130,100,170,'arch'],
[1980,125,160,'arch'],[1820,130,170,'arch'],[1960,120,145,'arch'],[2110,135,150,'arch'],[1970,125,170,'arch'],
[1800,140,170,'arch'],[1640,115,190,'arch'],[1790,125,165,'arch'],[1950,135,150,'arch'],[2090,120,170,'arch'],
[1940,140,160,'arch'],[1780,110,180,'arch'],[1630,125,180,'arch'],[1760,140,170,'arch'],[1920,100,280,'arch']]},
{name:'CLIFFSIDE MINE',key:'mine',steps:[
[1770,110,180,'beam'],[1620,125,170,'beam'],[1760,130,150,'cart'],[1910,115,160,'beam'],[2040,140,150,'beam'],
[1890,120,180,'beam'],[1720,135,160,'beam'],[1540,105,210,'beam'],[1100,40,390,'rail'],[670,40,370,'rail'],
[230,45,390,'rail'],[120,95,210,'beam'],[290,120,150,'beam'],[440,140,150,'beam'],[310,135,150,'cart'],
[160,120,175,'beam'],[310,145,145,'beam'],[470,115,150,'beam'],[600,135,150,'beam'],[450,140,160,'beam'],
[290,125,170,'beam'],[140,130,180,'beam'],[290,145,150,'beam'],[450,130,140,'beam'],[580,140,160,'beam'],
[440,125,170,'beam'],[280,140,165,'beam'],[420,125,155,'beam'],[570,140,170,'beam'],[720,100,280,'rail']]},
{name:'RUINED CASTLE',key:'castle',steps:[
[570,120,180,'tower'],[420,130,170,'tower'],[570,140,150,'tower'],[720,125,160,'tower'],[850,140,155,'tower'],
[700,125,170,'tower'],[530,135,180,'tower'],[690,140,160,'tower'],[850,125,150,'tower'],[980,120,180,'tower'],
[1140,45,400,'roof'],[1590,40,380,'roof'],[2030,40,350,'roof'],[2210,110,160,'tower'],[2060,135,150,'tower'],
[1900,125,165,'tower'],[2050,145,150,'tower'],[2190,130,145,'tower'],[2040,140,160,'tower'],[1880,130,170,'tower'],
[1730,135,160,'tower'],[1880,145,150,'tower'],[2040,125,145,'tower'],[2170,140,150,'tower'],[2010,130,175,'tower'],
[1840,145,165,'tower'],[1690,130,170,'tower'],[1840,140,150,'tower'],[2000,130,170,'tower'],[2140,100,280,'tower']]},
{name:'WINDMILL HEIGHTS',key:'windmill',steps:[
[1990,120,175,'beam'],[1840,130,160,'beam'],[1980,140,150,'cart'],[2130,120,160,'beam'],[1980,145,160,'beam'],
[1800,120,180,'beam'],[1630,130,180,'beam'],[1460,140,175,'beam'],[1020,40,380,'trail'],[590,45,380,'trail'],
[180,45,360,'trail'],[100,100,180,'beam'],[250,135,160,'cart'],[410,125,150,'beam'],[550,145,155,'beam'],
[410,135,150,'beam'],[250,130,170,'beam'],[390,145,150,'cart'],[540,130,150,'beam'],[670,140,165,'beam'],
[530,140,160,'beam'],[370,135,165,'beam'],[220,140,170,'beam'],[380,130,150,'beam'],[530,145,155,'beam'],
[680,125,170,'beam'],[540,140,165,'beam'],[380,135,175,'beam'],[220,140,180,'beam'],[360,105,280,'trail']]},
{name:'CLOUD GARDENS',key:'clouds',steps:[
[220,125,170,'garden'],[90,140,150,'garden'],[240,145,150,'garden'],[400,130,150,'garden'],[540,140,150,'garden'],
[390,145,165,'garden'],[230,130,170,'garden'],[380,145,150,'garden'],[530,135,165,'garden'],[690,115,190,'garden'],
[860,45,380,'garden'],[1300,40,380,'garden'],[1740,45,370,'garden'],[2150,70,220,'garden'],[2010,140,150,'garden'],
[1860,145,155,'garden'],[2010,135,145,'cart'],[2150,145,150,'garden'],[2000,140,160,'garden'],[1830,130,175,'garden'],
[1680,145,165,'garden'],[1830,140,150,'garden'],[1980,145,150,'garden'],[2120,130,155,'garden'],[1970,150,155,'garden'],
[1810,135,170,'garden'],[1650,140,170,'garden'],[1810,140,150,'garden'],[1960,145,160,'garden'],[2090,100,280,'garden']]},
{name:'FROZEN PEAK',key:'frozen',steps:[
[1940,130,260,'ice'],[1790,135,170],[1630,140,170],[1770,145,160],[1920,140,260,'ice'],
[1770,130,170],[1600,145,175],[1430,130,190],[1000,45,380],[570,45,380],
[150,50,360],[90,115,260,'ice'],[260,140,150],[410,145,150],[560,140,160],
[410,145,260,'ice'],[250,140,170],[100,145,170],[250,140,150],[400,150,155],
[550,140,260,'ice'],[390,145,175],[230,140,170],[380,145,150],[540,150,150],
[690,140,165],[540,145,175],[380,140,175],[220,150,180],[370,105,280]]},
{name:'CELESTIAL RUINS',key:'celestial',steps:[
[230,135,160,'temple'],[100,145,145,'temple'],[250,150,140,'temple'],[400,140,145,'temple'],[540,150,145,'temple'],
[390,145,155,'temple'],[230,150,165,'temple'],[390,140,145,'temple'],[540,150,145,'temple'],[680,135,180,'temple'],
[850,50,370,'temple'],[1280,50,360,'temple'],[1700,50,350,'temple'],[2080,90,190,'temple'],[1940,150,145,'temple'],
[1780,145,165,'temple'],[1930,150,145,'cart'],[2070,145,145,'temple'],[1920,150,155,'temple'],[1760,145,165,'temple'],
[1610,150,160,'temple'],[1760,145,145,'temple'],[1910,150,145,'temple'],[2040,145,155,'temple'],[1880,150,165,'temple'],
[1710,145,170,'temple'],[1550,150,170,'temple'],[1390,145,170,'temple'],[1240,150,170,'temple'],[1080,110,280,'temple']]},
{name:'SUMMIT',key:'summit',steps:[
[950,130,160,'temple'],[810,145,150,'temple'],[960,150,140,'temple'],[1110,150,140,'temple'],[1250,145,145,'temple'],
[1110,150,155,'temple'],[960,145,165,'temple'],[1100,150,145,'temple'],[1240,150,150,'temple'],[1110,140,180,'temple']]}
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
 for(const [r,index,dx] of [[1,5,-60],[2,19,20],[4,18,25],[6,20,30],[8,19,20]]){
  const source=out.find(p=>p.id===`${REGIONS[r].key}-${index}`)!;
  out.push({id:`secret-${r}`,x:source.x+dx,y:source.y-72,w:74,h:40,type:'cracked',mountain:true,region:r,structure:r===1?'roof':'temple',crumbleSeconds:2.8,secret:true});
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
