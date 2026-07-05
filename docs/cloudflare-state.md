# Cloudflare State Report

Generated: 2026-07-05 14:30:47 +03:00

Repository root: C:/Users/USER/tobymusic-site

Assumed Cloudflare Pages project name: tobymusic-site

Selected Cloudflare account id: 2336ee76b9502fa388d96f34d3611e6b

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

## Local wrangler.jsonc

~~~jsonc
{
  "name": "tobymusic-site",
  "main": "worker/index.ts",
  "compatibility_date": "2026-06-01",
  "assets": {
    "directory": "./dist",
    "binding": "ASSETS",
    "not_found_handling": "single-page-application"
  },
  "routes": [
    { "pattern": "tobymusic.club", "custom_domain": true },
    { "pattern": "www.tobymusic.club", "custom_domain": true }
  ],
  "d1_databases": [
    {
      "binding": "DB",
      "database_name": "toby-mailing-list",
      "database_id": "1d799b4d-7d9c-4b46-b464-6a5aa0a1424d"
    }
  ]
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
1693146c9f1d1c7e300067bba62ec2b319dd9469
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

Exit code: 0

Output:
~~~text
Γ¢ו∩╕ן wrangler 4.63.0 (update available 4.107.0)
ΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפא
ΓפלΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפ¼ΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפ¼ΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפ¼ΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפנ
Γפג Project Name Γפג Project Domains       Γפג Git Provider Γפג Last Modified Γפג
Γפ£ΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפ╝ΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפ╝ΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפ╝ΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפñ
Γפג matzpen-app  Γפג matzpen-app.pages.dev Γפג No           Γפג 1 day ago     Γפג
ΓפפΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפ┤ΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפ┤ΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפ┤ΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפר
~~~

### Cloudflare Pages deployments for tobymusic-site

Command:
~~~text
npx --yes wrangler pages deployment list --project-name tobymusic-site
~~~

Exit code: 1

Output:
~~~text
Γ¢ו∩╕ן wrangler 4.63.0 (update available 4.107.0)
ΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפא


[31mX [41;31m[[41;97mERROR[41;31m][0m [1mA request to the Cloudflare API (/accounts/2336ee76b9502fa388d96f34d3611e6b/pages/projects/tobymusic-site/deployments) failed.[0m

  Project not found. The specified project name does not match any of your existing projects. [code: 8000007]
  
  If you think this is a bug, please open an issue at: [4mhttps://github.com/cloudflare/workers-sdk/issues/new/choose[0m


≡ƒ¬╡  Logs were written to "C:\Users\USER\AppData\Roaming\xdg.config\.wrangler\logs\wrangler-2026-07-05_11-30-17_406.log"
~~~

### Cloudflare Pages production deployments for tobymusic-site

Command:
~~~text
npx --yes wrangler pages deployment list --project-name tobymusic-site --environment production
~~~

Exit code: 1

Output:
~~~text
Γ¢ו∩╕ן wrangler 4.63.0 (update available 4.107.0)
ΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפא


[31mX [41;31m[[41;97mERROR[41;31m][0m [1mA request to the Cloudflare API (/accounts/2336ee76b9502fa388d96f34d3611e6b/pages/projects/tobymusic-site/deployments) failed.[0m

  Project not found. The specified project name does not match any of your existing projects. [code: 8000007]
  
  If you think this is a bug, please open an issue at: [4mhttps://github.com/cloudflare/workers-sdk/issues/new/choose[0m


≡ƒ¬╡  Logs were written to "C:\Users\USER\AppData\Roaming\xdg.config\.wrangler\logs\wrangler-2026-07-05_11-30-22_096.log"
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


[31mX [41;31m[[41;97mERROR[41;31m][0m [1mProject "tobymusic-site" does not exist.[0m


≡ƒ¬╡  Logs were written to "C:\Users\USER\AppData\Roaming\xdg.config\.wrangler\logs\wrangler-2026-07-05_11-30-26_533.log"
~~~

### Cloudflare Worker deployments for configured Worker

Command:
~~~text
npx --yes wrangler deployments list
~~~

Exit code: 0

Output:
~~~text
Γ¢ו∩╕ן wrangler 4.63.0 (update available 4.107.0)
ΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפא
Created:     2026-07-05T08:33:14.246Z
Author:      w0504124161@gmail.com
Source:      Unknown (deployment)
Message:     -
Version(s):  (100%) d743e02f-dd81-4084-9c60-15434a19d764
                 Created:  2026-07-05T08:33:13.851Z
                     Tag:  -
                 Message:  -

Created:     2026-07-05T08:33:57.249Z
Author:      w0504124161@gmail.com
Source:      Unknown (deployment)
Message:     -
Version(s):  (100%) 5e554f4b-91d7-4b87-bb50-a4b067744a2c
                 Created:  2026-07-05T08:33:56.959Z
                     Tag:  -
                 Message:  -

Created:     2026-07-05T08:49:39.473Z
Author:      w0504124161@gmail.com
Source:      Secret Change
Message:     -
Version(s):  (100%) c6225d50-25df-40b1-af76-16513f517859
                 Created:  2026-07-05T08:49:39.473Z
                     Tag:  -
                 Message:  -

Created:     2026-07-05T08:49:47.899Z
Author:      w0504124161@gmail.com
Source:      Unknown (deployment)
Message:     -
Version(s):  (100%) 298421e2-2474-443c-aa10-02b83335e43a
                 Created:  2026-07-05T08:49:47.536Z
                     Tag:  -
                 Message:  -

Created:     2026-07-05T08:51:26.123Z
Author:      w0504124161@gmail.com
Source:      Unknown (deployment)
Message:     -
Version(s):  (100%) 6f73f638-c427-4495-bb7d-009c537be83c
                 Created:  2026-07-05T08:51:25.801Z
                     Tag:  -
                 Message:  -

Created:     2026-07-05T08:51:30.832Z
Author:      w0504124161@gmail.com
Source:      Unknown (deployment)
Message:     -
Version(s):  (100%) 68e2746b-e23c-47c7-b38c-08986ca5a82b
                 Created:  2026-07-05T08:51:30.444Z
                     Tag:  -
                 Message:  -

Created:     2026-07-05T08:57:09.851Z
Author:      w0504124161@gmail.com
Source:      Unknown (deployment)
Message:     -
Version(s):  (100%) 74e6748c-f2a9-41f1-9f5f-2b1e3f7f1485
                 Created:  2026-07-05T08:57:09.466Z
                     Tag:  -
                 Message:  -

Created:     2026-07-05T11:00:52.387Z
Author:      w0504124161@gmail.com
Source:      Unknown (deployment)
Message:     -
Version(s):  (100%) 9129acae-7fee-4b38-8cca-06ab85cf7196
                 Created:  2026-07-05T11:00:52.041Z
                     Tag:  -
                 Message:  -

Created:     2026-07-05T11:15:55.395Z
Author:      w0504124161@gmail.com
Source:      Unknown (deployment)
Message:     -
Version(s):  (100%) 0a4a2e21-8f64-49e2-adbd-a5c3f9df43ed
                 Created:  2026-07-05T11:15:55.014Z
                     Tag:  -
                 Message:  -

Created:     2026-07-05T11:22:34.265Z
Author:      w0504124161@gmail.com
Source:      Unknown (deployment)
Message:     -
Version(s):  (100%) e5e937f8-892d-4614-9516-48923110edfa
                 Created:  2026-07-05T11:22:33.886Z
                     Tag:  -
                 Message:  -
~~~

### Cloudflare KV namespaces

Command:
~~~text
npx --yes wrangler kv namespace list
~~~

Exit code: 0

Output:
~~~text
[
  {
    "id": "655f775445324c128650ec4a7f81ec29",
    "title": "concerts-access-kv",
    "supports_url_encoding": true
  }
]
~~~

### Cloudflare D1 databases

Command:
~~~text
npx --yes wrangler d1 list
~~~

Exit code: 0

Output:
~~~text
Γ¢ו∩╕ן wrangler 4.63.0 (update available 4.107.0)
ΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפא
ΓפלΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפ¼ΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפ¼ΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפ¼ΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפ¼ΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפ¼ΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפ¼ΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפנ
Γפג uuid                                 Γפג name                 Γפג created_at               Γפג version    Γפג num_tables Γפג file_size Γפג jurisdiction Γפג
Γפ£ΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפ╝ΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפ╝ΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפ╝ΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפ╝ΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפ╝ΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפ╝ΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפñ
Γפג 1d799b4d-7d9c-4b46-b464-6a5aa0a1424d Γפג toby-mailing-list-db Γפג 2026-03-19T21:53:58.398Z Γפג production Γפג 0          Γפג 1028096   Γפג              Γפג
ΓפפΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפ┤ΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפ┤ΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפ┤ΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפ┤ΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפ┤ΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפ┤ΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפאΓפר
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
Listing buckets...


[31mX [41;31m[[41;97mERROR[41;31m][0m [1mA request to the Cloudflare API (/accounts/2336ee76b9502fa388d96f34d3611e6b/r2/buckets) failed.[0m

  Please enable R2 through the Cloudflare Dashboard. [code: 10042]
  
  If you think this is a bug, please open an issue at: [4mhttps://github.com/cloudflare/workers-sdk/issues/new/choose[0m


≡ƒ¬╡  Logs were written to "C:\Users\USER\AppData\Roaming\xdg.config\.wrangler\logs\wrangler-2026-07-05_11-30-45_501.log"
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

