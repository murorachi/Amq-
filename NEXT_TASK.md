# Next task

Current engineering branch: `v82.85.13-real-audio-acceptance-gate-01`.

## Next phase: production-domain storage policy audit

1. Inspect existing storage initialization, persistence and fallback behavior on the production domain. Identify browser policy constraints that could affect localStorage, IndexedDB, backup/restore, and first-run initialization.
2. Keep the audit evidence-based and test-only first. Add or adapt a reproducible browser acceptance test only where the environment can legitimately exercise the production-origin policy; do not fake a production origin with localhost results.
3. Preserve existing data contracts: reload must not silently rewrite existing values; only explicitly permitted valid defaults may be initialized. Backup/restore must retain AMQ/EMQ custom lists and their ID mapping.
4. Keep the immutable V82.82 product baseline unchanged unless a separately scoped, evidence-backed product fix is required: 8,787,490 bytes / SHA-256 `227e89d80fa58db8e8f79c59f1203f06f8bc0663d11228d0986fe6e30f81e91b`. Current V82.85.12 candidate: 8,787,574 bytes / SHA-256 `b804fd66eecfef277d79d86611f589139025097313be937cf96d067cc201e067`.
5. Keep the real-audio PCM capture gate 🟡 deferred. Do not spend this phase retrying CI audio routing or mark the gate passed. Resume it later from run 39184503441 and the existing `tests/browser/real_audio_output_acceptance.py` diagnostics.

Rollback for the deferred audio-only checkpoint: `v82.85.12-multiplayer-leave-poll-race-fix-01`. This checkpoint changes test/workflow/reporting files only.

