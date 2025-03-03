import { prisma } from "~/prisma/client";

export default defineEventHandler(async _ => {
	const mistake_periods = await prisma.mistake_period.findMany({
		include: { mistakes: true },
		where: { is_active: false },
		orderBy: { created_at: "desc" },
	});

	if (!mistake_periods) {
		return [];
	}

	return { mistake_periods };
});
