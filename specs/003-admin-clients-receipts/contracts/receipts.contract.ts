import { z } from "zod";

export const CreateReceiptInputSchema = z.object({
  clientId: z.string().uuid().optional().nullable(),
  clientName: z.string().min(2, "Nome do cliente é obrigatório"),
  clientDocument: z.string().optional().nullable(),
  clientAddress: z.string().optional().nullable(),
  clientEmail: z.string().email("E-mail do cliente é obrigatório"),
  serviceDescription: z.string().min(5, "Descrição dos serviços prestados é obrigatória"),
  amount: z.number().positive("O valor deve ser maior que zero"),
  paymentMethod: z.enum(["PIX", "Transferência Bancária", "Cartão de Crédito", "Boleto", "Dinheiro"]),
  issueDate: z.string().min(10, "Data de emissão é obrigatória"),
});

export type CreateReceiptInput = z.infer<typeof CreateReceiptInputSchema>;

export interface ReceiptDTO {
  id: string;
  receiptNumber: string;
  clientId: string | null;
  clientNameSnapshot: string;
  clientDocumentSnapshot: string | null;
  clientAddressSnapshot: string | null;
  clientEmailSnapshot: string;
  providerNameSnapshot: string;
  providerDocSnapshot: string;
  providerPixSnapshot: string | null;
  serviceDescription: string;
  amountCents: number;
  amountFormatted: string;
  amountInWords: string;
  paymentMethod: string;
  issueDate: string;
  status: "draft" | "issued" | "sent";
  sentAt: string | null;
  createdAt: string;
}

export const SendReceiptEmailInputSchema = z.object({
  receiptId: z.string().uuid(),
  customMessage: z.string().optional(),
});

export type SendReceiptEmailInput = z.infer<typeof SendReceiptEmailInputSchema>;
