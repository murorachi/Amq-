# Next Task

**Priority 1: continue Song Select visual correction. Do not switch to Home, Play, or Settings.**

## Latest verified functional checkpoint
- Branch: `v82.85.30-proto33-song-select-visual-correction-01`
- Tested source commit: `783a64e9207f1d4f7febbad240b136487d2cdc26`
- Generated artifact/report commit: `bb6aaa5c7ac3a20b46cc2d5320d969b8ea00ec7c`
- Passing CI: https://github.com/murorachi/Amq-/actions/runs/39585952303
- Candidate: `dist/amq_learning_tool_v82_85_30_workspace_proto26_song_select_10.html`
- Size: 8,968,245 bytes
- SHA-256: `21a608f1357f020b6e56e8d1dec6735ef2da9bcccb4b34fcf5541c4f535f2421`
- Immutable baseline SHA-256: `5a0f18f47fb059427b385484086c66dd14716a03843fcba37f9eb5fe89a7d66f`

## Immediate next stage
1. Keep candidate 10 immutable and create an isolated branch for candidate 11.
2. Inspect the visual-comparison screenshot: the right catalog still begins too low and is partly covered by the bottom player. Constrain the Song Select stage and its panels to a viewport-derived height; let the catalog grid scroll internally; compact filters and tabs so at least three horizontal cards are visible at 1280×720.
3. Investigate the screenshot's mode/data mismatch: the AMQ source button is selected, but the captured cards are labelled as EMQ works. Add an assertion for actual AMQ card data at initial catalog entry, wait for the real data render in visual_compare, and correct initialization if the mismatch reproduces.
4. Review available real cover-image fields. Reuse actual existing cover URLs/data when present; do not invent cover URLs or pretend a music-note placeholder is a cover.
5. Recheck the bottom player and four-workspace dock alignment after constraining the stage. Keep the existing player and workspace handlers.
6. Add search edge cases, actual sort-result assertions, Enter/single-activation regression tests, and real audio-output acceptance.
7. Generate a uniquely named standalone HTML and run static, browser, 1280×720, 1440×900, 1000×562, mobile, visual-overlay and relevant regression tests.
8. Visual acceptance remains NOT VERIFIED until actual reference-based corrections support review. Do not treat a passing CI run or pixel-difference metric as a similarity percentage.

## Reference record
- Official Wiki commit: `ae2c6443a4264e5429ea7bcd2f3503be8a518a50`.
- Screenshot Git blob SHA: `1e927a00a1984a5ba20fa5efec639410f349607a`.
- Candidate 10 matched viewport: 1280×720, device scale factor 1.
- Diagnostic normalized MAE: 0.281997.
- Changed-pixel ratio at max-channel difference ≥24: 81.04%. Diagnostic only, not a similarity score.
- Exact Stable client source commit for release label `20260924.1`: **NOT VERIFIED**.

## Tests and remaining scope
- Static acceptance: PASS.
- Playwright browser acceptance: PASS for workspace switching, scene background fallback/configured state, real song title/play-count/history state, Escape detail dismissal, compact header actions, player/dock layout, first catalog card visible at 1280×720, no overflow at 1000×562 and mobile drawer/no overflow.
- Visual evidence generation: PASS; visual acceptance: NOT VERIFIED.
- Real audio output, full search/sort edge cases, Enter/double-event regression, complete quiz lifecycle, multiplayer lifecycle, Home/Play/Settings/profile visual acceptance: NOT RUN or not fully verified.

## Rollback
- Previous candidate 09 SHA-256: `37d5055e91688e7604007d052041aa0f846c04c29793fced2312592f282ea01d`.
- Current candidate 10 SHA-256: `21a608f1357f020b6e56e8d1dec6735ef2da9bcccb4b34fcf5541c4f535f2421`.
- Immutable Proto25 baseline SHA-256: `5a0f18f47fb059427b385484086c66dd14716a03843fcba37f9eb5fe89a7d66f`.
- Do not overwrite candidate 09/10 or the immutable baseline. Do not merge PR #10/#11 before visual and functional acceptance.
