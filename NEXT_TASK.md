# Next task: bounded non-audio duplicate-candidate audit

Branch: `v82.85.28-next-audio-state-reset-dedup-01`.
Baseline HEAD: `0a642c9043b88684bbee0c7fe628e1635d7b7e73`.

## Goal

Resume the historical technical-debt cleanup now that V82.85.31 is merged and post-merge CI is green. Keep this as one small, evidence-led task rather than broad cleanup.

## Scope and guardrails

1. Inspect one concrete **non-audio** repeated-logic candidate in the current source.
2. Trace the owning functions, lexical scope, callers, and observable behavior before deciding whether it is truly redundant.
3. If behavior differs or the only benefit is cosmetic, record a rejection and move on; do not force consolidation.
4. If the candidate is equivalent, add a focused contract test before changing production source.
5. Preserve the V82.82 immutable baseline, deterministic packaging, current release manifest rules, and all existing browser acceptance gates.
6. Do not revisit or weaken audio-output acceptance. V82.85.31 is closed.

## Latest verified checkpoint

- V82.85.31 merge commit: `0a642c9043b88684bbee0c7fe628e1635d7b7e73`.
- Post-merge CI [39296217244](https://github.com/murorachi/Amq-/actions/runs/39296217244): PASS, all three jobs.
- Source verifier: 132/132; Firefox responsive: PASS; Chromium native-origin: PASS.
- Audio capture peak=4899 / RMS=2358.8, with sink-input present in all ten samples.
- Product candidate fingerprint unchanged: 8,786,609 bytes / SHA-256 `3eb23d8711b5c5d504513ad72595b6177392c6865abd49ae0a93dea1d2de14d2`.

## Acceptance for the next task

- Candidate and decision documented.
- If changed: focused regression contract, source/module fingerprint updates, deterministic candidate/package checks, Firefox responsive and native-origin CI.
- If rejected: documentation-only result with explicit evidence; no production source change.
- Rollback must preserve the current official HEAD and immutable V82.82.

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
