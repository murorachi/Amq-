# V82.85.19 single duplicate-candidate decision

- Date: 2026-10-19
- Branch: `v82.85.18-source-inventory-gate-01`
- Inspected head: `3de5cd822048c477a5e65ece27b21ca0262e771a`
- Scope: inspect one concrete repeated helper candidate in current quiz source; no production source edits.

## Candidate

Two local helpers named `norm` appear in `src/scripts/script_004.htmlpart`:

1. Near source offset 9,802:
   `x => String(x ?? '').normalize('NFKC').toLocaleLowerCase().replace(/[\\s\\p{P}\\p{S}\\p{C}]/gu, '')`
2. Near source offset 75,509:
   `x => String(x ?? '').normalize('NFKC').toLocaleLowerCase().replace(/[\\s\\p{C}]/gu, '')`

The normalized expressions differ intentionally in character classes: the first removes whitespace, punctuation, symbols, and control characters; the second removes whitespace and control characters while preserving punctuation and symbols.

## Call-site / scope decision

The helpers occur in different local scopes and are used for different quiz-related comparisons (answer normalization versus artist matching). The behavior is observably different for inputs containing punctuation or symbols. Replacing either with the other, or moving them into a shared helper without preserving an explicit policy, could change answer matching or artist lookup.

Decision: **REJECT this as a safe deduplication candidate. Keep both implementations unchanged.** This is not evidence that the helpers are redundant; the shared name is misleading but the behavior is distinct. A future refactor could give them more descriptive names, but that cosmetic change is not worth expanding this stage.

## Tests and acceptance

- Current-source static inspection: **PASS** for identifying the two expressions and their different character classes.
- Production source changed: **No**.
- Focused runtime regression test: **NOT ADDED**, because no production behavior was changed and the candidate was rejected rather than consolidated.
- Unit/build/browser suites: **NOT RUN for this documentation-only decision**. The previous CI results remain separate evidence and are not represented as tests of this decision.

## Stop condition

One current-source candidate has been examined and explicitly rejected with behavior-based evidence. Stop this cleanup stage; do not widen the search to every similarly named helper. Select a new candidate only when a concrete feature or maintenance issue makes the expected savings worth the verification cost.

## Rollback

This report is documentation only. Revert this report and the corresponding status/task note updates if needed. No product source, manifest, generated HTML, or immutable V82.82 artifact was modified.
