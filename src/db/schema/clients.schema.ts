import { pgTable, uuid, varchar, text, timestamp } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

export const clients = pgTable("clients", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  company: varchar("company", { length: 255 }),
  document: varchar("document", { length: 50 }),
  email: varchar("email", { length: 255 }),
  phone: varchar("phone", { length: 50 }),
  address: text("address"),
  projectTypes: text("project_types").array().default([]),
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const clientProjects = pgTable("client_projects", {
  id: uuid("id").defaultRandom().primaryKey(),
  clientId: uuid("client_id")
    .notNull()
    .references(() => clients.id, { onDelete: "cascade" }),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description"),
  url: varchar("url", { length: 255 }),
  status: varchar("status", { length: 50 }).notNull().default("active"),
  deliveryDate: varchar("delivery_date", { length: 20 }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const clientsRelations = relations(clients, ({ many }) => ({
  projects: many(clientProjects),
}));

export const clientProjectsRelations = relations(clientProjects, ({ one }) => ({
  client: one(clients, {
    fields: [clientProjects.clientId],
    references: [clients.id],
  }),
}));

export type Client = typeof clients.$inferSelect;
export type NewClient = typeof clients.$inferInsert;
export type ClientProject = typeof clientProjects.$inferSelect;
export type NewClientProject = typeof clientProjects.$inferInsert;
