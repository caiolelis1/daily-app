import { NextResponse } from "next/server";

import prisma from "@/app/libs/prismadb";

export async function POST(request: Request) {
  try {
    const newa = await prisma.typeEvent.create({
      data: { color: "#be185d", name: "Lazer" },
    });
    const new2 = await prisma.typeEvent.create({
      data: { color: "#4338ca", name: "Academia" },
    });
    const new3 = await prisma.typeEvent.create({
      data: { color: "#7e22ce", name: "Trabalho" },
    });

    return NextResponse.json(newa);
  } catch (error: any) {
    console.log(error);
    return new NextResponse(error, { status: 500 });
  }
}
