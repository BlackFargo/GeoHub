'use client'
import { CircularProgress, Container, Box } from '@mui/material'
import { useParams } from 'next/navigation'
import { Typography } from '@mui/material'

import { CountryInfoCard } from '@/entities/country/ui/CountryInfoCard'
import Breadcrumbs from '@/features/breadCrumbs/BreadCrumbs'
import { useCountryByName } from '@/entities/country/modal/hooks/useCountryByName'

export function CountryInfo() {
	const { name } = useParams<{ name: string }>()

	const { data, isLoading, error } = useCountryByName(name)

	if (error) return <div>Error loading country</div>

	return (
		<Container
			sx={{ pt: '150px', pb: '50px', position: 'relative' }}
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
					<Breadcrumbs
						items={[
							{ label: 'Home', href: `/` },
							{ label: data.title, href: `/country/${data.title}` },
						]}
					/>
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

						<CountryInfoCard data={data} />
					</Box>
				</>
			)}
		</Container>
	)
}
