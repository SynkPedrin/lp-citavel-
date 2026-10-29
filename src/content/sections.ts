/**
 * Copy comercial da landing page, centralizada por seção.
 * Regras: benefício concreto em toda frase, sem garantia de recomendação,
 * dados de exemplo sempre identificados como ilustrativos.
 * Preços e entregas NÃO ficam aqui: ver src/config/plans.ts.
 */

export const hero = {
  eyebrow: "Reputação em inteligência artificial",
  headline: ["Seu cliente pergunta para a IA.", "Sua empresa aparece na resposta?"],
  sub: "A Citável descobre como sua empresa aparece no ChatGPT, Gemini e outras inteligências artificiais — e executa melhorias para fortalecer sua presença e reputação digital.",
  fieldLabel: "Cole o site da sua empresa",
  placeholder: "https://suaempresa.com.br",
  cta: "Receber diagnóstico gratuito",
  microcopy: ["Gratuito", "Sem compromisso", "Análise pela nossa equipe"],
};

export const platformsStrip = {
  title: "Entenda como sua marca aparece nas principais IAs.",
  note: "Plataformas analisadas conforme o plano contratado. As marcas pertencem aos seus titulares; não há parceria nem endosso.",
};

export const problem = {
  eyebrow: "O problema",
  headline: ["Seus concorrentes podem estar nas respostas.", "E sua empresa, não."],
  sub: "Quando alguém pergunta a uma inteligência artificial quais empresas contratar, a resposta pode influenciar a decisão. Você sabe se sua marca está sendo considerada?",
  cards: [
    {
      icon: "EyeOff",
      title: "Sua marca não aparece",
      body: "Se a IA não menciona sua empresa nas perguntas importantes do seu setor, oportunidades de descoberta podem estar passando despercebidas.",
    },
    {
      icon: "Users",
      title: "Seus concorrentes ganham visibilidade",
      body: "Entenda quais concorrentes são mencionados e quais informações podem contribuir para a sua presença nas respostas.",
    },
    {
      icon: "CircleHelp",
      title: "Você não sabe o que melhorar",
      body: "Sem diagnóstico e acompanhamento, é difícil saber quais conteúdos, páginas e informações precisam de atenção.",
    },
  ],
  cta: "Descobrir como minha empresa aparece",
} as const;

export const solution = {
  eyebrow: "Como funciona",
  headline: ["A gente não entrega só um relatório.", "A gente faz o trabalho."],
  sub: "A Citável une análise de reputação, estratégia e execução mensal para ajudar sua empresa a construir uma presença mais consistente nas respostas das IAs.",
  steps: [
    {
      index: "01",
      title: "Analisamos",
      body: "Descobrimos quando sua marca aparece nas respostas das IAs, quais concorrentes são mencionados e quais perguntas importam para o seu negócio.",
      bullets: ["Perguntas de compra do seu setor", "Marcas citadas em cada resposta", "Presença por plataforma"],
    },
    {
      index: "02",
      title: "Identificamos o que melhorar",
      body: "Organizamos as oportunidades em conteúdos, informações institucionais, páginas e fontes de autoridade, com prioridade definida.",
      bullets: ["Oportunidades priorizadas", "Ação sugerida para cada uma", "Status visível para você"],
    },
    {
      index: "03",
      title: "Executamos e acompanhamos",
      body: "Produzimos os conteúdos, fazemos os ajustes previstos no plano e acompanhamos as mudanças nas respostas ao longo do tempo.",
      bullets: ["Conteúdos entregues no mês", "Ajustes em perfis e páginas", "Nova medição a cada ciclo"],
    },
  ],
};

export const deliverables = {
  eyebrow: "O que fazemos",
  headline: ["Menos promessas.", "Mais entregas que você consegue acompanhar."],
  items: [
    { icon: "Radar", title: "Monitoramento de IAs", body: "Acompanhamos sua marca nas plataformas incluídas no seu plano: de 2 a 7 IAs." },
    { icon: "MessageSquareText", title: "Perguntas de compra", body: "Testamos de 15 a 60 perguntas por mês para ver onde sua marca aparece e onde surgem oportunidades." },
    { icon: "Swords", title: "Análise de concorrentes", body: "Identificamos as marcas citadas no seu lugar para orientar as próximas ações, conforme o plano contratado." },
    { icon: "FileText", title: "Conteúdo executado", body: "Produzimos artigos, FAQs e páginas para deixar sua empresa mais clara e confiável para as IAs." },
    { icon: "Wrench", title: "Otimizações", body: "Ajustamos as informações da empresa, o Perfil no Google e as páginas previstas em cada plano." },
    { icon: "LineChart", title: "Acompanhamento", body: "Relatórios periódicos para você ver a evolução da presença da marca, mês a mês." },
  ],
  cta: "Solicitar diagnóstico gratuito",
} as const;

export const pricing = {
  eyebrow: "Planos",
  headline: "Escolha o plano ideal para sua empresa aparecer mais nas IAs.",
  sub: "Do primeiro diagnóstico a uma estratégia completa de reputação: escolha o nível de acompanhamento e execução que faz sentido para sua empresa.",
  diagnosticNote: "Todos os planos começam pelo diagnóstico gratuito, sem compromisso.",
  noSetupFeeNote: "Sem taxa de implantação: o primeiro mês já está dentro da mensalidade.",
};

export const compare = {
  headline: "Compare os planos e saiba exatamente o que você recebe.",
  sub: "Volumes por plano, sem somas escondidas. Toque ou passe o cursor no ícone ⓘ para entender cada termo.",
  cta: "Escolher plano",
};

export const method = {
  eyebrow: "Método PULSO™",
  headline: "Existe um método por trás de cada melhoria.",
  sub: "O PULSO™ organiza nossa estratégia de reputação em cinco etapas.",
  steps: [
    { letter: "P", name: "Percepção", body: "Entender como a marca é representada hoje nas respostas das IAs." },
    { letter: "U", name: "Unificação", body: "Organizar informações, diferenciais e identidade da empresa em uma versão única." },
    { letter: "L", name: "Linguagem", body: "Produzir conteúdos relevantes e citáveis, no formato que as IAs entendem." },
    { letter: "S", name: "Sinal", body: "Fortalecer fontes externas e sinais de autoridade sobre a marca." },
    { letter: "O", name: "Operação", body: "Monitorar, comparar e melhorar continuamente, ciclo após ciclo." },
  ],
  formula: "A evolução é medida pelo PULSO Score, com fórmula pública: V × 0,40 + C × 0,35 + S × 0,25",
  formulaLegend: "V = visibilidade · C = citação · S = sentimento",
};

export const proof = {
  eyebrow: "Prova",
  headline: "Antes de oferecer o método, aplicamos em nós mesmos.",
  sub: "O primeiro caso foi rodado no próprio fundador, Endrigo Almada, com o mesmo método e a mesma régua oferecidos aos clientes.",
  steps: [
    { label: "Situação inicial", value: "Sem menção", detail: "Em uma pergunta sobre criadores brasileiros de IA, a resposta não citava o fundador." },
    { label: "Ações realizadas", value: "3 frentes", detail: "Entidade criada no Wikidata, IMDb passando a ser citado como fonte e mais vídeos indexáveis no YouTube." },
    { label: "Nova medição", value: "30,3 → 32,5", detail: "PULSO Score agregado. Sobe devagar porque considera todas as perguntas, não só a que mudou." },
    { label: "Resultado observado", value: "1ª recomendação", detail: "Na mesma pergunta específica, no ChatGPT, cerca de 30 dias depois. Não é liderança geral na plataforma." },
  ],
  disclaimer:
    "Relato publicado pela própria Citável. É um caso documentado, não uma promessa: resultados variam conforme setor, ponto de partida e comportamento das plataformas.",
  cta: "Ler o case completo",
  trust: [
    { title: "Fórmula pública", body: "O PULSO Score usa uma fórmula aberta, que você pode conferir." },
    { title: "Respostas na íntegra", body: "Os relatórios trazem as respostas reais das IAs, não só números." },
    { title: "Entrega contada", body: "Cada plano diz quantas perguntas e conteúdos você recebe no mês." },
  ],
};

export const finalCta = {
  eyebrow: "Diagnóstico gratuito",
  headline: "Descubra o que as inteligências artificiais estão dizendo sobre sua empresa.",
  sub: "Solicite um diagnóstico inicial gratuito e identifique oportunidades para fortalecer sua presença digital.",
  bullets: [
    "Perguntas reais do seu setor testadas nas IAs",
    "Análise feita pela nossa equipe, com apoio de IA",
    "Retorno pelo WhatsApp ou e-mail, sem compromisso",
  ],
  cta: "Solicitar diagnóstico gratuito",
  microcopy: "Sem compromisso. Nossa equipe entra em contato para dar continuidade à análise.",
};
