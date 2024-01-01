import prisma from "@/app/libs/prismadb";
import { endOfMonth, startOfMonth } from "date-fns";
import { auth } from "@/auth";

const getDayGrades = async () => {
  try {
    const session = await auth();

    const currentDate = new Date();
    const firstDayOfMonth = startOfMonth(currentDate);
    const lastDayOfMonth = endOfMonth(currentDate);

    const dayGrade = await prisma.day.findMany({
      include: { user: true },
      where: {
        user: {
          email: session?.user?.email,
        },
        date: {
          gte: new Date(firstDayOfMonth), // Start of date range
          lte: new Date(lastDayOfMonth),
        },
      },
    });
    return dayGrade;
  } catch (error: any) {
    return [];
  }
};
export default getDayGrades;
