'use client'
import { CircularProgress, Container, Box } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'next/navigation'
import { Typography } from '@mui/material'
import { getWikiCountry } from '@/entities/country/api/getWikiCountry'
import CountryCard from './CountryCard'

export function CountryInfo() {
	const { name } = useParams<{ name: string }>()

	const { data, isLoading, error } = useQuery({
		queryKey: ['country', name],
		queryFn: () => getWikiCountry(name),

		staleTime: 1000 * 60 * 60 * 24,
	})

	if (error) return <div>Error loading country</div>

	return (
		<Container
			sx={{ marginTop: '200px', position: 'relative' }}
			maxWidth={false}
		>
			{isLoading && (
				<Box
					display='flex'
					justifyContent='center'
					alignItems='center'
					height='100%'
				>
					<CircularProgress size={80} />
				</Box>
			)}

			{data && (
				<>
					<Box
						component='section'
						sx={{
							display: 'flex',
							gap: 2,
						}}
					>
						{/* Левая часть */}
						<Box
							sx={{
								display: 'flex',
								flexDirection: 'column',
								flexBasis: '80%',
							}}
						>
							<Box
								sx={{
									display: 'flex',

									gap: 1,
									flexDirection: { xs: 'column', sm: 'row' },
									mb: 2,
								}}
							>
								<Typography
									variant='h2'
									component='h1'
									sx={{ fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' } }}
								>
									{data.title}
								</Typography>
								{data.thumbnail && (
									<img width={80} src={data.thumbnail} alt={data.title} />
								)}
							</Box>
							<Typography variant='body1'>{data.extract}</Typography>
							<a href={data.fullurl} target='_blank' rel='noopener noreferrer'>
								More info
							</a>
						</Box>

						<CountryCard data={data} />
					</Box>
				</>
			)}
		</Container>
	)
}
