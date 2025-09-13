'use client'

import { CountrySearch } from './CountrySearch'
import { SelectCountryList } from './SelectCountryList'
import { useEffect } from 'react'
import { Typography } from '@mui/material'
import { useDebounce } from '@/shared/hooks/useDebounce'
import { RegionFilter } from './RegionFilter'
import { getCountries } from '@/entities/country/api/getCountries'
import { useCountryList } from '../model/useCountry'
import { PopulationFilter } from './PopulationFilter'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { likeCountry } from '@/entities/country/api/likeCountry'

// const map = {
// 	true: { message: 'Loading countries...', isLoading: true },
// 	false: { message: 'Error fetching countries', isLoading: false },
// }

export function CountriesContainer() {
	const {
		regions,
		query,
		countries,
		population,
		setQuery,
		setCountries,
		setPopulation,

		setRegions,
		applyFilters,
	} = useCountryList()

	const { data, isLoading, isError } = useQuery({
		queryKey: ['countries'],
		queryFn: getCountries,
	})

	const [localQuery, setLocalQuery] = useState('')
	const [localPopulation, setLocalPopulation] = useState(population)

	const debouncedQuery = useDebounce(localQuery, 200)
	const debouncedPopulation = useDebounce(localPopulation, 200)

	useEffect(() => {
		console.log(debouncedQuery)
		setQuery(debouncedQuery)
	}, [debouncedQuery])

	useEffect(() => {
		if (debouncedPopulation) {
			setPopulation({ ...debouncedPopulation })
		}
	}, [debouncedPopulation?.from, debouncedPopulation?.to])

	const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
		setLocalQuery(e.target.value)
	}

	const handlePopulationChange = ({
		from,
		to,
	}: {
		from: number
		to: number
	}) => {
		setLocalPopulation({ from, to })
	}

	useEffect(() => {
		if (data?.length) {
			setCountries(data)
			applyFilters()
		}
	}, [data])

	useEffect(() => {
		applyFilters()
	}, [query, population, regions])

	return (
		<>
			<Typography variant='h4' component={'h1'} sx={{ marginBottom: '20px' }}>
				Search for a country
			</Typography>
			<CountrySearch searchCountry={handleSearch} />
			<RegionFilter selectedRegion={regions} handleChange={setRegions} />
			<PopulationFilter setPopulation={handlePopulationChange} />
			<SelectCountryList
				countries={countries}
				isLoading={isLoading}
				likeCountry={likeCountry}
			/>
		</>
	)
}
