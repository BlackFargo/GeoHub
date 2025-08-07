import { create } from 'zustand'

import { Country } from '../types'

interface IInitialState {
	countries: Country[] | null
	originalCountries: Country[] | null
	status: 'loading' | 'success' | { error: string } | null
	test: Country[] | null
}

const initialState: IInitialState = {
	originalCountries: null,
	countries: null,

	status: null,
	test: null,
}

interface CountryActions {
	setCountries: (data: Country[]) => void
	setStatus: (status: any) => void
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
		setCountry: (query: string) => {
			const countries = get()?.originalCountries

			if (countries?.length) {
				const filter = countries.filter(country =>
					country.name.common.toLowerCase().includes(query.toLowerCase())
				)
				set({ countries: filter })
			}
		},
	})
)
