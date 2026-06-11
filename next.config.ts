import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  // Site is served from the domain root via CNAME (vanshvisariya.is-a.dev),
  // so no basePath/assetPrefix is needed. If the custom domain is removed,
  // uncomment the following for https://<user>.github.io/<repo>/ hosting:
  // basePath: process.env.GITHUB_PAGES === "true" ? "/portfolio" : "",
  // assetPrefix: process.env.GITHUB_PAGES === "true" ? "/portfolio/" : "",
};

export default nextConfig;
