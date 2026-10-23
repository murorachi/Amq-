# NEXT TASK — Song Select

1. Preserve Candidate 130 unchanged. Do not treat the local Candidate 131 as the remote Candidate 131.
2. Recover the exact latest HTML binary if possible. Candidate 135 currently exists only as reports; its binary and consistent parent identity are unavailable.
3. If recovery remains impossible, fork a uniquely named candidate from verified Candidate 130 and explicitly document that it does not inherit missing Candidate 132/135 code.
4. Complete Stage 1 layout first: focused right-side list with selected-song hierarchy, actual song data, distance tiers and 7.5 visible rows.
5. Fix the hover cascade at the existing high-specificity rule (Candidate 130 lines 7571–7572), not by adding another lower-specificity override.
6. Add ArrowUp/ArrowDown selection at the canonical inline-song interaction owner. Assert one selected row and scroll it into view; test Enter separately.
7. Re-run screenshot, geometry, SSIM/MAE/RMSE at 1648×928, 1440×900 and 1280×720; then run search/sort/category/mode/list/player/background/routing regression.
8. Keep direct-file loading and durable persistence BLOCKED until tested on a real local browser. Do not claim full acceptance before then.