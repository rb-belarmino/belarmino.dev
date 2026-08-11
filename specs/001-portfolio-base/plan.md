# Plano de Implementação (Spec-Kit)

## [Goal Description]
Construir o portfólio de desenvolvedor estático usando Next.js, com suporte a múltiplos idiomas (i18n), animações via Framer Motion e envio de e-mails via API Route (Resend). O objetivo é fornecer uma vitrine técnica premium e modularizada de acordo com o Design System fornecido (`DESIGN.md`).

## User Review Required
> [!IMPORTANT]
> Verifique se as dependências (Framer Motion, next-intl) e a estratégia de hospedagem estão alinhadas com a sua expectativa financeira e técnica. Confirme se configurou corretamente a chave de API do Resend no `.env.local` para recebimento de e-mails.

## Open Questions
- Não há mais perguntas em aberto, tudo foi alinhado no passo de especificação!

## Proposed Changes

Abaixo detalhamos a estrutura arquitetural e os componentes que serão criados.

### Infraestrutura e Base
- Setup do `Next.js` (App Router) configurado com `output: 'export'`.
- Inicialização do `Tailwind CSS` com suporte a Design System escuro.

#### [NEW] `tailwind.config.ts`
Implementará as cores principais do Design System (`surface: #051424`, `primary: #00f3ff`, etc), além de espaçamentos fluídos e suporte às fontes (`Sora`, `Inter`, `JetBrains Mono`).

#### [NEW] `src/app/layout.tsx`
Configuração de `next/font`, inicialização de Providers globais (se necessário para i18n/tema) e importação do link CSS para os ícones `Material Symbols Outlined`.

### Internacionalização (i18n)
- Uso da biblioteca `next-intl` com suporte a SSG (Static Site Generation).
- Estrutura de rotas baseada no idioma.

#### [NEW] `src/messages/pt.json` e `src/messages/en.json`
Dicionários de tradução para todos os componentes estáticos.

#### [NEW] `src/app/[locale]/page.tsx`
Página principal do site (One-Page) agregando todas as seções, adaptada para receber a *prop* `locale`.

### Componentes UI e Features
Arquitetura Component-First, dividida em UI genérica e Features de negócio.

#### [NEW] `src/components/ui/Button.tsx`, `Card.tsx`, `Input.tsx`
Componentes base implementando o visual *Glassmorphism* (usando `backdrop-blur`) e efeitos neon.

#### [NEW] `src/components/features/HeroSection.tsx`, `ProjectGrid.tsx`, `ExperienceList.tsx`
Seções maiores usando `framer-motion` para transições de entrada quando entrarem na viewport (scroll reveals).

#### [NEW] `src/components/features/ContactForm.tsx` e `src/app/api/contact/route.ts`
Formulário realizando chamadas para a nossa API Route protegida, se comunicando de forma segura com o **Resend SDK**, renderizando um template HTML temático (`[SYSTEM_ALERT]`).

#### [NEW] `src/app/icon.svg`
Favicon vetorial gerado dinamicamente via código SVG com o tema Cybernetic (`>_`).

### Dados Estáticos
Mocks locais baseados em TypeScript constante para facilitar futura integração com um CMS.

#### [NEW] `src/lib/data/projects.ts` e `src/lib/data/experiences.ts`
Exportação dos dados de mock (Ex: título, descrição, tags, imagem, repo).

---

## Verification Plan

### Automated Tests
- TypeScript Compiler: `tsc --noEmit` para garantir Type Safety, regra principal da Constituição.
- Linting: `npm run lint` e checagem do ESLint.
- Build test: Executar `npm run build` para atestar que as páginas geram código HTML 100% estático com sucesso (Static Export).

### Manual Verification
- Testar troca de idiomas entre `/` e `/en/`.
- Preencher formulário de contato e observar se o payload é enviado pelo Next.js API Routes e chega estilizado via Resend.
- Testar em mobile view a responsividade da grade de projetos.
