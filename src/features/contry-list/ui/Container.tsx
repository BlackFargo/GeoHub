'use client'

import { CountrySearch } from './CountrySearch'
import { SelectCountryList } from './SelectContryList'

import { useCallback, useEffect, useState } from 'react'
import { Typography } from '@mui/material'
// import useDebounce from '@/shared/hooks/useDebounce'

import { RegionFilter } from './RegionFilter'

import { getCountries } from '../api/contryAPI'
import { useCountryList } from '../model/useCountryList'

import { PopulationFilter } from './PopulationFilter'
import { useQuery } from '@tanstack/react-query'
import { REGIONS } from '@/entities/country/constants'
import type { ISelectedRegion } from '@/entities/country/types'
import { z } from 'zod'
import { Container as MuiContainer } from '@mui/material'

const CountrySchema = z.object({
	area: z.number(),
	borders: z.array(z.string()).optional(),
	capital: z.array(z.string()).optional(),
	currencies: z
		.record(
			z.string(),
			z.object({
				name: z.string(),
				symbol: z.string().optional(),
			})
		)
		.optional(),
	flags: z.object({
		png: z.string().url(),
		svg: z.string().url(),
		alt: z.string().optional(),
	}),
	languages: z.record(z.string(), z.string()).optional(),
	name: z.object({
		common: z.string(),
		official: z.string(),
		nativeName: z
			.record(
				z.string(),
				z.object({
					official: z.string(),
					common: z.string(),
				})
			)
			.optional(),
	}),
	population: z.number(),
	region: z.string(),
	subregion: z.string().optional(),
})
const CountriesSchema = z.array(CountrySchema)

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
		select: rawData => {
			const parsed = CountriesSchema.safeParse(rawData)

			if (!parsed.success) {
				console.error('Zod validation error:', parsed.error)
				return null
			}

			return parsed.data
		},
		staleTime: 1000 * 60 * 60 * 24,
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
