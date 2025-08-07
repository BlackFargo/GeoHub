'use client'

import { CountrySearch } from './CountrySearch'
import { SelectCountryList } from './SelectContryList'

import { useEffect, useState } from 'react'
import { Typography } from '@mui/material'
import useDebounce from '@/shared/hooks/useDebounce'

import { useCountries } from '../model/useCountries'
import { RegionFilter } from './RegionFilter'

import { getCountriesWithRegion } from '../api/contryAPI'
import { useCountryList } from '../model/useCountryList'
import { useFilterCountries } from '../model/useFilterCountries'

export default function Container() {
	const { setCountry, countries, originalCountries } = useCountryList()

	const [value, setValue] = useState('')

	const setValueHandler = (e: React.ChangeEvent<HTMLInputElement>) =>
		setCountry(e.target.value)
	// const setValueHandler = (e: React.ChangeEvent<HTMLInputElement>) =>
	// 	setValue(e.target.value)
	const { debouncedValue } = useDebounce(value, 300)

	const { status } = useCountries(debouncedValue)

	return (
		<section>
			<Typography variant='h4' component={'h1'} sx={{ marginBottom: '20px' }}>
				Пошук інформації про країни
			</Typography>
			<CountrySearch searchCountry={setValueHandler} />
			<RegionFilter />
			<SelectCountryList countries={countries?.length && countries} />
		</section>
	)
}
