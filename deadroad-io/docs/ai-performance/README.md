# 100 AI commander performance

The browser's AI convoy test now runs in a dedicated module worker. The human
simulation and rendering stay on the main thread. AI movement, collisions,
pathfinding, combat, waves and economy retain the existing 50 ms simulation
cadence independently of snapshot requests. Off-screen commanders keep playing.

Only one snapshot request is allowed in flight. Distant commanders retain their
player, base and operation markers; lots, routes, towers and zombies are sent
only for battles intersecting the camera's padded world-space bounds at base or
local zoom. Bounds include routes and actors, so a visible approach can load
before its core enters view. Redeployment reference checks reject snapshots in
an obsolete coordinate system. Clear generations reject delayed worker replies.

Zombie sprites and interpolation records are created only near the visible
camera at combat zoom and released when leaving it. Culling does not create death
effects. Collision sweeps reuse one obstacle query across their binary search.
Reconnecting disposes the previous simulation timers and worker.

The 100 AI button fills the test population to 100 (not 100 additional bots).
Watch visits active commanders; Clear removes the test population. Reload starts
with zero. Worker startup failures are reported to the user.

Validation: production TypeScript/build; scenery collision and routing tests;
100-commanders/300-simulated-second gameplay regression; camera interest,
overview, remapping, transport backpressure, stale clear reply and restart tests.
The initial 100-AI baseline consumed 157049 ms for 300 simulated seconds with
full snapshots. This is CPU work, not a browser FPS measurement.

Local browser at 1280x720: zero AI 60.2 FPS / 16.7 ms p95. With 100 AI, samples
were 62.7, 65.6 and 78.2 FPS, with p95 16.7, 16.7 and 14.2 ms; worker samples
were 8.7, 4.4 and 3.9 ms. Watching a battle loaded three visible zombie sprites;
zoom-out and Clear worked, with no observed browser errors. These samples are
specific to this machine and are not a guarantee for every device. A four-bot
interest fixture reduced serialized data from 58527 to 6282 bytes while distant.

This release optimizes the existing browser AI test. The static site's bots are
not connected MMO players; server networking and large concurrent-player load
still need separate capacity testing.

Commands: `npm run build`, `npm run validate:scenery`,
`node --import tsx scripts/validate-ai-convoys.ts --100 --scenery`, and
`node --import tsx scripts/validate-ai-interest.ts`.
