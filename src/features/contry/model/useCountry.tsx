import { create } from 'zustand'
import {
	filterByQuery,
	filterByPopulation,
	filterByRegions,
} from '@/entities/country/utils/filters'
import type { Country } from '@/entities/country/modal/types'
import { REGIONS } from '@/entities/country/modal/constants'

interface IInitialState {
	countries: Country[] | null
	originalCountries: Country[] | null
	likedCountries: string[] | null
	status: 'loading' | 'success' | { error: string } | null
	query: string

	regions: { id: string; name: string }[]
	population: { from: number; to: number }
}

const initialState: IInitialState = {
	originalCountries: null,
	countries: null,
	likedCountries: null,
	query: '',
	regions: REGIONS,
	population: { from: 0, to: 100000000000 },
	status: null,
}

interface CountryActions {
	setCountries: (data: Country[]) => void
	setStatus: (status: any) => void
	setRegions: (regions: { id: string; name: string }[]) => void
	setPopulation: ({ from, to }: { from: number; to: number }) => void
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
		setRegions: regionName => {
			const r = get().regions
			const res = r.some(item => item.name === regionName.name)
				? r.filter(item => item.name !== regionName.name)
				: [...r, regionName]

			set({ regions: res })
		},
		setPopulation: ({ from, to }: { from: number; to: number }) => {
			set({ population: { from, to } })
		},
		applyFilters() {
			const origCountries = get()?.originalCountries

			const { query, regions, population } = get()

			if (!origCountries?.length) return

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
		setLikedCountries({ countries }: { countries: string[] | null }) {
			set({ likedCountries: countries })
		},
	})
)
