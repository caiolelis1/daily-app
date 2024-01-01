import prisma from "@/app/libs/prismadb";

import { auth } from "@/auth";

const getTransactions = async () => {
  try {
    const session = await auth();

    const transactions = await prisma.transaction.findMany({
      include: { category: true, user: true },
      where: {
        user: {
          email: session?.user?.email,
        },
      },
      orderBy: { date: "asc" },
    });
    return transactions;
  } catch (error: any) {
    return [];
  }
};
export default getTransactions;
