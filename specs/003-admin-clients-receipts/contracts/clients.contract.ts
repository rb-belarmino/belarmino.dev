import { z } from "zod";

export const ClientInputSchema = z.object({
  name: z.string().min(2, "Nome é obrigatório"),
  company: z.string().optional().nullable(),
  document: z.string().optional().nullable(),
  email: z.string().email("E-mail inválido"),
  phone: z.string().optional().nullable(),
  address: z.string().optional().nullable(),
  projectTypes: z.array(z.string()).default([]),
  notes: z.string().optional().nullable(),
});

export type ClientInput = z.infer<typeof ClientInputSchema>;

export interface ClientDTO {
  id: string;
  name: string;
  company: string | null;
  document: string | null;
  email: string;
  phone: string | null;
  address: string | null;
  projectTypes: string[];
  notes: string | null;
  createdAt: string;
  updatedAt: string;
}

export const ClientProjectInputSchema = z.object({
  clientId: z.string().uuid(),
  title: z.string().min(2, "Título do projeto é obrigatório"),
  description: z.string().optional().nullable(),
  url: z.string().url("URL inválida").optional().nullable().or(z.literal("")),
  status: z.enum(["planning", "in_progress", "delivered", "maintenance"]).default("planning"),
  deliveryDate: z.string().optional().nullable(),
});

export type ClientProjectInput = z.infer<typeof ClientProjectInputSchema>;
