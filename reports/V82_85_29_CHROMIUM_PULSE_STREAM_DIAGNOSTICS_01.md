# V82.85.29 Chromium PulseAudio stream diagnostics

## Scope

Test-only instrumentation to diagnose why Chromium media playback advances while the PulseAudio monitor captures silence. No production HTML, playback logic, UI, audio selection, storage, or quiz behavior is changed.

## Baseline and evidence

- Parent branch: v82.85.28-next-audio-state-reset-dedup-01.
- Immutable V82.82 baseline: 8,787,490 bytes / SHA-256 227e89d80fa58db8e8f79c59f1203f06f8bc0663d11228d0986fe6e30f81e91b.
- In run [39229842012](https://github.com/murorachi/Amq-/actions/runs/39229842012), the real-browser test passed native playback, pause/resume, quiz timer gate, answer reveal, ended event, and cleanup assertions. It failed only the final non-silent PCM gate: peak=0, RMS=0.0.
- The logged PulseAudio snapshot listed Chromium as a client but no sink-input; the selected sink was IDLE. This does not yet prove whether Chromium failed to create an output stream, the media was muted/zero-volume, or routing/capture was wrong.

## Change

- Add HTMLMediaElement state to the acceptance log: mute flags, volume, source, paused/readiness/network state, timeline, media error, document visibility, and user-activation state.
- Sample sink-inputs and default sink ten times at 150 ms intervals during active native playback.
- Log full PulseAudio sink-input properties and client/sink summaries.
- Keep the strict PCM assertion unchanged: peak >= 1000 and RMS >= 150. The known-good paplay self-test remains separate and its captured samples are cleared before browser acceptance.

## Verification

- Static review of the edit: performed through exact-block replacement against the pinned V82.85.28 test source.
- Local Python syntax compilation: NOT RUN.
- Native-origin CI with new diagnostics: PENDING.
- Production product playback regression test: NOT RUN; production code was not changed.
- GitHub commit and branch update: completed; remote verification still required before claiming workflow success.

## Next action

Inspect the new PULSE_STREAM_DIAGNOSTIC output, then make only a root-cause-supported test environment change. Do not weaken or remove the non-silent PCM gate.

## Rollback

Revert this branch's diagnostic-only change and checkpoint documents. Keep V82.85.28 and the immutable V82.82 baseline untouched.
