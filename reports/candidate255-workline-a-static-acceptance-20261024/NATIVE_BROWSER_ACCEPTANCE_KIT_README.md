# Candidate255 原生瀏覽器驗收工具包說明

- Candidate version: v82.85.69-candidate255-remove-last-quicktools-refs-20261024
- Candidate HTML SHA-256: bd620e42e677ddbc8d48cf84da5773f3a51e42978c20ecbaa07761e467a7630d
- Kit ZIP: Candidate255_native_browser_acceptance_kit_20261024.zip
- Kit ZIP SHA-256: 89784d98863990550e21cff8c840c964b89d058834724561ab42aa69ae168d82
- Server: localhost only, http://127.0.0.1:18765
- Uses browser-native localStorage; iframe reload verifies custom-list persistence.
- Do not treat the kit as accepted until it has been run in a normal Windows browser and its JSON report reviewed.
- Real AniList/MAL/VNDB API behavior requires actual browser interactions; entrypoint visibility alone is not API acceptance.
- Formal Candidate255 HTML has not yet been uploaded to this branch; its expected dist path currently returns 404.
