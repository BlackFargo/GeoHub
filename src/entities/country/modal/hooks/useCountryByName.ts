'use client'
import { useQuery } from '@tanstack/react-query'
import { getWikiCountry } from '../../api/getWikiCountry'
import type { WikiCountry } from '../types'

export function useCountryByName(name: string) {
	return useQuery<WikiCountry | null>({
		queryKey: ['country', name],
		queryFn: () => getWikiCountry(name),
		staleTime: 1000 * 60 * 60 * 24, // 24h
	})
}
