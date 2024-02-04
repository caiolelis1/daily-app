import prisma from "@/app/libs/prismadb";

const getPaymentTypes = async () => {
  try {
    const types = await prisma.paymentType.findMany();
    return types;
  } catch (error: any) {
    return [];
  }
};
export default getPaymentTypes;
