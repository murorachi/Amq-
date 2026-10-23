# Visual metrics — Candidate 132

Reference and candidate captures normalized to 1648×928 using Lanczos resizing. Regions are fixed viewport-coordinate crops, not semantic object masks.

| Region | Candidate 130 SSIM | Candidate 132 SSIM | Candidate 130 MAE | Candidate 132 MAE | Candidate 130 RMSE | Candidate 132 RMSE |
|---|---:|---:|---:|---:|---:|---:|
| Full frame | 0.312034 | 0.314962 | 63.4492 | 65.1305 | 84.8510 | 86.3024 |
| Left player panel | 0.126903 | 0.127048 | 93.7021 | 94.0013 | 104.1608 | 104.2475 |
| Top song info | 0.024062 | 0.023807 | 45.1157 | 45.1890 | 74.1118 | 74.1103 |
| Central scene | 0.433449 | 0.420712 | 47.7094 | 49.2983 | 67.5444 | 68.2742 |
| Right catalog | 0.402640 | 0.416169 | 63.7020 | 67.0872 | 82.9174 | 86.3711 |
| Bottom controls | 0.166022 | 0.176900 | 62.8117 | 61.9701 | 98.5172 | 98.3053 |

SSIM improved slightly overall and in the right catalog, but MAE/RMSE increased. Larger rows satisfy the explicit 7.5-card requirement; the procedural fallback cannot match real anime artwork. These metrics do not imply overall visual acceptance.
