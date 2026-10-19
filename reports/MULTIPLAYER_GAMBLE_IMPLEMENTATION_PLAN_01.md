# Multiplayer Gamble Roguelike — Implementation Plan 01

- Status: Stage 1 core prototype committed; rules/ledger unit tests pass in the local working copy. Server, UI, persistence, and live multiplayer are not implemented.
- Work branch: `multiplayer-gamble-engine-discovery-01`.
- Product baseline remains V82.82 standalone HTML, 8,787,490 bytes, SHA-256 `227e89d80fa58db8e8f79c59f1203f06f8bc0663d11228d0986fe6e30f81e91b`.
- Parent discovery record: `reports/MULTIPLAYER_GAMBLE_ENGINE_DISCOVERY_01.md`.

## 1. Recommended delivery strategy

Build a separate, small multiplayer game application/service first. Do not embed new game logic directly into the existing AMQ standalone HTML in the first implementation stage. Keep AMQ integration as a later adapter so that a broken prototype cannot destabilize the existing product.

Recommended trust model: a lightweight authoritative server. During development it runs on the developer's own computer; for friend play it can later be deployed to a small hosted service. The server owns the room/run state, random outcomes, accepted wagers, chip ledger, deadlines, and settlement. Clients submit choices and render server state; they never submit authoritative balances or payout values.

This is a recommendation for discussion, not an assertion that hosting has already been selected or deployed.

## 2. First playable milestone

Target: 2–6 players in one private room, one run, virtual chips only.

Include:
- Create/join room with a room code.
- Host starts and ends a run.
- Each run starts with 1,000 virtual chips per player; balance resets next run.
- A run has 5 stages. Each stage offers a small set of game/event options.
- Players act independently where supported; each game defines its own lock/deadline.
- Server validates and locks bets, resolves the outcome, applies ledger entries once, and broadcasts a result.
- Run-only items can modify one future game or one risk decision.
- Disconnect/rejoin can restore the current public state and the player's own session.
- A round history shows accepted bet, rule version, outcome, payout, and balance delta.

Explicitly out of scope for this milestone:
- Real-money wagering or cash-out.
- Player-to-player transfers.
- Persistent balances between runs.
- Ranked matchmaking, public rooms, account economy, elaborate cosmetics.
- Song playback as a dependency of every game.
- Peer-to-peer fairness protocol.

## 3. Candidate game set

Start with four mechanically distinct games, not six thinly disguised versions of a coin toss.

### Game A — Coin Call (binary probability)
- Player chooses heads or tails.
- Probability of win: 1/2.
- Proposed gross return on a win: 1.9× stake (includes the returned stake).
- Expected gross return per stake: 0.5 × 1.9 = 0.95.
- Expected net return: -0.05 stake, a 5% house edge.
- This is the simplest test fixture for bet validation, locking, settlement, and replay protection.

### Game B — Exact Seven (outcome probability)
- Roll two fair six-sided dice; player wins only if the sum is 7.
- Probability: 6/36 = 1/6.
- Proposed gross return: 5.4× stake.
- Expected gross return per stake: (1/6) × 5.4 = 0.9.
- Expected net return: -0.1 stake, a 10% house edge.
- The payout table must state clearly that 5.4× is total return, not profit plus stake.

### Game C — Vault Push-Your-Luck (stop/continue decision)
- The player chooses a stake, then advances through a sequence of vault steps.
- Each successful step increases the available cash-out multiplier. The player can cash out after a success; failure loses the original stake.
- Candidate success probabilities per step: 0.80, then 0.70, then 0.60.
- Candidate gross cash-out multipliers: 1.20× after step 1, 1.70× after step 2, 2.70× after step 3.
- With independent step outcomes, reaching each cash-out point has probability 0.80, 0.56, and 0.336 respectively. Expected gross return if a player commits to that exact cash-out point is 0.96×, 0.952×, and 0.9072× stake respectively.
- These are starting balance parameters, not final balance: tune them in simulation and playtests. The key mechanic is choosing when to stop, not just selecting a probability.

### Game D — Blind High Card (multiplayer interaction)
- Each participating player contributes a declared stake before the lock deadline.
- The server privately draws one rank per player and reveals all ranks together after lock.
- Highest rank wins the shared pot; ties split the pot evenly, with integer-chip remainder distributed by a documented deterministic rule.
- This is a player-versus-player pooled game, so its expected payout depends on player count and tie rules rather than a fixed house multiplier. The ledger must debit each accepted stake once and credit the pool distribution once.
- No side bets or player-to-player transfers in the first implementation.

Game IDs and rules versions must be stable and explicit. These rules and values remain proposed until approved and independently tested.

## 4. Architecture

Suggested separate workspace layout:
- `server/`: room state machine, rules registry, random outcome generation, bet validation, ledger, event log, API/WebSocket transport.
- `client/`: room lobby, run screen, game-specific UI, inventory, history.
- `shared/`: schema, stable game IDs, protocol types, validation constants.
- `tests/`: deterministic rules tests, probability/payout checks, ledger/idempotency tests, API integration tests, multi-client browser tests.
- `reports/`: design decisions, test reports, acceptance notes.

Preferred initial stack: Node.js with TypeScript for server and shared types; a lightweight HTTP/WebSocket layer; SQLite for durable room/run/ledger records during a small private beta. Keep transport and persistence behind interfaces so the stack can change without rewriting game rules. If the repo's existing toolchain imposes a strong constraint, reassess before implementation.

For local development, use a single command to start the service and a browser client. For friend testing across the internet, localhost alone is insufficient: deploy to a reachable host or deliberately configure a private network tunnel. Do not expose a development server directly to the public internet without authentication and basic abuse protections.

## 5. Core invariants

1. Chip amounts are non-negative integers in one documented unit.
2. The server calculates and validates every accepted wager.
3. A wager is accepted only in the correct phase and before the deadline.
4. A client request carries a unique action/idempotency ID; retries cannot debit twice.
5. Each round can settle at most once, even after duplicate messages or reconnect.
6. An outcome is generated by the server after bets are locked and cannot be supplied by the client.
7. The ledger is append-only at the application level; corrections use compensating entries rather than rewriting history.
8. Room/run state can be recovered after service restart from durable records.
9. Rules version and payout table are stored with each settled round.
10. Disconnect policy and timeout behavior are explicit per game; timeout cannot create a duplicate settlement.

## 6. Implementation stages and gates

### Stage 0 — Plan and decision lock
- Approve or amend trust model, player count, run structure, initial chip balance, and prototype game set.
- Confirm whether Node.js/TypeScript is acceptable.
- No product HTML changes.

### Stage 1 — Rules and ledger core (initial prototype committed)
- Added `gamble-roguelike/src/games.js`: deterministic rule functions for Coin Call, Exact Seven, Vault step resolution, and Blind High Card pot splitting.
- Added `gamble-roguelike/src/ledger.js`: in-memory integer-chip ledger with atomic validation, non-negative balances, and idempotent settlement IDs.
- Added Node's built-in test runner suite at `gamble-roguelike/test/core.test.js` and an isolated package manifest.
- Local working-copy test run: 10 assertions/subtests passed in the fuller working tree; syntax checks passed. The GitHub copy has a consolidated 8-test suite, but its CI result has not yet been verified.
- A GitHub Actions workflow was added to run `npm test` when this workstream changes. No verified workflow run is available yet.
- No network transport yet. Ledger is in-memory and must not be treated as restart-safe or deployed multiplayer authority.

### Stage 2 — Authoritative room service
- Room creation/join, session identity, state machine, deadlines, actions, snapshots, reconnect, durable event/ledger persistence.
- API contract and integration tests.
- Verify restart recovery and simultaneous requests.

### Stage 3 — Minimal browser client
- Lobby, room status, game selection, bet controls, result view, inventory, run progression, round history.
- Test at least two independent browser contexts against one real local service; mocks alone do not pass this gate.

### Stage 4 — Private friend play
- Deploy to a reachable test host, configure authentication and secrets safely, test latency/disconnect/rejoin, inspect logs and backups.
- Do not call this stage complete until external clients complete a full run.

### Stage 5 — Roguelike depth and AMQ adapter
- Add more game modules only after the first four are fun and mathematically checked.
- Add run-only items, route/event choices, and optional song-triggered events.
- Integrate with AMQ through a narrow adapter; do not couple the engine to the existing song-answer state machine.

## 7. Acceptance gates

- All game probabilities and expected returns independently recomputed.
- Unit tests pass for each rule module and ledger invariant.
- Duplicate bet/action/settlement requests do not alter balances twice.
- Two clients cannot submit accepted bets after lock.
- A service restart preserves the room/run/ledger according to the documented policy.
- Two independent clients complete a real run using the service, not mocked endpoints.
- Disconnect, reconnect, timeout, tie, zero balance, invalid action, and host disconnect are covered.
- No existing AMQ product HTML/source is modified in these stages unless a separate scoped integration task is approved.

## 8. Open decisions to discuss

Only these decisions materially block the first implementation:
1. **Authority:** recommended lightweight authoritative server, developed locally first and hosted later. Alternative: host-authoritative casual play with explicitly weaker trust.
2. **Development stack:** recommended Node.js + TypeScript + SQLite for the prototype.
3. **Run format:** proposed 5 stages, 1,000 chips per player, reset each run, 2–6 players.
4. **Prototype games and proposed payouts:** Coin Call, Exact Seven, Vault Push-Your-Luck, Blind High Card as specified above.

Other content (art, names, extra game variety, song events, meta-progression) can be decided after a playable build exists.

## 9. Current limitations

- The pure rules/ledger core is now implemented in an isolated prototype directory; no server, client UI, database persistence, or product HTML has been implemented.
- Local tests passed in the working copy. The committed GitHub copy's CI run has not been verified, and no payout simulation or playtest has occurred.
- The ledger is in-memory only; service restart recovery is not implemented.
- No deployment target, domain, authentication provider, or operational budget has been selected.
- No real two-client run has been performed.
