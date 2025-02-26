import { prisma } from "~/prisma/client";

export default defineEventHandler(async _ => {
	const users = await prisma.user.findMany({
		orderBy: { user_vacilo: { _count: "desc" } },
		include: { user_vacilo: { include: { vacilo: true } } },
	});
	return { users };
});
