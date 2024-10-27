/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "images.unsplash.com"
      }
    ]
  },
  sassOptions: {},
};

export default nextConfig;
