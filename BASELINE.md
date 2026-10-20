# Baseline

- Selected artifact: GitHub Actions run 39395545055, artifact amq_learning_tool_v82_85_30_workspace_proto17.
- Pinned source commit: 4fc4a099389b59850c46d3eab2332be3401d487a.
- Original HTML SHA-256: 3dd33bacf8b4482034150d2a858daa70c9bfc61914a36f7124a50204970c3864.
- Downloaded artifact ZIP SHA-256: cf2cbbafbbdac95a8cb688fc82019a52feac6e1d70a20a14f4fb182d604ea63c.
- This baseline is retained; the repaired file is a separate branch version.

## Handoff verification (2026-10-21)

- Repository: https://github.com/murorachi/Amq-
- Active continuation branch for this checkpoint: `amq-proto17-ui-init-acceptance-20261020`.
- Pinned source commit is still `4fc4a099389b59850c46d3eab2332be3401d487a`; do not overwrite it.
- The latest confirmed run inspected for this handoff is https://github.com/murorachi/Amq-/actions/runs/39395545055. Job “Fetch pinned Proto17 and package it” completed with conclusion `success`; this verifies retrieval/package upload only, not UI or runtime acceptance.
- Artifact id: `12251816952`, size 8,833,926 bytes, SHA-256 `cf2cbbafbbdac95a8cb688fc82019a52feac6e1d70a20a14f4fb182d604ea63c`, expires 2026-11-03T08:44:18Z.
- Do not treat `main` as the working branch merely because the retrieval workflow runs from it. The repo description/README still describes an older V82.64 checkpoint archive, while this continuation branch carries the Proto17 repair records. Keep this branch-specific baseline explicit.
- This file records a checkpoint, not a claim that every UI requirement or all tests have passed.
