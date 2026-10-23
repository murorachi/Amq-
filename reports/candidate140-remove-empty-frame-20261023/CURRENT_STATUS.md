# Current status — Candidate 140 (2026-10-23)

## Change
The empty ranking/workspace frame is transparent while collapsed. It remains as a geometry anchor because the existing workspace runtime positions the sidebar from it. The actual sidebar retains its own styling and controls when opened. No fake leaderboard or player metrics were added.

## Tests
- Browser: 16 PASS, 0 FAIL.
- PASS: collapsed frame has zero border and transparent background.
- PASS: workspace opens with a visible, interactive sidebar over the transparent anchor.
- PASS: list selection, 7.5-row geometry at 1648×928 / 1440×900 / 1280×720, keyboard, hover, search, EMQ filtering and no uncaught page errors.
- Static: 63 executable inline scripts checked, 0 JS syntax errors; 91 style blocks parsed, 0 CSS errors.

## Visual evidence
- Screenshots: `candidate140_1648x928.png`, `candidate140_1440x900.png`, `candidate140_1280x720.png`.
- Full-frame reference metrics: SSIM 0.303629, MAE 57.7430, RMSE 80.9853.
- Versus Candidate 139: 219,456 pixels changed (14.3497%), bbox [0,212,355,895], mean absolute channel delta 0.688444. This removes the visible empty frame; song-list pixels did not change.

## Limitations
- Direct file:// and localhost navigation BLOCKED by `ERR_BLOCKED_BY_ADMINISTRATOR`; durable persistence, live APIs, real audio, full list CRUD and other-workspace regressions NOT RUN.
- Current Song Select song/anime APIs contain no osu! player rank/performance-point fields. The app does have actual learning-dashboard metrics, but these are not osu! rank/pp. Do not fabricate them. Player panel, central scene image, top metadata and bottom controls remain unfinished. Overall Song Select is NOT ACCEPTED.
- HTML binary is not uploaded; the current connector supports text file contents but no verified binary upload path.