<#
.SYNOPSIS
  Creates a non-secret Cloudflare state report for this repository.

.DESCRIPTION
  This script is meant to be run from the repository root on Windows PowerShell.
  It uses Wrangler through npx when possible, collects safe command output, writes
  docs/cloudflare-state.md, and can optionally push that report to a new Git branch.

  It should not print or commit secret values. Review docs/cloudflare-state.md before
  pushing if you are unsure.

.EXAMPLE
  powershell -ExecutionPolicy Bypass -File .\tools\sync-cloudflare-state.ps1

.EXAMPLE
  powershell -ExecutionPolicy Bypass -File .\tools\sync-cloudflare-state.ps1 -ProjectName "tobymusic-site"
#>

[CmdletBinding()]
param(
  [string]$ProjectName = "",
  [string]$OutputPath = "docs/cloudflare-state.md",
  [switch]$SkipCloudflareLogin,
  [switch]$NoGitPush
)

$ErrorActionPreference = "Continue"

function Write-Step {
  param([string]$Message)
  Write-Host ""
  Write-Host "==> $Message" -ForegroundColor Cyan
}

function Invoke-External {
  param(
    [string]$Title,
    [string]$Command,
    [int]$TimeoutSeconds = 90
  )

  Write-Step $Title
  Write-Host $Command -ForegroundColor DarkGray

  $psi = New-Object System.Diagnostics.ProcessStartInfo
  $psi.FileName = "cmd.exe"
  $psi.Arguments = "/c $Command"
  $psi.RedirectStandardOutput = $true
  $psi.RedirectStandardError = $true
  $psi.UseShellExecute = $false
  $psi.CreateNoWindow = $true

  $p = New-Object System.Diagnostics.Process
  $p.StartInfo = $psi

  try {
    [void]$p.Start()
    if (-not $p.WaitForExit($TimeoutSeconds * 1000)) {
      try { $p.Kill() } catch {}
      return [pscustomobject]@{
        Title = $Title
        Command = $Command
        ExitCode = -1
        Output = "Timed out after $TimeoutSeconds seconds."
      }
    }

    $stdout = $p.StandardOutput.ReadToEnd()
    $stderr = $p.StandardError.ReadToEnd()
    $combined = ($stdout + "`n" + $stderr).Trim()
    if ([string]::IsNullOrWhiteSpace($combined)) { $combined = "(no output)" }

    return [pscustomobject]@{
      Title = $Title
      Command = $Command
      ExitCode = $p.ExitCode
      Output = $combined
    }
  } catch {
    return [pscustomobject]@{
      Title = $Title
      Command = $Command
      ExitCode = -1
      Output = $_.Exception.Message
    }
  }
}

function Add-Section {
  param(
    [System.Text.StringBuilder]$Builder,
    [string]$Title,
    [string]$Body
  )
  [void]$Builder.AppendLine("")
  [void]$Builder.AppendLine("## $Title")
  [void]$Builder.AppendLine("")
  [void]$Builder.AppendLine($Body)
}

function Add-CommandResult {
  param(
    [System.Text.StringBuilder]$Builder,
    [object]$Result
  )
  [void]$Builder.AppendLine("")
  [void]$Builder.AppendLine("### $($Result.Title)")
  [void]$Builder.AppendLine("")
  [void]$Builder.AppendLine("Command:")
  [void]$Builder.AppendLine("``````text")
  [void]$Builder.AppendLine($Result.Command)
  [void]$Builder.AppendLine("``````")
  [void]$Builder.AppendLine("")
  [void]$Builder.AppendLine("Exit code: `$($Result.ExitCode)`")
  [void]$Builder.AppendLine("")
  [void]$Builder.AppendLine("Output:")
  [void]$Builder.AppendLine("``````text")
  [void]$Builder.AppendLine($Result.Output)
  [void]$Builder.AppendLine("``````")
}

function Get-RepoRoot {
  $gitRoot = (Invoke-External "Detect Git root" "git rev-parse --show-toplevel" 20)
  if ($gitRoot.ExitCode -eq 0 -and -not [string]::IsNullOrWhiteSpace($gitRoot.Output)) {
    return $gitRoot.Output.Trim()
  }
  return (Get-Location).Path
}

$repoRoot = Get-RepoRoot
Set-Location $repoRoot

if (-not (Test-Path "docs")) { New-Item -ItemType Directory -Path "docs" | Out-Null }

# Default Cloudflare Pages project name from package.json name, if present.
if ([string]::IsNullOrWhiteSpace($ProjectName) -and (Test-Path "package.json")) {
  try {
    $pkg = Get-Content "package.json" -Raw | ConvertFrom-Json
    if ($pkg.name) { $ProjectName = [string]$pkg.name }
  } catch {}
}
if ([string]::IsNullOrWhiteSpace($ProjectName)) { $ProjectName = "tobymusic-site" }

$wrangler = "npx --yes wrangler"
$results = New-Object System.Collections.Generic.List[object]

$results.Add((Invoke-External "Git status" "git status --short --branch" 30))
$results.Add((Invoke-External "Git remote" "git remote -v" 30))
$results.Add((Invoke-External "Git current commit" "git rev-parse HEAD" 30))
$results.Add((Invoke-External "Node version" "node --version" 30))
$results.Add((Invoke-External "NPM version" "npm --version" 30))
$results.Add((Invoke-External "Wrangler version" "$wrangler --version" 120))

$whoami = Invoke-External "Cloudflare account - wrangler whoami" "$wrangler whoami" 120
$results.Add($whoami)

if ($whoami.ExitCode -ne 0 -and -not $SkipCloudflareLogin) {
  Write-Host ""
  Write-Host "Wrangler is not logged in, or Cloudflare login was not detected." -ForegroundColor Yellow
  $answer = Read-Host "Run 'wrangler login' now? This opens Cloudflare in your browser. Type Y to continue"
  if ($answer -match "^[Yy]") {
    $login = Invoke-External "Cloudflare login" "$wrangler login" 180
    $results.Add($login)
    $results.Add((Invoke-External "Cloudflare account after login" "$wrangler whoami" 120))
  }
}

# Cloudflare Pages / Workers information. Some commands may fail depending on account permissions and Wrangler version.
$results.Add((Invoke-External "Cloudflare Pages project list" "$wrangler pages project list" 120))
$results.Add((Invoke-External "Cloudflare Pages deployments for $ProjectName" "$wrangler pages deployment list $ProjectName" 120))
$results.Add((Invoke-External "Cloudflare Pages production deployments for $ProjectName" "$wrangler pages deployment list $ProjectName --environment production" 120))
$results.Add((Invoke-External "Cloudflare Pages secret names for $ProjectName" "$wrangler pages secret list --project-name $ProjectName" 120))
$results.Add((Invoke-External "Cloudflare Workers list" "$wrangler deployments list" 120))
$results.Add((Invoke-External "Cloudflare KV namespaces" "$wrangler kv namespace list" 120))
$results.Add((Invoke-External "Cloudflare D1 databases" "$wrangler d1 list" 120))
$results.Add((Invoke-External "Cloudflare R2 buckets" "$wrangler r2 bucket list" 120))

# Local package/build information.
$packageJson = "(package.json not found)"
if (Test-Path "package.json") {
  $packageJson = Get-Content "package.json" -Raw
}

$builder = New-Object System.Text.StringBuilder
[void]$builder.AppendLine("# Cloudflare State Report")
[void]$builder.AppendLine("")
[void]$builder.AppendLine("Generated: $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss zzz')")
[void]$builder.AppendLine("")
[void]$builder.AppendLine("Repository root: `$repoRoot`")
[void]$builder.AppendLine("")
[void]$builder.AppendLine("Assumed Cloudflare Pages project name: `$ProjectName`")
[void]$builder.AppendLine("")
[void]$builder.AppendLine("> Safety note: this report should contain configuration names and command output only. Do not commit secret values or customer/member data.")

Add-Section $builder "Local package.json" ("``````json`n$packageJson`n``````")

foreach ($result in $results) {
  Add-CommandResult $builder $result
}

[void]$builder.AppendLine("")
[void]$builder.AppendLine("## Manual notes")
[void]$builder.AppendLine("")
[void]$builder.AppendLine("Add anything Cloudflare shows in the dashboard that Wrangler did not expose, without secret values:")
[void]$builder.AppendLine("")
[void]$builder.AppendLine("- Connected Git repository:")
[void]$builder.AppendLine("- Production branch:")
[void]$builder.AppendLine("- Build command:")
[void]$builder.AppendLine("- Output directory:")
[void]$builder.AppendLine("- Root directory:")
[void]$builder.AppendLine("- Custom domains/routes:")
[void]$builder.AppendLine("- Environment variable names only:")
[void]$builder.AppendLine("- Current deployment issue, if any:")

Set-Content -Path $OutputPath -Value $builder.ToString() -Encoding UTF8
Write-Host ""
Write-Host "Cloudflare state report written to $OutputPath" -ForegroundColor Green
Write-Host "Please review the file before pushing. It should not contain secret values." -ForegroundColor Yellow

if (-not $NoGitPush) {
  $pushAnswer = Read-Host "Create a new Git branch, commit the report, and push it to GitHub? Type Y to continue"
  if ($pushAnswer -match "^[Yy]") {
    $branchName = "cloudflare-state-" + (Get-Date -Format "yyyyMMdd-HHmmss")
    $gitResults = New-Object System.Collections.Generic.List[object]
    $gitResults.Add((Invoke-External "Create report branch" "git checkout -b $branchName" 30))
    $gitResults.Add((Invoke-External "Stage Cloudflare report" "git add $OutputPath" 30))
    $gitResults.Add((Invoke-External "Commit Cloudflare report" "git commit -m ""docs: update cloudflare state report""" 60))
    $gitResults.Add((Invoke-External "Push Cloudflare report branch" "git push -u origin $branchName" 120))

    Write-Host ""
    Write-Host "Git push attempt complete. Branch name: $branchName" -ForegroundColor Green
    Write-Host "Send this branch name to ChatGPT so it can read docs/cloudflare-state.md." -ForegroundColor Cyan
  } else {
    Write-Host "Skipped Git commit/push. You can still review $OutputPath locally." -ForegroundColor Yellow
  }
}
