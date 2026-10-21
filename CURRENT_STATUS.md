# Current Status

## Latest verified development checkpoint: Proto31 Song Select composition and scene-style fix (2026-10-21)

- Working branch: `v82.85.30-proto31-scene-background-integration-01`
- Tested source commit: `a8bec92c8549d6fcc2cf13ffc0401c150ce247ed`
- Generated artifact/report commit: `6eda007f92417c8bc3614d8451ae0379e3943d4b`
- GitHub Actions: https://github.com/murorachi/Amq-/actions/runs/39581069788 — **SUCCESS**
- Candidate: `dist/amq_learning_tool_v82_85_30_workspace_proto26_song_select_08.html`
- File size: 8,952,996 bytes
- SHA-256: `4fcf49520729584e9353f3779551c5f1cd0dc88799aa2ae8cfb69f36c2f4853f`
- Git blob SHA: `34e3f50af4d3224fd56b5237e202bc5bb3904958`
- Static acceptance: **PASS**
- Playwright browser acceptance: **PASS**
- Matched-viewport visual evidence generation: **PASS**
- Visual acceptance / 90% similarity target: **NOT VERIFIED**
- Browser page errors / console errors: **0 / 0**
- Immutable baseline SHA-256 verification: **PASS**, unchanged.

### Verified changes

- Fixed the Proto30 stylesheet attachment bug: the Song Select composition stylesheet is now appended as `style30`, rather than accidentally re-appending the unrelated Proto26 stylesheet.
- Verified fallback feature-stage background when no scene background is active.
- Verified the configured Catalog scene state changes the feature-stage computed background and backdrop filter.
- Added Escape dismissal for the desktop selected-work detail pane so the catalog controls remain reachable.
- Updated browser and visual-geometry assertions to test the active three-zone layout rather than the obsolete pre-composition full-width search position.
- Browser acceptance confirms the four workspace buttons, existing list/batch/learning/analysis surfaces, EMQ data initialization, AMQ/EMQ/MIX/Singer mode switching, selected-work detail pane, Escape dismissal, responsive layout, and zero browser errors.
- Generated a uniquely named standalone HTML candidate. The immutable baseline and earlier candidates remain unchanged.

### Visual comparison: evidence generated, acceptance NOT VERIFIED

- Official osu! Stable reference label: `20260924.1`; this label is not a source-control commit.
- Official Wiki commit: `ae2c6443a4264e5429ea7bcd2f3503be8a518a50`.
- Reference image: `wiki/Client/Interface/img/song-selection.jpg`.
- Reference image Git blob SHA: `1e927a00a1984a5ba20fa5efec639410f349607a`.
- Matched viewport: 1280×720, device scale factor 1.
- Diagnostic normalized MAE: `0.277352`.
- Pixels with max-channel difference ≥ 24: 838,829 / 921,600 (91.02%). This is a diagnostic changed-pixel ratio, **not** a similarity score.
- Exact osu!stable client source commit matching release `20260924.1`: **NOT VERIFIED**. Do not substitute osu!lazer source.
- The screenshot evidence is traceable to the official Wiki commit, but its exact capture build is unknown.
- The current candidate still requires substantial visual correction against the reference. Evidence generation and functional tests do not constitute visual approval.

### Remaining gates

1. Rework the composition against the pinned Stable reference: current AMQ three-zone layout is a useful integration checkpoint, not a claim of high-fidelity replication.
2. Replace remaining generic catalog composition with the reference's visual hierarchy and appropriate horizontal song/work cards while retaining AMQ-required data.
3. Trace and assert real selected-song play-count and last-wrong-answer fields; use empty states when the history schema lacks a value.
4. Add search edge-case tests for partial text, case, whitespace, CJK, special characters, zero results, and mode changes.
5. Add actual sort-result assertions and Enter/single-activation regression tests.
6. Run real audio-output acceptance.
7. Full quiz-answer lifecycle and multiplayer server lifecycle: **NOT RUN**.
8. Home, Play, Settings, profile/statistics visual acceptance: **NOT RUN**.

### Immutable baseline and rollback

- Immutable baseline branch: `v82.85.30-proto25-ui-refactor-stage-24`
- Baseline file: `dist/amq_learning_tool_v82_85_30_workspace_proto25_stage24.html`
- Baseline source commit: `3aea33e7137b7e3e3105c76ed896a515a335c2a3`
- Baseline SHA-256: `5a0f18f47fb059427b385484086c66dd14716a03843fcba37f9eb5fe89a7d66f`
- Previous verified candidate 07 SHA-256: `2aad33f00a7553545784d726dd9b89f07ce90ae390596c277452014605d988f8`
- Current candidate 08 SHA-256: `4fcf49520729584e9353f3779551c5f1cd0dc88799aa2ae8cfb69f36c2f4853f`
- If this stage needs rollback, use candidate 07 or rebuild from the immutable Proto25 baseline. Do not overwrite either.
- Draft PRs #10/#11 remain unmerged; do not merge until visual and functional gates are satisfied.

## Next task

Continue with Song Select visual composition, not homepage polish. Start from candidate 08 on the current isolated branch, keep candidate 08 immutable, map existing data/handlers into the pinned Stable hierarchy, then run static, browser, geometry, visual-evidence, and applicable regression tests.
