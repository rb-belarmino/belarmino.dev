import { db } from "@/db";
import { clients, providerSettings } from "@/db/schema";
import { desc } from "drizzle-orm";
import { ReceiptForm } from "@/components/features/admin/ReceiptForm";

export const dynamic = "force-dynamic";

export default async function NewReceiptPage({
  searchParams,
}: {
  searchParams: Promise<{ clientId?: string }>;
}) {
  const { clientId } = await searchParams;

  let allClients: (typeof clients.$inferSelect)[] = [];
  let provider = null;

  try {
    allClients = await db.select().from(clients).orderBy(desc(clients.name));
    const providerList = await db.select().from(providerSettings).limit(1);
    if (providerList.length > 0) {
      provider = providerList[0];
    }
  } catch (err) {
    console.error("Erro ao carregar dados para emissão de recibo:", err);
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white tracking-tight">Emissão de Recibo</h1>
        <p className="text-slate-400 text-xs mt-1">
          Gere um documento fiscal de quitação de serviços prestados para seu cliente.
        </p>
      </div>

      <ReceiptForm
        clients={allClients}
        provider={provider}
        preSelectedClientId={clientId}
      />
    </div>
  );
}
