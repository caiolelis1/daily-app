import prisma from "@/app/libs/prismadb";
import { auth } from "@/auth";
import { addHours, parseISO } from "date-fns";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { dateTime, hour, minute, description, type } = body;

    const session = await auth();

    const formattedDate = new Date(dateTime);
    formattedDate.setHours(hour + 3);
    formattedDate.setMinutes(minute);
    formattedDate.toUTCString();

    if (session?.user)
      if (session.user.email) {
        const newEvent = await prisma.event.create({
          data: {
            datetime: formattedDate,
            description,
            type: { connect: { id: type } },
            user: { connect: { email: session.user.email } },
          },
        });
        return NextResponse.json(newEvent);
      }

    return new NextResponse("Unauthorized", { status: 401 });
  } catch (error: any) {
    console.log(error);
    return new NextResponse(error, { status: 500 });
  }
}
