import axios from 'axios'
import { Country } from '../types'

const BASE_URL = 'https://restcountries.com/v3.1/all'

export const getCountries = async (city: string): Promise<Country[]> => {
	try {
		if (city) {
			const response = await axios.get<Country[]>(
				`https://restcountries.com/v3.1/name/${encodeURIComponent(city)}`,
				{
					params: {
						fields:
							'name,capital,flags,population,region,subregion,languages,currencies,borders,area',
					},
				}
			)
			console.log(response.data)
			return response.data
		} else {
			const response = await axios.get<Country[]>(BASE_URL, {
				params: {
					fields:
						'name,capital,flags,population,region,subregion,languages,currencies,borders,area',
				},
			})

			return response.data
		}
	} catch (e: unknown) {
		if (axios.isAxiosError(e)) {
			throw new Error(`Axios error: ${e.message}`)
		}

		throw new Error(
			'Unexpected error: ' + (e instanceof Error ? e.message : String(e))
		)
	}
}
export const getCountriesWithRegion = async (
	region: string[]
): Promise<Country[]> => {
	try {
		if (region.length === 1) {
			const response = await axios.get<Country[]>(
				`https://restcountries.com/v3.1/region/${encodeURIComponent(
					region[0]
				)}`,
				{
					params: {
						fields:
							'name,capital,flags,population,region,subregion,languages,currencies,borders,area',
					},
				}
			)

			return response.data
		} else {
			const requests = region.map(async region => {
				const response = await axios.get<Country[]>(
					`https://restcountries.com/v3.1/region/${encodeURIComponent(region)}`,
					{
						params: {
							fields:
								'name,capital,flags,population,region,subregion,languages,currencies,borders,area',
						},
					}
				)
				return response.data
			})
			const responses = await Promise.all(requests)
			const allCountries = responses.flatMap(response => response)

			return allCountries
		}
	} catch (e: unknown) {
		if (axios.isAxiosError(e)) {
			throw new Error(`Axios error: ${e.message}`)
		}

		throw new Error(
			'Unexpected error: ' + (e instanceof Error ? e.message : String(e))
		)
	}
}
