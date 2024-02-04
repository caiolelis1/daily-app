import { NextResponse, NextRequest } from "next/server";

import prisma from "@/app/libs/prismadb";
import { auth } from "@/auth";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { dateTime, time, description, type } = body;
    let { allDay } = body;

    if (!allDay) allDay = false;

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

        const eventTypes = await prisma.typeEvent.findMany();

        const eventWithIndex = {
          ...newEvent,
          typeIdIndex: eventTypes.map((e) => e.id).indexOf(newEvent.typeId),
        };

        return NextResponse.json(eventWithIndex);
      }

    return new NextResponse("Unauthorized", { status: 401 });
  } catch (error: any) {
    console.log(error);
    return new NextResponse(error, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const urlParams = new URL(request.url);
    const id = urlParams.searchParams.get("id");

    if (!id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const session = await auth();

    if (session?.user) {
      if (session.user.email) {
        await prisma.event.delete({ where: { id } });
        return new NextResponse("Sucesso!", { status: 200 });
      }
    }

    return new NextResponse("Unauthorized", { status: 401 });
  } catch (error: any) {
    console.log(error);
    return new NextResponse(error, { status: 500 });
  }
}
