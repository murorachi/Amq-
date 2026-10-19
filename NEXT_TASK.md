# Next task: accept V82.85.22 and continue bounded historical debt cleanup

Branch: `v82.85.22-historical-debt-dedup-01`.

## Current stage

- Historical technical-debt inventory refreshed; earlier AST/selector reports treated as historical snapshots.
- Three byte-identical `checked(selector)` helpers in `script_028.htmlpart` consolidated to one shared declaration.
- Focused Node contract added and wired into CI; verifier mismatch diagnostics improved.
- Manifest pins `script_028` at 139,955 bytes / SHA-256 `8dc2d503becfd765fcb3dc9d3b402c0358c10a3f636ab1aa97515ddc2ed635c4`.
- Candidate V82.85.22 pinned at 8,787,300 bytes / SHA-256 `69909839f922b702635eec217fcbb836c388502f83d40b11021cd194de20cdc2`.

## Immediate acceptance

1. Verify manifest-pinned build and source/unit suite pass.
2. Verify checkpoint ZIP reproducibility, required paths and sidecar checksum.
3. Record Firefox and native-origin job outcomes independently. Keep the known audio output failure open unless a later run proves it fixed.
4. If this candidate passes, select the next exact duplicate from current source and add a behavior contract before changing it.

## Guardrails

Do not merge different normalization semantics. Do not move CSS rules or broadly refactor quiz/multiplayer lifecycle state. Preserve V82.82.

## Rollback

Restore the original three helpers, fragment/release pins, package names and workflow paths; remove the focused test and revert verifier/docs changes if needed.
