# V82.85.20 bounded helper deduplication decision

## Scope and baseline

- Repository: `murorachi/Amq-`
- Branch: `v82.85.18-source-inventory-gate-01`
- User-designated base commit: `715e7a6d734a487a21f8c866093431edd2f4938d`
- Inspected source: `src/scripts/script_004.htmlpart`
- Candidate: two local declarations of `const g = id => document.getElementById(id)`

## Inspection and decision

The helper occurs exactly twice in the inspected source, once inside `readQuizSettingsUI()` and once inside `loadQuizSettings()`. Each declaration is local to a different function. Its uses in each case refer to DOM elements by ID and rely on the same native `document.getElementById` operation.

The declarations are behaviorally equivalent, but moving them to a shared enclosing scope would create an additional shared binding and touch the quiz IIFE's scope structure for a trivial reduction of one repeated expression. There is no demonstrated maintenance or correctness benefit sufficient to justify that scope change. **Decision: reject consolidation; keep both local helpers.**

No production source, manifest, generated HTML, UI, or runtime behavior was changed. No focused runtime test was added because the candidate was rejected and no behavior changed.

## CI acceptance status reviewed

Workflow run [39193924298](https://github.com/murorachi/Amq-/actions/runs/39193924298):
- `source-and-unit`: passed (132 checks).
- `browser-firefox-responsive`: passed.
- `browser-native-origin`: failed in `tests/browser/real_audio_output_acceptance.py` at the final captured-output assertion. The test's own PulseAudio self-test captured non-silent PCM, and browser checks passed for native playback events, timeline advancement, pause/resume, answer reveal, exit cleanup, and absence of uncaught page errors. The final browser output capture nevertheless reported `peak=0, rms=0.0`. This is a real failed acceptance check, not a pass. The run's other native-origin checks, including IndexedDB, quiz input/suggestions, and multiplayer lifecycle, passed.

This failure appears localized to the audio output capture/assertion path based on the available log, but its root cause has not yet been proven. Do not label full browser acceptance as passed.

## Tests and limitations

- Candidate source inspection: passed; two occurrences and their enclosing functions identified.
- Production tests for this decision: not run; production source was unchanged.
- CI source/unit and Firefox responsive: passed as recorded above.
- CI browser audio output acceptance: failed as recorded above.
- Actual interactive manual acceptance: not performed in this stage.

## Rollback and next action

No production rollback is required. Revert this report and its status/task documentation updates if needed.

Next highest-value task: investigate the failing real-audio output capture assertion in isolation. Compare captured monitor PCM, sink routing, capture start/stop timing, and the final measurement path; make the smallest test-only correction if evidence proves the test harness is wrong. Do not weaken the assertion or change production audio behavior without evidence.
