# Multiplayer Gamble Roguelike — Discovery & Architecture Spec 01

- Status: Discovery checkpoint; no product code changed.
- Work branch: `multiplayer-gamble-engine-discovery-01`.
- Product baseline remains V82.82 standalone HTML, 8,787,490 bytes, SHA-256 `227e89d80fa58db8e8f79c59f1203f06f8bc0663d11228d0986fe6e30f81e91b`.

## 1. Product direction

Build a multiplayer game whose primary activity is varied probability games, risk/reward decisions, items, random events, and Roguelike progression. AMQ songs are supporting atmosphere/content and may trigger special events; each game mechanic should remain fun without requiring song knowledge.

Do not force every gambling game to depend on guessing a song. Guessing and gambling are separate systems. Song knowledge should not be the primary determinant of virtual-chip wealth. Initial scope is virtual chips only, with no real-money wagering or cash-out.

## 2. Proposed core loop

1. Start a run with a defined virtual-chip balance.
2. Select from available games or receive a randomized game/event.
3. Submit bets and choices before the game-defined lock time.
4. Resolve the result using the published rules and probability model.
5. Apply settlement exactly once; grant chips, items, or effects.
6. Choose whether to continue, take a safer route, or risk progression rewards.
7. Advance through stages until the objective is met or the run ends.

## 3. Game-content taxonomy

- Pure chance: wheel, coin, dice, lottery pool.
- Stop-or-continue: mine exploration, escalating reward ladder, push-your-luck.
- Probability selection: choose a probability tier with corresponding payout.
- Hidden information: mystery reward, risk contract.
- Multiplayer interaction: shared pool, auction, team-versus-individual event.
- Roguelike modifiers: items and run rules that alter later decisions.

A reskin alone does not qualify as a new game. Each module should differ in decision type, risk structure, information available, player interaction, or cross-round effect.

## 4. Engine boundaries

### Game registry / rules modules
Each game module declares a stable game ID/version, allowed actions and validation, deadline, outcome distribution, payout table, state transitions, terminal conditions, and optional item hooks.

### Authoritative game-state service
Owns room/run state, phase transitions, accepted bets, balance reservation/debit, settlement, random outcomes, idempotency, replay protection, snapshots, and event history. The browser is a display/input client only; it must not be trusted to supply balances, payout amounts, odds, or final outcomes.

The user clarified that the existing multiplayer feature substantively does not use a conventional authoritative server. Do not assume such a server exists or that the current transport can provide these guarantees.

### Wallet / ledger
Use integer virtual-chip units. Record every change as a ledger entry with a unique event ID and reason. Reject negative balances and duplicate settlements. If shared team funds are later added, represent them as an explicit account type.

### Probability and payout policy
- Publish the probability and payout table for each game.
- State whether a displayed payout is gross return or net profit.
- Calculate expected value before shipping each game.
- Test zero/max bet, invalid choices, timeouts, disconnects, duplicate requests, and settlement retries.
- Use a trusted random source for a competitive economy.
- If fairness verification is added, account for seed withholding, aborts, disconnects, and the point at which results become irrevocable.

### Roguelike run service
Own stage progression, item inventory, modifiers, run goals, and terminal outcomes, separate from the wallet and individual game rules.

### AMQ integration
Treat song playback and answer flow as optional integrations. The generic game engine must not depend on song-answer results unless a specific game declares that dependency.

## 5. Existing multiplayer client reconnaissance

Inspected at ref `v82.86.06-custom-list-backup-restore-browser-01`:
- `src/scripts/script_028.htmlpart`, blob SHA `b89ed0014f02ae156b6c66b607feb2639024eae9`, 132,318 characters.
- Client contains a configurable HTTP API base (default example `http://127.0.0.1:8765`), bearer-token authorization, and `X-Player-Id` after session establishment.
- Routes referenced include `/api/health`, `/api/rooms`, room join/rejoin/state/action routes, `/api/live` for WebSocket drafts, and `/api/vndb/character`.
- Existing multiplayer browser acceptance uses mocked API, WebSocket, and media interfaces; it is not proof of live-server or real two-client behavior.
- The presence of client API route names does not prove the existing gameplay depends on a conventional authoritative server. The user's clarification supersedes the earlier assumption that finding the current room server was a required first step.

## 6. Architecture decision required

The question is no longer “where is the existing server?” It is: **what authority model should the new gambling game use?**

1. **New lightweight authoritative service (recommended for shared competitive balances):** one trusted service validates bets, generates outcomes, records balances, and settles each event once. Hosting, identity, persistence, and deployment must be selected.
2. **Host-authoritative private play (lower infrastructure, weaker trust):** one player's client coordinates the game. This may be acceptable for casual private play if everyone accepts that the host can tamper with results and balances.
3. **Peer-to-peer with verifiable randomness:** can reduce reliance on a single host but is more complex. The protocol must address seed withholding, aborts, disconnects, and settlement consistency. It does not solve persistence or collusion automatically.

Do not claim a client-side random result or wallet is tamper-proof. If no server is a hard requirement, document the trust limitation and choose a verifiable protocol before implementation.

### Required discovery/design work
1. Confirm whether “no server” means peer-to-peer gameplay, host-authoritative coordination, or simply no server source in this repository. Do not infer from API names alone.
2. Decide whether the first prototype prioritizes easy private play or tamper-resistant shared balances.
3. If a new service is chosen, specify hosting/deployment, authentication, persistence, API schema, reconnect, and restart recovery.
4. If peer-to-peer is chosen, specify transport, authority, randomness protocol, disconnect/abort behavior, and how every client verifies settlement.
5. Test with two independent clients before claiming multiplayer support is verified.

## 7. Decisions still open

- Personal balances, shared team balance, or both.
- Fixed-length run versus stage progression until bust/final stage.
- Reset balances per run or persist across runs.
- Which six game modules form the first prototype.
- Run-only items or persistent meta-progression.
- Whether player-to-player transfers or auctions are allowed.
- Whether to use a new authoritative service, host authority, or peer-to-peer verification.

Recommended prototype boundary: virtual chips, per-run balance, stage progression, no cash-out, no player-to-player transfer initially, and a small set of mechanically distinct games. This remains a proposal, not an approved final ruleset.

## 8. Acceptance gates before coding

- [ ] Trust/authority model selected.
- [ ] Game state machine and transport/API contract specified.
- [ ] Wallet ledger invariants and idempotency specified.
- [ ] Probability and payout tables independently checked.
- [ ] Unit tests cover payout math, odds, boundaries, and settlement retries.
- [ ] Multi-client tests cover simultaneous bets, deadline races, reconnect, duplicate requests, and abort/restart recovery.
- [ ] Two independent clients complete a real test run using the selected architecture.
- [ ] No product HTML or existing multiplayer behavior changed before a scoped implementation branch exists.

## 9. Rollback

This checkpoint adds design/status documentation only. Revert this file and corresponding status-document updates to roll back. No product-source rollback is required.
