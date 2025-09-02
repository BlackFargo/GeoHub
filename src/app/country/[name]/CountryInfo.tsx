'use client'
import { Container } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'next/navigation'
import { Typography } from '@mui/material'
import { getWikiCountry } from '@/entities/country/api/getWikiCountry'

export function CountryInfo() {
	const { name } = useParams<{ name: string }>()

	const { data, isLoading, error } = useQuery({
		queryKey: ['country', name],
		queryFn: () => getWikiCountry(name),

		staleTime: 1000 * 60 * 60 * 24,
	})

	if (error) return <div>Error loading country</div>

	return (
		<Container sx={{ marginTop: '200px' }} maxWidth={false}>
			{isLoading && <h1>Loading...</h1>}
			{data && (
				<>
					<Typography variant='h1'>{data.title}</Typography>
					<Typography variant='body1'>{data.extract}</Typography>
					{data.thumbnail && <img src={data.thumbnail} alt={data.title} />}
					<a href={data.fullurl} target='_blank' rel='noopener noreferrer'>
						More info
					</a>
				</>
			)}
		</Container>
	)
}
