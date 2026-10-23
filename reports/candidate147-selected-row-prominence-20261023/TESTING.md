# Testing — Candidate 147

## PASS
- 22 Playwright assertions passed, 0 failed.
- Viewports: 1648×928, 1440×900, 1280×720.
- Checks include selected row placement, 7.5 visible rows, no document overflow, no uncaught page errors, profile move/restore, duplicate IDs, dock geometry, real AMQ metadata display, workspace panel, keyboard navigation, hover motion, search fallback and EMQ filtering.
- Inline JS syntax: 60 blocks checked, 0 syntax errors.

## NOT RUN / BLOCKED
- Direct `file://` navigation: BLOCKED_BY_ADMINISTRATOR.
- Durable localStorage/IndexedDB persistence, real audio, live APIs, full custom-list CRUD and cross-workspace regression: NOT RUN.
- CSS parser validation: NOT RUN in this stage.
- Browser checks use Playwright `page.set_content` plus an in-memory Storage shim; they are not intended-runtime acceptance.

## Visual result
- Horizontal row-left positions are closer to the manually estimated reference.
- Whole-image SSIM/MAE did not improve versus Candidate 145; candidate is not accepted.
