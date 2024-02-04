import prisma from "@/app/libs/prismadb";

import { auth } from "@/auth";

const getFinancesGoals = async () => {
  try {
    const session = await auth();

    const goals = await prisma.financialGoals.findMany({
      where: {
        user: {
          email: session?.user?.email,
        },
      },
    });
    return goals;
  } catch (error: any) {
    return [];
  }
};
export default getFinancesGoals;
