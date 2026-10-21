# Song Select visual comparison evidence

- Evidence status: **GENERATED**
- Visual acceptance: **NOT VERIFIED**
- Reference URL: https://raw.githubusercontent.com/ppy/osu-wiki/ae2c6443a4264e5429ea7bcd2f3503be8a518a50/wiki/Client/Interface/img/song-selection.jpg
- Verified Git blob SHA: `1e927a00a1984a5ba20fa5efec639410f349607a`
- Reference/candidate viewport: 1280 × 720, device scale factor 1
- Candidate: `dist/amq_learning_tool_v82_85_30_workspace_proto26_song_select_06.html`
- Candidate SHA-256: `3b1626b825ca223d6ff18dc5fb0927ed275f3fd58314782bdec4fe1b1919c08a`
- Normalized mean absolute pixel difference (diagnostic): `0.285936`
- Pixels with max-channel difference ≥ 24: 768,947 / 921,600 (83.44%)
- Active app view: `catalog`
- Page errors / console errors: 0 / 0

## Confirmed defects from the same-viewport screenshot

1. **Reserved blank left column:** the workspace sidebar is hidden in the default Song Select state, but the body still applies left padding. Main catalog content begins around x=288, leaving a large empty column and wasting available width.
2. **Default catalog composition:** search and filter controls occupy the top row, followed by AMQ/EMQ/MIX/Singer controls, catalog category tabs, and a five-column card grid. This does not match the Stable reference's main composition.
3. **Structural mismatch:** the pinned reference shows a left ranking/score panel, a large central background region, a right-side song/beatmap list with horizontal cards, and bottom controls. AMQ-specific content may differ by design, but the empty left column, control hierarchy, card geometry, and overall composition remain implementation issues.
4. **No final similarity score:** the pixel metrics are diagnostic only. Do not reinterpret the changed-pixel ratio as a visual similarity percentage.

## Evidence files in the Proto28 Actions artifact

- `osu-stable-song-selection-pinned.jpg`
- `proto26-song-select-matched-viewport.png`
- `proto26-song-select-overlay.png`
- `proto26-song-select-pixel-diff.png`
- `visual-comparison-report.json`

## Reference limitations

The reference screenshot is pinned to official osu!-wiki commit `ae2c6443a4264e5429ea7bcd2f3503be8a518a50` and its Git blob identity was verified. The exact osu!stable client source commit matching release label `20260924.1` remains **NOT VERIFIED**. Do not substitute osu!lazer source. The screenshot establishes visual reference evidence, but does not independently establish the exact client binary/build used for capture.
