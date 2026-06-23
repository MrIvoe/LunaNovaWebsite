# LunaNova Website - Deployment Guide

This guide covers deploying the LunaNova website to **GitHub Pages** (static hosting) and **GoDaddy** (shared hosting or VPS).

---

## 📋 Prerequisites

- Node.js 18+ and npm
- Git repository (GitHub recommended)
- GoDaddy hosting account (if deploying to GoDaddy)

---

## 🚀 Option 1: Deploy to GitHub Pages (Recommended for Static Sites)

### Automatic Deployment (GitHub Actions)

The repository includes a GitHub Actions workflow (`.github/workflows/deploy.yml`) that automatically builds and deploys on every push to `main`/`master`.

**Setup Steps:**

1. **Push to GitHub:**
   ```bash
   git add .
   git commit -m "Configure for GitHub Pages deployment"
   git push origin main
   ```

2. **Enable GitHub Pages:**
   - Go to your repository on GitHub
   - Settings → Pages
   - Source: "GitHub Actions"
   - The workflow will run automatically on push

3. **Configure Repository Name:**
   - If your repo is named `lunanova-website`, the site will be at `https://yourusername.github.io/lunanova-website/`
   - The `basePath` is automatically set to `/lunanova-website` in the workflow
   - To change the base path, edit `.github/workflows/deploy.yml` and `next.config.ts`

4. **Custom Domain (Optional):**
   - Add a `CNAME` file to `public/` with your domain
   - Configure DNS: CNAME record pointing to `yourusername.github.io`
   - Enable "Enforce HTTPS" in GitHub Pages settings

### Manual Deployment to GitHub Pages

```bash
# Build for GitHub Pages test site
npm run build:test

# Deploy the ./out folder to gh-pages branch
npx gh-pages -d out
```

---

## 🌐 Option 2: Deploy to GoDaddy

### Option 2A: Static Export to GoDaddy Shared Hosting (cPanel/Apache)

This is the **simplest and most reliable** option for GoDaddy shared hosting.

**Steps:**

1. **Build the static export:**
   ```bash
   npm run build:godaddy-static
   ```
   This creates an `out/` folder with static HTML/CSS/JS files.

2. **Upload to GoDaddy:**
   - Log into GoDaddy cPanel
   - Open **File Manager**
   - Navigate to `public_html/` (or your domain's document root)
   - Upload **all contents** of the `out/` folder (not the folder itself)
   - Ensure `.nojekyll` file is uploaded (prevents Jekyll processing)

3. **Configure .htaccess (Important!):**
   Create or update `.htaccess` in `public_html/`:
   ```apache
   # Enable clean URLs for Next.js static export
   RewriteEngine On
   RewriteBase /
   
   # Handle trailing slashes (Next.js export uses trailingSlash: true)
   RewriteCond %{REQUEST_FILENAME} !-f
   RewriteCond %{REQUEST_FILENAME} !-d
   RewriteRule ^(.*)$ /$1/ [L,R=301]
   
   # Serve index.html for directory requests
   DirectoryIndex index.html
   
   # Cache static assets
   <IfModule mod_expires.c>
     ExpiresActive On
     ExpiresByType text/html "access plus 0 seconds"
     ExpiresByType text/css "access plus 1 year"
     ExpiresByType application/javascript "access plus 1 year"
     ExpiresByType image/* "access plus 1 year"
   </IfModule>
   
   # Compression
   <IfModule mod_deflate.c>
     AddOutputFilterByType DEFLATE text/html text/css application/javascript
   </IfModule>
   ```

4. **Test:**
   - Visit your domain
   - All pages should work with clean URLs (e.g., `/services/`, `/about/`)

**Note:** The contact form will fall back to `mailto:` links since there's no backend. To enable form submissions, configure `formEndpoint` in `content/pages/contact-details.json` with a Formspree endpoint.

---

### Option 2B: Full Next.js App on GoDaddy VPS (Node.js Hosting)

If you have a GoDaddy VPS or dedicated server with Node.js support:

1. **Build the production app:**
   ```bash
   # Remove static export config temporarily
   # Edit next.config.ts: comment out output: 'export'
   npm run build
   ```

2. **Set up PM2 process manager:**
   ```bash
   npm install -g pm2
   pm2 start npm --name "lunanova" -- start
   pm2 startup
   pm2 save
   ```

3. **Configure Nginx Reverse Proxy:**
   ```nginx
   server {
       listen 80;
       server_name yourdomain.com www.yourdomain.com;
       
       location / {
           proxy_pass http://localhost:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

4. **SSL with Let's Encrypt:**
   ```bash
   sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com
   ```

---

## ⚙️ Configuration for Different Hosts

### Environment Variables

Create `.env.local` from `.env.example`:

| Variable | GitHub Pages | GoDaddy Static | GoDaddy VPS |
|----------|--------------|----------------|-------------|
| `DEPLOY_TARGET` | `github-pages` | `godaddy-static` | `godaddy-full` |
| `NEXT_PUBLIC_BASE_PATH` | `/repo-name` | `""` | `""` |
| `NEXT_PUBLIC_FORMSPREE_ENDPOINT` | Your endpoint | Your endpoint | Your endpoint |
| `NEXT_PUBLIC_ADMIN_PASSWORD` | Secure password | Secure password | Secure password |

### Contact Form Setup

For static hosting (GitHub Pages, GoDaddy shared), the contact form needs a backend service:

1. **Formspree (Recommended):**
   - Sign up at https://formspree.io
   - Create a form, get endpoint URL
   - Add to `content/pages/contact-details.json`: `"formEndpoint": "https://formspree.io/f/xxx"`
   - Or set `NEXT_PUBLIC_FORMSPREE_ENDPOINT` env var

2. **Netlify Forms:**
   - Add `data-netlify="true"` to form (requires Netlify hosting)

3. **EmailJS:**
   - Client-side only, no backend needed

---

## 📁 Project Structure for Deployment

```
lunanova-website/
├── .github/workflows/deploy.yml  # GitHub Actions auto-deploy
├── public/
│   ├── .nojekyll                 # Required for GitHub Pages
│   └── content/                  # JSON files copied here at build
├── content/                      # Source JSON files (edit these!)
├── scripts/copy-content.js       # Copies content/ → public/content/
├── out/                          # Generated by npm run build (static export)
├── next.config.ts                # Configures basePath, export, etc.
└── package.json                  # Build scripts
```

---

## 🔧 Key Configuration Files

### `next.config.ts`
```typescript
const deployTarget = process.env.DEPLOY_TARGET ?? 'godaddy-full';
const isGitHubPages = deployTarget === 'github-pages';
const isStaticTarget = deployTarget === 'github-pages' || deployTarget === 'godaddy-static';
const basePath = isGitHubPages ? '/your-repo-name' : '';

export default {
  output: isStaticTarget ? 'export' : undefined,
  trailingSlash: true,
  images: { unoptimized: true },
  basePath,
  assetPrefix: basePath,
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
};
```

### `package.json` Scripts
```json
{
  "scripts": {
    "dev": "next dev",
    "build:test": "npm run copy-content && set DEPLOY_TARGET=github-pages&& next build",
    "build:godaddy-static": "npm run copy-content && set DEPLOY_TARGET=godaddy-static&& next build",
    "build:godaddy-full": "npm run copy-content && set DEPLOY_TARGET=godaddy-full&& next build",
    "copy-content": "node scripts/copy-content.js",
    "start": "next start"
  }
}
```

---

## 🐛 Troubleshooting

### GitHub Pages: 404 on Refresh / Subpages
- Ensure `trailingSlash: true` in `next.config.ts`
- Check `.nojekyll` is in `public/`
- Verify `basePath` matches repository name

### GoDaddy: Styles Not Loading / 404 on Assets
- Check `.htaccess` is in `public_html/`
- Verify `assetPrefix` and `basePath` are empty for root domain
- Clear browser cache

### Contact Form Not Working
- Check browser console for errors
- Verify `formEndpoint` in `content/pages/contact-details.json`
- For Formspree: confirm email verification

### Content Not Updating
- Edit files in `content/` folder
- Rebuild: `npm run build`
- Re-deploy

---

## 📞 Support

For issues with this deployment guide, check:
1. GitHub Actions logs (for GitHub Pages)
2. GoDaddy cPanel error logs
3. Browser developer console (F12)

---

*Last updated: 2026*