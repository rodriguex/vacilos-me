import { prisma } from "~/prisma/client";

export default defineEventHandler(async event => {
	const { name } = await readBody(event);
	await prisma.user.create({ data: { name } });
	return true;
});
