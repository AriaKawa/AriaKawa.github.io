/** Complete Finn looks. Legacy piece IDs remain only for art and save migration. */
export const COSTUMES=[
 {id:'classic',name:'Classic Finn',set:'original',helmet:'none'},
 {id:'original',name:'Forge Knight',set:'original',helmet:'original'},
 {id:'steel',name:'Froststitch Knight',set:'steel',helmet:'steel'},
 {id:'copper',name:'Cinder Knight',set:'copper',helmet:'copper'},
 {id:'tropical',name:'Island Cook',set:'tropical',helmet:'tropical'},
 {id:'maid',name:'Maid',set:'maid',helmet:'maid'},
 {id:'diver',name:'Deep-Sea Diver',set:'diver',helmet:'diver'},
 {id:'mage',name:'Starfall Mage',set:'mage',helmet:'mage'},
];
export const costumePieces=(id:string):[string,string][]=>{
 const c=COSTUMES.find(c=>c.id===id);return c?[['helmet',c.helmet],['shirt',c.set],['pants',c.set]]:[];
};
export function costumeFields(id:string){
 const c=COSTUMES.find(c=>c.id===id)??COSTUMES[0];
 return {costume:c.id,helmet:c.helmet,shirt:c.set,pants:c.set,hair:'original',wardrobe2:undefined};
}
