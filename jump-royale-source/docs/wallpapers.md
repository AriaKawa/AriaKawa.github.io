# Lobby wallpapers

Generated with the built-in imagegen tool on 2026-09-16. The original Forge remains the only equipped wallpaper. Starlight and Moonveil are locked, animated previews; closing the selector restores the Forge. No purchase or unlock rule is implied.

Published assets (also restored into ignored `client/public` by `npm run assets`):

- `../../forge-climb-royale/assets/menu/wallpapers/starlight.png`
- `../../forge-climb-royale/assets/menu/wallpapers/moonveil.png`

The generated images place their actual walkable surfaces at approximately 58.5% of image height. Preview collision and character placement use that measured height, instead of the requested prompt coordinate. The Forge retains its existing pedestal. Starlight uses the existing magical-girl character rig for an occasional flight; Moonveil uses gently pulsing cyan lights. Reduced-motion preferences disable both effects.

## Starlight prompt

Use case: stylized-concept. Create a finished 1536x1024 pixel-art game lobby wallpaper for Jump Royale, called Starlight. Inspired by a magical girl fantasy map: luminous pink moon, lavender night sky, pink cherry blossoms, distant golden-lit floating fairytale castles and graceful bridges above violet clouds. No text, no UI, no characters (a character will be animated separately). Crisp detailed pixel art like a richly illustrated 2D game. Composition is vital: wide landscape; a large flat-topped pale marble and gold magical pedestal occupies x=18% to 54% of the entire image, with its perfectly horizontal walkable top at precisely y=69.5% of image height; pedestal extends to the bottom edge. Keep space above the pedestal for the player's sprite. The rightmost 40% remains relatively quiet for UI. Pedestal akin to the original game's stone starting platform, reimagined in pearl, gold filigree and pink crystal. Full bleed, no frame, no watermark.

## Moonveil prompt

Use case: stylized-concept. Create a finished 1536x1024 pixel-art game lobby wallpaper for Jump Royale called Moonveil. Moonveil Forest: ancient dark blue enchanted forest, giant twisting trees, luminous blue moon through canopy, deep layers of indigo trees and mist, tiny cyan mushrooms. Blue wisps will be animated separately, leave space in the forest for them. No text, no UI, no characters. Rich detailed crisp pixel art like a beautifully illustrated dark fantasy 2D game. A large broad flat topped tree stump starting platform in foreground occupies left/middle image x=10% to 54%; the top surface is at y=69.5% of the image height; its tall textured trunk and roots extend to bottom edge. The walkable top is mostly horizontal, a few visible rings with subtle cyan rune glow. Room above stump for a player sprite. Rightmost 40% should be quiet blue atmospheric forest for UI. Full bleed, no frame, no watermark.

## Verification

Browser checks cover Scores outside-click dismissal, both locked map slots and disabled Start, enabled Start on available maps, locked wallpaper previews, Escape restoring the Forge without opening Settings, portrait/landscape layout, starting an actual hosted practice match, and all 23 other players at 0.25 opacity with the local player at 1. Type checking and the production build also pass.
