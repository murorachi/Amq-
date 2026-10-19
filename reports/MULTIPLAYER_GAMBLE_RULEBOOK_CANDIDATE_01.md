# Multiplayer Gamble Roguelike — Rulebook Candidate 01

- Status: **Rules are coherent enough for a controlled paper test, not proven fun or balanced.**
- Design branch: `multiplayer-gamble-engine-discovery-01`.
- No server/UI/database or product code is included here.
- This candidate supersedes provisional rules only where explicitly stated; the Gate 01–07 reports remain historical evidence.

## 1. Product promise

A 2–6 player cooperative gambling roguelite. The group shares one virtual bankroll and tries to clear five escalating stages by combining risk decisions, information purchases, stop/continue decisions, and limited-use items. Outcomes are random, but the odds and payouts are visible before every lock. Players must be able to explain losses from published odds and their own decisions.

Virtual chips have no cash value. No real-money betting, cash-out, player-to-player transfer, private side bets, or persistent wallet in the first release. AMQ songs are optional event/theme content, not a required mechanic.

## 2. Run setup and win/loss

- 2–6 players.
- Shared starting bank: 1,000 chips.
- Five stage targets: 1,020 / 1,040 / 1,060 / 1,080 / 1,100.
- Starting strain: 0.
- Each missed stage target adds 1 strain; each cleared target removes 1 strain, minimum 0.
- At 3 strain, the run ends immediately.
- Clear the run by completing stage 5 with bank at least 1,100 and strain below 3.
- Targets are checked after all fees, stake loss/return, and item effects have settled.
- All chips are integers. Gross return includes returned stake. Every displayed wager shows win probability, gross payout, net profit on a win, and loss on failure.

## 3. Standard stage sequence

1. Reveal the stage type, target, bank, strain, odds, payout, fees, and legal item effects.
2. Players discuss for up to 30 seconds, then submit private route/risk votes where applicable.
3. Resolve votes simultaneously. Missing/late votes default to Bank.
4. Players may attach eligible items before the lock. No edits after lock.
5. The authority locks one shared wager. Default stake is `max(10, floor(bank / 10))`.
6. Generate the result only after lock; settle the ledger atomically.
7. Check target and strain, then reveal all ledger entries and any eligible reward.
8. After stages 2 and 4, run Blind Draft if the stage was cleared.

A stage is resolved once only. Reconnected clients receive the existing result; they cannot submit a replacement wager.

## 4. Risk Contract

Three profiles. All multipliers are gross and include the stake.

| Profile | Win probability | Gross payout | Integer payout formula |
|---|---:|---:|---|
| Safe | 75% | 4/3× | `floor(stake × 4 / 3)` |
| Balanced | 40% | 2.5× | `floor(stake × 5 / 2)` |
| Jackpot | 15% | 20/3× | `floor(stake × 20 / 3)` |

Use exact integer/rational calculations. Integer flooring makes Safe and Jackpot slightly negative EV at some stakes; disclose this rather than claiming exact fairness after rounding.

The group privately votes Bank / Balanced / Push. Plurality wins. Ties:
- all three tied → Balanced;
- Bank vs Push tied → Balanced;
- Bank vs Balanced tied → Bank;
- Balanced vs Push tied → Balanced.
A missing vote is Bank. This is deterministic but still requires human fairness testing.

## 5. Vault

The team stakes once and advances through a sequence. A failed step loses the full stake. After a successful step, the team may cash out or continue. A cash-out returns the listed gross amount; continuing does not lock in a previous cash-out.

| Cash-out point | Conditional success chance for next step | Gross payout if cashed out |
|---|---:|---:|
| Step 1 | 70% to reach step 2 | 1.25× |
| Step 2 | 60% to reach step 3 | 1.80× |
| Step 3 | None; final | 3.00× |

Step 1 success is 80%; step 2 success is 70%; step 3 success is 60%. Cash-out multipliers are candidates selected so continuing after step 1 has conditional expected gross 0.70 × 1.80 = 1.26× versus 1.25× cash-out, while continuing after step 2 has 0.60 × 3.00 = 1.80× versus 1.80× cash-out. The latter is an EV tie before integer rounding/fees, so the quota gap and strain should influence the decision. This requires integer-payout simulation before final approval.

## 6. Signal Room

Hidden outcome is one of A/B/C, each equally likely. Each clue reveals one pair of outcomes containing the true answer, chosen uniformly from the two pairs that contain it. Two clues are independent.

| Clues | Success chance | Gross payout on correct answer | Fee |
|---|---:|---:|---:|
| 0 | 1/3 | 3× | 0 |
| 1 | 1/2 | 2× | `ceil(2% of stake)` |
| 2 | 3/4 | 4/3× | `ceil(2% of stake) + ceil(4% of stake)` |

Fees are paid from the bank and are non-refundable, including on a wrong prediction. They do not alter the hidden outcome. The clue generator gives exactly 1/3, 1/2, and 3/4 success. Gross EV is 1.0× stake before fees and integer rounding; net EV decreases with clue fees. Buying clues is intended to exchange expected value for a higher chance of clearing the target.

## 7. Blind Draft

Blind Draft is a reward phase after a cleared stage 2 or 4, not a separate bank wager. Each player has one personal Favor token per run. Each player secretly rolls a rank from 1–6 and may spend Favor to add +2. Highest rank picks first; ties reroll among tied players. Players then choose one item each from a shared pool containing one item per active player plus one extra. Favor is not automatically spent, and an AFK player defaults to no spend.

Items are personal-use support tools: the holder chooses when to attach/use the item, but effects apply to the shared team bank. The group may discuss its intended build before the private pick. Draft order, Favor value, and item pool size still require testing; a cooperative group may otherwise treat the contest as cosmetic.

## 8. Candidate items for paper-test only

These are test candidates, not approved balance:
- **Insurance:** once per run, attach before lock; if that wager loses, refund 40% of the stake. If it wins, the item is still consumed.
- **Signal Coupon:** once per run, waive the fee for one clue in Signal Room; it does not change clue accuracy.
- **Vault Harness:** once per run, attach before a Vault attempt; if a continued step fails, refund 30% of the stake. It does not change success odds.
- **Recovery Voucher:** once per run, reduce the recovery fee from 15% to 8% of current bank, rounded up. It does not grant a second recovery.

No generic all-game reroll is included: simulations showed that a retry was either too powerful or nearly irrelevant depending on its penalty. Item effects must be simulated as alternatives with opportunity costs, not as free bonuses.

## 9. Recovery

Once per run, only when strain is 2, the team may pay `ceil(15% of current bank)` to clear one strain and forfeit that stage's item reward. If a Recovery Voucher is attached before the decision, the fee becomes `ceil(8% of current bank)`. Otherwise, the team can attempt the stage normally. Recovery does not guarantee a clear; another miss can return the team to strain 2, and the one-use recovery is spent.

A repeated recovery payment was rejected because it could make strain failure impossible. This one-use rule still needs simulation with item reward opportunity cost.

## 10. AFK, disconnect, and anti-griefing

- One 15-second grace window per run.
- A missing/late route or risk vote defaults to Bank.
- A disconnected player cannot alter a locked stage.
- The authority resolves each stage once and stores the result before broadcasting it.
- No transfers, private side bets, or direct confiscation of another player's resource.
- A player's personal item cannot be activated by another player unless a later design explicitly permits delegation.

## 11. Deterministic example: a successful run

This is arithmetic illustration, not a simulated probability result. No items are used.

| Stage | Event and result | Bank calculation | End bank | Target |
|---|---|---|---:|---:|
| Start | — | — | 1,000 | — |
| 1 | Risk Contract, Safe wins | stake 100; gross 133; net +33 | 1,033 | 1,020 clear |
| 2 | Vault, step 1 succeeds and team cashes out | stake 103; gross `floor(103×1.25)=128`; net +25 | 1,058 | 1,040 clear |
| 3 | Signal Room, one clue, correct answer | stake 105; fee `ceil(2.1)=3`; gross 210; net +105−3 | 1,160 | 1,060 clear |
| 4 | Risk Contract, Safe wins | stake 116; gross 154; net +38 | 1,198 | 1,080 clear |
| 5 | Vault, step 1 succeeds and team cashes out | stake 119; gross 148; net +29 | 1,227 | 1,100 clear |

The team has a draft after stages 2 and 4, but this example ignores item effects to keep the arithmetic independently checkable.

## 12. Deterministic example: early misses and recovery

This is a constructed branch, not a Monte Carlo outcome.

| Point | Event | Bank after settlement | Strain |
|---|---|---:|---:|
| Start | — | 1,000 | 0 |
| Stage 1 | Safe loses stake 100 | 900 | 1 |
| Stage 2 | Balanced loses stake 90 | 810 | 2 |
| Before stage 3 | Pay `ceil(15% × 810)=122`; forfeit item reward | 688 | 1 |
| Stage 3 | Jackpot wins; stake 68, gross `floor(68×20/3)=453`, net +385 | 1,073 | 0 |
| Stage 4 | Safe wins; stake 107, gross 142, net +35 | 1,108 | 0 |
| Stage 5 | Safe wins; stake 110, gross 146, net +36 | 1,144 | 0 |

Recovery salvages this constructed path, but it is not always the optimal choice: paying the fee reduces the bank available to meet the next target. If stage 3 loses, the run remains in danger and the one-use recovery is gone.

## 13. Candidate strategy profiles for testing

1. **Conservative:** Safe when its win can clear the target; Vault cash-out at step 1; buy two clues only when the extra accuracy is worth the fee; favor Insurance.
2. **Quota-aware:** choose the lowest-variance profile that can meet the current target; Vault continues only if the gap requires it; buy the minimum clue count that makes the target attainable; use recovery only when the run's survival value justifies the fee.
3. **Volatility push:** Jackpot when Safe/Balanced cannot clear the gap; continue Vault when the target needs a later payout; skip clues when fees outweigh their target value; favor Vault Harness.

These are hypotheses, not proof of viable strategies. A strategy is viable only if the full-run simulation and human playtest show a meaningful niche without a universal best choice.

## 14. What remains unproven

- The combined event/item/recovery model has not yet been simulated as one system.
- Blind Draft's group dynamics and Favor token value are unknown.
- Candidate item interactions and opportunity costs have not passed a dominance check.
- The 12–20 minute duration target is untested.
- No human paper playtest has occurred.
- No implementation is authorized by this document.

## 15. Decision

This candidate rulebook is stable enough to prepare paper-test materials, but **not stable enough to start implementation**. Gate 08 must simulate the integrated run, check all item combinations and starting-bank/target variations, and revise any dominant strategy before paper testing. A successful paper test is the first evidence about enjoyment; a market-comparability claim still requires real players to choose replay voluntarily.
