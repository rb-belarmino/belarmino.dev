"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ReceiptDocument, ReceiptData } from "./ReceiptDocument";
import { downloadReceiptPDF } from "@/lib/pdf";
import { sendReceiptEmailAction } from "@/app/admin/actions/receipt-email.actions";
import { deleteReceiptAction } from "@/app/admin/actions/receipt.actions";

export function ReceiptDetailClient({ receipt }: { receipt: ReceiptData }) {
  const router = useRouter();
  const [isDownloading, setIsDownloading] = useState(false);
  const [emailModalOpen, setEmailModalOpen] = useState(false);
  const [targetEmail, setTargetEmail] = useState(receipt.clientEmailSnapshot || "");
  const [customNote, setCustomNote] = useState("");
  const [emailStatus, setEmailStatus] = useState<{ success?: boolean; error?: string } | null>(null);
  const [isSendingEmail, startEmailTransition] = useTransition();
  const [isDeleting, startDeleteTransition] = useTransition();

  async function handleDownloadPDF() {
    setIsDownloading(true);
    try {
      await downloadReceiptPDF("printable-receipt", `Recibo-${receipt.receiptNumber}.pdf`);
    } catch (err) {
      console.error("Erro ao gerar PDF:", err);
      alert("Erro ao gerar PDF. Tente usar a opção de impressão.");
    } finally {
      setIsDownloading(false);
    }
  }

  function handleSendEmail() {
    if (!targetEmail.trim()) {
      setEmailStatus({ error: "Informe o e-mail do destinatário para envio." });
      return;
    }

    setEmailStatus(null);
    startEmailTransition(async () => {
      const res = await sendReceiptEmailAction(receipt.id, customNote, targetEmail.trim());
      if (res.error) {
        setEmailStatus({ error: res.error });
      } else {
        setEmailStatus({ success: true });
        setTimeout(() => {
          setEmailModalOpen(false);
        }, 2000);
      }
    });
  }

  function handleDelete() {
    if (confirm(`Deseja realmente remover o recibo ${receipt.receiptNumber}?`)) {
      startDeleteTransition(async () => {
        await deleteReceiptAction(receipt.id);
        router.push("/admin/receipts");
      });
    }
  }

  return (
    <div className="space-y-6">
      {/* Top action bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <Link
            href="/admin/receipts"
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition"
          >
            <span className="material-symbols-outlined text-base">arrow_back</span>
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold text-white tracking-tight">
                Recibo {receipt.receiptNumber}
              </h1>
              {receipt.status === "sent" ? (
                <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  Enviado por E-mail
                </span>
              ) : (
                <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-slate-800 text-slate-400 border border-slate-700">
                  Emitido
                </span>
              )}
            </div>
            <p className="text-slate-400 text-xs mt-0.5">
              Tomador: {receipt.clientNameSnapshot} {receipt.clientEmailSnapshot ? `• ${receipt.clientEmailSnapshot}` : ""}
            </p>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={handleDownloadPDF}
            disabled={isDownloading}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs shadow-lg shadow-cyan-500/20 transition flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
          >
            <span className="material-symbols-outlined text-base">
              {isDownloading ? "progress_activity" : "download"}
            </span>
            <span>{isDownloading ? "Gerando PDF..." : "Salvar em PDF"}</span>
          </button>

          <button
            onClick={() => setEmailModalOpen(true)}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-400 border border-slate-700 font-semibold text-xs transition flex items-center gap-1.5 cursor-pointer"
          >
            <span className="material-symbols-outlined text-base">mail</span>
            <span>Enviar por E-mail</span>
          </button>

          <button
            onClick={() => window.print()}
            className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 text-xs transition flex items-center gap-1 cursor-pointer"
            title="Imprimir Recibo"
          >
            <span className="material-symbols-outlined text-base">print</span>
          </button>

          <button
            onClick={handleDelete}
            disabled={isDeleting}
            className="px-3 py-2 rounded-xl bg-rose-950/20 hover:bg-rose-950/40 text-rose-400 border border-rose-900/40 text-xs transition flex items-center gap-1 cursor-pointer"
            title="Excluir Recibo"
          >
            <span className="material-symbols-outlined text-base">delete</span>
          </button>
        </div>
      </div>

      {/* Render the printable receipt document */}
      <div className="py-6 flex justify-center">
        <ReceiptDocument receipt={receipt} />
      </div>

      {/* Modal for sending email */}
      {emailModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="w-full max-w-md bg-[#0d1117] border border-slate-800 rounded-2xl p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2 text-cyan-400">
                <span className="material-symbols-outlined">mail</span>
                <h3 className="text-sm font-bold text-white">Enviar Recibo por E-mail</h3>
              </div>
              <button
                onClick={() => setEmailModalOpen(false)}
                className="text-slate-400 hover:text-white"
              >
                <span className="material-symbols-outlined text-lg">close</span>
              </button>
            </div>

            {emailStatus?.error && (
              <div className="p-3 rounded-xl bg-rose-950/40 border border-rose-800/60 text-rose-300 text-xs">
                {emailStatus.error}
              </div>
            )}

            {emailStatus?.success && (
              <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-800/60 text-emerald-300 text-xs flex items-center gap-2">
                <span className="material-symbols-outlined text-emerald-400 text-sm">check_circle</span>
                <span>Recibo enviado com sucesso via Resend!</span>
              </div>
            )}

            <div className="space-y-3 text-xs text-slate-300">
              <div>
                <label className="block font-semibold text-slate-400 mb-1">
                  E-mail do Destinatário *
                </label>
                <input
                  type="email"
                  required
                  value={targetEmail}
                  onChange={(e) => setTargetEmail(e.target.value)}
                  placeholder="cliente@empresa.com"
                  className="w-full px-3.5 py-2 bg-[#161b22] border border-slate-700 rounded-xl text-slate-100 text-xs focus:outline-none focus:border-cyan-400"
                />
              </div>

              <p>
                Documento: <strong className="text-cyan-400">{receipt.receiptNumber}</strong>
              </p>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1.5">
                Mensagem Personalizada (Opcional)
              </label>
              <textarea
                rows={3}
                value={customNote}
                onChange={(e) => setCustomNote(e.target.value)}
                placeholder="Ex: Segue o comprovante de quitação da 2ª parcela do projeto..."
                className="w-full px-3.5 py-2 bg-[#161b22] border border-slate-700 rounded-xl text-slate-100 text-xs focus:outline-none focus:border-cyan-400"
              />
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t border-slate-800">
              <button
                type="button"
                onClick={() => setEmailModalOpen(false)}
                className="px-3 py-1.5 rounded-lg text-xs text-slate-400 hover:text-white"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={handleSendEmail}
                disabled={isSendingEmail}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs shadow-lg shadow-cyan-500/20 transition flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
              >
                {isSendingEmail && <span className="material-symbols-outlined animate-spin text-sm">progress_activity</span>}
                <span>{isSendingEmail ? "Disparando..." : "Confirmar Envio"}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
