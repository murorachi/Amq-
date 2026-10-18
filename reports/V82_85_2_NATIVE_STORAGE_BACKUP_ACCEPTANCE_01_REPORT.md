# V82.85.2 Native Storage and Full Backup Acceptance Harness

Date: 2026-10-18

## Scope

Engineering-only test addition. No production HTML, JavaScript, CSS, manifest, or release fingerprint was changed. The target product remains V82.82, 8,787,490 bytes, SHA-256 `227e89d80fa58db8e8f79c59f1203f06f8bc0663d11228d0986fe6e30f81e91b`. Immutable V82.65 remains unchanged.

## New artifact

- `V82_85_2_NATIVE_STORAGE_BACKUP_ACCEPTANCE_01.py`
- Size: 14,163 bytes
- SHA-256: `359275c2bb424aed739ba5967e6eb5c4b5037e1a9a5db436ca05b2c511630de2`

The harness uses Playwright Chromium on a temporary localhost HTTP origin and a fresh ephemeral browser context. It does not inject a localStorage or IndexedDB shim. It covers native localStorage/IndexedDB access, an IndexedDB transaction and reload persistence, actual full-backup export via `#exportBtn`, backup manifest integrity, malformed-import no-mutation, valid full restore through `#importFile`, a one-shot storage-write fault to exercise exact rollback, post-reload persistence, and uncaught page errors. The one-shot write fault is explicit test instrumentation, not evidence of a naturally occurring quota failure.

## Executed checks

- Python syntax compilation: PASS.
- CLI `--help` smoke test: PASS.
- Product fingerprint precondition: PASS; local HTML is 8,787,490 bytes and matches the expected V82.82 SHA-256.
- `tests/unit/storage_repository_contract.test.cjs`: 9/9 PASS.
- `tests/unit/backup_restore_contract.test.cjs`: 6/6 PASS.
- `tests/unit/full_backup_restore_roundtrip_contract_v82_83.test.cjs`: 4/4 PASS.
- `tools/verify.py`: 116/116 PASS; deterministic output is byte-identical to expected V82.82.
- Native-origin browser acceptance: BLOCKED / NOT RUN. Chromium returned `net::ERR_BLOCKED_BY_ADMINISTRATOR` while navigating to the temporary localhost URL, before application initialization. No native-origin assertion ran. This is an environment restriction, not a product pass or fail.

## Limits and next gate

The harness is ready to run on a Windows/browser environment that permits localhost navigation. Until a run exits 0, native-origin persistence and real UI backup export/import/rollback remain NOT VERIFIED. Firefox, real audio/network, multiplayer, and custom-list UI acceptance remain separate gates. Do not extract answer/playback or multiplayer lifecycle code before the applicable acceptance gates pass.

## Run

See `V82_85_2_NATIVE_STORAGE_BACKUP_ACCEPTANCE_01_RUN.txt`. The expected product SHA-256 is `227e89d80fa58db8e8f79c59f1203f06f8bc0663d11228d0986fe6e30f81e91b`.
