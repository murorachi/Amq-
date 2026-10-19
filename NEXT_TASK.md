# Next task

Current engineering branch: `v82.85.13-real-audio-acceptance-gate-01`.

## Next phase after V82.85.14 extraction validation

1. First inspect the CI result for the answer-normalization source extraction. Do not proceed to another code move until the new contract and `tools/verify.py` pass.
2. Confirm the rebuilt product remains byte-identical to V82.85.12: 8,787,574 bytes / SHA-256 `b804fd66eecfef277d79d86611f589139025097313be937cf96d067cc201e067`.
3. If green, continue the `script_004` boundary review using the existing parser-backed inventory. Choose the next small helper only after its call sites, closure dependencies, and side effects are recorded.
4. Keep the production V82.82 lock unchanged: 8,787,490 bytes / SHA-256 `227e89d80fa58db8e8f79c59f1203f06f8bc0663d11228d0986fe6e30f81e91b`.
5. Keep real-audio PCM capture 🟡 deferred. Resume later from run 39184503441 and `tests/browser/real_audio_output_acceptance.py`; do not weaken its threshold.

Known rollback for the deferred audio-only checkpoint: `v82.85.12-multiplayer-leave-poll-race-fix-01`.

