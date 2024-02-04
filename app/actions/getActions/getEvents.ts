import prisma from "@/app/libs/prismadb";
import { auth } from "@/auth";

const getEvents = async () => {
  try {
    const session = await auth();

    const events = await prisma.event.findMany({
      where: {
        user: {
          email: session?.user?.email,
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
