"use server";

import { z } from "zod";
import * as bcrypt from "bcryptjs";
import { db } from "@/db";
import { adminUsers } from "@/db/schema";
import { eq } from "drizzle-orm";
import { createSessionToken, setAdminSessionCookie, removeAdminSessionCookie, getCurrentAdminSession } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const LoginSchema = z.object({
  username: z.string().min(1, "Usuário é obrigatório"),
  password: z.string().min(1, "Senha é obrigatória"),
});

export async function loginAdminAction(formData: FormData) {
  const username = formData.get("username")?.toString() || "";
  const password = formData.get("password")?.toString() || "";

  const validation = LoginSchema.safeParse({ username, password });
  if (!validation.success) {
    return { error: "Preencha todos os campos corretamente." };
  }

  try {
    const userList = await db
      .select()
      .from(adminUsers)
      .where(eq(adminUsers.username, username.trim()))
      .limit(1);

    if (userList.length === 0) {
      // Fallback for initial login before first seed if desired or wrong user
      return { error: "Credenciais inválidas. Verifique usuário e senha." };
    }

    const user = userList[0];
    const passwordValid = await bcrypt.compare(password, user.passwordHash);
    if (!passwordValid) {
      return { error: "Credenciais inválidas. Verifique usuário e senha." };
    }

    const sessionToken = await createSessionToken({
      userId: user.id,
      username: user.username,
      role: "admin",
    });

    await setAdminSessionCookie(sessionToken);
  } catch (err) {
    console.error("Erro ao autenticar administrador:", err);
    return { error: "Erro ao conectar com o banco de dados. Tente novamente." };
  }

  revalidatePath("/admin");
  redirect("/admin");
}

export async function logoutAdminAction() {
  await removeAdminSessionCookie();
  revalidatePath("/admin");
  redirect("/admin/login");
}

export async function getAdminSessionAction() {
  return await getCurrentAdminSession();
}
