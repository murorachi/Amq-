# Candidate 81 Test Report

## Static checks
- Executable inline JavaScript blocks checked with `node --check`: 53; failures: 0. Two embedded non-JavaScript payload blocks were skipped.
- CSS blocks parsed with tinycss2: 78; parser errors: 0.
- File size: 9,124,294 bytes. SHA-256: `3383f89de5d6c437f1046e61ab9bfe856eec37bc2ca8c72bfa52a2f6328a00ff`.

## Browser interaction checks
- 10/10 assertions passed in Chromium via Playwright `page.set_content`: panel runtime, list actions, existing watchlist portal, route unchanged, Escape closes panel, original DOM restored, catalog/batch panel opens, apply target not automatically activated, catalog nodes restore, panel within a 390px viewport.
- Two browser page errors occurred because `page.set_content` creates an opaque origin and localStorage access is denied. Normal-origin storage persistence is not verified. Direct localhost navigation was blocked by the execution environment.
- These are interaction smoke tests, not exhaustive tests of every control, persistent mutations, audio, cover loading, or pixel parity with osu!stable.

## Not run
- All 28 actions individually and all underlying mutations.
- Normal-origin storage/audio/cover checks.
- Full screenshot pixel-diff against osu!stable.
