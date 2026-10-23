# Candidate 161 visual audit — 2026-10-23

- Candidate SHA-256: `e144bd6ee4ad69ee2f05e4b761700c4c748b50d00fc31dd9117d6ce862974839`.
- Reference screenshot SHA-256: `f0fd3ab5ec11e87632d95aac0ab7b9df3595c96e20bb03c5201d012d613b99a4`.
- Full SSIM 0.311279, MAE 54.6844; Candidate 145: SSIM 0.304511, MAE 54.6926.
- Bottom controls SSIM 0.213940, MAE 57.5509; Candidate 145: SSIM 0.185545, MAE 61.5834.
- Bottom player metadata, placeholder cover and progress now align to measured reference bounds. Remaining mismatch: the reference has osu-specific controls/data not present in AMQ; none were fabricated.
- Decision: Candidate 161 is a meaningful visual experiment but not accepted; intended-runtime tests remain blocked/not run.
