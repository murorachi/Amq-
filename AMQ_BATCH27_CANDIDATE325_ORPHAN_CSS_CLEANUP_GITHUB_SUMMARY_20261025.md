# Batch27 Candidate325：孤立 CSS 規則批次清理
- Source Candidate320: 1,645,470 bytes; SHA-256 `134020658ac272916bdd503c0ebdbe8cdbafcf0c15cff96cc0d45ddf63c8a66c`.
- Candidate325: 1,645,154 bytes; SHA-256 `187cba98e97d48819430a388d959a8dc0d7cbb41156b349de6adc31b58e6dd7d`; not promoted.
- Removed five unreferenced CSS rules: `.aniSrsGroupEnroll` (normal/mobile), `.mpReadyBar`, `.mpReadyBar span`, `.vn49Checkbox`. All have zero references outside style blocks in source; zero remaining occurrences in Candidate325.
- PASS: JS syntax 65/65 unchanged; CSS parse 0 errors; 269 IDs, 0 duplicates; Chromium static computed styles identical at 1440x900, 768x1024, 390x844 (412 elements each, 0 differences).
- NOT RUN: full-app E2E, persistent storage, real audio/video, external cover fallback.
- Candidate325 HTML remote upload/hash verification BLOCKED; connector write actions accept UTF-8 text content and do not expose local-file upload. Formal baseline Candidate302 and rollback Candidate320 unchanged.
- Full local report: `AMQ_BATCH27_CANDIDATE325_ORPHAN_CSS_CLEANUP_20261025.md`; test JSON: `AMQ_BATCH27_CANDIDATE325_STATIC_CSS_ORPHAN_TESTS_20261025.json`.
