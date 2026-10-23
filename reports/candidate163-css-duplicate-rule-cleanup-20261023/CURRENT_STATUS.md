# Current status — Candidate 163 CSS duplicate-rule cleanup

Status: **EXPERIMENTAL / NOT ACCEPTED**.

## Baseline and artifact
- Baseline Candidate 162 SHA-256: `537607bf392b3f0f54e922db9049acaeae3020af8fd337da67566deebe9166a0`
- Candidate 163: `amq_learning_tool_v82_85_46_workspace_proto44-osu-songselect-ui_163_css_duplicate_rule_cleanup.html`
- Candidate SHA-256: `8cef531d25e97c9af19d7335b96b87856848186490d48d9797975592f2a6d0a5`
- Size: 9,271,112 bytes; 1,222 bytes smaller than Candidate 162.

## Actual changes
Removed 11 exact duplicate CSS rules within their original style blocks. No property values or selectors were changed. This is a conservative first pass; it does **not** finish cross-block cascade consolidation.

## Verification
- CSS parsing: 96 style blocks, 2,637 qualified rules, 0 parse errors.
- Playwright suite: 25 PASS / 1 FAIL.
- The failing toolbar-overflow assertion also fails on Candidate 162 when rerun, so it is pre-existing, not introduced by Candidate 163.
- Five screenshot states are pixel-identical to Candidate 162: 3 viewport sizes, keyboard-selected state, and hover state.
- Direct file/local-origin browser, durable IndexedDB, custom scene-image Blob lifecycle, real audio, and live APIs remain unverified due environment restrictions.

## Next
Continue cascade-aware review of repeated selectors and property definitions across style blocks, starting with Song Select and shared bottom player, then workspace dock, homepage, and quiz UI. Do not blindly remove differing values or route/state/media-query rules.
