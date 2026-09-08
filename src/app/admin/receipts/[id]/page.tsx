import { notFound } from "next/navigation";
import { db } from "@/db";
import { serviceReceipts } from "@/db/schema";
import { eq } from "drizzle-orm";
import { ReceiptDetailClient } from "@/components/features/admin/ReceiptDetailClient";

export const dynamic = "force-dynamic";

export default async function ReceiptDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  let receipt = null;

  try {
    const list = await db
      .select()
      .from(serviceReceipts)
      .where(eq(serviceReceipts.id, id))
      .limit(1);

    if (list.length > 0) {
      receipt = list[0];
    }
  } catch (err) {
    console.error("Erro ao carregar recibo:", err);
  }

  if (!receipt) {
    notFound();
  }

  return <ReceiptDetailClient receipt={receipt} />;
}
