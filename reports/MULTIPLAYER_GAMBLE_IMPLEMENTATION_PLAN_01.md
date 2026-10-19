# Multiplayer Gamble Roguelike — Design-First Plan 01

- Status: **Design Gate 01 drafted; no further implementation authorized yet.**
- Work branch: `multiplayer-gamble-engine-discovery-01`.
- Product baseline remains V82.82 standalone HTML, 8,787,490 bytes, SHA-256 `227e89d80fa58db8e8f79c59f1203f06f8bc0663d11228d0986fe6e30f81e91b`.
- Design review: `reports/MULTIPLAYER_GAMBLE_DESIGN_GATE_01.md`.
- Discovery record: `reports/MULTIPLAYER_GAMBLE_ENGINE_DISCOVERY_01.md`.

## 1. Delivery rule

**Do not implement the multiplayer server or browser UI until the design reaches the agreed gate.** The existing `gamble-roguelike/` rules/ledger package is an isolated engineering fixture. Passing unit tests proves selected code paths behave as written; it does not prove that the product is strategically interesting.

Design should iterate through:
1. Specify a concrete loop and representative decisions.
2. Critique for shallow choices, dominant strategies, griefing, downtime, and runaway balance.
3. Rework the rules.
4. Independently calculate odds, expected value, variance, integer rounding, and quota success.
5. Simulate multiple player policies and run configurations.
6. Review the result against the design gates.
7. Repeat while any gate fails.

No iteration count is fixed. Stop only when the gates are supported by evidence, not because the document feels complete.

## 2. Product hypothesis

A short-session (target 12–20 minute) co-op gambling roguelite for 2–6 players. The team shares a virtual bankroll and must meet escalating stage quotas. Players make simultaneous personal choices, select routes, use run-only items, and decide when to preserve gains versus risk a larger reward.

The intended differentiator is the interaction of shared-bank social tension, private simultaneous commitments, informed route selection, and item synergies. This is a hypothesis to test, not a proven claim.

AMQ songs remain optional atmosphere/event content. No real-money betting, cash-out, player-to-player transfers, or persistent wallet in the first target.

## 3. First design review outcome

The current four pure-rule candidates are not sufficient as a product:
- Coin Call is a useful tutorial/settlement fixture, not a signature game.
- Exact Seven is an easily enumerated single-shot lottery with little decision depth.
- Vault has a promising stop/continue decision, but needs a proper state machine and cash-out rules.
- Blind High Card provides competition, but needs one meaningful pre-reveal decision beyond simply choosing a stake.

The design review proposes four mechanism slots:
1. Vault push-your-luck.
2. Risk Contract with distinct probability/reward profiles.
3. Blind Pot with either optional insurance or paid information (not both initially).
4. Team Gamble with a shared bank/collective push decision.

Each must differ in decision structure, information, timing, player interaction, or cross-round consequences. Reskins do not count.

## 4. Proposed first-run rules (unapproved until math and design gates pass)

- 2–6 players in a private room.
- Shared team bankroll, virtual chips only.
- Simultaneous private actions within a betting window, revealed together on lock.
- Each player's single wager capped initially at 20% of current team bankroll; total accepted wagers cannot exceed available funds.
- One team route vote per stage; do not vote on every individual wager.
- No permanent early elimination; a zero-balance player retains a limited support/scouting role.
- A run has stages with escalating quotas and a meaningful route choice.
- If the quota is missed, a costly recovery contract may be offered; it cannot guarantee rescue.
- 8–12 initial run-only items, emphasizing trade-offs and synergies rather than flat unconditional buffs.
- Target run duration 12–20 minutes; validate with simulation and later playtests.

These are design hypotheses. Do not encode them as final constants before the review gates pass.

## 5. Mandatory design gates

### Gate A — Coherent product
- One-sentence identity distinct from competitors beyond theme or game count.
- Full run walkthrough including failure/recovery.
- Every stage has a meaningful choice.
- Four mechanically distinct games.
- Explicit shared-bank anti-griefing and zero-balance participation rules.

### Gate B — Mathematical integrity
- Independent payout and expected-value checks.
- No obvious positive-EV loop or universally dominant action.
- Quota success rates measured under conservative, median, and aggressive policies.
- Item stacking and integer rounding bounded.
- Run length and failure curve measured by simulation.

### Gate C — Strategy/replayability
- 8+ items form several clear synergies.
- At least three viable strategies.
- No one game/item is always best.
- Route value changes across seeds and bankroll states.
- Simulations show actual trade-offs, not just differently named risk levels.

### Gate D — Playtest readiness
- Core rules teachable in under 3 minutes.
- Paper-playtest script can run without implementation assumptions.
- Plan for at least 3 small groups, ideally 2–4 players per group.
- Prototype target: at least 70% would play another run.
- Median duration 12–20 minutes; no player inactive for more than 20% of a run.

Coding can begin only after Gates A–C pass and the Gate D test plan is ready. Actual fun cannot be proven by prose or probability simulation alone; a low-fidelity playable prototype and external playtest are still required before claiming comparable enjoyment.

## 6. Math and simulation requirements

For each game and relevant item combination, report:
- Outcome distribution and conditional probabilities.
- Gross return versus net profit.
- Expected net value, variance, loss probability, and quota success chance.
- Integer-chip rounding/minimum stake effects.
- Item-modified distributions and dominance checks.
- At least 100,000 seeded runs per candidate configuration, plus exact enumeration where feasible.
- 2, 3, and 6 player configurations; low, medium, and high bankrolls; conservative, median, and aggressive decision policies.

Do not tune payout numbers in isolation from the quota curve. A high theoretical return may be bad if it creates an obvious always-pick strategy or makes the run trivial.

## 7. Architecture is deliberately deferred

The prior proposal recommends a lightweight authoritative service, locally developed and hosted later if friend play needs always-on access. Node.js/TypeScript/SQLite remain possible options, not locked decisions. No server, database, HTTP/WebSocket API, browser UI, or deployment work should start before the design gates authorize a playable prototype.

The existing prototype currently has deterministic rule functions and an in-memory ledger only. It has no durable persistence or live multiplayer. Its previous local tests do not constitute design acceptance.

## 8. Current next task

Produce Design Gate 02:
1. Walk through one complete run with concrete starting bankroll, stage quotas, route options, wagers, item draft, win/loss, and recovery branch.
2. Draft 8–12 items with explicit costs, triggers, trade-offs, and synergy pairs.
3. Build probability/expected-value tables for the four mechanism slots; call out any slot whose rules still fail to create a decision.
4. Specify simulation assumptions and policy models, then run the calculations/simulations in a reproducible script without modifying the product prototype.
5. Revise the design and gate checklist based on actual findings.

No server/UI implementation in this task. Do not use document length as the success metric; close the specific evidence gaps above.

## 9. Baseline, test, and rollback boundaries

- Product baseline remains V82.82; no product HTML/source is changed by this design review.
- Existing core tests are not a substitute for payout simulation, playtesting, or real-client acceptance.
- Remote CI for the existing consolidated core suite remains unverified unless a workflow run is explicitly inspected.
- Roll back the design-only changes by reverting the design report and related workstream documentation commits on `multiplayer-gamble-engine-discovery-01`.
