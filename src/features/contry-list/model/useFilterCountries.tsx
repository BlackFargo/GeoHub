import { useQuery } from '@tanstack/react-query'
import { useCountryList } from './useCountryList'
import { useEffect } from 'react'
import { getCountriesWithRegion } from '../api/contryAPI'

export function useFilterCountries(region: string[] | null) {
	const { setCountries, setStatus } = useCountryList()
	const { data, status } = useQuery({
		queryKey: ['countries', region],
		queryFn: async () => getCountriesWithRegion(region),

		staleTime: 1000 * 60 * 60 * 24,
	})

	useEffect(() => {
		if (data) setCountries(data)
		if (status) setStatus(status)
	}, [data, status])

	return { data, status }
}
