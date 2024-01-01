import prisma from "@/app/libs/prismadb";
import { endOfMonth, startOfMonth } from "date-fns";
import getCurrentUser from "./getCurrentUser";

const getEvents = async () => {
  try {
    const currentUser = await getCurrentUser();

    const currentDate = new Date();
    const firstDayOfMonth = startOfMonth(currentDate);
    const lastDayOfMonth = endOfMonth(currentDate);

    const events = await prisma.event.findMany({
      where: {
        userId: currentUser?.id,
        datetime: {
          gte: new Date(firstDayOfMonth), // Start of date range
          lte: new Date(lastDayOfMonth),
        },
      },
    });
    return events;
  } catch (error: any) {
    return [];
  }
};
export default getEvents;
