import { NextRequest, NextResponse } from "next/server";
import prisma from "@/libs/prismadb";

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const body = await req.json();
  try {
    const name = body.name;
    const phone = body.phone;
    const countryCode = body.countryCode;
    const r = await prisma.dyanamicSMS.update({
      where: {
        id: params.id,
      },
      data: {
        name: name,
        countryCode,
        phoneNumber: phone,
      },
    });
    return NextResponse.json(r);
  } catch (error) {
    return NextResponse.json(error);
  }
}
