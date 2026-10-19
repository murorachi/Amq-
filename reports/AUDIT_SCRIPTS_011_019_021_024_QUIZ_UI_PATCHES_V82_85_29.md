# First-pass audit: scripts 011-019, 021-024 quiz UI patches

Baseline V82.85.28. This grouped report records a separate scope and disposition for each fragment. No product source changed.

- script_011: diagnostic listener records the last classified song ID. It has no production playback behavior; keep the marker passive.
- script_012: manual submit bridge, quiz controls and random-sample setting. It calls the shared answer-submission API and reads quiz settings. Preserve one Enter/submit owner and sample-position ownership.
- script_013: MutationObserver restores audio dock visibility after quiz mode. Preserve original inline display and avoid competing style owners.
- script_014: mounts and persists quiz volume control. Keep range clamping, stored key aniQuizVolume and active media-volume synchronization.
- script_015: history/blacklist dialog and familiarity controls. It relies on history API and Chinese title lookup; preserve history IDs and blacklist semantics.
- script_016: home audio dock volume/mute, random source mode and playback pool selection. It touches local settings and the current media element; preserve source-specific filtering and playback cleanup.
- script_017: answer feedback overlay listens to answer/new-question events. It is display-only; keep stale feedback cleared on the next question.
- script_018: answer glow and target persistence. It writes the chosen target into aniQuizSettingsV14; preserve target values and event cleanup.
- script_019: home menu/navigation toggles and learning-center actions. Preserve navigation bridge calls and expanded-state accessibility attributes.
- script_021: answer placeholder and playing-state class. It must not stop audio during reveal.
- script_022: answer glow event fallback wraps classifyQuiz when needed. It has an idempotence marker; preserve capture order and avoid double-wrapping.
- script_024: elapsed-time label, paused clock and frozen result display. Keep elapsed time separate from clip-remaining countdown.

## Shared risks

| ID | Risk | Disposition |
|---|---|---|
| UI-PATCH-01 | Several small fragments bind to the same quiz DOM/events. | High: don't delete or merge by apparent duplication without browser proof. |
| UI-PATCH-02 | Submit and classifyQuiz wrappers depend on listener/capture order. | High: preserve one-submit semantics and answer-flow contract. |
| UI-PATCH-03 | Audio dock visibility, volume and playback have different owners. | Medium/high: preserve original inline style and media state. |
| UI-PATCH-04 | Target settings and volume use persistent keys. | Medium: no key/schema changes during cleanup. |
| UI-PATCH-05 | Elapsed clock, clip countdown and paused clock represent different measures. | Medium/high: do not consolidate them into one timer. |

## Evidence and limits

The existing answer-flow, suggestion, lifecycle and browser acceptance suites cover adjacent behavior. They do not prove every patch can be initialized repeatedly or every possible event ordering is safe. No focused contract was found for every fragment in this group. These are first-pass reviews, not proof that every line is defect-free.

Rollback by reverting this report and matrix entries; product source is unchanged.
