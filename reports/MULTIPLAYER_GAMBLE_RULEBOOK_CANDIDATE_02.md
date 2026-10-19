# Multiplayer Gamble Roguelike — Rulebook Candidate 02

- Status: **Revised base economy has distinct strategy niches in simulation; items and multiplayer fairness are still unvalidated.**
- Supersedes Candidate 01 for current numeric rules. Gate 01–09 reports remain historical checkpoints.
- Design only. No production game/server/UI/database implementation.

## 1. Product promise

A cooperative 2–6 player gambling roguelite. The team shares a virtual bankroll and tries to complete five escalating stages by choosing risk exposure, when to stop, how much information to buy, and which limited-use items to draft. Odds and gross payouts are shown before lock; every settlement is auditable.

Virtual chips have no cash value. No real-money wagering, cash-out, player-to-player transfer, private side bets, or persistent wallet in the first release. AMQ songs are optional theme/event content, not a required game mechanic.

## 2. Run setup and objective

- Starting bank: 1,000 chips (balance scales proportionally in test variants).
- Five stages. For the paper-test baseline, shuffle a fixed deck of two Risk Contract cards, two Vault cards, and one Signal Room card at run start. Blind Draft is a reward phase after stages 2 and 4 if the stage target was cleared. Route voting is deferred; risk voting already provides a team decision, and adding a second vote is not yet justified.
- At each stage start, target = current bank + `ceil(1% × current bank)`.
- The target is checked after all fees, payouts, refunds, and item effects settle.
- Miss target: strain +1. Clear target: strain −1 to a minimum of zero. At 3 strain, the run ends immediately.
- Run clears after stage 5 if strain is below 3 and final bank is at least 105% of the starting bank. Higher final-bank thresholds can be optional score tiers.
- A wager win does not automatically clear the stage; the settled bank must reach the displayed target.
- All chips are integers. Gross return includes the returned stake.

## 3. Standard stage flow

1. If strain is 2, resolve the optional recovery decision first. Then reveal the post-recovery bank, stage target, risk tiers, odds, gross payout, fees, and eligible item effects.
2. Players discuss for up to 30 seconds and submit private risk votes.
3. Resolve votes simultaneously; missing/late votes default to Bank.
4. The team may use at most one shared item per wager. No edits after lock.
5. Lock one shared wager using the stake fraction for the selected risk tier.
6. Generate the outcome only after lock; settle the ledger atomically.
7. Show the exact ledger entries, check target/strain, and offer any eligible draft reward.
8. After cleared stages 2 and 4, run Blind Draft.

Each stage resolves once. Reconnected clients receive the existing result and cannot replace a locked action.

## 4. Risk tiers and voting

| Vote/tier | Win probability | Gross payout | Stake as % of current bank | Integer payout |
|---|---:|---:|---:|---|
| Bank / Safe | 75% | 4/3× | 5% | `floor(stake × 4 / 3)` |
| Balanced | 40% | 2.5× | 10% | `floor(stake × 5 / 2)` |
| Push / Jackpot | 15% | 20/3× | 15% | `floor(stake × 20 / 3)` |

All gross multipliers include the returned stake. The theoretical expected gross return is 1.0× stake before integer rounding and fees. Integer flooring gives Safe and Jackpot a small implicit EV loss at some stakes; the UI and math tests must report the actual integer payout, not pretend rounding is free.

Risk votes use plurality:
- Three-way tie or Bank-vs-Push tie → Balanced.
- Bank-vs-Balanced tie → Bank.
- Balanced-vs-Push tie → Balanced.
- Missing/late vote → Bank.

The tier determines the wager size across all wager events, not just Risk Contract. This is the central shared-risk choice; six players still produce only one team wager.

## 5. Risk Contract

The selected tier determines the probability, gross multiplier, and stake fraction. A win returns the integer gross payout; a loss loses the stake. The stage target is checked only after settlement.

## 6. Vault

The team places one wager at the selected tier's stake fraction. A failed step loses the full stake, unless a pre-attached item explicitly refunds part of it. After each successful step, the team may cash out or continue.

| Step | Success chance | Gross payout if cashed out |
|---|---:|---:|
| 1 | 80% | 1.25× |
| 2 | 70% conditional on reaching step 2 | 1.80× |
| 3 | 60% conditional on reaching step 3 | 3.00× |

The payout at a chosen cash-out point is calculated from the original stake. A successful later step replaces the earlier cash-out opportunity; the team cannot bank an earlier payout and continue with the same stake.

Step 1 is a meaningful low-risk stop. Continuing after step 1 has conditional expected gross 0.70 × 1.80 = 1.26× versus 1.25× cash-out. After step 2, continuing has 0.60 × 3.00 = 1.80×, equal to the step-2 cash-out before rounding. The target, strain, and item state may justify different decisions. Integer payout boundaries still require exact automated tests.

## 7. Signal Room

The hidden result is A/B/C, equally likely. Each clue reveals a pair of outcomes containing the true answer, uniformly chosen from the two pairs containing it. Two clues are independent.

| Clues | Success chance | Gross payout if correct | Fee |
|---|---:|---:|---:|
| 0 | 1/3 | 3× | 0 |
| 1 | 1/2 | 2× | `ceil(2% of stake)` |
| 2 | 3/4 | 4/3× | `ceil(6% of stake)` |

Fees are paid from the bank and are non-refundable, including on a wrong answer. They do not change the hidden outcome. Clue accuracy is exactly 1/3, 1/2, and 3/4. Gross EV is 1.0× stake before fees/rounding; clue fees reduce net EV in exchange for better odds.

## 8. Blind Draft

Blind Draft is a reward phase after a cleared stage 2 or 4, not a separate bank wager. Each player has one personal Favor token per run. Players secretly roll rank 1–6 and may spend Favor to add +2. Highest rank picks first; ties reroll among tied players. Favor is not automatically spent; AFK players default to no spend.

The draft pool contains three distinct item cards drawn from the four item types. The two highest-ranked players each choose one item in order. The inventory is shared by the team and capped at two items, independent of party size. If a pick is not already held, it is added if a slot is free; otherwise the picker chooses one held item to replace. The replaced item is discarded. The team can discuss a build, but each pick is binding. Item use is decided by a majority vote before the wager lock. This makes draft priority meaningful without multiplying item count with player count. Draft fairness and Favor value remain unvalidated.

## 9. Candidate items for test only

- **Insurance:** attach before a Bank or Balanced wager; if it loses, refund 10% of the stake. It cannot be attached to Push. The item is consumed even if the wager wins.
- **Signal Coupon:** when the team buys at least one clue, waive that Signal Room wager's fee. It does not alter clue accuracy; if no clue is bought, the coupon remains unused.
- **Vault Harness:** attach before continuing past Vault step 1; if a continued step fails, refund 20% of the original stake. Consumed once attached to a continued attempt.
- **Recovery Voucher:** once per run, reduce the recovery fee from 12% to 8% of current bank, rounded up. It does not grant another recovery.

No generic all-game retry item. Earlier simulations found that a retry was either too powerful or nearly irrelevant depending on its penalty. Item values are provisional and must be tested with acquisition opportunity cost and combinations.

At most one support item may be attached to a wager. Recovery Voucher applies only to the recovery decision, not a wager.

## 10. Recovery, AFK, and anti-griefing

Recovery is usable at most once per run, only at 2 strain. Pay `ceil(12% of current bank)` to clear one strain and skip the next eligible Blind Draft; otherwise decline and attempt the stage normally. If a Recovery Voucher is held, the fee is `ceil(8% of current bank)` and the voucher is consumed. Calculate the stage target after recovery settles. Recovery does not guarantee a clear. Repeatable recovery was rejected because it could make strain failure impossible.

- One 15-second grace window per run.
- Missing/late risk vote defaults to Bank; no Favor is spent automatically.
- A disconnected player cannot alter a locked stage.
- The authority resolves each stage once; reconnecting clients read the stored result.
- No transfers, private side bets, or direct confiscation of another player's resources.
- Another player cannot activate a personal item unless a later rule explicitly permits delegation.

## 11. Deterministic successful-run example

Arithmetic illustration only; it is not a simulated probability outcome. All stages use Bank tier (5% stake). No items are used.

| Stage | Event and outcome | Calculation | End bank | Target |
|---|---|---|---:|---:|
| Start | — | — | 1,000 | — |
| 1 | Risk Contract wins | stake 50; gross `floor(50×4/3)=66`; net +16 | 1,016 | 1,010 clear |
| 2 | Vault step 1 wins, cash out | stake 50; gross `floor(50×1.25)=62`; net +12 | 1,028 | 1,027 clear |
| 3 | Signal Room, two clues, correct | stake 51; fee 4; gross `floor(51×4/3)=68`; fee `ceil(6%×51)=4`; net +17−4 | 1,041 | 1,039 clear |
| 4 | Risk Contract wins | stake 52; gross `floor(52×4/3)=69`; net +17 | 1,058 | 1,052 clear |
| 5 | Vault step 1 wins, cash out | stake 52; gross `floor(52×1.25)=65`; net +13 | 1,071 | 1,069 clear |

Final bank 1,070 exceeds 1,050, so this constructed path clears. Blind Draft is available after stages 2 and 4.

## 12. Candidate strategies and evidence

Gate 09 tested the base economy without items/recovery, using 100,000 runs per configuration and seed 20261020. Event order: Risk Contract, Vault, Signal Room, Risk Contract, Vault. It varied starting bank 750 / 1,000 / 1,500 and final-bank goal.

- **Conservative:** Bank tier, 5% stake, Vault cash-out at step 1, two clues.
- **Balanced:** Balanced tier, 10% stake, Vault cash-out at step 2, one clue.
- **Push:** Push tier, 15% stake, Vault continues to step 3, no clues.

At a final goal of 105% of starting bank, clear rates were about 27.1%, 41.5%, and 17.2% respectively across the tested starting-bank values. Conservative had the lowest strain-failure rate (about 3.4%), Balanced led at the normal clear goal, and Push performed best at the 150% high-score tier (about 11.6%, versus Balanced 2.5%). This creates candidate niches, not proof of fun or final balance.

## 13. Remaining gates

- Add items and recovery back into the revised relative-target model; test combinations and ownership.
- Vary event order and route choice.
- Verify integer payout/fee boundaries for all stake tiers.
- Simulate 2/3/6-player votes, Favor use, AFK, and draft priority.
- Finalize paper-test cards only after item effects stop collapsing the base strategy niches.
- Human paper playtest has not occurred. No claim of competitor-level enjoyment is justified.

**Decision: remain in design. No server, UI, database, or product implementation.**
