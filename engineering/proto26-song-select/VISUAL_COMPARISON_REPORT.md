# Song Select visual comparison evidence

- Status: EVIDENCE_GENERATED
- Reference: https://raw.githubusercontent.com/ppy/osu-wiki/ae2c6443a4264e5429ea7bcd2f3503be8a518a50/wiki/Client/Interface/img/song-selection.jpg
- Verified Git blob SHA: 1e927a00a1984a5ba20fa5efec639410f349607a
- Matched viewport: 1280 x 720 at device scale factor 1
- Candidate SHA-256: b65752672b9ccb39f29edd271534e7315fcbcb2fb83974c80ecb8cd29d427f79
- Normalized mean absolute pixel difference (diagnostic): 0.280775
- Pixels with max-channel difference >= 24: 812153/921600 (88.12%)
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
