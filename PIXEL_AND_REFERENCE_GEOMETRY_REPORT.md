# Pixel and reference geometry report

## Same-app pixel comparisons (1440×900)
- Home Candidate277→Candidate280: **0 / 1,296,000 changed pixels (0%)**.
- Song Select Candidate277→Candidate280: **305,814 / 1,296,000 changed pixels (23.597%)**. Expected changes: row geometry, selected/hover offset, and player dock.
- Multiplayer Candidate277→Candidate280: **1,246,237 / 1,296,000 changed pixels (96.16%)**. Expected palette/border/focus token normalization; layout remains in place. Pixel percentage alone is not a layout-quality score.

## osu!stable reference geometry

Reference image: 1648×928. Candidate screenshot: 1440×900. Because song titles and background artwork differ, full-frame raw pixel similarity was not scored; normalized geometry anchors were compared.

| Metric | Reference ratio | Candidate280 ratio | Delta |
|---|---:|---:|---:|
| Normal row left edge | 61.468% width | 61.777% width | +0.309pp |
| Normal row width | 38.532% width | 37.874% width | −0.657pp |
| Row height | 10.129% height | 10.073% height | −0.056pp |
| Selected-row left shift | 6.311% width | 6.250% width | −0.061pp |
| Hover-row left shift | 1.456% width | 1.799% width | +0.343pp |
| First row top | 10.237% height | 10.510% height | +0.273pp |
| Player dock top | 88.470% height | 88.401% height | −0.069pp |
| Player dock height | 11.530% height | 11.599% height | +0.069pp |

Interpretation: row height, selected shift, dock top/height are within 0.07 percentage points of the measured reference anchors; normal row width/left edge are within 0.66pp.
