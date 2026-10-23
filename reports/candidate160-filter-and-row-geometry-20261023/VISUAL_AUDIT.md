# Candidate 160 visual audit — 2026-10-23

- Candidate SHA-256: `b550f834a5aef8fa981079fb83e1788211fc52f9b385f6925ff815fa28649cd1`.
- Reference screenshot SHA-256: `f0fd3ab5ec11e87632d95aac0ab7b9df3595c96e20bb03c5201d012d613b99a4`.
- Row top target `[93,170,263,375,479,580,673,766]`; actual `[93,169,262,373,480,580,672,764]`; max error 2px.
- Top filters are visible at y=34 and mode tabs at y=67; overflow clipping assertion passes.
- Full SSIM 0.308138, MAE 55.1537; right-list SSIM 0.368987, MAE 50.9136. Structural score improved, but pixel MAE is still worse than Candidate 145.
- Artwork, osu ranking data and bottom-control composition remain mismatched; do not fabricate content.
- Decision: Candidate 160 is experimental, not accepted.
