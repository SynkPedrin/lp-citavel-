/**
 * FONTE ÚNICA dos planos comerciais da CITÁVEL™.
 * Origem: "Plano de Lançamento Citável" (tabela de lançamento autorizada para a LP).
 *
 * Regras:
 *  - Preços, volumes e entregas vivem SOMENTE aqui. Componentes apenas leem.
 *  - Volumes NÃO se somam entre planos: o Profissional tem 4 conteúdos no total (não 2 + 4).
 *  - Condições do plano ainda "para debater" (fidelidade, fundadores, reajuste) NÃO entram aqui.
 */

export type PlanId = "essencial" | "profissional" | "completo";
export type PlanTheme = "lime" | "orange" | "cyan";
export type PlatformId = "chatgpt" | "gemini" | "perplexity" | "google-ai" | "claude" | "copilot" | "grok";

export const platforms: Record<PlatformId, { name: string; logo: string; w: number; h: number; wide?: boolean }> = {
  chatgpt: { name: "ChatGPT", logo: "/assets/ai/chatgpt.webp", w: 512, h: 512 },
  gemini: { name: "Gemini", logo: "/assets/ai/gemini.png", w: 625, h: 625 },
  perplexity: { name: "Perplexity", logo: "/assets/ai/perplexity.webp", w: 512, h: 512 },
  "google-ai": { name: "Google IA", logo: "/assets/ai/google-ai.png", w: 848, h: 194, wide: true },
  claude: { name: "Claude", logo: "/assets/ai/claude.webp", w: 700, h: 700 },
  copilot: { name: "Copilot", logo: "/assets/ai/copilot.webp", w: 563, h: 512 },
  grok: { name: "Grok", logo: "/assets/ai/grok.png", w: 512, h: 492 },
};

/** Ordem de exibição das plataformas (faixa de logos e chips). */
export const platformOrder: PlatformId[] = ["chatgpt", "gemini", "perplexity", "google-ai", "claude", "copilot", "grok"];

export type Plan = {
  id: PlanId;
  name: string;
  theme: PlanTheme;
  /** Textura mapeada pela cor real do arquivo (ver README). */
  texture: string;
  monthlyPrice: number;
  audience: string;
  platforms: PlatformId[];
  monthlyQuestions: number;
  monthlyContent: number;
  monthlyContentNote: string;
  /** Entregas mensais além de perguntas e conteúdos. */
  monthlyExtras: string[];
  /** Linha "Tudo do plano anterior", quando houver. */
  inherits?: string;
  firstMonth: string[];
  /** Tag de posicionamento comercial (recomendação, não popularidade). */
  tag?: string;
  cta: string;
};

export const plans: readonly Plan[] = [
  {
    id: "essencial",
    name: "Essencial",
    theme: "lime",
    texture: "/assets/textures/texture-emerald.jpg",
    monthlyPrice: 497,
    audience: "Para empresas que estão começando a construir sua presença nas IAs.",
    platforms: ["chatgpt", "gemini"],
    monthlyQuestions: 15,
    monthlyContent: 2,
    monthlyContentNote: "conteúdos para o site, como artigos ou FAQs",
    monthlyExtras: [
      "Relatório de presença da marca e dos concorrentes que aparecem no seu lugar",
      "Atualização do Perfil da Empresa no Google",
    ],
    firstMonth: [
      "Diagnóstico inicial (o “antes”)",
      "Estruturação completa do Perfil da Empresa no Google",
      "Ajustes básicos no site: dados da empresa, serviços e contatos iguais em todo lugar",
    ],
    cta: "Quero o Essencial",
  },
  {
    id: "profissional",
    name: "Profissional",
    theme: "orange",
    texture: "/assets/textures/texture-orange.jpg",
    monthlyPrice: 897,
    audience: "Para empresas que querem acompanhar concorrentes e fortalecer sua presença com mais conteúdo e estratégia.",
    platforms: ["chatgpt", "gemini", "perplexity", "google-ai"],
    monthlyQuestions: 30,
    monthlyContent: 4,
    monthlyContentNote: "conteúdos para o site",
    inherits: "Tudo do Essencial, com os volumes abaixo",
    monthlyExtras: [
      "Comparativo com 3 concorrentes",
      "1 case ou depoimento publicado*",
      "Reunião de resultados de 30 min",
    ],
    firstMonth: [
      "Tudo do primeiro mês do Essencial",
      "Mapa das perguntas que levam à compra (Money Prompts)",
      "Revisão das páginas de serviço",
    ],
    tag: "Mais indicado",
    cta: "Quero o Profissional",
  },
  {
    id: "completo",
    name: "Completo",
    theme: "cyan",
    texture: "/assets/textures/texture-cyan.jpg",
    monthlyPrice: 1297,
    audience: "Para empresas com mais serviços, unidades ou cidades que precisam ampliar a estratégia de reputação.",
    platforms: ["chatgpt", "gemini", "perplexity", "google-ai", "claude", "copilot", "grok"],
    monthlyQuestions: 60,
    monthlyContent: 6,
    monthlyContentNote: "conteúdos, incluindo páginas por serviço ou cidade",
    inherits: "Tudo do Profissional, com os volumes abaixo",
    monthlyExtras: [
      "Busca de menções em sites de fora: portais, guias e listas do setor",
      "Acompanhamento de visitas e contatos vindos das IAs, conforme os dados tecnicamente disponíveis",
    ],
    firstMonth: ["Tudo do primeiro mês do Profissional", "Configuração da medição de visitas vindas de IA"],
    cta: "Quero o Completo",
  },
] as const;

export const planById = (id: string | undefined) => plans.find((p) => p.id === id);

export const publicationNote =
  "*Cases e depoimentos dependem de material verdadeiro e de autorização do cliente. Nada é publicado sem os dois.";

/**
 * Condições comerciais. Só são exibidas quando confirmadas (true).
 * O plano de lançamento PROPÕE "sem taxa de implantação"; fidelidade, condição de fundador
 * e reajustes estão em debate e não são publicados.
 */
export const commercialConditions = {
  freeDiagnostic: true,
  announceNoSetupFee: false,
} as const;

/* ── Comparativo detalhado ──────────────────────────────────────────── */

export type CompareValue = string | boolean;
export type CompareRow = { label: string; tip?: string; values: Record<PlanId, CompareValue> };
export type CompareGroup = { title: string; description: string; rows: CompareRow[] };

const per = (fn: (p: Plan) => CompareValue) =>
  Object.fromEntries(plans.map((p) => [p.id, fn(p)])) as Record<PlanId, CompareValue>;

export const compareGroups: CompareGroup[] = [
  {
    title: "Monitoramento nas IAs",
    description: "Onde e quanto a gente testa sua marca todo mês.",
    rows: [
      { label: "IAs analisadas", values: per((p) => String(p.platforms.length)) },
      {
        label: "Plataformas",
        values: per((p) => p.platforms.map((id) => platforms[id].name).join(", ")),
      },
      {
        label: "Perguntas de compra / mês",
        tip: "Perguntas que um cliente faria antes de contratar, como “qual a melhor empresa de [serviço] em [cidade]?”. Testamos cada uma nas IAs do plano.",
        values: per((p) => String(p.monthlyQuestions)),
      },
      {
        label: "Relatório de presença e concorrentes",
        tip: "Onde sua marca aparece nas respostas e quais concorrentes aparecem no seu lugar.",
        values: per(() => true),
      },
      {
        label: "Comparativo com concorrentes",
        values: { essencial: "Concorrentes identificados no relatório", profissional: "3 concorrentes", completo: "3 concorrentes" },
      },
    ],
  },
  {
    title: "Execução",
    description: "O trabalho feito de verdade, que você consegue contar no fim do mês.",
    rows: [
      { label: "Conteúdos / mês", tip: "Artigos, páginas de perguntas frequentes ou páginas por serviço/cidade, publicados no seu site.", values: per((p) => String(p.monthlyContent)) },
      { label: "Atualização do Perfil da Empresa no Google", values: per(() => true) },
      {
        label: "Case ou depoimento publicado",
        tip: "Somente com material verdadeiro e autorização do cliente.",
        values: { essencial: false, profissional: "1/mês*", completo: "1/mês*" },
      },
      {
        label: "Menções em portais, guias e listas",
        tip: "Busca de oportunidades para a marca ser citada em sites de fora, que as IAs usam como fonte.",
        values: { essencial: false, profissional: false, completo: true },
      },
    ],
  },
  {
    title: "Estratégia e acompanhamento",
    description: "Como a gente mede e conversa sobre a evolução.",
    rows: [
      {
        label: "Mapa de Money Prompts",
        tip: "Money Prompts são as perguntas que levam à compra no seu setor. O mapa organiza quais delas priorizar.",
        values: { essencial: false, profissional: "No 1º mês", completo: "No 1º mês" },
      },
      { label: "Revisão das páginas de serviço", values: { essencial: false, profissional: "No 1º mês", completo: "No 1º mês" } },
      { label: "Reunião de resultados (30 min)", values: { essencial: false, profissional: "Mensal", completo: "Mensal" } },
      {
        label: "Visitas e contatos vindos de IA",
        tip: "Medição das visitas ao site que chegaram por respostas de IA, conforme os dados tecnicamente disponíveis.",
        values: { essencial: false, profissional: false, completo: true },
      },
    ],
  },
  {
    title: "Primeiro mês",
    description: "A estruturação que acontece no início do trabalho.",
    rows: [
      { label: "Diagnóstico inicial (o “antes”)", values: per(() => true) },
      { label: "Perfil da Empresa no Google completo", values: per(() => true) },
      { label: "Ajustes básicos de dados, serviços e contato no site", values: per(() => true) },
      { label: "Configuração da medição de visitas vindas de IA", values: { essencial: false, profissional: false, completo: true } },
    ],
  },
];

/** 1297 → "1.297" (o "R$" é renderizado à parte, em tamanho menor). */
export const formatNumber = (value: number) => new Intl.NumberFormat("pt-BR", { maximumFractionDigits: 0 }).format(value);
