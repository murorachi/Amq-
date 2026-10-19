# Multiplayer Gamble Roguelike — Design-First Plan 01

- Status: **Design Gate 03 complete; the preferred economy is one shared team wager per stage. Implementation remains blocked.**
- Work branch: `multiplayer-gamble-engine-discovery-01`.
- Product baseline remains V82.82 standalone HTML, 8,787,490 bytes, SHA-256 `227e89d80fa58db8e8f79c59f1203f06f8bc0663d11228d0986fe6e30f81e91b`.
- Design reviews: Gate 01, Gate 02, Gate 03 under `reports/MULTIPLAYER_GAMBLE_DESIGN_GATE_*.md`.
- Simulations: `reports/design_simulations/gamble_roguelike_gate02.py`, `reports/design_simulations/gamble_roguelike_gate03.py`.

## 1. Delivery rule

**Do not implement the multiplayer server or browser UI until the design reaches the gate.** Existing `gamble-roguelike/` code is an isolated engineering fixture, not a validated product.

Iterate: specify a concrete loop; critique for shallow choices, dominant strategies, griefing, downtime, and runaway balance; revise; independently calculate odds/EV/variance/rounding; simulate player policies and run configurations; review gates; repeat while any gate fails.

## 2. Product hypothesis

A short-session co-op gambling roguelite for 2–6 players. The team shares a virtual bankroll and must meet escalating stage quotas. Players submit simultaneous private choices, select routes, use run-only items, and decide when to preserve gains versus risk a larger reward.

The differentiator hypothesis is shared-bank social tension + private simultaneous commitments + informed route choices + item synergies. Target session length is 12–20 minutes, not yet validated. AMQ songs remain optional atmosphere/event content. No real-money betting, cash-out, player-to-player transfers, or persistent wallet in the first target.

## 3. Design Gate 01 findings

- Coin Call is a tutorial/settlement fixture, not a signature game.
- Exact Seven is an easily enumerated single-shot lottery with little decision depth.
- Vault has promise but needs complete state/cash-out rules.
- Blind High Card is economically awkward with a shared team wallet.

Preferred mechanisms: Vault (individual stop/continue), Risk Contract (probability/reward profiles), Blind Draft (hidden rank and Favor-token decision for item priority), and Team Gamble (secret Bank/Push votes).

## 4. Design Gate 02 findings

- Initial risk profiles at 1.20×/2.20×/5.50× had expected net returns of −10%/−12%/−17.5% per stake.
- The naive quota-sized model made Safe overwhelmingly dominant for survival (89.398% clear vs 31.780% Balanced and 2.684% Jackpot); reject that model.
- Fixed 10%-stake model yielded 38.830% clears for quota-aware policy before items. A free reroll raised it to 61.070%, showing reroll power needs a real cost.
- A ten-item draft exists in Gate 02; dangerous item pairs still need simulation.
- Shared-bank Blind High Card was replaced by Blind Draft so the game does not pretend that transferring chips within one shared account changes team wealth.

## 5. Design Gate 03 findings

Report: `reports/MULTIPLAYER_GAMBLE_DESIGN_GATE_03.md`.
Simulation: `reports/design_simulations/gamble_roguelike_gate03.py`.

- Revised Risk Contract multipliers to fair gross EV before fees/rounding: Safe 4/3× at 75%, Balanced 2.5× at 40%, Jackpot 20/3× at 15%. The profiles differ by variance rather than a large built-in house edge.
- One shared wager per stage: quota-aware clear rate 46.563% without reroll and 65.989% with a once-per-run reroll whose payout is reduced 10%.
- Separate simultaneous wagers from a shared bankroll make exposure depend on party size; a 20% aggregate cap reduces that issue but makes six-player quota clears harder (33.634% with the nerfed reroll in the tested model).
- **Design decision:** one team wager per stage. Players still submit secret simultaneous votes/actions, but votes select the team's risk profile and item/support effects. Do not multiply team risk by player count.
- These are 100,000-run seeded balance diagnostics, not proof of fun. No human playtest occurred.

## 6. Mandatory design gates

### Gate A — Coherent product
- [ ] One-sentence identity distinct from competitors beyond theme/game count.
- [x] Core run loop and a numeric success/failure walkthrough exist.
- [ ] Complete recovery branch and shared-bank anti-griefing/AFK rules.
- [x] Four mechanism slots differ in decision structure.
- [ ] Every stage has a meaningful decision without mandatory no-choice failure.

### Gate B — Mathematical integrity
- [x] Base Risk Contract EVs independently calculated.
- [x] Vault stopping-point probabilities/EVs calculated.
- [x] Reproducible 100,000-run quota simulations performed.
- [ ] Final integer rounding, minimum stakes, fees, and payout caps tested.
- [ ] Item effects and dangerous combinations simulated.
- [ ] Recovery and route modifiers tested for positive-EV loops/dominance.

### Gate C — Strategy/replayability
- [ ] At least three viable approaches demonstrated (steady quota, information/control, high-variance growth).
- [ ] No game/item is always best.
- [ ] 8+ items form synergies without dominant combinations.
- [ ] Route value changes across bank states and run modifiers.
- [ ] Secret votes create useful negotiation rather than majority frustration.

### Gate D — Playtest readiness
- [ ] Rules teachable in under 3 minutes.
- [ ] Paper-playtest facilitator script and observation sheet ready.
- [ ] Plan for at least 3 small groups, ideally 2–4 players per group.
- [ ] Prototype target: at least 70% would play another run.
- [ ] Median duration 12–20 minutes; no player inactive for more than 20% of a run.

Coding can begin only after Gates A–C pass and Gate D's playtest plan is ready. Actual fun still requires a low-fidelity playable prototype and external playtest.

## 7. Next design cycle: Gate 04

1. Specify the exact simultaneous-vote mapping to Safe/Balanced/Jackpot, including 2-, 3-, and 6-player thresholds, tie behavior, and AFK default.
2. Compare no-item, nerfed-reroll, and small item-bundle configurations with the single-wager economy.
3. Simulate item combinations and exact integer-chip rounding, including Lucky Break + Debt Eraser, Jackpot Fuse + Debt Eraser, and Safety Net + Vault Key.
4. Write the paper-playtest facilitator script and observation sheet.
5. Show three distinct viable strategies in the model. If one profile dominates in all relevant states, revise.
6. Keep server/UI implementation blocked.

## 8. Architecture and evidence boundaries

A lightweight authoritative service remains likely, but Node.js/TypeScript/SQLite are not locked. No server, database, API, browser UI, or deployment should start before design gates authorize a playable prototype.

Previously recorded local core tests passed 10/10 in the fuller working copy; the committed GitHub suite has 8 tests and remote CI remains unverified. Design simulations were run locally with Python's standard library and fixed seed 20261020. No human playtest, real two-client run, or remote CI pass is claimed.

## 9. Rollback

Revert the design-only reports/simulation commits on `multiplayer-gamble-engine-discovery-01`. No product rollback is required.
