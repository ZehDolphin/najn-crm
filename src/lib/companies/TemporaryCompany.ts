export async function search(s: string): Promise<{ name: string }[]> {
	let resp = await fetch(`http://localhost:4000/company-search?s=${s}`)
	return await resp.json()
}

export async function getCompanyByName(
	name: string
): Promise<EniroCompany | null> {
	let resp = await fetch(`http://localhost:4000/company/${name}`)
	if (resp.status !== 200) return null
	return await resp.json()
}

export interface EniroCompany {
	name: string
	phones: {
		text: string
		number: string
	}[]
	eniroId: number
	hitType: 'ranked'
	ranking: number
	customer: boolean
	keywords: string[]
	products: any[]
	addresses: {
		region: string
		borough: any
		province: string
		community: any
		urbanArea: any
		postalArea: string
		postalCode: string
		streetName: string
		coordinates: {
			lat: number
			lon: number
			type: string
		}[]
		municipality: string
		neighborhood: any
		streetNumber: string
		metropolitanSubarea: any
	}[]
	districts: any[]
	categories: {
		code: string
		name: string
	}[]
	organisationNumber: string
}
