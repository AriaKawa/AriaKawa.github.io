// Masks match the original 96×112 brute frames. The same silhouette is removed
// from the walking body and becomes the rotating, falling fragment.
export const BRUTE_PARTS=[
 {cx:24,cy:56,points:[[8,48],[26,47],[35,53],[34,66],[8,66]]},
 {cx:83,cy:59,points:[[75,50],[94,50],[95,71],[74,71]]},
 {cx:23,cy:39,points:[[0,22],[33,22],[31,38],[27,46],[34,53],[34,67],[0,67]]},
 {cx:77,cy:39,points:[[67,22],[96,22],[96,72],[74,72],[74,51],[70,43]]},
];
export function zombieAsset(e,frame){const kind=e.appearance||e.kind;return `${['woman','walker2','crawler'].includes(kind)?'v11':'v6'}-${kind}-${frame}`;}
export function makeBruteLayers(image,lost=0,part=-1){
 const canvas=document.createElement('canvas');canvas.width=96;canvas.height=112;
 const c=canvas.getContext('2d');c.imageSmoothingEnabled=false;
 const polygon=points=>{c.beginPath();points.forEach(([x,y],i)=>i?c.lineTo(x,y):c.moveTo(x,y));c.closePath();};
 if(part>=0){polygon(BRUTE_PARTS[part].points);c.clip();}
 c.drawImage(image,0,0);c.globalCompositeOperation='destination-out';
 const remove=part>=2?[part-2]:part>=0?[]:Array.from({length:lost},(_,i)=>i);
 for(const i of remove){polygon(BRUTE_PARTS[i].points);c.fill();}
 return canvas;
}
