import { prisma } from "~/prisma/client";

export default defineEventHandler(async (_) => {
  const user_mistakes = await prisma.user_mistake.findMany({
    include: { mistake: true, mistake_period: true, user: true },
  });

  if (!user_mistakes) {
    return { user_mistakes: [] };
  }

  const result: {
    user_id: number;
    user_name: string;
    mistakes: { id: number; name: string }[];
  }[] = [];

  user_mistakes.forEach((data) => {
    const idx = result.findIndex((item) => item.user_id === data.user_id);
    if (idx > -1) {
      result[idx].mistakes.push({
        id: data.mistake.id,
        name: data.mistake.name,
      });
    } else {
      result.push({
        user_id: data.user_id,
        user_name: data.user.name,
        mistakes: [{ id: data.mistake_id, name: data.mistake.name }],
      });
    }
  });

  result.sort((a: any, b: any) => b.mistakes.length - a.mistakes.length);
  return { user_mistakes: result };
});
