export const prerender = true;
export function GET() {
  const origin = import.meta.env.PUBLIC_SITE_URL;
  return new Response(origin ? `User-agent: *\nAllow: /\nSitemap: ${origin}/sitemap-index.xml\n` : "User-agent: *\nDisallow: /\n", {headers: {"Content-Type": "text/plain; charset=utf-8"}});
}
