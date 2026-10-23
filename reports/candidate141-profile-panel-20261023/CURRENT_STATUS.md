# Current status — Candidate 141 (2026-10-23)

## Change
Moved the existing live `#amqProfileCard` node into the Song Select left rail while that route is active, then restored it to `#amqHomeTopFrame` on return home. The node is moved, not cloned, preserving event handlers and avoiding duplicate IDs. It displays actual AMQ profile data (display name, AMQ learning PP, cumulative answers, historical anime-recognition accuracy), not osu! PP/rank. The existing left-rail width owner is now 28vw/450px.

## Tests
- Browser: 19 PASS, 0 FAIL.
- PASS: profile relocation, actual fields, no duplicate IDs, rail does not overlap catalog.
- PASS: profile returns to original home parent after route exit.
- PASS: transparent placeholder and workspace sidebar.
- PASS: 7.5 row geometry at 1648×928 / 1440×900 / 1280×720, keyboard, hover, search, EMQ filtering and no page errors.
- Static: 63 executable inline scripts, 0 JS syntax errors; 91 CSS blocks parsed, 0 CSS errors.

## Visual evidence
- Screenshots: `candidate141_1648x928.png`, `candidate141_hover.png`, `candidate141_keyboard_selected.png`, `candidate141_1440x900.png`, `candidate141_1280x720.png`.
- Full-frame metrics: SSIM 0.300717, MAE 57.3788, RMSE 80.5378.
- Metrics are descriptive only. This is an honest AMQ profile, not a fabricated osu! ranking panel.

## Limits
- Direct file:// and localhost navigation BLOCKED; durable persistence, live APIs, real audio, full list CRUD and other-workspace regression NOT RUN.
- Central scene image, top metadata and bottom controls remain visibly different. Song Select is NOT ACCEPTED.
- HTML binary not uploaded; current connector provides no verified binary upload path. Text reports/test source are uploaded/read back.