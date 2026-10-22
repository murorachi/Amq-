# AMQ Learning Tool Baseline Record

## Preserved baselines
- Candidate 96: `amq_learning_tool_v82_85_46_workspace_proto44-inline-card-filter_96.html`
- SHA-256: `52cbaa536cc728d202431214cdf1181dbbb1c14fa68279a61a126bfa69181de2`
- Candidate 98: `amq_learning_tool_v82_85_46_workspace_proto44-list-learning-workspaces_98.html`
- SHA-256: `0f9a914b2d11f56fb629a3098df85e79e22e9146bac5c965f3732679418fec4f`
- Candidate 99 was retained as the first Song Select UI checkpoint and was not overwritten.
- Candidate 99 SHA-256: `5f86d279b25c3836d1bdd154b3ac6f1273d7d6b7d5334ef9ec0bf6242bc547c5`

## Candidate 100
- File: `amq_learning_tool_v82_85_46_workspace_proto44-osu-songselect-ui_100.html`
- SHA-256: `c645a9fed52dc2f8c01808305bde47df0cb46cf27d50736ea8551c619a8b2639`
- Size: 9,201,487 bytes
- Parent: Candidate 99

## Scope
1. Preserve eight left-rail feature entries and the dashboard below them.
2. Keep Chinese arrow-style `返回` at bottom-left and home icon at bottom-right.
3. Fit cover, title/artist/song metadata, yellow progress, transport controls, playback mode and source selector into the existing bottom strip only.
4. Remove redundant dock-collapse control and the unused extra grid column.
5. AMQ/EMQ/MIX source switching does not replace the currently displayed song immediately.
6. Preserve Alt+wheel volume control and radial indicator.

## Rollback
Use Candidate 99 for the previous UI checkpoint or Candidate 98 for the pre-Song-Select-UI checkpoint. Candidate 96 remains untouched.