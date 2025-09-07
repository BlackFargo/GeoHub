import { Country, ISelectedRegion } from '../modal/types'

export const filterByQuery = (countries: Country[], query: string) =>
	countries.filter(c =>
		c.name.common.toLowerCase().includes(query.toLowerCase())
	)

export const filterByPopulation = (
	countries: Country[],
	from: number,
	to: number
) => countries.filter(c => c.population >= from && c.population <= to)

export const filterByRegions = (
	countries: Country[],
	regions: ISelectedRegion[]
) => countries.filter(c => regions.some(r => r.name === c.region))
