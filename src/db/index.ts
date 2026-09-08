import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  // In build time or test without DB, fallback gracefully or log
  console.warn("⚠️ DATABASE_URL não foi definida em process.env.");
}

const sql = neon(connectionString || "postgresql://mock:mock@localhost/mock");
export const db = drizzle(sql, { schema });
