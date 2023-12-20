import prisma from "@/app/libs/prismadb";

const getTypes = async () => {
  try {
    const types = await prisma.typeEvent.findMany();
    return types;
  } catch (error: any) {
    return [];
  }
};
export default getTypes;
