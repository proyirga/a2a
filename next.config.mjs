/** @type {import('next').NextConfig} */

const nextConfig = {
    images: {
        domains: ['res.cloudinary.com', "example.com"],
    },
    experimental: {
        ppr: 'incremental',
      },
};

export default nextConfig;
