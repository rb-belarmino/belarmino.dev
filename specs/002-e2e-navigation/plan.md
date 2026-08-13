# Plano de Implementação: Testes E2E de Navegação

## [Goal Description]
Configurar a suíte de testes End-to-End utilizando **Playwright** e **TypeScript** para automatizar a validação dos fluxos de navegação do portfólio (Desktop, Mobile, CTAs e Internacionalização), conforme especificado em `spec.md`.

## Clarificações e Decisões
- **Matriz de Dispositivos:** O Playwright rodará em múltiplos navegadores (Chromium, Firefox, WebKit).
- **Emulação Mobile:** Serão configurados profiles para: iPhone 17 Pro Max (resolução equivalente), iPhone XR, iPhone 12 e iPad Pro 10".
- **Execução Automática (CI/CD):** Não será configurado CI/CD no momento. Os testes serão rodados localmente.
- **Resolução de Animações:** Os testes aguardarão o tempo real das animações do Framer Motion para validar a experiência fidedigna do usuário.

## Proposed Changes

### Infraestrutura de Testes
- Instalação oficial do pacote `@playwright/test`.
- Configuração focada em integração com Next.js.

#### [NEW] `playwright.config.ts`
Arquivo de configuração central contendo o `baseURL` (ex: `http://127.0.0.1:3000`), tempos limite generosos (`timeouts`) adequados para aguardar as animações do Framer Motion. Definirá "projects" para testes em Desktop (Chromium, Firefox, WebKit) e configurações de Mobile Viewport personalizadas (iPhone XR, iPhone 12, iPhone Pro Max e iPad Pro). O config subirá automaticamente o servidor de desenvolvimento do Next.js via `webServer`.

### Arquivos de Teste (Suíte)
Os testes serão organizados por domínio funcional dentro de uma nova pasta na raiz do projeto.

#### [NEW] `tests/e2e/navigation.spec.ts`
Conterá os testes de navegação base:
- Clicar nos links do TopAppBar e verificar a URL e a visibilidade das seções.
- Testar a classe "active" nos menus quando a página faz scroll.

#### [NEW] `tests/e2e/mobile-navigation.spec.ts`
Rodará exclusivamente no "project" configurado para Mobile, validando a aparição do BottomNavBar e ocultação do menu Desktop.

#### [NEW] `tests/e2e/i18n.spec.ts`
Simulará o clique no botão de troca de idioma (EN/PT) e verificará por asserções de texto se a string principal do HeroSection mudou, validando a integração com o `next-intl`.

---

## Verification Plan
1. Rodar `npx playwright install` para baixar os binários dos navegadores.
2. Executar `npx playwright test` e garantir que todos os testes passem de primeira.
3. Gerar e visualizar o relatório via `npx playwright show-report`.
