# Design Gate 11 — Item Strength Sensitivity

Status: **Candidate item tuning revised; simulation CI result pending.**

Simulation: `reports/design_simulations/gamble_roguelike_gate11.py`. It isolates item strengths and recovery fees on the relative-target baseline, using 30,000 runs per configuration/strategy. Items are present from stage 1, so these are upper-bound effects, not draft-time predictions.

Preliminary design decision: the 40% Insurance refund is too broad. Test a much smaller refund and restrict Insurance to Bank/Balanced tiers, so it cannot double the clear rate of the Push tier. Vault Harness remains a Vault-only item. Recovery should be an explicit choice, not an automatic action.

No product, server, UI, or database implementation is authorized.