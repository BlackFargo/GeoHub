import { WikiCountrySchema } from '../modal/schemas'
import axios from 'axios'

export async function getWikiCountry(name: string) {
	try {
		const res = await axios.get(`/api/wiki?q=${name}`)
		const rawData = res.data

		const parsed = WikiCountrySchema.safeParse(rawData)

		if (!parsed.success) {
			console.error('Invalid data format', parsed.error)
			return null
		}

		return parsed.data
	} catch (e: unknown) {
		if (axios.isAxiosError(e)) {
			console.error('Error fetching wiki data:', e.message)
		} else {
			console.error('Unexpected error:', e)
		}
		return null
	}
}
