import { useQuery } from '@tanstack/react-query'
import { useCountryList } from './useCountryList'
import { useEffect } from 'react'
import { getCountries } from '../api/contryAPI'

export function useCountries(country: string) {
	const { countries, setCountries, setStatus } = useCountryList()
	const { data, status } = useQuery({
		queryKey: ['countries', country],
		queryFn: async () => getCountries(country),
		staleTime: 1000 * 60 * 60 * 24,
	})
	useEffect(() => {
		if (data) setCountries(data)
		if (status) setStatus(status)
	}, [data, status])

	return { countries, status }
}
