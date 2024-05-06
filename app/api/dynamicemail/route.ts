import { NextRequest, NextResponse } from "next/server";
import prisma from "@/libs/prismadb";

export async function POST(req: NextRequest) {
  const body = await req.json();
  try {
    const { goToMail, name, email } = body;
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
    const qr = await prisma.dyanamicEmail.create({
      data: {
        proxyURL: a,
        goToMail,
        name,
        userId: u.id,
      },
    });

    const newQr = await prisma.dyanamicEmail.update({
      where: {
        id: qr.id,
      },
      data: {
        proxyURL: a + "email/" + qr.id,
      },
    });
    return NextResponse.json(newQr);
  } catch (error) {
    return NextResponse.json(error);
  }
}
