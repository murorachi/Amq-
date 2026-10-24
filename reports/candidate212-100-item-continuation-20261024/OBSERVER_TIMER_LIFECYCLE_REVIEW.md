# Candidate212 Observer / Timer Lifecycle Review

Date: 2026-10-24
Source: Candidate212 readable Library text export; static scan only, not a byte-identical raw-source scan.

## Inventory results

| Mechanism | Constructor / call occurrences | Cleanup calls | Initial disposition |
|---|---:|---:|---|
| `MutationObserver` | 51 | 7 `.disconnect()` calls across the document | Needs owner/teardown mapping |
| `ResizeObserver` | 2 | No global count guarantees instance cleanup | Needs owner/teardown mapping |
| `IntersectionObserver` | 4 | 1 `.unobserve()` plus some `.disconnect()` usage | Verify per-observer target lifecycle |
| `setTimeout` | 142 | 38 `clearTimeout` calls | Do not assume each timeout needs cancellation; trace delayed work and owner lifetime |
| `setInterval` | 10 | 9 `clearInterval` calls | Verify remaining interval is intentionally page-lifetime or identify leak |
| `requestAnimationFrame` | 34 | No dedicated cancellation inventory yet | Trace frame loops and route teardown |
| `AbortController` | 2 | Signals appear in 4 request options | Verify network cancellation on view changes |
| `DOMContentLoaded` listeners | 14 | Several use `{once:true}`; not all were individually verified | Confirm each module's single-entry contract |
| `pagehide` listeners | 3 | Not applicable to listener cleanup in a page-lifetime document | Check persistence/teardown side effects |
| `visibilitychange` listeners | 3 | Not applicable to listener cleanup in a page-lifetime document | Check timers/audio when tab hidden |
| `popstate` listeners | 2 | Not applicable to listener cleanup in a page-lifetime document | Confirm router ownership and back-navigation behavior |
| `history.pushState` / `replaceState` | 0 / 0 | N/A | No direct History API writes found by this scan |
| `document.write` / `eval` / `new Function` | 0 / 0 / 0 | N/A | No direct use found by this scan |

## High-value review targets

The following scripts own observer-heavy or long-lived behavior and should be traced before any deletion or consolidation:

- `v44-submit-pipeline-and-volume`: volume reapplication observer. Likely intentional while the quiz audio element can be replaced, but no explicit disconnect was found in the local script block. Confirm whether one observer per page is guaranteed and whether it can be reused.
- `v77-interval-repetition`: three mutation observers plus timers. Confirm widgets are mounted once, observers target stable nodes, and delayed refreshes are cancelled when the owning view closes.
- `amq-workspace-prototype-15-script`: four mutation observers around song-list/discovery/learning-plan UI. Determine whether these are intentionally application-lifetime or can be replaced by one scoped observer/delegated event.
- `candidate76-workspace-panel-shell-runtime`, `candidate103-songselect-layout-owner`, `candidate106-final-songselect-layout-owner`, `candidate99-osu-stable-songselect-ui-runtime`, and `candidate193-final-route-guard`: overlapping generations of Song Select/workspace layout and route watchers. These are high-priority dependency-map candidates because they observe global body attributes or route state and may duplicate responsibilities. Do not delete by version number alone; identify current owner, consumers and visual behavior first.
- `candidate185-modal-lifecycle-guard`: four mutation observers. Check whether modal closures disconnect or merely hide their observed nodes.
- `candidate210-songselect-behavior-rebuild`: two mutation observers and one intersection observer; one explicit `unobserve` was found. Verify observers do not accumulate when the song list is rerendered.
- `candidate71-user-feedback-runtime`: four mutation observers and two intersection observers. Trace whether each is global, scoped, or tied to transient feedback elements.
- `v82-40-watchlist-and-solo-quiz-layout-script`: one resize observer; confirm it is created once and targets remain valid after view changes.

## Interpretation rules

- A missing `.disconnect()` is not proof of a leak: some observers are intentionally created once and live for the entire page.
- A global body observer can be correct if its callback is cheap and idempotent, but can cause repeated work if multiple prototype layers observe the same attribute or child list.
- A timeout that fires once does not necessarily need `clearTimeout`; delayed callbacks that mutate detached DOM or stale route state do.
- An interval with a corresponding `clearInterval` path still needs runtime proof that the clear path executes on close/navigation.
- Never remove a listener or observer merely to improve the count. First record owner, target, callback, activation condition, teardown path, and a test proving the behavior remains intact.

## Test status

- PASS: static occurrence inventory executed against the readable text export.
- NOT RUN: observer counts before/after repeated route switching, timer/interval counts after closing workspaces, callback activity after DOM removal, audio replacement, and browser memory/performance checks.
- BLOCKED: real browser navigation to `file://` and localhost in the current environment, according to prior environment records.

## Recommended next verification

In a browser-capable environment, instrument constructor/disconnect counts by script owner; repeatedly enter/leave Song Select, watchlist/custom lists, quiz and learning workspaces; assert counts plateau after the first mount; then assert no callbacks mutate detached UI after teardown. Only then classify individual observer/timer code as Keep, Integrate, Delete, or Needs confirmation.