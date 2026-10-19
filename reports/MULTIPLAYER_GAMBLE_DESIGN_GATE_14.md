# Design Gate 14 — Shared Two-Slot Draft

Status: **Draft inventory redesigned to avoid party-size scaling; integrated simulation completed locally, CI pending.**

Simulation: `reports/design_simulations/gamble_roguelike_gate14.py`. This supersedes Gate 12's one-pick draft approximation. The team has a shared inventory capped at two items. Each cleared draft phase gives the two highest-ranked players one pick each from three item cards. No personal item ownership; item activation is decided by team vote.

No product implementation changed.

## Results

50,000 runs per mode/strategy, seed 20262024, starting bank 1,000, final goal 1,050. Event order is fixed to isolate draft changes; Gate 13 separately tested all 30 event orders.

| Mode | Strategy | Clear | Strain failure | Mean bank |
|---|---|---:|---:|---:|
| Baseline | Conservative | 27.020% | 3.338% | 995.19 |
| Baseline | Balanced | 41.362% | 29.364% | 999.50 |
| Baseline | Push | 17.324% | 66.464% | 1,003.21 |
| Draft only | Conservative | 26.510% | 3.352% | 996.69 |
| Draft only | Balanced | 41.120% | 29.396% | 1,002.17 |
| Draft only | Push | 19.938% | 66.838% | 1,007.43 |
| Recovery + draft | Conservative | 26.500% | 0.510% | 982.43 |
| Recovery + draft | Balanced | 35.356% | 23.512% | 986.46 |
| Recovery + draft | Push | 19.938% | 66.838% | 1,007.43 |
