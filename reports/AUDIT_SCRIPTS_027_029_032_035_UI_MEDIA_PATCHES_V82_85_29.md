# First-pass audit: scripts 027, 029, 032-035

Baseline V82.85.28. This grouped report records a separate disposition for each fragment. No product source changed.

- script_027: a single split-module marker for storage_repository. It is a build boundary, not executable behavior in this fragment. Preserve exact marker count/position; the module has its own storage repository contract.
- script_029: quiz reveal video and media controls. It uses a one-time root marker, separate video candidate list, an epoch/token for stale callbacks, a persisted video preference, and audio/video mirrors. Keep video cleanup separate from quiz audio lifecycle and preserve fallback order.
- script_032: idempotent quiz layout adjustment that moves avatar, answer mirror, input and remaining-time elements. It depends on current DOM structure; preserve its dataset guard.
- script_033: watchlist/solo-quiz layout rearrangement, including answer navigation and playback labels. Preserve element ownership and do not move controls before answer handlers bind.
- script_034: global audio dock collapse/expand and watch-card decoration. It persists aniAudioDockCollapsed_v843 and treats home/quiz layouts differently from other views. Keep aria state and view-specific behavior aligned.
- script_035: coordinates detail drawer state with dock collapse state and observes overlay changes. It prevents the dock from covering details; preserve observer idempotence and restore behavior.

## Risks

| ID | Risk | Disposition |
|---|---|---|
| MEDIA-UI-01 | Reveal video and quiz audio have separate source, fallback and cleanup lifetimes. | High: do not merge their state machines. |
| UI-LAYOUT-01 | Small layout fragments reorder shared DOM elements. | Medium/high: require browser geometry/input regression before changing. |
| UI-DOM-01 | Dataset guards and MutationObservers make initialization order significant. | Medium/high: preserve idempotence and observer ownership. |
| BUILD-01 | script_027 is a module marker, not a behavior block. | Low: protect exact module marker and module contract. |

Existing responsive and quiz lifecycle browser suites cover adjacent behavior. No dedicated exact-source contract was found for every UI patch in this group. These reviews do not establish every viewport or repeated-initialization combination.

Rollback by reverting this report and matrix references; product source is unchanged.
