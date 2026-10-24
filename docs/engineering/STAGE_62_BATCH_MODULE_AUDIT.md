# Stage 62 — Batch module and caller audit

## Scope
Source-level audit of Candidate281 after Stage 61 removed the duplicate batch navigation entry. No HTML changes were made in this stage because deleting or merging the remaining batch module requires deciding which bulk operations become first-class controls in list management and then testing their data effects.

## Confirmed findings
1. **Batch UI still has real independent behavior.** The song batch workspace exposes bulk familiarity status (`heard`, `known`, `instant`, reset), tag assignment/removal, blacklist/unblacklist, and add/remove custom-list membership. Removing the entire module without integrating these operations would remove functionality, not just duplicate navigation.
2. **The former VNDB action is hijacked by the batch module.** In `candidate210-songselect-behavior-rebuild`, the click handler rewrites `data-c99-action="vndb"` to `song-batch`; `apply()` also selects a `vndb` entry and renames it “歌曲批次整理”. This conflicts with the separate import handler that expects VNDB import to enter the shared import workspace. This is a concrete routing collision and should be fixed at the source, not by CSS.
3. **Bulk selection persists in a module-global `Set`.** The `selected` set is not cleared when the workspace closes or when AMQ/EMQ catalog mode changes. The UI rechecks rows from the set when rendered. This may leave stale IDs selected across a catalog switch; cross-catalog ID collision behavior has not been runtime-tested. Treat as a risk, not a confirmed data-corruption event.
4. **Song-row checkbox UI and batch mode are controlled by shared global state.** `updateBatchCount()` toggles `body.amq-batch-mode`, and CSS reveals row checkboxes/changes row grid geometry based on that class. The close/back listener removes the class and search-hidden class, but it does not clear the selected set.
5. **MutationObserver lifecycle remains unverified.** The batch search observer is attached to `#amqSongSelectTracklist` and marked with a dataset flag. If that tracklist element itself is replaced, the existing observer is not disconnected by this code. Whether the owning list is replaced or only its children are replaced must be verified in a browser before changing lifecycle behavior.
6. **Work-batch API must remain for now.** Several separate callers invoke `window.__amqCandidate210OpenWorkBatchWorkspace` (workspace actions and selection tools). Deleting the API based only on removing the duplicate sidebar entry would break those callers.

## Disposition
- **Delete:** duplicate `批次維護` entry group, its dead action branches, and auto-created duplicate work-batch rail entry (already done in Candidate281).
- **Integrate:** bulk familiarity, tag, blacklist, and custom-list add/remove actions into the formal list-management workspace only after interaction and persistence tests define the replacement UI.
- **Fix next:** remove the VNDB-to-song-batch action rewrite so VNDB continues through the shared import handler; verify exact rail markup and event-handler order first.
- **Keep temporarily:** work-batch implementation and API due to independent call sites.
- **Not verified:** stale selected IDs across AMQ/EMQ mode switches, observer leak after tracklist replacement, and behavior after workspace route changes.

## Tests
- PASS: source grep confirms the remaining batch APIs have independent callers.
- PASS: source inspection confirms VNDB action is rewritten to song-batch in both click handling and `apply()`.
- PASS: source inspection enumerates song-batch operations and close behavior.
- NOT RUN: browser click routing, AMQ/EMQ switching with selected songs, mutation observer replacement, list-membership save/remove, status/tag/blacklist writes, route/back navigation.
- BLOCKED: browser runtime automation is unavailable in this environment; Playwright/Puppeteer/jsdom are not installed.

## Rollback
No HTML changes in Stage 62. Candidate281 remains unchanged. Candidate280 remains the direct parent rollback point.
