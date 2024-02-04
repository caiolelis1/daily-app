"use server";

import { AuthError } from "next-auth";
import * as z from "zod";

import { signIn } from "@/auth";
import { getUserByEmail } from "@/app/actions/user";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { loginSchema } from "@/schemas";

export const login = async (values: z.infer<typeof loginSchema>) => {
  const validatedFields = loginSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Campos inválidos!" };
  }

  const { email, password } = validatedFields.data;

  const existingUser = await getUserByEmail(email);

  if (!existingUser || !existingUser.email) {
    return { error: "Email não existe!" };
  }

  try {
    await signIn("credentials", {
      ...values,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Credenciais inválidas!" };
        default:
          return { error: "Algo deu errado!" };
      }
    }

    throw error;
  }
};
