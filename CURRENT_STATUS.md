# CURRENT_STATUS.md

Updated: 2026-10-25
Stage: Stage 5 — real AMQ/EMQ catalog audit.
State: **IN PROGRESS**. Local real-catalog structural audit: **PASS**. Browser/runtime validation remains NOT RUN.

## Protected versions
- Formal maintenance baseline: Candidate295, 1,720,917 bytes, SHA-256 `aef896eee98c10bcb9fb1f10d6650b8e26067426f43b086e1b69fa12e3674a81`.
- Latest test target: Candidate302, 1,720,249 bytes, SHA-256 `f718a744057be0a33d371306f1742aaeede90e84f33d9e62ab45f5e6db488abd`.
- Candidate301 SHA-256: `e8eb07ccab26b6e424eda9aed11d1c21b90cca9c544ed2b6843096e3b6762454`.
- No production HTML change; no Candidate303 assigned. Candidate295 remains the formal baseline.

## Real catalog audit evidence
- AMQ `data.js`: 4,975,244 bytes; SHA-256 `692f69f56079d6cc0b30bd1951ab625f53799b87525c1bd52a27f29274703cf3`.
- EMQ `emq-data.js`: 2,684,266 bytes; SHA-256 `88441b4a6090c01db1dae23c970a6fa24d457a54f4b915be3e23c3799b3794cc`.
- AMQ: 9,516 works / 38,821 songs; all IDs valid and unique; titles and artists present on all songs.
- AMQ audio field coverage: 38,326 songs have at least one recognized audio field; 495 do not, requiring investigation against actual source schema/fallback behavior.
- EMQ payload v1: 6,645 works / 16,839 songs; IDs valid and unique; no missing work associations, titles, artists, or audio candidates; all audio candidates HTTPS.
- Cross-source work/song ID collisions: 0. Audit verdict: PASS; issues array empty.
- These are data-file fingerprints, not HTML build hashes. The exact build/source pairing is not yet proven by this audit.

## Stage 5 delivered
- `stage5_local_catalog_audit.cjs`: local-only data audit tool.
- `README_STAGE5_LOCAL_AUDIT.md`: run instructions without uploading large files.
- `STAGE5_PROGRESS_REPORT_20261025.md`: updated with real audit evidence.
- Tool syntax and synthetic fixture execution: PASS locally.
- Real catalog structural audit: PASS from user-run local output.

## Still NOT RUN / BLOCKED
- Browser E2E, real audio playback, AMQ/EMQ/MIX mode and question flow.
- Candidate299 route matrix and Candidate301 CRUD/import/export/backup-restore regression.
- Confirming the data files' build provenance against Candidate295/Candidate302.
- Candidate302 HTML upload and remote SHA-256 verification.

Do not promote Candidate302. See Stage 5 report and README.
