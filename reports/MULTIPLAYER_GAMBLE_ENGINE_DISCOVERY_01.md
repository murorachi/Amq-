# Multiplayer Gamble Roguelike — Discovery & Architecture Spec 01

- Status: **Discovery checkpoint; no product code changed**
- Work branch: `multiplayer-gamble-engine-discovery-01`
- Parent commit: `6bfe40908ae81e391c42ceeabb20896cac55ab50`
- Product baseline remains V82.82 standalone HTML, 8,787,490 bytes, SHA-256 `227e89d80fa58db8e8f79c59f1203f06f8bc0663d11228d0986fe6e30f81e91b`.
- This is a separate game-design workstream. It does not replace the existing AMQ maintenance baseline.

## 1. Product direction

Build a multiplayer game whose primary activity is varied probability games, risk/reward decisions, items, random events, and Roguelike progression. AMQ songs are supporting atmosphere/content and may trigger special events; every game mechanic must remain fun without requiring song knowledge.

Core rule: **do not force every gambling game to depend on guessing a song**. Guessing and gambling are separate systems. Song knowledge must not be the primary determinant of virtual-chip wealth.

Initial scope is virtual chips only. No real-money wagering, cash-out, or exchange of chips for money.

## 2. Core loop (proposal)

1. Start a run with a defined virtual-chip balance.
2. Select from available games or receive a randomized game/event.
3. Submit bets and player choices before the server-enforced lock time.
4. Server resolves the result using the published rules and probability model.
5. Apply settlement exactly once; grant chips, items, or effects.
6. Choose whether to continue, take a safer route, or risk progression rewards.
7. Advance through stages until the objective is met or the run ends.

The first prototype should validate the loop with a small set of mechanically distinct games, not a large catalog.

## 3. Game-content taxonomy

The engine should support game modules with genuinely different decision structures:

- Pure chance: wheel, coin, dice, lottery pool.
- Stop-or-continue: mine exploration, escalating reward ladder, push-your-luck.
- Probability selection: choose a probability tier with corresponding payout.
- Hidden information: mystery reward, risk contract.
- Multiplayer interaction: shared pool, auction, team-versus-individual event.
- Roguelike modifiers: items and run rules that alter later decisions.

A reskin alone does not qualify as a new game. Each module should differ in at least one of: decision type, risk structure, information available, player interaction, or cross-round effect.

## 4. Engine boundaries

### Game registry / rules modules
Each game module declares:
- Stable game ID and version.
- Allowed player actions and validation rules.
- Betting/decision deadline.
- Outcome distribution and exact payout table.
- State transitions and terminal conditions.
- Item/modifier hooks, if supported.
- Pure settlement calculation where feasible.

### Server-authoritative session service
Owns:
- Room membership and run state.
- Phase transitions and deadlines.
- Accepted bets and immutable bet IDs.
- Balance reservation/debit and settlement.
- Random outcome generation.
- Idempotency and replay protection.
- Authoritative state snapshots and event history.

The browser is a display/input client only. It must never be trusted to supply balances, payout amounts, odds, or final outcomes.

### Wallet / ledger
Use integer virtual-chip units. Record each change as a ledger entry with a unique event ID and reason. Reject negative balances and duplicate settlements. If the product later adds shared team funds, implement them as an explicit account type rather than mixing them with personal balances.

### Probability and payout policy
- Publish the probability and payout table for each game.
- Define whether a displayed payout means gross return or net profit.
- Calculate expected value before shipping each game.
- Include boundary tests for zero/max bet, invalid choices, timeouts, disconnects, duplicate requests, and settlement retries.
- Use a server-side cryptographically secure random source where supported; do not use client-generated outcomes.
- If fairness verification is added, design a commit/reveal protocol carefully so the server cannot change a result after bets lock. Do not expose a seed before the result is irrevocable.

### Roguelike run service
Owns stage progression, item inventory, modifiers, run goals, and terminal outcomes. Keep it separate from the generic wallet and from any one game's rules.

### AMQ integration
Treat the song player and answer flow as optional integrations. A game can run while a song plays, and a song can optionally supply theme/event context. The generic game engine must not depend on the song-answer result unless a specific game explicitly declares that dependency.

## 5. Existing multiplayer client reconnaissance

Inspected at ref `v82.86.06-custom-list-backup-restore-browser-01`:

- `src/scripts/script_028.htmlpart`, blob SHA `b89ed0014f02ae156b6c66b607feb2639024eae9`, 132,318 characters.
- The client uses a configurable HTTP API base; the code's default example is `http://127.0.0.1:8765`.
- HTTP requests include bearer-token authorization and `X-Player-Id` after a session is established.
- The client references `/api/health`, `/api/rooms`, room join/rejoin/state/action routes, `/api/live` for WebSocket drafts, and `/api/vndb/character`.
- Existing multiplayer browser acceptance uses mocked API, WebSocket, and media interfaces. It is not proof of live-server or real two-client behavior.

## 6. Blocking dependency: current server source is not in this repository tree

The inspected V82.86.06 repository tree contains the multiplayer client and mocked acceptance tests, but no current server implementation or deployment configuration for the room API. The old handoff document references a historical V82.65 server artifact, but that artifact is not enough to establish compatibility with the current client.

Do not implement betting or balances solely in the browser. Before production implementation, locate and inspect the currently deployed server source and version, or explicitly decide to create a new server service. Required discovery evidence:
1. Repository/source location and exact commit.
2. Current deployment target and configuration path, without exposing secrets.
3. Route/schema contract for room creation, state transitions, action submission, WebSocket auth, and reconnect.
4. Persistence model and server restart behavior.
5. Live two-client smoke test against a non-production test instance.

If the current server cannot be located, the next implementation proposal must explicitly cover a new server service and migration/hosting costs instead of pretending the existing API can be extended.

## 7. Decisions still open

Do not silently decide these during implementation:
- Personal balances, shared team balance, or both.
- Fixed-length run versus stage progression until bust/final stage.
- Whether balances reset per run or persist across runs.
- Which six game modules form the first prototype.
- Whether items are run-only or persist in a meta-progression layer.
- Whether player-to-player transfers or auctions are allowed.

Recommended prototype boundary: virtual chips, per-run balance, stage progression, no cash-out, no player-to-player transfer initially, and a small set of mechanically distinct games. This is a proposal, not an approved final ruleset.

## 8. Acceptance gates before coding the engine

- [ ] Current server source/deployment identified, or new-server decision documented.
- [ ] Game state machine and API contract specified.
- [ ] Wallet ledger invariants and idempotency behavior specified.
- [ ] Probability and payout tables independently checked.
- [ ] Unit tests cover payout math, odds, boundaries, and settlement retries.
- [ ] Server tests cover simultaneous bets, deadline races, reconnect, duplicate requests, and restart recovery.
- [ ] Two independent clients complete a real test run against a test server.
- [ ] No product HTML or existing multiplayer behavior changed before a scoped implementation branch exists.

## 9. Rollback

This checkpoint adds design/status documentation only. Rollback by reverting the commit that adds this file and the corresponding status-document updates. No product-source rollback is required.
