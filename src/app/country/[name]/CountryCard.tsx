'use client'
import { Card, CardContent, Typography, Box, Divider } from '@mui/material'

export default function CountryCard({ data }: { data: any }) {
	const {
		name,

		region,
		subregion,
		population,
		capital,
		languages,
		area,
		currencies,
		borders,
	} = data.countryInfo

	const items = [
		{ label: 'Region', value: region },
		{ label: 'Subregion', value: subregion },
		{ label: 'Population', value: population.toLocaleString() },
		{ label: 'Capital', value: capital.join(', ') },
		{ label: 'Languages', value: Object.values(languages).join(', ') },
		{ label: 'Area', value: `${area.toLocaleString()} km²` },
		{
			label: 'Currencies',
			value: Object.values(currencies)
				.map(c => `${c.name} (${c.symbol})`)
				.join(', '),
		},
		{
			label: 'Borders',
			value: borders.length > 0 ? borders.join(', ') : 'None',
		},
	]

	return (
		<Card
			sx={{
				maxWidth: 460,
				border: '1px solid #ddd',
				borderRadius: 2,
				height: '100%',
				boxShadow: 2,
				overflow: 'hidden',
				position: 'sticky',
				top: '60px',
			}}
		>
			{/* Заголовок с флагом и названием */}
			<Box
				sx={{
					display: 'flex',
					alignItems: 'center',
					p: 2,
					bgcolor: '#f9f9f9',
					borderBottom: '1px solid #ddd',
				}}
			>
				<Typography variant='h6'>{name.official}</Typography>
			</Box>

			<CardContent sx={{ p: 2 }}>
				<ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
					{items.map((item, idx) => (
						<li key={idx}>
							<Box
								sx={{
									display: 'flex',
									justifyContent: 'space-between',
									my: 1,
									flexWrap: 'wrap',
								}}
							>
								<Typography variant='body2' fontWeight='bold'>
									{item.label}:
								</Typography>
								<Typography variant='body2'>{item.value}</Typography>
							</Box>
							{idx < items.length - 1 && <Divider />}
						</li>
					))}
				</ul>
			</CardContent>
		</Card>
	)
}
