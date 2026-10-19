# Current engineering checkpoint: V82.85.17 required acceptance complete except deferred CI audio-output capture

- Latest full acceptance run: [39189657895](https://github.com/murorachi/Amq-/actions/runs/39189657895), source commit `4652a97c6e358710bbe9584cdc2147764e06d5a7`.
- `source-and-unit`: PASS. Source fingerprints, deterministic V82.82 build, V82.85.12 candidate build, all registered extraction contracts and native storage/custom-list/backup contracts passed.
- `browser-firefox-responsive`: PASS.
- Chromium native-origin storage/custom-list, isolated custom-list UI regression, IndexedDB/quiz input, quiz suggestion integration, and answer/playback lifecycle: PASS.
- Multiplayer room/phase/live-draft/reconnect acceptance: PASS. The workflow now runs this check even when the preceding audio-output gate fails.
- Real-browser audio output capture: FAIL at the final non-silent PCM assertion only. PulseAudio self-test captures a non-silent signal, and browser native decode/playing/timeline/pause/resume/answer reveal/exit cleanup pass, but the monitor still reports peak=0 / RMS=0.0. This remains a deferred CI output-routing/capture problem. Threshold unchanged; do not describe it as proof that real-device playback is broken.
- V82.85.17 extracted `quizAnswerAliasTooltipTextV8239()` to `src/modules/quiz_answer_alias_tooltip_text.htmlpart` with a production-source contract included in the runner and CI.
- Workflow conclusion is **failure solely due to the audio PCM capture gate**. All other listed acceptance jobs/steps passed.
- Candidate V82.85.12: 8,787,574 bytes / SHA-256 `b804fd66eecfef277d79d86611f589139025097313be937cf96d067cc201e067`. Immutable V82.82: 8,787,490 bytes / SHA-256 `227e89d80fa58db8e8f79c59f1203f06f8bc0663d11228d0986fe6e30f81e91b`.

## Direction
Stop routine helper-by-helper extraction. The next major phase is a read-only historical-code technical-debt inventory, followed by evidence-based deduplication/refactoring in small, testable batches.

## Rollback
Revert V82.85.17 extraction commit `96f949b43a9168c499d8f8600ffec8efcadd78e8` if necessary. The workflow-only change is independent. Never overwrite V82.82.
