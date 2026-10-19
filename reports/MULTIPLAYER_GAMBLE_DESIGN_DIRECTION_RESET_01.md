# Multiplayer Gamble Roguelike — Design Direction Reset 01

- Status: **Direction reset requested by product owner; Candidate 03 is no longer the design target.**
- Branch baseline inspected before change: `c3b6cba2f4d0a24d1d9061fe013b2e0637670fca`.
- Scope: design only. No production AMQ HTML, multiplayer implementation, server, UI, or database changed.
- This document does not silently overwrite Candidate 03. Candidate 03 and Gates 05–14 remain historical evidence for what went wrong.

## 1. Product-owner feedback

The current design over-optimized for fair expected value, stable strategy niches, and measurable clear rates. It has made most bets too legible as resource-management choices. If players can mentally average the result before locking in, then a technically tidy probability table is not creating the intended gambling feeling.

**New priority: memorable volatility and consequential temptation, not absolute balance.**

Fairness still means that the stated rules and odds are honest, the result is not secretly manipulated, and the settlement is correct. It does *not* mean every wager has equal expected value, every strategy is equally strong, every player has the same chance of success, or every run should end near its starting bankroll.

## 2. Design principles replacing the old target

1. **Outcomes must be hard to emotionally predict.** A player can understand the odds without being able to predict the next result. Most wagers should not feel like they produce a small, stable, expected bank adjustment.
2. **Asymmetric payouts are allowed.** A wager may be a bad long-term financial deal but still be tempting because it can rescue a doomed run, trigger a powerful upgrade, or create a memorable jackpot.
3. **Risk profiles must feel different, not merely differ by stake percentage.** The player should choose between a frequent small result, a brutal high-variance gamble, and a push-your-luck sequence with a real decision to stop.
4. **Allow bad decisions and spectacular wins.** There must be space for regret, relief, greed, celebration, and “we should never have survived that.” A universal safe strategy is a design failure if it removes these moments.
5. **Do not conceal the odds to fake suspense.** Show the probability and payout range honestly. Suspense comes from the distribution, stakes, evolving run state, and stop/continue decision, not from misleading the player.
6. **Use progression to distort incentives.** Relics, curses, streaks, debt, jackpots, and event modifiers can make a currently terrible bet attractive for a specific run. Avoid making every run use the same optimal answer.
7. **Balance is a constraint, not the fantasy.** Prevent exploits, dead decisions, and unavoidable non-games. Do not normalize every option to 1.0× expected gross return or tune all strategies to comparable clear rates.
8. **Simulations answer “what happens?” not “is this exciting?”** Use them to expose dead ends, dominant loops, runaway payouts, and frequency distributions. Do not treat stable win rates as a fun metric.

## 3. Candidate wager shapes to explore

These are design probes, not final rules or approved numbers.

### A. House game: frequent pain, rare spectacle
- Most outcomes lose some or all of the stake.
- A small outcome band returns a modest prize.
- A rare top result pays a dramatic multiplier or grants a run-changing relic.
- The wager is intentionally negative-EV unless a relic, curse, streak, or current run objective changes its value.
- Test whether the rare outcome is memorable enough to justify the frequent losses without making players feel their choices do not matter.

Illustrative distribution only: 65% lose the stake, 25% receive a partial return, 9% receive a meaningful win, 1% hit a major jackpot. The exact payout table must be designed from the desired experience, not reverse-engineered to force 1.0× EV.

### B. Push-your-luck ladder
- A successful result unlocks a larger next payout.
- After every success, the team chooses cash out or continue.
- Continuing risks losing the current unbanked prize, not merely losing a small fixed stake.
- Relics may change one rung, protect one loss, or make a high rung reachable.
- The interesting question is “Do we take the win now or risk the whole run-changing prize?” not “Which option has the best expected value to two decimal places?”

### C. Run-rescue desperation bet
- When the team is close to failure, it can stake a large fraction of the bankroll for a small chance to reverse the run.
- A loss should hurt visibly; a win should materially change the team's options.
- This is not a mathematically safe recovery button. It is a deliberate gamble with a dramatic downside.
- It should be optional, legible, and never the only viable action every stage.

### D. Relic-modified gambling
- Relics alter the shape of outcomes rather than simply refunding 10% of a loss.
- Examples to test: increase jackpot chance but add a curse on misses; turn one ordinary win into a streak multiplier; let the team bank a partial ladder prize but remove access to the final jackpot; make the next wager double-or-nothing after a win.
- Relics can be strong, narrow, and occasionally dangerous. The goal is interesting combinations, not identical average power.

## 4. What to stop doing

- Stop treating 1.0× expected gross return as a default acceptance criterion.
- Stop treating similar clear rates as proof that strategies are healthy.
- Stop making each tier differ mainly by stake fraction and fair multiplier.
- Stop using stage quota arithmetic as the main source of tension.
- Stop polishing the current paper-test kit as if Candidate 03 were approved.
- Do not implement a server/UI based on Candidate 03.
- Do not replace one rigid “balanced” system with random outcomes that erase agency. Volatility without consequential choices is just a slot machine with extra steps.

## 5. New evaluation questions

For every proposed wager, record:
- Outcome distribution, including loss frequency and the 50th/90th/99th percentile return.
- How often the player experiences a near miss, meaningful win, and run-changing result.
- Whether a player can explain what they are risking and what the upside is.
- Whether the bet is tempting for a reason tied to the current run state.
- Whether a different choice could reasonably change the outcome path.
- Whether one wager dominates all others across most run states.
- Whether bad luck ends a run before the team has made any meaningful decision.
- Whether the result produces a story players would tell after the run.

Do not optimize to a single global clear-rate target. Use ranges to identify broken extremes, not to make all strategies converge.

## 6. Next design experiment

Build a small, deliberately asymmetric **three-wager prototype on paper**:
1. a lower-volatility wager with frequent modest outcomes but a real downside;
2. a jackpot wager with frequent losses and a rare, very large payoff;
3. a push-your-luck ladder where each success forces a cash-out-or-continue decision.

Use a short 3-stage run and a small set of run-changing relics. Keep numbers provisional. Compare full outcome distributions and play through concrete example runs, including a catastrophic loss, a jackpot rescue, and a ladder cash-out regret. Then inspect whether the choices feel emotionally and strategically distinct.

Only after those examples are compelling should we run Monte Carlo checks for exploit detection and prepare a new human playtest kit. The previous 5-stage, quota-driven Candidate 03 is not the baseline for this experiment.

## 7. Acceptance boundary

A design pass requires:
- at least one memorable high-variance path that cannot be reduced to “choose the highest EV every time”;
- clear and honest odds/payouts;
- meaningful stop/continue or stake-sizing decisions;
- multiple run states where different wagers become tempting for different reasons;
- no obvious infinite-money loop or single universally dominant choice;
- concrete play examples that sound exciting before a simulator is written.

This remains a design hypothesis until actual people play it. A simulation can reject boring distributions; it cannot certify fun.

## Rollback

This is a new design-direction record only. Candidate 03, Paper Playtest Kit 02, and Gate 05–14 files are preserved unchanged for historical comparison. Revert this document and its status-note commits to return to the previous design checkpoint. No product rollback is needed.
