# Current status — Candidate 142 (2026-10-23)

## Change
Reduced the existing Song Select player dock from 108px to 76px. Fixed the earlier `candidate103-songselect-layout-owner` runtime that reapplied 108px on body-class changes, and aligned the later player-layout owner. Playback-mode wrap changed from 62px to 50px and progress row from 8px to 6px. Catalog's 108px bottom reserve remains unchanged to preserve 7.5 visible rows. No data or playback behavior was intentionally changed.

## Tests
- Playwright interaction/layout checks: 21 PASS, 0 FAIL.
- Viewports: 1648×928, 1440×900, 1280×720.
- Verified: 7.5 rows, selected row, keyboard, hover, search fallback, EMQ source filtering, profile relocation/restoration, workspace panel, 76px dock, metadata placement, no uncaught page errors.
- Static JS: 63 executable inline scripts checked, 0 syntax errors; 2 non-JS inline blocks skipped.
- CSS: 91 style blocks parsed, 0 parse errors.
- Full-frame reference metrics: SSIM 0.297241, MAE 57.5168, RMSE 80.3344. Diagnostic only; overall similarity remains poor.

## Limits
Direct file:// and localhost navigation are BLOCKED_BY_ADMINISTRATOR. Durable persistence, live APIs, real audio, full custom-list CRUD and cross-workspace regression are NOT RUN. Test harness uses page.set_content and an in-memory Storage shim. No saved custom scene image was present, so no fake art/background was added.

Song Select remains NOT ACCEPTED. The GitHub connector does not provide a verified binary HTML upload path; this checkpoint contains text reports only.
