# Pendências — atualizado em 30/09/2026 (tarde)

## Confirmado pela profissional (via Adolfo)
- Endereço: Av. Nova Cantareira, 2014 — Edifício Cantareira Tower. Estacionamento no local.
- CEP 02330-003 confirmado.
- Referências: ~950 m do Metrô Tucuruvi e do Shopping Tucuruvi; 200 m do Shopping TriMais.
- Atende adolescentes (a partir de 12 anos) e adultos, incluindo dependência química. **Não atende casais** (resposta de 30/09).
- Formação: Psicologia UnG 1998; Dependência Química Unifesp 2011; Neuropsicologia IPAF 2015; Psicopatologia e Saúde Mental CEPS 2019; TCC CETCC 2020. Atua na área desde 2010.
- Avaliação neuropsicológica: em média 6 sessões, podendo ser mais.
- Palestras: manter os temas que estão no site.
- Valor da sessão não é informado no site. Emite nota fiscal para reembolso.
- Sessões de 60 minutos, em geral semanais.
- Responde mensagens em até 1 dia útil.
- Horário: segunda a quinta, das 14h às 21h (reunião de 05/10) (também no JSON-LD como openingHoursSpecification).
- Deploy automático funcionando: cada push na main publica no Cloudflare Pages.
- CNPJ da Insight Psicologia Ltda.: 60.101.913/0001-26 (exibido só no rodapé e na política de privacidade).
- Particular, sem convênio. WhatsApp (11) 98015-7199, Instagram @hellen.xavierpsi, e-mail xavier.hellen@gmail.com.

## Ainda confirmar com a Hellen
- [ ] **Título "Neuropsicóloga":** confirmar se ela tem o título de especialista em Neuropsicologia registrado no CFP. Se não tiver, trocar em todo o site por **"Psicóloga · Especialização em Neuropsicologia"** (hero, `site.titulo`, rodapé, JSON-LD e vídeos). Não mudar antes da confirmação.
- [ ] **Conjunto 15** continua valendo no número 2014? (o CEP 02330-003 já foi confirmado).
- [ ] Validar a redação de "O que você pode esperar de mim" (`sobre.compromissos`), da seção de dependência química (card, FAQ e página de psicoterapia) e das seções novas da página de avaliação (TDAH, TEA, laudo).

## Para você (Adolfo) fazer fora do código
- [ ] **Medição:** preencher `PUBLIC_GOOGLE_TAG_ID` e `PUBLIC_GADS_CONVERSION_WHATSAPP` como **Variables** do repositório no GitHub (Settings → Secrets and variables → Actions → Variables); o build roda no GitHub Actions. Sem elas, a tag do Google não carrega (nem o banner de cookies, que só aparece com a tag ativa).
- [x] **Botão "Quero um site assim":** número 5511939011304 confirmado.
- [ ] **PageSpeed:** medir em pagespeed.web.dev (celular e computador) e preencher as notas em `src/pages/sobre-este-site.astro`.
- [ ] Criar o **Perfil da Empresa no Google** (categoria "Psicólogo") com nome, endereço e telefone **idênticos** ao site; adicionar fotos do consultório, horários e o link do site.
- [ ] Cadastrar **Google Search Console** e **Bing Webmaster Tools**, enviar `https://hellenxavier.com.br/sitemap-index.xml` e pedir indexação da home e das duas páginas de serviço.
- [ ] Atualizar endereço e horário no Instagram e colocar o link do site na bio.
- [ ] Cloudflare: ativar **Always Use HTTPS**. Os cabeçalhos de segurança (HSTS etc.) já vão no arquivo `public/_headers`.
- [ ] Cloudflare → "robots.txt gerenciado": hoje bloqueia robôs de IA (ChatGPT, Claude, Google-Extended). Decidir com a Hellen se quer aparecer em respostas de IA.
- [ ] Depois de 2–4 semanas, conferir Core Web Vitals reais no Search Console.
