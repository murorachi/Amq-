# Next task: verify V82.85.30 audio volume default fix

Branch: `v82.85.30-audio-volume-default-fix-01`.

## Confirmed root cause

CI run [39286354693](https://github.com/murorachi/Amq-/actions/runs/39286354693) reported:
- media element: `muted=true`, `volume=0`, `paused=false`, `readyState=4`;
- source was a valid WAV mirror and the decoded timeline advanced;
- PulseAudio sink-input was absent across ten samples;
- capture self-test succeeded (peak 6999, RMS 4131), while browser PCM was peak 0 / RMS 0.

The volume initializer used `Number(localStorage.getItem('aniQuizVolume'))`. When no value exists, `getItem` returns `null` and `Number(null)` becomes 0. The slider then applies zero volume and mutes the player. This is a product initialization defect exposed by a clean browser profile, not evidence that Chromium's audio service itself is broken.

## Current changes

1. Guard preference parsing against a missing or empty value; keep 70% as default.
2. Preserve explicit stored 0 and valid saved nonzero values.
3. Add a 10-assertion unit contract and run it in CI.
4. Update fragment manifest, V82.85.30 candidate/package naming, and stage docs.
5. Keep the native audio PCM gate unchanged.

## Required verification

- V82.85.30 full validation is green in run [39290498626](https://github.com/murorachi/Amq-/actions/runs/39290498626); see status below.
- Next bounded task: inspect and, if the test structure permits, replace the fixed 450 ms media-timeline delay with a condition-based wait. This must remain test-only; preserve the currentTime advancement threshold and strict non-silent PCM gate. Add/retain explicit timeout failure diagnostics. Run the native-origin test repeatedly before considering this timing-risk item closed.
- Keep PR #3 open until the test-timing decision and final docs are reviewed; do not merge automatically.

## Status and rollback

- Local regression contract: PASS, 10/10 assertions.
- Latest full CI run [39290498626](https://github.com/murorachi/Amq-/actions/runs/39290498626): PASS all three jobs. Source verifier 132/132; deterministic candidate 8,786,609 bytes / SHA-256 `3eb23d8711b5c5d504513ad72595b6177392c6865abd49ae0a93dea1d2de14d2`; package reproducibility PASS; Firefox responsive PASS; Chromium audio lifecycle PASS; non-silent PCM PASS (peak=4899, RMS=2384.5).
- PR #3 is open, mergeable, and targets V82.85.28; not merged.
- Do not change production audio lifecycle logic or weaken the PCM gate.
- Roll back by reverting the V82.85.30 source, contract, manifest/workflow/package metadata and checkpoint docs together. Keep V82.85.28 and immutable V82.82 intact.
