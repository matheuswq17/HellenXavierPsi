# Pendências reais para publicação — 29/09/2026

## Confirmado pelo usuário
- Hellen Xavier Silva de Toledo; especializações informadas na conversa.
- Atendimento particular a adolescentes e adultos; segunda a quinta até 21h.
- WhatsApp (11) 98015-7199 e Instagram @hellen.xavierpsi.
- E-mail xavier.hellen@gmail.com.
- Insight Psicologia Ltda.; Av. Nova Cantareira, 2026, conjunto 15, Tucuruvi, São Paulo/SP, CEP 02330-003 (imagem fornecida).

## Depende da profissional
- Revisão final dos textos clínicos, serviços de avaliação/palestras e identificação CRP 06/48328 que já constava no projeto.
- Instituições/anos das demais formações e experiência: não inventados.
- Duração/frequência das sessões, regras de cancelamento, documentos para reembolso, prazos de resposta e avaliação: não prometidos no site.
- Acesso físico, estacionamento e coordenadas: não afirmados sem confirmação.

## Depende do lançamento
- Escolher e registrar o domínio; configurar PUBLIC_SITE_URL com HTTPS sem barra final, a partir de .env.example.
- Escolher hospedagem, verificar HTTPS, redirecionamento de www, compressão e cache; atualizar a política com informações reais de logs e retenção do provedor.
- Confirmar o domínio e propriedade no Search Console e enviar sitemap-index.xml.
- Criar/ajustar Perfil da Empresa no Google com conta da responsável; alinhar nome, endereço e telefone.
- Medir Core Web Vitals na hospedagem real e, quando houver volume, dados de campo. Não há pontuação Lighthouse certificada nesta revisão.
- Validar textos educativos com a profissional antes de ampliar conteúdo. Não publicar artigos em nome dela sem revisão.

Sem PUBLIC_SITE_URL o site gera noindex, robots bloqueado e não gera sitemap. Não publicar nessa condição esperando aparecer no Google.

Para preparar a versão final, usar `npm run build:publicacao` dentro de `site`, após configurar o domínio registrado. Esse comando bloqueia domínio ausente/local e confere canonical, robots, sitemap e indexação dos arquivos gerados. O comando não publica o site e não substitui a conferência de HTTPS e indexação na hospedagem real.
