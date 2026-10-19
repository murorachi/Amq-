# Gamble Roguelike Stage 1 — Core Test Report

- Date: 2026-10-20
- Work branch: \`multiplayer-gamble-engine-discovery-01\`
- Scope: isolated pure game rules and in-memory virtual-chip ledger only.
- Product baseline: V82.82 standalone HTML, 8,787,490 bytes, SHA-256 \`227e89d80fa58db8e8f79c59f1203f06f8bc0663d11228d0986fe6e30f81e91b\`.
- Product HTML/source: unchanged.

## Implemented files

- \`gamble-roguelike/src/games.js\`: Coin Call, Exact Seven, Vault step, Blind High Card payout resolution; integer-chip gross payouts; rule version \`0.1.0\`.
- \`gamble-roguelike/src/ledger.js\`: in-memory ledger, atomic pre-validation, no overdrafts, idempotent settlement IDs.
- \`gamble-roguelike/test/core.test.js\`: consolidated Node built-in test suite.
- \`gamble-roguelike/package.json\`, \`gamble-roguelike/README.md\`.
- \`.github/workflows/gamble-roguelike-core.yml\`: path-scoped Node 22 test workflow.

## Local test evidence

Executed in the isolated working copy with Node.js v22.16.0:

- \`npm test\`: **PASS, 10/10 subtests** in the fuller local working tree.
- \`node --check src/games.js\`: PASS.
- \`node --check src/ledger.js\`: PASS.
- \`node --check test/games.test.js\`: PASS.
- \`node --check test/ledger.test.js\`: PASS.

Covered assertions:
1. Coin Call gross payout includes stake; losing stake and fractional-chip floor behavior.
2. Invalid Coin Call choices and non-positive stakes are rejected.
3. Exhaustive enumeration of all 36 ordered two-die outcomes finds exactly six sums of seven; payout and invalid die boundary are checked.
4. Vault threshold boundaries, step payouts, terminal states and invalid step are checked.
5. Blind High Card pot conservation, ties, deterministic remainder allocation, duplicate player rejection and invalid rank rejection are checked.
6. Ledger settlement deltas and resulting balances are checked.
7. Duplicate settlement ID cannot credit twice.
8. Invalid overdraft settlement leaves balances, entries and settlement state unchanged.
9. Unknown player, zero delta and invalid initial balance are rejected.

An initial local run had one failed assertion because the test fixture expected a remainder from a pot that divided evenly. The fixture was corrected to use a five-chip pot; the game implementation was not changed for that test correction. The subsequent local run passed.

## Remote CI status

- A GitHub Actions workflow was committed at \`.github/workflows/gamble-roguelike-core.yml\`.
- The available GitHub status/workflow query returned no check status or run record for the workflow commit. **Remote CI is therefore unverified**, not passed.
- The committed GitHub tree has a consolidated 8-test suite; the 10/10 result above came from the fuller local working copy. Do not treat that local result as proof that the committed GitHub copy has passed CI.

## Not tested / not implemented

- No server or browser client exists yet.
- No HTTP/WebSocket integration, room creation, authentication, SQLite persistence, restart recovery, reconnect, or external network test.
- No real two-client run.
- No Monte Carlo payout simulation or gameplay playtest.
- No deployment or security review.

## Risks and next step

The ledger is memory-only and is not safe to use as a live multiplayer authority across process restarts. Before server integration, review whether stake debit and payout credit should remain separately auditable ledger entries rather than only aggregated net changes. Next, verify remote CI, independently recalculate expected returns and rounding, then implement the local authoritative room service with durable storage and integration tests.
