# Candidate354 Song Select CSS Cascade Cleanup

- Candidate: `amq_learning_tool_v82_86_65_candidate354_songselect_css_cascade_cleanup_20261026.html`
- Size: 1,615,575 bytes
- SHA-256: `af827b231836f66d3bb3925de8e132d70ffd2d299dd404b4ff353e7dfd74e123`
- Parent Candidate353 SHA-256: `1494f03e39e6b39b97d34746eb5a0d2a5957e128c15764529003e5dee954ffa3`
- Formal baseline Candidate302 remains unchanged.

## Changes
- Removed 132 selector/declaration pairs that could not win the CSS cascade because a later declaration had the same exact selector, property, importance, and nested at-rule context.
- Removed 11 rules with no surviving declarations.
- Merged 22 adjacent static Song Select-related style blocks into 11 consolidated blocks, preserving rule order. Total style tags: 109 → 87.
- No JavaScript, DOM elements, or route logic were intentionally changed.
- File size decreased by 3,501 bytes versus Candidate353.

## Static verification
- CSS parse: PASS, 0 errors.
- Selector/property/context winner-map equivalence: PASS, 13,050 keys before and after, 0 mismatches.
- Inline JavaScript syntax: PASS, 65 executable blocks checked, 0 errors.
- HTML IDs: PASS, 247 unique, 0 duplicates.
- Real-browser visual/route regression: NOT RUN.

## Limits
This cleanup removes provably superseded declarations and consolidates only adjacent static style tags. It does not prove every remaining CSS rule is invisible in every route, viewport, or dynamic DOM state. Candidate353 is the immediate rollback; Candidate354 remains experimental.
