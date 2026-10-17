# V82.66 EMQ-HISTORY-ISOLATION-05 report

## Scope

Continue from checkpoint `V82.66 EMQ-CUSTOM-LIST-SCOPE-04`. This stage adds exact-source regression coverage for EMQ/AMQ history, familiarity, tag lookups, and invalid EMQ work mappings. No product runtime, UI, storage schema, catalogue, or generated HTML logic was changed.

## Findings

- `recordQuizHistoryV51` determines source by checking the song ID (`song[1]`) with `__aniEmqAPI.isSong`, then resolves EMQ work metadata from the EMQ work map using the row's work ID (`song[0]`). History entries retain the source-specific `source` and `workKind` fields.
- The history bridge keys familiarity and tags by song ID. EMQ work IDs do not automatically alias song IDs. Tag writes reject IDs that are not present in either source's song catalogue and roll back the in-memory change if persistence fails.
- `storedStatus` validates the result through the shared numeric policy and returns `null` for invalid/out-of-range values. Its localStorage fallback is only used when the history bridge returns nullish data; an explicit bridge value of `0` is authoritative.
- `storedTag` uses the exact requested key, preferring the history bridge and then the `aniSongTags_v1` storage object. Malformed stored JSON returns an empty tag.
- The EMQ loader rejects a song whose referenced work ID is missing before setting `ready` or exposing any EMQ rows. Existing AMQ/EMQ work-ID collision handling is still fail-closed.
- Answer flow source inspection confirms `classifyQuiz` does not record a normal answer before audio has started; it delegates that case to the unplayed-question path. Familiarity updates apply only when the target is `anime`, and the write key is the quiz song ID. This answer-flow observation was source-inspected, not browser-driven.

## Changes

- Added `tests/unit/history_status_isolation.test.cjs` with seven isolated exact-source assertions covering source-specific history metadata, AMQ/EMQ separation, song-ID status/tag keys, unknown-tag rejection, storage-failure rollback, status validation/fallback, and malformed tag storage.
- Extended `tests/unit/emq_api_contract.test.cjs` with an orphan-song fixture that asserts a missing work mapping fails closed before ready and leaves AMQ arrays unchanged.
- No changes to product HTML or production runtime fragments.

## Test results

- Candidate policy: 70 passed, 0 failed.
- Candidate pool integration: 22 passed, 0 failed.
- EMQ API/custom-list contract: 19 passed, 0 failed.
- History/status isolation: 7 passed, 0 failed.
- Build/integrity verifier: 98 passed, 0 failed.
- Deterministic build: two verifier builds have identical bytes and match the preserved V82.65 baseline.
- Output HTML: 8,786,930 bytes; SHA-256 `abd202a6f96cc08e0969ad05ab8574cc71001733d655bcb5cff6b1a1a5b33a33`.

## Not run / limits

- Browser/manual interaction, Firefox, audio/network playback, IndexedDB round-trip, multiplayer multi-device, and full product regression were not run.
- The answer flow was inspected in source but not executed as an end-to-end quiz test.
- `AMQ_V82_65_AUDIT_01.zip` is an audit package containing the standalone baseline and inventory/report files, not the official full V82.65 delivery ZIP. The official delivery archive is still unavailable, so its expected outer SHA-256, CRC, internal manifest and all embedded payload fingerprints remain unverified.
- The solo custom-list adapter seam remains unresolved: `getQuizPool` does not pass `selectedEmqSongIds` into `combinePool`. No speculative behavior was added.
- GitHub upload/readback status is recorded separately after attempting the checkpoint push.

## Rollback

This stage only adds test/report files and updates checkpoint documentation. To roll back this stage, remove `tests/unit/history_status_isolation.test.cjs`, revert the added orphan-work test in `tests/unit/emq_api_contract.test.cjs`, and restore the prior versions of `CURRENT_STATUS.md`, `BASELINE.md`, `NEXT_TASK.md`, and `PACKAGE_SHA256SUMS.txt`. The product HTML is unchanged and remains byte-identical to the locked baseline.
