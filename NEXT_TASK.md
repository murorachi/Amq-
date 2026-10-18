# Next task

Current checkpoint: **V82.85.19 AMQ valid-anime-ID module contract (ACCEPTED)**.
Branch: `v82.85.19-amq-valid-anime-ids-contract-01`.
Acceptance run: https://github.com/murorachi/Amq-/actions/runs/39140087926.

## Accepted gates
- Source inventory completeness and deterministic V82.82 build pass.
- Checkpoint package inventory/reproducibility test passes.
- Closeout matrix reconciles all 91 fragments and 13 modules against the manifest.
- Every module test path referenced by the matrix exists.
- `validAnimeIds` direct source contract passes 11 assertions.
- Full browser-native-origin suite passes.

## Next highest-value task
Wire the existing module-specific contract tests into the main engineering CI workflow so that the 13-module inventory is not merely documented or tested only in historical checkpoint runs. Include candidate policy/integration, storage repository, database initializer, quiz suggestion helpers/renderer/controller, getQuizPool, answer metadata, EMQ membership, AMQ validation/ID normalization, EMQ normalization and numeric tolerance. Keep each test's output visible and fail-fast.

After that, continue the remaining `script_004` dependency ownership audit before further production extraction.

Known external acceptance limits remain Firefox/CSS cascade, real audio-provider playback, live two-client multiplayer reconnect, and production-domain storage policy/full IndexedDB failure cases.

Product lock: V82.82, 8,787,490 bytes / SHA-256 `227e89d80fa58db8e8f79c59f1203f06f8bc0663d11228d0986fe6e30f81e91b`; V82.65 immutable.
Rollback: return to parent commit `56809fd619c99eca7073db88a4aba6493e5d0dfd`.
