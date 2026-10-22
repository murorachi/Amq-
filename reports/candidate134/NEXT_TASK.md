# NEXT TASK — Fix catalog lifecycle before visual song rail

1. Start from Candidate 132, not rejected Candidate 134.
2. Identify why the fixed-overlay/visibility CSS changes coincide with the inline list disappearing and the work-card DOM doubling from 180 to 360.
3. Trace the canonical render owner and clone lifecycle for `#grid` / `#p32Mount`; avoid changing visibility/layout until the event flow is understood.
4. Keep the real-data eight-row window: selected row plus nearby song rows, distance tiers, selected gap 2px, maximum eight visible.
5. Make the selected-work context and return-to-works interaction explicit without reintroducing the full catalog behind the song rail.
6. Re-test selected song, neighboring rows, return to work list, 1648×928 / 1440×900 / 1280×720, and console.
7. Keep background fallback CSS-only; no remote art or fabricated data.
8. Only after browser state transitions pass, update baseline/status and upload the next accepted checkpoint.
