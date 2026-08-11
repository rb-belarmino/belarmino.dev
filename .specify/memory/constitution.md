# Belarmino.dev Constitution

Este documento define as regras arquiteturais, princípios de design e tecnologias inegociáveis para o projeto `belarmino.dev`. Todos os agentes de IA e desenvolvedores humanos devem obedecer a estas regras.

## Core Principles (Princípios Fundamentais)

### I. Component-First & Isolamento

Toda nova interface de usuário deve ser construída como uma composição de componentes menores e reutilizáveis.

- Componentes devem ter uma responsabilidade única.
- Lógica de negócio pesada não deve ficar presa em componentes de UI (use hooks customizados ou funções utilitárias isoladas).

### II. Type Safety (Segurança de Tipos)

TypeScript é mandatório.

- O uso de `any` é estritamente proibido.
- Tipos de entrada e saída de funções (especialmente chamadas de API e Server Actions) devem ser explicitamente definidos e validados (ex: usando Zod).

### III. AI-Friendly Code (Código Amigável para IA)

O código deve ser escrito de forma que seja fácil para uma IA ler e estender no futuro.

- Funções e componentes devem ter nomes extremamente descritivos (prefira `fetchUserProfileData` ao invés de `getData`).
- Mantenha os arquivos pequenos e focados. Arquivos com mais de 300 linhas são um "code smell" e devem ser refatorados/divididos.

## Architecture & Tech Stack (Arquitetura e Stack)

Todos os templates, mockups e HTML brutos de referência de design estão armazenados no diretório .docs/design/. A IA deve utilizá-los como base visual ao construir novos componentes.

### Tipo de Aplicação

Site Estático (SSG/Client-side). Sem banco de dados ou autenticação. Dados do portfólio (experiências, projetos) devem vir de arquivos locais JSON/Markdown ou constantes TypeScript.

### Stack Aprovado

- **Framework:** Next.js (App Router)
- **Linguagem:** TypeScript
- **Estilização:** Tailwind CSS (Vanilla CSS apenas quando estritamente necessário para animações complexas que o Tailwind não suporta nativamente).
- **Ícones:** Material Symbols Outlined

### Padrão de Diretórios

- `src/components/ui/` -> Componentes base/genéricos (Botões, Inputs, Cards).
- `src/components/features/` -> Componentes específicos de domínio (Ex: `ProfileHeader`, `ProjectList`).
- `src/lib/` -> Utilitários gerais e configurações de bibliotecas externas.

## Development Workflow (Fluxo de Desenvolvimento)

### Spec-Driven

- Nenhum novo _feature_ deve ser codificado sem que antes haja um `plan.md` (e preferencialmente um `spec.md`) aprovado na respectiva pasta dentro do diretório raiz `specs/[nome-da-feature]/`.
- O código gerado deve ser auditado contra os critérios de aceite definidos no plano e na especificação.

### Tratamento de Erros e Logs

- Erros não devem quebrar a aplicação silenciosamente. Todo fluxo de dados crítico deve usar blocos `try/catch`.
- Componentes React devem estar encapsulados por _Error Boundaries_ quando apropriado.

## Governance (Governança)

- Esta Constituição tem autoridade máxima sobre qualquer plano individual (`.plan.md`) ou instrução isolada.
- Se a IA encontrar um plano que viole a Constituição, a Constituição prevalece e o plano deve ser reportado para correção.
- Alterações nesta Constituição devem ser discutidas e ter um _commit_ separado justificando a mudança de arquitetura.

**Version**: 1.0.0 | **Ratified**: 2026-08-11 | **Last Amended**: 2026-08-11
