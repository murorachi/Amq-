# Multiplayer Gamble Roguelike — Design Gate 02

- Status: **Gate 02 completed as a design stress test; product design still does not pass implementation gates.**
- Branch: `multiplayer-gamble-engine-discovery-01`.
- Product baseline: V82.82 standalone HTML, 8,787,490 bytes, SHA-256 `227e89d80fa58db8e8f79c59f1203f06f8bc0663d11228d0986fe6e30f81e91b`.
- Reproducible diagnostic: `reports/design_simulations/gamble_roguelike_gate02.py`.
- Scope: numeric run walkthrough, first item set, independent payout math, two quota-model stress tests, revision decisions. No product or prototype game source changed.

## 1. What this cycle was meant to prove

Gate 01 produced a plausible direction but still relied too much on intuition. Gate 02 turns the idea into numbers, tests whether the initial risk choices have real trade-offs, and checks if the proposed quota curve is survivable.

This is **not a fun test**. It can detect obviously bad balance and dominant strategies; it cannot tell us whether players enjoy the social pressure or want another run.

## 2. Concrete first-run model

### Initial assumptions

- Players: 2–6, co-op, one shared virtual-chip bankroll.
- Starting bank: 1,000 chips.
- Five stage bank targets: 1,020 / 1,040 / 1,060 / 1,080 / 1,100.
- Each stage uses one shared contract, with each player submitting an action privately before simultaneous reveal.
- Stress/strain starts at 0. Missing a stage target adds 1 strain; meeting the target removes 1 strain (minimum 0). At 3 strain, the run ends.
- Base wager in the first stress model: 10% of the current bank. No item effects are applied in the baseline.
- A successful bet returns the displayed gross multiplier, including the original stake. A failed bet loses the stake.
- The run targets above are a deliberately modest test curve, not approved final values.

### Risk Contract profiles

| Profile | Win chance | Gross return on win | Net change on win, at 10% bank stake | Net change on loss | Expected net per stake |
|---|---:|---:|---:|---:|---:|
| Safe | 75% | 1.20× | +2% of bank | −10% of bank | −10% |
| Balanced | 40% | 2.20× | +12% of bank | −10% of bank | −12% |
| Jackpot | 15% | 5.50× | +45% of bank | −10% of bank | −17.5% |

These are distinct probability/reward profiles. A player can select a profile that is likely to clear a small gap, or accept a lower win chance for a larger bankroll jump. The payout table alone does not guarantee the choices will stay balanced; quota state, items, and recovery rules matter.

### Example path A: safe and steady

1. Start at 1,000; stage 1 target is 1,020.
2. Stake 100 on Safe. A win returns 120 gross, net +20, and reaches 1,020. A loss drops the bank to 900 and adds strain.
3. If stage 1 is won, stage 2 target is 1,040. A 10% Safe stake at 1,020 can add only 20.4 on a win, enough to reach 1,040.4.
4. Repeat toward later targets. If the bank falls behind by more than Safe can earn in one win, the player must switch to a higher-variance profile or accept a missed quota.

The upside is a 75% per-contract win chance; the downside is that losses compound and a conservative player can still be forced into a risky catch-up bet.

### Example path B: early high-variance push

1. Start at 1,000; choose Balanced with a 100-chip stake.
2. A win returns 220 gross, increasing the bank to 1,120. That clears the first two targets and creates a cushion for later stages.
3. A loss instead drops the bank to 900 and adds strain. The next target is now much harder to reach.
4. Jackpot can create an even larger early lead (a 100-chip stake adds 450 net on a win), but its 15% win chance means it is not a reliable catch-up plan.

This gives the team a real tension between preserving a likely pass and seeking enough surplus to make future stages safer. However, a jackpot win can make the early run too easy; the cap and quota curve still need further testing.

### Failure/recovery branch

The current stress model ends a run at 3 strain and does not include a free rescue. That is intentionally harsh so the failure curve is measurable. The next design iteration must compare:
- a costly recovery contract;
- a one-use strain-clearing item with a meaningful opportunity cost;
- a lower-reward recovery route that preserves participation but delays progression.

A free guaranteed rescue is rejected: it would make the strain system cosmetic. An unavoidable third miss with no meaningful choice is also rejected: it would turn the game into a sequence of coin flips followed by a restart.

## 3. Independent payout and variance check

For a contract with win probability (p), gross multiplier (m), and stake (s), the net return is (X=(m-1)s) on a win and (X=-s) on a loss. Thus (E[X]/s=p(m-1)-(1-p)).

| Profile | Expected gross return / stake | Expected net / stake | Variance / stake² | Standard deviation / stake |
|---|---:|---:|---:|---:|
| Safe | 0.900 | −0.100 | 0.2700 | 0.5196 |
| Balanced | 0.880 | −0.120 | 1.1616 | 1.0778 |
| Jackpot | 0.825 | −0.175 | 3.856875 | 1.9640 |

The profile math is internally consistent: higher variance costs more expected value. With a 10%-of-bank stake, expected net changes are −1.0%, −1.2%, and −1.75% of the current bank respectively.

Integer-chip rounding still needs separate tests at minimum stakes and at every item-modified payout. The multipliers must always be documented as gross return, not profit plus stake.

### Vault candidate, revised for a meaningful stop/continue decision

Proposed cash-out multipliers: 1.10×, 1.50×, and 2.40× after steps with success probabilities 80%, 70%, and 60%.

| Cash-out point | Probability of reaching it | Gross multiplier | Expected gross return / original stake |
|---|---:|---:|---:|
| Step 1 | 0.80 | 1.10× | 0.880 |
| Step 2 | 0.56 | 1.50× | 0.840 |
| Step 3 | 0.336 | 2.40× | 0.8064 |

After step 1, continuing has conditional expected gross value (0.70\times1.50=1.05), below the 1.10× cash-out. After step 2, continuing is (0.60\times2.40=1.44), below 1.50×. A risk-neutral player therefore prefers to stop, unless the run's quota gap makes the larger payout strategically useful. That is preferable to the earlier multiplier draft, where continuing had higher expected value at every step and was the obvious default.

## 4. Simulation results and what they falsified

The script `reports/design_simulations/gamble_roguelike_gate02.py` uses Python's standard library only, a fixed seed (`20261020`), and 100,000 runs per configuration. The results are reproducible for this script/runtime. Its random generator is for design simulation only, not production game outcomes.

### Model A: naive “bet just enough to clear quota” design

Every stage targets a 5% increase; each profile stakes the minimum needed to reach that increase if it wins; three missed quotas end the run.

| Fixed profile | Run clear rate | Failed-run rate | Mean final bank | Mean misses |
|---|---:|---:|---:|---:|
| Safe | 89.398% | 10.602% | 879.35 | 1.2423 |
| Balanced | 31.780% | 68.220% | 978.33 | 2.5853 |
| Jackpot | 2.684% | 97.316% | 993.21 | 2.9711 |

**Finding:** the run objective makes Safe overwhelmingly best for survival, while Jackpot preserves more average chips by risking very little to hit the same quota. The three profiles do not form an interesting choice when the only reward is barely clearing the same quota. This model is rejected.

### Model B: fixed 10% stake, escalating absolute targets

Targets: 1,020 / 1,040 / 1,060 / 1,080 / 1,100. Missing a target adds strain; meeting it removes one strain; 3 strain ends the run. Quota-aware policy chooses Safe if a win can reach the target, Balanced if Safe cannot but Balanced can, and Jackpot if neither can.

| Policy | Clear rate | Failed-run rate | Mean final bank | Median final bank |
|---|---:|---:|---:|---:|
| Always Safe | 23.535% | 58.180% | 956.34 | 955.09 |
| Quota-aware | 38.830% | 42.479% | 946.54 | 859.58 |
| Jackpot when behind | 26.286% | 67.067% | 938.66 | 729.00 |

**Finding:** the stage targets force risk escalation, but the base run is still harsh and policy choice matters. This is a useful tension, not yet a good difficulty curve. These rates are before route choices, items, group coordination, or recovery mechanics.

### One-use reroll sensitivity

A hypothetical item that rerolls the first failed outcome once per run was simulated as an **upper bound**. It has no payout penalty in this model, so its effect is intentionally overstated.

| Policy | Clear rate, no item | Clear rate, one free reroll | Change |
|---|---:|---:|---:|
| Always Safe | 23.535% | 52.883% | +29.348 percentage points |
| Quota-aware | 38.830% | 61.070% | +22.240 percentage points |
| Jackpot when behind | 26.286% | 35.856% | +9.570 percentage points |

**Finding:** a once-per-run reroll is powerful enough to change the run outcome materially. It must carry a real cost, such as reduced payout on the rerolled win or an item-draft opportunity cost. Do not implement it as a free reroll without further tests.

### What this does and does not establish

- Established: one naive quota model had a dominant strategy; a fixed-stake model gives a measurable but harsh baseline; one reroll can swing clear rates substantially.
- Not established: the final target curve, the best player policy, the ideal item power, the best multiplayer dynamics, or whether the game is fun.
- Not run: real player playtests, six-player coordination tests, production RNG tests, network latency/disconnect tests, or complete item-combination simulation.

## 5. First item pool draft (10 items)

Items are run-only. Each occupies one inventory slot; every activation is limited as stated. The draft is designed to create trade-offs and interactions, not to add ten unconditional stat boosts. Costs and effects remain provisional.

| Item | Cost / limit | Effect | Trade-off and synergy |
|---|---|---|---|
| Lucky Break | 1 charge, once per run | Reroll one failed outcome. | Rerolled win pays 90% of normal gross payout. Synergy: Safety Net or Debt Eraser. |
| Safety Net | Pay 3% of current bank; once | If the next wager fails, refund half the stake. | Fee is paid regardless of outcome. Synergy: Safe contracts and Vault continuation. |
| Odds Lens | 1 Scout token, once | Reveal the next event's exact probability and payout table before choosing. | Gives information, not a guaranteed win. Synergy: Risk Contract choice and route selection. |
| Loaded Die | 1 charge, once | Add 10 percentage points to a contract's win chance. | Reduce its gross multiplier by 0.20×; floor at a legal minimum payout. Synergy: Balanced contract or quota recovery. |
| Vault Key | 1 charge, once | At a Vault checkpoint, choose +0.15× to cash-out value OR preserve the next step's normal probability. | Cannot take both benefits. Synergy: Safety Net for a cautious build, or Odds Lens for informed pushing. |
| Debt Eraser | 1 charge, once | Remove 1 strain after a stage. | Skips the next item draft; prevents free infinite recovery. Synergy: Lucky Break after a risky stage. |
| Contrarian Map | 1 charge, once | If the team takes the route chosen by fewer players in a simultaneous secret vote, add +0.15× to that route's reward. | Does not change the vote or odds; route must still be viable. Synergy: Odds Lens and route modifiers. |
| Team Pact | 1 charge, once | If every active player secretly chooses Push, add +0.20× to the Team Gamble gross multiplier. | Split votes receive no bonus; the underlying loss still applies. Synergy: team coordination and payout-shaping items. |
| Echo Token | Pay 2% of current bank; once | Repeat a previously consumed item at half effect. | Cannot copy Lucky Break or another Echo Token. Synergy: any build with a clearly timed one-use effect. |
| Jackpot Fuse | 1 charge, once | Add +0.50× to a Jackpot contract's gross multiplier. | A failed result adds 2 strain instead of 1. Synergy: Debt Eraser, but dangerous without it. |

### Item-system rejection rules

Reject or revise any item that:
- is always best regardless of bankroll, stage, or other items;
- can stack without a cap;
- makes an outcome deterministic for negligible cost;
- lets one player silently damage the shared bankroll;
- bypasses the quota/strain system entirely;
- creates a positive-EV repeatable loop through rounding or item recursion.

The first pool still needs an item-combination simulation. In particular, Lucky Break + Debt Eraser and Jackpot Fuse + Debt Eraser may be too strong or too forgiving.

## 6. Multiplayer economy correction

The original Blind High Card idea is awkward with a single shared bankroll: if players bet from the same team account and the pot is returned to a player on the same team, the pot is not a meaningful transfer of team wealth. Adding separate personal chip wallets would increase scope and create a second economy.

**Revision:** replace Blind High Card as a chip-pot game with a **Blind Draft** event:
- Each player secretly chooses whether to spend one personal run-only Favor token to improve their rank.
- The server reveals all ranks simultaneously.
- Highest rank gets first pick from a small set of run-only items; other players receive a lesser team-support reward.
- No chips are transferred between teammates.
- The event's team-bank entry fee, if any, is a fixed visible cost, not a fake “pot” that merely moves the same team money around.

This makes the interaction about scarce item priority and resource timing rather than pretending a shared wallet has individual ownership. The item-value balance still needs simulation.

## 7. Revised game mechanism set

1. **Vault:** individual stop/continue, with cash-out value and next-step probability shown.
2. **Risk Contract:** choose among probability/reward profiles; stake size and quota gap determine the useful option.
3. **Blind Draft:** simultaneous hidden rank plus a personal Favor-token decision; competition is over item priority, not chips.
4. **Team Gamble:** the group secretly votes Bank or Push; majority chooses the risk tier, and unanimity may activate a Team Pact item. This creates social coordination distinct from individual Vault decisions.

Coin Call remains a tutorial and ledger test, not a signature game. Exact Seven remains an odds-table test, not a core game slot.

## 8. Gate status after this cycle

| Gate | Status | Evidence / remaining gap |
|---|---|---|
| A — Coherent product | **Partial** | Core loop, four different mechanisms, shared-bank direction, and a sample failure path exist. Recovery and final team anti-griefing rules are not settled. |
| B — Mathematical integrity | **Partial** | Risk Contract EV/variance independently calculated; Vault cash-out points checked; two 100k-run quota models run. Item combinations, integer-rounding extremes, and final target curve remain untested. |
| C — Strategy/replayability | **Fail / not proven** | Item pool is a draft, no item-combo simulation exists, and some quota/policy configurations remain too harsh. Three genuinely viable strategies have not been demonstrated. |
| D — Playtest readiness | **Partial** | Paper-run structure exists, but facilitator script, observation sheet, and tester protocol still need writing. No human playtest has occurred. |

**Decision: stay in design. No server, browser client, database, or additional production game code is authorized.**

## 9. Next design cycle

Design Gate 03 must:
1. Revisit the quota/strain curve using Model B as the baseline, not Model A.
2. Add recovery choices and simulate at least three item configurations, including a nerfed reroll.
3. Test 2-, 3-, and 6-player assumptions. The current simulation treats the team as one actor and cannot validate social behavior.
4. Simulate the 10-item pool and the dangerous item pairs, checking for dominant builds and unbounded payouts.
5. Produce a paper-playtest facilitator script, observation sheet, and exact questions to measure clarity, perceived agency, social tension, downtime, and replay intent.
6. Update the design gate based on evidence; if any strategy is dominant or run difficulty is brittle, revise and repeat.

## 10. Rollback

This gate adds a design report and a standard-library simulation script, plus updates workstream status/plan documentation. It does not modify the existing prototype rules/ledger or product HTML. Revert the design-only commits on `multiplayer-gamble-engine-discovery-01` to roll back.
