import { pgTable, uuid, varchar, text, integer, timestamp } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { clients } from "./clients.schema";

export const serviceReceipts = pgTable("service_receipts", {
  id: uuid("id").defaultRandom().primaryKey(),
  documentType: varchar("document_type", { length: 50 }).notNull().default("receipt"), // 'receipt' | 'boleto'
  receiptNumber: varchar("receipt_number", { length: 50 }).notNull().unique(),
  clientId: uuid("client_id").references(() => clients.id, { onDelete: "set null" }),
  
  // Snapshots for legal and historical integrity
  clientNameSnapshot: varchar("client_name_snapshot", { length: 255 }).notNull(),
  clientDocumentSnapshot: varchar("client_document_snapshot", { length: 50 }),
  clientAddressSnapshot: text("client_address_snapshot"),
  clientEmailSnapshot: varchar("client_email_snapshot", { length: 255 }),
  
  providerNameSnapshot: varchar("provider_name_snapshot", { length: 255 }).notNull(),
  providerDocSnapshot: varchar("provider_doc_snapshot", { length: 50 }).notNull(),
  providerPixSnapshot: varchar("provider_pix_snapshot", { length: 100 }),
  providerBankSnapshot: text("provider_bank_snapshot"), // Banco, Agência, Conta
  
  serviceDescription: text("service_description").notNull(),
  amountCents: integer("amount_cents").notNull(),
  paymentMethod: varchar("payment_method", { length: 50 }).notNull().default("PIX"),
  issueDate: varchar("issue_date", { length: 20 }).notNull(),
  dueDate: varchar("due_date", { length: 20 }), // For Boletos / Cobranças
  barcodeLine: varchar("barcode_line", { length: 100 }), // Linha digitável
  instructions: text("instructions"), // Instruções adicionais de cobrança
  
  status: varchar("status", { length: 50 }).notNull().default("issued"), // draft, issued, sent, paid
  sentAt: timestamp("sent_at"),
  paidAt: timestamp("paid_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const serviceReceiptsRelations = relations(serviceReceipts, ({ one }) => ({
  client: one(clients, {
    fields: [serviceReceipts.clientId],
    references: [clients.id],
  }),
}));

export type ServiceReceipt = typeof serviceReceipts.$inferSelect;
export type NewServiceReceipt = typeof serviceReceipts.$inferInsert;
