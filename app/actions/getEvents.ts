import prisma from "@/app/libs/prismadb";

const getEvents = async () => {
  try {
    const events = await prisma.event.findMany();
    return events;
  } catch (error: any) {
    return [];
  }
};
export default getEvents;
