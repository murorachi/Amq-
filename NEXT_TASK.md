# Current task: finish V82.85.30 browser acceptance

Current branch: `v82.85.30-chinese-title-cache-shape-guard-01`.

## Already passed

- Source verifier and all source/unit steps: **PASS**, verifier 132/132.
- Chinese-title cache shape test: 14 assertions passed; array-shaped records now produce a cache miss.
- Firefox responsive: **PASS**.
- Deterministic source package: two builds matched, SHA-256 `d1eab00af3bb59955bdcc11650a8edf5a8653df3c46912c08b725b60c7aea56a`; artifact uploaded.
- Standalone candidate: 8,786,577 bytes / SHA-256 `e76c4a35a406b20b055e91278e3c917832f9a9cb662280ea3d7d3211a69b8bb5`; artifact uploaded.

## Remaining acceptance

- Workflow run [39252468802](https://github.com/murorachi/Amq-/actions/runs/39252468802) browser-native job is still in progress. Real-origin storage/custom-list and isolated custom-list UI tests passed; IndexedDB/quiz input acceptance was in progress at the last check.
- Wait for the final job conclusion and inspect the exact failed step, if any. Do not conflate known audio-output capture failure with other browser failures.
- Verify uploaded artifacts and branch fingerprints after the run finishes.

## Rollback

Restore the previous cache guard, manifest release pin, workflow candidate/artifact names and checkpoint package name. Immutable V82.82 remains unchanged.
