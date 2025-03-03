import { prisma } from "~/prisma/client";

export default defineEventHandler(async _ => {
	const last_active_mistake_period = await prisma.mistake_period.findFirst({
		where: { is_active: true },
	});

	if (last_active_mistake_period) {
		await prisma.mistake_period.update({
			where: { id: last_active_mistake_period?.id },
			data: { is_active: false },
		});
	}

	await prisma.mistake_period.create({});
	return true;
});
