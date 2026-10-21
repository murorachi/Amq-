# Next Task

**Priority 1: fix the remaining Song Select layout defect. Do not switch to homepage polish.**

## Current verified checkpoint
- Branch: `v82.85.30-proto28-song-select-default-state-fix-01`
- CI source commit: `52e1677ae3f6385fec577dce3609ee7511cc73c4`
- Generated artifact/report commit: `fbf48765d07401e8b87494eec7c3c84015db7867`
- Passing CI: https://github.com/murorachi/Amq-/actions/runs/39570523908
- Candidate: `dist/amq_learning_tool_v82_85_30_workspace_proto26_song_select_06.html`
- Candidate SHA-256: `3b1626b825ca223d6ff18dc5fb0927ed275f3fd58314782bdec4fe1b1919c08a`
- Immutable Proto25 baseline SHA-256: `5a0f18f47fb059427b385484086c66dd14716a03843fcba37f9eb5fe89a7d66f`

## Next implementation step
1. Remove the body left padding reserved for the workspace sidebar when no workspace mode is selected; preserve the bottom dock and full-width catalog.
2. Keep the sidebar hidden in the default Song Select state, then restore it only after selecting one of the four workspace modes.
3. Give the next candidate a new filename instead of overwriting candidate 06.
4. Add browser assertions for the body/content bounding boxes at 1280×720 and 1440×900, and assert the catalog uses the available width.
5. Re-run static tests, all four workspace interaction cases, mobile overflow checks, and the pinned-reference screenshot/diff generation.
6. Inspect the new overlay/diff. Treat the remaining structural difference from osu!stable as an implementation gap, not as an acceptable score.
7. Then expand search/sort/keyboard/audio acceptance. Keep real audio output, full quiz lifecycle, multiplayer lifecycle, and all other screens separately marked NOT RUN until executed.

## Reference and visual evidence
- Official Wiki commit: `ae2c6443a4264e5429ea7bcd2f3503be8a518a50`.
- Screenshot Git blob SHA: `1e927a00a1984a5ba20fa5efec639410f349607a`.
- Reference dimensions: 1280×720.
- Current diagnostic normalized MAE: 0.285936; 83.44% of pixels have max-channel difference ≥ 24. These are diagnostic metrics, not a similarity percentage.
- Exact osu!stable client source commit matching Stable `20260924.1`: NOT VERIFIED.
- Current comparison report: `engineering/proto26-song-select/VISUAL_COMPARISON_REPORT.md`.

## Rollback
Keep candidate 06 and the immutable Proto25 baseline unchanged. If the next layout adjustment fails, revert only the isolated new branch to candidate 06. Draft PRs #10/#11 remain unmerged.
