import prisma from "@/app/libs/prismadb";

const getCategories = async () => {
  try {
    const categories = await prisma.category.findMany();
    return categories;
  } catch (error: any) {
    return [];
  }
};
export default getCategories;
