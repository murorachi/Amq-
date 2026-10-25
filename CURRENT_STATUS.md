# CURRENT_STATUS.md

Updated: 2026-10-25
Stage: Stage 6 — static audit and source-derived regression.
State: **Stage 6 completed for the verifiable scope. Full browser/runtime E2E remains BLOCKED/NOT RUN.**

## Protected versions
- Formal maintenance baseline: Candidate295, 1,720,917 bytes, SHA-256 `aef896eee98c10bcb9fb1f10d6650b8e26067426f43b086e1b69fa12e3674a81`. Read-only; never overwrite.
- Candidate299: 1,719,884 bytes, SHA-256 `1e7a37cef7a7d791c5dd40f09c2143b2e507dac76c73951e5060b82f5c44c2e4`.
- Candidate300: 1,717,671 bytes, SHA-256 `5fea42650ede3b8b779afdf7b61e42365388d41b34e4231988065eb2fb7d34a5`.
- Candidate301: 1,720,241 bytes, SHA-256 `e8eb07ccab26b6e424eda9aed11d1c21b90cca9c544ed2b6843096e3b6762454`.
- Candidate302: 1,720,249 bytes, SHA-256 `f718a744057be0a33d371306f1742aaeede90e84f33d9e62ab45f5e6db488abd`. Candidate only; not promoted.
- No production HTML was changed in Stage 6; no Candidate303 created.

## Stage 5 real-catalog evidence
- AMQ data.js: 4,975,244 bytes; SHA-256 `692f69f56079d6cc0b30bd1951ab625f53799b87525c1bd52a27f29274703cf3`; 9,516 works / 38,821 songs, valid unique IDs, all titles/artists present.
- EMQ emq-data.js: 2,684,266 bytes; SHA-256 `88441b4a6090c01db1dae23c970a6fa24d457a54f4b915be3e23c3799b3794cc`; 6,645 works / 16,839 songs, valid unique IDs and complete work/title/artist/audio-candidate checks.
- Cross-source ID collisions: 0. Audit verdict PASS.
- 38,326 AMQ songs have a recognized media field in row slots 9/10/11; 495 have none. Candidate302 mediaFiles() reads those same slots, so those 495 are not playable candidates through the current extractor; this does not prove the source rows are corrupt.

## Stage 6 evidence
- Five candidate HTMLs re-hashed; all five pass static JS/CSS/HTML-ID audit: 67 inline executable scripts, 109 style blocks, 2,808 CSS rules, 271 unique IDs; no reported parser/syntax/duplicate-ID errors.
- Existing synthetic suites rerun: EMQ loader 9/9, AMQ catalog validator 11/11, source-pool/audio/blacklist 11/11 PASS.
- New source-derived EMQ loader regression harness: Candidate302 9/9 PASS; Candidate301 reproduces five invalid/unready workCount failures (expected known regression).
- Four Candidate302 synthetic/isolated suites total 40/40 PASS. This is not full browser E2E.
- Chromium headless local smoke attempt timed out in this environment; full browser E2E remains BLOCKED/NOT RUN.
- Candidate302 HTML is not present in Stage 6 remote branch tree; upload/remote SHA-256 verification remains BLOCKED, not claimed successful.

See `STAGE6_FINAL_REPORT_20261025.md`, `STAGE6_STATIC_AUDIT_RESULTS.json`, and `STAGE6_EMQ_REGRESSION_RESULTS.json`.
