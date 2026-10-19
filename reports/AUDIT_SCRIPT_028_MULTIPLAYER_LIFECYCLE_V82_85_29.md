# First-pass audit: script_028 multiplayer lifecycle

Baseline: V82.85.28. File: src/scripts/script_028.htmlpart. Source blob: a800148f240b6ccd38f5a9136a80dd71bbaca6c3.

Disposition: first-pass file review complete; no production source change in this audit step. Multiplayer remains a high-risk mixed-responsibility boundary, so this is not a recommendation for a broad rewrite.

## Static profile

- 131,503 characters; 449 lines; 120 named function declarations and 8 arrow-function declarations detected by conservative patterns.
- 27 addEventListener calls and 3 removeEventListener calls.
- 12 setTimeout calls, 3 setInterval calls, 6 WebSocket references, 4 fetch calls, 2 new Audio calls, 6 play calls and 19 pause calls.
- Storage is split across localStorage preferences/history/profile keys and sessionStorage room credentials. Dynamic per-room history cursor keys are also used.
- Function count is a pattern-based indicator, not a semantic complexity score; nested callbacks and compact one-line functions affect the count.

## Responsibilities found

1. Preference defaults, migration from solo quiz settings, persistence and profile loading.
2. AMQ/EMQ custom-list scope, VNDB personal-list import, song/work identifier mapping and candidate-pool filtering.
3. Room API URL normalization, REST request timeouts, create/join/rejoin and session/reconnect credential lifecycle.
4. Room settings validation, personal settings UI, pool refresh and candidate-scope invalidation.
5. Room state rendering, player cards, team answer drafts, chat, result tables and question history.
6. Polling, heartbeat, WebSocket authentication/retry and team-draft synchronization.
7. Quiz timer state, audio candidate fallback, preloading/activation, video handling, volume and playback lifecycle.
8. History reconciliation, Chinese-title alias synchronization and EMQ state hydration.
9. Leave/cleanup paths for polling, sockets, timers, audio/video and saved session credentials.

## Boundaries and risks

- Room/session ownership is spread across create/join/rejoin, polling, WebSocket and leave paths. Keep stale-response protection and ensure leave cannot reopen a room.
- Local preferences, session credentials, reconnect records and history cursors have different lifetimes. Do not merge their storage helpers or rename keys as cleanup.
- AMQ work IDs, AMQ song IDs, EMQ work IDs, EMQ song IDs and VNDB IDs are not interchangeable. Preserve source-mode and selected-list fail-closed behavior.
- Candidate-pool refresh depends on room phase, host/guest role and a signature of settings. Do not consolidate refresh/invalidation logic without proving these branches equivalent.
- Active audio, preloaded next audio and video have separate resource lifetimes. The V82.85.25/V82.85.28 helpers centralize narrow repeated logic, but teardown and promotion must remain caller-owned.
- The file calls REST APIs and opens WebSockets. Current browser lifecycle tests use deterministic API/WebSocket/media mocks; they do not prove behavior against a live external service with two independent real clients.
- Event listeners, poll timers, heartbeat and reconnect timers require lifecycle-specific cleanup. Existing functions are the boundary; do not replace them with a generic lifecycle manager without focused characterization.

## Existing evidence reviewed

- tests/unit/multiplayer_room_pool_bounds_validation_contract.test.cjs: 14 assertions for shared range validation, message uniqueness, accepted/rejected bounds and error precedence.
- tests/unit/multiplayer_next_audio_state_reset_dedup_contract.test.cjs: 12 assertions for single reset owner, consumers and cleared state.
- tests/unit/multiplayer_audio_failure_callback_contract.test.cjs: protects the shared failure callback and pending/active/stale event paths.
- tests/browser/multiplayer_lifecycle_acceptance.py: deterministic browser lifecycle using API, WebSocket and media mocks. Latest run 39230015840 logs showed room creation, start, preparing/running transitions, team draft sync, pause/resume/reveal/next, reconnect, leave cleanup, and stale poll response rejection passing.
- Run 39230015840 source/unit passed 132/132 and Firefox responsive passed. The browser-native job's only failed step was final non-silent audio output capture (peak=0, rms=0.0); multiplayer lifecycle assertions passed. Actual product playback was user-confirmed. Manual live-service/two-client acceptance was not performed.

## Findings

| ID | Finding | Risk | Disposition |
|---|---|---|---|
| MP-01 | Room/session transitions cross REST, poll, WebSocket and persisted credentials. | Critical | Keep lifecycle browser contracts; expand only for a reproduced race or concrete feature. |
| MP-02 | Pool selection mixes solo settings, AMQ/EMQ list scopes, watch status and VNDB data. | Critical | Preserve ID domains and fail-closed selected-scope rules; no generic pool rewrite. |
| MP-03 | Audio/video lifecycle includes active, next, fallback and watchdog paths. | High | Preserve media teardown/promotion boundaries; do not alter playback to simplify state. |
| MP-04 | Poll, heartbeat, live reconnect and async requests use different timer/abort ownership. | High | Keep cleanup in the owning functions; test stale responses and leave/rejoin behavior. |
| MP-05 | Rendering, chat, results, title hydration and settings share one fragment. | Medium/high | Future extraction only at a pure/render boundary with exact-source tests; no broad UI rewrite. |
| MP-06 | Multiple storage keys encode different persistence lifetimes and backward compatibility. | High | No key rename/schema consolidation during audit. |

## Coverage gaps

Partially covered: real API compatibility, simultaneous real clients, network-loss timing across all phases, browser storage quota/errors, and every AMQ/EMQ/VNDB scope combination. Existing mocks are strong lifecycle regression checks but are not equivalent to a live service test.

## Recommendation and rollback

No production source change. The next P1 review should determine whether script_037 is primarily a data payload before treating its size as code complexity, then review the remaining large scripts. Revert this report and its matrix/status references to roll back; product source and V82.82 baseline remain unchanged.
