# V82.85.21 real-audio capture investigation checkpoint

## Baseline and scope

- Repository: `murorachi/Amq-`
- Branch: `v82.85.18-source-inventory-gate-01`
- User-designated base commit: `715e7a6d734a487a21f8c866093431edd2f4938d`
- Product source and generated HTML were not changed.
- The test-only ALSA routing experiment was committed as `c0272409bba85f109ee8b6c119e45f5e5bf9d0e2`, then reverted as ineffective in `192481509c20fa26ba1f994def0224285f76cb12`.

## Acceptance evidence

Workflow run [39194836859](https://github.com/murorachi/Amq-/actions/runs/39194836859):
- `source-and-unit`: passed.
- `browser-firefox-responsive`: passed.
- `browser-native-origin`: failed at the real-audio output gate.
- The native-origin checks before the audio gate passed, including real-origin persistence/custom-list checks, quiz input/suggestions, answer/playback lifecycle and page-error checks. Multiplayer lifecycle steps also passed after the audio step failed.
- PulseAudio self-test continued to capture audible PCM (peak 6999, RMS about 4131).
- During Chromium playback, PulseAudio reported a `chrome` client but no sink inputs; the final monitor still measured `peak=0, rms=0.0`.
- The ALSA `ALSA_CONFIG_PATH` default-device routing experiment did not change the result. It was reverted instead of being retained as dead configuration.

## Decision

The failure is not explained by the monitor itself: its self-test passes. The current evidence points to Chromium not creating an audible PulseAudio sink input in this CI setup, despite media decoding/playback events and timeline progression. This is a working diagnosis, not a proven root cause.

Do not weaken or remove the non-silent assertion. Do not change production playback based only on this test-harness symptom.

## Tests and limitations

- Source/unit suite: passed on the workflow run.
- Firefox responsive: passed.
- Native-origin audio output assertion: failed, `peak=0, rms=0.0`.
- Other native-origin checks: passed as listed above.
- ALSA routing workaround: tested in CI and shown ineffective, then reverted.
- Manual audio device testing: not performed.
- Full browser acceptance: not passed.

## Rollback and next action

The ineffective test change has already been reverted. No product rollback is required.

Next bounded task: collect Chromium's actual audio backend/device initialization diagnostics during the failing run and establish why no sink input is created. Keep the test's non-silent output assertion. Only after the backend failure is identified should a new harness fix be proposed.
