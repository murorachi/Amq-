# Next Task

**Priority 1: refine Proto30 Song Select composition to match pinned osu!stable reference. Do not switch to homepage polish.**

## Current verified checkpoint
- Latest branch: `v82.85.30-proto30-song-select-composition-01`
- Proto30 source commit: `3bc5ebb418d435905388c11bb63ba445362848e6`
- Generated candidate/report commit: `a3e6bebf780a5bb82952db87a8dbaae5762ca8fa`
- CI run: https://github.com/murorachi/Amq-/actions/runs/39574095207 — **SUCCESS**
- Candidate 08: `dist/amq_learning_tool_v82_85_30_workspace_proto26_song_select_08.html`
- Candidate SHA-256: `bb56c70202b90c9926eb9299fa863048fb71fe0edc402460ddfda8f0a2f6c3ff`
- Functional/static acceptance passed. Visual acceptance remains **NOT VERIFIED**; diagnostic MAE 0.286490, 78.28% pixels differ by max-channel ≥24.

## Previous verified checkpoint
- Branch: `v82.85.30-proto29-song-select-layout-width-01`
- CI source commit: `d0f89294ca16488453f9afa2225b8ac9d1c5dda5`
- Generated artifact/report commit: `ae0377e5efab163b9501456c371bce5e0074cafc`
- Passing CI: https://github.com/murorachi/Amq-/actions/runs/39571163151
- Candidate: `dist/amq_learning_tool_v82_85_30_workspace_proto26_song_select_07.html`
- SHA-256: `2aad33f00a7553545784d726dd9b89f07ce90ae390596c277452014605d988f8`
- Immutable baseline SHA-256: `5a0f18f47fb059427b385484086c66dd14716a03843fcba37f9eb5fe89a7d66f`

## Next implementation stage
1. Continue only on the isolated Proto30 branch. Do not overwrite candidate 07, candidate 08, or the immutable baseline.
2. Inventory the actual DOM/CSS for the catalog wrapper, search/filter toolbar, card grid, selected-work detail pane, audio dock, and existing song-history API.
3. Record bounding boxes from the pinned 1280×720 osu!-wiki reference and candidate screenshot. Keep AMQ-required content differences separate from layout differences.
4. Map the reference's left information/ranking region, central background/primary focus, right horizontal catalog cards, and bottom controls to AMQ's real data and existing handlers. Do not invent history fields or song statistics.
5. Reuse existing data and event handlers. The current grid may be rehosted or restyled, but do not duplicate catalog or player business logic.
6. Refine candidate 08's three-zone layout using the generated overlay and pixel-diff images. Run static assertions, four workspace interaction tests, 1280×720 and 1440×900 geometry tests, mobile overflow checks, and pinned-reference overlay/diff workflow before naming the next candidate.
7. Expand search edge-case, sort-result, Enter/double-event and real audio-output tests after the layout changes are stable.

## Reference record and current evidence
- Official Wiki commit: `ae2c6443a4264e5429ea7bcd2f3503be8a518a50`.
- Screenshot Git blob SHA: `1e927a00a1984a5ba20fa5efec639410f349607a`.
- Viewport: 1280×720.
- Current diagnostic normalized MAE: 0.303679; 90.49% of pixels have max-channel difference ≥ 24. These are diagnostics, not a similarity score.
- Full-width fix is verified: body padding-left 0 px; search x=38 and catalog x=28 at 1440×900.
- Exact osu!stable client source commit matching Stable `20260924.1`: **NOT VERIFIED**.

## Rollback
Keep candidate 07 and all earlier checkpoints unchanged. If the next composition redesign fails, revert only the new isolated branch to candidate 07. Draft PRs #10/#11 remain unmerged.
