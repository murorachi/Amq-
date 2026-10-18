# V82.85.4 Native Storage, AMQ/EMQ List Acceptance and Safe Modularization

Date: 2026-10-18

## Baseline

- Base branch: `v82.85.3-native-storage-reload-assertion-fix-01`
- Product baseline: V82.82, 8,787,490 bytes, SHA-256 `227e89d80fa58db8e8f79c59f1203f06f8bc0663d11228d0986fe6e30f81e91b`.
- Immutable V82.65 is unchanged.
- No production HTML output is intentionally changed. The new module replaces its exact original function at the same position; the deterministic build must prove the rebuilt HTML matches the V82.82 fingerprint.

## Work included

1. Added `tests/browser/native_storage_backup_acceptance_v82_82.py`, a real localhost-origin Chromium test with no localStorage/IndexedDB shims. It covers:
   - native localStorage and IndexedDB;
   - reload snapshot equality, allowing only a valid default-empty `aniSrsScheduleV1` initialization;
   - real UI full-backup export and exact sorted storage manifest;
   - malformed JSON import leaves all localStorage keys/values unchanged;
   - injected one-shot native write failure triggers exact full localStorage rollback;
   - real file-input full restore restores AMQ/EMQ stores while preserving an unrelated origin key.
2. Updated `tests/browser/custom_lists_ui_acceptance.py` to target V82.82 instead of a missing V82.80 artifact. It continues to test AMQ/EMQ create, membership add, rename, fresh-document persistence, and delete via the actual application UI with isolated in-memory storage; it does not claim native-origin persistence.
3. Updated `tests/browser/real_origin_acceptance_localhost.py` default target to V82.82.
4. Extracted the pure `unique(v)` ID-normalization helper from `src/scripts/script_040.htmlpart` to `src/modules/emq_list_id_normalization.js`. The module marker is at the original source position; the helper's bytes are unchanged. Updated `FRAGMENT_MANIFEST.json` and its exact-source contract to account for the extraction.
5. Added a CI workflow to run deterministic build verification, all unit contracts, and Chromium browser acceptance.

## Test status

- GitHub Actions run: https://github.com/murorachi/Amq-/actions/runs/39107928804 — **SUCCESS** at commit `21a390bd925e7bb919085b2c01b22e1ea8bc1d02`.
- `tools/verify.py`: **118 passed, 0 failed**. This includes immutable baseline/source/module fingerprints and deterministic V82.82 reconstruction.
- Node unit contracts: **all passed**. Python boundary contracts: **all passed**.
- Native-origin storage/backup suite: **20 PASS assertions**, including reload snapshot contract, real export, manifest exactness, malformed-import non-mutation, exact rollback after an injected one-shot write failure, successful file-input restore, and preservation of unrelated origin storage.
- AMQ/EMQ UI acceptance: **19 assertions passed, 0 page errors**. It covers create, membership add, rename, fresh-document initialization, stale-selection fail-closed behavior, and deletion. This UI suite uses an in-memory storage shim for CRUD; native-origin persistence is separately covered by the 20-assertion suite.
- Existing native-origin app/suggestion smoke suite: **15 PASS assertions**.
- Deterministic build output remains V82.82: 8,787,490 bytes / SHA-256 `227e89d80fa58db8e8f79c59f1203f06f8bc0663d11228d0986fe6e30f81e91b`. The production HTML is not changed by this source extraction.
- First CI attempts exposed and fixed two reproducibility issues: a missing pip cache manifest assumption, and hard-coded TypeScript installation paths. The final successful run includes those fixes.

## Risk boundaries

- The runtime extraction is limited to a pure ID normalization helper; no storage format, IDs, list CRUD, event wiring, UI, or backup behavior was rewritten.
- AMQ/EMQ list state and backup/restore logic are covered by the existing source contracts and the new browser harnesses.
- Firefox, real audio, production-domain policies, and multiplayer multi-client/reconnect remain separate acceptance gates.

## Rollback

Return to base branch `v82.85.3-native-storage-reload-assertion-fix-01` at its recorded head before this follow-up. The V82.82 HTML and immutable V82.65 baseline remain unchanged.
