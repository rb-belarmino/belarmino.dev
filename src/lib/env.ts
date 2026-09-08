import { z } from "zod";

const envSchema = z.object({
  DATABASE_URL: z.string().optional(),
  RESEND_API_KEY: z.string().optional(),
  RESEND_FROM_EMAIL: z.string().default("onboarding@resend.dev"),
  ADMIN_AUTH_SECRET: z.string().default("belarmino-admin-secret-jwt-key-change-in-prod-2026"),
  INITIAL_ADMIN_USERNAME: z.string().default("admin"),
  INITIAL_ADMIN_PASSWORD: z.string().default("admin123"),
});

export const env = envSchema.parse({
  DATABASE_URL: process.env.DATABASE_URL,
  RESEND_API_KEY: process.env.RESEND_API_KEY,
  RESEND_FROM_EMAIL: process.env.RESEND_FROM_EMAIL,
  ADMIN_AUTH_SECRET: process.env.ADMIN_AUTH_SECRET,
  INITIAL_ADMIN_USERNAME: process.env.INITIAL_ADMIN_USERNAME,
  INITIAL_ADMIN_PASSWORD: process.env.INITIAL_ADMIN_PASSWORD,
});
