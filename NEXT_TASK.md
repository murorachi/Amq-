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
- Proto26.8 keeps the four workspace modes inside Song Select. Existing list, learning-plan and dashboard panels are reused; batch mode retains the catalog and quick tools.
- GitHub Actions run #39563090398: PASS. Static assertions and Playwright Chromium acceptance passed.
- Candidate: `dist/amq_learning_tool_v82_85_30_workspace_proto26_song_select_06.html`
- Size: 8,942,305 bytes; SHA-256: `abaf342050f0d73c0450544114b124e1f95be9cb109956f25189532e770e52ca`.
- Remote artifact SHA-256 and Git blob SHA were verified against the downloaded CI artifact.
- PR #10 remains draft/unmerged. The immutable Proto25 baseline is unchanged.

## Next actions
1. Compare Song Select against the pinned official osu!stable screenshot at a matching viewport. Record bounding boxes and overlay/difference evidence; do not claim a similarity percentage without measurement.
2. Test search edge cases (partial text, case, whitespace, CJK, special characters, zero results), actual sorting/filtering and mode switching.
3. Verify selected-song Enter behavior, duplicate activation and real audio output.
4. Trace and test the data-changing list/batch actions with confirmations and rollback-safe assertions.
5. Confirm the exact Stable client source Commit matching release `20260924.1`; remains NOT VERIFIED. Do not substitute osu!lazer source.
6. Only after Song Select gates pass, continue homepage, Play and Settings visual acceptance.


## Acceptance gates
- Static checks, browser interaction tests, visual comparison, audio output, quiz lifecycle, and multiplayer lifecycle must be reported separately.
- No final UI completion claim until all requested screens and necessary regressions have evidence.
