# Candidate 163 CSS Cascade Audit V2

- Branch: `amq-candidate104-songselect-layout-fix`
- Baseline Candidate 163 SHA-256: `8cef531d25e97c9af19d7335b96b87856848186490d48d9797975592f2a6d0a5`
- Style blocks: 96
- Qualified rules including nested conditional blocks: 3,412
- Rules inside supported nested at-rules: 775
- Repeated selector/property/importance/condition groups: 1,251
- Hotspot records inspected: 634

## Result
This audit expands the earlier inventory to include nested conditional CSS contexts. It does not authorize mass deletion: repeated declarations can belong to different conditions or intentional UI states. The initial Song Select `.p32-catalog` review found no whole rule that met the conservative removal test (all declarations superseded by later declarations under the same selector and importance). No CSS behavior was changed during this audit-only continuation.

## Next code-changing pass
1. Build declaration-level winner maps for Song Select catalog, selected-song info, scene/background, bottom player, workspace dock, homepage, and quiz.
2. Classify declarations as active, conditional, superseded, or runtime-mutated.
3. Remove only declarations proven unreachable across supported states.
4. Re-run Playwright and screenshot comparisons against Candidate 163.

## Existing test caveats
Candidate 163: 25 PASS / 1 FAIL. The failing toolbar-clipping assertion also fails on Candidate 162, so it is pre-existing. Screenshot comparison was pixel-identical to Candidate 162. file:// and localhost navigation were blocked by environment policy. IndexedDB persistence, scene Blob lifecycle, real audio, live APIs, and full CRUD/workspace regression remain NOT RUN or BLOCKED.
