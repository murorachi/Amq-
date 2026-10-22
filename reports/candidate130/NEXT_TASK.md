# NEXT TASK — Song Select Stage 1 and follow-on acceptance

1. Find a supported local-browser route that allows direct HTML loading and persistent storage; `set_content` is not file:// acceptance.
2. Fix card text clipping while preserving the 60px row rhythm by editing the canonical card-content owner, not adding overrides.
3. Rebuild the left-side composition to match the compact ranking/player panel while preserving import/list/learning access and avoiding fake player data.
4. Verify the scene background manager and a coherent fallback without a user-selected background; do not use the reference screenshot as a background or fabricate artwork.
5. Finish top-left metadata and bottom-control geometry with measured screenshots.
6. Complete Stage 2 state/data/keyboard/mouse tests.
7. Complete Stage 3 regression for list create/add/remove/filter/persistence, modes, import error recovery, learning center/analysis, routing, audio and background manager.
8. Recompute regional SSIM/MAE/RMSE after each accepted visual stage; label untested items NOT RUN/BLOCKED.
9. Upload reports to the feature branch and verify them. HTML binary upload and remote SHA-256 still need a supported path.
