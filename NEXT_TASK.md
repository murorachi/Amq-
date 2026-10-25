# NEXT_TASK — Candidate295 baseline / Stage 2 complete / Stage 3 data initialization

## Working method
Per user direction, work in whole stages, continue through safe tasks without stopping for step-by-step approval, skip blockers and report them at the end. Do not redo accepted work.

## Baseline and latest candidate
- Formal baseline: Candidate295, `index-old.html`, 1,720,917 bytes, SHA-256 `aef896eee98c10bcb9fb1f10d6650b8e26067426f43b086e1b69fa12e3674a81`.
- Stage 1 user-confirmed candidate: Candidate299, SHA-256 `1e7a37cef7a7d791c5dd40f09c2143b2e507dac76c73951e5060b82f5c44c2e4`.
- Stage 2 candidate: Candidate301, 1,720,241 bytes, SHA-256 `e8eb07ccab26b6e424eda9aed11d1c21b90cca9c544ed2b6843096e3b6762454`.
- Candidate301 is not the formal baseline; do not overwrite Candidate295.

## Stage 2 (L01–L12): engineering complete
- Centralized AMQ custom-list compatibility reader and canonical store.
- Empty/invalid/unavailable/recovered-invalid states distinguished.
- CRUD, membership changes, selector sync, playback-pool filtering, persistence reinitialization, corruption quarantine, full backup export/restore, legacy merge import validated in controlled harness.
- PASS: 67/67 JS syntax, CSS 109/2,808 with zero parser errors, 271 unique IDs; adapter 7/7; store/UI 7/7; playback 3/3; selector PASS; backup/restore 5/5.
- Real catalog integration is BLOCKED/NOT RUN because `data.js` and `emq-data.js` are absent. This does not stop source-level Stage 3 work.

## Stage 3: AMQ/EMQ data and initialization
1. Inspect source-level AMQ DB loading and EMQ packed payload validation; avoid repeating prior route/custom-list inventories.
2. Trace ready timing, IndexedDB/cache behavior, fallback/error handling, and song-to-work ID relationships.
3. Verify AMQ/EMQ/MIX pool selection and blacklist/audio-eligibility boundaries using available synthetic harnesses.
4. Verify external data file schemas and full ID integrity if the real files become available.
5. Keep AMQ and EMQ custom-list schemas separate; do not migrate or merge their key shapes.
6. Add targeted regression tests for load failure, partial data, invalid IDs, and ready timing.
7. Update this file, BASELINE.md, CURRENT_STATUS.md and a stage report; create a unique child candidate only if code changes are justified.

## Known blockers to carry, not stall on
- Missing `data.js` and `emq-data.js`: real data schema and ID integrity cannot be conclusively verified without the files.
- Browser direct file/localhost navigation blocked by `ERR_BLOCKED_BY_ADMINISTRATOR`; continue with controlled DOM tests and mark real end-to-end checks BLOCKED.
- Candidate301 HTML GitHub upload and remote SHA verification remain BLOCKED; docs/report remote readback must not be described as HTML upload.

## Rollback
- Candidate301 -> Candidate300 SHA-256 `5fea42650ede3b8b779afdf7b61e42365388d41b34e4231988065eb2fb7d34a5`.
- Stage 2 fallback -> Candidate299 SHA-256 `1e7a37cef7a7d791c5dd40f09c2143b2e507dac76c73951e5060b82f5c44c2e4`.
- Formal baseline -> untouched Candidate295 SHA-256 `aef896eee98c10bcb9fb1f10d6650b8e26067426f43b086e1b69fa12e3674a81`.
