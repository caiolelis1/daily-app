import prisma from "@/app/libs/prismadb";
import { auth } from "@/auth";
import { endOfMonth, startOfMonth } from "date-fns";
// import getCurrentUser from "./getCurrentUser";

const getEvents = async () => {
  try {
    const session = await auth();
    // const currentUser = await getCurrentUser();

    const currentDate = new Date();
    const firstDayOfMonth = startOfMonth(currentDate);
    const lastDayOfMonth = endOfMonth(currentDate);

    const events = await prisma.event.findMany({
      include: { user: true },
      where: {
        user: {
          email: session?.user?.email,
        },
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
