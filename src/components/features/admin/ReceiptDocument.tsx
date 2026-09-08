import { formatBRL, numberToWordsBRL } from "@/lib/currency";

export interface ReceiptData {
  id: string;
  documentType: string; // 'receipt' | 'boleto'
  receiptNumber: string;
  clientNameSnapshot: string;
  clientDocumentSnapshot: string | null;
  clientAddressSnapshot: string | null;
  clientEmailSnapshot: string | null;
  providerNameSnapshot: string;
  providerDocSnapshot: string;
  providerPixSnapshot: string | null;
  serviceDescription: string;
  amountCents: number;
  paymentMethod: string;
  issueDate: string;
  dueDate: string | null;
  barcodeLine: string | null;
  instructions: string | null;
  status: string;
  sentAt: Date | null;
  createdAt: Date;
}

export function ReceiptDocument({ receipt }: { receipt: ReceiptData }) {
  const amountReal = receipt.amountCents / 100;
  const amountFormatted = formatBRL(amountReal);
  const amountInWords = numberToWordsBRL(amountReal);

  // Format date from YYYY-MM-DD to DD/MM/YYYY
  const [year, month, day] = receipt.issueDate.split("-");
  const formattedIssueDate = `${day}/${month}/${year}`;

  const formattedDueDate = receipt.dueDate
    ? `${receipt.dueDate.split("-")[2]}/${receipt.dueDate.split("-")[1]}/${receipt.dueDate.split("-")[0]}`
    : formattedIssueDate;

  const isBoleto = receipt.documentType === "boleto";

  if (isBoleto) {
    return (
      <div
        id="printable-receipt"
        className="bg-white text-slate-900 font-sans p-8 sm:p-10 max-w-3xl mx-auto rounded-xl shadow-2xl border border-slate-300 print:border-none print:shadow-none print:p-0 print:m-0 space-y-6"
      >
        {/* Boleto Bank Header */}
        <div className="flex items-center justify-between border-b-2 border-slate-900 pb-3">
          <div className="flex items-center gap-3">
            <div className="font-black text-xl tracking-wider text-slate-900 font-mono">
              341-7
            </div>
            <div className="h-6 w-px bg-slate-400" />
            <div className="font-mono text-xs sm:text-sm font-bold tracking-tight text-slate-800">
              {receipt.barcodeLine || "34191.79001 01043.510047 91020.150008 8 96540000350000"}
            </div>
          </div>
          <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500 hidden sm:block">
            Cobrança de Serviços
          </div>
        </div>

        {/* Top summary table */}
        <div className="border border-slate-900 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-4 border-b border-slate-900 divide-y sm:divide-y-0 sm:divide-x divide-slate-900 bg-slate-50">
            <div className="p-2.5 sm:col-span-3">
              <span className="text-[10px] text-slate-500 font-bold uppercase block">Local de Pagamento</span>
              <span className="font-semibold text-slate-900">
                Pagável em qualquer banco, internet banking ou via PIX
              </span>
            </div>
            <div className="p-2.5 bg-slate-100">
              <span className="text-[10px] text-slate-500 font-bold uppercase block">Vencimento</span>
              <span className="font-black text-slate-950 font-mono text-sm">{formattedDueDate}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-4 border-b border-slate-900 divide-y sm:divide-y-0 sm:divide-x divide-slate-900">
            <div className="p-2.5 sm:col-span-3">
              <span className="text-[10px] text-slate-500 font-bold uppercase block">Beneficiário / Prestador</span>
              <span className="font-bold text-slate-900">{receipt.providerNameSnapshot}</span>
              <span className="text-slate-600 block text-[11px] font-mono">CPF/CNPJ: {receipt.providerDocSnapshot}</span>
            </div>
            <div className="p-2.5 bg-slate-50">
              <span className="text-[10px] text-slate-500 font-bold uppercase block">Nosso Número</span>
              <span className="font-mono font-bold text-slate-900">{receipt.receiptNumber}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-4 border-b border-slate-900 divide-y sm:divide-y-0 sm:divide-x divide-slate-900">
            <div className="p-2.5">
              <span className="text-[10px] text-slate-500 font-bold uppercase block">Data do Documento</span>
              <span className="font-mono">{formattedIssueDate}</span>
            </div>
            <div className="p-2.5">
              <span className="text-[10px] text-slate-500 font-bold uppercase block">Espécie Doc.</span>
              <span className="font-mono">DM / FAT</span>
            </div>
            <div className="p-2.5">
              <span className="text-[10px] text-slate-500 font-bold uppercase block">Aceite</span>
              <span className="font-mono">N</span>
            </div>
            <div className="p-2.5 bg-emerald-50">
              <span className="text-[10px] text-slate-500 font-bold uppercase block">Valor do Documento</span>
              <span className="font-black text-slate-950 font-mono text-sm text-emerald-800">
                {amountFormatted}
              </span>
            </div>
          </div>
        </div>

        {/* 🔥 Destaque Especial: Pagamento Instantâneo via PIX */}
        {receipt.providerPixSnapshot && (
          <div className="border-2 border-emerald-500 bg-emerald-50/70 rounded-xl p-4 sm:p-5 relative overflow-hidden">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-emerald-900">
                  <span className="font-black uppercase tracking-wide text-xs bg-emerald-600 text-white px-2 py-0.5 rounded">
                    Pague com PIX
                  </span>
                  <span className="text-xs font-bold text-emerald-950">
                    Compensação Imediata e Automática
                  </span>
                </div>
                <p className="text-xs text-slate-700">
                  Você pode pagar este boleto instantaneamente pelo aplicativo do seu banco utilizando a Chave PIX abaixo:
                </p>
                <div className="pt-1 flex items-center gap-2">
                  <span className="text-xs text-slate-600 font-semibold">Chave PIX:</span>
                  <span className="font-mono font-bold text-xs sm:text-sm bg-white border border-emerald-400 text-emerald-950 px-3 py-1 rounded-lg select-all">
                    {receipt.providerPixSnapshot}
                  </span>
                </div>
              </div>

              {/* Visual QR code placeholder indicator */}
              <div className="shrink-0 flex flex-col items-center justify-center p-2.5 bg-white border border-emerald-300 rounded-lg text-center">
                <span className="material-symbols-outlined text-3xl text-emerald-700">qr_code_2</span>
                <span className="text-[9px] font-bold text-emerald-900 uppercase mt-0.5">PIX Disponível</span>
              </div>
            </div>
          </div>
        )}

        {/* Instructions & Service Description */}
        <div className="border border-slate-900 p-4 text-xs space-y-3">
          <div>
            <span className="text-[10px] text-slate-500 font-bold uppercase block mb-1">
              Instruções de Cobrança / Descrição dos Serviços:
            </span>
            <p className="text-slate-800 leading-relaxed whitespace-pre-wrap font-medium">
              {receipt.serviceDescription}
            </p>
          </div>

          {receipt.instructions && (
            <div className="pt-2 border-t border-slate-300 text-slate-600 text-[11px]">
              <strong>Observações:</strong> {receipt.instructions}
            </div>
          )}

          <div className="text-[11px] text-slate-500 italic">
            Valor por extenso: {amountInWords}
          </div>
        </div>

        {/* Pagador / Sacado Details */}
        <div className="border border-slate-900 p-4 text-xs">
          <span className="text-[10px] text-slate-500 font-bold uppercase block mb-1">
            Pagador / Sacado:
          </span>
          <div className="font-bold text-slate-950 text-sm">{receipt.clientNameSnapshot}</div>
          {receipt.clientDocumentSnapshot && (
            <div className="font-mono text-slate-700 mt-0.5">CPF/CNPJ: {receipt.clientDocumentSnapshot}</div>
          )}
          {receipt.clientAddressSnapshot && (
            <div className="text-slate-600 mt-0.5">{receipt.clientAddressSnapshot}</div>
          )}
        </div>

        {/* Barcode Graphic Representation */}
        <div className="pt-2 flex flex-col items-start">
          <div className="h-12 w-full max-w-md bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 flex items-center justify-around px-2">
            {/* Realistic barcode vertical lines styling */}
            <div className="w-full h-full flex items-center justify-between opacity-95">
              {[4, 2, 6, 1, 3, 5, 2, 4, 1, 3, 6, 2, 4, 3, 5, 1, 2, 4, 6, 3, 2, 5, 1, 4, 2, 3, 5, 4, 2, 6, 1, 3, 5, 2, 4].map(
                (w, idx) => (
                  <div key={idx} className="bg-white h-full" style={{ width: `${w * 1.5}px` }} />
                )
              )}
            </div>
          </div>
          <span className="text-[9px] font-mono text-slate-500 mt-1 uppercase">
            Autenticação Mecânica / Ficha de Compensação
          </span>
        </div>
      </div>
    );
  }

  // Standard Receipt View (Recibo de Quitação)
  return (
    <div
      id="printable-receipt"
      className="bg-white text-slate-900 font-sans p-8 sm:p-12 max-w-3xl mx-auto rounded-xl shadow-2xl border border-slate-200 print:border-none print:shadow-none print:p-0 print:m-0"
    >
      {/* Header with Title and Amount Badge */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b-2 border-slate-900 gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-black tracking-tight text-slate-950 uppercase">
            Recibo de Prestação de Serviços
          </h1>
          <p className="text-xs font-mono text-slate-600 mt-1">
            Nº Oficial: <span className="font-bold text-slate-900">{receipt.receiptNumber}</span>
          </p>
        </div>
        <div className="bg-slate-100 border border-slate-300 px-5 py-3 rounded-lg text-right">
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
            Valor do Recibo
          </span>
          <span className="text-xl font-mono font-black text-slate-950 block">
            {amountFormatted}
          </span>
        </div>
      </div>

      {/* Main Legal Declarative Statement */}
      <div className="my-8 space-y-6 text-sm leading-relaxed text-slate-800">
        <p className="text-justify">
          Recebi(emos) de <strong className="text-slate-950">{receipt.clientNameSnapshot}</strong>
          {receipt.clientDocumentSnapshot ? `, portador(a) do CPF/CNPJ nº ${receipt.clientDocumentSnapshot}` : ""}
          {receipt.clientAddressSnapshot ? `, com endereço em ${receipt.clientAddressSnapshot}` : ""}, a quantia de{" "}
          <strong className="text-slate-950 font-mono">{amountFormatted}</strong> (
          <em className="text-slate-700">{amountInWords}</em>), através de{" "}
          <strong>{receipt.paymentMethod}</strong>
          {receipt.paymentMethod === "PIX" && receipt.providerPixSnapshot
            ? ` (Chave Pix: ${receipt.providerPixSnapshot})`
            : ""}
          , referente à prestação dos serviços descritos abaixo:
        </p>

        {/* Service Details Box */}
        <div className="bg-slate-50 border border-slate-300 rounded-lg p-5">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
            Discriminação dos Serviços Prestados:
          </h3>
          <p className="text-xs text-slate-800 whitespace-pre-wrap leading-relaxed">
            {receipt.serviceDescription}
          </p>
        </div>

        <p className="text-xs text-slate-600 text-justify">
          Para maior clareza e cumprimento dos requisitos legais, firmo(amos) o presente recibo dando plena, rasa e geral quitação pela quantia recebida referente única e exclusivamente aos serviços acima discriminados.
        </p>
      </div>

      {/* Date & Signature Area */}
      <div className="mt-12 pt-8 border-t border-slate-200">
        <div className="text-right text-xs text-slate-700 font-medium mb-12">
          São Paulo, {formattedIssueDate}
        </div>

        <div className="flex flex-col items-center justify-center text-center">
          <div className="w-72 border-b-2 border-slate-900 pb-1" />
          <span className="text-sm font-bold text-slate-950 mt-2">
            {receipt.providerNameSnapshot}
          </span>
          <span className="text-xs font-mono text-slate-600">
            CPF/CNPJ: {receipt.providerDocSnapshot}
          </span>
          <span className="text-[10px] text-slate-500 mt-0.5">
            Prestador de Serviços de Tecnologia & Software
          </span>
        </div>
      </div>
    </div>
  );
}
