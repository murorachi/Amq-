# Baseline checkpoint: V82.85.21 real-audio capture investigation

- Branch: `v82.85.18-source-inventory-gate-01`.
- User-designated base commit: `715e7a6d734a487a21f8c866093431edd2f4938d`.
- Source inventory completeness and package completeness/reproducibility guards remain in place.
- Generic `getElementById` helper consolidation was rejected due negligible benefit; see `reports/V82_85_20_HELPER_DEDUP_DECISION_01.md`.
- Workflow run [39194836859](https://github.com/murorachi/Amq-/actions/runs/39194836859): source/unit and Firefox responsive passed; browser-native-origin failed at real audio output capture. PulseAudio self-test succeeded, but Chromium playback produced no PulseAudio sink inputs and captured PCM remained silent. Other quiz and multiplayer checks passed. See `reports/V82_85_21_REAL_AUDIO_CAPTURE_INVESTIGATION_01.md`.
- An ALSA routing test-harness experiment did not affect the failure and was reverted in `192481509c20fa26ba1f994def0224285f76cb12`. Production source and generated HTML remain unchanged.
- Immutable V82.82 baseline: 8,787,490 bytes / SHA-256 `227e89d80fa58db8e8f79c59f1203f06f8bc0663d11228d0986fe6e30f81e91b`.
- Product candidate HTML fingerprint remains 8,787,574 bytes / SHA-256 `b804fd66eecfef277d79d86611f589139025097313be937cf96d067cc201e067`.

## Scope rule

Do not treat media timeline advancement as proof of audible output. Preserve the non-silent PCM gate until the browser output path is genuinely verified. Do not declare full browser acceptance while a required job fails.

## Rollback

The ineffective test-only change has been reverted. Revert this report and the associated status/task documentation if needed. Never modify or replace immutable V82.82.
