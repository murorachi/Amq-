param(
  [Parameter(Mandatory=$true)][string]$RepoPath,
  [string]$Branch = 'amq-candidate104-songselect-layout-fix'
)
$ErrorActionPreference = 'Stop'
$FileName = 'amq_learning_tool_v82_85_46_workspace_proto44-osu-songselect-ui_104.html'
$Source = Join-Path $PSScriptRoot $FileName
$RelativePath = "dist/$FileName"
if (!(Test-Path $Source)) { throw "Candidate HTML not found: $Source" }
if (!(Test-Path (Join-Path $RepoPath '.git'))) { throw "RepoPath is not a Git clone: $RepoPath" }
$ExpectedHash = (Get-FileHash -Algorithm SHA256 $Source).Hash.ToLowerInvariant()
Push-Location $RepoPath
try {
  $origin = git remote get-url origin
  if ($origin -notmatch 'github.com[:/]murorachi/Amq-(\.git)?$') { throw "Unexpected origin URL: $origin" }
  git fetch origin $Branch
  if ($LASTEXITCODE -ne 0) { throw 'git fetch failed' }
  $local = git branch --list $Branch
  if ($local) { git checkout $Branch } else { git checkout -b $Branch --track "origin/$Branch" }
  if ($LASTEXITCODE -ne 0) { throw 'Could not checkout target branch' }
  $Target = Join-Path $RepoPath ($RelativePath -replace '/', '\')
  New-Item -ItemType Directory -Force -Path (Split-Path $Target) | Out-Null
  Copy-Item -Force $Source $Target
  git add -- $RelativePath
  if ($LASTEXITCODE -ne 0) { throw 'git add failed' }
  git diff --cached --quiet
  if ($LASTEXITCODE -ne 0) {
    git commit -m 'Add Candidate 104 Song Select HTML'
    if ($LASTEXITCODE -ne 0) { throw 'git commit failed' }
  }
  git push origin $Branch
  if ($LASTEXITCODE -ne 0) { throw 'git push failed' }
  git fetch origin $Branch
  if ($LASTEXITCODE -ne 0) { throw 'post-push fetch failed' }
  $RemoteUrl = "https://raw.githubusercontent.com/murorachi/Amq-/$Branch/$RelativePath"
  $Downloaded = Join-Path $env:TEMP 'candidate104-remote-verification.html'
  Invoke-WebRequest -Uri $RemoteUrl -OutFile $Downloaded
  $RemoteHash = (Get-FileHash -Algorithm SHA256 $Downloaded).Hash.ToLowerInvariant()
  Write-Host "Local SHA-256:  $ExpectedHash"
  Write-Host "Remote SHA-256: $RemoteHash"
  if ($ExpectedHash -ne $RemoteHash) { throw 'Remote SHA-256 mismatch; do not treat upload as verified.' }
  Write-Host 'PASS: Remote file hash matches.'
  Write-Host "Remote file: https://github.com/murorachi/Amq-/blob/$Branch/$RelativePath"
} finally { Pop-Location }
