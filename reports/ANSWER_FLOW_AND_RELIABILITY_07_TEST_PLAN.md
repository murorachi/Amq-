# V82.66 answer-flow and reliability checkpoint 07 — test plan/results

## Exact-source unit suites

| Suite | Coverage | Result |
|---|---|---:|
| `candidate_pool_policy.test.cjs` | Source-mode normalization, numeric parsing, metadata, familiarity, tag/watchlist/repeat rules | 70 passed, 0 failed |
| `candidate_pool_integration.test.cjs` | Exact candidate IDs/order, filter composition, focus scope, custom-list fallback, null/empty/malformed selections | 27 passed, 0 failed |
| `emq_api_contract.test.cjs` | EMQ/Mixed source composition, song-ID list scopes, work/song identity and adapter contracts | 19 passed, 0 failed |
| `history_status_isolation.test.cjs` | Exact history record source metadata, song-ID familiarity/tag storage, AMQ/EMQ isolation | 7 passed, 0 failed |
| `solo_emq_list_handoff.test.cjs` | Exact solo wrapper + EMQ API adapter list handoff and order | 4 passed, 0 failed |
| `answer_flow_contract.test.cjs` | Playback gate, timer-before-playback, correct/wrong/skip paths, song-ID familiarity, duplicate settlement guard, EMQ handoff | 8 passed, 0 failed |

Node suites total: **135 passed, 0 failed**. Counts are reported as test cases/assertion groups by each existing suite; they are not a claim of browser-level coverage.

## Build and integrity

- `python tools/build.py`: PASS; output is 8,786,930 bytes with SHA-256 `abd202a6f96cc08e0969ad05ab8574cc71001733d655bcb5cff6b1a1a5b33a33`.
- `python tools/verify.py`: 98 passed, 0 failed; builds twice in a temporary directory and confirms byte identity with the locked baseline.
- `python tools/run_all_checks.py`: 8 commands passed, 0 failed.

## Browser/manual checks and limitations

- Headless Chromium could not reach the product document in this environment: direct `file://` navigation was replaced by an organization-policy interstitial, and the localhost-served attempt produced the same interstitial. The initial `--dump-dom` attempt also timed out without DOM output. This is an environment limitation, not evidence that the product passed or failed browser interaction; no browser smoke pass is claimed.
- No manual click-through, real audio/network playback, Firefox, IndexedDB round-trip, or multiplayer multi-device acceptance was completed in this checkpoint.
- Tests use synthetic VM dependencies for answer flow and candidate pool. The existing history suite separately executes the actual history-record source and checks EMQ `source`, `workKind`, work title and aliases.

## Acceptance status

Automated exact-source/build/integrity checks pass. Overall project remains **PARTIAL** pending actual browser/manual product acceptance and the remaining high-risk persistence/multiplayer checks. No production runtime, UI, catalog, storage schema, or generated HTML behavior was changed.
