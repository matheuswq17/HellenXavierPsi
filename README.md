# Hellen Xavier — Psicologia

Site estático em Astro, TypeScript e GSAP. Cloudflare Pages: hellen-xavier. Domínio: https://hellenxavier.com.br.

## Desenvolvimento
Node.js 22.12 ou superior. Nesta pasta, execute `npm ci` e `npm run dev`. Abra http://localhost:4321. Sem PUBLIC_SITE_URL, a versão de teste mantém noindex.

## Publicação automática
O workflow instala as dependências fixadas, testa o script de publicação e executa `build:publicacao` com o domínio oficial. Pull requests apenas validam. Pushes na main publicam no Pages existente após a validação.

Para ativar, em GitHub → Settings → Secrets and variables → Actions, adicione dois Repository secrets:
- CLOUDFLARE_ACCOUNT_ID: Account ID da conta onde está o projeto (não é Zone ID).
- CLOUDFLARE_API_TOKEN: token com Account → Cloudflare Pages → Edit, limitado à conta deste projeto.

Não coloque tokens em arquivos ou mensagens. Depois de cadastrar os segredos, abra Actions → Validar e publicar site → Run workflow, na main. O script consulta a branch de produção do Pages antes do envio, mantendo seu endereço e domínios personalizados.

Salvar um arquivo no computador não publica sozinho: as alterações precisam ser revisadas, commitadas e enviadas ao GitHub. A partir do push na main, o processo é automático. O domínio próprio depende da ativação do DNS e da associação em Custom domains.

## Arquivos principais
- Textos e contatos: src/site.config.ts
- Páginas: src/pages/
- Componentes: src/components/
- Estilos: src/styles/global.css
- Fotos: src/assets/
- Vídeos: public/video/
- Confirmações profissionais pendentes: PENDENCIAS.md

O repositório contém o projeto da pasta site. Backups, auditorias locais, ZIPs, dependências instaladas e arquivos de ambiente privados não fazem parte dele.
