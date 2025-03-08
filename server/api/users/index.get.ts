import { prisma } from "~/prisma/client";

export default defineEventHandler(async (_) => {
  const users = await prisma.user.findMany({ orderBy: { name: "asc" } });
  return { users: !users.length ? [] : users };
});
