# Current engineering checkpoint: V82.85.21 real-audio capture investigation

- User-designated base commit: `715e7a6d734a487a21f8c866093431edd2f4938d`.
- Working branch: `v82.85.18-source-inventory-gate-01`.
- Latest investigation report: `reports/V82_85_21_REAL_AUDIO_CAPTURE_INVESTIGATION_01.md`.
- Reverse source inventory and package completeness/reproducibility guards remain in place.
- Generic helper deduplication was rejected as negligible benefit; see `reports/V82_85_20_HELPER_DEDUP_DECISION_01.md`.
- Workflow run [39194836859](https://github.com/murorachi/Amq-/actions/runs/39194836859): source/unit passed; Firefox responsive passed; browser-native-origin failed at the final audio output assertion (`peak=0, rms=0.0`). Its PulseAudio self-test captured non-silent PCM, but during Chromium playback there was a `chrome` client and no PulseAudio sink inputs. Other native-origin checks, including quiz input, persistence, answer/playback lifecycle, and multiplayer lifecycle, passed.
- A test-only ALSA routing experiment did not change the result and was reverted. Revert commit: `192481509c20fa26ba1f994def0224285f76cb12`. No production source or generated HTML changed.
- Full browser acceptance is **not passed** while the audio-output gate fails.
- Product candidate fingerprint remains 8,787,574 bytes / SHA-256 `b804fd66eecfef277d79d86611f589139025097313be937cf96d067cc201e067`; immutable V82.82 remains 8,787,490 bytes / SHA-256 `227e89d80fa58db8e8f79c59f1203f06f8bc0663d11228d0986fe6e30f81e91b`.

## Direction

Next investigate Chromium audio backend/device initialization logs in the failing CI environment. Do not weaken the non-silent assertion or change production playback without a proven cause.

## Rollback

The ineffective test-only change is already reverted. Revert the investigation report/status/task documentation if needed. No product rollback is required. Never overwrite immutable V82.82.
