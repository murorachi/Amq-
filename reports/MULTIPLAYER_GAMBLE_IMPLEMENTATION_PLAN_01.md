# Multiplayer Gamble Roguelike — Design-First Plan 01

- Status: **Design Gate 02 complete as a numeric stress test; implementation remains blocked.**
- Work branch: `multiplayer-gamble-engine-discovery-01`.
- Product baseline remains V82.82 standalone HTML, 8,787,490 bytes, SHA-256 `227e89d80fa58db8e8f79c59f1203f06f8bc0663d11228d0986fe6e30f81e91b`.
- Design reviews: `reports/MULTIPLAYER_GAMBLE_DESIGN_GATE_01.md`, `reports/MULTIPLAYER_GAMBLE_DESIGN_GATE_02.md`.
- Reproducible design simulation: `reports/design_simulations/gamble_roguelike_gate02.py`.

## 1. Delivery rule

**Do not implement the multiplayer server or browser UI until the design reaches the gate.** The existing `gamble-roguelike/` rules/ledger package is an isolated engineering fixture. Passing unit tests proves selected code paths behave as written; it does not prove that the product is strategically interesting.

Iterate:
1. Specify a concrete loop and representative decisions.
2. Critique for shallow choices, dominant strategies, griefing, downtime, and runaway balance.
3. Rework the rules.
4. Independently calculate odds, expected value, variance, integer rounding, and quota success.
5. Simulate multiple player policies and run configurations.
6. Review against explicit design gates.
7. Repeat while any gate fails.

No fixed iteration count. Stop only when gates are supported by evidence, not because the document feels complete.

## 2. Product hypothesis

A short-session co-op gambling roguelite for 2–6 players. The team shares a virtual bankroll and must meet escalating stage quotas. Players submit simultaneous choices, select routes, use run-only items, and decide when to preserve gains versus risk a larger reward.

The intended differentiator is shared-bank social tension + private simultaneous commitments + informed route choice + item synergies. This is a hypothesis, not a proven claim. Target session length remains 12–20 minutes until tested.

AMQ songs remain optional atmosphere/event content. No real-money betting, cash-out, player-to-player transfers, or persistent wallet in the first target.

## 3. Design Gate 01 findings

The initial candidates are insufficient as a product:
- Coin Call is a tutorial/settlement fixture, not a signature game.
- Exact Seven is an easily enumerated single-shot lottery with little decision depth.
- Vault has promise but needs complete state/cash-out rules.
- Blind High Card is economically awkward with a shared team wallet.

Proposed distinct mechanisms:
1. Vault: individual stop/continue.
2. Risk Contract: probability/reward profiles.
3. Blind Draft: hidden rank plus personal Favor-token decision; compete for item priority, not team chips.
4. Team Gamble: secret Bank/Push votes with a shared consequence.

## 4. Design Gate 02 findings

Report: `reports/MULTIPLAYER_GAMBLE_DESIGN_GATE_02.md`.

- Independently calculated Risk Contract expected net values: Safe −10% of stake; Balanced −12%; Jackpot −17.5%. Variance increases sharply across profiles.
- Revised Vault candidate: success probabilities 80%/70%/60%, cash-out multipliers 1.10×/1.50×/2.40×. Expected gross return from original stake at the three stopping points is 0.880×/0.840×/0.8064×. Continue is lower expected value than stopping, but can be useful when a quota gap requires a larger payout.
- Model A (stake only enough to reach a 5% quota) revealed an overwhelmingly dominant Safe survival strategy. This model is rejected.
- Model B (10% stake, five fixed absolute targets, strain system) produced a 38.830% clear rate for the quota-aware policy before items. A one-use free reroll raised it to 61.070%, but that reroll is an upper bound with no payout penalty and is too strong to accept without tuning.
- The fixed-stake model is only a rough team-as-one-actor diagnostic. It does not validate 2–6 player social behavior, item combinations, or fun.
- A ten-item draft exists in the Gate 02 report. Item synergy/dominance has not yet been simulated.
- Shared-bank Blind High Card was replaced by Blind Draft to avoid a fake chip pot that only moves the same team money around.

## 5. Mandatory design gates

### Gate A — Coherent product
- [ ] One-sentence identity distinct from competitors beyond theme/game count.
- [ ] Full run walkthrough including failure and recovery.
- [ ] Every stage has a meaningful choice.
- [ ] Four mechanically distinct games.
- [ ] Explicit shared-bank anti-griefing and zero-balance participation rules.
- [ ] Recovery cannot guarantee a free rescue or force an unavoidable no-choice restart.

### Gate B — Mathematical integrity
- [x] Independent expected value/variance calculations for base Risk Contract profiles.
- [x] First-pass exact probability calculations for Vault stopping points.
- [x] Reproducible 100,000-run quota stress test with fixed seed.
- [ ] Final payout/rounding boundaries and item-modified distributions.
- [ ] Run clear/failure rates tested with recovery, route choices, and item effects.
- [ ] No positive-EV repeatable loop or universally dominant action across relevant states.

### Gate C — Strategy/replayability
- [ ] 8+ items form clear synergies without dominant combinations.
- [ ] At least three viable approaches are demonstrated in simulation.
- [ ] No one game/item is always best.
- [ ] Route value changes across seeds and bankroll states.
- [ ] Two-to-six-player decision policies produce viable and distinct outcomes.

### Gate D — Playtest readiness
- [ ] Rules teachable in under 3 minutes.
- [ ] Paper-playtest facilitator script and observation sheet ready.
- [ ] Plan for at least 3 small groups, ideally 2–4 players each.
- [ ] Prototype target: at least 70% would play another run.
- [ ] Median duration 12–20 minutes; no player inactive for more than 20% of a run.

Coding can begin only after Gates A–C pass and the Gate D test plan is ready. Actual fun still requires a low-fidelity playable prototype and external playtest.

## 6. Next design cycle: Gate 03

1. Revise the quota/strain curve using Model B, not the rejected Model A.
2. Add explicit recovery choices and compare at least three item configurations, including a nerfed reroll.
3. Extend the simulation to 2, 3, and 6 players, with separate action choices and shared-bank stake reservation.
4. Simulate the ten-item pool and dangerous pairs (Lucky Break + Debt Eraser; Jackpot Fuse + Debt Eraser; Safety Net + Vault Key).
5. Check minimum stake, integer rounding, caps, max payout, and whether any item/game is universally optimal.
6. Write the paper-playtest facilitator script, observation sheet, and questions for clarity, agency, social tension, downtime, and replay intent.
7. Revise the design and rerun the checks. Do not implement a server or UI in Gate 03.

## 7. Architecture is deliberately deferred

A lightweight authoritative service remains the likely trust model, developed locally and hosted later if needed. Node.js/TypeScript/SQLite remain possible options, not locked decisions. No server, database, HTTP/WebSocket API, browser UI, or deployment work should start before design gates authorize a playable prototype.

The existing prototype has pure rule functions and an in-memory ledger only. It has no durable persistence or live multiplayer. Previous local unit tests are not design acceptance.

## 8. Evidence boundaries and rollback

- Product baseline remains V82.82; no product HTML/source changed.
- Design simulation script is separate from the prototype's game source.
- Gate 02 simulation executed locally with Python 3 standard library, fixed seed `20261020`, 100,000 runs per configuration.
- No human playtest, real multi-client test, or remote CI verification for the existing core suite is claimed.
- Revert design-only commits on `multiplayer-gamble-engine-discovery-01` to roll back. No product rollback is required.
