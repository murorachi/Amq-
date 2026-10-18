# Baseline lock and current engineering checkpoint

## V82.86.05
- Branch: `v82.86.05-custom-list-id-lifecycle-matrix-01`.
- Latest commit: `41bec9560a419693bff2a2f3edb829112588ca24`.
- Parent: `v82.86.04-critical-cross-fragment-ownership-01`, commit `3916761ddcb98bbc90f5e09570f78c4ff446db57`.
- Matrix report: `reports/V82_86_05_CUSTOM_LIST_ID_LIFECYCLE_MATRIX_01.md`.
- Test extension: `tests/unit/custom_list_crud_reload_contract.test.cjs`.
- Scope is test/report only. No product JS/CSS, source fragment, manifest or generated HTML changed.
- Product lock: V82.82, 8,787,490 bytes, SHA-256 `227e89d80fa58db8e8f79c59f1203f06f8bc0663d11228d0986fe6e30f81e91b`.
- V82.65 remains immutable.
- CI run `39162546062`: both jobs passed. Source/unit includes 128 build/fingerprint checks, all unit/module contracts, backlog and dependency contract. Browser/native-origin acceptance passed all configured steps.

## Matrix boundaries
- AMQ animeIds remain work/anime IDs and are normalized against the catalog.
- EMQ workIds, vndbIds and songIds remain distinct; direct song ID reload coverage added.
- AMQ and EMQ failed writes must not publish new in-memory list state.
- Corrupt EMQ JSON currently falls back to an empty list in loadDb; no data quarantine/recovery is claimed.
- Full custom-list backup/restore round-trip and real-origin browser acceptance specifically for backup restore remain open.
