import { PrismaClient } from "@prisma/client";

const global_for_prisma = globalThis as unknown as { prisma?: PrismaClient };
export const prisma = global_for_prisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== "production") global_for_prisma.prisma = prisma;
