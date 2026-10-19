# Multiplayer Gamble Roguelike — Design Gate 09

- Status: **Core economy revised; strategy niches appear in simulation, but item/multiplayer and human-fun gates remain open.**
- Simulation: `reports/design_simulations/gamble_roguelike_gate09.py`.
- Prior integrated model: Gate 08 found the fixed absolute targets made quota-aware play dominate.
- No product HTML, server, UI, database, or existing multiplayer code changed.

## 1. Root cause in Gate 08

The fixed absolute targets (1,020 / 1,040 / 1,060 / 1,080 / 1,100) made every loss increase the distance to the next target. The conservative policy could not recover after a loss without switching to the same high-variance choices used by the quota-aware policy. This made the supposed strategy distinction collapse.

## 2. Revised stage target

At the start of each stage, set the target to:

`target = bankAtStageStart + ceil(1% × bankAtStageStart)`

The target is checked after all wager payouts and fees. A win that fails to reach the target is still a stage miss; the UI must show the required net gain before lock. Strain remains miss +1 / clear −1, with three strain ending the run.

The final run target is 105% of the starting bank. A run clears after stage 5 only if it has not reached 3 strain and the final bank meets that target. Optional higher score tiers can reward greater final banks; they are not needed to clear the run.

## 3. Revised risk tiers combine probability and exposure

| Tier | Win chance | Gross return | Stake as % of current bank | Approx. net gain on win before rounding |
|---|---:|---:|---:|---:|
| Bank / Safe | 75% | 4/3× | 5% | +1.67% of bank |
| Balanced | 40% | 2.5× | 10% | +15% of bank |
| Push / Jackpot | 15% | 20/3× | 15% | +85% of bank |

The expected gross return is 1.0× stake before integer rounding and fees for all three tiers. The tier affects both probability/payout and total exposure. Integer floor payouts create small negative EV for Safe and Jackpot; that must be included in the final odds display and ledger tests.

This is more meaningful than letting every player select a profile while staking the same fraction. It gives Bank a genuine downside-control role, Balanced a middle variance, and Push a high-upside/high-loss profile.

## 4. Base strategy test

Gate 09 isolates the base economy and deliberately excludes items/recovery to avoid confusing item strength with profile balance. Five event slots are fixed as Risk Contract, Vault, Signal Room, Risk Contract, Vault. Seed 20261020, 100,000 runs per configuration. Stake fractions follow the selected risk tier.

- **Conservative:** Bank tier, Vault cash-out at step 1, buy two Signal clues.
- **Balanced:** Balanced tier, Vault cash-out at step 2 if reached, buy one clue.
- **Push:** Push tier, continue Vault to step 3 if possible, buy no clues.

### Final target = 105% of starting bank

| Starting bank | Conservative clear | Balanced clear | Push clear |
|---:|---:|---:|---:|
| 750 | 27.002% | 41.296% | 17.414% |
| 1,000 | 27.113% | 41.459% | 17.184% |
| 1,500 | 27.172% | 41.195% | 17.078% |

The ranking is stable across these three starting banks, so it is not just an integer-scale artifact. The strategy outcomes differ in a meaningful way:
- Conservative has the lowest strain-failure rate (about 3.4%) and nearly always reaches stage 5, but it is less likely to hit the 105% final-bank goal.
- Balanced has the highest clear rate at the main goal.
- Push has a much higher failure rate (about 66.5%) and lower main-goal clear rate, but it has a better chance of reaching the top score tier.

### Final-bank target sensitivity at starting bank 1,000

| Final target | Conservative | Balanced | Push |
|---:|---:|---:|---:|
| 100% of start | 67.39% | 47.14% | 33.48% |
| 105% of start | 27.11% | 41.46% | 17.18% |
| 110% of start | 0.00% | 33.88% | 17.18% |
| 120% of start | 0.00% | 16.56% | 17.18% |
| 150% of start | 0.00% | 2.49% | 11.58% |

The goal sensitivity creates distinct niches: conservative favors survival and modest growth, Balanced favors the standard clear target, and Push is the best of these three at the 150% score tier. It is not a universal win strategy.

## 5. What this does and does not prove

The base simulation now shows differentiated risk profiles and goal-dependent strategy niches. It does **not** prove fun. It also omits the item draft, item ownership, recovery, route votes, party-size effects, and social negotiation. Items could erase the strategy differences, and human players may not find the 30-second vote/draft flow engaging.

## 6. Next revision

1. Update the rulebook to use relative 1% stage targets and risk-tier stake fractions.
2. Add the one-use recovery rule and each item individually, then compare clear rate and final-bank distribution with/without each item.
3. Test item combinations and whether one item erases the profile trade-offs.
4. Vary event order and route choice; keep the baseline run reproducible.
5. Run exact rounding checks for all stakes and fees.
6. Finalize paper-playtest cards only when the item layer no longer collapses the base strategy niches.

**Decision: remain in design.** Core strategy niches are now plausible enough for the next design layer, but no implementation or fun claim is authorized.
