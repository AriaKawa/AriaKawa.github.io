# Curved paths, hard fronts and combat zoom

New field contracts favor broad, rounded S bends, preserving scenery and dry-land checks. Seeded approach directions cover distinct bearings. Hard missions (difficulty 4.5+) require two separate approaches, visible from setup and used by alternating spawn orders from wave one. The existing 8–12 pad budget is shared between lanes. Sites without two safe approaches must be relocated. Existing saved contracts keep their geometry until redeployment.

Combat sprite creation, retention and rendering now share the city-view cutoff of 0.055 effective zoom; previous cutoffs were 0.78 for theater combat and 0.52–0.58 elsewhere. Offscreen culling remains active.

Validation: production build; contracts, scenery, convoy, progression, waves and hideout checks; 100 deterministic hard layouts with two separated lanes and 193/200 significantly curved routes; browser confirms exact two-route preview/deployment, both lanes in wave orders, and visible turrets/zombies at effective zoom 0.9, 0.5, 0.15 and 0.06 without runtime errors.
