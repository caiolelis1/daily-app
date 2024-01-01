"use server";

import prisma from "@/app/libs/prismadb";

export const getUserByEmail = async (email: string) => {
  try {
    const user = await prisma.user.findUnique({ where: { email } });

    return user;
  } catch (error) {
    console.log(error);
    return null;
  }
};
