# Live map deployment briefing

The deployment briefing captures the tactical renderer at a camera framing that fits the proposed route and convoy. It includes the real terrain, highways, scenery, and vehicle, then projects the validated route samples into the captured view. The original camera framing is restored after capture. The survey locks movement controls and does not deploy the core.

Reroll Path sits at the map's bottom right. It changes the route seed and highway entry direction/distance, retains obstacle and road clearance checks, and leaves difficulty/rewards unchanged. Up to eight alternatives are checked; if none is clear, the existing route is retained. Confirmation includes the selected variant. Movement invalidates the selection, while ambient pressure changes do not invalidate an open briefing.

New contracts carry a deployment timestamp. The dirt-road texture reveals by traveled distance from the core toward the spawn point over 2.6 seconds, with a moving construction highlight. The validated centerline is unchanged; the effect is visual and completes during the setup shield. Texture updates reuse the existing cached image and stop after completion.

This release also publishes the previous local threat, commander XP, research, and difficulty-based rewards update. See threat-progression.md for its rules.

Validation: production build, progression/server parity tests, route reroll and distance-reveal tests, convoy/scenery/contracts regressions; browser checks of real-map alignment, changed reroll geometry, unchanged rewards, exact confirmation geometry, and partial-to-complete road rollout with no runtime errors.
