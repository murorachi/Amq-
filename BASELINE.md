# Baseline checkpoint: V82.85.30 Chinese-title cache shape guard

- Branch: `v82.85.30-chinese-title-cache-shape-guard-01`.
- Parent audit branch: `v82.85.29-source-audit-matrix-01`.
- Production change: `src/scripts/script_031.htmlpart` now rejects array-shaped cached `records` so malformed cache data falls back to the normal rebuild path.
- Modified fragment: 13,842 bytes / SHA-256 `bf6d46591ef75830fb6fa51ccdc55e061f6ac8b71c0848b08c27d35e245b4bb1`.
- Expected standalone V82.85.30: 8,786,577 bytes / SHA-256 `e76c4a35a406b20b055e91278e3c917832f9a9cb662280ea3d7d3211a69b8bb5`.
- Report: `reports/V82_85_30_CHINESE_TITLE_CACHE_SHAPE_GUARD_01.md`.
- Updated `reports/FRAGMENT_MANIFEST.json`, CI candidate/artifact naming, package name and package required-path list.
- CI validation is pending. Focused pre-fix characterization and source/unit tests passed, but V82.85.30 must pass the updated verifier/build/package/browser checks before acceptance.
- Immutable V82.82 baseline: 8,787,490 bytes / SHA-256 `227e89d80fa58db8e8f79c59f1203f06f8bc0663d11228d0986fe6e30f81e91b`.
- Rollback: restore the previous cache guard and V82.85.29 manifest/workflow/package metadata; keep V82.82 untouched.


## V82.85.30 CI checkpoint

- Run [39252468802](https://github.com/murorachi/Amq-/actions/runs/39252468802): source/unit passed (132/132 verifier checks and all unit steps), Firefox responsive passed. Chromium native-origin is still running; real-origin storage/custom-list and custom-list UI steps passed, IndexedDB/quiz input acceptance is in progress.
- Standalone candidate: 8,786,577 bytes / SHA-256 `e76c4a35a406b20b055e91278e3c917832f9a9cb662280ea3d7d3211a69b8bb5`.
- Deterministic source package SHA-256 `(authoritative ZIP checksum is retained in the CI log rather than embedded in the package to avoid recursive hashing)`; package artifact uploaded.
- Do not mark overall browser acceptance complete until run conclusion is final.


## V82.85.30 full CI outcome

- Run [39253372795](https://github.com/murorachi/Amq-/actions/runs/39253372795): source/unit PASS (132/132 verifier checks and all unit steps), Firefox responsive PASS.
- Browser-native lifecycle checks passed except final non-silent audio output capture (`peak=0, rms=0.0`); PulseAudio self-test passed. This is the known capture mismatch. Actual product playback was user-confirmed.
- Source package and standalone artifacts uploaded; verify the newest run after final documentation commits for the authoritative artifact IDs/fingerprints.
- V82.82 immutable baseline remains unchanged.
