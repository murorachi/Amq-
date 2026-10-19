# Multiplayer Gamble Roguelike — Design Gate 07

- Status: **Recovery loop exposed and corrected in the design; overall implementation gate still fails.**
- Branch: `multiplayer-gamble-engine-discovery-01`.
- Product baseline: V82.82 standalone HTML, 8,787,490 bytes, SHA-256 `227e89d80fa58db8e8f79c59f1203f06f8bc0663d11228d0986fe6e30f81e91b`.
- Reproducible simulation: `reports/design_simulations/gamble_roguelike_gate07.py`.
- No product HTML or game implementation source changed.

## 1. Critical recovery exploit found

The Gate 06 draft allowed recovery at 2 strain by paying 15% of the current bank to remove one strain. Simulating that rule without a use limit revealed a loophole: a team could pay again every time it returned to 2 strain. In the simplified model, this eliminated all strain-based run failures, effectively making the failure condition cosmetic. This is not acceptable.

**Correction:** recovery is usable at most once per run. It is available only when the team is at 2 strain, costs `ceil(15% of current bank)`, removes one strain, and forfeits that stage's item reward. The team can decline and attempt the stage normally. Recovery does not guarantee a clear; a subsequent miss can return the team to 2 strain. The simulation has no item-reward model, so the cost is still underrepresented and this remains provisional.

## 2. Reproducible recovery simulation

The Gate 07 script runs 100,000 runs per policy, seed `20261020`, starting bank 1,000, targets 1,020 / 1,040 / 1,060 / 1,080 / 1,100, integer rational payouts, one 10%-bank wager per stage, and strain limit 3.

Results:

| Recovery policy | Clear all five stages | Run ends at 3 strain | Mean final bank | Mean stages played |
|---|---:|---:|---:|---:|
| Never pay recovery | 46.832% | 34.773% | 998.89 | 4.5421 |
| Always pay when eligible | 45.403% | 27.469% | 947.30 | 4.8218 |
| Pay only if bank ≥ 1,000 | 46.563% | 35.082% | 997.95 | 4.5413 |

The conditional policy never triggered in these seeded runs, because the bank was below 1,000 whenever strain reached 2. Paying recovery once reduces strain-based failure, but the fee can make quota completion harder and reduces final bank. This is a real trade-off, not a guaranteed benefit.

**Limitations:** no item reward, route selection, Signal Room fee, Vault cash-out, Blind Draft, group vote behavior, or human decision-making is included. The table does not establish final balance.

## 3. Rules that now have a coherent candidate definition

### Run and bankroll
- 2–6 players cooperate with one shared virtual bank starting at 1,000 chips.
- A run contains five stages. The provisional end-of-stage bank targets are 1,020 / 1,040 / 1,060 / 1,080 / 1,100.
- The target is checked after the complete ledger settlement, including fees, stake loss or return, and any item effect.
- A run clears only if all five stages are completed, final bank is at least 1,100, and strain is below 3.
- A run fails immediately at 3 strain. No chips have real-money value and there is no cash-out, transfer, or persistent wallet.

### Stage flow
1. Reveal the stage type, target, current bank/strain, odds, gross return, fees, and available item effects.
2. Players privately vote for route and risk where applicable.
3. Resolve the vote by the published deterministic rule; missing votes default to Bank.
4. Allow permitted item/support choices. No action can change after the wager lock.
5. Lock one team stake, initially 10% of current bank rounded down with a minimum of 10 chips.
6. Generate the outcome only after lock, then settle the ledger atomically.
7. Check the target and strain, show the exact ledger entries, then offer any eligible reward/recovery decision.

### Risk vote
- Bank=0, Balanced=1, Push=2; plurality wins.
- Three-way tie or Bank-vs-Push tie → Balanced.
- Bank-vs-Balanced tie → Bank.
- Balanced-vs-Push tie → Balanced.
- Missing/late vote → Bank.
- The vote is a proposed protocol, not human-validated fairness.

### Recovery
- Available once per run at 2 strain.
- Pay `ceil(15% of current bank)`, remove one strain, and forfeit that stage's item reward.
- Or decline and attempt the stage normally.
- If the team cannot afford the fee, only the normal stage is available.
- Recovery cannot directly clear the run, guarantee a win, or be repeated.
- This still requires testing for death spirals and whether the fee makes the choice meaningful.

### Disconnect and anti-griefing
- One 15-second grace window per run.
- Missing vote defaults to Bank; no personal Favor is spent automatically.
- Once the stage is locked, the authority resolves it exactly once. Reconnected clients receive the existing result.
- No player-to-player transfers, private side bets, or direct confiscation of another player's resource in the first release.

## 4. Why design is still not complete

The four game mechanisms have distinct intended decisions, but the whole five-stage run has not been simulated with them integrated. The current clear-rate model mainly tests Risk Contract and strain. It cannot demonstrate:
- three genuinely viable strategies;
- meaningful choices in every stage;
- fair route voting across party sizes;
- balanced item acquisition costs and synergies;
- useful play for a player who disagrees with the group;
- a 12–20 minute run;
- replayability or enjoyment.

The full five-stage ledger walkthrough is still missing. We should not invent exact results for unmodeled games simply to make the document look complete.

## 5. Gate 08 next task

1. Build an event-by-event five-stage model with Risk Contract, Vault, Signal Room, and Blind Draft.
2. Define exact Vault stop/continue payouts and Signal Room fees in integer chips.
3. Model item choices as opportunity costs, not free bonuses.
4. Compare at least three strategies across multiple initial bankrolls and target curves.
5. Include recovery, failure, and high-strain branches in the same simulation.
6. Reject or revise any rule that produces repeatable free survival, a dominant item, or a single universally optimal strategy.
7. Prepare the paper-playtest deck only after the numeric model is stable.

**Decision: remain in design. No server, UI, database, or product implementation.** A successful simulation gate still cannot establish fun; the eventual low-fidelity prototype must pass human playtests before claiming similarity in enjoyment to existing games.

## 6. Rollback

Revert the Gate 07 report/script and status-document updates on `multiplayer-gamble-engine-discovery-01`. No product rollback is required.
