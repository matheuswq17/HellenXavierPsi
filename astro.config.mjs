import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import { loadEnv } from "vite";

const siteUrl = process.env.PUBLIC_SITE_URL || loadEnv(process.env.NODE_ENV || "production", process.cwd(), "PUBLIC_").PUBLIC_SITE_URL;
if (siteUrl && (!/^https:\/\/[^/]+$/.test(siteUrl))) throw new Error("PUBLIC_SITE_URL deve ser uma origem HTTPS, sem barra final.");
export default defineConfig({
  site: siteUrl || "http://localhost:4321",
  integrations: [...(siteUrl ? [sitemap()] : [])],
  build: { inlineStylesheets: "auto" },
  image: { layout: "constrained", responsiveStyles: true },
});
