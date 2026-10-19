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

## Acceptance status

- Static review: tests target filtering, source-title ordering and cache projection only; no production edits.
- Automated execution: pending CI at report creation. Update with actual assertion count and workflow evidence after the test and source/unit job complete.
- Not covered: live API throttling/freshness, concurrent requests against actual services, external converter delivery, or full browser integration with quiz/multiplayer clients.

## Rollback

Remove the new test and workflow step, then revert this report/status reference. No production source or immutable baseline rollback is required.
