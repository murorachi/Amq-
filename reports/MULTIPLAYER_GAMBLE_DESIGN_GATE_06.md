# Multiplayer Gamble Roguelike — Design Gate 06

- Status: **Integer-payout and item-dominance checks completed; design still fails the implementation gate.**
- Branch: `multiplayer-gamble-engine-discovery-01`.
- Product baseline: V82.82 standalone HTML, 8,787,490 bytes, SHA-256 `227e89d80fa58db8e8f79c59f1203f06f8bc0663d11228d0986fe6e30f81e91b`.
- Reproducible simulation: `reports/design_simulations/gamble_roguelike_gate06.py`.
- No production product source, existing multiplayer mode, or game implementation was changed.

## 1. What was tested

A deterministic 100,000-run/configuration simulation with seed `20261020` tested:
- exact rational gross multipliers with integer-floor payout;
- a 10% shared-bank stake (minimum 10 chips);
- five targets: 1,020 / 1,040 / 1,060 / 1,080 / 1,100;
- strain increases by one after a miss and decreases by one after a clear; three strain ends the run;
- four candidate policies;
- two one-use retry variants and one one-use loss-insurance item.

This is still a simplified Risk Contract model. It is not a simulation of the entire proposed four-game run, and it is not evidence of human enjoyment.

## 2. Integer payout findings

Payout is defined as `floor(stake × exact rational multiplier)`, including the returned stake. At a 10-chip stake:
- Safe (75%, 4/3×): gross payout 13; expected net −0.25 chip.
- Balanced (40%, 2.5×): gross payout 25; expected net 0.
- Jackpot (15%, 20/3×): gross payout 66; expected net −0.10 chip.

At stake 100:
- Safe payout 133; expected net −0.25 chip.
- Balanced payout 250; expected net 0.
- Jackpot payout 666; expected net −0.10 chip.

The floor operation introduces a small implicit edge for Safe and Jackpot. It is small at these stakes but must be disclosed as a rounding consequence, not described as perfectly fair EV. Use integer rational arithmetic; never store money as floating point. Keep a minimum stake of 10 for the current prototype model, but verify all caps and fees before freezing the economy.

## 3. Item dominance finding

Selected clear rates from the 100,000-run simulation:

| Policy | No item | One retry, 50% stake-profit penalty | One retry, 70% stake-profit penalty | One-use insurance (refund 40% of stake on loss) |
|---|---:|---:|---:|---:|
| Always Safe | 23.914% | 47.593% | 23.884% | 23.914% |
| Quota-aware | 46.999% | 58.699% | 47.682% | 48.322% |
| Balanced default | 24.809% | 40.068% | 40.068% | 29.492% |
| Jackpot when behind | 29.699% | 39.041% | 38.374% | 29.699% |

Interpretation:
- A retry that deducts only 50% of stake from the retry win's net profit is too strong. It raises quota-aware clear rate by about 11.7 percentage points.
- A 70% deduction reduces the quota-aware uplift to about 0.7 points and is not an attractive reward. It is not a good item design merely because it avoids being overpowered.
- Insurance did not change Always Safe's clear rate in this model, because it refunds loss but does not change the bank target; it modestly helped quota-aware play. Its actual value depends on event type and recovery rules.
- The simulation does not include item acquisition cost or the opportunity cost of choosing the item over another reward. That missing cost prevents final item balance claims.

### Design revision

Remove the generic “reroll any failed bet” item from the core item pool. It is either too powerful or, after sufficient penalty, nearly irrelevant. A future reroll-like effect must be narrowly tied to a specific mechanism (for example, exchange one Signal Room clue for a new clue while paying its fee), with exact information-distribution validation. It must not grant a free second independent chance on any wager.

Keep Insurance provisional only. It needs a real trade-off and comparison against at least two competing item rewards before approval.

## 4. Strategy diversity: not passed

The quota-aware policy has the highest baseline clear rate in this model, but it is a greedy policy built specifically to clear the current target. This does not prove that it will be the best strategy in a complete game. Conversely, the retry item lifts several otherwise weak policies, which is a warning that a generic retry can overwhelm the intended risk choices.

Current model results do **not** demonstrate three viable strategies. The policy set is diagnostic and too narrow to make that claim. The next simulation must include event choice, item opportunity cost, persistent strain, route trade-offs, and different starting bank/target states before strategy diversity can be judged.

## 5. Missing game rules identified

Before implementation, the complete design must define:

1. **Bank and stage clear:** stage target is checked against bank after fees and payout; no intermediate pre-fee balance can count as a clear.
2. **Bet lock:** one team wager per stage, locked once all active players vote or the deadline expires. No late edits after lock.
3. **Risk vote:** plurality with explicit ties: three-way tie or Bank-vs-Push tie becomes Balanced; Bank-vs-Balanced tie becomes Bank; Balanced-vs-Push tie becomes Balanced. A missing vote defaults to Bank. This is deterministic but still needs a fairness test with humans.
4. **Strain:** miss +1, clear −1 to a minimum of zero, at 3 the run ends unless a previously acquired effect explicitly changes that rule.
5. **Recovery:** no free guaranteed recovery. At 2 strain, the team may choose one recovery route: pay a fixed 15% of current bank to clear 1 strain and forgo the stage's item reward, or attempt the stage normally. If the team cannot pay the fee, only the normal stage is available. This is a candidate rule, not yet balance-approved.
6. **AFK/disconnect:** one grace window per run of 15 seconds; after that, missing route/risk vote defaults to Bank and no personal Favor is spent. The server resolves the locked stage once; reconnecting clients read the authoritative result.
7. **No grief transfer:** no player-to-player chip transfer, no private side bets, and no action that can directly confiscate a teammate's resource in the first release.
8. **Run length:** five stages, expected target 12–20 minutes, but duration remains unvalidated.
9. **RNG disclosure:** server-side outcomes are generated only after bets lock; the UI shows odds and gross return before lock, then outcome and ledger entries after resolution.

These rules are written as a coherent candidate set, not proof that the loop is enjoyable. Recovery may create an optimal “pay strain away” loop or force a death spiral; the next gate must simulate it.

## 6. Five-stage walkthrough requirement

A complete numerical run is still not approved. Gate 07 must show at least:
- a normal clear path;
- a miss followed by a recovery decision;
- a two-strain high-pressure state;
- one use of each distinct game mechanism;
- the exact bank ledger before/after every fee, stake, and payout;
- a path that fails despite reasonable play, without making the loss feel arbitrary.

Do not present an illustrative path as a simulated outcome. Label deterministic examples and Monte Carlo outcomes separately.

## 7. Decision

**Remain in design. No server/UI/database implementation.**

Gate 06 has produced two useful rejection decisions: generic retry is not acceptable as currently modeled, and fair theoretical multipliers are not perfectly fair after integer flooring. Gates A–C remain blocked by incomplete recovery simulation, item opportunity cost, full-run strategy diversity, and lack of human evidence.

## 8. Rollback

Gate 06 adds design documentation and one reproducible Python simulation. Revert the Gate 06 report/script and related design-status edits on `multiplayer-gamble-engine-discovery-01` to roll back. No product rollback is required.
