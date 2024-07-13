import { NextRequest, NextResponse } from "next/server";
import prisma from "@/libs/prismadb";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const qrID = params.id;
    // const newQr = await prisma.dyanamicWebsite.update({
    //   where: {
    //     id: qrID,
    //   },
    //   data: {
    //     goToURL: url,
    //   },
    // });
    const newQr = await prisma.dyanamicWebsite.findFirst({
      where: {
        id: qrID,
      },
    });
    return NextResponse.json(newQr);
  } catch (error) {
    return NextResponse.json(error);
  }
}
