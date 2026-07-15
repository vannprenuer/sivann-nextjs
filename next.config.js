/** @type {import('next').NextConfig} */
const nextConfig = {
  // Uncomment the line below ONLY if deploying directly to Bluehost shared
  // hosting as static files (see Complete-Nextjs-Deployment-Guide.md).
  // Leave it commented out if deploying to Vercel/Netlify instead, which
  // support full Next.js features without needing a static export.
  // output: 'export',
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'sivann.com' },
    ],
  },
};
module.exports = nextConfig;
