# Visual audit — Candidate 161

Reference screenshot SHA-256: `f0fd3ab5ec11e87632d95aac0ab7b9df3595c96e20bb03c5201d012d613b99a4`.
Candidate HTML SHA-256: `e144bd6ee4ad69ee2f05e4b761700c4c748b50d00fc31dd9117d6ce862974839`.

| Region | SSIM | MAE |
|---|---:|---:|
| Full frame | 0.311279 | 54.6844 |
| Left player/info | 0.201218 | 71.4378 |
| Top song info | 0.054814 | 55.2234 |
| Central background | 0.426354 | 52.3735 |
| Right song list | 0.368987 | 50.9136 |
| Bottom controls | 0.213940 | 57.5509 |

Reference was resized to 1648×928 with Lanczos. Metrics are descriptive, not acceptance thresholds; content/background and osu-specific widgets differ. Bottom player geometry and row bounds pass their DOM assertions, but overall visual similarity remains insufficient.
