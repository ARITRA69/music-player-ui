/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cms.samespace.com",
        port: "",
        pathname: "/assets/**",
      },
    ],
  },
};

export default nextConfig;
