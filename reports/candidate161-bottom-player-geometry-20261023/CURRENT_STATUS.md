# Current status — Candidate 161 bottom player geometry

Candidate 161 derives from Candidate 160 and changes only the bottom player cover placeholder, metadata region and progress bar geometry. The cover fallback is near x=763/y=839, metadata x=850/y=842 with 295×66px dimensions, and progress x=905/y=908 with 240×12px dimensions at 1648×928. No fake artwork or osu-only controls were added.

- SHA-256: `e144bd6ee4ad69ee2f05e4b761700c4c748b50d00fc31dd9117d6ce862974839`; bytes: 9,272,310.
- Playwright: 26 PASS, 0 FAIL across 1648×928, 1440×900 and 1280×720.
- Bottom player geometry assertion: PASS. Row geometry (max error 2px), top filter alignment and filter visibility: PASS.
- Static: 61 inline JS blocks checked, 0 syntax errors; 2,648 CSS qualified rules parsed, 0 parse errors.
- Full SSIM 0.311279, MAE 54.6844 versus Candidate 145 SSIM 0.304511 / MAE 54.6926. Bottom region SSIM 0.213940, MAE 57.5509 versus Candidate 145 SSIM 0.185545 / MAE 61.5834. Both full and bottom-region metrics improved modestly.
- Direct `file://` remains BLOCKED_BY_ADMINISTRATOR. Durable storage, scene image/IndexedDB flows, real audio/live APIs, full custom-list CRUD and cross-workspace regression NOT RUN. Candidate 161 is not accepted.
