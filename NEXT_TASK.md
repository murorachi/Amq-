# Next Task

**Priority 1: finish Proto34 candidate 11 Song Select density acceptance. Do not switch to Home, Play, or Settings.**

## Current active branch
- `v82.85.30-proto34-song-select-catalog-density-01`
- Latest integration change: `7c7190c2905a105d76f0467dbc2d872cc47e9ec5`
- Candidate output: `dist/amq_learning_tool_v82_85_30_workspace_proto26_song_select_11.html`
- Base is the Proto33 documentation checkpoint; candidate 10 remains immutable.

## Work in this stage
1. Confirm the Proto34 GitHub Actions workflow triggered for the branch.
2. Review static assertions and browser acceptance at 1280×720, 1440×900, 1000×562 and mobile.
3. Specifically inspect the new assertion that at least three real AMQ catalog cards are visible within the internal scroll viewport.
4. Review the matched-viewport screenshot, overlay and pixel-diff report. The pixel metric is diagnostic only, not a similarity score.
5. If browser tests fail, inspect the actual geometry and fix the root cause on Proto34, then rerun. Do not mark a failed test as passed.
6. Confirm CI committed candidate 11 and report files only after all acceptance commands succeed; verify remote file existence and SHA-256.
7. Visual acceptance remains NOT VERIFIED until reference-based differences are actually reviewed and the target is supported by evidence.

## Verified checkpoints
- Candidate 10: `dist/amq_learning_tool_v82_85_30_workspace_proto26_song_select_10.html`, SHA-256 `21a608f1357f020b6e56e8d1dec6735ef2da9bcccb4b34fcf5541c4f535f2421`.
- Immutable Proto25 baseline: SHA-256 `5a0f18f47fb059427b385484086c66dd14716a03843fcba37f9eb5fe89a7d66f`.
- Candidate 09 rollback SHA-256: `37d5055e91688e7604007d052041aa0f846c04c29793fced2312592f282ea01d`.

## Remaining acceptance scope
- Candidate 11 static/browser/visual comparison: PENDING until Actions finishes.
- Exact osu!stable client source commit for Wiki release label `20260924.1`: NOT VERIFIED.
- Real audio output, full search/sort edge cases, Enter/double-event regression, full quiz lifecycle, multiplayer lifecycle, Home/Play/Settings/profile, light mode and backup/restore acceptance: NOT RUN or not fully verified.

## Rollback
- Use candidate 10 or rebuild from immutable Proto25 baseline.
- Never overwrite candidate 09/10 or the immutable baseline. Do not merge PR #10/#11 before visual and functional acceptance.
