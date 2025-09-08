/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone', // Optimizes for Docker deployments
  images: {
    domains: ['localhost'],
    unoptimized: false, // Enable image optimization
  },
  experimental: {
    // Enable if you want server components
    serverComponentsExternalPackages: [],
  },
  // Environment variable validation
  env: {
    CUSTOM_KEY: process.env.CUSTOM_KEY,
  },
  // Security headers
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
        ],
      },
    ];
  },
}

module.exports = nextConfig
