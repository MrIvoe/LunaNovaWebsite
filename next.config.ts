import type { NextConfig } from "next";

const deployTarget = process.env.DEPLOY_TARGET ?? (process.env.GITHUB_PAGES === 'true' ? 'github-pages' : 'godaddy-full');
const isGitHubPages = deployTarget === 'github-pages';
const isStaticTarget = deployTarget === 'github-pages' || deployTarget === 'godaddy-static';
const repositoryName = process.env.GITHUB_REPOSITORY?.split('/')[1] ?? 'lunanova-website';
const basePath = isGitHubPages ? `/${repositoryName}` : '';

const nextConfig: NextConfig = {
  output: isStaticTarget ? 'export' : undefined,
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  basePath,
  assetPrefix: basePath,
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
};

export default nextConfig;