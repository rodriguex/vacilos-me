import { prisma } from "~/prisma/client";

export default defineEventHandler(async _ => {
	const active_mistake_period = await prisma.mistake_period.findFirst({
		where: { is_active: true },
	});

	if (!active_mistake_period) {
		return { users: [] };
	}

	const users = await prisma.user.findMany();
	const user_mistakes_by_period = await prisma.user_mistake.findMany({
		include: { mistake: true, user: true, mistake_period: true },
		where: { mistake_period_id: active_mistake_period.id },
	});

	if (!user_mistakes_by_period) {
		return { users, mistakes: [] };
	}

	const mistakes: {
		user_id: number;
		items: { id: number; name: string }[];
	}[] = [];

	user_mistakes_by_period.forEach(item => {
		const idx = mistakes.findIndex(mistake => mistake.user_id == item.user_id);
		if (idx > -1) {
			mistakes[idx].items.push({
				id: item.mistake.id,
				name: item.mistake.name,
			});
		} else {
			mistakes.push({
				user_id: item.user_id,
				items: [
					{
						id: item.mistake.id,
						name: item.mistake.name,
					},
				],
			});
		}
	});

	return { mistake_period: active_mistake_period, users, mistakes };
});
