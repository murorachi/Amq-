# NEXT_TASK.md

Updated: 2026-10-26 (Candidate360)

## Highest-value next task
Confirmed safe Song Select cleanup is applied through Candidate360. Remaining responsive/overlay CSS stays pending runtime evidence instead of being deleted by guesswork. Next, run one consolidated browser regression using `AMQ_CANDIDATE360_CONSOLIDATED_BROWSER_ACCEPTANCE_20261026.md`; do not request validation after every candidate.

## Latest candidate
- Candidate359: `amq_learning_tool_v82_86_70_candidate359_remove_dead_songselect_shortcuts_20261026.html`
- Size: 1610257 bytes
- SHA-256: `e67498b5d3fbad2424ce06021d523a85a79370b09327022a77cadbd0ec6a28bd`
- Immediate rollback Candidate358 SHA-256: `fb3a0efe0cb9f1bb6cb571b631bf180b4675bb8123af680a870516851f20c7eb`
- Formal baseline Candidate302 remains immutable.

## Completed cleanup
0. Candidate72 curved frame: removed redundant body-class MutationObserver and inline display writes; retained one-time DOM creation and all CSS visibility/geometry rules. Candidate115 unchanged.
1. Removed 132 CSS selector/declaration pairs that could not win and 11 rules with no surviving declarations.
2. Merged 33 adjacent Song Select static style blocks into 11, removing 22 style tags and preserving CSS rule order.
3. Integrated Candidate158 overflow into Candidate106 and removed its separate script plus duplicate class/resize/navigation handlers.
4. Integrated Candidate103 unique Back/Home height and native audio-control guard into Candidate99; removed its third dock geometry writer.
5. Made Candidate99 the single `#audioDock` style writer; Candidate185 now delegates resize to it while retaining modal lifecycle, row centering, orb and old-dock hiding.
6. Removed Candidate71's competing catalog/filter/mount geometry writes. Candidate106 owns catalog/filter/mount dimensions and overflow; Candidate71 retains unique stage/info/scene/grid responsive behavior and route cleanup.
7. Removed the legacy `#amqSongSelectBackButton` creator and 8 CSS rules; removed duplicate `#amqSceneBgQuickOpen` creator and 3 CSS rules plus dead remover. Kept current C99 Back/Home, Escape handling, ranking placeholder and Settings scene-background entry.

## Static results
- PASS: 63 executable inline JS blocks, 0 syntax errors.
- PASS: CSS parse, 0 errors; 3,397 rules and 11,339 declarations.
- PASS: 245 unique IDs, 0 duplicates.
- PASS: legacy control code absent; current C99 Back/Home and required Escape/ranking behavior preserved.
- NOT RUN: real-browser visual/route regression.
- NOT VERIFIED: Candidate360 HTML upload and remote SHA-256 readback.

## Owner map
- `AMQ_CANDIDATE354_SONGSELECT_STYLE_OWNER_MAP_20261026.md` records DELETE / INTEGRATE / KEEP / NEEDS CONFIRMATION evidence through Candidate359.

## Remaining bounded source review
- Candidate72 curved frame: determine whether it is a deliberate visible component or obsolete visual patch; do not delete until route/DOM evidence is clear.
- Candidate115 artwork observer excludes the current `#amqSongSelectTracklist` and targets other inline song lists; likely a distinct component, keep unless call-path evidence changes.
- Remaining responsive CSS for row selection/hover, metadata/cover placement, dock position, workspace overlays and filter clipping needs runtime evidence before broad deletion.

## One consolidated browser regression after source cleanup
Desktop/mobile layout and resize; catalog/filter/mode row; song list and selected/hover state; row actions and cover/metadata; dock play/pause and C99 Back/Home; workspace/sidebar/overlay; Escape/back; scene background; confirm no duplicate legacy shortcuts.

## Blockers
- Browser E2E previously blocked by `ERR_BLOCKED_BY_ADMINISTRATOR` on file:// and localhost; do not repeat those paths.
- Candidate360 remains experimental; Candidate302 remains formal baseline.
- Documentation commits are not HTML publication. HTML upload/readback remains unverified.


## Candidate360 static verification
- PASS: 63 executable inline JS blocks, 0 syntax errors.
- PASS: CSS parse, 0 errors; 3,397 rules / 11,339 declarations.
- PASS: HTML IDs unique, 0 duplicates.
- PASS: curved-frame runtime has no MutationObserver or inline display writes.
- NOT RUN: real-browser regression.
- NOT VERIFIED: Candidate360 HTML upload and remote SHA-256 readback.
