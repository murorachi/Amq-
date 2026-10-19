# V82.85.16 Quiz practice metadata getter extraction report

## Scope
- Branch: `v82.85.13-real-audio-acceptance-gate-01`
- Source: `src/scripts/script_004.htmlpart`
- Module: `src/modules/quiz_practice_meta_getter.htmlpart`
- Extracted declaration: `getQuizPracticeMetaV8239(songId)`
- Change: exact-source extraction at the original IIFE position. No script loading or runtime wrapper added.

## Behavior and dependency review
The getter reads the existing lexical `quizPracticeMetaV8239` object, converts `songId` with `String(songId)`, and returns the stored truthy value or `null`. The contract deliberately preserves these semantics, including falsy-value fallback. It does not mutate records or access DOM, storage, timers, or browser APIs.

## Automated checks
The new production-source contract covers manifest byte length and SHA-256, marker uniqueness and location, exact declaration restoration, numeric/string/missing/null keys, falsy record fallback, object identity/no mutation, and absence of DOM/storage/timer dependencies. The test is wired into the full check runner and engineering CI.
The V82.85.15 workflow was inspected: source-and-unit and Firefox responsive jobs passed, including the target-value contract, source fingerprints, and deterministic build. The overall workflow remains failed only at the known Chromium PCM capture gate (zero captured peak/RMS). This does not count as an audio pass.
The V82.85.16 tests/build are pending until the new push-triggered workflow is inspected. No test is reported as passed before execution evidence exists.

## Release and rollback
The candidate must remain byte-identical to V82.85.12 (8,787,574 bytes; SHA-256 `b804fd66eecfef277d79d86611f589139025097313be937cf96d067cc201e067`). Immutable V82.82 remains 8,787,490 bytes; SHA-256 `227e89d80fa58db8e8f79c59f1203f06f8bc0663d11228d0986fe6e30f81e91b`.
Rollback by reverting the V82.85.16 source/module/manifest/test/runner/workflow/docs commits. Do not replace the formal V82.82 baseline.
