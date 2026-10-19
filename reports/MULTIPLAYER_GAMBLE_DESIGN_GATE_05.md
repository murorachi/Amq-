# Multiplayer Gamble Roguelike — Design Gate 05

- Status: **Exact clue probabilities and vote-distribution checks completed; design remains blocked from implementation.**
- Branch: `multiplayer-gamble-engine-discovery-01`.
- Product baseline: V82.82 standalone HTML, 8,787,490 bytes, SHA-256 `227e89d80fa58db8e8f79c59f1203f06f8bc0663d11228d0986fe6e30f81e91b`.
- Reproducible exact-enumeration script: `reports/design_simulations/gamble_roguelike_gate05.py`.
- No product HTML or prototype game source was changed.

## 1. Correcting the Signal Room math

Gate 04's provisional table said two clues gave 2/3 success and a 1.5× gross return. Exact enumeration shows that is incorrect for the clue generator below. The correct success chance with two clues is **3/4**, so the fair gross multiplier is **4/3×**.

### Exact clue generator

There are three equally likely hidden outcomes: A, B, and C. Each clue reveals a pair of possible outcomes that contains the true outcome:
- If the true outcome is A, the clue is AB or AC, chosen uniformly.
- If B, the clue is AB or BC, chosen uniformly.
- If C, the clue is AC or BC, chosen uniformly.

Consequences:
- **No clue:** guess one of three outcomes; success = 1/3.
- **One clue:** two outcomes remain possible; guess between them; success = 1/2.
- **Two independent clues:** if the pairs differ, their intersection is the true outcome and the answer is known; if the pairs match, two outcomes remain. Conditional on the true outcome, the two clue pairs match with probability 1/2 and differ with probability 1/2. Success = (0.5\times0.5+0.5\times1=0.75).

| Clues bought | Success chance | Gross return on correct prediction | Expected gross return / stake |
|---|---:|---:|---:|
| 0 | 1/3 | 3.00× | 1.00× |
| 1 | 1/2 | 2.00× | 1.00× |
| 2 | 3/4 | 4/3× | 1.00× |

Clue fees are additional costs paid from the shared bank and do not change the hidden outcome. A first draft can charge 1% of the current bank for clue one and an additional 2% for clue two. That creates a visible trade-off: more clues improve the chance of clearing the quota, but reduce expected net return by the fee. Fees and integer rounding still need testing at minimum stake.

This exact generator and payout table replace the earlier provisional 2/3 figure.

## 2. Vote rule: median suppresses Push too much in larger rooms

The Gate 04 median rule is robust to outliers, but exact enumeration shows it can nearly remove the high-risk option in a six-player room.

The script models independent player preferences and enumerates every vote combination for 2, 3, and 6 players. These are illustrative preference distributions, not measured human behavior.

### Cautious preference mix: Bank 50%, Balanced 35%, Push 15%

| Players | Plurality + tie compromise: Bank / Balanced / Push | Median: Bank / Balanced / Push |
|---:|---|---|
| 2 | 60.00% / 37.75% / 2.25% | 60.00% / 37.75% / 2.25% |
| 3 | 50.00% / 43.925% / 6.075% | 50.00% / 43.925% / 6.075% |
| 6 | 64.781% / 31.618% / 3.601% | 64.781% / 34.630% / 0.589% |

### More risk-tolerant preference mix: Bank 40%, Balanced 35%, Push 25%

| Players | Plurality + tie compromise: Bank / Balanced / Push | Median: Bank / Balanced / Push |
|---:|---|---|
| 2 | 44.00% / 49.75% / 6.25% | 44.00% / 49.75% / 6.25% |
| 3 | 35.20% / 49.175% / 15.625% | 35.20% / 49.175% / 15.625% |
| 6 | 43.568% / 42.829% / 13.604% | 43.568% / 52.672% / 3.760% |

The exact rule is:
- Each vote is Bank=0, Balanced=1, Push=2.
- **Plurality** chooses the tier with the most votes.
- If all three tiers tie, choose Balanced.
- If Bank and Push tie, choose Balanced.
- If Bank and Balanced tie, choose Bank.
- If Balanced and Push tie, choose Balanced.
- An absent/late vote defaults to Bank.

This is easier to explain as a majority/consensus rule and avoids the median's severe six-player Push suppression. It still gives conservative choices an advantage, which is appropriate for a shared bankroll. The simulation does not prove the rule feels fair; the paper playtest must test that.

## 3. Risk Contract math remains fair before fees/rounding

The current candidate profile set is:
- Safe: 75% at gross 4/3×.
- Balanced: 40% at gross 2.5×.
- Jackpot: 15% at gross 20/3×.

Each has expected gross return exactly 1.0× stake before fees and integer rounding. The point is different variance and quota outcomes, not a hidden house edge. The final implementation must use integer-rational payout definitions, a minimum stake, and an explicit rounding policy rather than floating-point multipliers.

## 4. Design decisions updated

1. One shared team wager per stage remains preferred; do not allow each player to debit a separate wager from the shared bank.
2. Use plurality with explicit tie handling instead of the median vote rule.
3. Signal Room uses the exact pair-clue generator and 1/3, 1/2, 3/4 success rates.
4. Keep the 10-item pool provisional until interaction simulations pass.
5. Do not start server/UI implementation. Mathematical consistency is only one part of the gate.

## 5. Remaining design failures

- The current quota curve has not been tuned across item combinations and recovery branches.
- The reroll item has a large clear-rate effect; its cost/penalty is not final.
- Blind Draft's Favor-token and item-priority value is not modeled.
- The item pool's dangerous combinations and integer rounding have not been exhaustively checked.
- The vote distribution model uses hypothetical preferences, not observed player behavior.
- Three viable strategies have not been demonstrated across seeds and bankroll states.
- The paper-playtest kit is drafted but has not been executed with people.

## 6. Next gate

Design Gate 06 should:
1. Simulate the revised plurality vote and single-wager model across 2/3/6 players with the same total exposure.
2. Add Signal Room clue fees and exact integer payout rounding.
3. Simulate item combinations and recovery choices.
4. Produce a complete five-stage run that includes both success and failure/recovery paths.
5. Demonstrate three viable strategies without a universal best profile/item.
6. Run the paper playtest only when rules are stable enough to execute without improvisation.

**Decision: remain in design. No server, UI, database, or production game code is authorized.**

## 7. Rollback

Gate 05 adds design-only documentation and an exact-enumeration script. Revert those design-only commits on `multiplayer-gamble-engine-discovery-01` to roll back. No product rollback is required.
