import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

import { LoginSchema } from "@/schemas";
import { getUserByEmail } from "@/app/actions/user";

export default {
  providers: [
    Credentials({
      async authorize(credentials) {
        const validatedFields = LoginSchema.safeParse(credentials);

        if (validatedFields.success) {
          const { email, password } = validatedFields.data;

          const user = await getUserByEmail(email);
          console.log(user?.id);
          if (!user) return null;

          if (user.hashedPassword != null) {
            const passwordMatch = await bcrypt.compare(
              password,
              user.hashedPassword
            );

            if (passwordMatch) return user;
          }
        }
        return null;
      },
    }),
  ],
} satisfies NextAuthConfig;
