/** Original generated close-up illustrations, independent of gameplay sprites. */
export const PORTRAITS=[
 {id:'finn',name:'Finn'},
 {id:'stella',name:'Stella'},
 {id:'ember',name:'Ember'},
 {id:'biscuit',name:'Biscuit'},
] as const;
export function portraitId(id:string):string {
 const legacy:Record<string,string>={original:'finn','magical-girl':'stella',demon:'ember',puppy:'biscuit'};
 return PORTRAITS.some(p=>p.id===id)?id:legacy[id]??'finn';
}
export function portraitImage(id:string):HTMLImageElement {
 const image=document.createElement('img');image.className='profile-portrait';image.src=import.meta.env.BASE_URL+'assets/menu/portraits/'+portraitId(id)+'.webp';image.alt='';image.draggable=false;return image;
}
