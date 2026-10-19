# Next task: diagnose real-audio output capture acceptance failure

Current checkpoint: V82.85.20 helper deduplication decision.
Branch: `v82.85.18-source-inventory-gate-01`.
User-designated base commit: `715e7a6d734a487a21f8c866093431edd2f4938d`.

## Completed stage

Inspected the two local `g = id => document.getElementById(id)` helpers in `src/scripts/script_004.htmlpart`. They occur in separate functions; sharing them would save negligible duplication while changing scope structure. Consolidation was rejected and recorded in `reports/V82_85_20_HELPER_DEDUP_DECISION_01.md`. No production source changed.

## Next bounded investigation

Diagnose workflow run [39193924298](https://github.com/murorachi/Amq-/actions/runs/39193924298), job `browser-native-origin`, step `Run real browser audio decode and output acceptance`, test `tests/browser/real_audio_output_acceptance.py`.

Evidence from the log:
- PulseAudio self-test captured known non-silent PCM (peak 6999, RMS 4124.1).
- The browser test passed decoded-ready state, native playing event, media timeline advancement, pause/resume, quiz timer gating, answer reveal without pause, ended event, exit cleanup, and no uncaught page errors.
- The final monitor capture had at least one second of stereo PCM, but the measured output was `peak=0, rms=0.0`, failing the non-silent output assertion.

Inspect the capture/sink routing and the exact buffer/measurement path. Determine whether this is a harness race, wrong monitor source, or actual silent output. Add a focused reproduction if needed. Fix the smallest proven root cause. Do not weaken the non-silent assertion and do not modify production playback unless evidence shows a production defect.

## Stop conditions

- One failure path only; no broad audio refactor.
- Preserve all existing lifecycle assertions.
- Re-run the focused audio-output acceptance and the full relevant browser-native-origin job after any change.
- Keep static checks, unit tests, browser tests, and manual acceptance separately reported.
- If the failure is nondeterministic, reproduce across repeated isolated runs before changing the test.

## Immutable baseline and rollback

V82.82 remains immutable at 8,787,490 bytes / SHA-256 `227e89d80fa58db8e8f79c59f1203f06f8bc0663d11228d0986fe6e30f81e91b`. Revert only the specific test-harness fix and its documentation if needed. Never overwrite the product baseline.
