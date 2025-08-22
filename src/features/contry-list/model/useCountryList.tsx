import { create } from 'zustand'

import { Country } from '../types'

interface IInitialState {
	countries: Country[] | null
	originalCountries: Country[] | null
	status: 'loading' | 'success' | { error: string } | null
	test: Country[] | null
	query: string
	regions: { id: string; name: string }[]
	population: { from: number; to: number }
}

const initialState: IInitialState = {
	originalCountries: null,
	countries: null,
	query: 'mol',
	regions: [
		{ id: 'region-1', name: 'Europe' },
		{ id: 'region-2', name: 'Asia' },
		{ id: 'region-3', name: 'Africa' },
		{ id: 'region-4', name: 'Americas' },
		{ id: 'region-5', name: 'Antarctic' },
		{ id: 'region-6', name: 'Oceania' },
	],
	population: { from: 0, to: 100000000000 },

	status: null,
	test: null,
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
				result = result?.filter(country =>
					country.name.common?.toLowerCase().includes(query.toLowerCase())
				)
			}

			if (population?.from >= 0 && population?.to < 100000000000) {
				result = result.filter(
					country =>
						country.population > population.from &&
						country.population < population.to
				)
			}

			if (regions?.length) {
				result = result.filter(country =>
					regions.some(reg => reg.name === country.region)
				)
			} else {
				result = []
			}

			set({ countries: result })
		},
	})
)
