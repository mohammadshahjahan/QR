import { NextRequest, NextResponse } from "next/server";
import prisma from "@/libs/prismadb";

export async function POST(req: NextRequest) {
  const body = await req.json();
  try {
    const { countryCode, phoneNumber, name, email } = body;
    const u = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    if (!u) {
      throw new Error("not found user");
    }
    const qr = await prisma.staticSMS.create({
      data: {
        countryCode,
        phoneNumber,
        name,
        userId: u.id,
      },
    });
    return NextResponse.json(qr);
  } catch (error) {
    return NextResponse.json(error);
  }
}
