# CURRENT STATUS — Candidate 190 (experimental, not accepted)

- Recovery baseline: Candidate 178, explicitly selected because Candidate 205 was unavailable.
- Preserved lineage: Candidate 178 -> Candidate 183 -> Candidate 184 -> Candidate 185 -> Candidate 186 -> Candidate 187 -> Candidate 188 -> Candidate 189 -> Candidate 190.
- Candidate 190 local artifact: `/mnt/data/amq_learning_tool_v82_85_46_workspace_proto44-osu-songselect-ui_190_workspace_import_route_root_fix.html`
- Size: 9,303,607 bytes. SHA-256: `6364e31e214e5339165d010d1aa4b673a1e8889aa2c07e9cdd3df330199274db`.
- Changes: the late capture-phase AniList/MAL action now opens the existing modal in place, and the VNDB action opens its existing view through the shared workspace panel instead of navigating to legacy watchlist. VNDB provider helper also uses the shared panel. Corrected the dock aria-label.
- Static syntax: 65 executable inline scripts PASS; one JSON data block excluded; one compressed base64 block excluded from JS parsing (the raw data predictably fails JS syntax).
- Runtime harness: PASS for dispatched AniList/MAL action keeping active route at `catalog` while opening `#syncModal`; PASS for dispatched VNDB action keeping route at `catalog` while opening the shared panel titled `VNDB 個人清單`.
- Harness limitation: `page.set_content` causes localStorage SecurityError due opaque origin; these tests do not establish persistence. Native `file://` navigation remains blocked by environment.
- Candidate 190 remains experimental. Four-workspace integration and full browser acceptance are not complete.
- HTML GitHub upload remains NOT VERIFIED.
