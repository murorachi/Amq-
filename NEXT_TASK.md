# Next task: one final bounded non-audio duplicate-candidate audit

Branch: `v82.85.28-next-audio-state-reset-dedup-01`.
Baseline before V82.85.32 documentation update: `78ded6791e9591c4b4cce1529f10bb0f474a03bc`.

## Completed candidate

Inspected the duplicate answer-mirror input listeners in `src/scripts/script_008.htmlpart` and `src/scripts/script_009.htmlpart`.

**Decision: reject consolidation.** Both copy the answer input into the mirror, but their `ani-quiz-new-question` behavior differs. Script 008 clears the mirror; script 009 clears and then synchronizes the current input. A mechanical merge could change visible behavior depending on event timing.

- No product source, manifest, generated HTML, or immutable artifact changed.
- No focused test or product rebuild was run because no production change was made.
- The baseline documentation CI [39296906101](https://github.com/murorachi/Amq-/actions/runs/39296906101) passed all three jobs.
- Report: `reports/V82_85_32_NON_AUDIO_MIRROR_LISTENER_DEDUP_AUDIT_01.md`.

## Next action and stop condition

Inspect **one additional** non-audio candidate. If it is also behaviorally distinct or only cosmetically similar, stop historical dedup auditing and return to product feature development. Do not expand this into a broad cleanup campaign.

## Guardrails

- Preserve immutable V82.82 and the deterministic package/release-manifest rules.
- Do not revisit or weaken the closed audio-output acceptance gate.
- Any production change must have a focused contract test before source modification, followed by source fingerprint, deterministic candidate/package, Firefox responsive, and native-origin CI checks.
- Roll back this documentation-only stage by reverting the report and matching status/baseline/next-task updates.

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
