# Next task: validate V82.85.31 audio timeline wait hardening

Branch: `v82.85.31-audio-timeline-wait-hardening-01`.

## Scope

- Test-only change to `tests/browser/real_audio_output_acceptance.py`.
- Replace the fixed 450 ms initial playback wait with a condition-based wait for `audioEl.currentTime > 0.15`, bounded by a 5-second timeout.
- Replace the fixed post-resume sleep with a condition-based wait for `currentTime` to advance by more than 0.12 seconds from the resumed baseline, also bounded by 5 seconds.
- Keep the pause-freeze observation window, timeline thresholds, and strict PCM gate unchanged.
- Do not change production playback logic or the V82.85.30 candidate HTML.

## Verification required

1. Python syntax/compile check and review the exact diff.
2. Source/unit and deterministic package checks remain green; candidate fingerprint must remain unchanged.
3. Firefox responsive acceptance passes.
4. Run native Chromium audio acceptance repeatedly; verify playback lifecycle assertions and non-silent PCM threshold remain passing.
5. Inspect final GitHub CI logs and confirm remote file fingerprints before closing this stage. Keep the PR test-only and do not merge automatically.

## Current status

- Previous V82.85.30 full CI: PASS [39290498626](https://github.com/murorachi/Amq-/actions/runs/39290498626), all three jobs.
- V82.85.31 test-only changes: PASS in [CI run 39292209164](https://github.com/murorachi/Amq-/actions/runs/39292209164), all three jobs. Native output peak=4899 / RMS=2252.9; candidate fingerprint unchanged.
- Risk: condition-based wait may expose a genuine playback stall as a timeout; that is intentional and more diagnostic than failing after an arbitrary fixed sleep.
- Rollback: revert the timing-only test change and V82.85.31 checkpoint/report docs; preserve V82.85.30 source fix and immutable V82.82.

---

## Historical V82.85.30 task record

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
