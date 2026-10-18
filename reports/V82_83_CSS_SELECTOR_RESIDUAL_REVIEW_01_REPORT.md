# V82.83 CSS residual selector review and backup rollback contract

Date: 2026-10-18

## Baseline and scope
- Product baseline remains V82.82: `dist/amq_learning_tool_v82_82.html`, 8,787,490 bytes, SHA-256 `227e89d80fa58db8e8f79c59f1203f06f8bc0663d11228d0986fe6e30f81e91b`.
- V82.65 remains immutable; V82.80, V82.72 and V82.82 artifacts remain preserved.
- This is an engineering-only checkpoint. No production HTML, source fragment, CSS declaration/order, answer/playback lifecycle, or multiplayer runtime was changed.

## CSS residual review
- Input: the 32 rows previously marked `manual ownership unresolved` in `reports/CSS_SELECTOR_REVIEW_V82_82.csv`.
- Result: all 32 rows received an explicit disposition; 0 unresolved remain in the residual queue.
- Eight rows are parser artifacts rather than component selectors: `from`, `to`, keyframe percentages, and one inline `<style>` tag boundary. They are excluded from component ownership counts, not treated as UI components.
- The other 24 rows were mapped to learning/progress tables, detail watch tools, AMQ batch selection/scope summary, song row actions, global scene background controls, or source-mode controls using explicit selector IDs/classes and adjacent stylesheet context.
- The new review preserves duplicate selector occurrences with stable row indices, because duplicate rules can matter to the cascade.
- `css_changed=NO` for every row. All rows retain the explicit Firefox/cascade gate. Ownership mapping is not permission to move CSS.

## Backup export/import/rollback contract
Added `tests/unit/full_backup_restore_roundtrip_contract_v82_83.test.cjs` against extracted production functions in `script_023.htmlpart`:
1. Export creates a v10 backup with a sorted, internally consistent storage manifest and excludes unrelated keys.
2. Valid backup restore replaces allowlisted application keys and preserves unrelated keys.
3. Corrupt/inconsistent manifest is rejected before storage mutation.
4. A synthetic write/quota failure during restore rolls application storage back to the exact previous snapshot and clears the restore suppression flag.

Result: 4/4 assertions passed. Existing storage repository contract remains 9/9; existing backup validator contract remains 6/6. These are deterministic in-memory tests, not native-origin browser acceptance.

## Environment-dependent gates
- Native localhost acceptance was attempted again against V82.82. Chromium blocks navigation before the application loads with `net::ERR_BLOCKED_BY_ADMINISTRATOR`; the managed browser policy includes a URL blocklist. No native localStorage/IndexedDB, real reload, browser download/import UI, or actual backup rollback acceptance was executed.
- Firefox is not installed in the environment. Responsive Chromium baselines remain 390x844, 768x1024, and 1440x1200; no Firefox comparison is claimed.
- GitHub full-source sync is still incomplete. The branch is an overlay and lacks the coherent full source tree, including the manifest/source fragments/template/build tools/tests and screenshot binaries. No clean remote checkout build or full remote SHA-256 audit was run.
- Resolved in V82.83: `tools/modularization_boundary_audit.py` remote and local Git blob SHA-1 now match at `ae6690750077445dc85c22a740f4ab5497d9e737`. This fixes the tool fingerprint mismatch only; the complete source tree and clean remote checkout build remain open.
- Real audio, two-client multiplayer, and reconnect acceptance remain unexecuted. No lifecycle extraction was performed.

## Validation gates
- Targeted CSS residual review: 32/32 rows dispositioned, 0 unresolved, no CSS changed.
- CSS residual review contract: passed.
- Backup export/import/rollback contract: 4/4 passed.
- Integrity verifier: 116/116 passed; build output remains byte-identical to the V82.82 expected product.
- Full runner results: see `reports/V82_83_VALIDATION_RESULTS.txt` after the final run. Any timeout or environment block is recorded as such and is not converted into a pass.

## Rollback
- This checkpoint changes engineering scripts/tests/reports only; product rollback is not needed.
- To return to the prior engineering state, restore V82.82 `CURRENT_STATUS.md`, `NEXT_TASK.md`, `README.md`, runner, and package tool from the V82.82 checkpoint archive. V82.82 standalone HTML remains unchanged.

## Next highest-value work
1. Publish the exact boundary-audit tool bytes and verify remote blob SHA-1; then complete a true full-source transfer using a permitted binary/tree upload path and run a clean remote checkout build.
2. Run native-origin storage and backup acceptance in a browser environment whose policy permits the test origin; include real reload, import/export, corrupt backup and write-failure rollback.
3. Install/use Firefox in an approved environment and compare responsive baselines before any CSS movement.
4. Run real audio and two-client multiplayer/reconnect acceptance before considering lifecycle extraction.
