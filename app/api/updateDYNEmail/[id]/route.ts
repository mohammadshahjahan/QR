import { NextRequest, NextResponse } from "next/server";
import prisma from "@/libs/prismadb";

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const body = await req.json();
  try {
    const name = body.name;
    const email = body.email;
    const r = await prisma.dyanamicEmail.update({
      where: {
        id: params.id,
      },
      data: {
        name: name,
        goToMail: email,
      },
    });
    return NextResponse.json(r);
  } catch (error) {
    return NextResponse.json(error);
  }
}
