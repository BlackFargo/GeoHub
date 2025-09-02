import axios from 'axios'
const BASE_URL = 'https://restcountries.com/v3.1/all'
import { CountriesSchema } from '@/entities/country/modal/schemas'
import type { Country } from '@/entities/country/modal/types'

export const getCountries = async (): Promise<Country[]> => {
	try {
		const response = await axios.get<Country[]>(
			`${BASE_URL}`,

			{
				params: {
					fields:
						'name,capital,flags,population,region,subregion,languages,currencies,borders,area',
				},
			}
		)
		if (CountriesSchema.safeParse(response.data).success) {
			console.log('done')
			return response.data
		} else {
			throw new Error('Invalid API data')
		}
	} catch (e: unknown) {
		if (axios.isAxiosError(e)) {
			throw new Error(`Axios error: ${e.message}`)
		} else {
			throw new Error(
				'Unexpected error: ' + (e instanceof Error ? e.message : String(e))
			)
		}
	}
}
