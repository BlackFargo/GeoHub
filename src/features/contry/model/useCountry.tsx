import { create } from 'zustand'
import {
	filterByQuery,
	filterByPopulation,
	filterByRegions,
} from '@/entities/country/modal/utils'
import type { Country } from '@/entities/country/modal/types'
import { REGIONS } from '@/entities/country/modal/constants'

interface IInitialState {
	countries: Country[] | null
	originalCountries: Country[] | null
	status: 'loading' | 'success' | { error: string } | null
	query: string
	regions: { id: string; name: string }[]
	population: { from: number; to: number }
}

const initialState: IInitialState = {
	originalCountries: null,
	countries: null,
	query: 'mol',
	regions: REGIONS,
	population: { from: 0, to: 100000000000 },
	status: null,
}

interface CountryActions {
	setCountries: (data: Country[]) => void
	setStatus: (status: any) => void
	setRegions: (regions: { id: string; name: string }[]) => void
	setPopulation: (from: number, to: number) => void
	setQuery: (query: string) => void
	applyFilters: () => void
}

export const useCountryList = create<IInitialState & CountryActions>(
	(set, get) => ({
		...initialState,
		setCountries: countries => {
			set({ originalCountries: countries })
		},
		setStatus: status => {
			set({ status: status })
		},
		setQuery: (query: string) => {
			set({ query: query })
		},
		setRegions: regions => {
			set({ regions: regions })
		},
		setPopulation: (from: number, to: number) => {
			set({ population: { from, to } })
		},
		applyFilters() {
			const origCountries = get()?.originalCountries

			const { query, regions, population } = get()

			if (!origCountries?.length) return
			console.log(regions)
			let result = origCountries

			if (query) {
				result = filterByQuery(result, query)
			}

			if (population?.from >= 0 && population?.to < 100000000000) {
				result = filterByPopulation(result, population.from, population.to)
			}

			if (regions?.length) {
				result = filterByRegions(result, regions)
			} else {
				result = []
			}

			set({ countries: result })
		},
	})
)
