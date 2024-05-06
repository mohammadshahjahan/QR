import { NextRequest, NextResponse } from "next/server";
import prisma from "@/libs/prismadb";

export async function POST(req: NextRequest) {
  const body = await req.json();
  try {
    const { email } = body;
    const u = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (!u) {
      throw new Error("not found user");
    }
    return NextResponse.json(u.id);
  } catch (error) {
    return NextResponse.json(error);
  }
}
