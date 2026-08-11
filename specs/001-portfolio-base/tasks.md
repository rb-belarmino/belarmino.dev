# Tarefas: Portfólio de Desenvolvedor (Base)

- [x] Fase 1: Setup da Infraestrutura e Base
  - [x] Inicializar projeto Next.js App Router (TypeScript, Tailwind).
  - [x] Configurar `output: 'export'` no `next.config.mjs` para site estático.
  - [x] Configurar fontes no `layout.tsx` (`Sora`, `Inter`, `JetBrains Mono`) via `next/font`.
  - [x] Inserir link do CDN do Google Fonts para os ícones `Material Symbols Outlined`.
  - [x] Configurar `tailwind.config.ts` traduzindo as variáveis do `DESIGN.md` (cores, grid, sombras/glows, raios de borda).

- [x] Fase 2: Estrutura de Internacionalização (i18n)
  - [x] Instalar e configurar `next-intl`.
  - [x] Criar arquivos de dicionário de tradução (`src/messages/pt.json`, `src/messages/en.json`) com os textos base do site.
  - [x] Configurar o roteamento no App Router para lidar com a raiz (PT) e `/en/` e implementar o `generateStaticParams` para viabilizar o SSG (`output: 'export'`).

- [x] Fase 3: Dados Estáticos (Mocks)
  - [x] Criar arquivo `src/lib/data/projects.ts` (Mock array com projetos, links e tecnologias).
  - [x] Criar arquivo `src/lib/data/experiences.ts` (Mock array com cargos, empresas, descrições).

- [x] Fase 4: Componentização da UI Base
  - [x] Criar Componente `Button` (Glow animations via Framer Motion/Tailwind).
  - [x] Criar Componente `Card` (Glassmorphism e bordas gradient).
  - [x] Criar Componente `Input` (Visual clean focado no formulário de contato).
  - [x] Criar Componente `Chip` (Design neon monospace para tecnologias).

- [x] Fase 5: Features e Páginas
  - [x] Criar `Navigation` (Menu sticky, blur effect e seletor de idioma).
  - [x] Criar `HeroSection` (Apresentação, tipografia display e chamadas para ação).
  - [x] Criar `ProjectGrid` (Grid de cards carregando do mock).
  - [x] Criar `ExperienceList` (Lista da trajetória profissional).
  - [x] Criar `ContactForm` (Integração Server-side com Next.js API Routes e Resend SDK, incluindo um layout cyber para os emails recebidos).
  - [x] Montar `src/app/[locale]/page.tsx` agregando todas as seções (single-page).

- [x] Fase 6: Polimento e Animações
  - [x] Configurar componentes base do `framer-motion` nas seções (Scroll reveals).
  - [x] Auditar de acordo com a Constituição: Type Safety (sem anys, types explícitos), Responsividade e Fidelidade ao Layout.
