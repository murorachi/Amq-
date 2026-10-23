# CURRENT STATUS — Candidate 193 Import Modal Route/Focus Fix

- Latest local experimental candidate: Candidate 193.
- HTML: `amq_learning_tool_v82_85_46_workspace_proto44-osu-songselect-ui_193_modal_escape_focus_restore.html`
- Local SHA-256: `40592745dd85e41ba8af3bfa3ab56ae34b7f1d698652418b65dfd7d0a3246083`
- Size: 9,292,545 bytes.
- Root cause fixed: the older capture-phase handler navigated to the watchlist before Candidate 187's later handler could stop it. The original handler now opens the existing AniList/MAL sync modal directly on Song Select.
- PASS: 69 executable inline JS blocks parsed by Node `--check`; 0 syntax errors; HTML/script/style tag pairs balanced.
- PASS: Song Select remains active during AniList/MAL modal open; username input focus; Escape and close-button dismissal; dock collapse/focus restoration; search, selected song ID and scrollTop restore after close.
- PASS: VNDB and custom-list workspace panels open on Song Select; 390×844 modal viewport has no document overflow.
- PASS: geometry/rail/180-row checks at 2555×1438, 1920×1080, 1648×928, 1440×900, 1280×720, 900×700; AMQ 38,821 and EMQ 16,839 source filters.
- MIX source-count rerun: NOT COMPLETED because browser timed out during MIX switch; Candidate 185 had earlier recorded MIX as both sources.
- Report: `reports/candidate193-import-modal-route-focus-fix-20261024/VALIDATION.md`, uploaded to GitHub; remote read-back pending.
- BLOCKED: native file:// and local HTTP navigation return ERR_BLOCKED_BY_ADMINISTRATOR. page.set_content emits two existing localStorage access-denied errors due opaque origin.
- NOT RUN: durable persistence/CRUD reload, live APIs/covers, audio, full regression, registered pixel-diff.
- Candidate 193 HTML remains local; GitHub upload/remote SHA verification NOT COMPLETED. Candidate is NOT ACCEPTED.

Next: fix compact 900×700 catalog geometry deterministically for the 7.5-row affordance, rerun MIX and responsive checks, then continue visual fidelity and native-origin regression. Preserve Candidate 192/186/185/179/170 and Candidate 169 rollback checkpoints.