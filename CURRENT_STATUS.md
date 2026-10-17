# Current status

Current checkpoint: **V82.66 EMQ-HISTORY-ISOLATION-05**. Overall status: **PARTIAL**.

## Completed
- Preserved the V82.65 standalone HTML baseline and deterministic build.
- Candidate policy tests: 70 passed, 0 failed.
- Candidate pool integration fixtures: 22 passed, 0 failed.
- EMQ API/custom-list contract tests: 19 passed, 0 failed, including fail-closed missing-work mapping coverage.
- History/status isolation exact-source tests: 7 passed, 0 failed.
- Build/integrity verifier: 98 passed, 0 failed; two builds are byte-identical to the baseline.
- Characterized the solo custom-list adapter: AMQ list scope filters AMQ rows, leaves EMQ rows to EMQ-side eligibility, and fails closed on malformed/stale AMQ list scope.
- Verified source-level separation of AMQ/EMQ history metadata and song-ID-based familiarity/tag storage; answer-flow observations are source-inspected only.

## Baseline fingerprint
- HTML: 8,786,930 bytes
- SHA-256: `abd202a6f96cc08e0969ad05ab8574cc71001733d655bcb5cff6b1a1a5b33a33`
- Official full V82.65 delivery ZIP remains unavailable. The local `AMQ_V82_65_AUDIT_01.zip` is an audit bundle, not a substitute for the official delivery archive. Its presence does not verify the official archive's outer hash, CRC, internal manifest or payload fingerprints.

## Unresolved integration seam
The solo quiz wrapper does not pass `selectedEmqSongIds` to `combinePool`. Its intended relationship to solo EMQ custom lists is unconfirmed. No production logic was changed pending confirmation of that contract.

## Limits
Tests execute exact source fragments with synthetic compressed catalogue data and isolated DOM/storage/history dependencies. Real browser/manual interaction, Firefox, external audio/network, IndexedDB round-trip, multiplayer multi-device and full product regression were not run. The answer flow was inspected in source, not tested end-to-end. No production HTML, UI, catalog, storage schema or runtime logic changed.

## Next
1. Obtain the exact official V82.65 delivery ZIP and validate its SHA-256, CRC, internal manifest and payload fingerprints; do not substitute the audit ZIP.
2. Resolve the solo EMQ custom-list contract and add an exact-source `getQuizPool` wrapper test proving argument flow and adapter order.
3. Add a focused answer-flow test for audio eligibility, answer recording and song-ID familiarity updates before considering the first policy extraction.
