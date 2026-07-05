# Cloudflare ↔ GitHub Bridge

This bridge gives ChatGPT/Codex a readable, non-secret snapshot of the Cloudflare setup by writing a generated report into this repository.

## Why this exists

ChatGPT can work directly with this GitHub repository, but it does not have a direct Cloudflare dashboard connector in this chat. Cloudflare remains the source of truth for deployment settings, routes, environment variables, Workers, Pages, KV, D1, and logs.

The bridge turns Cloudflare state into a GitHub file that ChatGPT can read:

```text
Cloudflare → PowerShell script → docs/cloudflare-state.md → GitHub → ChatGPT/Codex
```

## What the script collects

The script tries to collect non-secret information:

- local Git branch, remote URL, and commit
- package metadata and npm scripts
- Wrangler version and logged-in Cloudflare account
- Cloudflare Pages project list
- deployment list for the selected Pages project
- secret/variable names when Wrangler exposes them without values
- Workers/KV/D1/R2 summary commands when available

## What must never be committed

Do not paste or commit:

- API tokens
- secret values
- JWT/session secrets
- Brevo keys
- Airtable tokens
- Cloudflare tokens
- private customer/member data

Variable names are fine. Variable values are not.

## Typical usage

Run from the repository root:

```powershell
powershell -ExecutionPolicy Bypass -File .\tools\sync-cloudflare-state.ps1
```

If the Cloudflare Pages project name differs from `tobymusic-site`, pass it explicitly:

```powershell
powershell -ExecutionPolicy Bypass -File .\tools\sync-cloudflare-state.ps1 -ProjectName "YOUR_CLOUDFLARE_PROJECT_NAME"
```

At the end, the script can optionally create a new Git branch, commit `docs/cloudflare-state.md`, and push it so ChatGPT can read the updated report.

## Recommended workflow

1. Run the script.
2. Allow it to create/push a report branch when prompted.
3. Tell ChatGPT the branch name printed by the script.
4. ChatGPT reads `docs/cloudflare-state.md` from that branch and uses it for deployment/integration work.
