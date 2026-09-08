# Tasks: Admin Portal with Client Management & Service Receipt Generation

**Input**: Design documents from `specs/003-admin-clients-receipts/`  
**Prerequisites**: `plan.md`, `spec.md`, `research.md`, `data-model.md`, `contracts/`, `quickstart.md`

## Format: `- [ ] [TaskID] [P?] [Story?] Description with file path`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (`[US1]`, `[US2]`, `[US3]`, `[US4]`)
- Exact file paths are specified for every task

---

## Phase 1: Setup (Shared Infrastructure & Dependencies)

**Purpose**: Project initialization, dependencies, and base configuration

- [x] T001 Install dependencies (`drizzle-orm`, `@neondatabase/serverless`, `jose`, `bcryptjs`, `jspdf`, `html2canvas`) and dev dependencies (`drizzle-kit`, `dotenv`, `@types/bcryptjs`) in `package.json`
- [x] T002 [P] Configure Drizzle configuration and migrations directory in `drizzle.config.ts`
- [x] T003 [P] Initialize Neon HTTP database client and Drizzle instance in `src/db/index.ts`
- [x] T004 [P] Setup environment variables parsing and validation in `src/lib/env.ts`

---

## Phase 2: Foundational (Database Schemas & Authentication Engine)

**Purpose**: Core database tables, security guards, and seeding required by all user stories

**⚠️ CRITICAL**: Must be completed before user stories begin

- [x] T005 [P] Define admin users table schema in `src/db/schema/auth.schema.ts`
- [x] T006 [P] Define provider settings table schema in `src/db/schema/provider.schema.ts`
- [x] T007 [P] Define clients and client projects tables schemas in `src/db/schema/clients.schema.ts`
- [x] T008 [P] Define service receipts table schema in `src/db/schema/receipts.schema.ts`
- [x] T009 Export aggregated schema definitions in `src/db/schema/index.ts`
- [x] T010 Create database seed script for initial admin user and default provider profile in `src/db/seed.ts`
- [x] T011 [P] Implement JWT session creation, signing, and cookie verification using Web Crypto API in `src/lib/auth.ts`
- [x] T012 Implement Next.js route protection middleware for `/admin/*` in `src/middleware.ts`

**Checkpoint**: Database layer and auth guards ready. User story implementation can begin.

---

## Phase 3: User Story 1 - Authentication & Protected Admin Access (Priority: P1) 🎯 MVP

**Goal**: Website owner can log into the private administrative area at `/admin` using username and password with secure session management.

**Independent Test**: Navigate to `/admin`, verify redirection to `/admin/login`, log in with valid credentials, verify access to dashboard, and confirm that the public portfolio has zero visual admin links.

- [x] T013 [P] [US1] Implement authentication Server Actions (`loginAdminAction`, `logoutAdminAction`, `getAdminSessionAction`) in `src/app/admin/actions/auth.actions.ts`
- [x] T014 [US1] Create administrative login interface in `src/app/admin/login/page.tsx`
- [x] T015 [US1] Create admin navigation bar and tabs header component in `src/components/features/admin/AdminNav.tsx`
- [x] T016 [US1] Create protected administrative layout shell with session check in `src/app/admin/layout.tsx`
- [x] T017 [US1] Create administrative dashboard overview and quick statistics in `src/app/admin/page.tsx`

**Checkpoint**: User Story 1 is functional. Admin can log in, navigate the admin shell, and log out.

---

## Phase 4: User Story 2 - Client & Project Management (Priority: P1)

**Goal**: Administrator can register, list, search, view, and edit clients and their deliverables (websites, web systems, apps).

**Independent Test**: Register a new client with documents and contact info, link a project, search by name, and update client details.

- [x] T018 [P] [US2] Implement Client and Project Server Actions (`createClientAction`, `updateClientAction`, `deleteClientAction`, `getClientsAction`, `addClientProjectAction`) in `src/app/admin/actions/client.actions.ts`
- [x] T019 [P] [US2] Create Client creation and edit modal form in `src/components/features/admin/ClientModal.tsx`
- [x] T020 [US2] Create Client directory table with search, filters, and project badges in `src/components/features/admin/ClientTable.tsx`
- [x] T021 [US2] Build Client Management page in `src/app/admin/clients/page.tsx`

**Checkpoint**: User Stories 1 and 2 work independently. Client catalog is fully operational in Neon Postgres.

---

## Phase 5: User Story 3 - Provider Settings & Service Receipt Generation (Priority: P2)

**Goal**: Configure default service provider data once and issue formal "Recibos de Prestação de Serviços" with auto-fill, BRL currency formatting, and valor por extenso.

**Independent Test**: Update provider settings (Pix key, CNPJ/CPF), issue a receipt for a client, and verify that the formatted formal receipt preview renders with all Brazilian receipt standards.

- [x] T022 [P] [US3] Implement Provider Settings Server Actions (`getProviderSettingsAction`, `updateProviderSettingsAction`) in `src/app/admin/actions/provider.actions.ts`
- [x] T023 [P] [US3] Create Provider Settings editor component in `src/components/features/admin/ProviderSettingsForm.tsx`
- [x] T024 [US3] Build Provider Settings configuration page in `src/app/admin/settings/page.tsx`
- [x] T025 [P] [US3] Implement BRL currency formatting and Brazilian "valor por extenso" generator in `src/lib/currency.ts`
- [x] T026 [P] [US3] Implement Service Receipt Server Actions (`createReceiptAction`, `getReceiptsAction`, `getReceiptByIdAction`, `deleteReceiptAction`) in `src/app/admin/actions/receipt.actions.ts`
- [x] T027 [US3] Create Receipt issuance form with client auto-population in `src/components/features/admin/ReceiptForm.tsx`
- [x] T028 [US3] Create formal printable Brazilian Service Receipt document view component in `src/components/features/admin/ReceiptDocument.tsx`
- [x] T029 [US3] Build New Receipt emission page in `src/app/admin/receipts/new/page.tsx`
- [x] T030 [US3] Build Receipts History directory page in `src/app/admin/receipts/page.tsx`

**Checkpoint**: Receipts can be configured, issued, previewed, and listed in history.

---

## Phase 6: User Story 4 - Receipt Export to PDF and Email Dispatch via Resend (Priority: P2)

**Goal**: Export high-fidelity vector PDF receipts for direct download and provide an optional one-click button to send receipts to the client's email address via Resend.

**Independent Test**: Download the PDF of an issued receipt and verify print quality; click "Enviar por E-mail" to verify transactional delivery via Resend.

- [x] T031 [P] [US4] Implement high-resolution vector PDF generator and client-side downloader in `src/lib/pdf.ts`
- [x] T032 [P] [US4] Implement structured HTML receipt email template and Resend dispatch logic in `src/lib/resend-receipt.ts`
- [x] T033 [US4] Implement send receipt email Server Action (`sendReceiptEmailAction`) in `src/app/admin/actions/receipt-email.actions.ts`
- [x] T034 [US4] Build Receipt Detail page with PDF Download button, Print preview, and optional Resend Email Dispatch in `src/app/admin/receipts/[id]/page.tsx`

**Checkpoint**: Full SDD cycle complete. Receipts can be downloaded as PDF and optionally sent by email.

---

## Phase 7: Polish, Quality & Cross-Cutting Concerns

**Purpose**: Security auditing, responsiveness, and zero-public-link verification

- [x] T035 Audit public components (`Header`, `Footer`, `MobileNav`) to guarantee zero public links or visual references to `/admin` exist
- [x] T036 [P] Verify responsive design and dark cyberpunk tech aesthetics consistency for all admin views in `src/app/admin/`
- [x] T037 Run TypeScript typecheck (`npx tsc --noEmit`) and linting (`npm run lint`) to ensure zero errors and clean build
- [x] T038 Validate full end-to-end flow following `quickstart.md`
