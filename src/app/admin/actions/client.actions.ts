"use server";

import { z } from "zod";
import { db } from "@/db";
import { clients, clientProjects } from "@/db/schema";
import { eq, desc, ilike, or } from "drizzle-orm";
import { revalidatePath } from "next/cache";

const ClientSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(2, "Nome é obrigatório"),
  company: z.string().optional(),
  document: z.string().optional(),
  email: z.string().email("E-mail inválido").optional().or(z.literal("")),
  phone: z.string().optional(),
  address: z.string().optional(),
  projectTypes: z.array(z.string()).default([]),
  notes: z.string().optional(),
});

export async function getClientsAction(searchQuery?: string) {
  try {
    if (searchQuery && searchQuery.trim()) {
      const q = `%${searchQuery.trim()}%`;
      return await db
        .select()
        .from(clients)
        .where(
          or(
            ilike(clients.name, q),
            ilike(clients.company, q),
            ilike(clients.email, q),
            ilike(clients.document, q)
          )
        )
        .orderBy(desc(clients.createdAt));
    }

    return await db.select().from(clients).orderBy(desc(clients.createdAt));
  } catch (err) {
    console.error("Erro ao buscar clientes:", err);
    return [];
  }
}

export async function getClientWithProjectsAction(clientId: string) {
  try {
    const clientList = await db.select().from(clients).where(eq(clients.id, clientId)).limit(1);
    if (clientList.length === 0) return null;

    const projectsList = await db
      .select()
      .from(clientProjects)
      .where(eq(clientProjects.clientId, clientId))
      .orderBy(desc(clientProjects.createdAt));

    return {
      ...clientList[0],
      projects: projectsList,
    };
  } catch (err) {
    console.error("Erro ao carregar detalhes do cliente:", err);
    return null;
  }
}

export async function saveClientAction(data: z.infer<typeof ClientSchema>) {
  const validated = ClientSchema.safeParse(data);
  if (!validated.success) {
    return { error: "Dados inválidos. Verifique os campos do formulário." };
  }

  const { id, name, company, document, email, phone, address, projectTypes, notes } = validated.data;

  try {
    if (id) {
      // Update existing
      await db
        .update(clients)
        .set({
          name: name.trim(),
          company: company?.trim() || null,
          document: document?.trim() || null,
          email: email?.trim() || null,
          phone: phone?.trim() || null,
          address: address?.trim() || null,
          projectTypes,
          notes: notes?.trim() || null,
          updatedAt: new Date(),
        })
        .where(eq(clients.id, id));
    } else {
      // Create new
      await db.insert(clients).values({
        name: name.trim(),
        company: company?.trim() || null,
        document: document?.trim() || null,
        email: email?.trim() || null,
        phone: phone?.trim() || null,
        address: address?.trim() || null,
        projectTypes,
        notes: notes?.trim() || null,
      });
    }

    revalidatePath("/admin/clients");
    revalidatePath("/admin");
    return { success: true };
  } catch (err) {
    console.error("Erro ao salvar cliente:", err);
    return { error: "Falha ao gravar cliente no banco de dados." };
  }
}

export async function deleteClientAction(clientId: string) {
  try {
    await db.delete(clients).where(eq(clients.id, clientId));
    revalidatePath("/admin/clients");
    revalidatePath("/admin");
    return { success: true };
  } catch (err) {
    console.error("Erro ao excluir cliente:", err);
    return { error: "Falha ao remover cliente." };
  }
}

const ProjectSchema = z.object({
  clientId: z.string().uuid(),
  title: z.string().min(2, "Título é obrigatório"),
  description: z.string().optional(),
  url: z.string().optional(),
  status: z.string().default("active"),
  deliveryDate: z.string().optional(),
});

export async function addClientProjectAction(data: z.infer<typeof ProjectSchema>) {
  const validated = ProjectSchema.safeParse(data);
  if (!validated.success) {
    return { error: "Dados do projeto inválidos." };
  }

  try {
    await db.insert(clientProjects).values({
      clientId: validated.data.clientId,
      title: validated.data.title.trim(),
      description: validated.data.description?.trim() || null,
      url: validated.data.url?.trim() || null,
      status: validated.data.status,
      deliveryDate: validated.data.deliveryDate || null,
    });

    revalidatePath("/admin/clients");
    return { success: true };
  } catch (err) {
    console.error("Erro ao adicionar projeto do cliente:", err);
    return { error: "Falha ao gravar projeto." };
  }
}
