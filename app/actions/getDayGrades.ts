import prisma from "@/app/libs/prismadb";
import { endOfMonth, startOfMonth } from "date-fns";
import getCurrentUser from "./getCurrentUser";

const getDayGrades = async () => {
  try {
    const currentUser = await getCurrentUser();

    const currentDate = new Date();
    const firstDayOfMonth = startOfMonth(currentDate);
    const lastDayOfMonth = endOfMonth(currentDate);

    const dayGrade = await prisma.day.findMany({
      where: {
        userId: currentUser?.id,
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
