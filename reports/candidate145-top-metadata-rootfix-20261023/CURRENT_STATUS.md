# Current status — Candidate 145

Parent Candidate 143 SHA-256: `8086d9bf4bc3e93ebfdaa3c0e4934ba8e83d2d33b29d2289ccadf682ac957b11`.
Candidate SHA-256: `b0d4a7e81cf65270789a50afa65e722bf1312f3402719e7c196208a28cf89fdf`; size 9,268,391 bytes.

Fixed a late legacy CSS rule that hid the two actual AMQ metadata fields (play count and last wrong answer). The top metadata region now measures 850×83.8px at 1648×928. Kept Candidate 143's 100px dock and 62px mode wrap. No osu-only stats or art were fabricated.

Tests: 22 Playwright PASS, 0 FAIL; 7.5 rows at 1648×928, 1440×900, 1280×720; 63 JS scripts syntax checked, 0 errors; 93 CSS blocks, 0 parse errors. Direct `file://` is BLOCKED_BY_ADMINISTRATOR. Scene image rendering and IndexedDB persistence/export/clear/restore are BLOCKED in the opaque test origin. Durable storage, real audio, live APIs, full list CRUD and cross-workspace regression NOT RUN.

Visual metrics: SSIM 0.304511, MAE 54.6926, RMSE 78.4587. Candidate 142: SSIM 0.297241, MAE 57.5168, RMSE 80.3344. Song Select remains NOT ACCEPTED.