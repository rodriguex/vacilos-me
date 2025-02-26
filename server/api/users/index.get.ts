import { prisma } from "~/prisma/client";

export default defineEventHandler(async _ => {
	const users = await prisma.user.findMany({
		include: { user_vacilo: { include: { vacilo: true } } },
	});
	return { users };
});
