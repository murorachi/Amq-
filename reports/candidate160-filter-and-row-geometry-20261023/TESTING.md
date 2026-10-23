# Testing — Candidate 160

## PASS
- 25 Playwright assertions passed, 0 failed.
- Viewports: 1648×928, 1440×900, 1280×720.
- Checks include 7.5-card visibility, no document overflow, no uncaught page errors, selected row, keyboard navigation, hover movement, search fallback, EMQ filtering, workspace panel, profile move/restore, real AMQ stats and dock geometry.
- Explicit geometry: 8 row top positions max error 2px; search/filter top y=34 and mode row y=67; filter ancestor overflow visibility PASS.
- Static JS: 61 checked, 0 syntax errors; CSS: 2,644 rules parsed, 0 parse errors.

## BLOCKED / NOT RUN
- Direct `file://` navigation: BLOCKED_BY_ADMINISTRATOR.
- Durable localStorage/IndexedDB, scene-background image persistence/backup restore, real audio/live APIs, full custom-list CRUD and cross-workspace regression: NOT RUN.
- Browser checks use `page.set_content` and an in-memory Storage shim; not intended-runtime acceptance.

## Visual result
- Full SSIM increased to 0.308138 from Candidate 145's 0.304511, but MAE is 55.1537 versus Candidate 145's 54.6926. Not accepted.
