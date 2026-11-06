import { LocalSimulation } from './LocalSimulation';
import { SceneryWorld } from '../game/SceneryWorld';
import type { AiRequest, AiResponse } from './AiSimulationProtocol';
import type { Vec2 } from '../game/types';

const simulation = new LocalSimulation('AI host', () => {}, () => {}, true);
let lastStepMs = 0;
// Simulation cadence is independent of rendering and snapshot request latency.
setInterval(() => { const start = performance.now(); simulation.stepAi(); lastStepMs = performance.now() - start; }, 50);
function inside(p: Vec2, polygon: Vec2[]): boolean {
  let hit = false;
  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
    const a = polygon[i], b = polygon[j];
    if ((a.y > p.y) !== (b.y > p.y) && p.x < (b.x - a.x) * (p.y - a.y) / (b.y - a.y) + a.x) hit = !hit;
  }
  return hit;
}
self.onmessage = ({ data }: MessageEvent<AiRequest>) => {
  if (data.type === 'clear') { simulation.clearAiConvoys(); return; }
  if (data.type === 'scenery') {
    const { roads, sites, roadWidths, land } = data.data;
    simulation.setScenery(new SceneryWorld(roads, sites, p => land.some(polygon => inside(p, polygon)), roadWidths), p => p, p => p, 1);
    return;
  }
  const start = performance.now();
  for (let i = 0; i < data.add; i++) simulation.addAiConvoy();
  const frame = simulation.advanceAiFrame(data.reference, data.viewport, false);
  const response: AiResponse = { generation: data.generation, reference: data.reference, frame, elapsedMs: lastStepMs + performance.now() - start };
  self.postMessage(response);
};
