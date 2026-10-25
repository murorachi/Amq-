# Batch26 Round 2 — Dependency ownership and grouped cleanup

## Baseline and artifact
- Input Candidate320: `amq_learning_tool_v82_86_31_candidate320_remove_dead_songselect_catalog_observer_20261025.html`
- Input size: 1,645,470 bytes
- Input SHA-256: `134020658ac272916bdd503c0ebdbe8cdbafcf0c15cff96cc0d45ddf63c8a66c`
- Output Candidate321: `amq_learning_tool_v82_86_32_candidate321_batch26_round2_songselect_ownership_cleanup_20261025.html`
- Output size: 1,645,516 bytes
- Output SHA-256: `5b4ac7bdbe92f1b1a1b7056e543b065a0829d266a5f4b4fd2a1e9f7a5347e83a`
- Formal baseline remains Candidate302 SHA-256 `f718a744057be0a33d371306f1742aaeede90e84f33d9e62ab45f5e6db488abd`. Candidate320 remains unchanged rollback checkpoint. Candidate321 is not promoted.

## Ownership map
| Module | Owned DOM/state | Lifecycle | Disposition |
|---|---|---|---|
| Candidate103 | audioDock geometry, c99Back/c99Home height, c99ModeWrap direction, audio/video visibility | body class Observer; audioPlayer style/controls Observer | Keep; its properties differ from Candidate106 |
| Candidate106 | catalog geometry, toolbar/search/filter/mode tabs/head/result count/controls, p32Mount and grid cards | navigation queues 80/300/900ms, resize, body class/data-view Observer | Keep core layout; removed conflicting/redundant catalog overflow writes |
| Candidate114 | restore audioDock/children for non-Song-Select route and reset home player frame/slot | body class Observer, capture navigation listener, DOM ready and delayed resets | Keep; timers overlap but no browser evidence yet proves safe reduction |
| Candidate115 | artwork placeholder and selected marker for other AMQ/EMQ inline lists | documentElement subtree Observer, click, navigation, DOMContentLoaded, 1s scan | Narrowed to exclude main tracklist |
| Candidate137 | creates main tracklist and art placeholders; filters/sorts/chunk rendering/selection | list scroll, resize, mode/filter/tag/navigation events, body class Observer, init retry/poll | Keep; main tracklist owner |
| Candidate158 | overflow correction for p32Mount/catalog based on route and viewport | body class Observer, body subtree childList Observer, resize/navigation | Keep pending evidence; broad Observer not yet proven removable |
| Candidate210 | main tracklist centered selection/playback and cover loading/fallback | click/wheel, list childList Observer, image IntersectionObserver and timeouts | Keep; main tracklist owner |

## Grouped modifications
1. **Candidate106 catalog overflow:** removed `overflow` assignments from both compact and desktop `catalogGeometry` objects. Candidate137 CSS sets route-active catalog overflow visible; Candidate158 also forces visible for desktop route state. The old desktop hidden value conflicts with Candidate158's clipping correction and the winner can depend on event/RAF order, while compact visible duplicates the CSS. This removes conflicting inline ownership, not the overflow behavior.
2. **Candidate115 vs Candidate137/210 main-list overlap:** changed the artwork selector to `.amq-inline-song-list:not(#amqSongSelectTracklist),.emq-inline-song-list` and excluded `#amqSongSelectTracklist` from click delegation. Candidate137 creates the main list's `.amq-song-art` placeholder; Candidate210 owns its cover loading and selection/playback. Candidate115 still supports other AMQ/EMQ inline lists.

## Not changed
- Candidate103 and Candidate106 observers watch overlapping route state but write different properties.
- Candidate114 timers at 0/180/500/900ms and internal 80/240ms resets remain unproven redundant.
- Candidate137 init retry/poll waits for DOM/data dependencies.
- Candidate158 subtree Observer remains until dynamic mount/catalog clipping can be tested.
- Candidate210 cover Observer remains the main-list cover owner.

## Tests
| Test | Result | Evidence |
|---|---|---|
| Input SHA-256 | PASS | Recomputed Candidate320 hash matches handoff |
| Output SHA-256 | PASS | Recomputed Candidate321 hash |
| JavaScript syntax | PASS | 65 executable inline scripts checked with Node `--check`, 0 errors |
| CSS parsing | PASS | 109 style blocks, 2,648 rules, 9,693 declarations, 0 parser errors |
| Duplicate HTML IDs | PASS | 269 IDs, 0 duplicates |
| Change assertions | PASS | overflow assignments removed; Candidate115 excludes main tracklist in artwork and click selectors |
| Diff scope | PASS | Only the two grouped changes above; Candidate320 unchanged |
| Chromium local load | BLOCKED | Headless Chromium timed out after 30 seconds; dumped DOM was empty |
| Full-app E2E / AMQ-EMQ-MIX operations | NOT RUN | Not executed |
| Remote Candidate321 HTML/hash | NOT VERIFIED | Candidate320 HTML itself is absent from the target branch; local 1.6MB artifact could not be transferred through the available GitHub content interface in this run |

## Rollback
Use Candidate320 unchanged: SHA-256 `134020658ac272916bdd503c0ebdbe8cdbafcf0c15cff96cc0d45ddf63c8a66c`. Candidate302 remains the formal baseline. If browser regression is observed, revert to Candidate320; do not promote Candidate321 until local browser acceptance and remote hash verification.

## Next
1. Browser-test Song Select AMQ/EMQ/MIX, cover loading, selection/playback, filtering and route-exit player reset.
2. Only then determine whether Candidate114 delayed resets can be reduced.
3. Investigate whether Candidate158's subtree Observer can be scoped more narrowly.
4. Upload Candidate321 HTML and read it back to verify its remote SHA-256; currently unverified.
