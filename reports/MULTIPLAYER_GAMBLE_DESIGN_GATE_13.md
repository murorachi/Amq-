# Design Gate 13

Status: event-order, voting, and fee-boundary checks completed. Human fairness remains untested. See `reports/design_simulations/gamble_roguelike_gate13.py`.

No product implementation changed.

## Event-order sensitivity

10,000 runs for each of the 30 unique event orders, seed 20262020. The base model excludes items/recovery.

| Strategy | Lowest clear rate | Mean across orders | Highest clear rate |
|---|---:|---:|---:|
| Conservative | 26.920% | 27.258% | 27.530% |
| Balanced | 40.550% | 41.201% | 42.090% |
| Push | 16.740% | 19.211% | 21.320% |

Order has the largest effect on Push, about 4.6 percentage points. It does not reverse the strategy ranking in this test. Event order should still be randomized or deliberately designed to avoid a fixed pattern becoming a solved script.

## Vote outcomes

Exact plurality enumeration. Order is Bank / Balanced / Push.

| Hypothetical preferences | Players | Bank | Balanced | Push |
|---|---:|---:|---:|---:|
| Cautious 50/35/15 | 2 | 60.000% | 37.750% | 2.250% |
| Cautious 50/35/15 | 3 | 50.000% | 43.925% | 6.075% |
| Cautious 50/35/15 | 6 | 64.781% | 31.618% | 3.601% |
| Mixed 40/35/25 | 2 | 44.000% | 49.750% | 6.250% |
| Mixed 40/35/25 | 3 | 35.200% | 49.175% | 15.625% |
| Mixed 40/35/25 | 6 | 43.568% | 42.828% | 13.604% |

The vote rule keeps exposure independent of player count because there is still only one team wager. However, the chosen tier distribution changes with group size. That is a social aggregation effect, not a bankroll multiplier; whether it feels fair requires human tests with 2-, 3-, and 6-player groups.

## Signal Room fee boundary check

Two clue purchases now pay a single `ceil(6% × stake)` fee, rather than separately rounding 2% and 4%. This avoids double-rounding (at stake 10, separate fees would cost 2 chips, while the combined fee costs 1). One clue costs `ceil(2% × stake)`.

| Stake | One-clue fee | Two-clue fee | Two-clue fee as % stake |
|---:|---:|---:|---:|
| 10 | 1 | 1 | 10.00% |
| 20 | 1 | 2 | 10.00% |
| 50 | 1 | 3 | 6.00% |
| 100 | 2 | 6 | 6.00% |
| 150 | 3 | 9 | 6.00% |
| 1,000 | 20 | 60 | 6.00% |

Small stakes still have a higher effective fee due to integer chips. This is disclosed, and the two-clue fee is no longer rounded twice. If low-bank play becomes common, consider disabling clue purchases below a minimum stake; do not silently change the fee formula mid-run.

## Decision

The base rules now have a reproducible economy, an explicit vote rule, a clear recovery limit, and distinct risk niches in simulation. Remaining blockers are personal item ownership, 2/3/6-player human fairness, playtest duration/engagement, and actual replay intent. Prepare paper-test materials, but do not implement or claim competitor-level fun before players test it.
