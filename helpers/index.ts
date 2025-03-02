export function convertDateToBrazilianFormat(date: Date | string) {
	if (!date) return;

	const newDate = new Date(date);
	return new Intl.DateTimeFormat("pt-BR", {
		timeZone: "America/Sao_Paulo",
		year: "numeric",
		month: "2-digit",
		day: "2-digit",
		hour: "2-digit",
		minute: "2-digit",
		hour12: false,
	}).format(newDate);
}
