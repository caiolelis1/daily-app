import prisma from "@/app/libs/prismadb";
import { auth } from "@/auth";
import { addHours, endOfMonth, startOfMonth } from "date-fns";

const getEvents = async () => {
  try {
    const session = await auth();

    const currentDate = new Date();
    addHours(currentDate, 3);
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
      orderBy: { datetime: "asc" },
    });

    const eventTypes = await prisma.typeEvent.findMany();

    const eventsWithIndex = events.map((event) => ({
      ...event,
      typeIdIndex: eventTypes.map((e) => e.id).indexOf(event.typeId),
    }));

    return eventsWithIndex;
  } catch (error: any) {
    return [];
  }
};
export default getEvents;
