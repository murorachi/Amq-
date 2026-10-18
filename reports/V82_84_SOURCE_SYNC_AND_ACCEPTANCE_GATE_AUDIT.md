# V82.84 Source Sync and Acceptance Gate Audit

Date: 2026-10-18

## Baseline and scope
- Starting checkpoint: V82.83 `CSS_SELECTOR_RESIDUAL_REVIEW_01`, from the verified local archive `AMQ_V82_83_CSS_SELECTOR_RESIDUAL_REVIEW_01.zip` (14,511,401 bytes, SHA-256 `ef324f6a8418f60158cbd8e9fe2474da20a163c0e308bf6b16f0fcad355c9d32`).
- Product remains V82.82: 8,787,490 bytes, SHA-256 `227e89d80fa58db8e8f79c59f1203f06f8bc0663d11228d0986fe6e30f81e91b`.
- Immutable V82.65 remains 8,786,930 bytes, SHA-256 `abd202a6f96cc08e0969ad05ab8574cc71001733d655bcb5cff6b1a1a5b33a33`.
- V82.80 remains preserved at 8,787,422 bytes, SHA-256 `f5b3eadf17300d8ad0ae53ebccc32f471b068743a7c746721401bfb7a0f0c8fe`.
- Engineering-only checkpoint. No production HTML, JS/CSS runtime, CSS declaration/order, answer/playback lifecycle, or multiplayer runtime changed.

## Fresh local validation
- Rebuilt `dist/amq_learning_tool_v82_82.html`: 8,787,490 bytes and SHA-256 exactly matches the expected V82.82 product.
- Full runner commands 1-17: 17/17 passed.
- Full runner commands 18-26: 9/9 passed.
- Runner command 27 (Chromium CSS visual baseline): passed separately; geometry matched the checked-in V82.81 reference and screenshot hashes remained stable.
- Full runner commands 28-34: 7/7 passed.
- Aggregate: 34/34 runner commands passed across four invocations (the visual command was isolated to keep the browser process bounded).
- Integrity verifier: 116/116 passed.
- Clean package-extraction rebuild: extracted the V82.84 ZIP into a new empty directory, rebuilt V82.82 to 8,787,490 bytes with the expected SHA-256, and ran the verifier again: 116/116 passed. This is a clean local package rebuild, not a clean remote GitHub checkout build.
- AMQ/EMQ isolated production-HTML UI acceptance: 19/19 assertions passed.
- Backup export/import/rollback in-memory contract: 4/4 passed.
- Responsive Chromium baseline: 3 viewport sizes x home/quiz passed; no horizontal overflow or page errors.
- An initial runner attempt before the build step failed two browser checks because `dist/` is intentionally excluded from the source ZIP. The product was then built into the expected path and all 34 commands were rerun successfully. The initial setup failure is recorded, not counted as a product regression.

## GitHub source-tree audit
- Remote branch: `v82.83-css-selector-residual-review-01`; its recursive Git tree has 125 entries and is not the full source tree.
- Confirmed absent remotely: `reports/FRAGMENT_MANIFEST.json`, `src/scripts/script_040.htmlpart`, `src/styles/style_050.htmlpart`, `src/template.html.in`, `tools/build.py`, `tests/browser/responsive_visual_baseline.py`, and responsive screenshot PNGs.
- The boundary-audit tool fingerprint discrepancy is resolved: local and remote Git blob SHA-1 both equal `ae6690750077445dc85c22a740f4ab5497d9e737`.
- Eight previously published engineering text artifacts were read back with matching local/remote Git blob SHA-1. That verifies only those individual text artifacts, not the complete tree.
- Local `git ls-remote https://github.com/murorachi/Amq-.git HEAD` fails with `Could not resolve host: github.com`. No `gh` executable or local Git credentials are available. The connected GitHub API tool can write text/Git objects but exposes no binary upload/release-asset operation or direct local-file transfer. Therefore the complete 10+ MB source tree and PNG assets cannot be transferred from this workspace in the current session.
- A clean remote checkout build and full remote SHA-256 readback were NOT run. Full source sync remains OPEN; do not call it complete.

## Native Storage and custom-list acceptance
- Retried `tests/browser/real_origin_acceptance_localhost.py --html dist/amq_learning_tool_v82_82.html`.
- Chromium failed before navigation with `net::ERR_BLOCKED_BY_ADMINISTRATOR` at an ephemeral `http://127.0.0.1:<port>/...` URL. The managed policy has a global URL blocklist. No policy was changed or bypassed.
- Consequently native localStorage/IndexedDB persistence, actual reload, browser-level export/import, corrupt backup, native write-failure rollback and native custom-list persistence remain NOT VERIFIED.
- The in-memory UI and storage contracts pass, but they are not a substitute for native-origin acceptance.

## Firefox, audio and multiplayer
- Firefox binary is absent; apt has no Firefox package candidate and no cached Firefox package/browser. Network access from the container is unavailable, so Firefox could not be installed here. No Firefox comparison is claimed.
- Real audio/network playback and two-client multiplayer/reconnect acceptance were not executed. No answer/playback or multiplayer lifecycle extraction was performed.
- CSS remains unchanged. The 32 residual CSS rows have explicit dispositions, but CSS movement stays blocked until Firefox/cascade review is possible.

## Rollback and next work
- Product rollback is unnecessary because this checkpoint changes only engineering documentation, audit output, package metadata and validation records.
- Use the preserved V82.82 standalone HTML and V82.83 package for rollback.
- Next: provide an authorized local-to-GitHub binary/tree upload route or run a repository-controlled workflow with the exact V82.83 source delta; then sync every manifest/fragment/template/tool/test/visual asset, perform clean remote build and SHA-256 readback. After that, run native-origin storage/custom-list acceptance in a browser environment that permits localhost, add Firefox responsive baselines, and only then consider lifecycle extraction after real audio and two-client reconnect gates pass.
