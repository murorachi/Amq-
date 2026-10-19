# Next task

## Active workstream: multiplayer Gamble Roguelike

Branch: `multiplayer-gamble-engine-discovery-01`.

The product direction is a multiplayer probability-game Roguelike. Gambling mechanics are primary; AMQ songs are optional supporting content. This is separate from the V82.82 maintenance baseline.

### Completed
1. Confirmed the referenced engineering baseline is V82.86.06 and created a separate discovery branch from commit `6bfe40908ae81e391c42ceeabb20896cac55ab50`.
2. Inspected the existing multiplayer client and relevant engineering notes. The user clarified that the existing multiplayer feature substantively does not use a conventional authoritative server; do not treat missing server source as a blocker or infer a transport model from client route names alone.
3. Added `reports/MULTIPLAYER_GAMBLE_ENGINE_DISCOVERY_01.md` defining engine boundaries, game taxonomy, ledger/probability invariants, authority options, and acceptance gates.
4. Added `reports/MULTIPLAYER_GAMBLE_IMPLEMENTATION_PLAN_01.md` with a proposed first playable scope, architecture, four game candidates and initial payout calculations, staged implementation gates, and open decisions.
5. Updated `CURRENT_STATUS.md`, `BASELINE.md`, and this `NEXT_TASK.md` to record the separate workstream and its actual status.

### Next bounded task: decision lock, then rules core
1. Confirm the proposed authority model: lightweight authoritative service, developed locally first and hosted later if always-on friend access is needed. If serverless hosting is a hard requirement, explicitly accept the trust limitations or design a verifiable peer protocol before implementation.
2. Confirm the proposed development stack (Node.js + TypeScript + SQLite), initial room size (2–6), 1,000 starting chips per run, five-stage run, and per-run balance reset.
3. Review the four proposed games and their payout values in `reports/MULTIPLAYER_GAMBLE_IMPLEMENTATION_PLAN_01.md`.
4. After these decisions are accepted, implement only pure game-rule functions and the virtual-chip ledger in a separate source area. Do not integrate into the existing standalone AMQ HTML yet.
5. Add deterministic unit tests for odds, expected values, bounds, invalid actions, ties, integer-chip rounding, idempotent debit/settlement, and duplicate/retried requests.
6. Independently recalculate the payout tables and record test output before adding API/WebSocket transport.

### Acceptance gates before network implementation
- All proposed game odds and expected returns are independently verified.
- Unit tests pass for rules and ledger invariants.
- Duplicate requests cannot debit or settle a round twice.
- Rules versions and payout tables are recorded with settled rounds.
- No product HTML/source or existing multiplayer behavior is modified.
- Test output distinguishes executed checks from unexecuted real-client checks.

### Existing AMQ maintenance workstream (separate)
The V82.86.06 maintenance checkpoint still recommends:
1. Add a dedicated stable CI command for `backup_restore_contract.test.cjs`, `full_backup_restore_roundtrip_contract_v82_83.test.cjs`, and `custom_list_source_contract.test.cjs`.
2. Continue the IndexedDB failure matrix: open/blocked/upgrade, transaction failure, quota/corruption, rollback and reload.
3. Keep Firefox CSS cascade, real audio provider, production-origin storage policy, and naturally occurring IndexedDB quota/corruption as separate gates.
4. Do not change product source until test evidence identifies a product defect.

## Current status and rollback
- Gamble Roguelike is at planning/design stage only. No server, client, database, or deployment exists yet.
- No tests were run for the planning-document update. No real two-client run has been performed.
- Product baseline remains V82.82; no product rollback is required.
- Roll back this workstream by reverting its documentation-only commits on `multiplayer-gamble-engine-discovery-01`.
