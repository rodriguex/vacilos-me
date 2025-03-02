import { prisma } from "~/prisma/client";

export default defineEventHandler(async _ => {
	const lastActiveMistakePeriod = await prisma.mistake_period.findFirst({
		where: { is_active: true },
	});

	if (lastActiveMistakePeriod) {
		await prisma.mistake_period.update({
			where: { id: lastActiveMistakePeriod?.id },
			data: { is_active: false },
		});
	}

	await prisma.mistake_period.create({});
	return true;
});
