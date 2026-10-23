# Candidate 163 testing report

## PASS
- CSS parsing: 96 style blocks; 2,637 qualified rules; zero parser errors.
- Playwright interaction/layout suite: 25 assertions passed.
- Screenshot pixel comparison: Candidate 163 is pixel-identical to Candidate 162 for 1648×928, 1440×900, 1280×720, keyboard-selected state, and hover state.
- Existing checks passed for row geometry, 7.5 visible rows, profile transfer/restoration, workspace panel open/close, keyboard selection, hover translation, search fallback, EMQ-only source filtering, and no uncaught page errors.

## FAIL
- Assertion: “raised filter toolbar is not clipped by catalog ancestors.”
- Observed values: `#p32Mount` computed overflow `hidden auto`; `.p32-catalog` computed overflow `hidden`.
- Control run on Candidate 162: the same assertion fails with the same values (25 PASS / 1 FAIL). This is a pre-existing issue, not a regression from Candidate 163. It remains unresolved.

## NOT RUN / BLOCKED
- Real `file://` or permitted localhost navigation: blocked by administrator policy.
- Durable IndexedDB persistence/export/clear/restore: not verified.
- Real scene-image Blob rendering/crop/layering/reload: not verified.
- Live APIs and real audio: not verified.
- Full custom-list CRUD and all four-workspace regression: not covered by this CSS-only test pass.

A passing subset or pixel-identical screenshot does not establish full acceptance.
