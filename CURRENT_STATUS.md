# Current engineering checkpoint: V82.86.06 AMQ／EMQ custom-list backup restore browser acceptance

- Branch: `v82.86.06-custom-list-backup-restore-browser-01`.
- Parent baseline: `v82.86.05-custom-list-id-lifecycle-matrix-01`, commit `1b9b9a6e2e95bb2414968fe6aef1e119bd6ee8dc`.
- Report: `reports/V82_86_06_CUSTOM_LIST_BACKUP_RESTORE_BROWSER_01.md`.
- Changed test: `tests/browser/native_storage_custom_lists_acceptance.py`.
- Verified CI commit: `cbc5fed2d513fa4c01761cd640ea65c160a76146`; run [39166474674](https://github.com/murorachi/Amq-/actions/runs/39166474674) passed both jobs.
- Browser/native-origin job passed: AMQ and EMQ backup inclusion, corrupt-manifest rejection without mutation, injected restore-write failure with exact storage rollback, valid restore of both list IDs/names, actual reload persistence and UI re-render. Existing browser regression steps in that job also passed.
- Source/unit job passed, including deterministic V82.82 build/fingerprint and engineering contracts.
- Product lock: V82.82, 8,787,490 bytes, SHA-256 `227e89d80fa58db8e8f79c59f1203f06f8bc0663d11228d0986fe6e30f81e91b`.
- Immutable V82.65 unchanged.
- The initial CI attempt failed on Python quoting in the test fixture; fixed in commit `cbc5fed2d513fa4c01761cd640ea65c160a76146`, whose complete CI run passed.
- Remaining external gates: Firefox CSS cascade, real audio provider, production-origin storage policy, naturally occurring IndexedDB quota/corruption. The injected write fault does not substitute for those gates.
- Next: give backup/restore contracts a dedicated stable test command and continue the IndexedDB failure matrix. Do not infer full modularization completion.

## Separate workstream: multiplayer Gamble Roguelike

- Status: **Stage 1 rules/ledger prototype committed; no product HTML changed**.
- Work branch: `multiplayer-gamble-engine-discovery-01`.
- Discovery record: [`reports/MULTIPLAYER_GAMBLE_ENGINE_DISCOVERY_01.md`](https://github.com/murorachi/Amq-/blob/multiplayer-gamble-engine-discovery-01/reports/MULTIPLAYER_GAMBLE_ENGINE_DISCOVERY_01.md).
- Implementation proposal: [`reports/MULTIPLAYER_GAMBLE_IMPLEMENTATION_PLAN_01.md`](https://github.com/murorachi/Amq-/blob/multiplayer-gamble-engine-discovery-01/reports/MULTIPLAYER_GAMBLE_IMPLEMENTATION_PLAN_01.md).
- Stage 1 test report: [`reports/MULTIPLAYER_GAMBLE_STAGE1_CORE_TEST_REPORT.md`](https://github.com/murorachi/Amq-/blob/multiplayer-gamble-engine-discovery-01/reports/MULTIPLAYER_GAMBLE_STAGE1_CORE_TEST_REPORT.md).
- Parent product baseline remains V82.82, 8,787,490 bytes, SHA-256 `227e89d80fa58db8e8f79c59f1203f06f8bc0663d11228d0986fe6e30f81e91b`.
- Existing multiplayer client inspection found configurable HTTP API and WebSocket route references in `src/scripts/script_028.htmlpart`, blob SHA `b89ed0014f02ae156b6c66b607feb2639024eae9`. The user clarified that the existing multiplayer feature substantively does not use a conventional server; therefore, absence of server source is not treated as a search failure or a blocker for new-game design.
- Recommended direction: separate lightweight authoritative service for the new game; develop locally first, then host only when friends need always-on access. Host-authoritative private play remains a lower-infrastructure alternative with weaker trust.
- Proposed first playable scope: 2–6 players, 1,000 virtual chips per run, five stages, reset balances each run, four mechanically distinct candidate games, run-only items, no real money/cash-out/transfers.
- Added isolated prototype files under `gamble-roguelike/`: pure rules for four game candidates, in-memory chip ledger, Node test suite, package manifest, README, and a scoped GitHub Actions workflow.
- Local working-copy checks: 10/10 subtests passed; Node syntax checks passed. A GitHub workflow was added, but no verified remote CI result is available yet.
- No HTTP/WebSocket server, room service, browser client, durable database, or deployment exists. The ledger does not survive process restart. No real two-client run has been performed.
- Next gate: verify CI against the committed files, tighten rules/ledger edge cases, then implement the authoritative local room service and persistence in a separate bounded step.
