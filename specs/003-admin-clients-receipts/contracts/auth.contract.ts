import { z } from "zod";

export const LoginInputSchema = z.object({
  username: z.string().min(1, "Usuário é obrigatório"),
  password: z.string().min(1, "Senha é obrigatória"),
});

export type LoginInput = z.infer<typeof LoginInputSchema>;

export interface AuthSession {
  userId: string;
  username: string;
  role: "admin";
  expiresAt: number;
}

export interface AuthActionResult {
  success: boolean;
  error?: string;
  redirectTo?: string;
}
