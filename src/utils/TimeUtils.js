export const timeDifference = (current, previous) => {
	let msPerMinute = 60 * 1000;
	let msPerHour = msPerMinute * 60;
	let msPerDay = msPerHour * 24;
	let msPerMonth = msPerDay * 30;
	let msPerYear = msPerDay * 365;

	let elapsed = current - previous;

	if (elapsed < msPerMinute) {
		let seconds = Math.round(elapsed / 1000);
		return seconds + (seconds === 1 ? " segundo" : " segundos");
	} else if (elapsed < msPerHour) {
		let minutes = Math.round(elapsed / msPerMinute);
		return minutes + (minutes === 1 ? " minuto" : " minutos");
	} else if (elapsed < msPerDay) {
		let hours = Math.round(elapsed / msPerHour);
		return hours + (hours === 1 ? " hora" : " horas");
	} else if (elapsed < msPerMonth) {
		let days = Math.round(elapsed / msPerDay);
		return days + (days === 1 ? " día" : " días");
	} else if (elapsed < msPerYear) {
		let months = Math.round(elapsed / msPerMonth);
		return months + (months === 1 ? " mes" : " meses");
	} else {
		let years = Math.round(elapsed / msPerYear);
		return years + (years === 1 ? " año" : " años");
	}
};
