# Candidate287 CSS cleanup run

- Candidate: amq_learning_tool_v82_86_01_candidate287_css_cleanup_20261025.html
- Version: v82.86.01-candidate287-css-cleanup-20261025
- Size: 9,377,520 bytes
- SHA-256: b4d645eb2c1bb532729aa35b7b2a078c65845c2da479c3145eb14456608b0eab
- Immutable rollback: Candidate283 SHA-256 aa1af13d2ff9419968ba92f382c75e0fd65d0ae4b72957331a1b488f65d74a0b
- Source candidate: Candidate286 SHA-256 4029ae33a803a5203dd8c6d5bbbf9895fd6918a24e9159a1cbd098124b73d724

## Actual changes
- Removed 3 empty CSS rules.
- Removed 9 earlier copies across 9 exact duplicate groups, retaining each group's last identical selector/condition/declaration rule.
- Removed one redundant repeated html scroll-behavior:smooth declaration.
- CSS parse: 3,638 rules, 0 parse errors, 0 empty rules, 0 exact duplicate rule groups.
- Inline JS syntax: 67/67 PASS; duplicate HTML IDs: 0.
- Created CSS selector/condition index, heuristic style ownership index, dynamic style/class write index and a numbered 1-100 status tracker.

## Browser evidence
- Playwright Chromium page.set_content loaded the document.
- Home icon expansion and navigation to Song Select: PASS.
- Desktop and mobile stage geometry measured; 180 song rows present in the DOM.
- Candidate286 vs Candidate287 home screenshot: identical pixels.
- Desktop Song Select screenshot comparison: 2,566 changed pixels; unresolved, not marked PASS.
- Mobile pixel comparison: NOT RUN (timed out).
- localStorage persistence: NOT RUN because opaque-origin SecurityError.
- Full workspace/Dock/player interaction tests: NOT RUN.
- Browser file/localhost navigation and HTML binary upload/remote SHA validation remain BLOCKED.

## Important scope status
This is a conservative cleanup candidate, not a claim that all 100 engineering items are complete. Formal ownership-based CSS consolidation, full runtime dependency tracing, legacy feature CSS/JS removal, and browser acceptance remain incomplete. Candidate283 and Candidate284 are preserved locally and were not overwritten.
