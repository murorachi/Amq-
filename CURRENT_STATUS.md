# Current engineering checkpoint: V82.86.06 AMQ／EMQ custom-list backup restore browser acceptance

- Branch: `v82.86.06-custom-list-backup-restore-browser-01`.
- Parent baseline: `v82.86.05-custom-list-id-lifecycle-matrix-01`, commit `1b9b9a6e2e95bb2414968fe6aef1e119bd6ee8dc`.
- Report: `reports/V82_86_06_CUSTOM_LIST_BACKUP_RESTORE_BROWSER_01.md`.
- Changed test: `tests/browser/native_storage_custom_lists_acceptance.py`.
- Scope: browser acceptance only; product HTML/source fragments/JS/CSS/manifest unchanged.
- Verified CI commit: `cbc5fed2d513fa4c01761cd640ea65c160a76146`; run [39166474674](https://github.com/murorachi/Amq-/actions/runs/39166474674) passed both jobs.
- Browser/native-origin job passed: AMQ and EMQ backup inclusion, corrupt-manifest rejection without mutation, injected restore-write failure with exact storage rollback, valid restore of both list IDs/names, actual reload persistence and UI re-render. Existing browser regression steps in that job also passed.
- Source/unit job passed, including deterministic V82.82 build/fingerprint and engineering contracts.
- Product lock: V82.82, 8,787,490 bytes, SHA-256 `227e89d80fa58db8e8f79c59f1203f06f8bc0663d11228d0986fe6e30f81e91b`.
- Immutable V82.65 unchanged.
- The initial CI attempt failed on Python quoting in the test fixture; fixed in commit `cbc5fed2d513fa4c01761cd640ea65c160a76146`, whose complete CI run passed.
- Remaining external gates: Firefox CSS cascade, real audio provider, production-origin storage policy, naturally occurring IndexedDB quota/corruption. The injected write fault does not substitute for those gates.
- Next: give backup/restore contracts a dedicated stable test command and continue the IndexedDB failure matrix. Do not infer full modularization completion.

## Separate workstream: multiplayer Gamble Roguelike discovery

- Status: **design/discovery only; no product implementation**.
- Work branch: `multiplayer-gamble-engine-discovery-01`.
- Design record: `reports/MULTIPLAYER_GAMBLE_ENGINE_DISCOVERY_01.md`.
- Base: V82.86.06 branch head `6bfe40908ae81e391c42ceeabb20896cac55ab50`; immutable product baseline remains V82.82 at 8,787,490 bytes / SHA-256 `227e89d80fa58db8e8f79c59f1203f06f8bc0663d11228d0986fe6e30f81e91b`.
- Read-only inspection found that the current multiplayer client uses a configurable HTTP API base, bearer-token authentication, and a WebSocket route for team drafts. Client fragment: `src/scripts/script_028.htmlpart`, blob SHA `b89ed0014f02ae156b6c66b607feb2639024eae9`.
- **Blocker:** current server implementation/deployment configuration was not found in the inspected repository tree. Existing multiplayer browser tests mock API/WebSocket/media and do not establish live-server correctness.
- No live server was contacted; no tests were run for this documentation checkpoint; no source or product HTML was changed.
- Next gate: locate current server source and its deployed version, or explicitly decide to build a new server service. Only then specify the authoritative bet/wallet/settlement API.
