# Next task

1. Preserve Candidate 139 and Candidate 138 unchanged.
2. Inspect actual player/ranking data sources and the existing learning dashboard. Build the left panel only from genuine fields; do not invent osu! performance points or rank.
3. Trace the scene-background selection/fallback. Existing background manager uses IndexedDB, but test storage is empty; never use the reference screenshot or fake cover art as a substitute.
4. Measure top metadata and bottom controls, then fix one layout owner at a time. Audit existing pseudo-frame and CSS conflicts before further changes.
5. Keep full acceptance blocked until direct file-origin, durable persistence, real audio and feature regressions can run in an unrestricted browser.