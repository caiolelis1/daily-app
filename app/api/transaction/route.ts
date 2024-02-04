import { NextResponse } from "next/server";

import prisma from "@/app/libs/prismadb";
import { auth } from "@/auth";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { type, date, description, value, category, paymentType } = body;

    const session = await auth();

    const booleantype = type === "1" ? true : false;
    const formattedDate = new Date(date).toUTCString();
    let formattedValue = parseFloat(value);

    if (!booleantype) formattedValue = 0 - formattedValue;

    if (session?.user)
      if (session.user.email) {
        const newTransaction = await prisma.transaction.create({
          data: {
            user: { connect: { email: session.user.email } },
            date: formattedDate,
            description,
            value: formattedValue,
            category: { connect: { id: category } },
            paymentType: { connect: { id: paymentType } },
          },
        });

        return NextResponse.json(newTransaction);
      }

    return new NextResponse("Unauthorized", { status: 401 });
  } catch (error: any) {
    console.log(error);
    return new NextResponse(error, { status: 500 });
  }
}
