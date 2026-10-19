# Next task

Current engineering branch: `v82.85.13-real-audio-acceptance-gate-01`.

## Next phase: continue low-risk script_004 semantic modularization

1. Use the current source and parser-backed dependency inventory. Do not repeat the V82.79/V82.80 broad audits.
2. Inspect the remaining small helper candidates and choose only one with explicit inputs and no hidden DOM/storage/timer side effects. Record all call sites and closure dependencies before moving it.
3. Add a focused production-source contract test before extraction. Preserve lexical scope, execution order, and exact source bytes at the insertion point.
4. Require `tools/verify.py`, the relevant unit contracts, two deterministic builds, and the applicable browser regression suites. Product candidate must remain byte-identical to V82.85.12: 8,787,574 bytes / SHA-256 `b804fd66eecfef277d79d86611f589139025097313be937cf96d067cc201e067`.
5. Keep real-audio PCM capture 🟡 deferred from run 39185741406. Do not weaken its threshold or let it block a separate low-risk module extraction. Resume diagnosis later using `tests/browser/real_audio_output_acceptance.py` and the saved CI logs.
6. Keep V82.82 immutable: 8,787,490 bytes / SHA-256 `227e89d80fa58db8e8f79c59f1203f06f8bc0663d11228d0986fe6e30f81e91b`.

Rollback for this source-only extraction: revert the V82.85.14 implementation and manifest-correction commits; no product HTML replacement is needed.

