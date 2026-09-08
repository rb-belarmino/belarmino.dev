# Data Model: Admin Portal, Clients & Service Receipts

**Feature**: `003-admin-clients-receipts`  
**Date**: 2026-09-08  
**ORM**: Drizzle ORM (PostgreSQL dialect)

## Entity Relationship Diagram

```text
+-------------------+       1:N       +-------------------+
|      clients      | --------------> |  service_receipts |
+-------------------+                 +-------------------+
| id (UUID / PK)    |                 | id (UUID / PK)    |
| name (VARCHAR)    |                 | receipt_number    |
| document (VARCHAR)|                 | client_id (FK)    |
| email (VARCHAR)   |                 | amount (DECIMAL)  |
| phone (VARCHAR)   |                 | issue_date (DATE) |
| company (VARCHAR) |                 | description (TEXT)|
| address (TEXT)    |                 | status (VARCHAR)  |
| project_types     |                 | ...snapshot_data  |
+-------------------+                 +-------------------+
          | 1:N
          v
+-------------------+
|  client_projects  |
+-------------------+
| id (UUID / PK)    |
| client_id (FK)    |
| title (VARCHAR)   |
| description (TEXT)|
| status (VARCHAR)  |
| url (VARCHAR)     |
+-------------------+

+-------------------+                 +-------------------+
|    admin_users    |                 | provider_settings |
+-------------------+                 +-------------------+
| id (UUID / PK)    |                 | id (UUID / PK)    |
| username (VARCHAR)|                 | full_name (VARCHAR|
| password_hash     |                 | document (VARCHAR)|
| created_at        |                 | pix_key (VARCHAR) |
+-------------------+                 | phone (VARCHAR)   |
                                      | city_state        |
                                      +-------------------+
```

## Drizzle Schema Specifications

### 1. `admin_users`
Stores credentials for the administrator account.

| Column | Type | Constraints | Description |
|---|---|---|---|
| `id` | `uuid` | Primary Key, Default `gen_random_uuid()` | Unique user identifier |
| `username` | `varchar(100)` | Not Null, Unique | Admin login username |
| `password_hash` | `text` | Not Null | Bcrypt hashed password |
| `created_at` | `timestamp` | Default `now()`, Not Null | Record creation date |
| `updated_at` | `timestamp` | Default `now()`, Not Null | Last update timestamp |

### 2. `provider_settings`
Stores the freelance developer / service provider default configuration for receipts.

| Column | Type | Constraints | Description |
|---|---|---|---|
| `id` | `uuid` | Primary Key, Default `gen_random_uuid()` | Unique config ID |
| `full_name` | `varchar(255)` | Not Null | Nome completo ou Razão Social |
| `document` | `varchar(50)` | Not Null | CPF ou CNPJ do prestador |
| `pix_key` | `varchar(100)` | Nullable | Chave Pix para recebimento |
| `phone` | `varchar(50)` | Nullable | Telefone/WhatsApp profissional |
| `email` | `varchar(255)` | Nullable | E-mail profissional |
| `city_state` | `varchar(100)` | Not Null | Cidade e Estado (ex: "São Paulo - SP") |
| `updated_at` | `timestamp` | Default `now()`, Not Null | Last update timestamp |

### 3. `clients`
Stores individual and corporate client profiles.

| Column | Type | Constraints | Description |
|---|---|---|---|
| `id` | `uuid` | Primary Key, Default `gen_random_uuid()` | Unique client identifier |
| `name` | `varchar(255)` | Not Null | Nome do cliente ou contato principal |
| `company` | `varchar(255)` | Nullable | Nome da empresa / Razão Social |
| `document` | `varchar(50)` | Nullable | CPF ou CNPJ do cliente |
| `email` | `varchar(255)` | Not Null | E-mail de contato e envio |
| `phone` | `varchar(50)` | Nullable | Telefone / WhatsApp |
| `address` | `text` | Nullable | Endereço completo para o recibo |
| `project_types` | `text[]` | Default `'{}'` | Tags de serviços (Website, Sistema Web, Mobile, etc.) |
| `notes` | `text` | Nullable | Anotações internas do cliente |
| `created_at` | `timestamp` | Default `now()`, Not Null | Data de cadastro |
| `updated_at` | `timestamp` | Default `now()`, Not Null | Data de atualização |

### 4. `client_projects`
Stores deliverables and systems contracted/developed for a client.

| Column | Type | Constraints | Description |
|---|---|---|---|
| `id` | `uuid` | Primary Key, Default `gen_random_uuid()` | Unique project record ID |
| `client_id` | `uuid` | Not Null, References `clients(id)` ON DELETE CASCADE | ID do cliente vinculado |
| `title` | `varchar(255)` | Not Null | Nome do projeto (ex: "E-commerce Belarmino") |
| `description` | `text` | Nullable | Escopo e detalhes do sistema entregue |
| `url` | `varchar(255)` | Nullable | Link do site/sistema em produção |
| `status` | `varchar(50)` | Default `'active'`, Not Null | Status: `planning`, `in_progress`, `delivered`, `maintenance` |
| `delivery_date` | `date` | Nullable | Data de entrega |
| `created_at` | `timestamp` | Default `now()`, Not Null | Data de criação |

### 5. `service_receipts`
Stores formal issued receipts.

| Column | Type | Constraints | Description |
|---|---|---|---|
| `id` | `uuid` | Primary Key, Default `gen_random_uuid()` | Unique receipt ID |
| `receipt_number` | `varchar(50)` | Not Null, Unique | Número formatado (ex: "REC-2026-0001") |
| `client_id` | `uuid` | Nullable, References `clients(id)` ON DELETE SET NULL | Cliente associado |
| `client_name_snapshot` | `varchar(255)` | Not Null | Snapshot do nome do pagador |
| `client_document_snapshot` | `varchar(50)` | Nullable | Snapshot do CPF/CNPJ |
| `client_address_snapshot` | `text` | Nullable | Snapshot do endereço |
| `client_email_snapshot` | `varchar(255)` | Not Null | E-mail do cliente para envio |
| `provider_name_snapshot` | `varchar(255)` | Not Null | Snapshot do prestador |
| `provider_doc_snapshot` | `varchar(50)` | Not Null | Snapshot do documento do prestador |
| `provider_pix_snapshot` | `varchar(100)` | Nullable | Snapshot da chave Pix |
| `service_description` | `text` | Not Null | Discriminação dos serviços prestados |
| `amount_cents` | `integer` | Not Null | Valor monetário em centavos (ex: 350000 = R$ 3.500,00) |
| `payment_method` | `varchar(50)` | Not Null | Método de pagamento (PIX, Transferência, Boleto) |
| `issue_date` | `date` | Not Null | Data de emissão do recibo |
| `status` | `varchar(50)` | Default `'issued'`, Not Null | Status: `draft`, `issued`, `sent` |
| `sent_at` | `timestamp` | Nullable | Timestamp do último envio por e-mail via Resend |
| `created_at` | `timestamp` | Default `now()`, Not Null | Data de criação |

## Validation & Business Rules

1. **Amount In Cents**: All monetary values are stored as integers representing cents (`amount_cents`) to avoid floating-point rounding errors.
2. **Snapshot Integrity**: Client and provider details are duplicated into snapshots on receipt generation so that subsequent updates or deletions to client records never mutate past legal receipts.
3. **Sequential Numbering**: `receipt_number` is auto-generated sequentially per year (e.g., `REC-2026-0001`, `REC-2026-0002`).
