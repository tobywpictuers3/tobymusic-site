# Cloudflare State Report

Generated: 2026-07-05 14:18:01 +03:00

Repository root: C:/Users/USER/tobymusic-site

Assumed Cloudflare Pages project name: tobymusic-site

> Safety note: this report should contain configuration names and command output only. Do not commit secret values or customer/member data.

## Local package.json

~~~json
{
  "name": "tobymusic-site",
  "private": true,
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "deploy": "npm run build && npx wrangler deploy --keep-vars"
  },
  "dependencies": {
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "react-router-dom": "^6.26.2"
  },
  "devDependencies": {
    "@types/react": "^18.3.3",
    "@types/react-dom": "^18.3.0",
    "@vitejs/plugin-react": "^4.3.1",
    "typescript": "^5.5.3",
    "vite": "^5.4.1"
  }
}

~~~

### Git status

Command:
~~~text
git status --short --branch
~~~

Exit code: 0

Output:
~~~text
## main...origin/main
~~~

### Git remote

Command:
~~~text
git remote -v
~~~

Exit code: 0

Output:
~~~text
origin	https://github.com/tobywpictuers3/tobymusic-site.git (fetch)
origin	https://github.com/tobywpictuers3/tobymusic-site.git (push)
~~~

### Git current commit

Command:
~~~text
git rev-parse HEAD
~~~

Exit code: 0

Output:
~~~text
408ad1ec834ecc137ff41b954a8b0e427a5886e5
~~~

### Node version

Command:
~~~text
node --version
~~~

Exit code: 0

Output:
~~~text
v22.22.3
~~~

### NPM version

Command:
~~~text
npm --version
~~~

Exit code: 0

Output:
~~~text
10.9.8
~~~

### Wrangler version

Command:
~~~text
npx --yes wrangler --version
~~~

Exit code: 0

Output:
~~~text
4.63.0
~~~

### Cloudflare account - wrangler whoami

Command:
~~~text
npx --yes wrangler whoami
~~~

Exit code: 1

Output:
~~~text
Γ¢ו∩╕ן wrangler 4.63.0 (update available 4.107.0)
ΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפא
Getting User settings...


[31mX [41;31m[[41;97mERROR[41;31m][0m [1mFailed to fetch auth token: 400 Bad Request[0m


[31mX [41;31m[[41;97mERROR[41;31m][0m [1mNot logged in.[0m


≡ƒ¬╡  Logs were written to "C:\Users\USER\AppData\Roaming\xdg.config\.wrangler\logs\wrangler-2026-07-05_11-16-38_288.log"
~~~

### Cloudflare login

Command:
~~~text
npx --yes wrangler login
~~~

Exit code: 0

Output:
~~~text
Γ¢ו∩╕ן wrangler 4.63.0 (update available 4.107.0)
ΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפא
Attempting to login via OAuth...
Opening a link in your default browser: https://dash.cloudflare.com/oauth2/auth?response_type=code&client_id=54d11594-84e4-41aa-b438-e81b8fa78ee7&redirect_uri=http%3A%2F%2Flocalhost%3A8976%2Foauth%2Fcallback&scope=account%3Aread%20user%3Aread%20workers%3Awrite%20workers_kv%3Awrite%20workers_routes%3Awrite%20workers_scripts%3Awrite%20workers_tail%3Aread%20d1%3Awrite%20pages%3Awrite%20zone%3Aread%20ssl_certs%3Awrite%20ai%3Awrite%20ai-search%3Awrite%20ai-search%3Arun%20queues%3Awrite%20pipelines%3Awrite%20secrets_store%3Awrite%20containers%3Awrite%20cloudchamber%3Awrite%20connectivity%3Aadmin%20offline_access&state=0erZSRc.0SgPjitFtI9UUnaWMQSawGOK&code_challenge=7rrIjR_nk5AKxxNd_sWSa4OJAQ7xL9TjsWjuKYaznMc&code_challenge_method=S256
Successfully logged in.
~~~

### Cloudflare account after login

Command:
~~~text
npx --yes wrangler whoami
~~~

Exit code: 0

Output:
~~~text
Γ¢ו∩╕ן wrangler 4.63.0 (update available 4.107.0)
ΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפא
Getting User settings...
≡ƒסכ You are logged in with an OAuth Token, associated with the email (redacted).
ΓפלΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפ¼ΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפנ
Γפג Account Name Γפג Account ID                       Γפג
Γפ£ΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפ╝ΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפñ
Γפג (redacted)   Γפג 2985596373aaa9768c23180638a8cafd Γפג
Γפ£ΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפ╝ΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפñ
Γפג (redacted)   Γפג 2336ee76b9502fa388d96f34d3611e6b Γפג
ΓפפΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפ┤ΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפר
≡ƒפף Token Permissions:
Scope (Access)
- account (read)
- user (read)
- workers (write)
- workers_kv (write)
- workers_routes (write)
- workers_scripts (write)
- workers_tail (read)
- d1 (write)
- pages (write)
- zone (read)
- ssl_certs (write)
- ai (write)
- ai-search (write)
- ai-search (run)
- queues (write)
- pipelines (write)
- secrets_store (write)
- containers (write)
- cloudchamber (write)
- connectivity (admin)
- offline_access
~~~

### Cloudflare Pages project list

Command:
~~~text
npx --yes wrangler pages project list
~~~

Exit code: 1

Output:
~~~text
Γ¢ו∩╕ן wrangler 4.63.0 (update available 4.107.0)
ΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפא


[31mX [41;31m[[41;97mERROR[41;31m][0m [1mMore than one account available but unable to select one in non-interactive mode.[0m

  Please set the appropriate `account_id` in your Wrangler configuration file or assign it to the `CLOUDFLARE_ACCOUNT_ID` environment variable.
  Available accounts are (`<name>`: `<account_id>`):
    `(redacted)`: `2985596373aaa9768c23180638a8cafd`
    `(redacted)`: `2336ee76b9502fa388d96f34d3611e6b`


≡ƒ¬╡  Logs were written to "C:\Users\USER\AppData\Roaming\xdg.config\.wrangler\logs\wrangler-2026-07-05_11-17-30_490.log"
~~~

### Cloudflare Pages deployments for tobymusic-site

Command:
~~~text
npx --yes wrangler pages deployment list tobymusic-site
~~~

Exit code: 1

Output:
~~~text
wrangler pages deployment list

List deployments in your Cloudflare Pages project

GLOBAL FLAGS
      --cwd       Run as if Wrangler was started in the specified directory instead of the current working directory  [string]
      --env-file  Path to an .env file to load - can be specified multiple times - values from earlier files are overridden by values in later files  [array]
  -h, --help      Show help  [boolean]
  -v, --version   Show version number  [boolean]

OPTIONS
      --project-name  The name of the project you would like to list deployments for  [string]
      --environment   Environment type to list deployments for  [string] [choices: "production", "preview"]
      --json          Return output as clean JSON  [boolean] [default: false]

[31mX [41;31m[[41;97mERROR[41;31m][0m [1mUnknown argument: tobymusic-site[0m


≡ƒ¬╡  Logs were written to "C:\Users\USER\AppData\Roaming\xdg.config\.wrangler\logs\wrangler-2026-07-05_11-17-35_118.log"
~~~

### Cloudflare Pages production deployments for tobymusic-site

Command:
~~~text
npx --yes wrangler pages deployment list tobymusic-site --environment production
~~~

Exit code: 1

Output:
~~~text
wrangler pages deployment list

List deployments in your Cloudflare Pages project

GLOBAL FLAGS
      --cwd       Run as if Wrangler was started in the specified directory instead of the current working directory  [string]
      --env-file  Path to an .env file to load - can be specified multiple times - values from earlier files are overridden by values in later files  [array]
  -h, --help      Show help  [boolean]
  -v, --version   Show version number  [boolean]

OPTIONS
      --project-name  The name of the project you would like to list deployments for  [string]
      --environment   Environment type to list deployments for  [string] [choices: "production", "preview"]
      --json          Return output as clean JSON  [boolean] [default: false]

[31mX [41;31m[[41;97mERROR[41;31m][0m [1mUnknown argument: tobymusic-site[0m


≡ƒ¬╡  Logs were written to "C:\Users\USER\AppData\Roaming\xdg.config\.wrangler\logs\wrangler-2026-07-05_11-17-37_543.log"
~~~

### Cloudflare Pages secret names for tobymusic-site

Command:
~~~text
npx --yes wrangler pages secret list --project-name tobymusic-site
~~~

Exit code: 1

Output:
~~~text
Γ¢ו∩╕ן wrangler 4.63.0 (update available 4.107.0)
ΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפא


[33mΓצ▓ [43;33m[[43;30mWARNING[43;33m][0m [1mPages now has wrangler.jsonc support.[0m

  We detected a configuration file at C:\Users\USER\tobymusic-site\wrangler.jsonc but it is missing the "pages_build_output_dir" field, required by Pages.
  If you would like to use this configuration file for your project, please use "pages_build_output_dir" to specify the directory of static files to upload.
  Ignoring configuration file for now.


[31mX [41;31m[[41;97mERROR[41;31m][0m [1mMore than one account available but unable to select one in non-interactive mode.[0m

  Please set the appropriate `account_id` in your Wrangler configuration file or assign it to the `CLOUDFLARE_ACCOUNT_ID` environment variable.
  Available accounts are (`<name>`: `<account_id>`):
    `(redacted)`: `2985596373aaa9768c23180638a8cafd`
    `(redacted)`: `2336ee76b9502fa388d96f34d3611e6b`


≡ƒ¬╡  Logs were written to "C:\Users\USER\AppData\Roaming\xdg.config\.wrangler\logs\wrangler-2026-07-05_11-17-40_071.log"
~~~

### Cloudflare Workers list

Command:
~~~text
npx --yes wrangler deployments list
~~~

Exit code: 1

Output:
~~~text
Γ¢ו∩╕ן wrangler 4.63.0 (update available 4.107.0)
ΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפא


[31mX [41;31m[[41;97mERROR[41;31m][0m [1mMore than one account available but unable to select one in non-interactive mode.[0m

  Please set the appropriate `account_id` in your Wrangler configuration file or assign it to the `CLOUDFLARE_ACCOUNT_ID` environment variable.
  Available accounts are (`<name>`: `<account_id>`):
    `(redacted)`: `2985596373aaa9768c23180638a8cafd`
    `(redacted)`: `2336ee76b9502fa388d96f34d3611e6b`


≡ƒ¬╡  Logs were written to "C:\Users\USER\AppData\Roaming\xdg.config\.wrangler\logs\wrangler-2026-07-05_11-17-44_737.log"
~~~

### Cloudflare KV namespaces

Command:
~~~text
npx --yes wrangler kv namespace list
~~~

Exit code: 1

Output:
~~~text
[31mX [41;31m[[41;97mERROR[41;31m][0m [1mMore than one account available but unable to select one in non-interactive mode.[0m

  Please set the appropriate `account_id` in your Wrangler configuration file or assign it to the `CLOUDFLARE_ACCOUNT_ID` environment variable.
  Available accounts are (`<name>`: `<account_id>`):
    `(redacted)`: `2985596373aaa9768c23180638a8cafd`
    `(redacted)`: `2336ee76b9502fa388d96f34d3611e6b`


≡ƒ¬╡  Logs were written to "C:\Users\USER\AppData\Roaming\xdg.config\.wrangler\logs\wrangler-2026-07-05_11-17-49_715.log"
~~~

### Cloudflare D1 databases

Command:
~~~text
npx --yes wrangler d1 list
~~~

Exit code: 1

Output:
~~~text
Γ¢ו∩╕ן wrangler 4.63.0 (update available 4.107.0)
ΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפא


[31mX [41;31m[[41;97mERROR[41;31m][0m [1mMore than one account available but unable to select one in non-interactive mode.[0m

  Please set the appropriate `account_id` in your Wrangler configuration file or assign it to the `CLOUDFLARE_ACCOUNT_ID` environment variable.
  Available accounts are (`<name>`: `<account_id>`):
    `(redacted)`: `2985596373aaa9768c23180638a8cafd`
    `(redacted)`: `2336ee76b9502fa388d96f34d3611e6b`


≡ƒ¬╡  Logs were written to "C:\Users\USER\AppData\Roaming\xdg.config\.wrangler\logs\wrangler-2026-07-05_11-17-54_419.log"
~~~

### Cloudflare R2 buckets

Command:
~~~text
npx --yes wrangler r2 bucket list
~~~

Exit code: 1

Output:
~~~text
Γ¢ו∩╕ן wrangler 4.63.0 (update available 4.107.0)
ΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפא


[31mX [41;31m[[41;97mERROR[41;31m][0m [1mMore than one account available but unable to select one in non-interactive mode.[0m

  Please set the appropriate `account_id` in your Wrangler configuration file or assign it to the `CLOUDFLARE_ACCOUNT_ID` environment variable.
  Available accounts are (`<name>`: `<account_id>`):
    `(redacted)`: `2985596373aaa9768c23180638a8cafd`
    `(redacted)`: `2336ee76b9502fa388d96f34d3611e6b`


≡ƒ¬╡  Logs were written to "C:\Users\USER\AppData\Roaming\xdg.config\.wrangler\logs\wrangler-2026-07-05_11-17-59_056.log"
~~~

## Manual notes

Add anything Cloudflare shows in the dashboard that Wrangler did not expose, without secret values:

- Connected Git repository:
- Production branch:
- Build command:
- Output directory:
- Root directory:
- Custom domains/routes:
- Environment variable names only:
- Current deployment issue, if any:

