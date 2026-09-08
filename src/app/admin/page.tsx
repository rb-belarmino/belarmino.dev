import Link from "next/link";
import { db } from "@/db";
import { clients, serviceReceipts } from "@/db/schema";
import { desc, count, sum } from "drizzle-orm";
import { formatBRL } from "@/lib/currency";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  let clientCount = 0;
  let receiptCount = 0;
  let totalCents = 0;
  let recentReceipts: (typeof serviceReceipts.$inferSelect)[] = [];
  let recentClients: (typeof clients.$inferSelect)[] = [];

  try {
    const clientsTotal = await db.select({ value: count() }).from(clients);
    clientCount = clientsTotal[0]?.value || 0;

    const receiptsTotal = await db.select({ value: count() }).from(serviceReceipts);
    receiptCount = receiptsTotal[0]?.value || 0;

    const totalRevenue = await db.select({ value: sum(serviceReceipts.amountCents) }).from(serviceReceipts);
    totalCents = Number(totalRevenue[0]?.value) || 0;

    recentReceipts = await db
      .select()
      .from(serviceReceipts)
      .orderBy(desc(serviceReceipts.createdAt))
      .limit(5);

    recentClients = await db
      .select()
      .from(clients)
      .orderBy(desc(clients.createdAt))
      .limit(5);
  } catch (err) {
    console.error("Erro ao carregar estatísticas do dashboard:", err);
  }

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Terminal de Gestão
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            Controle de clientes, projetos e emissão formal de recibos de prestação de serviços.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/admin/clients"
            className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-2 border border-slate-700 transition"
          >
            <span className="material-symbols-outlined text-base">person_add</span>
            <span>Novo Cliente</span>
          </Link>
          <Link
            href="/admin/receipts/new"
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 text-xs font-bold flex items-center gap-2 shadow-lg shadow-cyan-500/20 transition"
          >
            <span className="material-symbols-outlined text-base">receipt</span>
            <span>Emitir Recibo</span>
          </Link>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="bg-[#0d1117] border border-slate-800/80 rounded-2xl p-6 relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Total de Clientes</span>
            <span className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 flex items-center justify-center">
              <span className="material-symbols-outlined">group</span>
            </span>
          </div>
          <div className="mt-4 text-3xl font-bold text-white font-mono">{clientCount}</div>
          <p className="text-xs text-slate-500 mt-1">Empresas e pessoas cadastradas</p>
        </div>

        <div className="bg-[#0d1117] border border-slate-800/80 rounded-2xl p-6 relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Recibos Emitidos</span>
            <span className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 flex items-center justify-center">
              <span className="material-symbols-outlined">receipt_long</span>
            </span>
          </div>
          <div className="mt-4 text-3xl font-bold text-white font-mono">{receiptCount}</div>
          <p className="text-xs text-slate-500 mt-1">Documentos fiscais gerados</p>
        </div>

        <div className="bg-[#0d1117] border border-slate-800/80 rounded-2xl p-6 relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Total em Recibos</span>
            <span className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center">
              <span className="material-symbols-outlined">payments</span>
            </span>
          </div>
          <div className="mt-4 text-3xl font-bold text-emerald-400 font-mono">
            {formatBRL(totalCents / 100)}
          </div>
          <p className="text-xs text-slate-500 mt-1">Volume acumulado de serviços</p>
        </div>
      </div>

      {/* Grid with Recent Receipts & Recent Clients */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Receipts */}
        <div className="bg-[#0d1117] border border-slate-800/80 rounded-2xl p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-cyan-400">history_edu</span>
              <h2 className="text-base font-bold text-white">Últimos Recibos</h2>
            </div>
            <Link href="/admin/receipts" className="text-xs text-cyan-400 hover:text-cyan-300 font-semibold flex items-center gap-1">
              <span>Ver todos</span>
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </Link>
          </div>

          {recentReceipts.length === 0 ? (
            <div className="py-8 text-center text-slate-500 text-xs border border-dashed border-slate-800 rounded-xl">
              Nenhum recibo emitido ainda.
            </div>
          ) : (
            <div className="divide-y divide-slate-800/60">
              {recentReceipts.map((receipt) => (
                <div key={receipt.id} className="py-3.5 flex items-center justify-between">
                  <div>
                    <div className="text-xs font-bold text-slate-200">{receipt.clientNameSnapshot}</div>
                    <div className="text-[11px] text-slate-500 font-mono mt-0.5">
                      {receipt.receiptNumber} • {receipt.issueDate}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs font-bold text-emerald-400 font-mono">
                      {formatBRL(receipt.amountCents / 100)}
                    </div>
                    <Link
                      href={`/admin/receipts/${receipt.id}`}
                      className="text-[11px] text-cyan-400 hover:underline mt-0.5 inline-block"
                    >
                      Detalhes
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Recent Clients */}
        <div className="bg-[#0d1117] border border-slate-800/80 rounded-2xl p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-cyan-400">contacts</span>
              <h2 className="text-base font-bold text-white">Clientes Recentes</h2>
            </div>
            <Link href="/admin/clients" className="text-xs text-cyan-400 hover:text-cyan-300 font-semibold flex items-center gap-1">
              <span>Gerenciar</span>
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </Link>
          </div>

          {recentClients.length === 0 ? (
            <div className="py-8 text-center text-slate-500 text-xs border border-dashed border-slate-800 rounded-xl">
              Nenhum cliente cadastrado ainda.
            </div>
          ) : (
            <div className="divide-y divide-slate-800/60">
              {recentClients.map((client) => (
                <div key={client.id} className="py-3.5 flex items-center justify-between">
                  <div>
                    <div className="text-xs font-bold text-slate-200">
                      {client.name} {client.company ? `(${client.company})` : ""}
                    </div>
                    <div className="text-[11px] text-slate-500 mt-0.5">{client.email}</div>
                  </div>
                  <Link
                    href={`/admin/clients`}
                    className="text-xs px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition"
                  >
                    Ver
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
