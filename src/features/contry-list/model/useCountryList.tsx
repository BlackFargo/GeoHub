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
		setCountries: async country => {
			set({ status: 'loading' })
			try {
				const res = await getCountries(country)
				set({ countries: res, status: 'success' })
				console.log(res)
			} catch (error: unknown) {
				if (error instanceof Error) {
					set({ status: { error: error.message } })
				}
			}
		},
		searchCountry: value => {
			get().setCountries(value)
		},
	})
)
