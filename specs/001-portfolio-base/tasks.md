# Tarefas: Portfólio de Desenvolvedor (Base)

- [ ] Fase 1: Setup da Infraestrutura e Base
  - [ ] Inicializar projeto Next.js App Router (TypeScript, Tailwind).
  - [ ] Configurar `output: 'export'` no `next.config.mjs` para site estático.
  - [ ] Configurar fontes no `layout.tsx` (`Sora`, `Inter`, `JetBrains Mono`) via `next/font`.
  - [ ] Inserir link do CDN do Google Fonts para os ícones `Material Symbols Outlined`.
  - [ ] Configurar `tailwind.config.ts` traduzindo as variáveis do `DESIGN.md` (cores, grid, sombras/glows, raios de borda).

- [ ] Fase 2: Estrutura de Internacionalização (i18n)
  - [ ] Instalar e configurar `next-intl`.
  - [ ] Criar arquivos de dicionário de tradução (`src/messages/pt.json`, `src/messages/en.json`) com os textos base do site.
  - [ ] Configurar o roteamento no App Router para lidar com a raiz (PT) e `/en/` e implementar o `generateStaticParams` para viabilizar o SSG (`output: 'export'`).

- [ ] Fase 3: Dados Estáticos (Mocks)
  - [ ] Criar arquivo `src/lib/data/projects.ts` (Mock array com projetos, links e tecnologias).
  - [ ] Criar arquivo `src/lib/data/experiences.ts` (Mock array com cargos, empresas, descrições).

- [ ] Fase 4: Componentização da UI Base
  - [ ] Criar Componente `Button` (Glow animations via Framer Motion/Tailwind).
  - [ ] Criar Componente `Card` (Glassmorphism e bordas gradient).
  - [ ] Criar Componente `Input` (Visual clean focado no formulário de contato).
  - [ ] Criar Componente `Chip` (Design neon monospace para tecnologias).

- [ ] Fase 5: Features e Páginas
  - [ ] Criar `Navigation` (Menu sticky, blur effect e seletor de idioma).
  - [ ] Criar `HeroSection` (Apresentação, tipografia display e chamadas para ação).
  - [ ] Criar `ProjectGrid` (Grid de cards carregando do mock).
  - [ ] Criar `ExperienceList` (Lista da trajetória profissional).
  - [ ] Criar `ContactForm` (Formulário Client-side integrado ao Formspree, utilizando `react-hook-form` e validação com `Zod`, além dos links sociais).
  - [ ] Montar `src/app/[locale]/page.tsx` agregando todas as seções (single-page).

- [ ] Fase 6: Polimento e Animações
  - [ ] Configurar componentes base do `framer-motion` nas seções (Scroll reveals).
  - [ ] Auditar de acordo com a Constituição: Type Safety (sem anys, types explícitos), Responsividade e Fidelidade ao Layout.
