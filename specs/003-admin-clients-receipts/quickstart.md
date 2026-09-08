# Quickstart Guide: Admin Portal, Client Management & Service Receipts

**Feature**: `003-admin-clients-receipts`  
**Date**: 2026-09-08

This guide outlines how to configure, validate, and test the administrative portal locally.

## 1. Environment Configuration

Ensure the following environment variables are set in `.env.local`:

```env
# Neon Postgres Connection URL
DATABASE_URL="postgresql://user:password@ep-sample-pooler.us-east-2.aws.neon.tech/neondb?sslmode=require"

# Resend API Key (already used in contact route)
RESEND_API_KEY="re_sample_key"
RESEND_FROM_EMAIL="Rodrigo Belarmino <recibos@belarmino.dev>" # ou onboarding@resend.dev para testes

# Admin Authentication Secret & Seed
ADMIN_AUTH_SECRET="super-secret-jwt-signing-key-32-chars-min"
INITIAL_ADMIN_USERNAME="admin"
INITIAL_ADMIN_PASSWORD="secure_initial_password"
```

## 2. Dependencies & Database Migration

1. Install dependencies:
   ```bash
   npm install drizzle-orm @neondatabase/serverless jose bcryptjs
   npm install -D drizzle-kit dotenv @types/bcryptjs
   ```

2. Push schema to Neon Database:
   ```bash
   npx drizzle-kit push
   ```

3. Seed initial admin user and default provider settings:
   ```bash
   npx tsx src/db/seed.ts
   ```

## 3. End-to-End Validation Scenarios

### Scenario A: Authentication & Route Protection
1. Open browser and navigate to `http://localhost:3000/admin`.
2. **Expectation**: Automatically redirected to `http://localhost:3000/admin/login`.
3. Attempt login with incorrect credentials -> Verify error message.
4. Log in with `admin` / your password -> Verify instant redirection to `/admin` dashboard.
5. Notice that the public portfolio homepage (`/`) has no visible admin link.

### Scenario B: Client & Project Management
1. Inside the Admin Portal, click on the **Clientes** tab.
2. Click **+ Novo Cliente** and fill in Name, Company, CNPJ, Email, and Phone.
3. Save the client -> Verify the client appears in the listing and persists upon browser refresh.
4. Add a project/deliverable to this client (e.g., "Portal Institucional").

### Scenario C: Provider Settings Configuration
1. Navigate to the **Configurações** tab.
2. Update your provider profile (Name/Razão Social, CNPJ/CPF, Chave Pix, Cidade/UF).
3. Save -> Verify notification of successful update.

### Scenario D: Service Receipt Generation & PDF Download
1. Navigate to **Recibos** -> Click **+ Emitir Recibo**.
2. Select the client registered in Scenario B -> Verify that client information and your provider settings auto-fill.
3. Enter the service description (e.g. "Desenvolvimento de Website Responsivo") and amount (e.g., `R$ 2.500,00`).
4. Click **Visualizar Recibo** -> Check on-screen formal receipt format.
5. Click **Salvar em PDF** -> Verify that the PDF downloads with exact layout and vector fidelity.

### Scenario E: Email Dispatch via Resend
1. On the receipt details view, click **Enviar por E-mail**.
2. Verify dispatch status indicator.
3. Check recipient inbox (or Resend dashboard log) for receipt delivery with formatted body and PDF attachment.
