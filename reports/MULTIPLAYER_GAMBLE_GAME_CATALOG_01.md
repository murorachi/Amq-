# Multiplayer Gamble Roguelike — Game Catalog 01

- Status: **Concept catalog; no game is implemented or numerically approved.**
- Branch: `multiplayer-gamble-engine-discovery-01`.
- Design objective: establish a broad casino-like game library before balancing or implementing individual games.
- Currency is fictional, run-local virtual chips only. No cash-out, real-money stakes, player-to-player transfers, or real-world value.
- Candidate 03's five-stage quota loop is not the active target. This catalog explores the game layer independently.

## 1. Product requirement

Two or three available games are not enough to support the intended fantasy of a multiplayer gambling video game. The product needs a varied game floor where the available options differ in player decisions, resolution rhythm, volatility, and the stories they create.

A game counts as mechanically distinct only if its core decision or risk shape differs. Changing a coin to a die, changing the art, or changing a payout number does not create a new game.

## 2. Proposed library shape

Target **12 launch-ready games**, with **15 candidates** in the discovery pool. This is a design target, not a promise that all 15 should ship. The initial prototype should test 6 mechanically diverse games; weak or redundant concepts should be cut before implementation.

### A. Fast single-resolution games

#### 1. Coin Call — Double or Nothing
- **Core loop:** wager, call a side, reveal once.
- **Decision:** choose the side and stake size; relics can alter the risk/reward shape.
- **Feel:** immediate, readable, low ceremony.
- **Distinctive hook:** streaks can offer an optional double-or-nothing continuation.
- **Risk:** too shallow if every round is just a binary call. Treat it as a quick filler, not the main attraction.

#### 2. Exact Seven — Dice Sum
- **Core loop:** choose a target sum or range, then roll two dice.
- **Decision:** pick a narrow high-payout result or a broad lower-payout range.
- **Feel:** readable odds with an intuitive near miss.
- **Distinctive hook:** a relic can let the team hold one die and reroll the other, or turn a near miss into a curse-powered bonus.
- **Risk:** if all bets are obvious probability-vs-payout choices, it becomes a math quiz. Add run-state modifiers rather than hiding the odds.

#### 3. Blind High Card — Simultaneous Risk
- **Core loop:** players privately choose how much of a shared stake to expose, then reveal cards or ranks simultaneously.
- **Decision:** coordinate a commitment without knowing other players' choices.
- **Feel:** social tension and bluff-adjacent uncertainty.
- **Distinctive hook:** shared pot can be won, split, or lost depending on the team's reveal pattern.
- **Risk:** voting/coordination can be slow; do not make it merely a disguised tier vote.

#### 4. Wheel of Misfortune — Prize Wheel
- **Core loop:** choose one of several wheel sectors before the spin.
- **Decision:** select a sector with a visible probability and a sharply different outcome profile.
- **Feel:** suspenseful reveal and occasional spectacular hit.
- **Distinctive hook:** sectors can include jackpot, bust, curse, relic, debt, or a volatile reroll token, so the outcome is not only a chip multiplier.
- **Risk:** if every sector is only a payout, this is a reskinned roulette. Keep event outcomes that change the run.

### B. Stop-or-continue games

#### 5. Vault Ladder — Push Your Luck
- **Core loop:** make a sequence of increasingly risky attempts; after each success choose cash out or continue.
- **Decision:** lock a real gain versus risk the unbanked prize.
- **Feel:** greed, regret, relief, and tense group debate.
- **Distinctive hook:** the current prize is lost on a failed continuation unless a specific protection applies.
- **Risk:** ensure cash-out is always a real choice, not obviously dominated by a single threshold.

#### 6. Minefield — Hidden Tiles
- **Core loop:** reveal tiles one at a time; safe tiles grow the prize, a mine ends the run for the current unbanked prize.
- **Decision:** choose when to stop and whether to spend a one-use scan or shield.
- **Feel:** accumulating tension with visible personal/team responsibility.
- **Distinctive hook:** relics can move one mine, reveal a dangerous row, or double the prize while adding a hidden hazard.
- **Risk:** avoid false “skill” claims when tiles are purely random; communicate the actual information available.

#### 7. Rising Tide — Escalating Threshold
- **Core loop:** the required roll/result threshold rises after each success while the prize grows.
- **Decision:** continue now, cash out, or use a limited stabilizer.
- **Feel:** pressure that escalates naturally instead of being driven by a stage quota.
- **Distinctive hook:** a curse can accelerate the threshold; a relic can freeze one step.
- **Risk:** overlaps with Vault Ladder unless its resolution mechanic and information profile remain distinct.

### C. Multi-outcome and jackpot games

#### 8. Jackpot Draw — Rare Grand Prize
- **Core loop:** draw from a clearly described outcome distribution with many losing outcomes and a rare run-changing jackpot.
- **Decision:** choose how much of the bank to commit and whether to activate a jackpot modifier.
- **Feel:** frequent disappointment punctuated by a memorable hit.
- **Distinctive hook:** jackpot can grant chips plus a powerful relic, extra life, or a choice among rewards.
- **Risk:** pure lottery mechanics can make players feel powerless. It should be one option among several, not the entire game.

#### 9. Three-Reel Relics — Symbol Match
- **Core loop:** commit a stake, spin three reels, and resolve symbol combinations.
- **Decision:** choose one of several reel sets or a risk mode; relics can substitute, lock, or corrupt symbols.
- **Feel:** fast sensory reveal and rare high-value combinations.
- **Distinctive hook:** symbols can grant effects or curses, not only payout multipliers.
- **Risk:** ordinary slot-machine behavior is mostly passive. A version with no meaningful pre-spin or post-spin choice should not count toward the 12-game target.

#### 10. Card Duel — High / Low / Exact
- **Core loop:** reveal a public card; predict higher, lower, or an exact band for a payout ladder.
- **Decision:** choose a safer call or a narrow high-payout call, with optional continuation after a win.
- **Feel:** quick probability tension and visible near misses.
- **Distinctive hook:** a limited peek, card burn, or suit relic changes the decision.
- **Risk:** overlaps with Coin Call unless it includes meaningful information or continuation decisions.

#### 11. Race Book — Multi-Runner Race
- **Core loop:** choose one of several runners with displayed odds, then resolve a short race.
- **Decision:** back a likely favorite, a long shot, or a special condition.
- **Feel:** suspense that builds during resolution; good for group cheering.
- **Distinctive hook:** event modifiers and relics alter runner traits, weather, or finish conditions.
- **Risk:** players may be passive after choosing. Add a limited mid-race intervention only if it does not turn the game into button spam.

#### 12. Hazard Market — Buy the Outcome Band
- **Core loop:** choose one of several public outcome bands; a shared random result determines which band wins.
- **Decision:** pick the band that best fits the current bank, relics, and risk appetite.
- **Feel:** strategic anticipation with multiple plausible choices.
- **Distinctive hook:** players can split a limited stake across bands, but doing so reduces the top payout; one band may trigger a run event instead of chips.
- **Risk:** can collapse into a static odds table. Require meaningful stake allocation or event interaction.

### D. Social / shared-pot games

#### 13. Pot Split — Cooperative or Greedy Claim
- **Core loop:** players secretly choose claim, share, or insure; outcome depends on the combination of choices and a public random event.
- **Decision:** trust the group, protect oneself, or chase a larger individual reward.
- **Feel:** social pressure, suspicion, and post-reveal discussion.
- **Distinctive hook:** the group can collectively win more by coordinating, but one greedy choice can change the payout.
- **Risk:** avoid punishing a single player arbitrarily or letting social dominance dictate every result.

#### 14. Last Seat — Elimination Bracket
- **Core loop:** a small field of cards/dice competes through short rounds; the team backs a survivor or chooses a bracket.
- **Decision:** choose between a likely survivor with modest return and a volatile underdog.
- **Feel:** a mini-event with a clear narrative arc.
- **Distinctive hook:** relics can revive one eliminated contender, swap two ranks, or increase the prize for an upset.
- **Risk:** keep resolution short; do not require players to track a full tournament tree.

#### 15. Debt Collector — Borrow Against Tomorrow
- **Core loop:** take a temporary loan or accept a curse to access a high-payout wager now; debt is settled at a later milestone.
- **Decision:** take a powerful immediate chance at the cost of future flexibility.
- **Feel:** desperation, temptation, and delayed consequences.
- **Distinctive hook:** some relics refinance debt, while others turn repayment into a risky wager.
- **Risk:** delayed costs must be obvious and enforceable; avoid bookkeeping that overwhelms the game.

## 3. Diversity matrix

| Game | Main decision | Resolution | Volatility target | Social tension | Run-changing effects |
|---|---|---|---|---|---|
| Coin Call | side/stake, optional double | instant | low–high by mode | low | streak |
| Exact Seven | target width | instant | medium–high | low | reroll/near-miss effects |
| Blind High Card | simultaneous commitment | reveal | medium–high | high | pot rules |
| Wheel of Misfortune | sector selection | spin | high | medium | curse/relic/event |
| Vault Ladder | stop/continue | repeated | escalating | high | cash-out prize |
| Minefield | reveal/stop | repeated | escalating | medium–high | shield/scan |
| Rising Tide | stop/continue under rising odds | repeated | escalating | medium | threshold effects |
| Jackpot Draw | stake/modifier | instant | extreme | medium | major jackpot |
| Three-Reel Relics | reel set/mode | instant | high–extreme | low | symbol effects |
| Card Duel | higher/lower/exact, continue | staged | medium–high | medium | information relic |
| Race Book | runner/condition | timed reveal | medium–extreme | high | race modifiers |
| Hazard Market | band/stake allocation | instant | selectable | medium | event band |
| Pot Split | trust/claim | simultaneous | variable | extreme | cooperation outcomes |
| Last Seat | survivor/bracket | short sequence | high | medium–high | upset effects |
| Debt Collector | borrow/curse vs future cost | multi-stage | extreme | high | debt/relic interactions |

## 4. Launch selection rule

Do not simply ship the first 12. First paper-prototype six that cover different mechanics:
1. Vault Ladder
2. Minefield
3. Jackpot Draw
4. Wheel of Misfortune
5. Pot Split
6. Debt Collector

These six are deliberately not all probability-pick games: they cover push-your-luck, hidden information, rare jackpot, event wheel, social coordination, and delayed cost. Keep Coin Call and Exact Seven as quick games if they prove useful as short interludes.

A concept survives only if:
- players make at least one consequential decision beyond choosing a stake;
- it has a distinct emotional rhythm from the other games;
- its outcome distribution supports its intended feeling;
- it creates a reason to choose it in some run states but not all;
- it can be explained and resolved without excessive bookkeeping;
- players can describe a memorable moment afterward.

## 5. Prototype scope

The next artifact should define concrete paper rules and example rounds for the six selected games, not code. Use deliberately asymmetric provisional payout tables where appropriate. Evaluate catastrophic loss, rare jackpot, greedy continuation, a social betrayal/coordination outcome, and debt coming due.

Run simulations only after the paper rules are coherent. Use simulations to find payout bugs, dominant choices, unbounded loops, and outcome frequencies. Do not tune all games toward equal expected value or equal success rates.

## 6. Boundaries

- This is a concept catalog, not implementation approval.
- No real-money gambling, cash-out, or player-to-player transfer.
- No server/UI/database work is authorized by this document.
- Candidate 03 and Gate 05–14 remain historical records, not the active design target.
- Human testing is still required before claims about fun or replayability.
