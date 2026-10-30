import {FRAMES} from './spirit-frames.mjs';
export const STYLES=[
 {id:'original',name:'Original',description:'The familiar woodland spirits.'},
 {id:'pixel',name:'Pixel Pals',description:'Pastel animals and a soft pixel meadow.'},
 {id:'soft',name:'Sweet Spirits',description:'Rounder spirits, rosy cheeks, and honeywood.'}
];
export const ASSETS=['spirits','struggle','plants','dirt','dirt_variants','meadow','blades_simple','ui','button','cursor','pinch','prairie'];
const pending=new Map();
export const stylePath=id=>id==='original'?'assets/':`assets/styles/${id}/`;
export function savedStyle(){try {const id=localStorage.getItem('little-wilds-style');return STYLES.some(s=>s.id===id)?id:'original';}catch{return 'original';}}
export function loadStyle(id){
 if(!STYLES.some(s=>s.id===id))return Promise.reject(Error('Unknown style'));
 if(!pending.has(id)){const task=Promise.all(ASSETS.map(name=>new Promise((resolve,reject)=>{const im=new Image();im.onload=()=>resolve([name,im]);im.onerror=()=>reject(Error('Could not load '+name));im.src=name==='prairie'?'assets/prairie.png':stylePath(id)+name+'.png';}))).then(entries=>{
  const images=Object.fromEntries(entries),frames=id==='original'?FRAMES:Object.fromEntries(['spirits','struggle'].map(name=>[name,Array.from({length:16},(_,i)=>[i%4*128,Math.floor(i/4)*128,128,128])])),portraits=[];
  for(let i=0;i<4;i++){const [x,y,w,h]=frames.spirits[i*4],im=images.spirits,c=document.createElement('canvas');c.width=64;c.height=64;const g=c.getContext('2d');g.imageSmoothingEnabled=false;const scale=Math.min(56/w,56/h);g.drawImage(im,x,y,w,h,(64-w*scale)/2,(64-h*scale)/2,w*scale,h*scale);portraits.push(c.toDataURL());}
  return {id,images,frames,unit:id==='original'?313.5:128,portraits};
 }).catch(e=>{pending.delete(id);throw e;});pending.set(id,task);}
 return pending.get(id);
}
export function applyStyle(bundle){
 document.body.dataset.style=bundle.id;
 for(const name of ['ui','plants','button','spirits'])document.documentElement.style.setProperty('--art-'+name,`url("${stylePath(bundle.id)+name}.png")`);
 document.querySelectorAll('.portrait .sprite').forEach((el,i)=>{el.style.backgroundImage=`url("${bundle.portraits[i]}")`;});
 try{localStorage.setItem('little-wilds-style',bundle.id);}catch{}
}
