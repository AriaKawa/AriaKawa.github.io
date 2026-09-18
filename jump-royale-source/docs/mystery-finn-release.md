# Mystery Box, wallpapers and Finn — September 18, 2026

The loot reel uses five generated brushed-metal rarity cards. Visual filler never repeats an item next to itself, including either side of the fixed winning slot. Prize selection, rarity odds and payment are unchanged. Normal spins last 6,750 ms (previously 5,400 ms); reduced-motion spins remain 180 ms. Free Spins? toggles an explanation above the bottom-right button and dismisses on outside click, Escape or dialog close.

Wallpaper previews take their dimensions from the actual map viewport. The outer rectangle and controls reuse the existing generated forged-metal frame, with centered SVG glyphs. The caption is compact; short landscape screens place the header above the preview to keep arrows unobstructed. The missions tagline is removed.

Classic Finn has a new generated blacksmith design and twelve separately authored poses: two idle poses, anticipation, crouch, jump, fall, land, defeat and four walking poses. Finn · 16-bit is a separately generated detailed 64-pixel sheet, available as a five-gold costume or Covert loot. Existing Finn costumes and saves remain supported. The source sheets were generated on a white matte, imported with that matte removed, downsampled with nearest-neighbor sampling and aligned to a consistent foot baseline. The classic sheet is 32 pixels per frame. Only the new classic and 16-bit looks use these sheets.

Validation: TypeScript; standard collision/bot/finale/costume suites; social economy/odds/missions suite; browser checks across 1440×900, 390×844 and 844×390; every prize with 20 reel permutations; paid HD purchase/equip/reload; free spin duration/winner alignment; help open/toggle/outside dismissal; wallpaper locked state and exact preview size; close glyph centers; lobby jump and match start; production build.

Browser checks: scripts/browser-mystery.mjs and scripts/browser-finn.mjs (hosted Vite at port 5245). Generated images are distributed in assets/menu/loot-rarity and assets/reforged/cosmetics/finn*.png. Existing generated frame.png supplies wallpaper button and panel surfaces.
