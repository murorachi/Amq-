# AMQ Learning Tool V82.66 source split checkpoint

This checkpoint continues the verified V82.65 candidate-pool source. The standalone product HTML is unchanged; this stage adds baseline-package verification evidence and exact-source solo EMQ custom-list handoff coverage only.

## Current checkpoint
- `V82.66 EMQ-SOLO-LIST-HANDOFF-06` (PARTIAL)
- Official V82.65 checkpoint ZIP: 124,658,780 bytes; SHA-256 `db7918affcfbb6a15b0dc3265877623d9646532c7597bf2acaa85060f5a701b5`.
- ZIP CRC PASS; 291 unique entries; internal SHA-256 manifest 290/290 PASS; four current product payload fingerprints match.
- Candidate policy: 70 passed, 0 failed.
- Candidate pool integration: 22 passed, 0 failed.
- EMQ API/custom-list contract: 19 passed, 0 failed.
- History/status isolation: 7 passed, 0 failed.
- Solo EMQ list handoff: 4 passed, 0 failed.
- Build/integrity verifier: 98 passed, 0 failed; deterministic output byte-identical to the V82.65 HTML baseline.
- HTML baseline: 8,786,930 bytes; SHA-256 `abd202a6f96cc08e0969ad05ab8574cc71001733d655bcb5cff6b1a1a5b33a33`.

## Solo EMQ list handoff finding
The six-argument call in the quiz wrapper is decorated by the script 040 API adapter, which injects the selected EMQ song-ID Set into the original combiner. Empty selection passes `null`; invalid selection passes an empty Set. No production patch was needed. See `reports/SOLO_EMQ_LIST_HANDOFF_06_REPORT.md`.

## Baseline evidence
See `reports/BASELINE_PACKAGE_VERIFICATION_06.md`. The recovered official package is kept separate at `/mnt/data/v82_65_baseline_recovery/`; it is not confused with `AMQ_V82_65_AUDIT_01.zip`.

## Test commands
```powershell
node tests\unit\candidate_pool_policy.test.cjs
node tests\unit\candidate_pool_integration.test.cjs
node tests\unit\emq_api_contract.test.cjs
node tests\unit\history_status_isolation.test.cjs
node tests\unit\solo_emq_list_handoff.test.cjs
python tools\build.py
python tools\verify.py
```

Browser/manual interaction, Firefox, external audio/network, IndexedDB round-trip, multiplayer multi-device and full product regression were not run in this checkpoint. The next task is executable answer-flow coverage, followed by remaining personal-filter/focus/EMQ-list cross-product cases. See `NEXT_TASK.md`.
