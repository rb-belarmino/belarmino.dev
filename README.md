# Rodrigo Belarmino - Cybernetic Portfolio

> _“Architecting modern, scalable, and secure systems.”_

[![Next.js](https://img.shields.io/badge/Next.js-15.0-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.0-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Resend](https://img.shields.io/badge/Resend-Email_API-black?style=for-the-badge)](https://resend.com/)

Bem-vindo ao código-fonte do meu portfólio pessoal. Este projeto é uma vitrine técnica projetada com uma estética **Cyber/Sci-fi** (Modo Escuro, detalhes em Neon Cyan e tipografia monoespaçada).

Ele não é apenas uma página estática, mas uma aplicação web moderna construída para altíssima performance, acessibilidade e escalabilidade.

---

## ✨ Principais Features

- 🌐 **Internacionalização (i18n):** Suporte nativo e instantâneo para Português (PT) e Inglês (EN) usando `next-intl`, com rotas dinâmicas perfeitamente estáticas.
- 🎨 **Design Neumorphism & Glassmorphism:** Interface escurecida focada em profundidade, desfoque (backdrop-blur) e transições suaves com `framer-motion`.
- 📧 **Backend Serverless (E-mail):** Formulário de contato ligado diretamente a uma **Next.js API Route** que se comunica com o SDK do [Resend](https://resend.com), disparando e-mails estilizados com template HTML que segue o mesmo visual sci-fi do site.
- ⚡ **Otimização Extrema:**
  - Fontes customizadas carregadas via `next/font` (`Sora`, `Inter`, `JetBrains Mono`).
  - SVG dinâmico (`icon.svg`) atuando como favicon.
  - Imagens 100% responsivas.

---

## 🛠️ Stack Tecnológica

O projeto foi construído sobre uma arquitetura limpa e com as melhores ferramentas do ecossistema front-end contemporâneo:

- **Framework:** Next.js (App Router)
- **Linguagem:** TypeScript
- **Estilização:** Tailwind CSS + Vanilla CSS modular
- **Animações:** Framer Motion
- **Formulários:** React Hook Form + Zod (Validação de Schemas)
- **i18n:** next-intl
- **Infraestrutura/E-mail:** Resend SDK

---

## 🚀 Como Rodar Localmente

Siga os passos abaixo para testar o projeto no seu próprio ambiente:

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/rb-belarmino/seu-repo-aqui.git
   cd seu-repo-aqui
   ```

2. **Instale as dependências:**
   ```bash
   npm install
   ```

3. **Configure as Variáveis de Ambiente:**
   Crie um arquivo `.env.local` na raiz do projeto com as chaves do Resend para ativar o formulário de contato.
   ```env
   RESEND_API_KEY="re_sua_chave_de_api"
   RESEND_TO_EMAIL="seu-email@dominio.com"
   ```

4. **Inicie o servidor de desenvolvimento:**
   ```bash
   npm run dev
   ```

5. **Acesse a aplicação:**
   Abra [http://localhost:3000](http://localhost:3000) no seu navegador.

---

## 📂 Estrutura do Projeto

- `/src/app` - Configuração de rotas (App Router), API Routes e provedores globais.
- `/src/components/ui` - Componentes visuais atômicos (Botões, Cards, Inputs).
- `/src/components/features` - Blocos funcionais grandes (Formulário de Contato, Grid de Projetos, Timeline de Experiências).
- `/src/lib/data` - Repositórios de dados locais (Mocks de portfólio importados do GitHub/LinkedIn).
- `/src/messages` - Dicionários de tradução JSON (PT/EN).

---

> Desenvolvido com muita lógica, código limpo e arquitetura moderna por **Rodrigo Belarmino**.  
> _Visite as issues ou abra um pull request caso encontre alguma anomalia na matrix!_ 👾
