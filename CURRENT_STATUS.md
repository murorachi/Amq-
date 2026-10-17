# Current status

Current checkpoint: **V82.66 EMQ-CUSTOM-LIST-SCOPE-04**. Overall status: **PARTIAL**.

## Completed
- Preserved the V82.65 standalone HTML baseline and deterministic build.
- Candidate policy tests: 70 passed, 0 failed.
- Candidate pool integration fixtures: 22 passed, 0 failed.
- EMQ API and custom-list scope exact-source tests: 18 passed, 0 failed.
- Build/integrity verifier: 98 passed, 0 failed; two builds are byte-identical to the baseline.
- Characterized the solo custom-list adapter: AMQ list scope filters AMQ rows, leaves EMQ rows to EMQ-side eligibility, and fails closed on malformed/stale AMQ list scope.
- Characterized the optional `selectedEmqSongIds` API argument, including ordinary-filter bypass plus blacklist/repeat intersections.

## Baseline fingerprint
- HTML: 8,786,930 bytes
- SHA-256: `abd202a6f96cc08e0969ad05ab8574cc71001733d655bcb5cff6b1a1a5b33a33`
- Official full V82.65 delivery ZIP remains unavailable; its outer hash, CRC and internal manifest are not independently reverified.

## Unresolved integration seam
The solo quiz wrapper does not pass `selectedEmqSongIds` to `combinePool`. Its intended relationship to solo EMQ custom lists is unconfirmed. No production logic was changed pending confirmation of that contract.

## Limits
Tests execute exact source fragments with synthetic compressed catalogue data and isolated DOM/storage/history dependencies. Real browser/manual interaction, Firefox, external audio/network, IndexedDB round-trip, multiplayer multi-device and full product regression were not run. No production HTML, UI, catalog, storage schema or runtime logic changed.

## Next
Close the official V82.65 ZIP baseline gap, resolve the intended solo EMQ custom-list contract and wrapper handoff, then continue source-specific history/status isolation.
