# Candidate 170 Static Validation (2026-10-23)

- Candidate: `amq_learning_tool_v82_85_46_workspace_proto44-osu-songselect-ui_170_responsive_catalog_width_rootfix.html`
- HTML SHA-256: `089d8cb9f6e63178a9726dbfce9485c8691e81d3600ce5669458a26c7a9d5662`
- File size: 9,269,850 bytes.
- HTML structure check: PASS. One opening/closing html tag; 66 script opening/closing pairs; 96 style opening/closing pairs.
- Inline JavaScript syntax check: PASS. 64 executable inline JS blocks checked using Node.js `--check`; zero syntax errors. Two non-JavaScript data blocks were excluded.
- Validation bundle ZIP integrity: PASS (`unzip -t`, no errors).
- Existing focused Playwright checks: PASS for page completion, UI navigation to Song Select, 180 catalog cards, EMQ-only and AMQ-only source filtering, six viewport bounds, ArrowDown selection change, and zero non-storage uncaught page errors.
- Known caveats: Playwright used `page.set_content` on an opaque origin; localStorage access errors occurred. Native file/http navigation is blocked by the runtime. Live API/audio, durable persistence, full CRUD, original historical 26-test suite, and official screenshot pixel-diff are NOT RUN or BLOCKED.
- Acceptance remains experimental. Candidate 169 SHA-256 rollback checkpoint: `5913ad864a8841b144de7c72c4deeede765ec5675117667c13f9eb5fe89a7d66f`.
