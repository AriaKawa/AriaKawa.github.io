# Moon and expedition polish

Little Moon now continuously attracts the player toward its center. Menu cards do not interrupt that attraction: a player above the name card returns diagonally to the lunar surface without input. Grounded charge/crouch suppresses movement and footsteps. Gravity is 110 world pixels/s², jump launch is 145–255 pixels/s, and full-charge flight lasts 4.6 seconds. Surface geometry is unchanged.

All three expedition characters were redrawn using their identity sheets and the existing Kenji 16-bit sheet as references. Idle and held crouch use single steady poses. A dedicated six-frame walk atlas supplies frames 16–21, with contact, passing and opposite stride poses. The compiler aligns feet, keeps consistent scale, reduces to native 64px pixel art and exports with nearest-neighbor scaling. New asset filenames avoid stale caches.

Built-in image_gen was used. Final prompt set:
- Moon: preserve the exact lunar cap, craters and boundary; replace black space with luminous violet and lavender nebulae, indigo cosmic clouds, tiny stars, subtle pink/cyan highlights and a purple lunar rim. No text, UI or characters.
- Each character: redraw the identity reference as crisp SNES pixel art matching the existing Kenji sheet, limited palette, constant proportions, transparent 4×4 atlas. Open-eyed stable idle, half/deep crouch, ascent, descent, landing, defeat, walks and celebration. Pirate retains red coat, navy/gold tricorn and feather; Cosmo retains white/teal suit, helmet and curled tail; Mochi retains pink gills, cream belly and teal scarf.
- Dedicated walk atlas: six columns and three character rows, right-facing full stride with both legs moving in opposition, contact/passing/lift poses, opposing arm swings, near limb lighter than far limb, constant head/body scale, open eyes, transparent background, no text or grid.

Source art: ../expedition-content/source/{pirate,astro-monkey,axolotl,walk-cycles}.png. Final game assets: forge-climb-royale/assets/menu/wallpapers/moonwalk-nebula.png and assets/reforged/cosmetics/{pirate,astro-monkey,axolotl}-expedition-v2.png.

Validation: client TypeScript check; hosted Vite production build; browser-moon-polish.mjs checks radial return from a UI card, grounded contact and crouch locks in all four quadrants, 4.6-second jump, single-frame idle/crouch and six-frame walks for all three characters, 66 pose frames, desktop/mobile views, and gameplay entry with Mochi. No browser exceptions. Local QA captures are under qa/.

Disk-constrained build used Vite's build API with copyPublicDir:false, then copied the new bundles and four changed art assets to the existing deployed directory. Existing assets were retained.
