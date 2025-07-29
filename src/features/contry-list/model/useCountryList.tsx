import { create } from 'zustand'
import { getCountries } from '../api/contryAPI'
import { Country } from '../types'

interface IInitialState {
	countries: Country[] | null
	status: 'loading' | 'success' | { error: string } | null
	test: Country[] | null
}

const initialState: IInitialState = {
	countries: null,
	status: null,
	test: null,
}

interface CountryActions {
	setCountries: () => Promise<void>
	searchCountry: (value: string) => void
}

export const useCountryList = create<IInitialState & CountryActions>(
	(set, get) => ({
		...initialState,
		setCountries: async () => {
			set({ status: 'loading' })
			try {
				const res = await getCountries()
				set({ countries: res, status: 'success' })
			} catch (error: unknown) {
				if (error instanceof Error) {
					set({ status: { error: error.message } })
				}
			}
		},
		searchCountry: value => {
			const currentCountries = get().countries

			const filter = currentCountries?.filter(country =>
				country.name.common.toLowerCase().includes(value.toLowerCase())
			)
			console.log(filter)
			set({ test: filter })
		},
	})
)
