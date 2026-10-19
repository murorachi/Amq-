# Multiplayer Gamble Roguelike — Design Gate 01

- Status: **DESIGN ONLY — implementation frozen pending design gates**.
- Branch: `multiplayer-gamble-engine-discovery-01`.
- Product baseline: V82.82 standalone HTML, 8,787,490 bytes, SHA-256 `227e89d80fa58db8e8f79c59f1203f06f8bc0663d11228d0986fe6e30f81e91b`.
- Scope: product thesis, core loop, first-run design, game taxonomy, risk controls, evaluation criteria. No product source or prototype rules were changed in this review.

## 1. Product thesis

**A short-session, co-op gambling roguelite where friends try to meet escalating quotas with one shared virtual bankroll, while every player can influence risk but nobody can silently take the whole team hostage.**

The product should not be “a list of random games.” Its identity must emerge from the interaction of:
1. A shared bankroll and a visible team survival target.
2. Simultaneous personal decisions that create social negotiation, not a slow vote on every tiny action.
3. Distinct gambling mechanisms with different information, timing, and risk structures.
4. Run-only items that change the way players approach later bets and combine with other items.
5. Escalating stages that make a previous safe strategy less reliable, without making outcomes feel predetermined.

AMQ songs are optional flavor or rare event hooks, not a required skill check and not the main determinant of bankroll.

## 2. Competitor-derived lessons (not claims of guaranteed success)

### Gamble With Your Friends
Its public Steam description emphasizes 1–6-player co-op, one shared bank/debt, five-minute quotas, 17 games of chance, 15+ items, and four themed floors. The useful design lesson is that the shared wallet turns an individual bet into a team-level social decision; the quota and timer give the group a reason to stop chasing upside and protect a run. Merely matching its game count would copy surface area, not its tension.
- Reference: [Steam store page](https://store.steampowered.com/app/3892270/Gamble_With_Your_Friends/).

### Balatro
Critical coverage and player discussions repeatedly point to build-changing items, meaningful risk choices, and synergies as sources of run variety. The lesson is not to add a huge item count immediately; it is to make a small item pool create different decisions and combinations.
- Reference: [GameSpot review](https://www.gamespot.com/reviews/balatro-review-one-more-blind/1900-6418192/), [GameSpot on risk and survival](https://www.gamespot.com/articles/balatros-secret-sauce-is-not-requiring-perfection/1100-6528349/), [community discussion of item synergy](https://www.reddit.com/r/balatro/comments/1kceewb/).

These references establish design patterns worth testing. They do **not** prove our game is fun or that the target audience will prefer our version.

## 3. First-pass critique: what is currently weak

The existing four code-level candidates are useful test fixtures, but they do not yet form a convincing game.

| Existing candidate | Design finding | Decision |
|---|---|---|
| Coin Call, 50% at 1.9x gross | Almost no meaningful decision after choosing heads/tails; mainly a settlement test. | Keep only as tutorial/basic fallback, not a signature game. |
| Exact Seven, 1/6 at 5.4x gross | Correctly enumerable, but “choose one fixed event” is still a single-shot lottery. | Replace as a main event with a risk-tier contract where the player chooses among probability/reward profiles. |
| Vault, 80/70/60% steps | Strongest seed because stopping is a real decision, but the current code has no persistent run state and cannot enforce cash-out semantics. | Keep as a candidate; redesign state flow before implementation. |
| Blind High Card | Adds competition and a shared pot, but ties/payout alone do not create much strategic interaction. | Keep only if we add a meaningful decision before reveal, such as stake sizing or a costly information/insurance choice. |

### System-level problems
- A five-stage run and 1,000 starting chips are arbitrary until the loss curve and run duration are simulated.
- A shared bankroll creates social tension but also invites griefing, blame, and one player making everyone else lose.
- A fixed 5%–10% negative expected return across every game risks making “play less” the only rational strategy unless quotas, items, and risk choices create countervailing goals.
- Random game selection can produce a run with no viable route unless the player has at least one informed choice.
- Flat “+win chance” items tend to become automatic picks. Items need trade-offs, timing, or synergies.
- If early elimination removes a player from the fun, the run becomes worse precisely when it is most dramatic.
- The current design lacks a concrete run-failure recovery/near-miss structure and lacks a tested session-length target.

## 4. Revised design hypothesis

### Format
- Private co-op room: 2–6 players.
- Target run duration: 12–20 minutes, treated as a hypothesis until tested.
- Virtual chips only. No cash-out, transfers, persistent wallet, or real-money value.
- One shared team bankroll is the default hypothesis because it makes bets socially consequential.
- Each player submits their own action secretly during the betting window; choices reveal together at lock. Players do not have to wait for six sequential turns.
- A player cannot unilaterally risk more than a small capped portion of the current bank. Proposed starting rule: each player's single wager is capped at 20% of the current team bankroll; combined accepted wagers cannot exceed available funds. Any action that exceeds the cap is rejected, not silently scaled.
- One optional team vote per stage for the route or event modifier, not a vote for every wager.
- No player is permanently eliminated before the run ends. A player at zero chips can still contribute through limited non-wager actions, scouting, or team support, so losing does not turn them into an audience member.

These are testable proposals, not final balance values.

### Run loop
1. **Read the room:** show bankroll, stage quota, available routes, known odds, and current team items.
2. **Choose a route:** choose between two distinct events with visible risk profile and reward type; avoid blind random assignment as the only option.
3. **Prepare:** each player may use at most one item or support action; item uses and costs are visible.
4. **Commit simultaneously:** each player chooses stake and action privately until the deadline.
5. **Resolve and explain:** show the outcome, payout, bankroll delta, and any item triggers. Results must be explainable from published rules.
6. **Take the consequence:** meet quota to advance; if short, choose a recovery contract with a meaningful cost, or end the run. Recovery must not guarantee a free rescue.
7. **Draft an upgrade:** choose one of a small number of run-only items, prioritizing synergy and trade-offs over item count.
8. Repeat with one stage modifier or boss rule that changes the best decision.

### Why this is more promising
It combines a shared team objective (co-op tension), simultaneous hidden commitment (less turn downtime and more reveal drama), informed route choice (player agency), and run-only modifiers (long-term strategy). Each element has a clear job; none requires a large content library to justify itself.

## 5. First four game mechanisms to design (not yet coded)

These are mechanism slots, not final names or payout tables.

### A. Vault: push-your-luck
- A player commits a stake, then chooses cash-out or continue after each successful step.
- Failure loses the committed stake; cash-out returns the explicitly displayed gross amount.
- The next-step probability and cash-out value are shown before the choice.
- The game must store the current step and locked stake, preventing a client from skipping steps or changing stakes after a roll.
- Balance gate: no step should be a strict mathematical upgrade over stopping for every bankroll/item state.

### B. Risk Contract: choose the risk profile
- Offer three contracts with visibly different probability, payout, and possible side effect (e.g. frequent small return, moderate return, rare jackpot).
- The player chooses the profile, not just a number from a list.
- At least one profile should interact differently with specific item categories.
- A contract is rejected if its expected value, rounding, or stage objective makes one option strictly dominant in every relevant state.

### C. Blind Pot: multiplayer competition with a decision
- Players choose a stake before a hidden rank is drawn; highest rank wins the pot.
- Add exactly one extra decision for the first version: either optional insurance against losing, or a paid information reveal. Do not include both until playtests show the game needs more depth.
- Tie and integer-remainder rules are deterministic and visible.
- The extra decision must alter risk/information, not just add another click.

### D. Team Gamble: collective push-your-luck
- The team chooses a shared stake and whether to bank the current reward or push to the next tier.
- A push exposes the team to a clearly stated failure loss and a higher possible reward.
- The team must decide whether the current bank is safely above quota or whether it still needs upside.
- This is the main social negotiation game; it must not be a re-skinned coin toss.

The four slots cover different decision structures: individual stop/continue, probability-profile selection, hidden-information competition, and team-level risk negotiation. Coin Call can remain a tutorial but does not count toward this diversity requirement.

## 6. Item design rules

Start with **8–12 items**, not 50. Every item proposal must state: trigger, cost, duration, eligible game types, counterplay/trade-off, and at least one possible synergy.

Use four families:
- **Information:** reveal one hidden attribute or narrow a range, never reveal the entire outcome for free.
- **Risk shaping:** improve a probability in exchange for lower payout, a fee, or a future drawback.
- **Settlement protection:** cap a loss or insure a stake, with an explicit cost and a maximum use.
- **Synergy/tempo:** change a later choice, allow a one-time reroll with a cost, or reward a specific risk pattern.

Reject items that are always optimal, stack without a cap, bypass stage quotas, make outcomes deterministic too cheaply, or let one player sabotage the shared bank. Item synergy is a goal, but combo balance is not a reason to make every item weak or negative.

## 7. Probability and economy policy

Every candidate needs an independently checked outcome table before it is approved:
- Exact probability distribution, including conditional steps and ties.
- Gross return versus net profit labeled consistently.
- Expected net value, variance, loss probability, and chance of meeting the next quota at representative bank sizes.
- Integer-chip rounding and minimum-stake effects.
- Item-modified odds and whether an item creates a dominant strategy.
- Simulations across at least 100,000 seeded runs per candidate configuration, plus exact enumeration wherever the outcome space is small.
- Stress tests at 2, 3, and 6 players; low, medium, and high bankroll; and conservative, median, and aggressive policies.

Negative expected value is acceptable only if the player is buying a useful trade-off (information, progress, a quota chance, or a special reward), not paying a fee for a meaningless animation. Since the wallet is virtual, the aim is fun and legible risk, not extraction or real-money monetization.

## 8. Design gates: do not implement before these pass

### Gate A — Coherent product
- [ ] A one-sentence identity that differs from the benchmark beyond theme/count.
- [ ] A complete 12–20 minute run walkthrough, including a failure/recovery branch.
- [ ] Every stage has a meaningful choice; no stage is only “click and wait.”
- [ ] Four games pass the mechanism-diversity test above.
- [ ] Shared-bank griefing and zero-balance participation have explicit rules.

### Gate B — Mathematical integrity
- [ ] All payouts and expected values independently recomputed.
- [ ] No accidental positive-EV infinite loop or obvious dominant strategy.
- [ ] Quota success/failure rates measured for representative player policies.
- [ ] Item stacks and integer rounding cannot create unbounded payouts.
- [ ] Run length and loss curve measured by simulation, not intuition.

### Gate C — Strategy and replayability
- [ ] At least 8 items form several distinct, understandable synergies.
- [ ] At least three viable approaches exist (e.g. steady quota, information/control, high-variance jackpot).
- [ ] No one game or item is the obvious correct choice in all states.
- [ ] The same route is not best for every seed/bankroll.
- [ ] Simulated decisions demonstrate trade-offs rather than only different risk labels.

### Gate D — Playtest readiness
- [ ] Rules can be taught in under 3 minutes.
- [ ] A paper/playtest script covers a full run without implementation assumptions.
- [ ] A small external playtest (at least 3 groups, ideally 2–4 players per group) evaluates clarity, tension, social interaction, downtime, and desire to replay.
- [ ] At least 70% of testers say they would play another run; this is a prototype threshold, not a claim of market parity.
- [ ] Median run duration falls in the 12–20 minute target band and no player spends more than 20% of a run inactive.

**Implementation is authorized only after Gates A–C pass and Gate D's playtest plan is ready.** A paper design can pass math checks; it cannot honestly pass a fun test. A low-fidelity playable prototype is then needed to test actual enjoyment.

## 9. Current disposition

- **Do not add more code yet.** Existing rule functions are a test fixture, not a validated game.
- Keep the existing prototype untouched while design iterates.
- Next design cycle: produce a full sample run with numbers, draft the first 8–12 items and synergies, then calculate the four mechanisms' payout/risk tables and simulate quota curves.
- If the model exposes a dominant strategy or a dead stage, revise the design and repeat the checks before implementation.

## 10. Rollback

This design review adds a report and updates workstream status/plan documents only. It does not modify product HTML or the existing prototype source. Revert this report and its accompanying documentation commits on `multiplayer-gamble-engine-discovery-01` to roll back.
