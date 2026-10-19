# Multiplayer Gamble Roguelike — Paper Playtest Kit 02

- Status: **Ready for human paper testing; not yet executed.**
- Rules source: `reports/MULTIPLAYER_GAMBLE_RULEBOOK_CANDIDATE_03.md`.
- Do not improvise missing rules. If the facilitator must invent a rule, mark that run invalid and record the missing rule.

## 1. Objective

Test whether the current rules create understandable, consequential decisions and whether players voluntarily want another run. This is not a market study and cannot prove competitor-level appeal by itself.

Test three groups, ideally 2–4 players each. If available, add one six-player group specifically to test vote/draft fairness. Keep the rules, event deck, item pool, and facilitator script identical across groups.

## 2. Materials

- One 1,000-chip bank tracker and five-stage target/strain tracker.
- Event deck: two Risk Contract, two Vault, one Signal Room; shuffle before each run.
- Risk tier cards: Bank (75%, 4/3×, 5% stake), Balanced (40%, 2.5×, 10% stake), Push (15%, 20/3×, 15% stake).
- Vault card: step success 80% / 70% / 60%, cash-out gross 1.25× / 1.80× / 3.00×.
- Signal Room card: A/B/C equally likely; clue success 1/3, 1/2, 3/4; fees 0, ceil(2% stake), ceil(6% stake).
- Item cards: Insurance, Signal Coupon, Vault Harness, Recovery Voucher.
- One Favor token per player, dice or shuffled rank cards 1–6, private risk/item vote slips, and a timer.
- A ledger sheet with columns: opening bank, target, tier, stake, fee, gross payout, item/refund, closing bank, strain.
- One-page rules reference for every participant.

## 3. Fixed rules for the test

- Starting bank 1,000. Five event cards are shuffled from two Risk, two Vault, and one Signal Room.
- At each stage start, target = post-recovery bank + ceil(1% of that bank).
- A miss adds one strain; a clear removes one strain; at 3 strain the run ends.
- Final clear requires completing stage 5 with strain below 3 and bank at least 1,050.
- One shared wager per stage. Stake fraction follows the risk tier. Gross return includes returned stake.
- If strain is 2, recovery may be used once per run: pay ceil(12% bank), clear one strain, and skip the next eligible Blind Draft. Recovery Voucher changes the fee to ceil(8% bank) and is consumed.
- Blind Draft happens after cleared stages 2 and 4. Each active player rolls 1–6 and may spend their once-per-run Favor to add +2. The two highest-ranked players each pick one item in order; ties reroll with raw d6, and any Favor already spent stays spent. Disconnected players do not roll or spend Favor; if nobody is active, skip the draft. The pool has three distinct cards from the four item types. The shared team inventory is capped at two items. A new pick fills an empty slot or replaces one held item chosen by the picker.
- Insurance can attach only to Bank/Balanced; it refunds 10% stake on a loss and is consumed even on a win. Signal Coupon waives the fee for one Signal wager. Vault Harness refunds 20% of stake if a continued Vault step fails. Recovery Voucher lowers recovery fee.
- At most one support item attaches to a wager, chosen by team vote; ties or missing item votes mean no item. Items are shared; no player owns or can transfer an item.
- All payout and fee calculations use whole chips. Two-clue fee is rounded once as ceil(6% stake), not as separate rounded 2% + 4%.

## 4. Session flow

### Setup (2 minutes)
1. Explain that chips are virtual and have no cash value.
2. Show the target, strain, risk tier, and gross-vs-net distinction.
3. Shuffle the five event cards. Do not reveal future order.
4. Give each player the rules reference and private vote slips.

### Teach-back (maximum 3 minutes)
Before starting, ask each player to explain:
- what happens after a win or a loss;
- what the gross multiplier includes;
- how a risk vote is resolved;
- when a stage target is checked;
- what recovery costs and when it can be used;
- how the Vault stop/continue choice works;
- what a Signal clue reveals and how much it costs;
- how Blind Draft and Favor work.

Record misunderstandings before correcting them. If two or more players misunderstand the same rule, flag the rule or presentation as unclear.

### Each stage (target 2–3 minutes)
1. If strain is 2, decide recovery before calculating the new stage target.
2. Reveal event, bank, strain, target, odds, payout, fees, and item eligibility.
3. Allow up to 30 seconds of discussion.
4. Each player privately votes Bank / Balanced / Push. Missing vote defaults to Bank. Resolve plurality and published tie rules. If an eligible item is proposed, the team votes whether to activate it; a tie or missing item vote means no item.
5. Resolve the item-use vote and attach the chosen eligible item before the lock.
6. Lock the single team wager and resolve the event using the printed probability table.
7. Record each ledger entry, closing bank, target result, and strain change.
8. After cleared stage 2 or 4, run Blind Draft unless recovery skips that draft.

Do not advise players on optimal strategy. Record any intervention needed to continue.

## 5. Observer sheet

Record one row per stage:
- starting bank, target, strain, event, risk votes, winning tier;
- stake, clue fees, gross payout, item used, net bank change;
- target clear/miss, strain change, recovery decision;
- discussion seconds and number of players who gave a reason;
- who spoke most, who was silent, and whether anyone felt ignored;
- decision consequence rating (1–5);
- outcome fairness/explainability rating (1–5);
- any spontaneous tense, satisfying, confusing, funny, or frustrating moment.

After the run, record total duration, final bank, clear/fail, item choices, and whether players asked to replay before being prompted.

## 6. Post-run questions

Ask each player privately:
1. Which decision mattered most, and why?
2. Was there a point where you felt you had no meaningful choice?
3. Did the risk vote represent the group fairly?
4. Did anyone dominate or get ignored?
5. Did an item change your plan, or was it just a numerical bonus?
6. Which rule was hardest to understand?
7. Did any loss feel arbitrary? Which one?
8. Would you voluntarily play another run with this group? Why?
9. What would you remove before adding a new feature?

Do not lead with “Was it fun?” Ask for a concrete moment first.

## 7. Initial pass/fail gates

Treat these as prototype thresholds, not evidence of market-wide appeal.

- At least 70% of participants would play another run.
- Median run duration is 12–20 minutes.
- At least 80% can explain gross payout, stage target, strain, and recovery without help after teach-back.
- No participant is inactive for more than 20% of the session.
- At least two of three groups identify a consequential decision in every run.
- At least two different strategy profiles appear across groups.
- No item is automatically selected whenever offered.
- At least 80% rate outcome explainability at 4/5 or higher.
- The six-player group, if tested, does not report systematic vote/draft unfairness that the smaller groups did not experience.

Report counts as well as percentages. With small samples, 2 of 3 players is not “67% market validation.”

## 8. Stop-and-revise conditions

Stop the session or invalidate the run if:
- payout/fee math is inconsistent;
- players cannot tell whether the stake is included in gross return;
- the bank can become negative;
- an item or recovery effect triggers twice;
- a locked wager can be edited;
- a player can activate an item without the published team vote;
- the facilitator has to invent a rule;
- a player has no meaningful action for an entire stage.

## 9. Current decision

The rulebook and numeric baseline are stable enough for this paper test. They are **not evidence that the game is already as fun as existing products**. Do not begin server/UI implementation until paper sessions show meaningful decisions and voluntary replay intent. Even a successful paper test only authorizes a low-fidelity prototype for a second round of human testing.
