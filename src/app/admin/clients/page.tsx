import { db } from "@/db";
import { clients } from "@/db/schema";
import { desc } from "drizzle-orm";
import { ClientTable } from "@/components/features/admin/ClientTable";

export const dynamic = "force-dynamic";

export default async function AdminClientsPage() {
  let allClients: (typeof clients.$inferSelect)[] = [];

  try {
    allClients = await db.select().from(clients).orderBy(desc(clients.createdAt));
  } catch (err) {
    console.error("Erro ao carregar clientes:", err);
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white tracking-tight">Gestão de Clientes & Projetos</h1>
        <p className="text-slate-400 text-xs mt-1">
          Cadastre seus clientes, contratos, sistemas desenvolvidos e emita recibos diretamente.
        </p>
      </div>

      <ClientTable initialClients={allClients} />
    </div>
  );
}
