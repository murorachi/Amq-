# Visual audit — Candidate 145

Reference SHA-256: `f0fd3ab5ec11e87632d95aac0ab7b9df3595c96e20bb03c5201d012d613b99a4`. Candidate SHA-256: `b0d4a7e81cf65270789a50afa65e722bf1312f3402719e7c196208a28cf89fdf`.

At 1648×928, the catalog is x≈881.7, y=44, width=762, height=776, preserving 7.5 visible rows. The left rail is x=7 and 450px wide. Top metadata is x=8, y=7, width=850, height≈83.8px and shows real AMQ play-count / last-wrong fields. Bottom dock is x≈115.4, y=828, width≈1414, height=100px; mode wrap is 135×62px.

Pixel metrics after Lanczos-resizing the reference to 1648×928: full SSIM 0.304511, MAE 54.6926, RMSE 78.4587; left SSIM 0.201218, MAE 71.4378, RMSE 86.8332; top SSIM 0.041466, MAE 54.9730, RMSE 85.1035; center SSIM 0.427087, MAE 49.9781, RMSE 69.0732; right list SSIM 0.362508, MAE 49.6051, RMSE 71.3637; bottom SSIM 0.185545, MAE 61.5834, RMSE 99.3321.

Candidate 142 full-frame: SSIM 0.297241, MAE 57.5168, RMSE 80.3344. These metrics are diagnostic, not percentages or acceptance thresholds.

Remaining blockers: no saved scene artwork in the test context; AMQ utility links are not osu leaderboard data; actual osu rank/PP/BPM/object statistics are unavailable; bottom controls and cover tiles still differ. Visual acceptance remains NOT ACCEPTED.