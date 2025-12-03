import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: "/dashboard",
        has: [{ type: "cookie", key: "auth", value: "false" }],
        destination: "/login",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
