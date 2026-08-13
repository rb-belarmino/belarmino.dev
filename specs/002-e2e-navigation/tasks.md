# Tarefas de Implementação: Testes E2E de Navegação

Abaixo estão as tarefas sequenciais geradas a partir do `plan.md` para a implementação da suíte Playwright.

- [ ] **1. Setup da Infraestrutura (Playwright)**
  - Instalar `@playwright/test` como dependência de desenvolvimento.
  - Criar o arquivo `playwright.config.ts` na raiz do projeto.
  - Configurar o `baseURL` apontando para o localhost.
  - Configurar a inicialização automática do servidor Next.js na propriedade `webServer`.
  - Aumentar os `timeouts` globais e de expect para acomodar as animações do Framer Motion.

- [ ] **2. Configuração da Matriz de Dispositivos**
  - Adicionar suporte a Desktop: Chromium, Firefox e WebKit.
  - Adicionar suporte a Mobile (perfis customizados ou presets do Playwright):
    - iPhone XR
    - iPhone 12
    - iPhone Pro Max (simulando a viewport do 17 Pro Max)
    - iPad Pro (simulando 10")

- [ ] **3. Implementação dos Testes Desktop & CTAs (`tests/e2e/navigation.spec.ts`)**
  - Escrever teste que clica nos links do cabeçalho e valida se a âncora certa da página foi acessada.
  - Escrever teste para validar se os botões "Minhas Soluções" e "Falar sobre um projeto" levam o usuário aos locais corretos.

- [ ] **4. Implementação dos Testes Mobile (`tests/e2e/mobile-navigation.spec.ts`)**
  - Restringir a execução deste arquivo para rodar apenas nos "projects" configurados como Mobile/Tablet.
  - Validar a visibilidade da barra de navegação inferior (`BottomNavBar`).
  - Testar o clique e redirecionamento de pelo menos um ícone.

- [ ] **5. Implementação dos Testes de Internacionalização (`tests/e2e/i18n.spec.ts`)**
  - Escrever teste que acessa a aplicação.
  - Clicar no botão de troca de idioma (EN -> PT ou vice-versa).
  - Asserir que uma string chave da interface (ex: título principal) foi traduzida corretamente após a ação.

- [ ] **6. Validação e Execução**
  - Rodar o comando de instalação de binários do Playwright (`npx playwright install`).
  - Rodar a suíte completa de testes (`npx playwright test`).
  - Garantir que não existam instabilidades ("flakiness") devido ao framer-motion.
