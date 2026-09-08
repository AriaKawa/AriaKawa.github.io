# Road-aligned portals

Replaced the frontal portal with a transparent, orthographic overhead stone-and-energy gateway. Continuous orientation uses the first nonzero route segment leaving the spawn; its opening spans the 34-unit generated road. The sprite and wisps share that orientation and remain fixed in world space. Each route owns a separate marker. Materialization fades at full width to preserve placement.

Validated all 360 headings, duplicate points, empty routes, custom widths, production build, and browser deployment/reroll/rollout with no runtime errors. Existing wave and damage performance checks passed.
