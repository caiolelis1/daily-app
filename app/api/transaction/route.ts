import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { type, date, description, value, category, paymentType } = body;

    const booleantype = type === "1" ? true : false;
    const formattedDate = new Date(date).toISOString();
    let formattedValue = parseFloat(value);

    if (!booleantype) formattedValue = 0 - formattedValue;

    const newTransaction = await prisma.transaction.create({
      data: {
        date: formattedDate,
        description,
        value: formattedValue,
        category: { connect: { id: category } },
        paymentType: { connect: { id: paymentType } },
      },
    });

    return NextResponse.json(newTransaction);
  } catch (error: any) {
    console.log(error);
    return new NextResponse(error, { status: 500 });
  }
}
