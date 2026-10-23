# Testing — Candidate 161

## PASS
- 26 Playwright assertions passed, 0 failed.
- Viewports: 1648×928, 1440×900, 1280×720.
- Checks include 7.5-card visibility, no document overflow, selected row, keyboard navigation, hover motion, search fallback, EMQ filtering, workspace panel, profile move/restore, real AMQ stats, filter visibility, dock geometry and bottom player region.
- Bottom geometry at 1648×928: fallback x=762.9, y=839, 90×60; metadata x=850.2, y=841.5, 295×66; progress x=905.2, y=908, 240×12.
- Static JS: 61 checked, 0 syntax errors; CSS: 2,648 rules parsed, 0 parse errors.

## BLOCKED / NOT RUN
- Direct `file://` navigation: BLOCKED_BY_ADMINISTRATOR.
- Durable localStorage/IndexedDB, scene-background preview/apply/reload/clear/export/restore, real audio/live APIs, full custom-list CRUD and cross-workspace regression: NOT RUN.
- Browser checks use Playwright `page.set_content` and in-memory Storage; not intended-runtime acceptance.

## Visual result
- Full SSIM 0.311279, MAE 54.6844. Bottom SSIM 0.213940, MAE 57.5509. Both improved versus Candidate 145, but the interface remains unaccepted.
