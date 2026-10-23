# Candidate 189 Validation Report

Date: 2026-10-24
Branch: amq-candidate104-songselect-layout-fix
Status: EXPERIMENTAL / NOT ACCEPTED

## Artifact
- File: amq_learning_tool_v82_85_46_workspace_proto44-osu-songselect-ui_189_songselect_action_route_guard.html
- Parent Candidate 188 SHA-256: a49a5abe71d3b688e25d9852c3c199af4c8998ab77d7a05337fb603d3c9af371
- Bytes: 9,303,538
- SHA-256: 8fe6d3a4be97fb6be36f166ea6af425a7e7f8b4918788abadd45b91801cd8cbb

## Change
Added a guard in the workspace helper so catalog helper actions invoked while the Song Select route is active do not re-trigger the legacy catalog route. This addresses one identified navigation hazard only; it does not migrate all workspace actions into a shared in-place container.

## Test results
- PASS: 68 opening and 68 closing script tags counted.
- PASS: local file size and SHA-256 calculated.
- PASS: source assertion confirms the catalog route guard is present.
- FAIL: browser harness route probe: `catalog` shows Song Select, but explicit `watchlist` and `practice` navigation hide the Song Select stage and leave the intended route. This confirms the workspace integration is not complete.
- BLOCKED: `page.set_content` harness reports localStorage SecurityError because its opaque origin does not permit localStorage. These errors are environment-induced and are not treated as proof of a product bug or as successful storage tests.
- NOT RUN: full executable-script syntax check is not claimed: one large embedded compressed/data script was passed to Node as JavaScript and failed parsing, so it must be correctly classified before the syntax suite can be considered clean.
- NOT RUN: native file-open acceptance, custom-list CRUD and reload persistence, AniList/MAL/VNDB network import, cover retry, real audio, keyboard Enter, modal Escape/backdrop, top-right freeze reproduction, repeated workspace switching and stale DOM checks, and 2555×1438 reference pixel comparison.

## Risks and outstanding work
- Only two `data-ws` buttons were found in the loaded DOM, despite the stated four-workspace goal.
- Player was measured in the 2555×1438 harness at x=1057.5, y=1380, width=440, height=46. This places it at the bottom edge, but the intended target region and screenshot similarity have not been validated.
- Candidate 189 is experimental and not accepted.
- HTML is not uploaded to GitHub; remote version/size/SHA-256 verification is not complete.

## Rollback
Candidate 188 remains preserved as the immediate parent. Candidate 187 and earlier candidates remain preserved. Candidate 178 remains the user's explicit recovery baseline.
