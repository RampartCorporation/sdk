/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // Your existing ESLint config...
    ignoreDuringBuilds: true, // This will ignore all ESLint errors during build
  },
};

module.exports = nextConfig; 