# Spec: Portfólio de Desenvolvedor (Base)

## 1. Visão Geral
O objetivo é construir um site de portfólio pessoal focado em destacar as habilidades, experiências e projetos do desenvolvedor. O público-alvo inclui recrutadores, parceiros, clientes e outros desenvolvedores. O site deve servir como o currículo digital definitivo e uma vitrine de competências técnicas e criativas.

A identidade visual será baseada nos templates estáticos exportados do Google Stitch (Stitch Modern Dark Tech Portfolio), garantindo um design premium, escuro e moderno.

## 2. Histórias de Usuário (User Stories)

- **Como um** recrutador, **eu quero** ver rapidamente um resumo das habilidades e experiências na página inicial **para que** eu possa avaliar a aderência do candidato à minha vaga.
- **Como um** parceiro de negócios ou cliente, **eu quero** explorar os projetos anteriores (com descrições e links) **para que** eu possa entender a qualidade e os resultados do trabalho entregue.
- **Como** outro desenvolvedor, **eu quero** entender quais tecnologias foram usadas em cada projeto **para que** eu possa avaliar a proficiência técnica.
- **Como** qualquer visitante, **eu quero** uma forma fácil de entrar em contato **para que** eu possa agendar uma entrevista ou propor um projeto.
- **Como** visitante mobile, **eu quero** que o site seja totalmente responsivo **para que** eu consiga ler o conteúdo e navegar pelas telas de forma confortável em meu celular.

## 3. Requisitos de Negócio e Escopo Inicial

Com base na estrutura de pastas de design identificada, o escopo da primeira versão cobre as seguintes áreas:
1. **Página Inicial (Home)**: Apresentação inicial, "hero section", introdução de alto nível.
2. **Projetos**: Listagem do portfólio de aplicações e sistemas já desenvolvidos.
3. **Experiência**: Linha do tempo ou listagem das experiências profissionais (cargos, empresas, datas).
4. **Contato**: Informações para contato profissional e links sociais (LinkedIn, GitHub, e-mail).

## 4. Decisões de Escopo e Configuração

Com base no alinhamento inicial:
- **Internacionalização**: O site deverá suportar Português e Inglês, com opção para o usuário alternar o idioma.
- **Armazenamento de Dados**: Os dados de projetos e experiências foram preenchidos estaticamente com informações reais obtidas a partir do Currículo em PDF e do perfil oficial no GitHub do usuário.
- **Design System**: As regras visuais, cores e tipografia (`Sora`, `Inter`, `JetBrains Mono`) devem seguir estritamente o definido em `.docs/design/stitch_modern_dark_tech_portfolio/synthetic_intelligence_portfolio/DESIGN.md`.
- **Formulário de Contato**: O envio de mensagens utiliza o SDK do Resend injetado numa API Route Server-Side, entregando e-mails estilizados com HTML estético (tema Cybernetic).

## 5. Critérios de Aceite (Gerais)
- [ ] O layout implementado deve ser fiel (pixel perfect na medida do possível usando Tailwind CSS) aos HTMLs providos em `.docs/design/stitch_modern_dark_tech_portfolio`.
- [ ] O site não deve possuir backend próprio (deve estar pronto para deploy estático).
- [ ] Todas as rotas (Home, Experiência, Projetos, Contato) devem funcionar sem falhas (Client-side routing).
