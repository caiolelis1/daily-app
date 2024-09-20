import prisma from "@/app/libs/prismadb";
import { auth } from "@/auth";

const getDayGrades = async () => {
  try {
    const session = await auth();

    const dayGrade = await prisma.day.findMany({
      include: { user: true },
      where: {
        user: {
          email: session?.user?.email,
        },
      },
    });
    return dayGrade;
  } catch (error: any) {
    return [];
  }
};
export default getDayGrades;
