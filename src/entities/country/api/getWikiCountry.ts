import { WikiCountrySchema } from '../modal/schemas'

export async function getWikiCountry(name: string) {
	const res = await fetch(`/api/wiki?q=${name}`)
	const rawData = await res.json()

	const parsed = WikiCountrySchema.safeParse(rawData)

	if (!parsed.success) {
		console.error('Invalid data format', parsed.error)
		throw new Error('Invalid country data')
	}
	console.log(parsed.data)

	return parsed.data
}
