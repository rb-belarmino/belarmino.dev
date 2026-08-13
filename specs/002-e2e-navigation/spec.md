# E2E Navigation Testing Suite

## Context & Objective
O projeto de portfólio (belarmino.dev) possui diversas seções interativas, menus responsivos (desktop e mobile) e suporte a múltiplos idiomas. O objetivo desta funcionalidade é criar uma suíte automatizada de testes End-to-End (E2E) focada em garantir que a navegação e a experiência interativa do usuário funcionem de maneira impecável em todas as resoluções, prevenindo que futuras alterações quebrem o fluxo principal do site.

## Core Features & Requirements

### 1. Validação de Navegação Desktop (TopAppBar)
- Deve garantir que os botões de navegação no cabeçalho redirecionem corretamente para as seções âncora da página única (Home, Projetos, Experiência, Contato).
- Deve validar que a seção ativa no menu é atualizada visualmente (estado `active`) à medida que o usuário faz scroll.

### 2. Validação de Navegação Mobile (BottomNavBar)
- Deve garantir que, em resoluções de tela pequenas (mobile), a barra de navegação inferior esteja visível e funcional.
- Deve simular o clique nos ícones mobile e verificar o redirecionamento para as seções corretas.

### 3. Validação de Call-to-Actions (CTAs) Principais
- Deve garantir que o botão "Minhas Soluções" (`#services`) no Hero redireciona o usuário para a lista de serviços oferecidos.
- Deve garantir que o botão "Falar sobre um projeto" (`#contact`) redireciona o usuário até o rodapé onde o formulário está localizado.

### 4. Validação de Internacionalização (i18n)
- Deve validar que o botão de troca de idioma (EN/PT) no cabeçalho funciona.
- Deve verificar se textos cruciais da interface (como o título do menu ou dos botões) mudam de acordo com a seleção de idioma, sem quebrar a estrutura da página.

## User Experience
- Os testes devem simular o comportamento de um usuário real visitando o site, fazendo scroll e clicando em links.
- Em caso de falha em um teste, o sistema deve ser capaz de registrar o erro claramente para facilitar a correção.

## Non-Functional Requirements
- **Confiabilidade:** Os testes não devem ser frágeis ("flaky"), eles devem aguardar corretamente a resolução das animações de scroll da página.
- **Cobertura Visual:** A navegação deve ser testada simulando pelo menos duas viewports (Desktop e Mobile).

---
> *Nota de Arquitetura: Detalhes de implementação, como a escolha de ferramentas (ex: Playwright), estrutura de pastas e scripts, devem ser definidos na próxima etapa (`/speckit.plan`).*
