# V82.85.3 Native Storage Reload Assertion Review

Date: 2026-10-18

## Baseline and scope

- Base engineering branch: `v82.85.2-native-storage-backup-acceptance-01`
- Base commit: `3cb626c5501822c6b4ed3d13ebe5bdab3ab74809`
- Product remains V82.82: 8,787,490 bytes; SHA-256 `227e89d80fa58db8e8f79c59f1203f06f8bc0663d11228d0986fe6e30f81e91b`.
- Immutable V82.65 and production HTML/source fragments were not modified.

## Finding and root cause

The native-origin diagnostic's only failing assertion compared the entire localStorage key set before and after a real document reload. Its captured difference was exactly one added key: `aniSrsScheduleV1`. The value is the SRS module's schema-version-1 default schedule, using algorithm `FSRS-6-default+song-learning-steps-v1`, default settings, and an empty `cards` object. No pre-existing localStorage key or value changed or disappeared.

Source inspection of `src/scripts/script_020.htmlpart` confirms:
- `loadStore()` returns `emptyStore()` when the SRS key does not yet exist, without immediately writing it.
- The `pagehide` handler writes the in-memory store to `aniSrsScheduleV1` when persistence is not suppressed or blocked.
- Therefore, navigation/reload can initialize this valid empty schedule during `pagehide`. Exact equality of the full key set incorrectly treats this permitted app-owned initialization as data loss.

This review does not claim that every conceivable SRS payload is safe. The exception is deliberately narrow.

## Corrected reload acceptance contract

1. Every localStorage key present before reload must still exist after reload.
2. Every pre-existing value must remain byte-for-byte identical.
3. No unexpected new key is permitted.
4. The only permitted new key is `aniSrsScheduleV1`, and only if it is a valid schema-version-1 default empty schedule with the expected FSRS algorithm, exact default settings, a parseable creation timestamp, and no cards.
5. If `aniSrsScheduleV1` existed before reload, its value must remain byte-for-byte identical.
6. A missing pre-existing key, changed pre-existing value, malformed/non-empty newly initialized SRS schedule, or any other added key fails the assertion.

## Regression coverage

Added `tests/unit/native_storage_reload_snapshot_contract.test.cjs`.

Actual executed command: `node /tmp/native_storage_reload_snapshot_contract.test.cjs` using the same test body as the committed test file.

Result: **7/7 cases passed**:
- unchanged snapshot accepted;
- valid default empty SRS initialization accepted;
- existing SRS value must remain unchanged;
- changed existing value rejected;
- unrelated added key rejected;
- malformed/non-empty new SRS schedule rejected;
- deleted existing key rejected.

## Acceptance evidence and limitations

- User manual acceptance: standalone HTML opens normally and the learning feature works.
- Native-origin diagnostic: all backup/export/import/rollback checks passed; the only reported failure was the old overly strict full-key-set equality assertion.
- The recorded before/after diff matches the corrected contract: the only addition was the expected empty SRS default key, with no pre-existing key/value mutation.
- The corrected contract regression suite passed 7/7.
- **The full Playwright native-origin harness was not rerun after changing the assertion policy.** Its local-only script and diagnostic copies were not present in the tracked repository, so the original end-to-end run is not represented as a newly rerun pass. This is recorded as a reproducibility limitation, not hidden as a pass.
- No production HTML was rebuilt or changed. Existing static verification (116/116) and product fingerprint remain the previously recorded results; they were not rerun during this follow-up.

## Rollback

This is an engineering-only branch. Return to `v82.85.2-native-storage-backup-acceptance-01` at `3cb626c5501822c6b4ed3d13ebe5bdab3ab74809` to discard this follow-up. The V82.82 product and V82.65 immutable baseline are untouched.
