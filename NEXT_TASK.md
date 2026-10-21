# Next Task

**Continue Proto32 Song Select work. Do not switch to Home, Play, or Settings.**

## Current source and CI
- Branch: `v82.85.30-proto32-song-select-reference-composition-01`
- Current source commit: `8a209316f4b000b4fba767019fc1b28556e963bc`
- CI run: https://github.com/murorachi/Amq-/actions/runs/39584392554
- Last observed status: IN PROGRESS during dependency installation.
- Candidate 09 path: `dist/amq_learning_tool_v82_85_30_workspace_proto26_song_select_09.html`
- Candidate 09 SHA-256 for the current source: NOT VERIFIED.
- Latest verified artifact remains candidate 08 with SHA-256 `4fcf49520729584e9353f3779551c5f1cd0dc88799aa2ae8cfb69f36c2f4853f`.

## Immediate action
1. Check run 39584392554 to completion and read the full browser report.
2. The prior blocker was horizontal overflow at 1000×562. Browser geometry showed the stage was 718px wide but its three grid tracks were 220px + 240px + 300px, plus gaps. The source now reduces the track minimums at <=1120px; confirm with the new geometry report.
3. If it passes, confirm the visual-comparison step generates the matched screenshot, overlay and pixel-diff report, then verify the generated candidate commit and SHA-256. If it fails, use the captured stage/parent/grid metrics to fix the root cause and rerun.
4. Add/retain tests for selected-song real playback count and wrong-answer history. These passed in the prior candidate 09 browser run, but must pass again on the current source.
5. Review the new 1280×720 screenshot against the pinned official Wiki reference. Do not claim visual similarity from a generated diff or a successful CI run.

## Work already present in Proto32
- Left selected-song information panel, central scene-backed composition, right-side catalog.
- Existing toolbar, filters, tabs, mode buttons and grid moved into the right catalog region.
- Real song metadata, actual playback counts and retained wrong-answer details.
- Responsive catalog controls and viewport-aware stage width.
- Escape closes the selected-work detail pane.
- Browser test has geometry diagnostics for the narrow viewport.

## Reference and visual acceptance
- Official Wiki commit: `ae2c6443a4264e5429ea7bcd2f3503be8a518a50`.
- Screenshot blob SHA: `1e927a00a1984a5ba20fa5efec639410f349607a`.
- Exact osu!stable client source commit for release label `20260924.1`: NOT VERIFIED.
- Latest verified candidate 08's diagnostic normalized MAE was 0.277352 and changed-pixel ratio 91.02%. These are diagnostics, not similarity percentages. Visual acceptance remains NOT VERIFIED.

## Rollback
- Use candidate 08: SHA-256 `4fcf49520729584e9353f3779551c5f1cd0dc88799aa2ae8cfb69f36c2f4853f`.
- Immutable baseline: Proto25 SHA-256 `5a0f18f47fb059427b385484086c66dd14716a03843fcba37f9eb5fe89a7d66f`.
- Never overwrite candidate 08 or the immutable baseline.
- Do not merge PR #10/#11 before visual and functional acceptance.
