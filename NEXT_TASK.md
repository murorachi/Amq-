# NEXT TASK — Song Select continuation

1. Continue from Candidate 135; rollback to Candidate 130 if regressions appear.
2. Fix the left rail mismatch: compact player/ranking hierarchy without fabricated data and without removing import/list/learning routes.
3. Align top-left song metadata with the reference using real available fields only.
4. Refine selected card geometry against measured reference: selected position/size, tiny adjacent gap, three distance tiers, and exactly eight visible total rows.
5. Evaluate whether work-card -> inline-song-row interaction should become a single song/difficulty card surface; avoid duplicated focus between parent work and selected song.
6. Preserve the existing scene-background manager and subdued no-custom-background gradient.
7. Complete hover/selected/expanded, keyboard, search/sort, scroll and mode-switch tests.
8. Complete Stage 3 regression: custom-list CRUD/persistence, imports, audio, learning center/analysis and routing.
9. Playwright set_content does not prove file:// or durable storage behavior; find a supported local browser route if available.
10. Recompute regional pixel metrics after structural changes. Current low SSIM is not acceptance.