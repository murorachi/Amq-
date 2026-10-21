# Song Select visual comparison evidence

- Evidence status: **GENERATED**
- Visual acceptance: **NOT VERIFIED**
- Reference URL: https://raw.githubusercontent.com/ppy/osu-wiki/ae2c6443a4264e5429ea7bcd2f3503be8a518a50/wiki/Client/Interface/img/song-selection.jpg
- Verified Git blob SHA: `1e927a00a1984a5ba20fa5efec639410f349607a`
- Reference/candidate viewport: 1280 × 720, device scale factor 1
- Candidate: `dist/amq_learning_tool_v82_85_30_workspace_proto26_song_select_07.html`
- Candidate SHA-256: `2aad33f00a7553545784d726dd9b89f07ce90ae390596c277452014605d988f8`
- Normalized mean absolute pixel difference (diagnostic): `0.303679`
- Pixels with max-channel difference ≥ 24: 833,933 / 921,600 (90.49%)
- Browser errors: 0 page errors; 0 console errors.

## Geometry acceptance
- At 1440×900, body left padding is 0 px.
- Search input left edge: x=38.
- Catalog grid left edge: x=28.
- Default Song Select now uses the available width; the previous empty 260–288 px left column is fixed.
- Geometry assertions and matched-viewport capture both passed in Proto29 CI.

## Remaining visual gaps from the pinned reference
1. The reference has a left ranking/score panel, central background composition, right-side horizontal song/beatmap cards, and bottom controls. The candidate still presents a top filter bar, AMQ/EMQ/MIX/Singer controls, category tabs, and a multi-column anime catalog grid.
2. Song Select still lacks the reference's overall content hierarchy and visual structure. Required AMQ features must be mapped into the reference's layout rather than treated as a reason to retain the generic grid composition.
3. The bottom dock is a persistent four-workspace navigation, not a replacement for the required playback controls. Existing audio controls and song details need to be placed in the appropriate Song Select regions.
4. The pixel metrics are diagnostics only. The changed-pixel ratio increased after the blank left region was filled; this is not by itself evidence of a worse layout or a similarity percentage.

## Evidence files in the Proto29 Actions artifact
- `osu-stable-song-selection-pinned.jpg`
- `proto26-song-select-matched-viewport.png`
- `proto26-song-select-overlay.png`
- `proto26-song-select-pixel-diff.png`
- `visual-comparison-report.json`

## Reference limitations
The screenshot is pinned to official osu!-wiki commit `ae2c6443a4264e5429ea7bcd2f3503be8a518a50` and its Git blob identity was verified. The exact osu!stable client source commit matching release label `20260924.1` remains **NOT VERIFIED**. Do not substitute osu!lazer source.
