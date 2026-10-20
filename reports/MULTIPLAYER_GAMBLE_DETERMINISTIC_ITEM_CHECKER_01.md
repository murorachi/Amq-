# Multiplayer Gamble Roguelike — Deterministic Item Rule Checker 01

- Branch: `multiplayer-gamble-engine-discovery-01`
- Baseline audit: `reports/MULTIPLAYER_GAMBLE_ITEM_RULE_AUDIT_01.md`
- Checker: `tools/gamble_item_rule_checker.py`
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
10. Rejection of selected invalid identifiers and negative state values.

The workflow runs `python tools/gamble_item_rule_checker.py` on pushes to this design branch when the checker or workflow changes, and supports manual dispatch.

## Interpretation boundaries

- This is a small executable reference model, not a parser for the prose design documents and not a complete game engine.
- The loss-protection helper deliberately models mutually exclusive selection only. It does not settle the full interaction among Escape Token, Fate Seal, Broken Safe, and Sealed Envelope; that ordering still needs an approved canonical rule.
- Debt checks cover due-date counting only. Debt Collector's full default/curse settlement and the separate Sin-Debt Scale + Heavy Interest interaction remain unmodeled.
- Public escrow checks cover principal conservation and explicit bonus funding. They do not yet model the source's complete run-wide ledger.
- Vault Ladder values are the current paper prototype's provisional table. The checker does not imply that its payout design is balanced.
- The checker preserves extreme builds by default. It checks duplicate settlement and accounting contracts, not whether a build is too powerful.
- Three-Reel probabilities, Broken Crown's actual economic exploit path, multi-item combo distributions, and human enjoyment are not established by this checker.

## Test record

- Test cases authored: 10 `unittest` methods with explicit expected values and rejected-state assertions.
- Local execution in this work session: **not executed**.
- Remote GitHub Actions result: **not yet verified**. The workflow was committed to make the test reproducible; workflow existence is not evidence that it passed.
- Static review: source and workflow were read back from GitHub; this is not a substitute for executing the tests.
- Product regression tests: not run; no product code was changed.
- Human paper playtest: not run.

## Next step

Verify the workflow result. Fix any failing assertions before adding more rules. Then extend the deterministic model only where the paper rules are sufficiently explicit, prioritizing the canonical loss-protection sequence, full debt due/default behavior, escrow ledger conservation, and the Broken Crown low-cost-bust hypothesis. Keep numeric simulations separate from rule-contract tests.
