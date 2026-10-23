# Next task — cascade-aware CSS consolidation

## Completed discovery
- Candidate 163 exact duplicate-rule pass removed 11 exact duplicate rules without changing remaining values.
- Condition-aware audit expanded coverage to 3,412 qualified rules, including 775 nested conditional rules.
- Audit report: [CSS_CASCADE_AUDIT_V2.md](CSS_CASCADE_AUDIT_V2.md).
- A same-selector review of .p32-catalog did not prove any whole rule safe to remove under the conservative same-selector / same-importance test. Do not bulk-delete by selector frequency.

## Next code-changing stage
1. Build declaration-level winner maps for Song Select catalog/list, selected-song metadata, filters/mode controls, scene/background, and bottom player.
2. For each declaration, record selector specificity, source order, !important, conditional context, and any runtime mutation that can change the result.
3. Remove only declarations proven unreachable in all supported states; consolidate surviving declarations by UI ownership where this preserves behavior.
4. Preserve selected/hover state, scroll behavior, responsive conditions, and the required 7.5-row catalog geometry.
5. Run CSS parse checks, the existing Playwright suite, and screenshot comparisons against Candidate 163. Treat the existing toolbar clipping failure as pre-existing until a fix is independently demonstrated.
6. Continue to shared bottom player, workspace dock/sidebar, homepage, then quiz UI after Song Select cleanup has evidence.
7. Keep Candidate 163 and Candidate 162 immutable as rollback artifacts. Every code-changing stage gets a unique candidate name, SHA-256, test report, and screenshot diff.
8. Do not mark acceptance until the toolbar clipping issue is resolved and blocked real-origin checks can run in an allowed environment. IndexedDB, Blob lifecycle, real audio, live APIs, and full persistence/workspace regression must remain NOT RUN/BLOCKED unless actually exercised.
