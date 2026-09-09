Building hover highlights now brighten a second copy of the actual camp image, clipped to individually traced building silhouettes. The former colored polygon plates and boxed captions are removed. Labels use locally hosted, OFL-licensed VT323 pixel lettering and appear on hover or keyboard focus (persistently on touch devices). Hit areas support pointer, Enter and Space activation.

Each area opens its own generated closeup with the existing working upgrade or salvage controls alongside it: convoy-bay.png, turret-workshop.png, field-upgrades.png and player-market.png under assets/. The images were generated with built-in imagegen using the original camp as a style reference; exact prompts are in interior-prompts.json. On small screens controls sit below the image.

Validation: TypeScript and Vite production build passed. All four final images inspected and included in the built public assets. Existing saves, upgrade rules and shared loot behavior are unchanged.
