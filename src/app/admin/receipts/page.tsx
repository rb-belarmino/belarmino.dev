import Link from "next/link";
import { db } from "@/db";
import { serviceReceipts } from "@/db/schema";
import { desc } from "drizzle-orm";
import { formatBRL } from "@/lib/currency";

export const dynamic = "force-dynamic";

export default async function AdminReceiptsPage() {
  let receiptsList: (typeof serviceReceipts.$inferSelect)[] = [];

  try {
    receiptsList = await db
      .select()
      .from(serviceReceipts)
      .orderBy(desc(serviceReceipts.createdAt));
  } catch (err) {
    console.error("Erro ao carregar lista de documentos:", err);
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Cobranças & Recibos</h1>
          <p className="text-slate-400 text-xs mt-1">
            Consulte boletos bancários com PIX e recibos de quitação emitidos.
          </p>
        </div>

        <Link
          href="/admin/receipts/new"
          className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs shadow-lg shadow-cyan-500/20 transition flex items-center gap-2 self-start sm:self-auto"
        >
          <span className="material-symbols-outlined text-base">add</span>
          <span>Emitir Boleto / Recibo</span>
        </Link>
      </div>

      <div className="bg-[#0d1117] border border-slate-800/80 rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-[#161b22] text-slate-400 uppercase text-[10px] tracking-wider border-b border-slate-800">
              <tr>
                <th className="px-5 py-3.5">Documento</th>
                <th className="px-5 py-3.5">Tipo</th>
                <th className="px-5 py-3.5">Cliente / Pagador</th>
                <th className="px-5 py-3.5">Valor (BRL)</th>
                <th className="px-5 py-3.5">Vencimento / Emissão</th>
                <th className="px-5 py-3.5">Status</th>
                <th className="px-5 py-3.5 text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {receiptsList.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-5 py-12 text-center text-slate-500">
                    Nenhum documento emitido até o momento.
                  </td>
                </tr>
              ) : (
                receiptsList.map((receipt) => (
                  <tr key={receipt.id} className="hover:bg-slate-800/20 transition">
                    <td className="px-5 py-4 font-mono font-bold text-cyan-400">
                      {receipt.receiptNumber}
                    </td>
                    <td className="px-5 py-4">
                      {receipt.documentType === "boleto" ? (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold bg-indigo-500/10 text-indigo-400 border border-indigo-500/30">
                          <span className="material-symbols-outlined text-xs">receipt</span>
                          Boleto + PIX
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
                          <span className="material-symbols-outlined text-xs">verified</span>
                          Recibo
                        </span>
                      )}
                    </td>
                    <td className="px-5 py-4">
                      <div className="font-bold text-white text-xs">{receipt.clientNameSnapshot}</div>
                      {receipt.clientEmailSnapshot && (
                        <div className="text-[11px] text-slate-500 mt-0.5">{receipt.clientEmailSnapshot}</div>
                      )}
                    </td>
                    <td className="px-5 py-4 font-mono font-bold text-emerald-400">
                      {formatBRL(receipt.amountCents / 100)}
                    </td>
                    <td className="px-5 py-4 text-slate-400 font-mono">
                      {receipt.dueDate ? (
                        <div>
                          <span className="text-white font-bold">{receipt.dueDate}</span>
                          <span className="text-[10px] text-slate-500 block">Vencimento</span>
                        </div>
                      ) : (
                        receipt.issueDate
                      )}
                    </td>
                    <td className="px-5 py-4">
                      {receipt.status === "sent" ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                          <span className="material-symbols-outlined text-xs">mark_email_read</span>
                          Enviado
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-medium bg-slate-800 text-slate-300 border border-slate-700">
                          <span className="material-symbols-outlined text-xs">description</span>
                          Emitido
                        </span>
                      )}
                    </td>
                    <td className="px-5 py-4 text-right">
                      <Link
                        href={`/admin/receipts/${receipt.id}`}
                        className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-semibold text-xs inline-flex items-center gap-1.5 transition"
                      >
                        <span className="material-symbols-outlined text-sm">visibility</span>
                        <span>Abrir / PDF</span>
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
