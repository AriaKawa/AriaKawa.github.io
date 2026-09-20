# Mochi Rose / approved classic redesign

Selected concept 1 with a fine rose-plum outline. Built-in image generation authored the poses; `scripts/compile-axolotl.cjs` packages them with binary transparency, nearest-neighbor pixels, a common torso anchor, and a 232px foot baseline inside each 256px cell.

The runtime sheet is `forge-climb-royale/assets/reforged/cosmetics/axolotl-classic-v3.png`: 1024 × 1536, four columns, 22 authored frames and two unused transparent cells. All gameplay uses the existing character ID and physics size. The versioned filename avoids old cached art.

Runtime animations: idle/blink, charge start, held crouch, ascent, descent, landing recovery, dazed defeat, six-frame alternating walk/run, and celebration. Frames 1 and 8–11 remain alternate poses in the source sheet; the runtime walk uses 16–21. Idle holds the same body pose during blinks rather than resizing the character.

Open `preview.html` to compare the animated GIFs. `prompt.md` records the generation prompts; generated PNGs preserve the authoring sources. `frames.json` records the packing bounds and preview sequences.

Validation: client TypeScript and hosted production build, 22 nonempty/unclipped transparent frames, stable foot baselines, all nine runtime animations, unchanged pirate/monkey animation mappings, keyboard-driven lobby movement/charge/jump/fall/landing, wardrobe preview, and match start. Browser QA screenshots and machine-readable results are under ignored `qa/`.
