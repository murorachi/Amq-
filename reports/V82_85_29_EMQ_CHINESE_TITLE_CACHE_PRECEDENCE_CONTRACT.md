# EMQ Chinese-title cache precedence and filtering contract — V82.85.29

## Scope

- Production file: `src/scripts/script_041.htmlpart`.
- Test: `tests/unit/emq_chinese_title_cache_precedence_contract.test.cjs`.
- CI step: `Test EMQ Chinese-title cache precedence and filtering`.
- Production source, cache key/schema, external request behavior and alias precedence are unchanged.

## Deterministic scenarios

1. Title normalization ignores whitespace/punctuation and preserves CJK text.
2. Title filtering accepts bounded Han titles but rejects kana-containing, non-Han-only and overlong strings.
3. VNDB record conversion prefers a Traditional Chinese title over simplified/other candidates and preserves valid source aliases while filtering unsuitable aliases.
4. Cache writes normalize-deduplicate aliases, preserve provenance, mark records checked, and cap the alias list at eight.
5. Server alias export honors requested work-ID scope and de-duplicates normalized aliases; shared alias export uses the same work-ID mapping.

The test extracts exact production functions and uses synthetic cache data plus a deterministic converter stub. It makes no VNDB, Bangumi or OpenCC network request.

## Noted behavior difference

The characterization confirmed that `cacheRecord` normalizes aliases for de-duplication, but `serverAliasMap` currently removes only exact duplicates, while `allKnownAliases` removes normalized duplicates. The test records current output rather than changing production behavior. Whether to unify this is a separate semantic change because it can alter answer aliases.

## Acceptance status

- Static review: tests target filtering, source-title ordering and cache projection only; no production edits.
- Automated execution: **PASS, 25 assertions** in run [39249715083](https://github.com/murorachi/Amq-/actions/runs/39249715083). The focused test step passed; the source/unit job was still running its remaining steps at the last check, while Firefox responsive and Chromium native-origin were also in progress. Do not close the full workflow until all jobs finish.
- Not covered: live API throttling/freshness, concurrent requests against actual services, external converter delivery, or full browser integration with quiz/multiplayer clients.

## Rollback

Remove the new test and workflow step, then revert this report/status reference. No production source or immutable baseline rollback is required.
