import type { NextConfig } from "next";
import path from "path";

const pdfjsV3Root = path.join(__dirname, "node_modules/pdfjs-dist-v3");
const pdfjsV4Root = path.join(__dirname, "node_modules/pdfjs-dist");

/** Route pdfjs-dist imports from @react-pdf-viewer to the v3 alias package. */
function pdfjsViewerAlias(
  config: { plugins?: unknown[] },
  webpack: { NormalModuleReplacementPlugin: new (a: RegExp, b: (r: { context: string; request: string }) => void) => unknown }
) {
  const replacePdfjs = (resource: { context: string; request: string }) => {
    if (!resource.context.includes("@react-pdf-viewer")) return;
    resource.request = resource.request.replace(/^pdfjs-dist/, pdfjsV3Root);
  };

  config.plugins ??= [];
  config.plugins.push(
    new webpack.NormalModuleReplacementPlugin(/^pdfjs-dist$/, replacePdfjs),
    new webpack.NormalModuleReplacementPlugin(/^pdfjs-dist\//, replacePdfjs)
  );
}

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  turbopack: {
    resolveAlias: {
      canvas: "./src/lib/empty-module.ts",
    },
  },
  webpack: (config, { webpack }) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      canvas: false,
      // Ensure react-pdf always resolves the hoisted v4 pdfjs-dist (avoids dev ENOENT lookups)
      "pdfjs-dist": pdfjsV4Root,
    };
    pdfjsViewerAlias(config, webpack);
    return config;
  },
};

export default nextConfig;
