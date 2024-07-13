import { NextRequest, NextResponse } from "next/server";
import prisma from "@/libs/prismadb";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const qrID = params.id;

    const newQr = await prisma.dyanamicEmail.findFirst({
      where: {
        id: qrID,
      },
    });
    return NextResponse.json(newQr);
  } catch (error) {
    return NextResponse.json(error);
  }
}
