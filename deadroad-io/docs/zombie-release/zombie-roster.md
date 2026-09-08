# Zombie roster and baseline waves

The canonical balance source is `server/src/sim/zombieRoster.ts`, imported by both simulations. Territory threat does not change these wave budgets or health yet. Speeds are world units per second; damage is damage on reaching the core. Armor is represented by health, not hidden damage resistance.

| Enemy | HP | Speed | Core damage | Scrap | First wave | Role |
|---|---:|---:|---:|---:|---:|---|
| Husk | 42 | 58 | 8 | 3 | 1 | Weak limping fodder |
| Shambler | 76 | 68 | 18 | 5 | 1 | Standard limper |
| Crawler | 55 | 42 | 12 | 4 | 2 | Slow hand-pulling body |
| Runner | 48 | 120 | 14 | 6 | 3 | Fragile fast pressure |
| Stalker | 110 | 91 | 22 | 8 | 4 | Durable fast walker |
| Gravebreaker | 850 | 34 | 100 | 48 | 5 | Heavy boss |
| Bloater | 190 | 48 | 32 | 12 | 6 | Slow damage sponge |
| Riot Husk | 300 | 46 | 42 | 16 | 7 | Durable armored silhouette |
| Skitter | 90 | 100 | 18 | 8 | 8 | Fast crawler |
| Zombie King | 2200 | 25 | 160 | 120 | 10 | Five fused, overlapping bodies |
| Ravager | 420 | 62 | 50 | 23 | 11 | Late heavy pressure |

Waves use deterministic threat budgets, role unlocks, specialist caps, and a maximum of 64 ordinary bodies. Gravebreaker appears every fifth wave; Zombie King replaces it every tenth. Bosses spend the wave budget. Following waves receive an 18% budget reduction. Spawn spacing gradually decreases from 928ms to a 460ms floor. Intermissions last 14 seconds, or 22 after bosses. Health rises 3.5% per wave to a maximum 2.5x; speed remains fixed. No overlapping waves; all queued and living enemies must clear first.

Each enemy has eight AI-generated textured raster poses, cached in padded frames. Alternating feet, asymmetric limp strides, opposite arm swings, and crawler hand pulls replace whole-image bobbing. Animation phase follows interpolated distance travelled and stops when movement stops. The king sheet depicts five fused torsos and heads with tangled weight-bearing limbs.

Run `npm run dev:client` and open `/zombie-review.html` to review the animated roster. Run `validate:zombie-waves`, `validate:zombie-visuals`, `validate:balance`, and `build` for verification. Numerical checks establish the baseline; extended playtesting across routes is still needed to tune difficulty and the economy. This change is local and has not been published.

Artwork was generated with the built-in image_gen tool. Original transparent PNG sheets are stored in `client/public/assets/generated/zombies/ai-v2/`. The prompt set and source provenance are in `artifacts/ai-zombie-generation.json` and `artifacts/ai-zombie-generation-extra.json`.
