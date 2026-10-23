# BASELINE.md

- Accepted baseline status remains unchanged. Candidate 169 and Candidate 170 are experimental, not accepted.
- Candidate 164 reference: de7692c913d3186606aa5d2395dd6efc88b090a347102c46085493d35ecbe370.
- Candidate 169 checkpoint: 5913ad864a8841b144de7c72c4deeede765ec5675117667c13f9eb5fe89a7d66f.
- Candidate 170 experiment: 089d8cb9f6e63178a9726dbfce9485c8691e81d3600ce5669458a26c7a9d5662.
- Do not overwrite prior artifacts. Roll back to Candidate 169 if the width change introduces an issue.

## Reference source lock (does not change acceptance status)

- Official osu!stable Song Select screenshot source: `ppy/osu-wiki@8c585eea35455a4bd255f93b5d59ccaf807e6bdd`, `wiki/Client/Interface/img/song-selection.jpg`.
- Image dimensions: 1280 x 720. GitHub blob SHA: `1e927a00a1984a5ba20fa5efec639410f349607a`.
- This source identifies the correct UI screen for geometry measurement; no Candidate 170 pixel-match pass is implied.
