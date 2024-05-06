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
    const a = process.env.NEXTPROXY_URL as string;
    console.log(a);
    const qr = await prisma.dyanamicSMS.create({
      data: {
        proxyURL: a,
        countryCode,
        phoneNumber,
        name,
        userId: u.id,
      },
    });

    const newQr = await prisma.dyanamicSMS.update({
      where: {
        id: qr.id,
      },
      data: {
        proxyURL: a + "sms/" + qr.id,
      },
    });
    return NextResponse.json(newQr);
  } catch (error) {
    return NextResponse.json(error);
  }
}
