// // import bcrypt from "bcryptjs";
// // import type { NextAuthConfig } from "next-auth";
// // import Credentials from "next-auth/providers/credentials";
// // import Github from "next-auth/providers/github";
// // import Google from "next-auth/providers/google";

// // import { LoginSchema } from "@/schemas";
// // import { getUserByEmail } from "@/data/user";

// import bcrypt from "bcrypt";
// import CredentialsProvider from "next-auth/providers/credentials";
// import prisma from "@/app/libs/prismadb";
// import type { NextAuthConfig } from "next-auth";

// export default {
//   providers: [
//     CredentialsProvider({
//       name: "credentials",
//       credentials: {
//         email: { label: "email", type: "text" },
//         password: { label: "password", type: "password" },
//       },
//       async authorize(credentials) {
//         if (!credentials?.email || !credentials?.password) {
//           throw new Error("Invalid credentials");
//         }

//         const user = await prisma.user.findUnique({
//           where: {
//             email: credentials.email,
//           },
//         });

//         if (!user || !user?.hashedPassword) {
//           throw new Error("Invalid credentials");
//         }

//         const isCorrectPassword = await bcrypt.compare(
//           credentials.password,
//           user.hashedPassword
//         );

//         if (!isCorrectPassword) {
//           throw new Error("Invalid credentials");
//         }

//         return user;
//       },
//     }),
//   ],
// } satisfies NextAuthConfig;
