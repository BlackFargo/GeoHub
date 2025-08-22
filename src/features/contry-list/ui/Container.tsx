'use client'

import { CountrySearch } from './CountrySearch'
import { SelectCountryList } from './SelectContryList'

import { useCallback, useEffect, useState } from 'react'
import { Typography } from '@mui/material'
import useDebounce from '@/shared/hooks/useDebounce'

import { RegionFilter } from './RegionFilter'

import { getCountries } from '../api/contryAPI'
import { useCountryList } from '../model/useCountryList'

import { PopulationFilter } from './PopulationFilter'
import { useQuery } from '@tanstack/react-query'

const regions = [
	{ id: 'region-1', name: 'Europe' },
	{ id: 'region-2', name: 'Asia' },
	{ id: 'region-3', name: 'Africa' },
	{ id: 'region-4', name: 'Americas' },
	{ id: 'region-5', name: 'Antarctic' },
	{ id: 'region-6', name: 'Oceania' },
] as const

export interface ISelectedRegion {
	id: string
	name: string
}

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
		...regions,
	])

	const { data, error } = useQuery({
		queryKey: ['countries'],
		queryFn: getCountries,
	})

	useEffect(() => {
		setCountries(data)
	}, [data])

	const setValueHandler = useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => {
			setValue(e.target.value)
		},
		[]
	)

	const { debouncedValue } = useDebounce(value, 300)

	const handleChange = (regionName: ISelectedRegion) => {
		setSelectedRegion(prev =>
			prev.some(item => item.name === regionName.name)
				? prev.filter(item => item.name !== regionName.name)
				: [...prev, regionName]
		)
	}

	useEffect(() => {
		setQuery(debouncedValue)
	}, [debouncedValue])

	useEffect(() => {
		setPopulation(populationValues.from, populationValues.to)
		setRegions(selectedRegion)
		applyFilters()
	}, [value, populationValues, selectedRegion])

	return (
		<section>
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
		</section>
	)
}
