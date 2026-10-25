# BASELINE.md

## 正式維護基準（唯一）
- 檔案：`amq_learning_tool_v82_86_06_candidate295_db_extraction_20261025.html`
- 版本：`v82.86.06-candidate295-db-extraction-20261025`
- 大小：1,720,917 bytes
- SHA-256：`aef896eee98c10bcb9fb1f10d6650b8e26067426f43b086e1b69fa12e3674a81`
- 狀態：正式維護基準，唯讀保護；不可覆蓋。

## 候選版本（均未升格）
| 候選 | 大小 | SHA-256 |
|---|---:|---|
| Candidate299 | 1,719,884 | `1e7a37cef7a7d791c5dd40f09c2143b2e507dac76c73951e5060b82f5c44c2e4` |
| Candidate300 | 1,717,671 | `5fea42650ede3b8b779afdf7b61e42365388d41b34e4231988065eb2fb7d34a5` |
| Candidate301 | 1,720,241 | `e8eb07ccab26b6e424eda9aed11d1c21b90cca9c544ed2b6843096e3b6762454` |
| Candidate302 | 1,720,249 | `f718a744057be0a33d371306f1742aaeede90e84f33d9e62ab45f5e6db488abd` |

## Stage 5 real data fingerprints
- `data.js`: 4,975,244 bytes; SHA-256 `692f69f56079d6cc0b30bd1951ab625f53799b87525c1bd52a27f29274703cf3`.
- `emq-data.js`: 2,684,266 bytes; SHA-256 `88441b4a6090c01db1dae23c970a6fa24d457a54f4b915be3e23c3799b3794cc`.
- AMQ 9,516 works / 38,821 songs; EMQ 6,645 works / 16,839 songs; invalid/duplicate IDs, missing EMQ associations and cross-source ID collisions: 0. Local audit PASS.
- 495 AMQ songs have no media value in row slots 9/10/11; current media extractor uses these slots. They are not eligible playback candidates through that extractor, but source corruption is not established.

## Stage 6 acceptance
- Static checks on Candidates 295/299/300/301/302: PASS (67 executable inline JS blocks, 109 style blocks, 2,808 CSS rules, 271 unique HTML IDs per candidate).
- Candidate302 source-derived EMQ loader regression suite: 9/9 PASS; Candidate301 expected regression reproduced in 5 invalid/unready cases.
- Existing synthetic suites: 9/9 + 11/11 + 11/11 PASS. Combined Candidate302 isolated tests: 40/40 PASS.
- Browser E2E / real playback / actual real-data full-page runtime: NOT RUN or BLOCKED.
- Candidate302 HTML remote upload/hash verification: BLOCKED; remote branch currently contains reports/scripts, not the candidate HTML.
- Candidate295 remains the only formal baseline; Candidate302 is not promoted.

Details: `STAGE6_FINAL_REPORT_20261025.md`.
