# Candidate 162 changelog

## 2026-10-23 — scene image visibility root-cause fix
- Parent: Candidate 161, SHA-256 `e144bd6ee4ad69ee2f05e4b761700c4c748b50d00fc31dd9117d6ce862974839`.
- Candidate 162: `amq_learning_tool_v82_85_46_workspace_proto44-osu-songselect-ui_162_scene_image_visibility_rootfix.html`.
- Candidate SHA-256: `537607bf392b3f0f54e922db9049acaeae3020af8fd337da67566deebe9166a0`; 9,272,334 bytes.
- Exactly one CSS declaration added: `display:block!important` to the latest route-active `.p32-scene-image` rule. No other source changes.
- Root cause: an older later-loaded CSS block sets `display:none!important`; the newest block changed fixed positioning/opacity but omitted display restoration. The late hide wins in the cascade.
- Playwright: 26 PASS / 0 FAIL across 1648×928, 1440×900 and 1280×720. Additional CSS/visibility checks: 5 PASS / 0 FAIL.
- Full default-state screenshot metrics unchanged because no saved custom background exists in the test fixture. Real image/IndexedDB persistence remains BLOCKED by runtime restrictions.
- Candidate 162 is an experimental root-cause fix, not accepted release.
