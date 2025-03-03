import { prisma } from "~/prisma/client";

export default defineEventHandler(async event => {
	const id = event.context.params?.id;
	if (!id) {
		throw createError({ statusCode: 400, message: "Id not found" });
	}

	await prisma.mistake_period.update({
		data: { finished_at: new Date(), is_active: false },
		where: { id: parseInt(id) },
	});
});
