'use client'

import { CountrySearch } from './CountrySearch'
import { SelectCountryList } from './SelectContryList'
import { useCallback, useEffect, useState } from 'react'
import { Typography } from '@mui/material'
// import useDebounce from '@/shared/hooks/useDebounce'
import { RegionFilter } from './RegionFilter'
import { getCountries } from '@/entities/country/api/getCountries'
import { useCountryList } from '../model/useCountryList'
import { PopulationFilter } from './PopulationFilter'
import { useQuery } from '@tanstack/react-query'
import { REGIONS } from '@/entities/country/modal/constants'
import type { ISelectedRegion } from '@/entities/country/modal/types'

export default function Container() {
	const {
		countries,
		setQuery,
		setCountries,
		setPopulation,
		setRegions,
		applyFilters,
	} = useCountryList()

	const [value, setValue] = useState('')
	const [populationValues, setPopulationValues] = useState({
		from: 0,
		to: 10000000,
	})
	const [selectedRegion, setSelectedRegion] = useState<ISelectedRegion[]>([
		...REGIONS,
	])

	const { data, isLoading, error } = useQuery({
		queryKey: ['countries'],
		queryFn: getCountries,
	})

	useEffect(() => {
		if (data) {
			setCountries(data)
		}
	}, [data])

	const setValueHandler = useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => {
			setValue(e.target.value)
		},
		[]
	)

	// const { debouncedValue } = useDebounce(value, 300);

	const handleChange = (regionName: ISelectedRegion) => {
		setSelectedRegion(prev =>
			prev.some(item => item.name === regionName.name)
				? prev.filter(item => item.name !== regionName.name)
				: [...prev, regionName]
		)
	}

	useEffect(() => {
		setQuery(value)
	}, [value])

	useEffect(() => {
		setPopulation(populationValues.from, populationValues.to)
		setRegions(selectedRegion)
		applyFilters()
	}, [value, populationValues, selectedRegion])

	return (
		<>
			<Typography variant='h4' component={'h1'} sx={{ marginBottom: '20px' }}>
				Пошук інформації про країни
			</Typography>
			<CountrySearch searchCountry={setValueHandler} />
			<RegionFilter
				selectedRegion={selectedRegion}
				handleChange={handleChange}
			/>
			<PopulationFilter setPopulation={setPopulationValues} />
			<SelectCountryList countries={countries} />
		</>
	)
}
