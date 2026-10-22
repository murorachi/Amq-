# Candidate 108 full pixel comparison

Reference: user-provided osu!stable screenshot, 2555×1438, resized with Lanczos to 1648×928. Candidate screenshot: default Song Select state at 1648×928. No crop, geometric registration, or background masking was applied.

| Metric | Candidate 104 | Candidate 108 |
|---|---:|---:|
| SSIM | 0.30112 | 0.30682 |
| MAE (0–255) | 64.8767 | 66.3479 |
| RMSE (0–255) | 87.5193 | 88.8838 |
| Identical pixels | 0.0177% | 0.0167% |
| All RGB channels within 20 | 13.6239% | 12.8528% |

## Geometry
- Song-list left edge: Candidate 104 x≈1014; Candidate 108 x≈651; reference-scaled estimate x≈650.
- First row top: Candidate 108 y=94; reference-scaled estimate y≈94.
- Bottom band top: Candidate 108 y=822; reference-scaled estimate y≈821.
- Song row height: 64 px.

## Region SSIM / MAE / RMSE
- Top header: 0.04682 / 55.7067 / 84.5096
- Left column: 0.16929 / 78.4179 / 90.2506
- Center area: 0.60484 / 28.2350 / 46.7531
- Right list: 0.39676 / 71.5699 / 92.4748
- Bottom controls: 0.20716 / 61.0096 / 99.2775

The right-list SSIM improved from 0.37072 to 0.39676. Full-frame SSIM improved by 0.00570, while MAE/RMSE worsened because the wider pink list occupies more pixels. Different song titles, cover art, scene artwork and AMQ controls confound raw pixel scores; this is not a pure style score. Durable persistence, real audible playback, and matched hover/selected-state pixel comparison remain unverified.