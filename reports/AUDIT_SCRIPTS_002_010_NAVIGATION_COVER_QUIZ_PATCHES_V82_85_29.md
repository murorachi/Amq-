# First-pass audit: scripts 002-010 navigation, cover and quiz integration

Baseline V82.85.28. This grouped report contains a separate finding/disposition for each listed fragment. No product source changed.

## script_002 — navigation and watchlist
Owns allowed view routing, quiz deactivation on exit, visibility classes and watchlist rendering. Main risk is navigation order: leaving quiz must invoke cleanup before switching view. Existing browser responsive and lifecycle acceptance exercise view changes; no storage writes were found in this fragment. Keep routing allowlist and cleanup handoff intact.

## script_003 — ANN cover loader
Owns batched Anime News Network XML requests, XML parsing, cover result mapping, queue processing and dashboard rendering. Main risk is external network failure, malformed XML and request batching. Keep the batch boundary and fail-soft diagnostics; this is not a catalog-source-of-truth. No dedicated exact-source contract was identified in the reviewed test list.

## script_005 — audio dock information/status controls
Adds dock information visibility and familiarity-status buttons. It writes through script_001's shared status/save APIs and refreshes stats/rendering. Main risk is shared global coupling and repeated listener attachment if the script is initialized more than once. Keep the existing DOM guard assumptions; no standalone unit contract was found.

## script_006 — quiz mode/audio control patch
Resets the timer label outside quiz mode and toggles native audio controls/visibility based on navigation. It also reads quiz settings. Main risk is overlapping audio ownership with the main quiz controller. Preserve the rule that seeking/sample position and elapsed-time display each have an established owner.

## script_007 — VNDB character/avatar integration
Loads a VNDB character for the configured ID and displays a small avatar/answer mirror. It reads character/settings keys and performs external fetch. Risks are stale request results, external API failure and event handlers attached to quiz controls. No dedicated exact-source contract was found for this fragment's fetch lifecycle.

## script_008 — answer mirror and alias matching
Mirrors the live answer, derives current-song aliases from AMQ/EMQ/Chinese title APIs and participates in suggestion/answer matching. This is correctness-sensitive: keep target-specific alias sources and Unicode normalization semantics. Existing suggestion helper/controller/renderer contracts cover adjacent modules but do not imply every legacy event in this fragment is independently tested.

## script_009 — avatar and answer layout adjustment
Synchronizes the answer mirror and moves the avatar relative to the active countdown/playback labels. It is DOM-layout glue with input listeners. Main risk is stale DOM assumptions after UI changes; require browser visual/input checks before moving nodes.

## script_010 — retired submit-skip preference migration and avatar alignment
Normalizes aniQuizSettingsV14 so the retired submitSkipPhase setting is false, then aligns the avatar to playback labels. This is a migration side effect and UI layout patch in one fragment. Preserve the migration's one-way compatibility behavior and audio-continuity rule.

## Shared findings

| ID | Risk | Disposition |
|---|---|---|
| NAV-01 | View routing and quiz cleanup cross fragment boundaries. | High: preserve exit/deactivation order. |
| COVER-01 | ANN/VNDB fetches can fail independently of the app. | Medium: retain fail-soft UI and avoid blocking initialization. |
| QUIZ-PATCH-01 | Several legacy scripts attach listeners and manipulate the same quiz DOM. | High: no broad deletion/merging based on apparent duplication alone. |
| QUIZ-PATCH-02 | Answer mirror, aliases and target normalization affect correctness. | High: use existing suggestion contracts and browser regression gates. |
| QUIZ-PATCH-03 | script_010 migrates a persisted setting while changing layout. | Medium/high: keep migration behavior explicit and separate from future UI cleanup. |

## Validation and limitations

The latest completed source/unit job before this report passed 132/132. Existing quiz suggestion, answer-normalization and responsive/browser tests protect adjacent behavior. No dedicated test was found for every ANN/VNDB network failure, repeated initialization of each legacy patch, or all avatar DOM arrangements. This is a first-pass review, not a claim of exhaustive user-interaction coverage.

Rollback: revert this report and its matrix entries; product source is unchanged.
