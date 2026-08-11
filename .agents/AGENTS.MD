# Regras do Agente (Antigravity IDE)

Este arquivo define as regras de comportamento da Inteligência Artificial para este projeto. O objetivo é garantir que a IA atue em harmonia com o Spec-Driven Development (SDD) e a arquitetura definida.

## 1. Integração com Spec-Kit (Obrigatório)

A IA deve **sempre** respeitar o fluxo e a documentação do `spec-kit` presente no diretório `.specify/`.

- **Regra de Ouro:** Antes de planejar, sugerir mudanças arquiteturais ou iniciar uma nova funcionalidade, a IA deve consultar o arquivo `.specify/memory/constitution.md` para entender as regras do projeto.
- **Alinhamento de Tarefas:** Se a IA for solicitada a executar uma tarefa, ela deve verificar se existe uma pasta com o `plan.md` ou `spec.md` correspondente no diretório raiz `specs/` (ex: `specs/001-feature/plan.md`) e seguir estritamente o que foi definido lá. O fluxo ideal é gerar e seguir os artefatos `spec.md`, `plan.md` e `tasks.md`.
- **Sem "Vibe Coding":** A IA não deve propor grandes refatorações ou novas tecnologias sem que isso tenha sido formalizado primeiro em uma spec aprovada no diretório raiz `specs/`.

## 2. Padrões de Código e Arquitetura

- Siga as restrições arquiteturais definidas na constituição (`.specify/memory/constitution.md`).
- Se o projeto utilizar o padrão "Library-First" (ou similar) definido na constituição, a IA deve garantir que novos códigos sigam essa modularização e isolamento.
- Mantenha a consistência com o estilo de código existente no repositório.

## 3. Comunicação e Transparência

- Se a IA encontrar um conflito entre o pedido do usuário e as regras definidas na constituição (`.specify/memory/constitution.md`), ela deve **alertar o usuário** e pedir clareza antes de prosseguir com a implementação.
- Ao propor um plano de implementação, mencione explicitamente quais princípios da constituição ou de qual spec o plano está derivando.
