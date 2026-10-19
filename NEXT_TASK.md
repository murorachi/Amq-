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

- Run `node tests/unit/quiz_volume_default_contract.test.cjs`.
- Run source verifier, deterministic build, package completeness/reproducibility and Firefox responsive tests.
- Run native Chromium audio acceptance; verify sink-input appears and captured PCM has peak >= 1000 and RMS >= 150.
- Confirm playback lifecycle assertions still pass.
- Confirm CI rebuild matches 8,786,609 bytes / SHA-256 `3eb23d8711b5c5d504513ad72595b6177392c6865abd49ae0a93dea1d2de14d2` and verify the manifest release fingerprint.
- Verify GitHub Actions results and remote file fingerprints before declaring completion.

## Status and rollback

- Local regression contract: PASS, 10/10 assertions.
- First candidate reconstruction: 8,786,609 bytes / SHA-256 `3eb23d8711b5c5d504513ad72595b6177392c6865abd49ae0a93dea1d2de14d2`; release manifest updated, full CI rerun pending.
- Do not change production audio lifecycle logic or weaken the PCM gate.
- Roll back by reverting the V82.85.30 source, contract, manifest/workflow/package metadata and checkpoint docs together. Keep V82.85.28 and immutable V82.82 intact.
