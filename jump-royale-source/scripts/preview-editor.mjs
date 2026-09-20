// Reuse assets from an existing checkout on machines with limited disk space.
// Without JUMP_ASSET_ROOT, this uses the normal restored client/public folder.
import { createServer, build } from 'vite';
import path from 'node:path';
import {createServer as httpServer} from 'node:http';
import {createReadStream,existsSync,statSync} from 'node:fs';
const root = path.resolve(import.meta.dirname, '../client');
const assets=path.resolve(process.env.JUMP_ASSET_ROOT||path.join(root,'public'));
if(process.argv.includes('--built')){
  if(process.argv.includes('--build'))await build({root,configFile:false,mode:'hosted',base:process.argv.includes('--site')?'/forge-climb-royale/':'/',publicDir:assets,build:{copyPublicDir:false,outDir:'.editor-build'}});
  const output=path.join(root,'.editor-build');
  const mime={'.html':'text/html','.js':'text/javascript','.css':'text/css','.json':'application/json','.png':'image/png','.webp':'image/webp','.svg':'image/svg+xml','.mp3':'audio/mpeg','.ogg':'audio/ogg','.woff2':'font/woff2'};
  httpServer((req,res)=>{
    try{
      const name=decodeURIComponent(new URL(req.url,'http://localhost').pathname).replace(/^\/forge-climb-royale\//,'/');
      let file;
      for(const base of [output,assets]){const candidate=path.resolve(base,'.'+(name==='/'?'/index.html':name));if(candidate.startsWith(base+path.sep)&&existsSync(candidate)&&statSync(candidate).isFile()){file=candidate;break;}}
      if(!file){res.writeHead(404);res.end();return;}
      res.setHeader('Content-Type',mime[path.extname(file)]||'application/octet-stream');res.setHeader('Cache-Control','no-cache');createReadStream(file).pipe(res);
    }catch{res.writeHead(400);res.end();}
  }).listen(Number(process.env.PORT||5255),'127.0.0.1',()=>console.log('Compiled editor preview: http://127.0.0.1:'+(process.env.PORT||5255)));
}else{
const server = await createServer({ root, configFile: false, mode: 'hosted',
  publicDir: process.env.JUMP_ASSET_ROOT || path.join(root, 'public'),
  cacheDir: path.join(root, '.editor-vite'),
  optimizeDeps: { noDiscovery: true, include: ['phaser'] },
  server: { host: '127.0.0.1', port: Number(process.env.PORT || 5255), strictPort: true, fs: { allow: [path.resolve(root, '..')] } }
});
await server.listen(); server.printUrls();
}
