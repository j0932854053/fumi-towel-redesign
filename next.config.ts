import type { NextConfig } from "next";

const isPagesBuild = process.env.BUILD_TARGET === "pages";
const pagesBasePath = process.env.PAGES_BASE_PATH ?? "/fumi-towel-redesign";

const nextConfig: NextConfig = {
  ...(isPagesBuild
    ? {
        output: "export" as const,
        basePath: pagesBasePath,
        assetPrefix: pagesBasePath,
        trailingSlash: true,
        images: {
          unoptimized: true,
        },
      }
    : {
        images: {
          unoptimized: true,
        },
      }),
};

export default nextConfig;
