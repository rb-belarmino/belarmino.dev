import { z } from "zod";

export const ProviderSettingsSchema = z.object({
  fullName: z.string().min(2, "Nome ou Razão Social é obrigatório"),
  document: z.string().min(11, "CPF ou CNPJ é obrigatório"),
  pixKey: z.string().optional().nullable(),
  phone: z.string().optional().nullable(),
  email: z.string().email("E-mail inválido").optional().nullable(),
  cityState: z.string().min(2, "Cidade e Estado são obrigatórios"),
});

export type ProviderSettingsInput = z.infer<typeof ProviderSettingsSchema>;

export interface ProviderSettingsDTO extends ProviderSettingsInput {
  id: string;
  updatedAt: string;
}
