# UI specification conformance matrix — correction step 1

Checkpoint: `NEW_ARCH_V0.1.1_OSU_STABLE_UI_01`.
User visual acceptance: **FAIL — 10/100**.

## Step 1 conclusion

Reviewed `src/views.js`, `src/styles.css`, `src/app.js`, generated HTML and the test report. The failure is overall composition and reference mismatch, not merely colors or button polish. No product source was changed in this step because the exact approved reference screens were not available in the accessible project files; guessing another design would repeat the same mistake.

## Page-by-page conformance

| Screen | Agreed direction | Current implementation | Status | Correction gate |
|---|---|---|---|---|
| Main menu | Reconstruct osu! stable main-menu composition and visual hierarchy | Invented brand mark, orbit/diagonal background, hero title, numbered vertical menu and right-side collection stats | FAIL | Rebuild the layout regions and proportions from the approved reference, not just its color palette |
| Song select | Follow osu! stable selection-screen composition, density and selected-item treatment | Generic search toolbar, plain text list, fabricated note-art panel and CRUD detail form | FAIL | Map list, selected item, metadata and controls to the reference's relative positions and information density |
| Quiz | AMQ's established interaction direction | Centered card-style quiz | NOT ACCEPTED | Preserve answer flow; reconstruct visuals from AMQ reference |
| Results | osu!-inspired results hierarchy | Generic metric tiles | NOT ACCEPTED | Rebuild result hierarchy and layout rather than retaining dashboard cards |
| Other pages | Follow the approved 13-stage specification | Generic fixed sidebar, top bar, page headers and rounded panels across most routes | NOT ACCEPTED | Compare each page against its own approved specification |
| Shared buttons | Consistent dimensions, spacing, alignment and interaction | Some shared styling exists, but whole-screen visual acceptance is absent | PARTIAL / NOT ACCEPTED | Verify dimensions and alignment in the rendered pages |

## Confirmed root causes

1. “Reference osu! stable” was treated as a loose dark game aesthetic, not as a reconstruction target.
2. The reference screens were not decomposed into traceable regions, proportions, alignment, density and states.
3. The generic sidebar/topbar shell was not checked against the agreed direction before it spread across pages.
4. Node tests and HTML structure checks were treated as stronger UI evidence than they are; they do not establish visual similarity.
5. No actual browser screenshot acceptance gate was required before progressing to another page.

## Step 1 status

- Done: source/style/report review, discrepancy matrix, freeze of later UI stages.
- Not done: product UI edits. The exact approved 13-stage notes and reference screenshots were not found in currently accessible project/library files, so a faithful correction cannot be made safely by guessing.
- Next: recover the approved reference material, then correct only the main menu and inspect the real browser render before moving to song select.
- Existing AMQ: untouched and not integrated.