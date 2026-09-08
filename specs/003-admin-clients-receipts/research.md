# Research & Technology Decisions: Admin Portal with Client Management & Receipts

**Feature**: `003-admin-clients-receipts`  
**Date**: 2026-09-08  
**Status**: Completed

## 1. Database & ORM Strategy

### Decision
- **Database Engine**: Neon Serverless Postgres (via HTTP/WebSocket connection pooling).
- **ORM**: Drizzle ORM (`drizzle-orm` + `drizzle-orm/neon-http`).
- **Migration & Tooling**: `drizzle-kit` for schema management and push/migrations.

### Rationale
- Drizzle ORM is lightweight, zero-binary, TypeScript-native, and offers first-class support for Neon's HTTP serverless driver.
- It guarantees compile-time type safety with zero cold-start penalty on Next.js Server Actions and serverless endpoints.
- Avoids heavy Rust binaries and connection pooling issues associated with traditional ORMs in serverless environments.

### Alternatives Considered
- **Prisma**: Heavier bundle size and requires custom adapters for Neon serverless Edge/Node runtimes.
- **Raw SQL via `@neondatabase/serverless`**: Very light, but loses automated TypeScript type-safety, relational helpers, and schema migration ergonomics.

---

## 2. Authentication & Protected Admin Route Strategy

### Decision
- **Access Route**: Direct URL only (`/admin`), strictly without public links or UI buttons in the public portfolio header/footer.
- **Session Management**: Lightweight HTTP-only, secure, `SameSite=Lax` session cookie with signed JWT payload using `jose` (Web Crypto API compliant) or encrypted session token.
- **Credential Storage**: Bcrypt-hashed password stored in the `admin_users` table in Neon Postgres (seeded on initial setup).
- **Route Protection**: Next.js App Router Middleware (`src/middleware.ts` or layout auth guards) intercepting all `/admin/*` requests except `/admin/login`.

### Rationale
- Meets the user's explicit requirement: "Nao criar um componente visual para acessar a parte admin. Irei digitar o endereco direto no navegador. belarmino.dev/admin."
- Provides industrial-grade security against unauthorized access while keeping the login experience simple and seamless.

### Alternatives Considered
- **NextAuth.js / Auth.js**: Overkill for a single administrator portfolio management panel; introduces unnecessary OAuth providers and database complexity.
- **Hardcoded static password in `.env`**: Vulnerable to leak and lacks auditing; database-backed admin table enables password updates and future credential rotation.

---

## 3. PDF Generation & Layout Rendering

### Decision
- **PDF Engine**: Client/Server-side PDF generation using `@react-pdf/renderer` or `jspdf` + `html2canvas` for instantaneous client-side download, combined with clean print CSS preview.
- **Receipt Layout**: Standard Brazilian "Recibo de Prestação de Serviços" layout with:
  - Header: Identificação do Emissor (Nome, CPF/CNPJ, Telefone, Chave Pix, Cidade/UF).
  - Número Sequencial do Recibo e Data de Emissão.
  - Identificação do Pagador/Cliente (Nome/Razão Social, Documento, Endereço).
  - Discriminação do Serviço Prestado (Texto detalhado dos sistemas/sites entregues).
  - Valor Nominal em BRL (Ex: `R$ 3.500,00`) e Valor por Extenso.
  - Linha de Assinatura do Prestador de Serviços.

### Rationale
- Generates high-resolution, print-ready vector documents matching legal and fiscal standards for freelance developers in Brazil.
- Allows both direct instant PDF download in the browser and server-side PDF generation/buffer creation to attach via Resend.

---

## 4. Email Dispatch Strategy (Resend API)

### Decision
- **Transport**: Resend API via Next.js Server Action (`sendReceiptEmailAction`).
- **Payload**: Formatted responsive HTML email summarizing the receipt details, with the official PDF attached directly to the message.
- **Sender/Recipient**: Dispatched from the configured domain/onboarding address to the client's registered email with BCC/notification to the administrator.

### Rationale
- Reuses the existing `resend` dependency already configured and functional in the project (`src/app/api/contact/route.ts`).
- Guarantees high deliverability and instant delivery tracking.
