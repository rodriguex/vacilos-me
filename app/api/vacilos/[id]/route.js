import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function DELETE(_, { params }) {
  const { id } = await params;
  try {
    await prisma.vacilo.delete({ where: { id: parseInt(id) } });
    return NextResponse.json({ data: true }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Error deleting vacilo" },
      { status: 500 }
    );
  }
}
