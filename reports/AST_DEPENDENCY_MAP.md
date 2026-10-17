# V82.69 AST Dependency Inventory 01

## Scope
Parser-backed first-pass dependency inventory for the existing AMQ learning-tool source fragments. This report does not claim full modularization or complete runtime dependency resolution.

## Findings
- 41 script/data fragments scanned; 39 executable JavaScript fragments parsed without syntax diagnostics; 2 non-JS data blocks excluded from JavaScript parsing (AniList JSON and compressed EMQ payload).
- 809 named function/function-valued definitions and 2,126 direct identifier-call edge records.
- `script_001.htmlpart`: 5,078,176 bytes total; DB initializer 4,975,240 bytes; anime 9,516 rows; songs 38,821 rows; remaining 102,936 bytes contain executable runtime logic. Do not move the whole file as a data module.
- `script_004.htmlpart`: 107,042 bytes and 70 named function/function-valued definitions in its application IIFE. First-pass direct-call analysis: 12 unique cross-fragment matches, 9 ambiguous-name call sites, 54 unresolved/external/global call sites.

## Verification
- Full local runner: 12 commands passed, 0 failed.
- Contract tests: 157 assertions passed, 0 failed.
- Integrity verifier: 103 passed, 0 failed; standalone output remains byte-identical to immutable V82.65 (8,786,930 bytes; SHA-256 `abd202a6f96cc08e0969ad05ab8574cc71001733d655bcb5cff6b1a1a5b33a33`).
- Parser coverage is static only. It does not fully resolve property calls, dynamic calls, lexical scope, DOM writes, listener/timer ownership or runtime event dispatch.

## Next
Add production-source contract tests for the quiz-answer normalization/suggestion helper cluster before considering extraction. Separately, test a byte-preserving extraction of only the DB initializer from `script_001`. No production code was moved in this stage.
