function formatDateString(dateString) {
	const months = [
		'January', 'February', 'March', 'April', 'May', 'June', 'July',
		'August', 'September', 'October', 'November', 'December'
	];

	const daysOfWeek = [
		'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'
	];

	const [datePart] = dateString.split(' ');
	const [year, month, day] = datePart.split('-').map(Number);

	const date = new Date(year, month - 1, day);
	const dayOfWeek = daysOfWeek[date.getDay()];
	const monthName = months[month - 1];

	return `${dayOfWeek}, ${monthName} ${day}`;
}

export default formatDateString