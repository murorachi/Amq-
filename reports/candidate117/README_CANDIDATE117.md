# AMQ 學習工具 Candidate 117

- Artifact: `amq_learning_tool_v82_85_46_workspace_proto44-osu-songselect-ui_117.html`
- Size: 9,235,330 bytes
- SHA-256: `c5542b9769c70e4fb8b74044c7bf09bbe76121df1418321bef803d55bc9b5b8b`
- Source Candidate 116 SHA-256: `78e665ad23ee21c9b0ab5c644f0bba2be3d311d8fee0e2015cf5fbaab06fe756`

## Stage 2 change
The Song Select sidebar's Learning Statistics button now calls the existing navigation API directly: `window.__aniNavigateApp('dashboard')`. This reuses the existing dashboard renderer and avoids simulating a click on an unrelated home-menu element.

## Verification
- Static checks: 8 PASS / 0 FAIL (62 inline scripts parsed; 90 CSS blocks, 2,569 rules parsed).
- Browser route/dashboard checks: 5 PASS / 0 FAIL. Combined executed checks: 14 PASS / 0 FAIL.
- Home → Song Select → Home passed 4 cycles; profile/player/sidebar nodes were not duplicated and profile/player returned to their home containers.
- The statistics panel opened with its real title and six content sections.

Not verified: live AniList/MAL or VNDB imports, real audio playback, durable persistence after an actual reload, full osu!stable pixel comparison, and profile-card relocation into Song Select. Candidate 117 is a stage candidate, not a fully accepted release.

Rollback: Candidate 116, SHA-256 `78e665ad23ee21c9b0ab5c644f0bba2be3d311d8fee0e2015cf5fbaab06fe756`.