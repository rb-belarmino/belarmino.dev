"use server";

import { z } from "zod";
import { db } from "@/db";
import { serviceReceipts } from "@/db/schema";
import { eq, count } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { generateBoletoLinhaDigitavel } from "@/lib/barcode";

const CreateReceiptSchema = z.object({
  documentType: z.enum(["receipt", "boleto"]).default("receipt"),
  clientId: z.string().optional().nullable(),
  clientName: z.string().min(2, "Nome do cliente é obrigatório"),
  clientDocument: z.string().optional(),
  clientAddress: z.string().optional(),
  clientEmail: z.string().email("E-mail inválido").optional().or(z.literal("")),
  providerName: z.string().min(2, "Nome do prestador é obrigatório"),
  providerDoc: z.string().min(5, "Documento do prestador é obrigatório"),
  providerPix: z.string().optional(),
  providerBank: z.string().optional(),
  serviceDescription: z.string().min(5, "Descrição dos serviços é obrigatória"),
  amount: z.number().positive("Valor deve ser maior que zero"),
  paymentMethod: z.string().min(1, "Método de pagamento é obrigatório"),
  issueDate: z.string().min(10, "Data de emissão é obrigatória"),
  dueDate: z.string().optional(),
  instructions: z.string().optional(),
});

export async function createReceiptAction(data: z.infer<typeof CreateReceiptSchema>) {
  const validated = CreateReceiptSchema.safeParse(data);
  if (!validated.success) {
    return { error: "Dados inválidos para geração do documento." };
  }

  const {
    documentType,
    clientId,
    clientName,
    clientDocument,
    clientAddress,
    clientEmail,
    providerName,
    providerDoc,
    providerPix,
    providerBank,
    serviceDescription,
    amount,
    paymentMethod,
    issueDate,
    dueDate,
    instructions,
  } = validated.data;

  let newReceiptId: string | null = null;

  try {
    const currentYear = new Date().getFullYear();
    const totalCount = await db.select({ value: count() }).from(serviceReceipts);
    const prefix = documentType === "boleto" ? "BOL" : "REC";
    const nextSeq = ((totalCount[0]?.value || 0) + 1).toString().padStart(4, "0");
    const receiptNumber = `${prefix}-${currentYear}-${nextSeq}`;

    const amountCents = Math.round(amount * 100);
    const barcodeLine = documentType === "boleto" ? generateBoletoLinhaDigitavel(receiptNumber, amountCents) : null;

    const inserted = await db
      .insert(serviceReceipts)
      .values({
        documentType,
        receiptNumber,
        clientId: clientId || null,
        clientNameSnapshot: clientName.trim(),
        clientDocumentSnapshot: clientDocument?.trim() || null,
        clientAddressSnapshot: clientAddress?.trim() || null,
        clientEmailSnapshot: clientEmail?.trim() || null,
        providerNameSnapshot: providerName.trim(),
        providerDocSnapshot: providerDoc.trim(),
        providerPixSnapshot: providerPix?.trim() || null,
        providerBankSnapshot: providerBank?.trim() || null,
        serviceDescription: serviceDescription.trim(),
        amountCents,
        paymentMethod,
        issueDate,
        dueDate: dueDate || null,
        barcodeLine,
        instructions: instructions?.trim() || null,
        status: "issued",
      })
      .returning({ id: serviceReceipts.id });

    newReceiptId = inserted[0]?.id;
  } catch (err) {
    console.error("Erro ao emitir documento:", err);
    return { error: "Falha ao gravar no banco de dados." };
  }

  revalidatePath("/admin/receipts");
  revalidatePath("/admin");
  if (newReceiptId) {
    redirect(`/admin/receipts/${newReceiptId}`);
  }
  return { success: true };
}

export async function deleteReceiptAction(receiptId: string) {
  try {
    await db.delete(serviceReceipts).where(eq(serviceReceipts.id, receiptId));
    revalidatePath("/admin/receipts");
    revalidatePath("/admin");
    return { success: true };
  } catch (err) {
    console.error("Erro ao excluir documento:", err);
    return { error: "Falha ao excluir documento." };
  }
}

export async function markAsPaidAction(receiptId: string) {
  try {
    await db
      .update(serviceReceipts)
      .set({
        status: "paid",
        paidAt: new Date(),
      })
      .where(eq(serviceReceipts.id, receiptId));

    revalidatePath(`/admin/receipts/${receiptId}`);
    revalidatePath("/admin/receipts");
    revalidatePath("/admin");
    return { success: true };
  } catch (err) {
    console.error("Erro ao dar baixa no documento:", err);
    return { error: "Falha ao marcar como pago." };
  }
}

export async function markAsPendingAction(receiptId: string) {
  try {
    await db
      .update(serviceReceipts)
      .set({
        status: "issued",
        paidAt: null,
      })
      .where(eq(serviceReceipts.id, receiptId));

    revalidatePath(`/admin/receipts/${receiptId}`);
    revalidatePath("/admin/receipts");
    revalidatePath("/admin");
    return { success: true };
  } catch (err) {
    console.error("Erro ao reverter status do documento:", err);
    return { error: "Falha ao reverter status." };
  }
}
