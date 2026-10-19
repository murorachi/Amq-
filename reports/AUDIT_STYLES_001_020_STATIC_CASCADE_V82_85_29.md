# First-pass CSS audit: style_001 through style_020

Baseline V82.85.28. This report records a static selector/cascade inventory for each of the first 20 CSS fragments. No CSS was changed or reordered.

## Per-fragment scan

The scan counts simple selector blocks and selector tokens with a conservative regular expression. Nested at-rules, selector lists and repeated rules can affect the counts. These are navigation aids, not proof of visual equivalence.

| Fragment | Bytes | Rule blocks | Selector tokens | @media | !important | Initial finding |
|---|---:|---:|---:|---:|---:|---|
| style_001 | 27,128 | 331 | 376 | 9 | 7 | Base theme/layout with repeated body/button/wrap/top/hero selectors. Cascade order is foundational. |
| style_002 | 182 | 2 | 2 | 2 | 0 | Two .wrap rules in separate viewport media queries; intentional responsive overrides. |
| style_003 | 3,706 | 52 | 54 | 2 | 0 | Catalogue/detail/dashboard styles contain repeated selector groups. |
| style_004 | 2,020 | 26 | 27 | 1 | 2 | Multiplayer fixes repeat video and answer-row selectors. |
| style_005 | 482 | 6 | 6 | 0 | 0 | Small related-anime detail component. |
| style_006 | 4,051 | 35 | 66 | 1 | 53 | Quiz reveal/dark-mode overrides use many !important declarations. |
| style_007 | 8,867 | 85 | 90 | 1 | 73 | Main quiz redesign with many high-specificity overrides. |
| style_008 | 991 | 14 | 15 | 1 | 5 | Audio dock and cover/view isolation. |
| style_009 | 326 | 4 | 4 | 0 | 1 | Small quiz/audio visibility correction. |
| style_010 | 895 | 9 | 9 | 0 | 4 | Avatar component styling. |
| style_011 | 2,976 | 30 | 33 | 1 | 60 | Quiz layout fixes repeat mystery/side/info/avatar selectors. |
| style_012 | 525 | 6 | 9 | 0 | 7 | Quiz UI cleanup with targeted position overrides. |
| style_013 | 343 | 4 | 5 | 0 | 6 | Final avatar/countdown alignment overrides. |
| style_014 | 1,241 | 13 | 15 | 0 | 29 | Playback label/avatar alignment with high-priority declarations. |
| style_015 | 464 | 6 | 6 | 0 | 0 | Manual submit/round controls. |
| style_016 | 974 | 7 | 11 | 0 | 0 | Quiz volume control. |
| style_017 | 3,639 | 43 | 43 | 1 | 5 | History/blacklist dialog; repeated selectors likely represent state/layout variants. |
| style_018 | 1,297 | 7 | 11 | 1 | 6 | Dock mode and answer feedback styling. |
| style_019 | 1,193 | 5 | 6 | 0 | 28 | Answer feedback overlay and reveal layer ordering. |
| style_020 | 364 | 3 | 3 | 0 | 4 | Explicitly keeps the cover above answer feedback. |

## Findings

| ID | Risk | Disposition |
|---|---|---|
| CSS-01 | style_001 is the base cascade layer with broad selectors. | High: do not move rules without screenshot and responsive comparison. |
| CSS-02 | style_006/style_007/style_011/style_014 use many !important overrides. | High: inventory ownership and load order before reducing specificity. |
| CSS-03 | Duplicate selector text appears across media/state variants and late overrides. | High: duplicate text alone does not establish safe consolidation. |
| CSS-04 | Quiz feedback, cover and reveal layers depend on z-index ordering. | Medium/high: preserve explicit layer relationships. |
| CSS-05 | Small late fragments override earlier layout decisions. | Medium/high: treat as historical cascade patches until proven redundant. |

## Acceptance boundary

This is a static first pass only. No browser screenshot comparison, computed-style equivalence test or visual interaction acceptance was performed in this report. Existing responsive browser tests remain separate evidence and do not prove all CSS rules are equivalent. No production style was edited.

Rollback by reverting this report and matrix references.
