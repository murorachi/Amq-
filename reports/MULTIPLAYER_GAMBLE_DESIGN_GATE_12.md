# Design Gate 12 — Revised Item/Recovery Integration

Status: **Integrated candidate survives the first stress test, but multiplayer/item gates remain open.**

Simulation: `reports/design_simulations/gamble_roguelike_gate12.py`. Seed 20262020, 50,000 runs per mode/strategy. Relative target is computed after any recovery settlement. Insurance is limited to Bank/Balanced tiers with a 10% stake refund; Vault Harness refunds 20% on a continued-step loss; recovery fee is 12%, or 8% with Recovery Voucher. Recovery is once per run and discards one held item if available.

No product implementation was changed.

## Results

| Mode | Strategy | Clear at 1050 | Strain failure | Mean final bank |
|---|---|---:|---:|---:|
| Baseline | Conservative | 27.160% | 3.416% | 995.49 |
| Baseline | Balanced | 41.638% | 29.132% | 1,000.60 |
| Baseline | Push | 17.270% | 66.384% | 1,004.35 |
| Recovery only | Conservative | 27.138% | 0.534% | 980.72 |
| Recovery only | Balanced | 35.858% | 23.190% | 982.53 |
| Draft only | Conservative | 27.178% | 3.482% | 997.03 |
| Draft only | Balanced | 41.398% | 29.386% | 1,000.57 |
| Draft only | Push | 20.070% | 66.248% | 1,009.89 |
| Recovery + draft | Conservative | 27.238% | 0.536% | 981.98 |
| Recovery + draft | Balanced | 35.586% | 23.498% | 984.84 |
| Recovery + draft | Push | 20.070% | 66.248% | 1,009.89 |

## Interpretation

- The revised draft pool does not collapse the three base strategy niches in this fixed run model.
- Recovery sharply reduces Conservative strain failures but lowers mean bank and does not materially increase clear rate. Balanced recovery lowers both failure and clear rate. This is a meaningful but costly rescue choice.
- Draft items modestly help Push in the tested sequence; Push still has a high strain-failure rate, so its upside remains a high-variance niche rather than a safe route.
- The model uses shared inventory and fixed item rankings. It does not simulate personal item ownership, player discussion, route voting, or 2/3/6-player Favor fairness.
- Item draft timing matters; item-at-start results from Gate 10/11 are upper bounds and should not be treated as draft-time balance.

## Decision

The numeric design is coherent enough to prepare paper-test materials, but **not enough to start implementation or claim competitor-level fun**. Before paper testing, vary event order, verify integer rounding at stake/fee boundaries, and simulate vote/draft behavior at 2/3/6 players. Then run actual paper sessions; simulation cannot substitute for player enjoyment.


## Signal Room fee-rounding correction
Gate 13's boundary check found that separately ceiling the 2% and 4% clue fees overcharged small stakes (at stake 10, the combined fee was 2 chips, or 20% of stake). The rule and Gate 12 simulation now charge one combined fee: one clue `ceil(2% × stake)`; two clues `ceil(6% × stake)`. The sample run was recalculated. This reduces accidental rounding punishment while preserving the visible cost of buying information.


## Recovery cost clarification
Recovery no longer discards a personal item. It skips the next eligible Blind Draft, if one remains, avoiding forced loss of another player's personal item. The Gate 12 simulation was updated to this rule; clear/failure rates are unchanged to displayed precision in the tested seed, while mean-bank figures are recorded above.
