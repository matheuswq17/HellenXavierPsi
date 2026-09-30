# Pendências — atualizado em 30/09/2026 (tarde)

## Confirmado pela profissional (via Adolfo)
- Endereço: Av. Nova Cantareira, 2014 — Edifício Cantareira Tower. Estacionamento no local.
- Referências: ~950 m do Metrô Tucuruvi e do Shopping Tucuruvi; 200 m do Shopping TriMais.
- Atende adolescentes (a partir de 12 anos) e adultos, incluindo dependência química. **Não atende casais** (resposta de 30/09).
- Formação: Psicologia UnG 1998; Dependência Química Unifesp 2011; Neuropsicologia IPAF 2015; Psicopatologia e Saúde Mental CEPS 2019; TCC CETCC 2020. Atua na área desde 2010.
- Avaliação neuropsicológica: em média 6 sessões, podendo ser mais.
- Palestras: manter os temas que estão no site.
- Valor da sessão não é informado no site. Emite nota fiscal para reembolso.
- Sessões de 60 minutos, em geral semanais.
- Responde mensagens em até 1 dia útil.
- CNPJ da Insight Psicologia Ltda.: 60.101.913/0001-26 (exibido só no rodapé e na política de privacidade).
- Particular, sem convênio. WhatsApp (11) 98015-7199, Instagram @hellen.xavierpsi, e-mail xavier.hellen@gmail.com.

## Ainda confirmar com a Hellen
- [ ] **Conjunto 15 e CEP 02330-003** continuam valendo no número 2014? (vieram da informação anterior, do número 2026).
- [ ] **Horário de início** do atendimento (o site diz "segunda a quinta, até 21h"). Com o início, dá para colocar `openingHoursSpecification` no JSON-LD.
- [ ] Validar a redação de "O que você pode esperar de mim" (`sobre.compromissos`), da seção de dependência química (card, FAQ e página de psicoterapia) e das seções novas da página de avaliação (TDAH, TEA, laudo).

## Para você (Adolfo) fazer fora do código
- [ ] **Deploy automático está falhando**: cadastrar os segredos `CLOUDFLARE_ACCOUNT_ID` e `CLOUDFLARE_API_TOKEN` (permissão Cloudflare Pages: Edit) em GitHub → Settings → Secrets and variables → Actions. Sem isso, nenhum push atualiza o site.
- [ ] Criar o **Perfil da Empresa no Google** (categoria "Psicólogo") com nome, endereço e telefone **idênticos** ao site; adicionar fotos do consultório, horários e o link do site.
- [ ] Cadastrar **Google Search Console** e **Bing Webmaster Tools**, enviar `https://hellenxavier.com.br/sitemap-index.xml` e pedir indexação da home e das duas páginas de serviço.
- [ ] Atualizar endereço e horário no Instagram e colocar o link do site na bio.
- [ ] Cloudflare: ativar **Always Use HTTPS**. Os cabeçalhos de segurança (HSTS etc.) já vão no arquivo `public/_headers`.
- [ ] Cloudflare → "robots.txt gerenciado": hoje bloqueia robôs de IA (ChatGPT, Claude, Google-Extended). Decidir com a Hellen se quer aparecer em respostas de IA.
- [ ] Depois de 2–4 semanas, conferir Core Web Vitals reais no Search Console.
