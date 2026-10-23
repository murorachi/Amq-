# CURRENT STATUS — Candidate 178 Song Select Visual Pass

- Current local experimental candidate: Candidate 178.
- HTML: `amq_learning_tool_v82_85_46_workspace_proto44-osu-songselect-ui_178_metadata_selector_specificity_fix.html`
- Local SHA-256: `b91109c7c660be064cedf76b20e473b12ca415be8e0650f16d8086339c2a9f80`
- Size: 9,274,075 bytes.
- Root composition: actual legacy `#c99LeftRail` hidden on Song Select; no horizontal overflow at six tested viewport sizes.
- Catalog: 180 rows rendered; translucent distance-tier backgrounds; 7.5-row visual clipping retained at desktop/reference sizes.
- Metadata: title scales 39.6px at 2555 width, 25.5px at 1648, 20px at 1280; real song metadata retained.
- Static checks PASS: 64 executable inline JS blocks checked individually by Node `--check`; 0 syntax errors.
- Chromium set_content checks PASS with test-only in-document storage shim: six viewport sizes, route activation, hidden rail, dock/catalog bounds, ArrowDown selection, hover -3px vs selected -7px, AMQ source data, EMQ source switch; 0 page errors under shim.
- Report uploaded and remote read-back pending: `reports/candidate178-songselect-root-catalog-metadata-20261023/VALIDATION.md`.
- BLOCKED: native file:// navigation ERR_BLOCKED_BY_ADMINISTRATOR. Test shim is in-memory only; persistence not verified.
- NOT RUN: live covers/APIs, real audio, full custom-list CRUD/import/workspace regression, reference pixel-diff score.
- Candidate 178 HTML remains local; GitHub HTML upload and remote SHA verification NOT COMPLETED. Candidate is NOT ACCEPTED.

Next: validate real scene-background/art loading in a supported native-origin browser; implement the requested modal workspace launcher with background dimming/state restoration; then run full regression. Preserve Candidate 175/173/170/169 checkpoints.