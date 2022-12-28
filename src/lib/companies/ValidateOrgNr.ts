/**
 * Validates a Swedish Organisation Number.
 */
export function validateOrganisationNumber(orgnr: string): boolean {
	var orgnumber = cleanDigitString(orgnr)
	return isValidLuhn(orgnumber)
}

/**
 * Remove any non digit characters
 */
export function cleanDigitString(digitString: string): string {
	return digitString.replace(/\D/g, '')
}

/**
 * Check if last digit of number is vald Luhn control digit
 */
function isValidLuhn(pnr: string): boolean {
	var number
	var checksum = 0
	for (var i = pnr.length - 1; i >= 0; i--) {
		number = parseInt(pnr.charAt(i))
		if (i % 2 == 1) {
			checksum += number
		} else {
			checksum += number * 2 > 9 ? number * 2 - 9 : number * 2
		}
	}

	return checksum % 10 == 0
}
