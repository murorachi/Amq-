# V82.85.31 audio timeline wait hardening

## Motivation

CI runs [39289800143](https://github.com/murorachi/Amq-/actions/runs/39289800143) and [39291809331](https://github.com/murorachi/Amq-/actions/runs/39291809331) exposed intermittent fixed-delay timeline failures despite an active PulseAudio sink-input. Run 39291809331 specifically reported currentTime=0 after 450 ms. The new condition-based assertions passed in [run 39292209164](https://github.com/murorachi/Amq-/actions/runs/39292209164).

## Change

- In `tests/browser/real_audio_output_acceptance.py`, replace the initial 450 ms sleep with a bounded wait for `audioEl.currentTime > 0.15`.
- After resuming, wait for the actual timeline to advance more than 0.12 seconds beyond its captured baseline.
- Preserve existing assertions and the 350 ms pause-freeze observation window.
- No production HTML or audio logic changes.

## Test plan and status

- Static diff review: completed; no product HTML or audio lifecycle code changed.
- Python syntax/compile and source/unit workflow: PASS in run [39292209164](https://github.com/murorachi/Amq-/actions/runs/39292209164).
- Source verifier 132/132; deterministic candidate and package repeatability: PASS. Candidate remains 8,786,609 bytes / SHA-256 `3eb23d8711b5c5d504513ad72595b6177392c6865abd49ae0a93dea1d2de14d2`.
- Firefox responsive: PASS.
- Native Chromium lifecycle and strict non-silent PCM output: PASS; media muted=false, volume=0.7, sink RUNNING, sink-input observed in all ten samples, PCM peak=4899 / RMS=2252.9. Both condition-based timeline assertions passed.
- Expected V82.85.30 candidate fingerprint unchanged: 8,786,609 bytes / SHA-256 `3eb23d8711b5c5d504513ad72595b6177392c6865abd49ae0a93dea1d2de14d2`.

## Rollback

Revert the timing-only wait change and this report/checkpoint update. Keep V82.85.30 volume fix and immutable V82.82 intact.
