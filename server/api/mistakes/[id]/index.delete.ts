import { prisma } from "~/prisma/client";

export default defineEventHandler(async (event) => {
  const mistake_id = event.context?.params?.id;

  if (!mistake_id) {
    throw createError({ statusCode: 400, message: "ID not found." });
  }

  await prisma.user_mistake.delete({
    where: { id: parseInt(mistake_id) },
  });

  return true;
});
