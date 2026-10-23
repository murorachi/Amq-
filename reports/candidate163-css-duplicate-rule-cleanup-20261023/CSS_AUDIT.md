# CSS duplication audit — Candidate 163

## Scope
Candidate 162 was inspected as the baseline. It contained 96 style blocks, with many repeated selectors across legacy versioned blocks and later UI-specific override blocks.

## Conservative cleanup performed
Removed 11 exact duplicate qualified rules within their original style blocks:
- one duplicate `.hidden` rule in the base stylesheet;
- exact duplicates in `v79-design-system` affecting home/explore visibility, dark-theme background, quiz answer/skip controls;
- exact duplicates in `candidate94-last-writer-filter-fix` affecting list membership visibility and workspace dock/button rules.

The removal algorithm only removed a rule when an identical selector and declaration list existed in the same style block and no intervening rule with the same selector changed any property set by the duplicate. No values were rewritten and no rules were moved between blocks.

## Audit findings
- Before: 96 style blocks; 2,648 qualified rules; 0 CSS parser errors.
- After: 96 style blocks; 2,637 qualified rules; 0 CSS parser errors.
- Repeated selector/property definitions remain widespread across blocks. These are not safe to delete solely because their values look similar: order, specificity, `!important`, route classes, active/hover/selected states, and responsive conditions can change the computed result.

## Broader ownership areas requiring follow-up
1. Song Select catalog/list geometry and filtering.
2. Top-left song metadata and stats.
3. Top mode/filter controls.
4. Bottom audio/player dock.
5. Workspace dock and expanded sidebar.
6. Home composition, main icon, player card and home audio dock.
7. Quiz answer/visualizer layout and shared design-system rules.

## Next method
For each area, build a selector/property cascade map with source block, order, specificity, importance, and state/media conditions. Compare computed styles in representative states before consolidating. Keep the current candidate experimental until the pre-existing toolbar clipping issue and blocked runtime tests are resolved.
