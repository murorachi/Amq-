# Design Gate 10

Status: item and recovery balance still open. Design only; no implementation.

Simulation: `reports/design_simulations/gamble_roguelike_gate10.py`. Seed 20261020, 100,000 runs per configuration. Starting bank 1,000, final goal 1,050. Stage target is current bank plus ceil(1%).

Gate 10 found the 40% Insurance refund may be too powerful, recovery reduces strain failure but costs bank, and Vault Harness helps the high-risk policy more than the conservative policy. Draft-mode results are provisional because the simulation uses a shared inventory and fixed item rankings.

Next: compare Insurance refunds 10/20/30%, Vault Harness refund values, recovery fees 8/12/15%, item pairs, event orders, and starting banks 750/1000/1500. No implementation until the item layer passes balance checks.

## Results (100,000 runs per mode/strategy)

| Mode | Strategy | Clear | Strain failure | Mean bank |
|---|---|---:|---:|---:|
| Baseline | Conservative | 27.113% | 3.409% | 994.49 |
| Baseline | Balanced | 41.459% | 29.391% | 999.24 |
| Baseline | Push | 17.184% | 66.516% | 1,001.06 |
| Recovery available | Conservative | 26.984% | 1.990% | 975.50 |
| Recovery available | Balanced | 35.672% | 24.914% | 976.95 |
| Insurance from start | Conservative | 27.113% | 3.409% | 999.52 |
| Insurance from start | Balanced | 47.140% | 29.391% | 1,022.76 |
| Insurance from start | Push | 33.484% | 66.516% | 1,052.29 |
| Vault Harness from start | Balanced | 41.459% | 29.391% | 1,007.21 |
| Vault Harness from start | Push | 20.980% | 66.516% | 1,023.56 |
| Recovery Voucher from start | Balanced | 37.665% | 23.384% | 987.34 |
| Draft pool | Conservative | 27.335% | 2.002% | 981.32 |
| Draft pool | Balanced | 35.684% | 24.994% | 987.48 |
| Draft pool | Push | 21.515% | 66.433% | 1,020.35 |

Start-of-run item variants are upper bounds because the actual draft grants items later. The simulation uses one shared inventory and fixed item rankings, not actual player-owned items or human draft choices.

## Findings

1. Insurance at 40% refund has a large effect when available from the start: Push clear rate rises from 17.184% to 33.484%. Reduce and retest the refund.
2. Recovery reduces strain failure but can lower clear rate and mean bank because of its fee. Do not automatically recover whenever eligible.
3. Vault Harness helps Balanced/Push more than Conservative, who cashes out at step 1. This is a useful specialization but still needs testing.
4. The draft pool did not erase strategy differences in this fixed event order. That result is provisional; item opportunity costs, personal ownership, and event-order sensitivity remain incomplete.
5. Signal Coupon has limited value for Push because Push buys no clues.
