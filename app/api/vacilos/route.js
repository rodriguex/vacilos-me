import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET() {
  const vacilos = await prisma.vacilo.findMany({ include: { user: true } });
  return NextResponse.json(vacilos, { status: 200 });
}

export async function POST(request) {
  const { name, userId } = await request.json();
  try {
    const newVacilo = await prisma.vacilo.create({
      data: {
        name,
        userId,
      },
    });
    return NextResponse.json(newVacilo);
  } catch (error) {
    return NextResponse.json(
      { error: "Error creating vacilo" },
      { status: 500 }
    );
  }
}
