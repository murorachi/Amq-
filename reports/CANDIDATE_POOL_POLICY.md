# Candidate-pool policy contract: V82.65

## Evidence and scope

The policy under test is extracted at runtime from the byte-preserved block in `src/scripts/script_004.htmlpart`, between `V82.65_POOL_POLICY_BEGIN` and `V82.65_POOL_POLICY_END`. The test does not copy/reimplement the rules and does not change product code. It executes the exact block in a Node VM with only a minimal `window` host.

The block is installed as `window.__aniCandidatePoolPolicyV8265` and is consumed by `getQuizPool()` in the same script fragment. The base AMQ pool applies rules in this observed order:

1. Remove songs without a nonblank title field (`s[4]`).
2. Remove songs flagged by `__aniHistoryAPIv51.isBlacklisted`.
3. If focus-learning mode is active, restrict to `activeFocusSongIdsV72`; if no focus IDs remain, return an empty pool with a status message. In focus mode, repeat exclusion is applied when `quizSettings.noRepeat` is enabled, then the base function returns.
4. Otherwise apply quick-pool rule (`all`, `unmarked`, `heard`, `hard`, `tagged`).
5. Apply selected familiarity statuses.
6. Require a matching anime record and apply watch-status filter.
7. Apply metadata rules: song type, year/unknown-year, and for AMQ specifically difficulty, season, and anime type.
8. Apply tag requirement and tag text query.
9. If watchlist-only is active, require a recognized watchlist membership.
10. Apply repeat filter using seen IDs and last question ID.
11. If the pool is empty, report the current filters rather than widening the pool automatically.
12. If no-repeat is enabled and more than one candidate remains, exclude the last question ID again as a final guard.

A later assignment wraps `getQuizPool()` and then applies EMQ/Mixed combination, audio health eligibility, and custom-list scope. The wrapper fails closed when the custom-list scope helper throws or returns a non-array. If the custom-list scope helper is unavailable while custom-list scope settings indicate it is required, the wrapper returns an empty list instead of silently broadening the pool.

## Contract test coverage

`tests/unit/candidate_pool_policy.test.cjs` currently has 70 assertions covering source mode, numeric parsing, song type, setting/range parsing, difficulty, year and unknown-year handling, season/type, familiarity status, quick pools, tags, watchlist, blacklist, repeat exclusion, metadata validation, and detection of AMQ-specific restrictions.

Run:

```powershell
node tests\unit\candidate_pool_policy.test.cjs
```

The test imports no production module and does not need a browser. It tests the existing policy block, not the complete `getQuizPool()` integration or the live EMQ combiner.

## Important semantics locked by current implementation

- Invalid source mode normalizes to `amq`.
- Numeric booleans, arrays, objects, non-finite values, and malformed numeric strings are rejected.
- Missing/zero song type maps to type `5`.
- Missing difficulty is allowed as unknown; difficulty `0` is treated as unknown and passes any otherwise valid range.
- Missing/zero year is controlled by `unknownYear` (default included).
- EMQ metadata skips AMQ-specific difficulty/season/anime-type checks, but still uses song type and year checks.
- The `hard` quick pool uses status 0 and difficulty 0–20 for AMQ; the EMQ path currently bypasses those AMQ status/difficulty restrictions.
- Enabled watchlist status filtering with an empty selection rejects all rows.
- Enabled repeat prevention rejects empty IDs, seen IDs, and the immediately previous ID.

These behaviors are recorded as current implementation semantics, not necessarily ideal product policy. Any intended change requires a separately reviewed policy decision and explicit expected-output changes.

## Not covered yet

- Exact candidate ID lists/order from representative catalog fixtures.
- End-to-end `getQuizPool()` with real DOM, settings, blacklist, custom lists and history API.
- EMQ/Mixed aggregation behavior for duplicate IDs, source collisions, missing audio, and source-mode settings.
- Timer/event lifecycle, answer settlement, history/familiarity updates, backup/restore, browser/audio/network behavior.
