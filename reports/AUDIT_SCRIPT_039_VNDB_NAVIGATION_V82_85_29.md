# First-pass audit: script_039 VNDB catalogue navigation

Baseline V82.85.28. File src/scripts/script_039.htmlpart. Source blob 5044121904e20eb1ee6e66546213dcc8f02260ac.

Disposition: first-pass review complete; no production source change.

## Profile
- 31,143 characters, 98 lines, 39 named functions detected by conservative pattern.
- 21 event-listener registrations, 9 localStorage references and 3 fetch calls.
- Main keys: aniQuizSettingsV14, aniVNWatchlistV1 and aniVNDBCoversV8249. External API base is https://api.vndb.org/kana.

## Responsibilities
- Mount catalogue/list navigation and home groups for VN works.
- Fetch and render VNDB catalogue/list data, manage search/filter/pagination limits and work/song panels.
- Cache cover URLs, retry visible cover loads and handle image errors.
- Import VNDB personal lists, normalize watch-list status and switch source mode.
- Open selected works/artists in the shared catalogue and mount quiz/multiplayer metadata panels.

## Risks
- Network request errors, API rate limits and stale responses need to remain separate from local list persistence.
- VNDB IDs, EMQ work IDs and EMQ song IDs must not be conflated during import or selection.
- Cover caching and retry logic can create repeated network work; preserve visibility checks and render limits.
- UI panels mount into existing view structures; keep idempotence and navigation behavior.

## Existing evidence and gaps
- The current tree has custom-list and EMQ handoff contracts that protect ID mapping, but no dedicated exact-source unit contract for script_039 was found in the inventory reviewed.
- Existing browser custom-list UI acceptance exercises related UI but is not a full live VNDB network test.
- External fetch behavior, rate limiting, imported list freshness and cover retry races remain partially covered.

## Findings
| ID | Risk | Disposition |
|---|---|---|
| VN-01 | External VNDB requests feed view state and imports. | High: keep request failures isolated; add focused contract before refactoring. |
| VN-02 | List import crosses VNDB and EMQ identifier domains. | High: preserve explicit mapping and source IDs. |
| VN-03 | Cover cache/retry and view mounting are asynchronous. | Medium: no timer/cache consolidation without browser regression tests. |

No production source change. Rollback by reverting this report and matrix references.
