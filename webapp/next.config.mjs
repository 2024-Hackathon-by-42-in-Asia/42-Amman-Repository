/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'api.fh-design.co',
            port: '',
            pathname: '/uploads/**',
          },
        ]
    },
};

export default nextConfig;
