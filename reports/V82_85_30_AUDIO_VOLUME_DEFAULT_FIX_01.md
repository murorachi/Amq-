# V82.85.30 audio volume default fix

## Baseline and root cause

- Branch: `v82.85.30-audio-volume-default-fix-01`, based on the V82.85.29 diagnostic checkpoint.
- Immutable V82.82 baseline: 8,787,490 bytes / SHA-256 `227e89d80fa58db8e8f79c59f1203f06f8bc0663d11228d0986fe6e30f81e91b`.
- Diagnostic CI: [39286354693](https://github.com/murorachi/Amq-/actions/runs/39286354693).
- The browser media element was `muted=true`, `volume=0`, `paused=false`, `readyState=4`; PulseAudio had no sink-input in ten samples. The known-good PulseAudio capture self-test succeeded, but browser PCM peak/RMS were both zero.
- Root cause: the initializer converted missing `aniQuizVolume` (`null`) with `Number(null)`, yielding 0 and overwriting the intended 70% default.

## Change

- Only parse `aniQuizVolume` if the stored value exists and is non-empty.
- Continue honoring explicitly stored `0`, valid saved nonzero volume, and clamp valid values to 0–100.
- Add `tests/unit/quiz_volume_default_contract.test.cjs` with ten assertions across missing, zero, and nonzero preferences.
- Update the fragment manifest and versioned candidate/package naming to V82.85.30.
- Do not change audio lifecycle code or relax the PCM acceptance threshold.

## Verification status

- Diagnostic root-cause evidence: PASS.
- New unit contract: local execution PASS, 10/10 assertions; CI execution pending.
- First reconstructed candidate: 8,786,609 bytes / SHA-256 `3eb23d8711b5c5d504513ad72595b6177392c6865abd49ae0a93dea1d2de14d2`. Manifest release fingerprint has been updated; CI confirmation of deterministic rebuild is pending.
- Native Chromium output: pending; must pass peak >= 1000 and RMS >= 150.
- Firefox responsive and remaining regression jobs: pending.

## Rollback

Revert the V82.85.30 volume initializer, regression contract, manifest/workflow/package metadata, and stage documents as one stage. Preserve V82.85.28 and immutable V82.82.
