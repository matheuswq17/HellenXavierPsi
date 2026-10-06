/**
 * ============================================================
 *  CONFIGURAÇÃO DO SITE — edite aqui, não nos componentes.
 * ============================================================
 * Para reutilizar este site com outro profissional, basta trocar
 * este arquivo, as fotos em src/assets/fotos e o logo em
 * src/components/logoPath.ts.
 *
 * Textos entre [[colchetes duplos]] são PROVISÓRIOS (fictícios)
 * e aparecem destacados enquanto `mostrarPendencias` for true.
 * Antes de publicar: confirme com a Hellen, remova os [[ ]] e
 * mude `mostrarPendencias` para false.
 */

export const mostrarPendencias = false;

export const site = {
  url: import.meta.env.PUBLIC_SITE_URL || "http://localhost:4321",
  empresa: "Insight Psicologia Ltda.",
  cnpj: "60.101.913/0001-26",
  nome: "Hellen Xavier",
  nomeCompleto: "Hellen Xavier Silva de Toledo",
  titulo: "Psicóloga e Neuropsicóloga",
  crp: "CRP 06/48328",
  abordagem: "Terapia Cognitivo-Comportamental",

  seo: {
    title: "Psicóloga presencial e online · Hellen Xavier | Tucuruvi, SP",
    description:
      "Psicóloga com atendimento presencial e online. Psicoterapia com TCC para adolescentes (a partir de 12 anos) e adultos, dependência química e avaliação neuropsicológica. Consultório no Tucuruvi, Zona Norte de São Paulo.",
  },

  contato: {
    whatsapp: "5511980157199", // Só dígitos, com 55 + DDD.
    whatsappExibicao: "(11) 98015-7199",
    instagram: "https://www.instagram.com/hellen.xavierpsi/",
    instagramExibicao: "@hellen.xavierpsi",
    email: "xavier.hellen@gmail.com",
    endereco: "Av. Nova Cantareira, 2014, conjunto 15",
    predio: "Edifício Cantareira Tower",
    bairro: "Tucuruvi",
    cidade: "São Paulo",
    uf: "SP",
    cep: "02330-003",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Cantareira+Tower,+Av.+Nova+Cantareira,+2014+-+Tucuruvi,+S%C3%A3o+Paulo+-+SP",
    rotaUrl: "https://www.google.com/maps/dir/?api=1&destination=Cantareira+Tower,+Av.+Nova+Cantareira,+2014+-+Tucuruvi,+S%C3%A3o+Paulo+-+SP",
    wazeUrl: "https://waze.com/ul?ll=-23.47922,-46.61117&navigate=yes",
    /** Referências de acesso (informadas pela profissional). */
    acesso: [
      "Estacionamento no local",
      "Cerca de 950 m do Metrô Tucuruvi e do Shopping Tucuruvi",
      "200 m do Shopping TriMais",
    ],
    /** Bairros atendidos presencialmente (SEO local). */
    bairros: ["Tucuruvi", "Santana", "Jaçanã", "Tremembé", "Mandaqui", "Vila Mazzei", "Parada Inglesa", "Vila Guilherme"],
  },

  horarios: {
    texto: "De segunda a quinta-feira, das 14h às 21h",
    dias: ["Monday", "Tuesday", "Wednesday", "Thursday"],
    abre: "14:00",
    fecha: "21:00",
    resposta: "Respondo mensagens em até 1 dia útil.",
  },

  pagamento: {
    convenio: "Atendimento particular. Não atendo por convênio.",
    /** Versão curta (rodapé, cards). A versão completa fica só no FAQ. */
    reembolsoCurto: "Emito nota fiscal para reembolso.",
    reembolso:
      "Emito nota fiscal para você solicitar reembolso ao seu plano de saúde. As condições de cobertura dependem de cada operadora.",
    valores: "Valores informados no primeiro contato.",
  },

  /** Mensagens pré-preenchidas do WhatsApp — neutras (LGPD: nada de dado clínico). */
  mensagens: {
    geral: "Olá, Hellen! Vim pelo site e gostaria de informações sobre atendimento.",
    avaliacao: "Olá, Hellen! Vim pelo site e gostaria de informações sobre avaliação neuropsicológica.",
    palestras: "Olá, Hellen! Vim pelo site e gostaria de informações sobre palestras.",
    guia: "Olá, Hellen! Li o site e gostaria de conversar sobre um atendimento.",
  },

  hero: {
    eyebrow: "Psicóloga · Neuropsicóloga · CRP 06/48328",
    h1: "Psicoterapia e avaliação neuropsicológica",
    h1Local: "presencial e online",
    apoio: "Psicóloga clínica e neuropsicóloga desde 2010, com especializações em TCC, Neuropsicologia, Psicopatologia e Saúde Mental e Dependência Química (Unifesp). Cuidado emocional e investigação cognitiva com a mesma profissional.",
    cta: "Conversar pelo WhatsApp",
    ctaSecundario: "Conhecer a avaliação",
    /** Vídeo gerado a partir da foto real (Higgsfield). Deixe vazio para usar só a foto. */
    video: { desktop: "/video/hero-desktop.mp4", mobile: "/video/hero-mobile.mp4" },
  },

  paraQuem: [
    {
      titulo: "Adolescentes",
      idade: "A partir de 12 anos",
      voz: "“Ninguém entende o que eu sinto.”",
      texto: "Ansiedade, autoestima, relações e as mudanças dessa fase, com a família participando do processo.",
    },
    {
      titulo: "Adultos",
      idade: "",
      voz: "“Sinto que não dou conta.”",
      texto: "Ansiedade, humor, estresse, trabalho, decisões e padrões que se repetem, com metas claras.",
    },
    {
      titulo: "Dependência química",
      idade: "",
      voz: "“Já tentei parar sozinho e não consegui.”",
      texto: "Uso de álcool e outras drogas, recaídas e seus impactos na rotina e nas relações, com orientação à família quando faz sentido.",
    },
  ],

  sobre: {
    titulo: "Prazer, eu sou a Hellen.",
    paragrafos: [
      "Sou psicóloga clínica com especialização e atendimento na abordagem cognitivo-comportamental, e neuropsicóloga. Atuo na área desde 2010, oferecendo atendimento particular para adolescentes e adultos, incluindo casos de dependência química, no meu consultório no Tucuruvi e online.",
      "Na psicoterapia, trabalho com a relação entre pensamentos, emoções e comportamentos. O processo começa pela compreensão da sua história e das dificuldades que levaram você a buscar ajuda; os objetivos são construídos em conjunto.",
      "Minha formação reúne especializações em Terapia Cognitivo-Comportamental, Neuropsicologia, Psicopatologia e Saúde Mental e Dependência Química, esta última pela Unifesp. Psicoterapia e avaliação neuropsicológica têm objetivos diferentes: conversamos sobre qual caminho faz sentido para a sua demanda.",
    ],
    /** Compromissos de processo (validar redação com a profissional). */
    compromissos: [
      { t: "Escuta sem julgamento", d: "Você pode chegar sem saber nomear o que sente. Entender isso faz parte do trabalho." },
      { t: "Métodos e objetivos claros", d: "Definidos de acordo com a sua demanda. Trabalhamos em conjunto e revisamos o caminho ao longo do processo." },
      { t: "Transparência", d: "Valores, frequência e próximos passos são conversados abertamente, desde o primeiro contato." },
    ],
    desde: 2010,
    formacao: [
      "Graduação em Psicologia — UnG, 1998",
      "Especialização em Dependência Química — Unifesp, 2011",
      "Especialização em Neuropsicologia — IPAF, 2015",
      "Especialização em Psicopatologia e Saúde Mental — CEPS, 2019",
      "Especialização em Terapia Cognitivo-Comportamental — CETCC, 2020",
      "Atuação na área desde 2010",
    ],
  },

  tcc: {
    titulo: "Como funciona a Terapia Cognitivo-Comportamental",
    texto:
      "Na TCC, olhamos para a relação entre o que você pensa, o que sente e o que faz. Pensamentos automáticos influenciam emoções e comportamentos, e aprender a observá-los abre espaço para novas respostas.",
    aviso: "Exemplo educativo. Não substitui avaliação nem acompanhamento psicológico.",
    cenarios: [
      {
        situacao: "Mandei uma mensagem e não me responderam.",
        automatico: { pensamento: "“Fiz algo errado. Estão chateados comigo.”", emocao: "Ansiedade, aperto no peito", comportamento: "Checo o celular sem parar e mando outra mensagem" },
        alternativo: { pensamento: "“A pessoa pode estar ocupada. Não tenho como saber ainda.”", emocao: "Leve inquietação, mas sob controle", comportamento: "Sigo meu dia e espero a resposta" },
      },
      {
        situacao: "Errei uma coisa numa apresentação no trabalho.",
        automatico: { pensamento: "“Todo mundo percebeu. Sou incompetente.”", emocao: "Vergonha, tristeza", comportamento: "Evito falar em reuniões nas próximas semanas" },
        alternativo: { pensamento: "“Foi um erro pontual. O resto correu bem.”", emocao: "Chateação passageira", comportamento: "Corrijo o ponto e sigo participando" },
      },
      {
        situacao: "Tenho uma prova importante amanhã.",
        automatico: { pensamento: "“Vou dar branco e vai ser um desastre.”", emocao: "Medo, tensão", comportamento: "Estudo até de madrugada e durmo mal" },
        alternativo: { pensamento: "“Me preparei. Nervosismo é normal e passa.”", emocao: "Ansiedade que dá para manejar", comportamento: "Reviso o essencial e vou dormir" },
      },
    ],
  },

  avaliacao: {
    titulo: "Avaliação Neuropsicológica",
    resumo:
      "Investigação da atenção, memória, linguagem, funções executivas e percepção, com entrevistas, testes padronizados e laudo. Ajuda a esclarecer suspeitas como TDAH, TEA ou dificuldades de aprendizagem, orientar os próximos passos e elaborar um plano de tratamento.",
    paraQuem: [
      "Suspeita de TDAH em adolescentes ou adultos",
      "Investigação de Transtorno do Espectro Autista (TEA)",
      "Dificuldades de aprendizagem e desempenho escolar",
      "Queixas de memória e atenção no dia a dia",
      "Orientação para escola, família e outros profissionais",
    ],
    etapas: [
      { titulo: "Entrevista inicial", texto: "Conversa para entender a queixa, a história e os objetivos. Com adolescentes, os responsáveis participam." },
      { titulo: "Sessões de testagem", texto: "Aplicação de testes e tarefas selecionados para a demanda. A avaliação completa tem em torno de 6 sessões, dependendo do ritmo do avaliado." },
      { titulo: "Análise e integração", texto: "Correção dos instrumentos e integração com entrevistas, observações e, quando útil, informações da escola." },
      { titulo: "Devolutiva e laudo", texto: "Encontro para explicar os resultados com clareza, entrega do laudo, orientação dos próximos passos e elaboração do plano de tratamento." },
    ],
    funcoes: [
      { id: "atencao", nome: "Atenção", investiga: "Capacidade de focar, manter e alternar o foco.", sinais: "Distração frequente, perder coisas, deixar tarefas pela metade.", x: 56, y: 13 },
      { id: "memoria", nome: "Memória", investiga: "Como a informação é guardada e recuperada.", sinais: "Esquecimentos que atrapalham a rotina ou os estudos.", x: 44, y: 46 },
      { id: "linguagem", nome: "Linguagem", investiga: "Compreensão, expressão, leitura e escrita.", sinais: "Dificuldade para encontrar palavras, ler ou organizar ideias.", x: 24, y: 36 },
      { id: "executivas", nome: "Funções executivas", investiga: "Planejamento, organização, controle de impulsos e flexibilidade.", sinais: "Procrastinação, dificuldade de organização, impulsividade.", x: 80, y: 32 },
      { id: "visuo", nome: "Percepção visuoespacial", investiga: "Como enxergamos e organizamos o espaço.", sinais: "Dificuldade com desenho, geometria, mapas ou orientação.", x: 21, y: 60 },
    ],
    faq: [
      { p: "Qual a idade mínima?", r: "A avaliação é feita em adolescentes a partir de 12 anos e em adultos." },
      { p: "Quantas sessões tem a avaliação?", r: "Em torno de 6 sessões, incluindo entrevista, testagem e devolutiva, dependendo do ritmo do avaliado. A estimativa é apresentada após a entrevista inicial." },
      { p: "O laudo serve para a escola?", r: "Sim. O laudo traz os resultados e orientações que podem ser compartilhados com a escola e outros profissionais, com a sua autorização." },
      { p: "Preciso de encaminhamento médico?", r: "Não é obrigatório. Muitas avaliações começam por indicação da escola, do médico ou pela própria percepção da família." },
      { p: "Tem reembolso do plano?", r: "O atendimento é particular. Emito nota fiscal para você solicitar reembolso ao seu plano; a cobertura depende das regras de cada operadora." },
    ],
  },

  atendimento: {
    online: {
      titulo: "Online",
      itens: [
        "Sessões por chamada de vídeo, com orientações combinadas antes do encontro",
        "A adequação do atendimento online é avaliada para cada pessoa e demanda",
        "Escolha um lugar reservado e use fones de ouvido",
        "Atendimento conforme a Resolução CFP nº 09/2024",
      ],
    },
    presencial: {
      titulo: "Presencial",
      itens: [
        "Edifício Cantareira Tower · Av. Nova Cantareira, 2014, conjunto 15",
        "Estacionamento no local",
        "Cerca de 950 m do Metrô Tucuruvi e do Shopping Tucuruvi",
        "200 m do Shopping TriMais",
      ],
    },
    sessao: "Sessões de 60 minutos, em geral semanais.",
  },

  palestras: {
    titulo: "Palestras",
    texto: "Temas das minhas áreas de especialização, adaptados ao público: escolas, famílias, empresas e eventos. Tema, duração e formato são definidos em conversa prévia.",
    publicos: ["Escolas e famílias", "Empresas e SIPAT", "Eventos e rodas de conversa"],
    /** Temas aprovados pela profissional (30/09/2026). */
    temas: [
      "Ansiedade no dia a dia: como pensamentos, emoções e comportamentos se conectam",
      "Álcool e outras drogas: prevenção e como conversar sobre dependência química",
      "Atenção, memória e aprendizagem: o que a neuropsicologia explica sobre o TDAH",
      "Saúde mental no trabalho e na escola: sinais de alerta e quando procurar ajuda",
    ],
  },

  faq: [
    { p: "Você atende por convênio?", r: "O atendimento é particular. Não atendo por convênio, mas emito nota fiscal para você solicitar reembolso ao seu plano. As condições de cobertura dependem de cada operadora." },
    { p: "Como funciona a sessão online?", r: "Por chamada de vídeo, no horário e na plataforma combinados. Antes de iniciar, conversamos sobre a adequação da modalidade. Escolha um lugar reservado, com boa conexão, e use fones de ouvido." },
    { p: "Quais são os horários?", r: "De segunda a quinta-feira, das 14h às 21h, presencial ou online. Respondo mensagens em até 1 dia útil." },
    { p: "Quanto tempo dura cada sessão?", r: "As sessões têm 60 minutos e, em geral, acontecem uma vez por semana. A frequência pode mudar ao longo do processo, sempre combinada com você." },
    { p: "Quanto custa?", r: "Os valores são informados no primeiro contato, junto com as formas de pagamento." },
    { p: "Como é a primeira sessão?", r: "A primeira sessão clínica é dedicada a conhecer sua história, compreender a demanda e combinar objetivos. Antes disso, pelo WhatsApp, você tira dúvidas sobre funcionamento, valores e horários." },
    { p: "Você atende dependência química?", r: "Sim. Atendo adolescentes e adultos em questões relacionadas ao uso de álcool e outras drogas, com especialização em Dependência Química pela Unifesp. O trabalho envolve entender o papel do uso na sua vida, prevenir recaídas e, quando faz sentido, orientar a família." },
    { p: "Adolescentes fazem terapia sozinhos?", r: "Atendo adolescentes a partir de 12 anos. As sessões são individuais, e os responsáveis participam em momentos combinados, sempre respeitando o sigilo do adolescente." },
  ],

  guia: {
    titulo: "Quando procurar ajuda?",
    sinais: [
      "Preocupações que ocupam boa parte do seu dia",
      "Mudanças no sono, no apetite ou na energia",
      "Dificuldade de lidar com o trabalho, os estudos ou as relações",
      "Sensação de estar sempre no limite",
      "Um momento difícil que você não quer atravessar sozinho",
    ],
    nota: "Esta lista não é um teste. Só uma avaliação profissional pode indicar o que está acontecendo.",
  },

  credito: { texto: "Site por Matheus Xavier Silva de Toledo", url: "/sobre-este-site/" },

  /** Quem fez o site (página /sobre-este-site). Separado dos serviços da Hellen. */
  desenvolvedor: {
    nome: "Matheus Xavier Silva de Toledo",
    funcao: "Desenvolvedor · Estudante de Engenharia de Software (FIAP)",
    /** Só dígitos (55 + DDD). Vazio = a página não mostra o botão "Quero um site assim". */
    whatsapp: "5511939011304",
    mensagem: "Oi, Matheus! Vi o site da Hellen Xavier e quero um site assim.",
  },
} as const;

export type Site = typeof site;
