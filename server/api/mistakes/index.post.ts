import { prisma } from "~/prisma/client";

export default defineEventHandler(async event => {
	const { name, user_id, mistake_period_id } = await readBody(event);

	const newMistake = await prisma.mistake.create({ data: { name } });
	await prisma.user_mistake.create({
		data: { mistake_id: newMistake.id, user_id, mistake_period_id },
	});

	return true;
});
