# Stage 64 — Unified static inventory (Candidate282)

## Verified artifact
- Candidate282 local file: `amq_learning_tool_v82_85_96_candidate282_batch_routing_lifecycle_fix_20261025.html`
- Size: `9,379,673` bytes
- SHA-256: `66e97e9963c115a3e3f853e83bc0e6616c9d0bea57007c6fd766cadd44640e49`
- Candidate282 is based on Candidate281 SHA-256 `15853184707b2cbdfa872f2be702392bb7a563805f84fb782e467b94e630245a`.

## Inventory findings

### JavaScript / payloads
- 69 total `<script>` tags.
- 67 executable inline JavaScript blocks; 2 non-JavaScript payloads identified by declared type (`application/json` and `application/octet-stream`).
- Candidate282's previous Node syntax check passed 67/67 executable blocks.
- Browser runtime validation remains BLOCKED: Chromium `page.goto()` to the local file returned `net::ERR_BLOCKED_BY_ADMINISTRATOR`.

### CSS cascade
- 109 `<style>` blocks.
- 540,387 characters of embedded CSS.
- 2,819 qualified CSS rules.
- 2,143 unique serialized selector groups.
- 387 selector groups appear in multiple rules, accounting for 676 repeated instances beyond their first occurrence.
- `tinycss2` found zero stylesheet/declaration parse errors.
- Exact selector + exact declaration-body duplicate groups: 0. Therefore there is no evidence-based safe bulk deletion of identical repeated CSS rules. Repeated selectors often have different declarations or media/route contexts and require cascade/computed-style evidence before consolidation.

### DOM identity
- BeautifulSoup's parsed DOM found 272 literal `id` attributes and no duplicate IDs in parsed markup. This does not count dynamically generated DOM IDs or content inside script payloads.

### Workspace Dock / Sidebar
- `#amqWorkspaceDock` appears 123 times in the source; `#amqWorkspaceSidebar` appears 117 times.
- These elements are referenced by multiple workspace setup, navigation, layout and route scripts. They cannot safely be deleted based on being hidden in some routes.
- Candidate282 has multiple Song Select rules targeting the Dock, including a route-active display rule. Resolving the Dock requires tracing all its distinct actions and measuring the actual DOM/computed styles in a permitted browser.

### Batch mode
- `.amq-batch-mode` occurs 6 times; `.amq210-batch-check` occurs 4 times; `.amq210-batch-search-hidden` occurs 2 times.
- Song batch and work batch are separate operations. The work-batch API has independent callers; the song-batch module provides bulk familiarity, tags, blacklist and custom-list membership. Deleting the shared module before integrating those capabilities would be a functional regression.
- The Stage 63 source fix addresses VNDB action ownership and batch observer/selection cleanup, but interaction-level assertions remain untested.

## Cleanup classification
- **Keep:** shared Dock/Sidebar until all action and route responsibilities are migrated; work-batch API until independent callers are migrated; song batch operations until integrated.
- **Integrate:** repeated CSS responsibilities after computed-style and screenshot comparison; batch operations into the formal list-management workspace.
- **Delete:** only dead action branches/duplicate entry creation already removed in Candidate281, and further code only after reference and runtime checks prove no dependencies.
- **Defer / blocked:** Dock replacement/removal, broad CSS consolidation, observer lifecycle under actual route transitions, persistent storage and external API behavior.

## Test status
- PASS: local file size and SHA-256 match Candidate282 status record.
- PASS: CSS parse audit (2,819 rules, zero parse errors).
- PASS: DOM parser literal-ID audit (272 IDs, zero duplicates).
- PASS: executable script inventory (67 JS blocks, 2 typed payload blocks excluded).
- BLOCKED: browser navigation and computed-style/screenshot checks due `net::ERR_BLOCKED_BY_ADMINISTRATOR`.
- NOT RUN: interactive route switching, data persistence, real API imports, media and multiplayer.

## Decision
A broad blind deletion is not safe or justified by current evidence. Continue with dependency-led consolidation: migrate one responsibility at a time, then delete its former implementation and run targeted regression checks. The current inventory gives a measured starting point for that unified pass.