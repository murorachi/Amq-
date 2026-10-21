# Candidate 71 Change Log

Parent: Candidate 70.

## User-reported issues addressed
- Made the scene background layer visible behind transparent Home and Song Select surfaces. A synthetic gradient was used in the screenshot test to confirm the UI no longer paints an opaque layer over the background.
- Increased the homepage central music icon and adjusted its vertical layout using actual wrapper/SVG dimensions rather than relying only on a transform.
- Removed the boxed song-info appearance and the redundant centre `ANIME MUSIC / VISUAL NOVEL` / work-title / helper copy. Song title, artist metadata, play count, and last-wrong status remain in the upper-left as unboxed text.
- Created a visible empty ranking frame at the bottom-right.
- Restored the existing `#audioDock` on Song Select and positioned it across the lower centre/right, above the screen edge.
- Replaced unexplained `1/2/3/4` dock glyphs with compact readable labels: 清單管理、批次整理、學習中心、學習分析. Reduced spacing and kept Back at the left.
- Removed the visible grid/list switch and duplicate Singer entry; moved 全部作品／已探索作品／未探索作品 into a category selector.
- Added a per-page size selector (60/120/180/360).
- Replaced manual AMQ/EMQ load-more interaction with bottom-sentinel automatic pagination. The next batch follows the selected page size; switching modes resets the scroll position so it does not immediately load another page.
- Added batched VNDB cover lookup for EMQ work cards, reusing the existing VN cover service instead of making one request per card.
- Changed the separate VN catalog's batch size from 72 to 180 and wired its existing load action to an automatic bottom sentinel.
- Mapped the VN catalog to the shared Song Select background scene.
- Fixed return-to-home cleanup for stale workspace state and improved the mobile catalog's vertical allocation and filter strip.

## Known limitations
- This execution environment blocks `file://` navigation and external VNDB API responses. Real IndexedDB background persistence and successful cover image downloads were not verified here.
- The visual design is not yet a pixel-perfect osu!stable carousel. The current catalogue still uses work cards.
- The HTML artifact itself has not been uploaded to GitHub because the available GitHub connector supports text-file writes but not uploading the local 9 MB HTML bytes. The engineering documents are on the Candidate 71 branch.
