import { prisma } from "~/prisma/client";

export default defineEventHandler(async _ => {
	const activeMistakePeriod = await prisma.mistake_period.findFirst({
		where: { is_active: true },
	});

	if (!activeMistakePeriod) {
		return { users: [] };
	}

	const users = await prisma.user.findMany();
	const userMistakesByPeriod = await prisma.user_mistake.findMany({
		include: { mistake: true, user: true, mistake_period: true },
		where: { mistake_period_id: activeMistakePeriod.id },
	});

	if (!userMistakesByPeriod) {
		return { users, mistakes: [] };
	}

	const mistakes: {
		user_id: number;
		items: { id: number; name: string }[];
	}[] = [];

	userMistakesByPeriod.forEach(item => {
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

	return { mistake_period: activeMistakePeriod, users, mistakes };
});
