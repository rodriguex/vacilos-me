import { prisma } from "~/prisma/client";

export default defineEventHandler(async event => {
	const { name, user_id } = await readBody(event);
	const vacilo = await prisma.vacilo.create({ data: { name } });
	await prisma.user_vacilo.create({ data: { vacilo_id: vacilo.id, user_id } });
	return true;
});
