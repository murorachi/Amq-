# V82.85.14 Answer normalization source extraction report

## Scope
- Branch: `v82.85.13-real-audio-acceptance-gate-01`
- Parent commit: `c943b115a0ae3038f29d9374b69d25b7e87026b0`
- Source: `src/scripts/script_004.htmlpart`
- Extracted module: `src/modules/quiz_answer_target_normalization.htmlpart`
- Helper: `const normalize=x=>String(x??'').normalize('NFKC').toLocaleLowerCase().replace(/[\\s\\p{C}]/gu,'');`
- Insertion location: inside `evaluateQuizTargetAnswerV857`, exactly where the original local helper was declared.
- No changes to the answer-evaluation rules, helper expression, call sites, global state, DOM, storage, timer behavior, CSS, or runtime script tags.

## Dependency and side-effect review
- Explicit input: `x`.
- Dependencies: built-in `String.prototype.normalize`, `toLocaleLowerCase`, and Unicode-aware regular-expression behavior.
- Side effects: none.
- Consumers preserved: submitted answer, alias list normalization, related-song title/artist matching, related anime/alias matching, and partial-answer checks.
- A separate duplicate normalizer in the reveal-info helper remains untouched and is outside this narrowly scoped extraction.

## Acceptance plan
- New unit test: `tests/unit/quiz_answer_target_normalization_contract.test.cjs`.
- Added to `tools/run_all_checks.py` and the GitHub source-and-unit job.
- Expected product candidate fingerprint remains 8,787,574 bytes / SHA-256 `b804fd66eecfef277d79d86611f589139025097313be937cf96d067cc201e067`.
- CI/build results: pending at commit creation; must be filled from actual workflow evidence.
- Static checks, unit contract, deterministic build, and browser acceptance are separate categories. No browser acceptance is claimed by this source-only change.

## Rollback
Revert the V82.85.14 checkpoint commit. The V82.82 product baseline remains untouched.
