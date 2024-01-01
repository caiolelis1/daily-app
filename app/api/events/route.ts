import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { dateTime, hour, minute, description, type } = body;

    const currentUser = await getCurrentUser();

    const formattedDate = new Date(dateTime);
    formattedDate.setHours(hour);
    formattedDate.setMinutes(minute);
    formattedDate.toISOString();

    const newEvent = await prisma.event.create({
      data: {
        datetime: formattedDate,
        description,
        type: { connect: { id: type } },
        user: { connect: { id: currentUser?.id } },
      },
    });
    return NextResponse.json(newEvent);
  } catch (error: any) {
    console.log(error);
    return new NextResponse(error, { status: 500 });
  }
}
