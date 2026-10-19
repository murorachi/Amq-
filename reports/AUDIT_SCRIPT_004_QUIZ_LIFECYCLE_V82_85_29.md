# First-pass audit: script_004 quiz lifecycle

Baseline: V82.85.28. File: src/scripts/script_004.htmlpart. Source blob: fe3a6992ce26e7f06c9eb68b0464e9e9fc3be3f4.

Disposition: first-pass file review complete; no production source change in this audit step. The high-risk coupling is documented and deferred, not marked as fixed.

## Responsibilities

1. Quiz view creation and entry/exit.
2. Settings loading, persistence, migration, theme and focus-plan backup/restore.
3. AMQ/EMQ candidate pool composition and target configuration.
4. Question selection, audio-start gating, skip/unplayed handling, answer classification and submission.
5. Playback clip timer, progress ticker, auto-next timer, pause/resume and cleanup.
6. Suggestion UI and answer-normalization modules, practice metadata, reveal information and draggable detail UI.
7. Integration through global APIs and custom events for navigation, history, familiarity and audio failure.

## Static observations

- 88,549 characters; 436 lines; 35 named function declarations and 8 arrow-function declarations detected by conservative patterns; 10 split-module markers.
- Core mutable state includes quizActive, quizSong, quizStartedAt, quizFinished, quizAudioStarted, lastQuestionId and currentQuestionTarget.
- Persistent settings and migrations include aniQuizSettingsV14, aniQuizSelectionSemanticsV8265, aniV8261RandomSampleDefaultMigrated, aniCollectionThemeV18, aniChineseAnswerSuggestionsEnabledV8239, practice metadata and focus-plan backup settings.
- Timer ownership is distributed across clip timeout, playback ticker/stop timer and auto-next timeout/interval. Their distinct pause/resume semantics must remain separate unless a focused test proves equivalence.
- The source registers many listeners and has no general removeEventListener call. This is a lifecycle ownership review point, not proof of a leak: the script appears to initialize as a singleton view.
- Existing module markers and global bridges are compatibility boundaries. Avoid moving markers or changing song/work identifiers without updating their exact-source contracts.

## Existing evidence

- tests/unit/answer_flow_contract.test.cjs: exact-source VM contract for unplayed questions, timer expiry, valid audio, correct/wrong/skip answers, anime/title targets, EMQ identifiers and duplicate settlement. The report records 8 passed cases; dependencies are synthetic.
- tests/unit/lifecycle_boundary_contract.test.cjs: source contracts for answer, playback, storage, custom-list, EMQ and multiplayer boundaries.
- tests/browser/quiz_answer_playback_lifecycle.py: deterministic browser lifecycle acceptance using a media stub.
- Run 39230015840: source/unit passed 132/132; Firefox responsive passed. Browser logs show question selection, playback start, timer gating, reveal, pause/resume, next-question audio and exit cleanup passing. Only final non-silent output capture failed (peak=0, rms=0.0). User-confirmed actual playback remains the product reference; this capture mismatch is not evidence of a product regression.

## Findings

| ID | Finding | Risk | Disposition |
|---|---|---|---|
| Q4-01 | Answer settlement, audio-start guard and timers share mutable quiz state. | High | Preserve existing contracts; characterize further before refactoring. |
| Q4-02 | Clip, playback and auto-next timers have distinct deadlines and cleanup. | High | Do not merge into a generic timer helper. |
| Q4-03 | Settings, migration, theme, practice metadata and focus backup share the fragment. | Medium/high | Keep each storage key/migration as a compatibility boundary. |
| Q4-04 | Some features are extracted into modules but remain connected through markers/global bridges. | Medium | Reuse existing module contracts. |
| Q4-05 | Listener ownership is mixed between persistent document and dynamic UI handlers. | Medium | Defer changes until repeated initialization or a leak is reproduced. |
| Q4-06 | Dense source layout makes named-function/source-boundary tests more reliable than line-based review. | Medium | No formatting-only rewrite. |

## Coverage gaps

Partially covered: all settings/migration combinations, every stale media-event ordering, repeated floating-panel open/close, and repeated view initialization. Not established: full manual interaction across all settings, external multiplayer service behavior, and non-silent CI output capture.

## Recommendation and rollback

No production source change. Continue with the next P1 fragment, script_028, using the same evidence-first review. Revert this report and its matrix/status references to roll back; product source and V82.82 baseline are unchanged.
