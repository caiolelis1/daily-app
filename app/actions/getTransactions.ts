import prisma from "@/app/libs/prismadb";
import getCurrentUser from "./getCurrentUser";

const getTransactions = async () => {
  try {
    const currentUser = await getCurrentUser();

    const transactions = await prisma.transaction.findMany({
      where: {
        userId: currentUser?.id,
      },
      include: { category: true },
      orderBy: { date: "asc" },
    });
    return transactions;
  } catch (error: any) {
    return [];
  }
};
export default getTransactions;
