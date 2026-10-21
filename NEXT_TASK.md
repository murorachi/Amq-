# Next Task

**Priority 1: finish Song Select as one integrated work area. Do not switch to homepage polish yet.**

## Current checkpoint
- Baseline branch: `v82.85.30-proto25-ui-refactor-stage-24`
- Immutable baseline HTML SHA-256: `5a0f18f47fb059427b385484086c66dd14716a03843fcba37f9eb5fe89a7d66f`
- Working branch: `v82.85.30-proto26-song-select-integration-01`
- Draft PR #10: https://github.com/murorachi/Amq-/pull/10
- Latest candidate: `dist/amq_learning_tool_v82_85_30_workspace_proto26_song_select_05.html`
- Candidate SHA-256: `07998d6bcb76dc09e0f7c92e266f98581d60411f09e93220c1eb57e0e4d4a532`
- Passing CI: https://github.com/murorachi/Amq-/actions/runs/39557544284 (static + Playwright browser acceptance).
- Tested source commit: `d8751a5b0fc90cb786ad4eacea591fbbdad4aef1`; generated artifact/report commit starts `a749b47`.
- Reference audit: `engineering/proto26-song-select/OSU_STABLE_REFERENCE_AUDIT.md`, commit `615ef8b92452009285845bf96a5609d0c8216784`.

## Latest verified implementation
- Proto26.7 routes dock selection to `watchlist`, `catalog`, `learningPlan`, and `dashboard` through `window.__aniNavigateApp`.
- Static acceptance PASS; Playwright browser acceptance PASS. Browser assertions include each workspace's active route and visible primary content surface, actual EMQ work records/detail pane, AMQ/MIX/Singer mode switching, no uncaught browser errors, and desktop/mobile overflow/drawer checks.
- Chromium installation emitted transient DNS errors, but the browser acceptance subsequently ran and passed.
- Visual screenshot comparison against osu!stable: NOT RUN. Full in-place action-level integration: INCOMPLETE. Keep PR #10 draft and unmerged.

## Next actions
1. Inspect existing workspace sidebar/dock handlers and identify the actual destination DOM/functions for list management, batch processing, learning center and analysis.
2. Build a real mapping table: old entry, handler, data source, destination DOM, Song Select placement, regression test, unknowns.
3. Integrate the existing workspace content/actions into the Song Select main content area. Preserve handlers/data and audio state. No fake controls, duplicated business logic, or speculative DOM selectors.
4. Extend browser acceptance so each workspace selection asserts that the main content region changes and its existing core actions remain operable; current test only verifies sidebar/dock visibility and workspace title activation.
5. Obtain the pinned official Song Select screenshot and the accepted candidate screenshot at matching 1440x900. Record bounding boxes and create overlay/difference evidence. Exact Stable source commit remains NOT VERIFIED; do not use lazer source as a substitute.
6. Generate the next unique standalone HTML version only after scoped tests pass; keep all prior candidates unchanged and record SHA-256 + remote existence.
7. Keep PR #10 draft/unmerged until workspace integration and visual comparison pass.

## Acceptance gates
- Static checks, browser interaction tests, visual comparison, audio output, quiz lifecycle, and multiplayer lifecycle must be reported separately.
- No final UI completion claim until all requested screens and necessary regressions have evidence.
