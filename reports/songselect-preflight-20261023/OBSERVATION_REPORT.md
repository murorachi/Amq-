# Song Select observation report — 2026-10-23

## Method and limitations
- Candidate 130 local HTML: 9,237,889 bytes; SHA-256 `9085754d5b6d8b1463709c25a97402a217e8ddb07afb9e4beb5d14dd1fbc3916`.
- Browser: system Chromium 144.0.7559.96 through Playwright.
- Direct `file://` and localhost navigation are blocked. Tests used `page.set_content` with a test-only in-memory Storage shim. This is real browser rendering but not direct file loading or persistent-storage acceptance.
- Viewports: 1648×928, 1440×900, 1280×720; DPR 1.
- Entered the real app route by dispatching click to `[data-home-action="catalog"]` because the central menu is collapsed at startup.

## Browser results
| Viewport | Catalog cards | Visible cards | Inline list after work click | Song rows in first work | Console/page errors | Duplicate IDs |
|---|---:|---:|---:|---:|---:|---:|
| 1648×928 | 180 | 180 | 1 | 1 | 0 | 0 |
| 1440×900 | 180 | 180 | 1 | 1 | 0 | 0 |
| 1280×720 | 180 | 180 | 1 | 1 | 0 | 0 |

At 1648×928, Candidate 130 cards are 60px high with repeating widths; first card is approximately x=883, y=63, w=758, h=60. Selecting a work inserts an inline song row; selected row uses `translateX(-7px)` and is about 67px tall. Hover screenshots were captured separately at each viewport.

## Pixel comparison
Reference original 2555×1438; resized to 1648×928 using PIL Lanczos. Candidate screenshot stayed at 1648×928. SSIM is higher-is-better; MAE/RMSE are lower-is-better. These values are descriptive only, not an acceptance threshold.

| Region | SSIM | MAE | RMSE | Pixels |
|---|---:|---:|---:|---:|
| Full frame | 0.312034 | 63.4492 | 84.8510 | 1,529,344 |
| Left player panel (x 0–470, y 95–820) | 0.156962 | 87.3488 | 99.0183 | 340,750 |
| Top song metadata (x 0–900, y 0–100) | 0.021827 | 43.3146 | 68.7179 | 90,000 |
| Central background (x 400–1100, y 95–820) | 0.426898 | 53.1700 | 73.6449 | 507,500 |
| Right catalog (x 880–1648, y 95–820) | 0.410940 | 62.0146 | 80.1260 | 556,800 |
| Bottom controls (x 0–1648, y 820–928) | 0.166022 | 62.8117 | 98.5172 | 177,984 |

Regional crops are fixed approximations, not segmentation masks. The central score is affected by neutral fallback versus real anime artwork. Left/top/bottom scores reflect substantial structural differences. No visual pass is claimed.

## Findings
1. The observation loop works repeatably through `page.set_content` with the test shim.
2. File-origin loading remains blocked; the shim must not be mistaken for persistence testing.
3. The local Candidate 131 artifact's appended styles target nested `.songrow`, not top-level `.p32-catalog .card`; top-level cards remain 60px and receive no distance tiers.
4. Candidate 134 remains rejected: its report records the inline list disappearing and catalog cards doubling from 180 to 360.
5. Overall acceptance NOT ACCEPTED; Stage 1 incomplete, Stages 2/3 incomplete.