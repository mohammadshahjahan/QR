import { NextRequest, NextResponse } from "next/server";
import prisma from "@/libs/prismadb";

export async function POST(req: NextRequest) {
  const body = await req.json();
  try {
    const { goToMail, name, userId } = body;
    const qr = await prisma.staticEmail.create({
      data: {
        goToMail,
        name,
        userId,
      },
    });
    return NextResponse.json(qr);
  } catch (error) {
    return NextResponse.json(error);
  }
}
