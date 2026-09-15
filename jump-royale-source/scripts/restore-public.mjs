import fs from 'node:fs';
import path from 'node:path';
const here=path.resolve(import.meta.dirname,'..');
for(const name of ['assets','vendor'])fs.cpSync(path.join(here,'../forge-climb-royale',name),path.join(here,'client/public',name),{recursive:true,filter:file=>!/^index-.*\.(js|css)$/.test(path.basename(file))});
console.log('Restored original shared assets from the deployed game directory.');
