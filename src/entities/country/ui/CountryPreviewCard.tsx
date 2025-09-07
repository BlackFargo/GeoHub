import React from 'react'
import { Typography, List, ListItem } from '@mui/material'
import Image from 'next/image'
import Link from 'next/link'
import type { Country } from '../modal/types'

export default function CountryPreviewCard({ country }: { country: Country }) {
	return (
		<>
			<Image
				src={country.flags.png}
				style={{
					objectFit: 'contain',
					height: '100px',
					width: '100%',
					marginBottom: '20px',
				}}
				height={100}
				width={160}
				alt={country.name.common}
			/>

			<List sx={{ p: 0 }}>
				<ListItem sx={{ p: 0 }}>
					<Link href={`/country/${country.name.common}`}>
						<Typography variant='h5'>{country.name.common}</Typography>
					</Link>
				</ListItem>
				<ListItem sx={{ p: 0 }}>
					<Typography variant='body2'>Region: {country.region}</Typography>
				</ListItem>
				<ListItem sx={{ p: 0 }}>
					<Typography variant='body2'>
						Population: {country.population}
					</Typography>
				</ListItem>
				<ListItem sx={{ p: 0 }}>
					<Typography variant='body2'>Capital: {country.capital}</Typography>
				</ListItem>
				<ListItem sx={{ p: 0 }}>
					<Typography variant='body2'>
						Languages: {Object.values(country.languages).join(', ')}
					</Typography>
				</ListItem>
				<ListItem sx={{ p: 0 }}>
					<Typography variant='body2'>Area: {country.area} km²</Typography>
				</ListItem>
				<ListItem sx={{ p: 0 }}>
					<Typography variant='body2'>
						Currency:{' '}
						{country.currencies
							? Object.values(country.currencies)
									.map(c => c.name)
									.join(', ')
							: 'N/A'}
					</Typography>
				</ListItem>
				<ListItem sx={{ p: 0 }}>
					{country.borders && country.borders.length > 0 ? (
						<Typography variant='body2'>
							Borders: {country.borders.join(', ')}
						</Typography>
					) : (
						<Typography variant='body2'>Borders: None</Typography>
					)}
				</ListItem>
			</List>
		</>
	)
}
