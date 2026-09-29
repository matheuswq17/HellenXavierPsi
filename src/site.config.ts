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
  nome: "Hellen Xavier",
  nomeCompleto: "Hellen Xavier Silva de Toledo",
  titulo: "Psicóloga e Neuropsicóloga",
  crp: "CRP 06/48328",
  abordagem: "Terapia Cognitivo-Comportamental",

  seo: {
    title: "Psicóloga no Tucuruvi · Hellen Xavier | TCC e Neuropsicologia",
    description:
      "Psicóloga no Tucuruvi, São Paulo. Psicoterapia com TCC e avaliação neuropsicológica para adolescentes e adultos. Atendimento particular, presencial e online.",
  },

  contato: {
    whatsapp: "5511980157199", // Só dígitos, com 55 + DDD.
    whatsappExibicao: "(11) 98015-7199",
    instagram: "https://www.instagram.com/hellen.xavierpsi/",
    instagramExibicao: "@hellen.xavierpsi",
    email: "xavier.hellen@gmail.com",
    endereco: "Av. Nova Cantareira, 2026, conjunto 15",
    bairro: "Tucuruvi",
    cidade: "São Paulo",
    uf: "SP",
    cep: "02330-003",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Av.+Nova+Cantareira,+2026,+conjunto+15+-+Tucuruvi,+S%C3%A3o+Paulo+-+SP",
  },

  horarios: {
    texto: "De segunda a quinta-feira, até às 21h",
    dias: ["Monday", "Tuesday", "Wednesday", "Thursday"],
    fecha: "21:00",
    resposta: "Consulte os horários disponíveis pelo WhatsApp.",
  },

  pagamento: {
    convenio: "Atendimento particular. Não atendo por convênio.",
    reembolso:
      "Se você pretende solicitar reembolso, confirme a documentação com a profissional e as condições com seu plano. A cobertura depende da operadora.",
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
    h1Local: "no Tucuruvi e online",
    apoio: "Terapia Cognitivo-Comportamental para lidar com emoções, pensamentos e dificuldades do dia a dia.",
    cta: "Conversar pelo WhatsApp",
    ctaSecundario: "Conhecer a avaliação",
    /** Vídeo gerado a partir da foto real (Higgsfield). Deixe vazio para usar só a foto. */
    video: { desktop: "/video/hero-desktop.mp4", mobile: "/video/hero-mobile.mp4" },
  },

  paraQuem: [
    {
      titulo: "Adolescentes",
      idade: "",
      voz: "“Ninguém entende o que eu sinto.”",
      texto: "Ansiedade, autoestima, escola, relações e as mudanças dessa fase, com a família participando quando faz sentido.",
    },
    {
      titulo: "Adultos",
      idade: "",
      voz: "“Sinto que não dou conta.”",
      texto: "Ansiedade, humor, estresse, trabalho, decisões e padrões que se repetem, com metas claras e acompanhamento.",
    },
  ],

  sobre: {
    titulo: "Prazer, eu sou a Hellen.",
    paragrafos: [
      "Sou psicóloga clínica com abordagem cognitivo-comportamental e neuropsicóloga. Ofereço atendimento particular para adolescentes e adultos no meu consultório no Tucuruvi e online.",
      "Na psicoterapia, trabalho com a relação entre pensamentos, emoções e comportamentos. O processo começa pela compreensão da sua história e das dificuldades que levaram você a buscar ajuda; os objetivos são construídos em conjunto.",
      "Minha formação reúne especializações em Terapia Cognitivo-Comportamental, Neuropsicologia, Psicopatologia e Saúde Mental e Dependência Química, esta última pela Unifesp. Psicoterapia e avaliação neuropsicológica têm objetivos diferentes: conversamos sobre qual caminho faz sentido para a sua demanda.",
    ],
    formacao: [
      "Graduação em Psicologia",
      "Especialização em Terapia Cognitivo-Comportamental",
      "Especialização em Dependência Química pela Unifesp",
      "Especialização em Neuropsicologia",
      "Especialização em Psicopatologia e Saúde Mental",
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
      "Uma investigação cuidadosa de como funcionam a atenção, a memória, a linguagem, as funções executivas e outras habilidades, para compreender dificuldades e orientar próximos passos.",
    paraQuem: [
      "Suspeita de TDAH em adolescentes ou adultos",
      "Investigação de Transtorno do Espectro Autista (TEA)",
      "Dificuldades de aprendizagem e desempenho escolar",
      "Queixas de memória e atenção no dia a dia",
      "Orientação para escola, família e outros profissionais",
    ],
    etapas: [
      { titulo: "Entrevista inicial", texto: "Conversa para entender a queixa, a história e os objetivos. Com adolescentes, os responsáveis participam." },
      { titulo: "Sessões de testagem", texto: "Aplicação de testes e tarefas selecionados para a demanda. O número de encontros é definido conforme a necessidade de cada avaliação." },
      { titulo: "Análise e integração", texto: "Correção dos instrumentos e integração com entrevistas, observações e, quando útil, informações da escola." },
      { titulo: "Devolutiva e laudo", texto: "Encontro para explicar os resultados com clareza, entrega do laudo e orientações de próximos passos." },
    ],
    funcoes: [
      { id: "atencao", nome: "Atenção", investiga: "Capacidade de focar, manter e alternar o foco.", sinais: "Distração frequente, perder coisas, deixar tarefas pela metade.", x: 56, y: 13 },
      { id: "memoria", nome: "Memória", investiga: "Como a informação é guardada e recuperada.", sinais: "Esquecimentos que atrapalham a rotina ou os estudos.", x: 44, y: 46 },
      { id: "linguagem", nome: "Linguagem", investiga: "Compreensão, expressão, leitura e escrita.", sinais: "Dificuldade para encontrar palavras, ler ou organizar ideias.", x: 24, y: 36 },
      { id: "executivas", nome: "Funções executivas", investiga: "Planejamento, organização, controle de impulsos e flexibilidade.", sinais: "Procrastinação, dificuldade de organização, impulsividade.", x: 80, y: 32 },
      { id: "visuo", nome: "Percepção visuoespacial", investiga: "Como enxergamos e organizamos o espaço.", sinais: "Dificuldade com desenho, geometria, mapas ou orientação.", x: 21, y: 60 },
    ],
    faq: [
      { p: "Quanto tempo leva a avaliação?", r: "O prazo depende da demanda, dos instrumentos necessários e da disponibilidade para os encontros. A estimativa é combinada após a entrevista inicial." },
      { p: "Para quem é a avaliação?", r: "O atendimento é voltado a adolescentes e adultos." },
      { p: "O laudo serve para a escola?", r: "Sim. O laudo traz os resultados e orientações que podem ser compartilhados com a escola e outros profissionais, com a sua autorização." },
      { p: "Preciso de encaminhamento médico?", r: "Não é obrigatório. Muitas avaliações começam por indicação da escola, do médico ou pela própria percepção da família." },
      { p: "Tem reembolso do plano?", r: "O atendimento é particular. Consulte a documentação disponível com a profissional e confirme com seu plano os critérios de cobertura antes de iniciar." },
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
        "Consultório na Av. Nova Cantareira, 2026, conjunto 15, no Tucuruvi",
        "Conjunto 15 · CEP 02330-003",
        "Ambiente reservado, claro e acolhedor",
        "Consulte as condições de acesso ao consultório antes da visita",
      ],
    },
    sessao: "Duração e frequência combinadas antes do início do acompanhamento.",
  },

  palestras: {
    titulo: "Palestras",
    texto: "Conteúdo sobre saúde mental com linguagem clara, base científica e espaço para perguntas.",
    publicos: ["Escolas e famílias", "Empresas e SIPAT", "Eventos e rodas de conversa"],
    temas: [
      "Tema, público e formato definidos em conversa prévia.",
    ],
  },

  faq: [
    { p: "Você atende por convênio?", r: "O atendimento é particular. Não atendo por convênio. Se você pretende solicitar reembolso, confirme a documentação com a profissional e as condições com seu plano. A cobertura depende da operadora." },
    { p: "Como funciona a sessão online?", r: "Por chamada de vídeo, no horário e na plataforma combinados. Antes de iniciar, conversamos sobre a adequação da modalidade. Escolha um lugar reservado, com boa conexão, e use fones de ouvido." },
    { p: "Quais são os horários?", r: "De segunda a quinta-feira, até às 21h, presencial ou online." },
    { p: "Quanto custa?", r: "Os valores são informados no primeiro contato, junto com as formas de pagamento." },
    { p: "Como é a primeira sessão?", r: "A primeira sessão clínica é dedicada a conhecer sua história, compreender a demanda e combinar objetivos. O contato pelo WhatsApp serve para esclarecer funcionamento, valores e disponibilidade; ele não é uma sessão e não confirma automaticamente um agendamento." },
    { p: "Adolescentes fazem terapia sozinhos?", r: "As sessões são individuais, e os responsáveis participam em momentos combinados, sempre respeitando o sigilo do adolescente." },
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

  credito: { texto: "", url: "" },
} as const;

export type Site = typeof site;
