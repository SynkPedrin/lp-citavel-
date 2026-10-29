# CITÁVEL™ — Landing Page (Conversion First)

Landing page comercial da CITÁVEL™ (Desigual IA Labs): reputação de marcas em inteligência artificial.
A página mostra o que é vendido, quanto custa e o que é entregue, e leva ao **diagnóstico gratuito**.

Next.js 16 (App Router, Cache Components) · React 19 · TypeScript estrito · Tailwind CSS 4 · GSAP + ScrollTrigger · Lenis · Remotion 4 · React Hook Form + Zod · Radix (padrão shadcn/ui) · Lucide.

## Executar

```bash
npm install
cp .env.example .env.local
npm run dev                       # http://localhost:3000
npm run build && npm run start    # produção
npm run typecheck && npm run lint
```

## Jornada da página

Header → **Hero** (campo de site + preview de relatório) → Faixa de IAs → Problema → Como funciona (Analisamos / Identificamos / Executamos) → O que fazemos → **Planos** → **Comparativo** → Método PULSO™ → Prova (Case #0) → FAQ → Diagnóstico gratuito → Footer.

## Planos: fonte única

Os preços, volumes e entregas ficam **somente** em `src/config/plans.ts`. A origem é o arquivo *Plano de Lançamento Citável*, cuja tabela foi autorizada para a LP.

| | Essencial | Profissional | Completo |
|---|---|---|---|
| Mensalidade | R$ 497 | R$ 897 | R$ 1.297 |
| IAs analisadas | 2 | 4 | 7 |
| Perguntas/mês | 15 | 30 | 60 |
| Conteúdos/mês | 2 | 4 | 6 |

- Os volumes **não se somam** entre planos (o Profissional tem 4 conteúdos no total).
- Cards, comparativo, JSON-LD, mensagens de WhatsApp e o formulário leem desse arquivo.
- `commercialConditions.announceNoSetupFee` vem `false`. “Sem taxa de implantação” só aparece quando a condição for confirmada.
- Não são publicados: fidelidade de 6 meses, condição de cliente fundador, reajuste futuro e vagas limitadas. No plano de lançamento eles constam como “para debater”.
- A tag “Mais indicado” no Profissional é uma recomendação de posicionamento, e a página deixa isso explícito.
- Comparativo, “Mapa de Money Prompts”: o plano de lançamento só prevê o mapa no 1º mês do Profissional (e, por herança, do Completo). Por isso o Essencial aparece com “—”, e não “Básico”.

O modelo comercial anterior (Presença / Autoridade / Líder de Categoria) foi removido do código, da copy, do FAQ e dos dados estruturados.

## Sistema de conversão

Todos os CTAs abrem o **mesmo formulário** (modal `<dialog>` acessível) preservando a origem do clique:

| CTA | Comportamento |
|---|---|
| Hero | Valida a URL e abre a etapa 2 com o site preenchido. O foco vai para “Nome”. |
| Header / menu mobile / Problema | Abre o formulário. |
| “Quero o …” e “Escolher plano” | Abre o formulário com o plano escolhido pré-selecionado. |
| O que fazemos | Rola até o formulário final. |
| Formulário final | Herda o último plano escolhido na página. |
| Botão flutuante | WhatsApp oficial. |

O formulário pede site, nome, empresa, WhatsApp (com máscara), e-mail, plano de interesse e consentimento. Valida no cliente e no servidor com o mesmo schema Zod (`src/lib/lead-schema.ts`) e tem anti-spam: honeypot, tempo mínimo de preenchimento e limite por IP.

**Envio**
- **Com `LEAD_WEBHOOK_URL`**: `POST /api/lead` encaminha ao CRM com `planoInteresse`, `origemCta`, UTMs e data do consentimento. A tela “Pedido recebido” só aparece após resposta 2xx.
- **Sem webhook (estado atual)**: o botão diz “… pelo WhatsApp” e abre o WhatsApp oficial (`5518991976211`) com a mensagem pronta. A confirmação avisa que o pedido só chega quando a pessoa toca em enviar. Nenhuma análise automática é simulada.

**Analytics** (`src/lib/analytics.ts`)

O projeto ainda não tinha ferramenta de analytics. Os eventos são enviados para `window.dataLayer` (GTM/GA4) e também como `CustomEvent("citavel:track")`:

`hero_cta_click` · `diagnostico_form_start` · `diagnostico_form_submit` · `lead_submit_success` (só após confirmação do servidor) · `pricing_view` · `plan_selected` · `whatsapp_click`

Os eventos carregam apenas `origin`, `plan` e `delivery`, nunca dados pessoais.

## Variáveis de ambiente

| Variável | Padrão | Função |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | `https://citavel.ai` | Canonical, Open Graph, sitemap, JSON-LD |
| `NEXT_PUBLIC_SITE_ENV` | `production` | `preview`/`development` aplicam `noindex` |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | `5518991976211` | WhatsApp oficial |
| `LEAD_WEBHOOK_URL` | — | Endpoint do CRM (necessário no build **e** em runtime) |
| `LEAD_WEBHOOK_SECRET` | — | Enviado como `Authorization: Bearer …` |

A página é pré-renderizada no build. Depois de mudar variáveis, rode `npm run build` de novo.

## Motion

- Entradas curtas com `opacity`/`transform` (`data-reveal`). O conteúdo continua focável e na ordem de Tab.
- Hero sem animação bloqueante: o formulário fica utilizável imediatamente. O preview troca de aba sozinho até a primeira interação.
- Método PULSO: 5 etapas lado a lado e uma linha que acompanha o scroll. Não há pin de várias telas. No mobile, cards verticais.
- Remotion:
  - `CitavelHeroFilm` fica como fundo sutil do hero, **só no desktop**, porque no mobile o LCP precisa continuar sendo o texto;
  - `PulsoFinal` aparece discreto no CTA final;
  - `OgCard` gera a imagem Open Graph;
  - `ReputationNetwork` e `CitavelHeroFilmPortrait` continuam em `remotion/` para reuso, sem estarem publicados.
- Com `prefers-reduced-motion` não há vídeos, troca automática de abas nem animações em loop.

```bash
npm run remotion:studio
npm run render:media     # hero-film, pulso-final, poster e imagem OG
```

`remotion.config.ts` usa o Chrome for Testing, porque o headless shell não dispara `requestAnimationFrame` em alguns macOS recentes.

## Assets

- Os originais ficam em `assets/` e não são alterados. As cópias otimizadas são geradas com `npm run assets` em `public/assets/`.
- **Os nomes dos arquivos de plano não correspondem às cores:** `plano profissional.png` é cyan e `plano completo.png` é laranja. Por isso as texturas foram mapeadas pela cor real:
  - Essencial → `texture-emerald.jpg`;
  - Profissional (laranja) → `texture-orange.jpg`;
  - Completo (cyan) → `texture-cyan.jpg`.
- Logos de IA: ChatGPT, Gemini, Perplexity, Google IA, Claude, Copilot e Grok. Ollama foi retirado da página. Os logos indicam as plataformas analisadas, sem parceria nem endosso.

## Estrutura

```
src/
  config/plans.ts        planos, plataformas, comparativo (fonte única)
  content/               copy por seção, FAQ, dados institucionais
  lib/                   analytics, env, schema do lead, PULSO Score
  components/
    conversion/          LeadProvider, LeadDialog, LeadForm, LeadButton, WhatsAppFloat
    sections/            hero/, solution/, pricing/, Problem, Deliverables, Method, Proof, Faq, FinalCta…
    layout/ motion/ ui/ seo/
remotion/                composições
assets/                  originais (intocados)
```

## Validação executada

- `tsc`, ESLint e `next build` sem erros.
- 23 testes funcionais via Chrome DevTools Protocol em 360, 390, 768 e 1440 px. Cobrem:
  - preços novos e ausência dos antigos; volumes 15/30/60;
  - JSON-LD;
  - formulário na primeira dobra;
  - validação de URL; etapa 2 com o site e o foco corretos;
  - plano pré-selecionado a partir dos cards e do comparativo; tooltip;
  - envio pelo WhatsApp com plano e site; formulário final herdando o plano;
  - eventos de analytics sem dados pessoais;
  - nenhum erro nem aviso de console.
- Modo webhook testado de ponta a ponta com um servidor simulado: o lead chega com `origemCta`, e `lead_submit_success` só dispara após o 200.
- Sem overflow horizontal em 360–1920 px.
- Performance (build local): LCP ≈ 0,62 s no mobile com 4G e CPU 4×, com o texto como elemento LCP; ≈ 0,67 s no desktop; CLS ≈ 0.

## Pendências externas

- Configurar o webhook do CRM. Até lá, o fluxo de WhatsApp fica ativo.
- Confirmar a política de privacidade em `https://citavel.ai/privacidade.html` para este formulário.
- Decidir se “sem taxa de implantação” entra na página (`commercialConditions.announceNoSetupFee`).
- Conectar GTM/GA4, se desejado; os eventos já são enviados para `dataLayer`.
