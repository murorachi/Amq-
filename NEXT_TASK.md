# Next task

## Active workstream: multiplayer Gamble Roguelike — design-first gate

Branch: `multiplayer-gamble-engine-discovery-01`.

**Current phase: DESIGN ONLY. Do not implement server, UI, persistence, or more game code until design gates pass.**

### Verified baseline
- Product baseline remains V82.82 standalone HTML, 8,787,490 bytes, SHA-256 `227e89d80fa58db8e8f79c59f1203f06f8bc0663d11228d0986fe6e30f81e91b`.
- Workstream branch is separate from the AMQ product baseline.
- Existing isolated prototype contains four pure rule candidates and an in-memory ledger. It is not a playable multiplayer game.
- Local working-copy tests previously passed 10/10; committed GitHub suite has 8 tests. Remote CI result has not been verified. Do not claim remote CI passed.
- No server, database, browser client, persistence, or live two-client run exists.

### Latest design checkpoint
- Report: `reports/MULTIPLAYER_GAMBLE_DESIGN_GATE_01.md`.
- Plan: `reports/MULTIPLAYER_GAMBLE_IMPLEMENTATION_PLAN_01.md`.
- Initial critique: Coin Call and Exact Seven are too shallow as signature games; Vault is promising but incomplete; Blind High Card needs a meaningful decision.
- Revised hypothesis: 2–6 player co-op, shared virtual bankroll, simultaneous private actions, escalating quotas, meaningful route choice, 8–12 run-only items, target 12–20 minute run. All values remain hypotheses until simulated/playtested.
- Proposed four mechanism slots: Vault push-your-luck, Risk Contract, Blind Pot with one extra information/insurance choice, and Team Gamble.
- No additional prototype source was changed in the design review.

### Next bounded task: Design Gate 02
1. Build a concrete full-run walkthrough with numbers and at least one failure/recovery branch.
2. Draft 8–12 items with costs, triggers, drawbacks, and synergy pairs.
3. Independently calculate probability distributions, gross payouts, net expected value, variance, and quota success for the four mechanisms.
4. Build a reproducible simulation harness in a design-only location; do not modify the game prototype or product HTML.
5. Test conservative, median, and aggressive policies for 2, 3, and 6 players; inspect dominant strategies, runaway banks, dead runs, and player downtime.
6. Rewrite weak mechanics and repeat until Gates A–C pass. Prepare the Gate D paper/playtest plan before authorizing a low-fidelity playable prototype.

### Stop conditions before implementation
- A complete run has been walked through numerically.
- Four games produce genuinely different decisions, not reskins.
- Shared-bank griefing and zero-balance participation have clear rules.
- At least three viable strategies exist, with no universal best game/item.
- Payout math and quota/failure curves are independently checked.
- The playtest protocol is ready, with explicit replay-intent and session-length targets.
- Any remaining unknown that requires real human play is labeled unproven; it is not replaced by confidence in the document.

### Existing AMQ maintenance workstream (separate)
The V82.86.06 maintenance checkpoint remains separate. Its known next tasks are the dedicated backup/restore contract test command and the IndexedDB failure matrix. Do not modify product source during Gamble Roguelike design.

## Current status and rollback
- Current phase: design iteration only.
- Product source/HTML: unchanged.
- Core code: existing Stage 1 rules and in-memory ledger only.
- No additional tests were run by the design-document update.
- Roll back by reverting the design report and corresponding documentation commits on `multiplayer-gamble-engine-discovery-01`. No product rollback is required.
