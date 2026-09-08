# Feature Specification: Admin Portal with Client Management & Service Receipt Generation

**Feature Branch**: `003-admin-clients-receipts`

**Created**: 2026-09-08

**Status**: Ready for Planning

**Input**: User description: "local administrativo no site que devera ser logado com uma autenticacao simples (usuario e senha). Nessa parte administrativa tera uma area de gerenciar meus clientes que no qual desenvolvo, sites, sistemas, etc. Tambem tera uma area de gerar um Recibo de Prestacao de Servico para eu enviar para os meus clientes. Tanto opcao de envio por email e salvar em PDF."

## Clarifications

### Session 2026-09-08

- Q: Como os dados administrativos (sessão, clientes cadastrados e histórico de recibos) devem ser armazenados e persistidos? → A: Banco de dados relacional na nuvem via Neon (Serverless Postgres) integrado ao Next.js para gerenciamento centralizado de clientes, recibos e autenticação administrativa.
- Q: Como o sistema deve processar o envio de e-mails com os recibos para os clientes? → A: Envio transacional direto no servidor via API do Resend (já integrada ao projeto), enviando o recibo estruturado com anexo em PDF e confirmação imediata.
- Q: Como as informações do emissor do recibo (dados do prestador: Nome, CPF/CNPJ, Chave Pix, Telefone, Cidade/UF) devem ser gerenciadas? → A: Aba/tela de "Configurações do Prestador" no painel administrativo persistida no Neon Postgres, preenchendo automaticamente os dados do emissor em todos os recibos gerados.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Authentication & Protected Admin Access (Priority: P1)

As the website owner and administrator, I need to log into a private administrative area using a secure username and password so that unauthorized visitors cannot access my client data or generate official receipts in my name.

**Why this priority**: Access control is the foundation for managing sensitive client records and financial receipts.

**Independent Test**: Can be tested by attempting to access protected administrative routes without credentials (expecting redirection to the login view) and logging in with valid credentials to gain access to the dashboard.

**Acceptance Scenarios**:

1. **Given** an unauthenticated visitor, **When** they try to access any administrative URL (`/admin/*`), **Then** they are redirected to the `/admin/login` page with an appropriate notice.
2. **Given** the login screen, **When** the administrator submits valid credentials, **Then** an authenticated session is established and they are redirected to the administrative dashboard.
3. **Given** the login screen, **When** invalid credentials are submitted, **Then** access is denied with a clear error message without revealing which credential part was incorrect.
4. **Given** an authenticated session, **When** the administrator clicks "Logout", **Then** the session is terminated and subsequent requests to admin routes require re-authentication.

---

### User Story 2 - Client & Project Management (Priority: P1)

As an administrator and freelance software engineer, I want to register, list, view, edit, and manage my clients and the systems/websites I build for them so that I have a centralized catalog of my professional relationships and contracts.

**Why this priority**: Managing clients is essential for organizing deliverables and providing the necessary recipient data for issuing receipts.

**Independent Test**: Can be tested by creating a client record with company/personal details and linked projects (e.g., website, custom ERP), listing existing clients with search/filters, and updating their information.

**Acceptance Scenarios**:

1. **Given** the client management dashboard, **When** the administrator fills in the client form (name, contact email, phone, document/CPF/CNPJ, address/location, and project types) and saves, **Then** the client record is created and persists in Neon Postgres.
2. **Given** an existing client, **When** the administrator edits their contact information or adds a newly contracted service/website, **Then** the updated details are saved and reflected immediately.
3. **Given** multiple registered clients, **When** the administrator searches by client name, project type, or document, **Then** the list filters instantly to show matching results.
4. **Given** a client entry, **When** the administrator views the client profile, **Then** all historical projects and generated receipts associated with that client are clearly displayed.

---

### User Story 3 - Provider Settings & Service Receipt Generation (Priority: P2)

As a service provider, I want to configure my professional details (Name, CPF/CNPJ, PIX key, contact, City/State) in a settings area and generate customized "Recibos de Prestação de Serviços" linked to a client so that I can document payments and deliver formal proof of service with minimal manual typing.

**Why this priority**: Automating provider data and generating accurate receipts directly from the admin panel streamlines freelance billing and operations.

**Independent Test**: Can be tested by updating provider settings, selecting a registered client, specifying service items, total monetary value, and payment method, and previewing the generated formal receipt document.

**Acceptance Scenarios**:

1. **Given** the Provider Settings area, **When** the administrator updates their professional info (Name, CPF/CNPJ, Pix Key, Phone, City/State), **Then** the settings are saved in Neon Postgres and used as defaults for future receipts.
2. **Given** the receipt generator form, **When** the administrator selects a registered client, **Then** recipient details and provider defaults are automatically populated into the receipt.
3. **Given** the receipt generator form, **When** the administrator inputs the service description, total amount in BRL, payment date, and payment method, **Then** a standardized, formal receipt preview is rendered and stored in Neon Postgres.
4. **Given** the receipt preview, **When** the administrator verifies the data, **Then** the values are formatted in accordance with Brazilian service receipt conventions (monetary value in BRL, date formatting, and value in full words).

---

### User Story 4 - Receipt Export to PDF and Email Dispatch via Resend (Priority: P2)

As an administrator, I want to export the generated receipt as a downloadable PDF file or send it directly to the client's email address via Resend so that I can deliver proof of payment seamlessly through digital channels.

**Why this priority**: Completes the receipt lifecycle by enabling digital distribution and offline archiving.

**Independent Test**: Can be tested by generating a receipt, triggering "Save as PDF" to verify a clean printable document is downloaded, and triggering "Send by Email" to verify receipt delivery through Resend API.

**Acceptance Scenarios**:

1. **Given** a generated receipt preview, **When** the administrator clicks "Salvar em PDF" (Download PDF), **Then** a high-fidelity PDF document formatted for printing/archiving is generated and downloaded to the administrator's device.
2. **Given** a generated receipt preview with a valid client email, **When** the administrator clicks "Enviar por E-mail", **Then** the system dispatches the email via the Resend API (with PDF attachment / structured HTML receipt) to the client's email and confirms delivery.
3. **Given** an email dispatch action, **When** the client email is missing or the Resend API returns an error, **Then** an explicit error alert is presented with an option to retry or export via PDF manually.

---

### Edge Cases

- **Session Expiration / Interruption**: If the admin session expires while creating a client or receipt, data entered in the active form should be protected from accidental loss or prompted gracefully before reload.
- **Empty or Incomplete Receipt Details**: Attempting to generate or export a receipt without mandatory fields (e.g., recipient name, service description, or positive monetary value) must be blocked with field-level validation cues.
- **Special Characters in Receipt & PDF Rendering**: Names, legal Brazilian documents (CNPJ/CPF format `00.000.000/0000-00`), and monetary formatting (`R$ 1.250,00`) must be preserved and rendered without character corruption in both screen preview and exported PDF.
- **Client Deletion with Historical Receipts**: If a client with past receipts is deleted or archived, existing receipt records must retain their historical recipient snapshot data without broken references.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST provide an administrative login interface accessible via dedicated admin routes (`/admin`).
- **FR-002**: System MUST protect all administrative sub-routes and actions, requiring valid credentials to access.
- **FR-003**: System MUST provide a secure session logout capability that revokes access immediately.
- **FR-004**: System MUST allow creating, viewing, updating, and archiving/deleting client profiles in the Neon Postgres database.
- **FR-005**: System MUST support recording client metadata including full name/corporate name, CPF/CNPJ, email address, phone number, physical address, and associated project/system types.
- **FR-006**: System MUST provide a searchable and filterable client directory interface.
- **FR-007**: System MUST provide a dedicated Provider Settings area to manage default issuer information (Name, CPF/CNPJ, Pix Key, Phone, City/State).
- **FR-008**: System MUST provide a formal "Recibo de Prestação de Serviços" generation tool.
- **FR-009**: System MUST allow selecting an existing client or manually entering recipient details for receipt generation.
- **FR-010**: System MUST allow specifying provider details, service description, monetary amount (in BRL), payment method, and issue date on receipts.
- **FR-011**: System MUST render an on-screen preview of the formatted receipt before export.
- **FR-012**: System MUST generate and export clean, print-ready PDF files of the receipt.
- **FR-013**: System MUST allow dispatching the receipt directly to the client's email address via Resend API.
- **FR-014**: System MUST validate all input fields (email format, positive currency values, mandatory fields) before submission.
- **FR-015**: System MUST store and maintain a history of issued receipts in Neon Postgres for future consultation and re-printing.

### Key Entities *(include if feature involves data)*

- **Admin User / Session**: Represents the authenticated administrator account and active session state.
- **Provider Settings**: Represents the professional issuer's default data stored in Neon Postgres (`name`, `document`, `pixKey`, `phone`, `email`, `cityState`).
- **Client**: Represents a business or individual client. Key attributes: `id`, `name`, `document` (CPF/CNPJ), `email`, `phone`, `company`, `address`, `projectTypes`, `notes`, `createdAt`, `updatedAt`.
- **Project / Service Record**: Represents a deliverable associated with a client (e.g., website, web app, consulting). Key attributes: `id`, `clientId`, `title`, `description`, `status`, `deliveryDate`.
- **Service Receipt (Recibo)**: Represents an issued formal receipt stored in Neon Postgres. Key attributes: `id`, `receiptNumber`, `clientId`, `recipientSnapshot` (name, document, address), `providerSnapshot` (name, document, contact, pixKey), `serviceDescription`, `amount`, `paymentMethod`, `issueDate`, `status` (Draft, Issued, Sent), `createdAt`.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: The administrator can log in and access the admin dashboard in under 3 seconds.
- **SC-002**: The administrator can register a new client and project in under 1 minute.
- **SC-003**: Generating a complete service receipt from an existing client and exporting it to PDF takes under 30 seconds.
- **SC-004**: 100% of exported PDF receipts match the on-screen preview visual formatting and print layout standards.
- **SC-005**: 100% of unauthorized attempts to access `/admin/*` routes are blocked and redirected to the login interface.

## Assumptions

- **Single Admin Operator**: The admin area is tailored for the sole owner/developer of the portfolio (`belarmino.dev`) to manage their direct client engagements.
- **Database Engine**: Neon Serverless Postgres is used as the centralized cloud database with environment variables (`DATABASE_URL`).
- **Transactional Mail Service**: Resend API is utilized for outbound receipt emails with configured `RESEND_API_KEY`.
- **Localization**: The receipt layout, currency conventions (`R$ / BRL`), date format (`DD/MM/YYYY`), and terminology are primarily localized to Portuguese (Brazil) / Brazilian fiscal conventions for autonomous service providers.
- **Responsive Layout**: While primarily used on desktop for administrative work, the admin UI is responsive across tablet and mobile viewport sizes.
