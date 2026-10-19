# Design Gate 12 — Revised Item/Recovery Integration

Status: **Integrated candidate survives the first stress test, but multiplayer/item gates remain open.**

Simulation: `reports/design_simulations/gamble_roguelike_gate12.py`. Seed 20262020, 50,000 runs per mode/strategy. Relative target is computed after any recovery settlement. Insurance is limited to Bank/Balanced tiers with a 10% stake refund; Vault Harness refunds 20% on a continued-step loss; recovery fee is 12%, or 8% with Recovery Voucher. Recovery is once per run and discards one held item if available.

No product implementation was changed.