import type { NextConfig } from "next";
import createMDX from "@next/mdx";
import { withWorkflow } from "workflow/next";

const nextConfig: NextConfig = {
  // Docs pages are MDX files in src/content/docs, imported by src/app/docs.
  pageExtensions: ["ts", "tsx", "js", "jsx", "md", "mdx"],
};

// Turbopack needs remark/rehype plugins by package name, not as functions.
const withMDX = createMDX({
  options: {
    remarkPlugins: ["remark-gfm"],
    rehypePlugins: ["rehype-slug"],
  },
});

export default withWorkflow(withMDX(nextConfig));
