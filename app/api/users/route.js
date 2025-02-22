import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET() {
  const users = await prisma.user.findMany({ include: { vacilos: true } });
  return NextResponse.json(users, { status: 200 });
}

export async function POST(request) {
  const { name } = await request.json();
  try {
    const newUser = await prisma.user.create({
      data: {
        name,
      },
    });
    return NextResponse.json(newUser);
  } catch (error) {
    return NextResponse.json({ error: "Error creating user" }, { status: 500 });
  }
}
