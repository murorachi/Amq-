# First-pass audit: script_031 Chinese title map

Baseline V82.85.28. File src/scripts/script_031.htmlpart.

Disposition: first-pass review complete; no product source change.

Responsibilities: loads pinned Anilist-Chinese and Bangumi data, loads OpenCC, merges Chinese titles and aliases, caches the map in IndexedDB, exposes a shared title/alias API, and refreshes catalogue search and quiz suggestions. Partial readiness is supported when one source fails.

Risks:
- External resources have separate availability and licensing constraints; preserve per-source status and partial-ready behavior.
- The cache is versioned to source revisions; do not change DB/store/key without a migration.
- Work IDs must remain consistent with script_030's AniList map and the EMQ work map.
- Alias filtering and normalization affect quiz answer matching.

Evidence gaps: script_030 now has a structural mapping test. No dedicated exact-source test was found for this loader's IndexedDB cache upgrade, partial-source failure behavior or alias filtering. External source freshness and OpenCC loading remain unverified.

| ID | Risk | Disposition |
|---|---|---|
| ZH-01 | Source merge and partial readiness affect title resolution. | High: preserve source-specific status and fail-soft behavior. |
| ZH-02 | IndexedDB cache is tied to source revisions. | High: no cache key/version change without migration tests. |
| ZH-03 | Alias filtering affects answer acceptance. | Medium/high: add focused contract before changing rules. |

Rollback by reverting this report and matrix reference. Product source is unchanged.
