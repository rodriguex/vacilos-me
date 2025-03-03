import { prisma } from "~/prisma/client";

export default defineEventHandler(async event => {
	const { name, user_id, mistake_period_id } = await readBody(event);

	const new_mistake = await prisma.mistake.create({ data: { name } });
	await prisma.user_mistake.create({
		data: { mistake_id: new_mistake.id, user_id, mistake_period_id },
	});

	return true;
});
