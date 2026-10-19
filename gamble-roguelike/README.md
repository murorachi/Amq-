# AMQ Gamble Roguelike Core — Stage 1

Isolated deterministic game rules and an in-memory virtual-chip ledger. This package does not start a server, open network ports, modify the AMQ standalone HTML, or persist data across process restarts.

## Requirements and tests

- Node.js 20 or newer
- No third-party dependencies
- Run \`npm test\` from this directory

## Current rules

- Coin Call: win probability 1/2; winning gross return is floor(stake × 1.9), including stake.
- Exact Seven: two fair six-sided dice, win on sum 7 (6/36); gross return is floor(stake × 5.4), including stake.
- Vault: step success probabilities 80%, 70%, 60%; gross returns 1.2×, 1.7×, 2.7×. Successful returns are provisional until a future run-state implementation handles cash-out.
- Blind High Card: highest rank wins the shared pot; ties split the pot, with remainder chips assigned in ascending player ID order.

## Limitations

- Ledger is in-memory only, not durable and not yet suitable as a deployed multiplayer authority.
- No HTTP/WebSocket transport, rooms, authentication, SQLite persistence, or browser UI.
- Deterministic rule and ledger tests do not replace payout simulation, playtesting, or real multi-client acceptance.
