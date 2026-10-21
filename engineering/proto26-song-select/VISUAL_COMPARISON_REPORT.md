# Song Select visual comparison evidence

- Status: EVIDENCE_GENERATED
- Reference: https://raw.githubusercontent.com/ppy/osu-wiki/ae2c6443a4264e5429ea7bcd2f3503be8a518a50/wiki/Client/Interface/img/song-selection.jpg
- Verified Git blob SHA: 1e927a00a1984a5ba20fa5efec639410f349607a
- Matched viewport: 1280 x 720 at device scale factor 1
- Candidate SHA-256: c7041795ed3be10993dc9785bb97a86c794ff7861df8c7212a89ea4bac5b529d
- Normalized mean absolute pixel difference (diagnostic): 0.275356
- Pixels with max-channel difference >= 24: 772413/921600 (83.81%)
- Active app view: catalog
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
