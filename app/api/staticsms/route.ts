import { NextRequest, NextResponse } from "next/server";
import prisma from "@/libs/prismadb";

export async function POST(req: NextRequest) {
  const body = await req.json();
  try {
    const { countryCode, phoneNumber, name, userId } = body;
    const qr = await prisma.staticSMS.create({
      data: {
        countryCode,
        phoneNumber,
        name,
        userId,
      },
    });
    return NextResponse.json(qr);
  } catch (error) {
    return NextResponse.json(error);
  }
}
