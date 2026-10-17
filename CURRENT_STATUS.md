# Current status

Current checkpoint: **V82.66 EMQ-SOLO-LIST-HANDOFF-06**. Overall project status: **PARTIAL**.

## Completed / verified
- Recovered the exact V82.65 checkpoint ZIP and recomputed its outer SHA-256: `db7918affcfbb6a15b0dc3265877623d9646532c7597bf2acaa85060f5a701b5` (124,658,780 bytes).
- ZIP sidecar match; CRC PASS; 291/291 unique entries; internal manifest 290/290 hashes pass; zero missing paths and zero mismatches.
- Four current V82.65 product asset sizes and SHA-256 values match `VERSION.json`.
- Candidate policy tests: 70 passed, 0 failed.
- Candidate pool integration fixtures: 22 passed, 0 failed.
- EMQ API/custom-list contract tests: 19 passed, 0 failed.
- History/status isolation exact-source tests: 7 passed, 0 failed.
- Solo EMQ list handoff exact-source integration: 4 passed, 0 failed.
- Build/integrity verifier: 98 passed, 0 failed; two builds byte-identical to the preserved V82.65 HTML baseline.
- Solo EMQ list handoff traced across the exact `getQuizPool` wrapper and script 040 API adapter: selected lists become a song-ID Set; no selection passes `null`; invalid scope passes an empty Set; audio eligibility precedes the AMQ custom-list adapter.

## Locked HTML fingerprint
- Bytes: 8,786,930
- SHA-256: `abd202a6f96cc08e0969ad05ab8574cc71001733d655bcb5cff6b1a1a5b33a33`
- No production runtime, UI, catalog, storage schema, or generated HTML changes were made in checkpoint 06.

## Known limits
Real browser/manual interaction for this checkpoint, Firefox, external audio/network, IndexedDB round-trip, multiplayer multi-device and full product regression were not run. The new handoff test stubs the underlying combiner and final AMQ custom-scope adapter; their policy behavior is covered by separate exact-source/unit suites. The answer flow is source-inspected but not yet tested end-to-end.

## Next
1. Add a focused executable answer-flow test for audio-start eligibility, answer recording, and song-ID familiarity updates using isolated synthetic state.
2. Continue the V82.65 `NEXT_TASK.md` personal-filter/focus/EMQ-list cross-product matrix where fixtures do not yet cover all null/empty/invalid cases.
3. Only after these boundaries are stable, consider extracting the pure candidate policy into a separate source module.

## GitHub checkpoint
Text docs, tests, reports, and checksums are uploaded/read back from `murorachi/Amq-` branch `v82.66-source-split-02`. The binary checkpoint ZIP is delivered locally; it has not been uploaded as a GitHub Release asset because the available connector does not expose binary Release asset upload.
