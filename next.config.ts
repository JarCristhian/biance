import type { NextConfig } from "next";
import withPWA from "next-pwa";


const nextConfig: NextConfig = {
  reactStrictMode: true,
  turbopack: {},
  async redirects() {
    return [
      {
        source: "/",
        has: [{ type: "cookie", key: "auth", value: "false" }],
        destination: "/login",
        permanent: false,
      },
    ];
  },
};

export default withPWA({
  dest: "public",
  register: true,
  skipWaiting: true,
})(nextConfig);
