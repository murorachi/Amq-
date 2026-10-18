# V82.81 Answer / Playback / Storage / Multiplayer Boundary Map

This is a dependency and acceptance-gate map, not a claim that these areas are already decoupled. No production behavior was changed by this inventory.

| Boundary | Main risk | Required gate before extraction |
|---|---|---|
| Answer submission | High | Exact-source answer-flow contract plus real playback acceptance; keep song IDs and audio-start guards. |
| Audio playback lifecycle | High | Verify stale media events, timers, canplay/playing/ended/error transitions, and cleanup against real audio. |
| History and SRS persistence | Critical | Native localStorage/IndexedDB persistence and restore rollback must pass on an allowed localhost origin. |
| AMQ custom practice lists | High | Work IDs and song IDs remain distinct; malformed or stale selected scope must fail closed. |
| EMQ lists and metadata | High | Verify EMQ song/work IDs, VNDB mapping, membership union, aliases/audio metadata and full-backup round-trip. |
| Multiplayer | Critical | Real service, two independent clients, reconnect/leave/rejoin, duplicate events and audio transitions. |
| CSS | High | Review component map, compare screenshots, check responsive geometry and cross-browser rendering before moving rules. |

## Current environment acceptance

- Full deterministic runner: see `reports/V82_81_VALIDATION_RESULTS.txt`.
- Native localhost acceptance was attempted against V82.80, but Chromium navigation returned `net::ERR_BLOCKED_BY_ADMINISTRATOR` before the page loaded. No production-origin storage claim is made.
- CSS reference screenshots are `reports/visual-baselines/v82_81_home.png` and `reports/visual-baselines/v82_81_quiz.png`. Geometry baseline is in `reports/visual-baselines/V82_81_VISUAL_BASELINE.json`.
- This map is based on source inspection and existing tests; external audio/network and multi-client acceptance remain open.
