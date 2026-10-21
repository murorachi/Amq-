# Next Task

## Updated next actions after candidate 06 CI acceptance (2026-10-21)
1. Obtain the pinned official osu!stable Song Select screenshot and candidate 06 screenshot at matching viewport; record overlay/difference and layout measurements. Do not substitute lazer references.
2. Verify exact Stable client source commit if possible; current Stable release label alone is not a source commit.
3. Run real audio-output acceptance and selected-song Enter/double-event regression tests.
4. Review the newly committed static/browser reports and inspect the candidate manually at target desktop/mobile dimensions; distinguish automated checks from visual sign-off.
5. Keep PR #10/#11 unmerged until visual comparison and remaining required gates are resolved. Do not overwrite baseline or candidate 04 rollback checkpoint.

Latest verified run: https://github.com/murorachi/Amq-/actions/runs/39565629059 (PASS). Candidate 06 SHA-256: `abaf342050f0d73c0450544114b124e1f95be9cb109956f25189532e770e52ca`; artifact/report commit: `8228fd1d827551ee2fbff8ce3f1e5cfcf7e375c1`.


**Priority 1: finish Song Select as one integrated work area. Do not switch to homepage polish yet.**

## Current checkpoint
- Baseline branch: `v82.85.30-proto25-ui-refactor-stage-24`
- Immutable baseline HTML SHA-256: `5a0f18f47fb059427b385484086c66dd14716a03843fcba37f9eb5fe89a7d66f`
- Working branch: `v82.85.30-proto26-in-place-workspaces-01`
- Draft PR #10: https://github.com/murorachi/Amq-/pull/10
- Latest previously accepted development artifact: `dist/amq_learning_tool_v82_85_30_workspace_proto26_song_select_04.html`
- New unaccepted candidate target: `dist/amq_learning_tool_v82_85_30_workspace_proto26_song_select_06.html`
- Artifact SHA-256: `c1155dc7969613bbc20914816a7833842ba8384fd25f2a4611917ee7d2dd5950`
- Passing CI: https://github.com/murorachi/Amq-/actions/runs/39550068389
- Reference audit: `engineering/proto26-song-select/OSU_STABLE_REFERENCE_AUDIT.md`, commit `615ef8b92452009285845bf96a5609d0c8216784`.

## Current in-progress implementation
- Proto26.8 switches the existing `#watchlistView`, `#learningPlanPanel`, and `#dashboardPanel` into the Song Select content flow while keeping the app route `catalog`; batch mode retains the catalog and batch tools.
- Existing workspace action links are intercepted only while the workspace shell is active; explicit practice/quiz launches keep their original flow.
- Draft PR #11: https://github.com/murorachi/Amq-/pull/11
- Implementation commit: `5f9d3ab6ac659adcf83336838c3afb96abb862c4`; browser/static test updates: `21ef2851cd66eed50ee19eca737b55332c83b73b`.
- Local static acceptance and scoped Playwright acceptance have passed. Local snapshot SHA-256: `e71fdc60b18a08b660608077c84a5da5daca90798306f8f8573f72ca29196b8f`. Native-origin storage test, GitHub Actions acceptance and remote artifact/hash verification remain pending. Detailed report: `engineering/proto26-song-select/PROTO26_8_LOCAL_ACCEPTANCE_REPORT.md`.

## Next actions
1. Run Proto26.8 static build and Playwright acceptance; correct any failures and rerun.
2. Verify the generated `_06.html`, remote artifact, SHA-256 and CI run independently.
3. Compare Song Select against the pinned osu!stable screenshot at a matching viewport; exact Stable client source commit remains NOT VERIFIED.
4. Test real audio output and selected-song Enter/double-event behavior.
5. Continue with homepage, Play and Settings only after Song Select gates pass.k visibility and workspace title activation.
5. Obtain the pinned official Song Select screenshot and the accepted candidate screenshot at matching 1440x900. Record bounding boxes and create overlay/difference evidence. Exact Stable source commit remains NOT VERIFIED; do not use lazer source as a substitute.
6. Generate the next unique standalone HTML version only after scoped tests pass; keep all prior candidates unchanged and record SHA-256 + remote existence.
7. Keep PR #10 draft/unmerged until workspace integration and visual comparison pass.

## Acceptance gates
- Static checks, browser interaction tests, visual comparison, audio output, quiz lifecycle, and multiplayer lifecycle must be reported separately.
- No final UI completion claim until all requested screens and necessary regressions have evidence.
