"use server";

import { db } from "@/db";
import { serviceReceipts } from "@/db/schema";
import { eq } from "drizzle-orm";
import { sendReceiptEmail } from "@/lib/resend-receipt";
import { revalidatePath } from "next/cache";

export async function sendReceiptEmailAction(receiptId: string, customNote?: string, overrideEmail?: string) {
  try {
    const list = await db
      .select()
      .from(serviceReceipts)
      .where(eq(serviceReceipts.id, receiptId))
      .limit(1);

    if (list.length === 0) {
      return { error: "Documento não encontrado." };
    }

    const receipt = list[0];
    const destinationEmail = overrideEmail || receipt.clientEmailSnapshot;

    if (!destinationEmail || !destinationEmail.trim()) {
      return { error: "Nenhum e-mail de destinatário informado para envio." };
    }

    await sendReceiptEmail({
      documentType: receipt.documentType,
      receiptNumber: receipt.receiptNumber,
      clientName: receipt.clientNameSnapshot,
      clientEmail: destinationEmail.trim(),
      providerName: receipt.providerNameSnapshot,
      providerDoc: receipt.providerDocSnapshot,
      providerPix: receipt.providerPixSnapshot,
      serviceDescription: receipt.serviceDescription,
      amountCents: receipt.amountCents,
      paymentMethod: receipt.paymentMethod,
      issueDate: receipt.issueDate,
      dueDate: receipt.dueDate,
      barcodeLine: receipt.barcodeLine,
      customNote,
    });

    // Update receipt status and sent timestamp (and email snapshot if previously empty)
    await db
      .update(serviceReceipts)
      .set({
        status: "sent",
        clientEmailSnapshot: destinationEmail.trim(),
        sentAt: new Date(),
      })
      .where(eq(serviceReceipts.id, receiptId));

    revalidatePath(`/admin/receipts/${receiptId}`);
    revalidatePath("/admin/receipts");
    return { success: true };
  } catch (err: unknown) {
    console.error("Erro ao despachar documento por e-mail:", err);
    const msg = err instanceof Error ? err.message : "Erro desconhecido ao enviar e-mail via Resend.";
    return { error: msg };
  }
}
