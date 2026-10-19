# V82.85.17 Quiz answer alias tooltip text extraction report

## Scope
- Branch: `v82.85.13-real-audio-acceptance-gate-01`.
- Parent commit: `57a65b5d572896e7ff458ce2794895e2d715af8d`.
- Implementation commit: `96f949b43a9168c499d8f8600ffec8efcadd78e8`.
- Extracted `quizAnswerAliasTooltipTextV8239()` to `src/modules/quiz_answer_alias_tooltip_text.htmlpart` at the original IIFE position.

## Behavior and dependencies
- Read-only text assembly using the active quiz song, existing name helpers, song catalog and optional EMQ API.
- Preserves AMQ same-title/same-artist related-work lookup, ordering, alias formatting, and EMQ-specific policy wording byte-for-byte.
- No DOM, storage, timer, event API, or application-state writes. Existing ambient lexical dependencies remain unchanged.

## Tests
- Added `tests/unit/quiz_answer_alias_tooltip_text_extraction_contract.test.cjs`, wired into `tools/run_all_checks.py` and GitHub Actions.
- Contract covers module/source fingerprints, marker location, exact restoration, AMQ/EMQ text output, related-song filtering, missing-song behavior, and absence of side-effect APIs.
- Workflow has been triggered by the implementation push; final test status is pending inspection. No tests are marked passed in this report before evidence is available.

## Baseline and rollback
- V82.82: 8,787,490 bytes / SHA-256 `227e89d80fa58db8e8f79c59f1203f06f8bc0663d11228d0986fe6e30f81e91b`.
- V82.85.12 candidate: 8,787,574 bytes / SHA-256 `b804fd66eecfef277d79d86611f589139025097313be937cf96d067cc201e067`.
- Revert implementation commit `96f949b43a9168c499d8f8600ffec8efcadd78e8` and this documentation commit to roll back. Do not overwrite V82.82.


## Verified workflow result

Run [39189090958](https://github.com/murorachi/Amq-/actions/runs/39189090958), commit `4796e2a387542d6b4534589577035c6da4aa7041`:
- Source and unit: PASS; all extraction contracts, deterministic baseline/candidate builds, native storage/custom-list/backup contracts passed.
- Firefox responsive: PASS.
- Chromium native storage/custom-list, IndexedDB/quiz input, quiz suggestion integration and quiz answer/playback lifecycle: PASS.
- Real-browser audio output: FAIL at final PCM assertion only. PulseAudio self-test peak=6999 / RMS=4103.6, but browser monitor capture peak=0 / RMS=0.0. Native decode, playing event, timeline, pause/resume, answer reveal and exit cleanup all passed. Do not weaken the threshold; keep CI capture/routing issue explicitly deferred.
- Multiplayer acceptance: SKIPPED because the audio step failed first. A workflow-only change now adds `if: always()` so multiplayer runs and reports independently in the next CI run.
- Overall workflow conclusion remains FAILURE due to the unresolved PCM assertion. This is not reported as full-green acceptance.

## Project direction
V82.85.17 is the last planned routine helper extraction for now. Next work is a read-only historical code/technical-debt inventory, not more unrelated function extraction.
