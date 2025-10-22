import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "image.tmdb.org",
        pathname: "/t/p/**", // Allows all paths under /t/p/ (e.g., /t/p/w500/, /t/p/original/)
      },
    ],
  },
};

export default nextConfig;
