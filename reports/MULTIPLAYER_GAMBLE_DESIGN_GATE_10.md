# Design Gate 10

Status: item and recovery balance still open. Design only; no implementation.

Simulation: `reports/design_simulations/gamble_roguelike_gate10.py`. Seed 20261020, 100,000 runs per configuration. Starting bank 1,000, final goal 1,050. Stage target is current bank plus ceil(1%).

Gate 10 found the 40% Insurance refund may be too powerful, recovery reduces strain failure but costs bank, and Vault Harness helps the high-risk policy more than the conservative policy. Draft-mode results are provisional because the simulation uses a shared inventory and fixed item rankings.

Next: compare Insurance refunds 10/20/30%, Vault Harness refund values, recovery fees 8/12/15%, item pairs, event orders, and starting banks 750/1000/1500. No implementation until the item layer passes balance checks.