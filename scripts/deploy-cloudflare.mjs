import { spawnSync } from 'node:child_process';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { resolve } from 'node:path';

export async function deploy({ env = process.env, request = fetch, run = spawnSync } = {}) {
  const account = env.CLOUDFLARE_ACCOUNT_ID;
  const token = env.CLOUDFLARE_API_TOKEN;
  if (!account || !token) throw new Error('Cadastre CLOUDFLARE_ACCOUNT_ID e CLOUDFLARE_API_TOKEN nos segredos do repositório no GitHub.');
  if (!/^[a-f0-9]{32}$/i.test(account)) throw new Error('CLOUDFLARE_ACCOUNT_ID inválido. Use o Account ID, não o Zone ID.');
  const project = 'hellen-xavier';
  const response = await request(`https://api.cloudflare.com/client/v4/accounts/${account}/pages/projects/${project}`, {
    headers: { Authorization: `Bearer ${token}` }, signal: AbortSignal.timeout(30000),
  });
  if (!response.ok) throw new Error(`Não foi possível consultar o Pages (HTTP ${response.status}). Confira conta e permissão Cloudflare Pages: Edit do token.`);
  const data = await response.json();
  const branch = data.result?.production_branch;
  if (!data.success || typeof branch !== 'string' || !branch.trim()) throw new Error('A Cloudflare não informou a branch de produção. Publicação interrompida.');
  const cli = fileURLToPath(new URL('../node_modules/wrangler/bin/wrangler.js', import.meta.url));
  const result = run(process.execPath, [cli, 'pages', 'deploy', 'dist', '--project-name', project, '--branch', branch], {
    env: { ...env, WRANGLER_SEND_METRICS: 'false' }, stdio: 'inherit', shell: false,
  });
  if (result.error || result.status !== 0) throw new Error('A publicação falhou. Consulte a etapa do Wrangler acima.');
}
if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  deploy().catch(error => { console.error(error.message); process.exitCode = 1; });
}
