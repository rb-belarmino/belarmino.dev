import { Resend } from "resend";
import { formatBRL, numberToWordsBRL } from "./currency";

const resend = new Resend(process.env.RESEND_API_KEY);

interface ReceiptEmailPayload {
  documentType?: string;
  receiptNumber: string;
  clientName: string;
  clientEmail: string;
  providerName: string;
  providerDoc: string;
  providerPix?: string | null;
  providerBank?: string | null;
  serviceDescription: string;
  amountCents: number;
  paymentMethod: string;
  issueDate: string;
  dueDate?: string | null;
  barcodeLine?: string | null;
  customNote?: string;
}

export async function sendReceiptEmail(data: ReceiptEmailPayload) {
  if (!process.env.RESEND_API_KEY) {
    throw new Error("Chave do Resend (RESEND_API_KEY) não configurada.");
  }

  const isBoleto = data.documentType === "boleto";
  const amountReal = data.amountCents / 100;
  const amountFormatted = formatBRL(amountReal);
  const amountInWords = numberToWordsBRL(amountReal);

  const [year, month, day] = data.issueDate.split("-");
  const formattedDate = `${day}/${month}/${year}`;

  const formattedDueDate = data.dueDate
    ? `${data.dueDate.split("-")[2]}/${data.dueDate.split("-")[1]}/${data.dueDate.split("-")[0]}`
    : formattedDate;

  const docTitle = isBoleto ? "Boleto de Cobrança de Serviços" : "Recibo de Prestação de Serviços";

  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>${docTitle} - ${data.receiptNumber}</title>
    </head>
    <body style="background-color: #f8fafc; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; margin: 0; padding: 30px; color: #0f172a;">
      <table width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; border: 1px solid #e2e8f0; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);">
        <!-- Header -->
        <tr>
          <td style="padding: 30px; background-color: #07090e; color: #ffffff; border-bottom: 3px solid ${isBoleto ? "#10b981" : "#06b6d4"};">
            <table width="100%" cellpadding="0" cellspacing="0" border="0">
              <tr>
                <td>
                  <h1 style="margin: 0; font-size: 20px; font-weight: bold; text-transform: uppercase; letter-spacing: 1px; color: #ffffff;">
                    ${docTitle}
                  </h1>
                  <p style="margin: 5px 0 0 0; font-size: 12px; color: #94a3b8; font-family: monospace;">
                    Nº ${data.receiptNumber}
                  </p>
                </td>
                <td align="right">
                  <div style="background-color: #161b22; padding: 10px 15px; border-radius: 8px; border: 1px solid #334155;">
                    <span style="font-size: 10px; color: #94a3b8; display: block; text-transform: uppercase;">Valor</span>
                    <span style="font-size: 16px; font-weight: bold; color: #34d399; font-family: monospace;">${amountFormatted}</span>
                  </div>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- Content -->
        <tr>
          <td style="padding: 30px;">
            <p style="font-size: 14px; line-height: 1.6; margin: 0 0 20px 0; color: #334155;">
              Olá, <strong>${data.clientName}</strong>,
            </p>
            <p style="font-size: 14px; line-height: 1.6; margin: 0 0 25px 0; color: #334155;">
              ${
                isBoleto
                  ? `Segue a fatura/boleto de prestação de serviços referente ao valor de <strong>${amountFormatted}</strong>, com vencimento em <strong>${formattedDueDate}</strong>.`
                  : `Confirmamos o recebimento da quantia de <strong>${amountFormatted}</strong> (<em>${amountInWords}</em>), através de <strong>${data.paymentMethod}</strong>, com a emissão do comprovante formal de quitação.`
              }
            </p>

            ${
              data.providerPix
                ? `
            <!-- Box Destaque PIX no Email -->
            <div style="background-color: #ecfdf5; border: 2px solid #10b981; border-radius: 10px; padding: 20px; margin-bottom: 20px;">
              <h3 style="margin: 0 0 8px 0; font-size: 13px; font-weight: bold; text-transform: uppercase; color: #065f46;">
                ✨ Opção de Pagamento Instantâneo via PIX
              </h3>
              <p style="margin: 0 0 12px 0; font-size: 13px; color: #047857;">
                Para compensação e baixa imediata, você pode realizar o pagamento via PIX:
              </p>
              <div style="background-color: #ffffff; border: 1px solid #6ee7b7; border-radius: 6px; padding: 10px 14px; font-family: monospace; font-size: 13px; font-weight: bold; color: #064e3b;">
                Chave PIX: ${data.providerPix}
              </div>
            </div>`
                : ""
            }

            ${
              data.providerBank
                ? `
            <!-- Box Dados Bancários no Email -->
            <div style="background-color: #f8fafc; border: 1px solid #cbd5e1; border-radius: 8px; padding: 15px; margin-bottom: 20px;">
              <span style="font-size: 11px; text-transform: uppercase; color: #64748b; font-weight: bold; display: block; margin-bottom: 5px;">
                Dados para Transferência Bancária / TED / DOC:
              </span>
              <span style="font-family: monospace; font-size: 12px; font-weight: bold; color: #0f172a;">
                ${data.providerBank}
              </span>
            </div>`
                : ""
            }

            <!-- Details Box -->
            <div style="background-color: #f1f5f9; border-radius: 8px; padding: 20px; margin-bottom: 25px; border-left: 4px solid ${isBoleto ? "#10b981" : "#06b6d4"};">
              <h3 style="margin: 0 0 10px 0; font-size: 12px; text-transform: uppercase; color: #475569; letter-spacing: 0.5px;">
                Discriminação dos Serviços:
              </h3>
              <p style="margin: 0; font-size: 13px; line-height: 1.5; color: #1e293b; white-space: pre-wrap;">
                ${data.serviceDescription}
              </p>
            </div>

            ${
              data.customNote
                ? `
            <div style="background-color: #fffbeb; border: 1px solid #fef3c7; border-radius: 8px; padding: 15px; margin-bottom: 25px; font-size: 13px; color: #92400e;">
              <strong>Mensagem do Emissor:</strong><br>${data.customNote}
            </div>`
                : ""
            }

            <!-- Signature footer -->
            <div style="border-top: 1px solid #e2e8f0; padding-top: 20px; text-align: center;">
              <p style="margin: 0; font-size: 14px; font-weight: bold; color: #0f172a;">
                ${data.providerName}
              </p>
              <p style="margin: 4px 0 0 0; font-size: 12px; color: #64748b; font-family: monospace;">
                CPF/CNPJ: ${data.providerDoc}
              </p>
              <p style="margin: 4px 0 0 0; font-size: 11px; color: #94a3b8;">
                Data de Emissão: ${formattedDate}
              </p>
            </div>
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="padding: 20px; background-color: #f8fafc; border-top: 1px solid #e2e8f0; text-align: center; font-size: 11px; color: #94a3b8;">
            Documento emitido eletronicamente via <strong>belarmino.dev</strong>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `;

  return await resend.emails.send({
    from: process.env.RESEND_FROM_EMAIL || "Rodrigo Belarmino <onboarding@resend.dev>",
    to: [data.clientEmail],
    subject: `${docTitle} - ${data.receiptNumber}`,
    html: htmlContent,
  });
}
