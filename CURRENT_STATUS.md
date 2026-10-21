# Current Status

## Latest verified development checkpoint: Proto32 Song Select composition (2026-10-21)

- Working branch: `v82.85.30-proto32-song-select-reference-composition-01`
- Tested source commit: `8a209316f4b000b4fba767019fc1b28556e963bc`
- Generated artifact/report commit: `1ae0419` (Build Proto26 candidate and record visual comparison evidence)
- GitHub Actions: https://github.com/murorachi/Amq-/actions/runs/39584392554 — **SUCCESS**
- Candidate: `dist/amq_learning_tool_v82_85_30_workspace_proto26_song_select_09.html`
- File size: 8,961,290 bytes
- SHA-256: `37d5055e91688e7604007d052041aa0f846c04c29793fced2312592f282ea01d`
- Git blob SHA: `6e8eb31653e9069333d44096287eac489c887922`
- Static acceptance: **PASS**
- Playwright browser acceptance: **PASS**
- Matched-viewport visual evidence generation: **PASS**
- Visual acceptance / 90% similarity target: **NOT VERIFIED**
- Browser page errors / console errors: **0 / 0**
- Immutable baseline SHA-256 verification: **PASS**, unchanged.

### Verified Proto32 changes

- Replaced the placeholder-note hero with a scene-backed central composition, selected-work title, left selected-song information panel and right-side catalog.
- Moved existing search, filters, tabs, source-mode controls, catalog header and work grid into the right catalog region.
- Selected-song panel uses the actual song row, playback-count store, quiz-history summary and retained wrong-answer records. Empty/summary-only states are explicitly distinguished.
- Added Escape dismissal for the selected-work detail pane.
- Added viewport-aware stage sizing and narrowed grid track minimums so the sidebar-constrained 1000×562 layout fits without horizontal overflow.
- Existing list, batch, learning and analysis surfaces continue to pass their tested in-place switching checks.
- AMQ/EMQ/MIX/Singer mode activation and EMQ data initialization passed the current browser test.

### Visual comparison: evidence generated, acceptance NOT VERIFIED

- Official Wiki commit: `ae2c6443a4264e5429ea7bcd2f3503be8a518a50`.
- Reference image Git blob SHA: `1e927a00a1984a5ba20fa5efec639410f349607a`.
- Matched viewport: 1280×720, device scale factor 1.
- Candidate SHA-256: `37d5055e91688e7604007d052041aa0f846c04c29793fced2312592f282ea01d`.
- Diagnostic normalized MAE: `0.277068`.
- Pixels with max-channel difference ≥ 24: 742,575 / 921,600 (80.57%).
- The changed-pixel ratio improved from candidate 08's 91.02%, but is **not** a similarity percentage and does not establish the 90% target.
- Exact osu!stable client source commit matching release label `20260924.1`: **NOT VERIFIED**. The pinned Wiki screenshot's exact capture build is unknown.
- The overlay and pixel-diff files remain required for manual design review. Major visual gaps still exist; do not mark the UI as a high-fidelity replica.

### Remaining gates

1. Continue visual correction of Song Select against the pinned reference: hierarchy, top navigation/control placement, left information composition, central scene, right catalog density, bottom dock/player controls.
2. Verify actual sorting result order and search edge cases: partial text, case, leading/trailing whitespace, CJK, special characters, zero results and mode changes.
3. Verify Enter versus pointer activation and prevent duplicate select/play events.
4. Run real audio-output acceptance.
5. Trace whether selected-song last-wrong details can be queried beyond the retained detail history; current UI honestly marks summary-only cases.
6. Full quiz lifecycle, multiplayer server lifecycle, Home, Play, Settings, profile/statistics, light mode and backup/restore visual acceptance: **NOT RUN or not fully verified**.

### Immutable baseline and rollback

- Immutable baseline branch: `v82.85.30-proto25-ui-refactor-stage-24`
- Baseline file: `dist/amq_learning_tool_v82_85_30_workspace_proto25_stage24.html`
- Baseline source commit: `3aea33e7137b7e3e3105c76ed896a515a335c2a3`
- Baseline SHA-256: `5a0f18f47fb059427b385484086c66dd14716a03843fcba37f9eb5fe89a7d66f`
- Previous candidate 08 SHA-256: `4fcf49520729584e9353f3779551c5f1cd0dc88799aa2ae8cfb69f36c2f4853f`
- Current candidate 09 SHA-256: `37d5055e91688e7604007d052041aa0f846c04c29793fced2312592f282ea01d`
- Roll back to candidate 08 or rebuild from the immutable baseline; do not overwrite either.
- Draft PRs #10/#11 remain unmerged until visual and functional gates are satisfied.

## Next task

Continue Song Select visual correction from candidate 09 on this isolated branch. Keep candidate 09 immutable, inspect the generated overlay/difference evidence, correct the largest unambiguous layout mismatches, then rerun static, browser, geometry, visual-evidence and applicable regression tests.
