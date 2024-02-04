import { NextResponse } from "next/server";

import prisma from "@/app/libs/prismadb";
import { auth } from "@/auth";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, value, imgPath, link } = body;

    const session = await auth();

    if (session?.user)
      if (session.user.email) {
        const newGoal = await prisma.financialGoals.create({
          data: {
            user: { connect: { email: session.user.email } },
            name,
            value: parseFloat(value),
            imgPath,
            link,
          },
        });

        return NextResponse.json(newGoal);
      }
    return new NextResponse("Unauthorized", { status: 401 });
  } catch (error: any) {
    console.log(error);
    return new NextResponse(error, { status: 500 });
  }
}
