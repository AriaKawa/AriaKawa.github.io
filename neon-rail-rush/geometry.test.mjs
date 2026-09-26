import test from 'node:test';
import assert from 'node:assert/strict';
import {solidBox,NEAR_Z,FAR_Z} from './geometry.mjs';
const box={x0:1,x1:2,z0:10,z1:28,top:160};
test('solid remains watertight through the camera clipping plane',()=>{
  for(const z0 of [10,-15,-25,-40]) {
    const solid=solidBox({...box,z0,z1:z0+54});
    assert.equal(solid.faces.length,6);
    const edges=new Map();
    for(const face of solid.faces) for(let i=0;i<4;i++) {
      assert.ok(face.points[i].every(Number.isFinite));
      const key=[face.points[i].join(','),face.points[(i+1)%4].join(',')].sort().join('|');
      edges.set(key,(edges.get(key)||0)+1);
    }
    assert.equal(edges.size,12);
    assert.ok([...edges.values()].every(count=>count===2));
    assert.ok(solid.faces.find(f=>f.name==='front').points.every(p=>p[2]===Math.max(z0,NEAR_Z)));
  }
});
test('camera sees only the facing exterior wall and cab',()=>{
  const visible=camera=>solidBox(box,camera).faces.filter(f=>f.visible).map(f=>f.name).sort();
  assert.deepEqual(visible({x:0,y:200,z:-24}),['front','left','roof']);
  assert.deepEqual(visible({x:3,y:200,z:-24}),['front','right','roof']);
  assert.deepEqual(visible({x:1.5,y:100,z:-24}),['front']);
});
test('passing car remains closed beyond the old cab cutoff',()=>{
  const solid=solidBox({...box,z0:-15,z1:2});
  assert.equal(solid.nearClipped,false);
  assert.equal(solid.faces.find(f=>f.name==='front').visible,true);
  const clipped=solidBox({...box,z0:-30,z1:5});
  assert.equal(clipped.nearClipped,true);
  assert.equal(clipped.near,NEAR_Z);
  assert.ok(clipped.faces.every(f=>f.points.every(p=>p[2]>=NEAR_Z)));
});
test('far clipping stays closed and invalid or invisible solids are culled',()=>{
  assert.equal(solidBox({...box,z1:300}).far,FAR_Z);
  for(const change of [{z1:-23,z0:-50},{z0:250,z1:300},{top:0},{x1:1},{z0:NaN}])
    assert.equal(solidBox({...box,...change}),null);
});
