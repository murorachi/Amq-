# Next task

Current engineering branch: `v82.85.13-real-audio-acceptance-gate-01`.

## Next phase: continue low-risk script_004 semantic modularization

1. Confirm the V82.85.15 CI run: production-source target-value contract, manifest/source fingerprints, two deterministic builds, Firefox responsive, native-origin persistence/custom-list, suggestion, and answer/playback suites.
2. Keep the Chromium real-audio PCM gate 🟡 deferred unless new evidence isolates a routing defect. Do not weaken its threshold or report it as passed.
3. Inspect the current AST inventory and remaining script_004 helpers. Select only one bounded helper with explicit inputs, read-only dependencies, and no hidden DOM/storage/timer effects; add a focused production-source contract before extraction.
4. Preserve exact source bytes and insertion position. Candidate output must remain V82.85.12 byte-identical: 8,787,574 bytes / SHA-256 `b804fd66eecfef277d79d86611f589139025097313be937cf96d067cc201e067`.
5. Keep immutable V82.82: 8,787,490 bytes / SHA-256 `227e89d80fa58db8e8f79c59f1203f06f8bc0663d11228d0986fe6e30f81e91b`.

## Rollback
Revert the V82.85.15 source/module/manifest/test/runner/workflow/docs commits. Do not replace the immutable product baseline.
