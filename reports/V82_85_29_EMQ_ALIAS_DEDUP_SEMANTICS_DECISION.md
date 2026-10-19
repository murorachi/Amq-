# Decision note: EMQ Chinese-title alias de-duplication semantics

## Evidence reviewed

- Production source: `src/scripts/script_041.htmlpart`, unchanged.
- Characterization test: `tests/unit/emq_chinese_title_cache_precedence_contract.test.cjs`, 25 assertions passed in run [39250170041](https://github.com/murorachi/Amq-/actions/runs/39250170041).
- The test demonstrates three distinct behaviors:
  - `cacheRecord` removes aliases using `normalize(a) === normalize(x)`.
  - `allKnownAliases` also removes normalized duplicates before exporting aliases keyed by work ID.
  - `serverAliasMap` currently removes exact duplicate strings only, so spacing/punctuation variants can remain in that output.
- In the integration fragments inspected for this decision (`script_028.htmlpart`, `script_004.htmlpart`, `script_031.htmlpart`), multiplayer title-alias synchronization consumes `allKnownAliases`; the quiz uses the EMQ API's per-song aliases. No demonstrated user-facing regression has been tied to the exported `serverAliasMap` difference.

## Decision

**Defer any production behavior change.** The functions have different consumers and no evidence currently proves that exact-dedup output causes wrong answer acceptance, oversized payloads or broken sync. Making them identical solely for consistency would be an unrequested semantic change.

The difference remains documented as a low-priority consistency question. Reopen only if a concrete consumer of `serverAliasMap` is identified or a duplicate-payload/answer-matching issue is reproduced. If changed later, first add explicit output-contract tests for both export APIs and verify their consumers.

## Validation and rollback

- Review-only decision; no production code changed.
- Existing tests remain unchanged.
- Rollback: remove this decision report and its status references. No source rollback required.
