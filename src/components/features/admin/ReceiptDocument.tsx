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
  providerBankSnapshot?: string | null;
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
        className="bg-white text-slate-900 font-sans p-10 rounded-xl shadow-xl border border-slate-300 print:border-none print:shadow-none print:p-0 print:m-0 space-y-6"
        style={{
          width: "800px",
          minWidth: "800px",
          maxWidth: "800px",
          boxSizing: "border-box",
          color: "#0f172a",
          backgroundColor: "#ffffff",
        }}
      >
        {/* Header: Title & Badges */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", borderBottom: "2px solid #0f172a", paddingBottom: "16px" }}>
          <div>
            <div style={{ fontSize: "11px", fontWeight: "700", textTransform: "uppercase", letterSpacing: "1.5px", color: "#64748b" }}>
              Documento de Cobrança
            </div>
            <h1 style={{ fontSize: "20px", fontWeight: "900", textTransform: "uppercase", letterSpacing: "-0.5px", color: "#020617", margin: "4px 0 0 0" }}>
              Fatura de Prestação de Serviços
            </h1>
            <div style={{ fontSize: "12px", fontFamily: "monospace", color: "#475569", marginTop: "4px" }}>
              Nº Documento: <strong style={{ color: "#0f172a" }}>{receipt.receiptNumber}</strong>
            </div>
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ backgroundColor: "#f8fafc", border: "1px solid #cbd5e1", padding: "8px 16px", borderRadius: "8px", display: "inline-block", textAlign: "right" }}>
              <span style={{ fontSize: "10px", fontWeight: "700", color: "#64748b", textTransform: "uppercase", display: "block" }}>
                Valor Total a Pagar
              </span>
              <span style={{ fontSize: "18px", fontFamily: "monospace", fontWeight: "900", color: "#020617", display: "block" }}>
                {amountFormatted}
              </span>
            </div>
            <div style={{ fontSize: "12px", color: "#475569", marginTop: "6px" }}>
              Vencimento: <strong style={{ fontFamily: "monospace", color: "#020617" }}>{formattedDueDate}</strong>
            </div>
          </div>
        </div>

        {/* 2-Column: Prestador & Pagador */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", fontSize: "12px" }}>
          {/* Beneficiário (Prestador) */}
          <div style={{ border: "1px solid #cbd5e1", borderRadius: "8px", padding: "14px", backgroundColor: "#f8fafc" }}>
            <span style={{ fontSize: "10px", fontWeight: "700", textTransform: "uppercase", color: "#64748b", display: "block", marginBottom: "4px" }}>
              Beneficiário / Prestador de Serviços
            </span>
            <div style={{ fontWeight: "700", color: "#020617", fontSize: "13px" }}>{receipt.providerNameSnapshot}</div>
            <div style={{ fontFamily: "monospace", color: "#334155", marginTop: "2px" }}>
              CPF/CNPJ: {receipt.providerDocSnapshot}
            </div>
            <div style={{ color: "#475569", marginTop: "2px" }}>
              Data de Emissão: <span style={{ fontFamily: "monospace", fontWeight: "600" }}>{formattedIssueDate}</span>
            </div>
          </div>

          {/* Pagador (Cliente) */}
          <div style={{ border: "1px solid #cbd5e1", borderRadius: "8px", padding: "14px", backgroundColor: "#f8fafc" }}>
            <span style={{ fontSize: "10px", fontWeight: "700", textTransform: "uppercase", color: "#64748b", display: "block", marginBottom: "4px" }}>
              Pagador / Tomador dos Serviços
            </span>
            <div style={{ fontWeight: "700", color: "#020617", fontSize: "13px" }}>{receipt.clientNameSnapshot}</div>
            {receipt.clientDocumentSnapshot && (
              <div style={{ fontFamily: "monospace", color: "#334155", marginTop: "2px" }}>
                CPF/CNPJ: {receipt.clientDocumentSnapshot}
              </div>
            )}
            {receipt.clientAddressSnapshot && (
              <div style={{ color: "#475569", marginTop: "2px" }}>{receipt.clientAddressSnapshot}</div>
            )}
          </div>
        </div>

        {/* Formas de Pagamento (PIX e Dados Bancários) */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
          {/* PIX Box */}
          <div style={{ border: "2px solid #059669", backgroundColor: "#ecfdf5", borderRadius: "8px", padding: "14px", fontSize: "12px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
              <span style={{ fontWeight: "900", textTransform: "uppercase", fontSize: "10px", backgroundColor: "#047857", color: "#ffffff", padding: "2px 8px", borderRadius: "4px" }}>
                Pague com PIX
              </span>
              <span style={{ fontSize: "10px", fontWeight: "700", color: "#065f46" }}>
                Compensação Instantânea
              </span>
            </div>
            <div style={{ fontSize: "11px", color: "#064e3b", marginBottom: "6px" }}>
              <strong>Banco:</strong> Banco Santander (033)<br />
              <strong>Titular:</strong> {receipt.providerNameSnapshot}
            </div>
            <div style={{ fontSize: "11px", color: "#047857", marginBottom: "4px", fontWeight: "600" }}>
              Chave PIX para pagamento:
            </div>
            <div style={{ fontFamily: "monospace", fontWeight: "700", fontSize: "12px", backgroundColor: "#ffffff", border: "1px solid #6ee7b7", color: "#022c22", padding: "8px 10px", borderRadius: "6px", wordBreak: "break-all" }}>
              {receipt.providerPixSnapshot || "09259816726"}
            </div>
          </div>

          {/* Bank Transfer Box */}
          <div style={{ border: "1px solid #cbd5e1", backgroundColor: "#f8fafc", borderRadius: "8px", padding: "14px", fontSize: "12px" }}>
            <div style={{ fontWeight: "700", textTransform: "uppercase", fontSize: "10px", color: "#334155", letterSpacing: "0.5px", marginBottom: "8px" }}>
              Transferência Bancária / TED / DOC
            </div>
            <div style={{ fontSize: "11px", color: "#475569", marginBottom: "6px" }}>
              <strong>Banco:</strong> Banco Santander (033)<br />
              <strong>Favorecido:</strong> {receipt.providerNameSnapshot}
            </div>
            <div style={{ fontFamily: "monospace", fontSize: "11px", backgroundColor: "#ffffff", border: "1px solid #e2e8f0", color: "#0f172a", padding: "8px 10px", borderRadius: "6px", lineHeight: "1.5" }}>
              {receipt.providerBankSnapshot || "Banco: Santander (033) | Agência: 0001 | Conta: 02038966-2"}
            </div>
          </div>
        </div>

        {/* Discriminação dos Serviços */}
        <div style={{ border: "1px solid #cbd5e1", borderRadius: "8px", padding: "16px", fontSize: "12px", backgroundColor: "#ffffff" }}>
          <div style={{ marginBottom: "10px" }}>
            <span style={{ fontSize: "10px", color: "#64748b", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.5px", display: "block", marginBottom: "4px" }}>
              Discriminação dos Serviços Prestados:
            </span>
            <p style={{ color: "#0f172a", lineHeight: "1.6", whiteSpace: "pre-wrap", fontWeight: "500", margin: 0 }}>
              {receipt.serviceDescription}
            </p>
          </div>

          {receipt.instructions && (
            <div style={{ paddingTop: "8px", borderTop: "1px solid #e2e8f0", color: "#334155", fontSize: "11px" }}>
              <strong style={{ color: "#0f172a" }}>Observações:</strong> {receipt.instructions}
            </div>
          )}

          <div style={{ paddingTop: "6px", fontSize: "11px", color: "#64748b", fontStyle: "italic" }}>
            Valor por extenso: <strong style={{ color: "#334155", fontStyle: "normal" }}>{amountInWords}</strong>
          </div>
        </div>

        {/* Footer info & Signature */}
        <div style={{ paddingTop: "14px", borderTop: "1px solid #e2e8f0", display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "10px", color: "#64748b" }}>
          <span>Documento emitido eletronicamente para fins de cobrança e prestação de contas.</span>
          <span style={{ fontFamily: "monospace", fontWeight: "700", color: "#334155" }}>belarmino.dev</span>
        </div>
      </div>
    );
  }

  // Standard Receipt View (Recibo de Quitação)
  return (
    <div
      id="printable-receipt"
      className="bg-white text-slate-900 font-sans p-10 rounded-xl shadow-xl border border-slate-300 print:border-none print:shadow-none print:p-0 print:m-0 space-y-6"
      style={{
        width: "800px",
        minWidth: "800px",
        maxWidth: "800px",
        boxSizing: "border-box",
        color: "#0f172a",
        backgroundColor: "#ffffff",
      }}
    >
      {/* Header with Title and Amount Badge */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", borderBottom: "2px solid #0f172a", paddingBottom: "16px" }}>
        <div>
          <div style={{ fontSize: "11px", fontWeight: "700", textTransform: "uppercase", letterSpacing: "1.5px", color: "#64748b" }}>
            Comprovante Oficial de Quitação
          </div>
          <h1 style={{ fontSize: "20px", fontWeight: "900", textTransform: "uppercase", letterSpacing: "-0.5px", color: "#020617", margin: "4px 0 0 0" }}>
            Recibo de Prestação de Serviços
          </h1>
          <p style={{ fontSize: "12px", fontFamily: "monospace", color: "#475569", marginTop: "4px" }}>
            Nº Oficial: <strong style={{ color: "#0f172a" }}>{receipt.receiptNumber}</strong>
          </p>
        </div>
        <div style={{ backgroundColor: "#f8fafc", border: "1px solid #cbd5e1", padding: "8px 16px", borderRadius: "8px", textAlign: "right" }}>
          <span style={{ fontSize: "10px", fontWeight: "700", color: "#64748b", textTransform: "uppercase", display: "block" }}>
            Valor do Recibo
          </span>
          <span style={{ fontSize: "18px", fontFamily: "monospace", fontWeight: "900", color: "#020617", display: "block" }}>
            {amountFormatted}
          </span>
        </div>
      </div>

      {/* Main Legal Declarative Statement */}
      <div style={{ margin: "24px 0", fontSize: "13px", lineHeight: "1.7", color: "#1e293b", textAlign: "justify" }}>
        <p>
          Recebi(emos) de <strong style={{ color: "#0f172a" }}>{receipt.clientNameSnapshot}</strong>
          {receipt.clientDocumentSnapshot ? `, portador(a) do CPF/CNPJ nº ${receipt.clientDocumentSnapshot}` : ""}
          {receipt.clientAddressSnapshot ? `, com endereço em ${receipt.clientAddressSnapshot}` : ""}, a quantia de{" "}
          <strong style={{ color: "#0f172a", fontFamily: "monospace" }}>{amountFormatted}</strong> (
          <em style={{ color: "#334155" }}>{amountInWords}</em>), através de{" "}
          <strong style={{ color: "#0f172a" }}>{receipt.paymentMethod}</strong>
          {receipt.paymentMethod === "PIX" && receipt.providerPixSnapshot
            ? ` (Chave Pix: ${receipt.providerPixSnapshot} - Banco Santander 033)`
            : ""}
          {receipt.providerBankSnapshot ? ` [${receipt.providerBankSnapshot}]` : ""}
          , referente à prestação dos serviços descritos abaixo:
        </p>

        {/* Service Details Box */}
        <div style={{ backgroundColor: "#f8fafc", border: "1px solid #cbd5e1", borderRadius: "8px", padding: "16px", margin: "20px 0" }}>
          <h3 style={{ fontSize: "11px", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.5px", color: "#475569", marginBottom: "6px" }}>
            Discriminação dos Serviços Prestados:
          </h3>
          <p style={{ fontSize: "12px", color: "#0f172a", whiteSpace: "pre-wrap", lineHeight: "1.6", margin: 0 }}>
            {receipt.serviceDescription}
          </p>
        </div>

        <p style={{ fontSize: "12px", color: "#475569" }}>
          Para maior clareza e cumprimento dos requisitos legais, firmo(amos) o presente recibo dando plena, rasa e geral quitação pela quantia recebida referente única e exclusivamente aos serviços acima discriminados.
        </p>
      </div>

      {/* Date & Signature Area */}
      <div style={{ marginTop: "36px", paddingTop: "24px", borderTop: "1px solid #e2e8f0" }}>
        <div style={{ textAlign: "right", fontSize: "12px", color: "#475569", marginBottom: "36px" }}>
          São Paulo, {formattedIssueDate}
        </div>

        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center" }}>
          <div style={{ width: "260px", borderBottom: "2px solid #0f172a", paddingBottom: "4px" }} />
          <span style={{ fontSize: "13px", fontWeight: "700", color: "#020617", marginTop: "8px" }}>
            {receipt.providerNameSnapshot}
          </span>
          <span style={{ fontSize: "11px", fontFamily: "monospace", color: "#475569" }}>
            CPF/CNPJ: {receipt.providerDocSnapshot}
          </span>
          <span style={{ fontSize: "10px", color: "#64748b", marginTop: "2px" }}>
            Prestador de Serviços de Tecnologia & Software
          </span>
        </div>
      </div>
    </div>
  );
}
