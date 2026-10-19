# Next task

## Active discovery track: multiplayer Gamble Roguelike
Branch: `multiplayer-gamble-engine-discovery-01`.

The product direction is a multiplayer probability-game Roguelike. Gambling mechanics are primary; AMQ songs are optional supporting content. This is a separate workstream from the V82.82 maintenance baseline.

### Completed in this checkpoint
1. Confirmed the latest referenced engineering branch is V82.86.06 and based the discovery branch on its head commit `6bfe40908ae81e391c42ceeabb20896cac55ab50`.
2. Inspected the current multiplayer client and relevant engineering notes.
3. Added `reports/MULTIPLAYER_GAMBLE_ENGINE_DISCOVERY_01.md` defining the proposed engine boundaries, game taxonomy, wallet/probability invariants, acceptance gates, and unresolved design choices.
4. Confirmed the current repository tree does not contain the server implementation/deployment config for the room API. Existing browser multiplayer acceptance uses mocks.

### Next bounded task
1. Locate the currently deployed room API server source, exact commit/version, and deployment configuration; do not expose secrets.
2. Confirm the live REST/WebSocket contract, persistence model, authentication, and restart/reconnect behavior.
3. If the server source cannot be located, write an explicit new-server proposal including hosting/deployment and migration requirements.
4. Do not add authoritative betting, virtual balances, or random outcomes in client-only code.
5. Before implementation, specify the first small set of mechanically distinct games and verify each probability/payout table mathematically.
6. Keep this workstream separate from V82.82; do not modify the existing standalone product unless a scoped implementation plan is approved.

## Existing AMQ maintenance task (separate/deferred by this discovery branch)
The V82.86.06 maintenance checkpoint still recommends:
1. Add a dedicated stable CI command for `backup_restore_contract.test.cjs`, `full_backup_restore_roundtrip_contract_v82_83.test.cjs`, and `custom_list_source_contract.test.cjs`.
2. Continue the IndexedDB failure matrix: open/blocked/upgrade, transaction failure, quota/corruption, rollback and reload.
3. Keep Firefox CSS cascade, real audio provider, production-origin storage policy, and naturally occurring IndexedDB quota/corruption as separate gates.
4. Do not change product source until test evidence identifies a product defect.

## Rollback
Revert the documentation-only commit(s) on `multiplayer-gamble-engine-discovery-01`. No product rollback is required because product source and generated HTML are unchanged.
