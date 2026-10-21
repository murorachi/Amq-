# Current Status

## Latest verified functional checkpoint: Proto33 Song Select visual correction

- Branch: `v82.85.30-proto33-song-select-visual-correction-01`
- Tested source commit: `783a64e9207f1d4f7febbad240b136487d2cdc26`
- Generated artifact/report commit: `bb6aaa5c7ac3a20b46cc2d5320d969b8ea00ec7c`
- GitHub Actions: https://github.com/murorachi/Amq-/actions/runs/39585952303 — **SUCCESS**
- Candidate: `dist/amq_learning_tool_v82_85_30_workspace_proto26_song_select_10.html`
- File size: 8,968,245 bytes
- SHA-256: `21a608f1357f020b6e56e8d1dec6735ef2da9bcccb4b34fcf5541c4f535f2421`
- Static acceptance: PASS
- Playwright browser acceptance: PASS
- Matched-viewport visual evidence generation: PASS
- Browser page errors / console errors: 0 / 0
- Visual acceptance / 90% similarity target: **NOT VERIFIED**

### Verified changes

- Compact Song Select header to keep Settings, Home and scene-background entry points; unrelated theme/database/backup controls are hidden in the default Song Select header and remain available when the existing Settings toggle is opened.
- Repositioned the four-workspace dock to the bottom-left and the existing audio player to the bottom-right at desktop sizes; narrower viewports stack the player above the dock.
- Reduced Song Select control density and ensured at least one catalog card is visible above the bottom player at 1280×720.
- Added browser assertions for header action visibility, player/dock positions, catalog card visibility at 1280×720, no overflow at 1000×562 and mobile drawer layout.
- Retained the real selected-song history panel and all previously passing workspace/mode assertions.

### Visual comparison: evidence generated, acceptance NOT VERIFIED

- Official Wiki commit: `ae2c6443a4264e5429ea7bcd2f3503be8a518a50`.
- Reference image Git blob SHA: `1e927a00a1984a5ba20fa5efec639410f349607a`.
- Matched viewport: 1280×720, device scale factor 1.
- Candidate SHA-256: `21a608f1357f020b6e56e8d1dec6735ef2da9bcccb4b34fcf5541c4f535f2421`.
- Diagnostic normalized MAE: `0.281997`.
- Pixels with max-channel difference ≥ 24: 746,? / 921,600 (81.04%). This is a diagnostic changed-pixel ratio, not a similarity percentage.
- The visual metric is slightly worse than candidate 09; do not describe this as a visual improvement. The structural changes were accepted functionally, but the reference layout still differs substantially.
- Exact osu!stable client source commit matching release label `20260924.1`: **NOT VERIFIED**. The pinned Wiki screenshot's exact capture build is unknown.

### Next work

1. Fix the vertical layout so multiple catalog cards are visible without being overlapped by the bottom player.
2. Investigate why the matched-viewport screenshot shows EMQ work cards while the AMQ source-mode button is selected. Verify the default catalog's actual data and source mode, then add an explicit browser assertion.
3. Continue reference-based correction of left information hierarchy, central visual composition, right catalog density and bottom controls.
4. Add search edge-case and sort-result assertions, Enter/single-activation tests, and real audio-output acceptance.
5. Full quiz lifecycle, multiplayer server lifecycle, Home, Play, Settings, profile/statistics, light mode and backup/restore visual acceptance: NOT RUN or not fully verified.

### Immutable baseline and rollback

- Immutable baseline branch: `v82.85.30-proto25-ui-refactor-stage-24`
- Baseline file: `dist/amq_learning_tool_v82_85_30_workspace_proto25_stage24.html`
- Baseline SHA-256: `5a0f18f47fb059427b385484086c66dd14716a03843fcba37f9eb5fe89a7d66f`
- Previous candidate 09 SHA-256: `37d5055e91688e7604007d052041aa0f846c04c29793fced2312592f282ea01d`
- Current candidate 10 SHA-256: `21a608f1357f020b6e56e8d1dec6735ef2da9bcccb4b34fcf5541c4f535f2421`
- Roll back to candidate 09 or rebuild from the immutable baseline; never overwrite either.
- Draft PRs #10/#11 remain unmerged until visual and functional gates are satisfied.
