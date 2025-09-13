import { render, screen } from '@testing-library/react'
import { CountriesContainer } from '../ui/Сountries'

import { useQuery } from '@tanstack/react-query'

jest.mock('../model/useCountry', () => ({
	useCountryList: () => ({
		countries: [],
		setQuery: jest.fn(),
		setCountries: jest.fn(),
		setPopulation: jest.fn(),
		setRegions: jest.fn(),
		applyFilters: jest.fn(),
	}),
}))

jest.mock('@tanstack/react-query', () => ({
	useQuery: jest.fn(),
}))

describe('CountriesContainer', () => {
	beforeEach(() => {
		;(useQuery as jest.Mock).mockReturnValue({
			data: [],
			isLoading: false,
			error: null,
		})
	})

	it('renders title', () => {
		render(<CountriesContainer />)
		expect(screen.getByText(/Search for a country/i)).toBeInTheDocument()
	})

	it('renders country search input', () => {
		render(<CountriesContainer />)
		expect(screen.getByTestId('country-search')).toBeInTheDocument()
	})
	it('renders all regions', () => {
		render(<CountriesContainer />)
		const checkboxes = screen.getAllByRole('checkbox')
		expect(checkboxes).toHaveLength(6)
	})
	it('renders population filter inputs', () => {
		render(<CountriesContainer />)
		expect(screen.getByTestId('population-from')).toBeInTheDocument()
		expect(screen.getByTestId('population-to')).toBeInTheDocument()
	})
})
