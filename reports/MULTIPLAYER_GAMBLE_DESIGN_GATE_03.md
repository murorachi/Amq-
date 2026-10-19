# Multiplayer Gamble Roguelike — Design Gate 03

- Status: **Design Gate 03 complete; one major economy decision revised; implementation remains blocked.**
- Branch: `multiplayer-gamble-engine-discovery-01`.
- Product baseline: V82.82 standalone HTML, 8,787,490 bytes, SHA-256 `227e89d80fa58db8e8f79c59f1203f06f8bc0663d11228d0986fe6e30f81e91b`.
- Reproducible simulation: `reports/design_simulations/gamble_roguelike_gate03.py`.
- No product HTML or existing prototype source was changed.

## 1. Question tested

Gate 02 suggested that a shared bankroll with independent wagers from every player might make the run harder as the party grows. Gate 03 compares:
1. One shared team wager per stage.
2. Separate simultaneous player wagers against the same team bank.
3. A cap on aggregate exposure when separate wagers are used.
4. A less punishing base payout curve with no built-in house edge before fees/rounding.

The simulation uses 100,000 runs per configuration, Python standard library, seed `20261020`, starting bank 1,000, five targets (1,020 / 1,040 / 1,060 / 1,080 / 1,100), 10% stake in the single-wager model, and a strain limit of 3. It is a design diagnostic, not production RNG or a playtest.

## 2. Payout revision: reduce the built-in house edge

The prior candidate multipliers (1.20× / 2.20× / 5.50×) had expected net returns of −10%, −12%, and −17.5% per stake. That is a severe drag when the same bank must repeatedly grow to meet quotas.

The new candidate multipliers are calibrated to fair expected gross return before fees and integer-chip rounding:

| Profile | Win chance | Gross return | Expected gross return / stake | Expected net / stake before rounding/fees |
|---|---:|---:|---:|---:|
| Safe | 75% | 4/3× (1.333333…) | 1.00× | 0% |
| Balanced | 40% | 2.50× | 1.00× | 0% |
| Jackpot | 15% | 20/3× (6.666666…) | 1.00× | 0% |

This gives the three profiles different variance without automatically charging a large expected-value penalty for taking risk. It does **not** mean the game economy can print chips freely: quota targets, item costs, explicit fees, rounding, and payout caps still need to be designed together. Integer flooring can create an implicit edge, especially at small stakes, so final payouts must be recalculated at the actual minimum stake.

## 3. Results: one shared wager versus multiple personal wagers

### Model 1 — one shared wager per stage

The team chooses one profile and stakes 10% of its bank. This keeps exposure independent of player count.

| Team policy | Clear rate, no reroll | Clear rate, once-per-run free reroll | Clear rate, reroll payout reduced 10% |
|---|---:|---:|---:|
| Always Safe | 23.535% | 52.883% | 52.883% |
| Quota-aware | 46.563% | 66.377% | 65.989% |
| Jackpot when behind | 29.889% | 39.273% | 38.619% |

The reroll is used once per run after a failed outcome. The free-reroll result is an upper bound; the reduced-payout version is closer to a plausible item, but it is still only one configuration.

### Model 2 — each player wagers 10% of the shared bank

This means total exposure becomes 20%, 30%, and 60% of the bank in 2-, 3-, and 6-player rooms.

| Players | Quota-aware clear rate | Mean final bank |
|---:|---:|---:|
| 2 | 34.787% | 999.22 |
| 3 | 34.301% | 997.99 |
| 6 | 35.285% | 997.67 |

The clear rates happen to be similar in this configuration, but six players expose 60% of the team bank in one round. A single simultaneous round can become a giant all-team loss. The design has no reason to scale total risk linearly with player count.

### Model 3 — individual wagers, 20% aggregate exposure cap

The total stake is capped at 20% of the shared bank and split across active players. With the nerfed reroll item:

| Players | Quota-aware clear rate | Failed-run rate |
|---:|---:|---:|
| 2 | 53.112% | 27.995% |
| 3 | 48.700% | 32.857% |
| 6 | 33.634% | 47.304% |

This avoids the 60% exposure spike, but six-player clears drop because smaller individual wagers reduce the chance of reaching a fixed quota in one round. More independent bets make the result more predictable; with quotas above the expected return, lower variance can make the target harder to reach.

### Interpretation

Separate personal wagers create unnecessary coupling between player count, total exposure, and quota success. A simple aggregate cap helps, but does not remove all group-size sensitivity.

**Design decision: use one team wager per stage as the default economy.** Players still make simultaneous private choices, but their votes/actions determine the team's profile, route, item use, or push/bank decision. This preserves social disagreement without letting six players multiply the shared-bank risk sixfold.

The design should not introduce separate personal chip wallets merely to rescue the old Blind High Card pot idea. Blind Draft remains the better candidate for competitive item priority.

## 4. What the revised results establish

- The large house edge in the first Risk Contract draft was unnecessary and made the run too punishing.
- Fair-EV profiles let risk be expressed through variance rather than only through worse expected return.
- The single-wager model has a quota-aware clear rate of 46.563% before items. The nerfed one-use reroll raises this to 65.989% in this specific simplified model.
- Separate individual wagers are not a good default for a shared team bank.
- Group-size scaling and quota difficulty still need tuning; these numbers do not establish final balance.

## 5. Remaining design problems

1. **Reroll power:** even after reducing the rerolled gross payout by 10%, clear rate rises from 46.563% to 65.989%. This is a large effect. The item may need a larger payout penalty, a fee, or a restriction to a specific game type.
2. **Quota model:** targets are fixed absolute values and only a rough baseline. They must be tested across initial banks, item effects, and recovery routes.
3. **Risk Contract decision quality:** if the team only wants to clear the next quota, Safe is often the correct choice. The higher-risk options need meaningful upside for future stages or route-specific rewards, without becoming automatic when behind.
4. **Items:** the 10-item pool has not been simulated as combinations. Lucky Break + Debt Eraser and Jackpot Fuse + Debt Eraser remain high-risk combinations.
5. **Blind Draft:** the value of item priority and Favor tokens needs a measurable model.
6. **Player agency:** the simulation treats the team as a single policy. It cannot test whether secret votes create useful negotiation or just arguments.
7. **Human fun:** no human playtest has been performed.

## 6. Revised core loop hypothesis

1. Show the shared bank, current target, strain, available routes, and known probabilities.
2. Team chooses one of two routes, each with a distinct reward/risk profile.
3. Each player secretly chooses Bank/Push or one support action; reveal simultaneously.
4. Resolve the team decision into **one** shared wager, capped at a fixed percentage of the bank.
5. Resolve using the published payout table; show odds, gross payout, net change, and strain change.
6. If the target is missed, offer a recovery route with a real cost or a limited item-based rescue.
7. On a stage clear, draft one run-only item; items change later decisions, not just flat odds.
8. Repeat with an escalating quota or a boss rule that changes which route is best.

This is the preferred hypothesis for Gate 04, not final approved gameplay.

## 7. Gate status

| Gate | Status | Reason |
|---|---|---|
| A — Coherent product | Partial | One team wager resolves the shared-bank/player-count conflict; recovery and anti-griefing rules remain unfinished. |
| B — Mathematical integrity | Partial | Base profile EV and two wager architectures simulated. Integer rounding, fees, item combinations, and final quotas remain open. |
| C — Strategy/replayability | Not passed | The profile choices can still collapse to Safe except when behind; three viable strategies and item synergies are not demonstrated. |
| D — Playtest readiness | Not passed | No facilitator script, observation sheet, or real playtest yet. |

**Decision: remain in design. No server, UI, persistence, or production game code is authorized.**

## 8. Next cycle: Design Gate 04

1. Model a single shared wager selected from simultaneous player votes; test 2/3/6 players without multiplying the stake by player count.
2. Add recovery choices and compare quota curves with no items, one nerfed reroll, and a small item bundle.
3. Simulate the ten-item pool and the risky combinations, with exact integer-chip rounding and payout caps.
4. Demonstrate at least three viable strategies: safe quota clearing, information/control, and high-variance growth. If one profile dominates in all states, revise it.
5. Write a facilitator script and observation sheet for a paper playtest.
6. Keep implementation blocked until Gates A–C pass and the Gate D playtest plan is ready.

## 9. Rollback

This gate adds a design-only report and simulation script. It does not modify the existing game prototype or product HTML. Revert Gate 03 design-only commits on `multiplayer-gamble-engine-discovery-01` to roll back.
