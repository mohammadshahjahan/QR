import { NextRequest, NextResponse } from "next/server";
import prisma from "@/libs/prismadb";

export async function GET(
  req: NextRequest,
  { params }: { params: { userId: string } }
) {
  const id = params.userId;
  const staticWebsitesQrs = await prisma.staticWebsite.findMany({
    where: {
      userId: id,
    },
  });
  const staticEmailQrs = await prisma.staticEmail.findMany({
    where: {
      userId: id,
    },
  });
  const staticSMSQrs = await prisma.staticSMS.findMany({
    where: {
      userId: id,
    },
  });

  return NextResponse.json({ staticEmailQrs, staticWebsitesQrs, staticSMSQrs });
}
