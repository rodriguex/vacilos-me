export function convert_date_to_brazilian_format(
	date: Date | string,
	showTime = true,
) {
	if (!date) return;

	let options: Intl.DateTimeFormatOptions = {
		timeZone: "America/Sao_Paulo",
		year: "numeric",
		month: "2-digit",
		day: "2-digit",
		hour12: false,
	};

	if (showTime) {
		options = { ...options, hour: "2-digit", minute: "2-digit" };
	}

	const newDate = new Date(date);
	return new Intl.DateTimeFormat("pt-BR", options).format(newDate);
}
