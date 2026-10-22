# Candidate 104 HTML upload guide

The HTML is 9,209,537 bytes (about 8.78 MiB), below GitHub's documented 25 MiB browser upload limit and 100 MiB regular Git command-line limit. The recommended route is Git push from a network-enabled local clone, or GitHub Desktop. Git LFS is only necessary if the file later exceeds 100 MiB.

The execution container cannot resolve api.github.com, and the connected GitHub tool set has text-file operations but no binary release-asset upload operation. Engineering records are uploaded, but Candidate 104 HTML remote presence is NOT VERIFIED.

A PowerShell helper is provided at `engineering/candidate104/upload_candidate104_to_github.ps1`. Download the HTML and helper into the same folder, then run on Windows with a clone of murorachi/Amq-:
```powershell
powershell -ExecutionPolicy Bypass -File .\upload_candidate104_to_github.ps1 -RepoPath C:\path\to\Amq-
```
The script checks the repository origin, fetches/checks out the target branch, copies the HTML to `dist/`, commits and pushes it, downloads the raw remote file, and compares SHA-256. It throws an error if any step fails or hashes differ.

Official GitHub documentation:
- REST contents API: https://docs.github.com/en/rest/repos/contents
- Upload files: https://docs.github.com/en/repositories/working-with-files/managing-files/adding-a-file-to-a-repository
- Large files / Git LFS: https://docs.github.com/en/repositories/working-with-files/managing-large-files/about-large-files-on-github
