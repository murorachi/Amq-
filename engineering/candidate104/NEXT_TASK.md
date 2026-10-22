# Next Task

1. On the user's actual computer, open Candidate 104 by double-click and verify custom-list selection persists after reload; the sandbox blocks file:// and localhost navigation.
2. Confirm real audio starts, pauses, and advances when AMQ/EMQ media hosts are reachable.
3. Complete pixel-difference comparison against the supplied osu!stable reference, excluding the center background artwork.
4. Run `engineering/candidate104/upload_candidate104_to_github.ps1` on a network-enabled Windows PC with a local clone, or use GitHub Desktop / command-line git push. It copies the 9.21 MB file into `dist/`, pushes the branch, downloads the remote raw file and verifies SHA-256. GitHub browser uploads allow up to 25 MiB and command-line regular Git files up to 100 MiB; use Git LFS above 100 MiB.
5. Confirm the script reports identical local and remote SHA-256. Until then, remote HTML is NOT VERIFIED.