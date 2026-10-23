# Candidate 162 test report

## PASS
- Playwright suite: 26 PASS / 0 FAIL across 1648×928, 1440×900 and 1280×720.
- Song row tops at 1648×928: [93,169,262,373,480,580,672,764], maximum error 2 px against [93,170,263,375,479,580,673,766].
- 7.5 visible rows and no document overflow at all three viewport sizes.
- Top search/filter y=34; mode tabs y=67; no ancestor clipping.
- Bottom player cover, metadata and progress geometry assertions pass.
- Selection, arrow keys, hover translation, search fallback, EMQ-only source, profile restore, workspace panel, and no uncaught page errors pass.
- CSS parse: 96 style blocks, 2,648 qualified rules, 0 parser errors.
- Added root-fix checks: 5 PASS / 0 FAIL, including computed `display:block` for the route-active scene image and exact one-declaration source diff.

## BLOCKED
- Actual file:// and localhost navigation: `ERR_BLOCKED_BY_ADMINISTRATOR`.
- Real image Blob rendering and IndexedDB persistence/export/clear/restore on intended origin.

## NOT RUN
- Actual user-selected background reload/restart persistence.
- Real audio and live APIs.
- Full custom-list CRUD and four-workspace end-to-end regression.
- Direct double-click single-file acceptance.

## Interpretation
This is a root-cause CSS visibility fix with good regression evidence for existing behaviors. It is not a claim that real background persistence works, and not a release acceptance.
