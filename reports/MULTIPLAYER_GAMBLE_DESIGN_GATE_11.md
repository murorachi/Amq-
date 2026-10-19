# Design Gate 11 — Item Strength Sensitivity

Status: **Candidate item tuning revised; simulation CI result pending.**

Simulation: `reports/design_simulations/gamble_roguelike_gate11.py`. It isolates item strengths and recovery fees on the relative-target baseline, using 30,000 runs per configuration/strategy. Items are present from stage 1, so these are upper-bound effects, not draft-time predictions.

Preliminary design decision: the 40% Insurance refund is too broad. Test a much smaller refund and restrict Insurance to Bank/Balanced tiers, so it cannot double the clear rate of the Push tier. Vault Harness remains a Vault-only item. Recovery should be an explicit choice, not an automatic action.

No product, server, UI, or database implementation is authorized.

## Local sensitivity results

Each cell is clear rate / strain-failure rate / mean final bank. Seed 20262020, 30,000 runs per configuration/strategy.

| Configuration | Conservative | Balanced | Push |
|---|---|---|---|
| Baseline | 27.03% / 3.46% / 994.66 | 41.58% / 29.11% / 1,001.09 | 17.29% / 66.44% / 1,003.68 |
| Insurance 5% refund | 27.03% / 3.46% / 995.17 | 41.58% / 29.11% / 1,004.03 | 17.29% / 66.44% / 1,009.62 |
| Insurance 10% refund | 27.03% / 3.46% / 995.92 | 41.58% / 29.11% / 1,006.78 | 33.56% / 66.44% / 1,016.46 |
| Insurance 15% refund | 27.03% / 3.46% / 996.39 | 47.58% / 29.11% / 1,009.78 | 33.56% / 66.44% / 1,022.44 |
| Vault Harness 20% | 27.03% / 3.46% / 994.66 | 41.58% / 29.11% / 1,006.38 | 21.09% / 66.44% / 1,018.60 |
| Recovery fee 8% | 26.90% / 2.00% / 984.57 | 37.88% / 23.18% / 988.46 | 17.29% / 66.44% / 1,003.68 |
| Recovery fee 12% | 26.90% / 2.00% / 979.71 | 35.84% / 24.70% / 982.47 | 17.29% / 66.44% / 1,003.68 |
| Recovery fee 15% | 26.90% / 2.00% / 975.90 | 35.84% / 24.70% / 977.97 | 17.29% / 66.44% / 1,003.68 |

## Revision decision

- Insurance refund has threshold effects: 10% refund already doubles Push clear rate in this fixed model, while 5% does not. Restrict it to Bank/Balanced tiers and test 10% there, or redesign it to avoid the Push spike.
- Vault Harness at 20% provides a modest Push clear-rate improvement and a larger mean-bank effect. Keep it Vault-only.
- Recovery 8% gives Balanced better results than 12%/15% in this test, but all recovery variants lower mean bank and can reduce clear rate. Recovery remains a decision with an opportunity cost, not an automatic rescue.
- Pair tests show Insurance + Harness raises Push mean bank strongly. The revised rule should restrict Insurance to Bank/Balanced before the item pool is approved.
- These tests provide item-start upper bounds; real drafts happen after cleared stages 2 and 4. The simulation does not prove fun or multiplayer fairness.
