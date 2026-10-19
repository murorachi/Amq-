# Next task

Current engineering branch: `v82.85.13-real-audio-acceptance-gate-01`.

## Next phase: continue low-risk semantic modularization

The production-domain/native-origin storage gate remains unverified and is environment-blocked in the current managed browser environment: prior evidence records Chromium failing before navigation with `net::ERR_BLOCKED_BY_ADMINISTRATOR` on an ephemeral localhost URL. Do not make this the next blocking task and do not treat the limitation as a product pass/failure.

1. Continue the script_004 semantic-boundary review using the current source and parser-backed inventory. Do not repeat the broad V82.79/V82.80 audits; use them as baseline.
2. Choose one small, bounded helper with explicit inputs and no hidden DOM/storage/timer side effects. Before moving it, add focused production-source contract assertions and record every call site and closure/global dependency.
3. Preserve behavior and script execution order. Build V82.82 twice and require the output to remain byte-identical to 8,787,490 bytes / SHA-256 `227e89d80fa58db8e8f79c59f1203f06f8bc0663d11228d0986fe6e30f81e91b` unless a separately approved product fix is required.
4. Run the relevant unit/contract tests, `tools/verify.py`, deterministic build comparison, and applicable browser regression suites. Report static checks, automated tests, and any real-browser acceptance separately.
5. Keep the real-audio PCM capture gate 🟡 deferred. Do not spend this phase retrying CI audio routing or weaken its non-silent PCM threshold. Resume later from run 39184503441 and `tests/browser/real_audio_output_acceptance.py`.

Known rollback for the deferred audio-only checkpoint: `v82.85.12-multiplayer-leave-poll-race-fix-01`. Product baseline remains immutable.

