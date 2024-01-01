import prisma from "@/app/libs/prismadb";
import { auth } from "@/auth";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { day, grade, description } = body;

    const session = await auth();

    const formattedDate = new Date(day).toISOString();
    const formattedGrade = parseInt(grade);
    if (session?.user)
      if (session.user.email) {
        const newDay = await prisma.day.create({
          data: {
            user: { connect: { email: session.user.email } },
            date: formattedDate,
            grade: formattedGrade,
            description,
          },
        });
        return NextResponse.json(newDay);
      }
    return new NextResponse("Unauthorized", { status: 401 });
  } catch (error: any) {
    console.log(error);
    return new NextResponse(error, { status: 500 });
  }
}
