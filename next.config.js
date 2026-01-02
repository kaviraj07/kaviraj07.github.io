/**
 * @type {import('next').NextConfig}
 */
const isProd = process.env.NODE_ENV === 'production'

// If you are deploying as a Project Page (https://username.github.io/<repo>/),
// Next must be aware of the repo subpath.
// GitHub Actions provides GITHUB_REPOSITORY="owner/repo"
const repoName = process.env.GITHUB_REPOSITORY?.split('/')[1] || ''
// User/Org pages live at the root (repo named <username>.github.io)
const isUserOrOrgPages = repoName.endsWith('.github.io')
const basePath = isProd && repoName && !isUserOrOrgPages ? `/${repoName}` : ''

const nextConfig = {
  output: 'export',
  trailingSlash: true,
  basePath,
  assetPrefix: basePath ? `${basePath}/` : undefined,

  // GitHub Pages doesn't support Next's default image optimizer (it needs a server).
  images: { unoptimized: true },
}

module.exports = nextConfig
