# LunaNova Website - Publishing Guide

This repository is already configured for static export and supports these publishing paths:

| Option | Best for | Build command | Publish target |
|---|---|---|---|
| GitHub Pages | Easy CI/CD + free hosting | `npm run build:test` | GitHub Pages |
| GoDaddy Shared Hosting | cPanel hosting (no Node server) | `npm run build:godaddy-static` | `public_html` |
| GoDaddy VPS/Dedicated | Full Node app | `npm run build:godaddy-full` | PM2/Nginx |
| GitHub -> GoDaddy Auto Sync | Manage code in GitHub, host on GoDaddy | `npm run build:godaddy-static` in Actions | FTP deploy to GoDaddy |

---

## 1. Prerequisites

1. Node.js 20+ and npm.
2. A GitHub repository containing this project.
3. GoDaddy hosting account (for GoDaddy options).

Install dependencies locally:

```bash
npm ci
```

---

## 2. Local run and build commands

```bash
# Run locally
npm run dev

# Build for GitHub Pages
npm run build:test

# Build for GoDaddy shared hosting (static export)
npm run build:godaddy-static

# Build for GoDaddy VPS/full Node hosting
npm run build:godaddy-full
```

---

## 3. Publish to GitHub Pages

This repo already includes `.github/workflows/deploy.yml`, which deploys on push to `main`/`master`.

### Steps

1. Push code:
   ```bash
   git add .
   git commit -m "Deploy website"
   git push origin main
   ```
2. In GitHub: **Settings -> Pages -> Build and deployment -> Source: GitHub Actions**.
3. Wait for the workflow to finish.
4. Site URL will be:
   `https://<github-username>.github.io/<repo-name>/`

Notes:
- `next.config.ts` automatically sets `basePath` for GitHub Pages builds.
- `.nojekyll` is already included.

---

## 4. Publish to GoDaddy Shared Hosting (cPanel, static)

### Steps

1. Build static export:
   ```bash
   npm run build:godaddy-static
   ```
2. The publish output is in `out\`.
3. In GoDaddy cPanel File Manager, open `public_html\`.
4. Upload **contents of `out\`** (not the `out` folder itself).
5. Confirm these files exist in `public_html\`:
   - `index.html`
   - `.htaccess`
   - `.nojekyll`
   - `_next\...` assets

---

## 5. Publish to GoDaddy VPS/Dedicated (full Node app)

Use this only if your GoDaddy server supports Node process hosting.

### Steps

1. Build:
   ```bash
   npm run build:godaddy-full
   ```
2. Start with PM2:
   ```bash
   npm install -g pm2
   pm2 start npm --name lunanova -- start
   pm2 save
   pm2 startup
   ```
3. Put Nginx/Apache reverse proxy in front of port `3000`.
4. Add SSL (Let's Encrypt recommended).

---

## 6. Combination: GitHub automatically updates GoDaddy site

This is the "best of both": GitHub remains source of truth, GoDaddy hosts production.

### A) Create GoDaddy FTP credentials

In GoDaddy cPanel, create or use an FTP account with access to your site root (`public_html`).

### B) Add GitHub repository secrets

In GitHub: **Settings -> Secrets and variables -> Actions**, add:

- `GODADDY_FTP_SERVER` (example: `ftp.yourdomain.com`)
- `GODADDY_FTP_USERNAME`
- `GODADDY_FTP_PASSWORD`
- `GODADDY_FTP_SERVER_DIR` (example: `/public_html/`)

### C) Add workflow file

Create `.github/workflows/deploy-godaddy.yml`:

```yaml
name: Deploy to GoDaddy (FTP)

on:
  push:
    branches: [main, master]
  workflow_dispatch:

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: "20"
          cache: "npm"

      - name: Install dependencies
        run: npm ci

      - name: Build static site for GoDaddy
        run: npm run build:godaddy-static

      - name: Deploy via FTP
        uses: SamKirkland/FTP-Deploy-Action@v4.3.5
        with:
          server: ${{ secrets.GODADDY_FTP_SERVER }}
          username: ${{ secrets.GODADDY_FTP_USERNAME }}
          password: ${{ secrets.GODADDY_FTP_PASSWORD }}
          server-dir: ${{ secrets.GODADDY_FTP_SERVER_DIR }}
          local-dir: ./out/
```

Now every push to `main` updates the GoDaddy site automatically.

---

## 7. Use your own domain directly with GitHub Pages

If you want `https://yourdomain.com` served directly from GitHub Pages:

### A) Add custom domain in repo

1. Create `public/CNAME` with one line:
   ```txt
   yourdomain.com
   ```
2. Commit and push.
3. In GitHub: **Settings -> Pages -> Custom domain**, set `yourdomain.com`.
4. Enable **Enforce HTTPS** once DNS is active.

### B) Set DNS records in GoDaddy

For apex domain (`yourdomain.com`), set A records:

- `@ -> 185.199.108.153`
- `@ -> 185.199.109.153`
- `@ -> 185.199.110.153`
- `@ -> 185.199.111.153`

For `www` subdomain:

- `CNAME www -> <github-username>.github.io`

Remove conflicting old A/CNAME records for `@` and `www`.

DNS propagation may take up to 24 hours.

---

## 8. Recommended setup choices

1. **Simplest:** GitHub Pages only + custom domain on GitHub.
2. **If you must stay on GoDaddy shared hosting:** GitHub -> GoDaddy Auto Sync workflow.
3. **Only use VPS mode** when you need server-side runtime features.

---

## 9. Common issues

- **404 on subpages (GitHub Pages):** verify repository name/path and successful Pages action run.
- **Broken CSS/JS on GoDaddy:** ensure you uploaded `out\` contents and kept `_next\` folder.
- **Domain not resolving:** check DNS record conflicts and wait for propagation.
- **Form submissions on static hosting:** configure a service endpoint (for example Formspree) in content settings.
