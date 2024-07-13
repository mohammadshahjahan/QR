import { NextRequest, NextResponse } from "next/server";
import prisma from "@/libs/prismadb";

export async function POST(req: NextRequest) {
  const body = await req.json();
  try {
    const { goToURL, name, email } = body;
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

    const qr = await prisma.dyanamicWebsite.create({
      data: {
        proxyURL: a,
        goToURL,
        name,
        userId: u.id,
      },
    });
    const newQr = await prisma.dyanamicWebsite.update({
      where: {
        id: qr.id,
      },
      data: {
        proxyURL: a + "url/" + qr.id,
      },
    });

    return NextResponse.json(newQr);
  } catch (error) {
    return NextResponse.json(error);
  }
}


