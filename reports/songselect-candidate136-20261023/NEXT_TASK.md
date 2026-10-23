# NEXT TASK — Song Select

1. Keep Candidate 130 immutable as rollback and Candidate 136 as an interaction-rootfix checkpoint.
2. Establish the correct Song Select data/view ownership before changing layout: current `#p32Mount #grid` is an anime/work catalog; actual song rows are inserted inline after a selected work. The reference's right-side rows are song/beatmap entries, so simply changing work-card height is not sufficient.
3. Implement Stage 1 by separating work/catalog browsing from the selected-song list without duplicating data or breaking existing filters/modes. Use real AMQ/EMQ/VN data only.
4. Make the song list the right-side scroll viewport and size rows to show about 7.5 entries at 1648×928, with the bottom row half clipped. Preserve selected -7px and hover -3px shifts.
5. Add pixel/geometry measurements for all five regions and run click, keyboard, search, scroll, category/mode, and route tests.
6. After layout stabilizes, run Stage 3 regression for custom lists, imports, player/background, persistence, and other workspaces.
7. Direct file opening, durable persistence, external APIs and audio remain blocked/not run until a suitable environment can test them.
