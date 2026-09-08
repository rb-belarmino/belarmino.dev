"use server";

import { z } from "zod";
import { db } from "@/db";
import { providerSettings } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

const ProviderSchema = z.object({
  fullName: z.string().min(2, "Nome ou Razão Social é obrigatório"),
  document: z.string().min(11, "CPF ou CNPJ é obrigatório"),
  pixKey: z.string().optional(),
  phone: z.string().optional(),
  email: z.string().email("E-mail inválido").optional().or(z.literal("")),
  cityState: z.string().min(2, "Cidade e Estado são obrigatórios"),
  bankName: z.string().optional(),
  bankAgency: z.string().optional(),
  bankAccount: z.string().optional(),
  bankAccountType: z.string().optional(),
});

export async function getProviderSettingsAction() {
  try {
    const list = await db.select().from(providerSettings).limit(1);
    if (list.length > 0) return list[0];
    return null;
  } catch (err) {
    console.error("Erro ao buscar configurações do prestador:", err);
    return null;
  }
}

export async function updateProviderSettingsAction(data: z.infer<typeof ProviderSchema>) {
  const validated = ProviderSchema.safeParse(data);
  if (!validated.success) {
    return { error: "Dados inválidos. Verifique os campos." };
  }

  const {
    fullName,
    document,
    pixKey,
    phone,
    email,
    cityState,
    bankName,
    bankAgency,
    bankAccount,
    bankAccountType,
  } = validated.data;

  try {
    const list = await db.select().from(providerSettings).limit(1);

    const values = {
      fullName: fullName.trim(),
      document: document.trim(),
      pixKey: pixKey?.trim() || null,
      phone: phone?.trim() || null,
      email: email?.trim() || null,
      cityState: cityState.trim(),
      bankName: bankName?.trim() || null,
      bankAgency: bankAgency?.trim() || null,
      bankAccount: bankAccount?.trim() || null,
      bankAccountType: bankAccountType?.trim() || "Conta Corrente",
      updatedAt: new Date(),
    };

    if (list.length > 0) {
      await db
        .update(providerSettings)
        .set(values)
        .where(eq(providerSettings.id, list[0].id));
    } else {
      await db.insert(providerSettings).values(values);
    }

    revalidatePath("/admin/settings");
    revalidatePath("/admin/receipts/new");
    return { success: true };
  } catch (err) {
    console.error("Erro ao atualizar configurações do prestador:", err);
    return { error: "Falha ao gravar no banco de dados." };
  }
}
