# Multiplayer Gamble Roguelike — Deterministic Item Rule Checker 01

- Branch: `multiplayer-gamble-engine-discovery-01`
- Baseline audit: `reports/MULTIPLAYER_GAMBLE_ITEM_RULE_AUDIT_01.md`
- Checker: `tools/gamble_item_rule_checker.py`
- Crown sensitivity model: `tools/gamble_crown_sensitivity.py`
- CI workflow: `.github/workflows/gamble-item-rule-checker.yml`
- Scope: deterministic reference-contract tests for selected rules; design-only.
- Product source / standalone AMQ HTML: unchanged.

## What is covered

The checker uses Python's standard library and explicit assertions for:

1. Unique event IDs and rejection of duplicate raw/derived event identities.
2. One explicit loss-protection rewrite per loss in the reference model.
3. Integer floor arithmetic for percentage effects.
4. Vault Ladder's four provisional gross-return values and exact cumulative success probabilities.
5. Minefield's conditional safe-cell odds after 0–5 safe flips.
6. Debt due-date status based on completed settled rounds, not page views or elapsed time.
7. Public escrow principal return, explicit funding source for a bonus, and duplicate-resolution rejection.
8. Reward option reroll replacing the options without creating another reward event.
9. Broken Crown's +60 trigger occurring at most once per round while remaining eligible in a later round.
10. Debt Collector's two-settlement due date, repayment, extension outcomes, ceiling rounding, one-extension limit, default-to-curse behavior, and run-end cleanup.
11. Aggregate escrow principal conservation, duplicate escrow IDs/claims, and explicit bonus-source rules.
12. Rejection of selected invalid identifiers and negative state values.

The workflow runs `python tools/gamble_item_rule_checker.py` and `python tools/gamble_crown_sensitivity.py` on pushes to this design branch when either script or the workflow changes, and supports manual dispatch.

## Interpretation boundaries

- This is a small executable reference model, not a parser for the prose design documents and not a complete game engine.
- The loss-protection helper deliberately models mutually exclusive selection only. It does not settle the full interaction among Escape Token, Fate Seal, Broken Safe, and Sealed Envelope; that ordering still needs an approved canonical rule.
- Debt checks cover due-date counting only. Debt Collector's full default/curse settlement and the separate Sin-Debt Scale + Heavy Interest interaction remain unmodeled.
- Public escrow checks cover principal conservation and explicit bonus funding. They do not yet model the source's complete run-wide ledger.
- Vault Ladder values are the current paper prototype's provisional table. The checker does not imply that its payout design is balanced.
- The checker preserves extreme builds by default. It checks duplicate settlement and accounting contracts, not whether a build is too powerful.
- Three-Reel probabilities, Broken Crown's actual economic exploit path, multi-item combo distributions, and human enjoyment are not established by this checker.

## Test record

- Deterministic contract tests: **14/14 passed** in a local temporary copy; the local Git blob SHA matched the GitHub source blob `f770d78e09d7ca807f541e42ac34eec302581615`.
- Broken Crown sensitivity tests: **4/4 passed**; the local Git blob SHA matched the GitHub source blob `8a4f9cb03190097172c94ccf9fa12b0cd2c066cd`.
- Python bytecode compilation: passed for both scripts.
- Sensitivity sweep: 18 combinations (wagers 10/25/50/60/75/100; assumed item costs 0/50/100). Three +60 triggers at wager 50 and cost 0 yield +30 chips before other effects; cost 50 yields -20. Wager 60 and cost 0 yields 0. These are conditional arithmetic results, not proof of a practical game exploit: item cost, minimum wager, trigger eligibility, and wager-cap value are not finalized.
- Static review: workflow includes both scripts and path filters include both scripts.
- Remote GitHub Actions: **PASS**, [run 39347173611](https://github.com/murorachi/Amq-/actions/runs/39347173611), commit `f44e1fb382c0b57d5d0c7fb864d0b6f0ae3f377a`. The job completed both the deterministic contract step and the Crown sensitivity step successfully.
- Product regression tests: not run; no product code was changed.
- Human paper playtest: not run.

## Next step

Next add the canonical multi-protection sequence and explicit curse-conversion contracts, then model Debt Scale/Heavy Interest only after their stacking and due-date semantics are closed. Follow with focused trust/resentment-loop enumeration. Keep numeric sensitivity models separate from deterministic rule contracts; do not infer fun from either.
