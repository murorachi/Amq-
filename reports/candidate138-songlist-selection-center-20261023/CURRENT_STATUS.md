# Current status — Candidate 138 (2026-10-23)

## Change
When no prior valid selection exists on first Song Select render, select the fourth actual song row (index 3) so the selected row starts in the central visual band. If a previous selection becomes invalid after search/source/mode changes, fall back to the first filtered result. No fake song records or background assets were introduced.

## Browser tests
- PASS: 14 assertions, FAIL: 0.
- PASS: selected row index 3 at 1648×928, 1440×900, 1280×720.
- PASS: ~7.5 rows visible at all three viewports, with no document overflow.
- PASS: ArrowUp/ArrowDown, hover -3px, search fallback, EMQ filtering, no uncaught page errors.
- Static PASS: 63 executable inline scripts checked, 0 JavaScript syntax errors; 91 style blocks parsed, 0 CSS parse errors.

## Visual evidence
- Screenshots: `candidate138_1648x928.png`, `candidate138_1440x900.png`, `candidate138_1280x720.png`.
- Reference resized from 2555×1438 to 1648×928 using Lanczos.
- Full-frame metrics: SSIM 0.297471, MAE 58.4158, RMSE 81.8877.
- Metrics are descriptive, not a pass threshold; scene imagery, player data, and content differ from the reference.

## Limitations
- Rendering used system Chromium + Playwright `page.set_content` with a test-only in-memory Storage shim. Direct `file://` and localhost navigation are BLOCKED by `ERR_BLOCKED_BY_ADMINISTRATOR`.
- Durable localStorage/IndexedDB reload, live APIs, real audio, full custom-list CRUD and other-workspace regression are NOT RUN.
- Overall Song Select visual acceptance remains NOT ACCEPTED. Player/ranking panel, scene background, top info and bottom controls remain visibly different.
- The HTML binary is not uploaded; available GitHub connector supports text file contents, but no verified binary upload path is available.