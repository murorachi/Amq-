# Candidate 162 visual audit

- Candidate SHA-256: `537607bf392b3f0f54e922db9049acaeae3020af8fd337da67566deebe9166a0`.
- Only CSS change: restore `display:block!important` on the latest route-active `.p32-scene-image` selector.
- Candidate 161 and 162 default-state screenshots are pixel-identical: screenshot SHA-256 `796f2534a08ff7c031ead642e02ac841374753f055a0b5ab5c3b1632714637df`.
- Full default SSIM 0.311279, MAE 54.6844; left info SSIM 0.201218, MAE 71.4378; top metadata SSIM 0.054814, MAE 55.2234; central background SSIM 0.426354, MAE 52.3735; right list SSIM 0.368987, MAE 50.9136; bottom SSIM 0.213940, MAE 57.5509.
- Metrics are unchanged because the test fixture has no saved background image. The fix changes the scene image element's visibility state but not the default image-free screenshot. Actual image-state visual comparison remains blocked.
