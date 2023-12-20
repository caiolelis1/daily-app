import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { dateTime, description, type } = body;

    const formattedDate = new Date(dateTime).toISOString();

    const newEvent = await prisma.event.create({
      data: {
        datetime: formattedDate,
        description,
        type: { connect: { id: type } },
      },
    });
    return NextResponse.json(newEvent);
  } catch (error: any) {
    console.log(error);
    return new NextResponse(error, { status: 500 });
  }
}
