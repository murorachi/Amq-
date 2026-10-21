# Song Select visual comparison evidence

- Status: EVIDENCE_GENERATED
- Reference: https://raw.githubusercontent.com/ppy/osu-wiki/ae2c6443a4264e5429ea7bcd2f3503be8a518a50/wiki/Client/Interface/img/song-selection.jpg
- Verified Git blob SHA: 1e927a00a1984a5ba20fa5efec639410f349607a
- Matched viewport: 1280 x 720 at device scale factor 1
- Candidate SHA-256: 2413a516eb6d142222b7ae7c67e3d41a4cf5c8925b4611dfc5a941a22b963705
- Normalized mean absolute pixel difference (diagnostic): 0.275356
- Pixels with max-channel difference >= 24: 772410/921600 (83.81%)
- Active app view: catalog
- Catalog real covers before capture: 7/8
- Loaded visible catalog images before capture: 8/8
- Page errors: 0; console errors: 0

## Evidence files
- osu-stable-song-selection-pinned.jpg
 - proto26-song-select-default-viewport.png
- proto26-song-select-matched-viewport.png (selected-work and selected-song state)
- proto26-song-select-overlay.png
- proto26-song-select-pixel-diff.png
- visual-comparison-report.json

## Interpretation limits
This report does not claim a similarity percentage or a visual pass. The reference is a pinned official osu!-wiki screenshot, but its exact osu!stable capture build is unknown. Review the overlay and pixel-difference image, separating required AMQ content changes from layout, scale, spacing, color, and hierarchy defects.
