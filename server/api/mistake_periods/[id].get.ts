import { prisma } from "~/prisma/client";

export default defineEventHandler(async event => {
	const id = event.context.params?.id;
	if (!id) {
		throw createError({ statusCode: 400, message: "No ID found" });
	}

	const mistake_period = await prisma.mistake_period.findFirst({
		include: { mistakes: { include: { mistake: true, user: true } } },
		where: { id: parseInt(id) },
		orderBy: { created_at: "desc" },
	});

	if (!mistake_period) {
		return null;
	}

	const user_mistakes: {
		user_id: number;
		user_name: string;
		mistakes: { id: number; name: string }[];
	}[] = [];

	mistake_period.mistakes.forEach(data => {
		const idx = user_mistakes.findIndex(item => item.user_id === data.user_id);
		if (idx > -1) {
			user_mistakes[idx].mistakes.push({
				id: data.mistake_id,
				name: data.mistake.name,
			});
		} else {
			user_mistakes.push({
				user_id: data.user_id,
				user_name: data.user.name,
				mistakes: [data.mistake],
			});
		}
	});

	const users = await prisma.user.findMany();

	return { mistake_period, user_mistakes, users };
});
