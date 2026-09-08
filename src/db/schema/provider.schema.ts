import { pgTable, uuid, varchar, timestamp } from "drizzle-orm/pg-core";

export const providerSettings = pgTable("provider_settings", {
  id: uuid("id").defaultRandom().primaryKey(),
  fullName: varchar("full_name", { length: 255 }).notNull().default("Rodrigo Belarmino"),
  document: varchar("document", { length: 50 }).notNull().default("000.000.000-00"),
  pixKey: varchar("pix_key", { length: 100 }).default(""),
  phone: varchar("phone", { length: 50 }).default(""),
  email: varchar("email", { length: 255 }).default("contato@belarmino.dev"),
  cityState: varchar("city_state", { length: 100 }).notNull().default("São Paulo - SP"),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export type ProviderSettings = typeof providerSettings.$inferSelect;
export type NewProviderSettings = typeof providerSettings.$inferInsert;
