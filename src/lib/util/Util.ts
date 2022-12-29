/**
 * Takes a date in the seconds - nanoseconds format and returns a Date object.
 */
export function parseFirebaseDate(firebaseDate: {
	seconds: number
	nanoseconds: number
}): Date {
	return new Date(firebaseDate.seconds * 1000)
}

export function readableDate(date: Date): string {
	let YY = date.getFullYear()
	let MM = (date.getMonth() + 1).toString().padStart(2, '0')
	let DD = date.getDate().toString().padStart(2, '0')

	let hh = date.getHours().toString().padStart(2, '0')
	let mm = date.getMinutes().toString().padStart(2, '0')

	return `${YY}-${MM}-${DD} ${hh}:${mm}`
}
