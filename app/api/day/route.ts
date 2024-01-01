import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { day, grade, description } = body;

    const currentUser = await getCurrentUser();

    const formattedDate = new Date(day).toISOString();
    const formattedGrade = parseInt(grade);

    const newDay = await prisma.day.create({
      data: {
        user: { connect: { id: currentUser?.id } },
        date: formattedDate,
        grade: formattedGrade,
        description,
      },
    });
    return NextResponse.json(newDay);
  } catch (error: any) {
    console.log(error);
    return new NextResponse(error, { status: 500 });
  }
}
