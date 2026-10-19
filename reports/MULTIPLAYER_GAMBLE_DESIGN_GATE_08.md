# Design Gate 08 — Integrated Run Simulation

Status: **Simulation completed; strategy diversity gate failed. Do not implement.**

Branch: `multiplayer-gamble-engine-discovery-01`.
Rulebook candidate: `reports/MULTIPLAYER_GAMBLE_RULEBOOK_CANDIDATE_01.md`.
Simulation: `reports/design_simulations/gamble_roguelike_gate08.py`.
Product baseline unchanged: V82.82 HTML, 8,787,490 bytes, SHA-256 `227e89d80fa58db8e8f79c59f1203f06f8bc0663d11228d0986fe6e30f81e91b`.

## Model
100,000 runs per fixed policy, seed 20261020. Starting bank 1,000; targets 1,020 / 1,040 / 1,060 / 1,080 / 1,100. Event order: Risk Contract, Vault, Signal Room, Risk Contract, Vault. Integer-rational payouts, 10% bank stake (minimum 10), strain, one-use recovery, two draft opportunities, and a provisional four-item pool. The simulation uses a shared inventory and fixed item rankings, so it does not faithfully model the intended personal-item draft.

## Results

| Policy | Clear all stages | Ends at 3 strain | Mean final bank | Median bank | Mean stages |
|---|---:|---:|---:|---:|---:|
| Conservative | 27.189% | 39.806% | 923.82 | 886 | 4.7519 |
| Quota-aware | 45.962% | 24.282% | 957.51 | 1,053 | 4.8437 |
| Volatility push | 21.506% | 72.531% | 1,015.90 | 972 | 3.8735 |

The quota-aware policy wins under this one target curve and event order. Volatility push fails too often. Three viable strategies have **not** been demonstrated. Mean bank is not a success metric by itself.

## Audit and limitations
- Fixed-seed, integer-slot simulation; not production RNG or human playtesting.
- A duplicate Insurance refund in the Vault step-1 loss path was found and corrected in the committed simulation.
- Item choice uses a fixed policy ranking. Player negotiation, personal item ownership, and 2/3/6-player draft fairness are not modeled.
- Only one event order and target curve were tested. Item acquisition opportunity cost is not validated.
- No claim of fun or competitor-level appeal is justified.

## Revision
1. Keep the four different mechanisms as candidates, but keep the strategy gate failed.
2. Do not increase Jackpot payout blindly; it could make high volatility universally best.
3. Test target curves and starting banks 750 / 1,000 / 1,500, and vary event order.
4. Model item ownership and opportunity cost before approving items.
5. Add route choice between event types and revise the quota-aware policy if it remains dominant.

Decision: remain in design. Gate 09 must test sensitivity and revise the design before final paper-test materials. No product, server, UI, or database code changed.

Rollback: revert Gate 08 design-only report, simulation, rulebook candidate, and status updates; no product rollback is required.
