import axios from 'axios'
import { Country } from '../types'

const BASE_URL = 'https://restcountries.com/v3.1/all'

export const getCountries = async (): Promise<Country[]> => {
	try {
		const response = await axios.get<Country[]>(
			`${BASE_URL}`,
			//name/${encodeURIComponent(city)}
			{
				params: {
					fields:
						'name,capital,flags,population,region,subregion,languages,currencies,borders,area',
				},
			}
		)
		console.log(response.data)
		return response.data
	} catch (e: unknown) {
		if (axios.isAxiosError(e)) {
			throw new Error(`Axios error: ${e.message}`)
		}

		throw new Error(
			'Unexpected error: ' + (e instanceof Error ? e.message : String(e))
		)
	}
}
