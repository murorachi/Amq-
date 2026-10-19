# Multiplayer Gamble Roguelike — Design Gate 04

- Status: **Vote protocol and paper-test plan drafted; implementation gates still fail.**
- Branch: `multiplayer-gamble-engine-discovery-01`.
- Product baseline: V82.82 standalone HTML, 8,787,490 bytes, SHA-256 `227e89d80fa58db8e8f79c59f1203f06f8bc0663d11228d0986fe6e30f81e91b`.
- Related reports: Design Gates 01–03 and `reports/MULTIPLAYER_GAMBLE_PAPER_PLAYTEST_01.md`.
- No product or prototype game source was changed.

## 1. New design question

Gate 03 recommends one shared wager per stage, but that removes the idea of each player independently placing a bet. The replacement must preserve player agency and social negotiation without making total risk scale linearly with party size.

### Vote protocol proposal

Each active player privately submits one risk vote:
- **Bank = 0**
- **Balanced = 1**
- **Push = 2**

After the deadline, sort the votes. With an odd number of votes, use the middle vote. With an even number, average the two middle votes and round down. This is the median risk level. Examples:
- 2 players vote Bank + Push → Balanced.
- 3 players vote Bank + Balanced + Push → Balanced.
- 6 players split 3 Bank / 3 Push → Balanced.
- 4 Bank / 2 Push → Bank.
- 4 Push / 2 Bank → Push.

A disconnected or timed-out player defaults to Bank for that stage. The server locks one team wager, so six players cannot each debit 10% of the same bankroll. The initial stake is 10% of the shared bank, subject to a hard per-stage cap and integer rounding. If the bank cannot cover the minimum stake, the run enters a documented recovery/end state; no client can override the amount.

This rule is deterministic and easy to explain, but it may overuse Balanced when groups disagree. The paper test must record whether the median feels like a fair compromise or an arbitrary compromise that ignores player intent.

## 2. Avoiding duplicate mechanics

The earlier four-game set contained both Vault and Team Gamble, which risked making two versions of “push or stop.” The revised core set is:

1. **Risk Contract:** select a probability/reward profile. The main decision is which risk curve fits the quota gap and the team's tolerance.
2. **Vault:** after each successful step, choose to cash out or continue. The main decision is when to stop after progress has already been made.
3. **Signal Room:** each player receives a partial clue about a hidden outcome. The team chooses whether to pay for additional clues before locking its prediction. The main decision is how much information is worth buying.
4. **Blind Draft:** a simultaneous hidden-rank contest decides who chooses a run-only item first. Players may spend a limited personal Favor token to improve rank. The reward is item priority, not a transfer of shared chips.

The group risk vote is a protocol used by relevant events, not a separate game. This avoids counting two similar push-your-luck variants as two distinct mechanics.

## 3. Signal Room's first math shape

Use three equally likely outcomes and a single shared stake. A prediction without clues has a 1/3 success chance and a 3.0× gross return. A first clue raises the modeled success chance to 1/2 and lowers the gross return to 2.0×; two clues raise it to 2/3 and lower the gross return to 1.5×. These are fair expected gross returns before clue fees and rounding.

- No clue: expected gross = (1/3) × 3.0 = 1.0× stake.
- One clue: expected gross = (1/2) × 2.0 = 1.0× stake.
- Two clues: expected gross = (2/3) × 1.5 = 1.0× stake.

Each clue has a visible fee and reveals information rather than changing the hidden outcome. Because the expected gross return is equal before fees, buying a clue trades expected net value for a higher chance of meeting a quota. The model still needs to define exactly what each clue reveals and validate that the stated conditional success rates are achievable by the clue generator.

## 4. Economy conclusions so far

- Use fair-EV candidate multipliers before fees/rounding to avoid a severe built-in house edge. Any fee must be explicit and independently calculated.
- One team wager per stage is preferred. Separate player wagers against the same shared bank make exposure and variance depend on player count.
- The median vote maps individual risk preferences into one team action. It must be tested for perceived fairness and whether it creates real discussion.
- A quota should not force the same profile every time. Safe is appropriate when the gap is small; higher variance must offer useful upside when the team needs growth, without being universally optimal.
- Recovery cannot be free and guaranteed, but it must leave players a meaningful decision instead of making a third miss an automatic dead turn.

## 5. Paper-playtest readiness

A draft facilitator kit is in `reports/MULTIPLAYER_GAMBLE_PAPER_PLAYTEST_01.md`. It specifies the session structure, player observation fields, non-leading interview questions, and prototype thresholds.

This does **not** mean the game has passed a fun gate. No human playtest has occurred. The paper test is only useful after the cards, payout tables, clue effects, and recovery branch are fixed enough that the facilitator can run the same rules for each group.

## 6. Remaining failures

- The 10-item pool and high-risk item pairs have not been simulated.
- Signal Room clue generation has a probability target but not a fully specified clue distribution.
- Blind Draft's Favor-token value and item-pick value are not modeled.
- The median vote may frustrate players whose vote is not reflected in the result.
- Recovery and AFK/disconnect rules are not fully integrated into a complete five-stage run.
- Three viable strategies have not been demonstrated across different seeds/bankroll states.
- No human playtest has been run.

## 7. Decision and next gate

**Remain in design. No server/UI/database implementation.**

Design Gate 05 must:
1. Specify Signal Room's actual clue distribution and verify its conditional probabilities exactly.
2. Simulate the vote protocol for 2/3/6 players and test whether party size changes the resulting risk profile too much.
3. Simulate item combinations, fees, integer-chip rounding, caps, and recovery.
4. Produce a complete 5-stage sample run with at least one loss/recovery branch.
5. Confirm three distinct viable strategies and write the final paper-test cards.
6. Re-run the design gates. If strategy diversity or math gates still fail, revise rather than code.

## 8. Rollback

Gate 04 adds design documentation only. Revert the Gate 04 report and paper-test kit on `multiplayer-gamble-engine-discovery-01` to roll back. No product rollback is required.
