# CURRENT_STATUS.md

Updated: 2026-10-26 (Candidate354, Song Select CSS cleanup)

## Current state
- Formal baseline: Candidate302, immutable. Its recorded SHA-256 is preserved from earlier evidence; the baseline HTML is not available in this local workspace for independent re-hashing.
- Latest experimental candidate: Candidate354, not promoted.
- Candidate354: `amq_learning_tool_v82_86_65_candidate354_songselect_css_cascade_cleanup_20261026.html`, 1615575 bytes, SHA-256 `af827b231836f66d3bb3925de8e132d70ffd2d299dd404b4ff353e7dfd74e123`.
- Immediate rollback: Candidate353, 1,619,076 bytes, SHA-256 `1494f03e39e6b39b97d34746eb5a0d2a5957e128c15764529003e5dee954ffa3`.
- Song Select cleanup removed 132 superseded selector/declaration pairs and 11 rules with no surviving declarations; merged 22 adjacent static Song Select-related style blocks into 11, preserving CSS rule order. Total style tags 109 → 87. File size reduced by 3,501 bytes versus Candidate353.
- Static verification PASS: CSS parse errors 0; selector/property/context winner map 13,050 keys before and after, 0 mismatches; 65 inline executable JS blocks syntax-clean; 247 IDs unique, no duplicates.
- Real-browser visual/route regression: NOT RUN. Candidate346's earlier user-reported 24/24 PASS does not automatically apply to Candidate354.
- Formal release: NOT READY. Candidate354 HTML GitHub upload and remote SHA-256 readback are not verified.

## Next task
Continue only with Song Select's remaining style/geometry ownership. Trace dynamic style injection and classify KEEP / INTEGRATE / DELETE / NEEDS CONFIRMATION. Do not ask the user to validate each batch. Finish evidence-backed cleanup, then run one consolidated Song Select browser regression.

## Main remaining risks
- Active/dynamic owners include Candidate99/Candidate137, `amq-proto26-song-select-css`, `amq-proto32-song-select-css`, Candidate51 route styles, and Candidate76 workspace shell.
- Mobile/desktop header, dock visibility and geometry, workspace/sidebar, selected/hover row states, filter/mode row, and modal behavior require runtime visual evidence before broad deletion.
- Full-app browser testing previously hit `ERR_BLOCKED_BY_ADMINISTRATOR` on file:// and localhost. Do not repeat those paths.
- Candidate302 remains formal baseline; Candidate354 remains experimental.
