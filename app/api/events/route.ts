import prisma from "@/app/libs/prismadb";
import { auth } from "@/auth";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log(body);
    const { dateTime, time, description, type, allDay } = body;

    const session = await auth();

    const formattedDate = new Date(dateTime);
    if (time != undefined) {
      const formattedTime = time.split(":");
      formattedDate.setHours(formattedTime[0]);
      formattedDate.setMinutes(formattedTime[1]);
    }
    formattedDate.toUTCString();

    if (session?.user)
      if (session.user.email) {
        const newEvent = await prisma.event.create({
          data: {
            allDay,
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
