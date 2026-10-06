import { loadEnv } from 'vite';
import { execSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
const env = { ...loadEnv('production', process.cwd(), ''), ...process.env };
const value = env.PUBLIC_SITE_URL?.trim();
const fail = (message) => { console.error(`Publicação bloqueada: ${message}`); process.exit(1); };
if (!value) fail('defina PUBLIC_SITE_URL com o domínio registrado. O build comum continua disponível para testes.');
let url;
try { url = new URL(value); } catch { fail('domínio inválido.'); }
if (url.protocol !== 'https:' || url.origin !== value || url.hostname === 'localhost' || !url.hostname.includes('.') || /(?:\.example|\.test|\.invalid|\.localhost)$/.test(url.hostname) || /^[\d.]+$/.test(url.hostname) || url.hostname.includes(':')) fail('use um domínio público HTTPS, sem caminho, porta ou barra final.');
if (url.port) fail('o domínio público não deve incluir uma porta.');
execSync('npm run build', { env, stdio: 'inherit' });
for (const page of ['index.html','psicoterapia-tcc/index.html','avaliacao-neuropsicologica/index.html','privacidade/index.html','sobre-este-site/index.html']) {
  const html = readFileSync(`dist/${page}`, 'utf8');
  if (/name="robots"[^>]*noindex/.test(html)) fail(`${page} continua com noindex.`);
  if (!html.includes(`rel="canonical" href="${value}/`)) fail(`canonical inválido em ${page}.`);
  if (!html.includes('application/ld+json')) fail(`dados estruturados ausentes em ${page}.`);
  if (html.includes('http://localhost:4321')) fail(`endereço local encontrado em ${page}.`);
}
const robots = readFileSync('dist/robots.txt','utf8');
if (robots.includes('Disallow: /') || !robots.includes(`${value}/sitemap-index.xml`)) fail('robots ou sitemap incorreto.');
const sitemap = readFileSync('dist/sitemap-0.xml','utf8');
if (!sitemap.includes(`${value}/psicoterapia-tcc/`) || !sitemap.includes(`${value}/sobre-este-site/`)) fail('rotas incorretas no sitemap.');
if (!readFileSync('dist/404.html','utf8').includes('noindex')) fail('a página 404 deve manter noindex.');
console.log('Build público validado. Isso não registra o domínio, publica o site ou verifica DNS, HTTPS, credenciais e privacidade da hospedagem.');
