import prisma from "@/app/libs/prismadb";

const getTransactions = async () => {
  try {
    const transactions = await prisma.transaction.findMany({
      include: { category: true },
      orderBy: { date: "asc" },
    });
    return transactions;
  } catch (error: any) {
    return [];
  }
};
export default getTransactions;
