'use client'
import { useCountryList } from '../model/useCountryList'
import { CountrySearch } from './CountrySearch'
import { SelectCountryList } from './SelectContryList'
import { getCountries } from '../api/contryAPI'
import { useEffect, useState } from 'react'
import { Typography } from '@mui/material'
import useDebounce from '@/shared/hooks/useDebounce'
import { useQuery } from '@tanstack/react-query'

export default function Container() {
	// const { searchCountry, countries, setCountries } = useCountryList()
	const { data, isLoading, isError } = useQuery({
		queryKey: ['contries'],
		queryFn: async () => getCountries(),
	})

	console.log(data)
	// const [value, setValue] = useState('')

	// const setValueHandler = (e: React.ChangeEvent<HTMLInputElement>) =>
	// 	setValue(e.target.value)

	// const { debouncedValue } = useDebounce(value, 300)
	// useEffect(() => {
	// 	setCountries()
	// }, [])

	// useEffect(() => {
	// 	searchCountry(debouncedValue)
	// }, [debouncedValue])
	return (
		<section>
			<Typography variant='h4' component={'h1'} sx={{ marginBottom: '20px' }}>
				Пошук інформації про країни
			</Typography>
			{/* <CountrySearch searchCountry={setValueHandler} /> */}
			<SelectCountryList countries={data} />
		</section>
	)
}
