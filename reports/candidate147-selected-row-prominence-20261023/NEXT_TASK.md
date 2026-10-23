# Next task

1. Keep Candidate 145 as the last measured baseline; preserve Candidate 146/147 as experiments only.
2. Build a repeatable reference-image geometry audit: locate each song-card boundary at multiple y scanlines and measure row left/right edges and top/bottom edges from the fixed screenshot. Label ambiguous/translucent boundaries as estimates.
3. Compare Candidate 145 and 147 row rectangles at the same viewport; resolve vertical card offsets/gaps before making further changes. Preserve 7.5 visible rows and selected/hover motion.
4. Measure top filter controls and bottom controls against the reference after the song-card geometry is understood.
5. Re-run visual region metrics and interaction tests; reject any candidate whose change does not improve its intended region or breaks regression checks.
6. Direct file-origin, IndexedDB persistence/export/restore, real audio/live APIs, custom-list CRUD and cross-workspace regression remain BLOCKED/NOT RUN until tested in an allowed intended-runtime browser.
7. Do not upload Candidate 147 as a formal release or mark Song Select accepted.
