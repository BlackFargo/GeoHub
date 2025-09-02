'use client'

import React from 'react'
import { VirtuosoGrid } from 'react-virtuoso'
import { Box, Typography, List, ListItem } from '@mui/material'
import NotFoundBlock from './NotFoundBlock'
import type { Country } from '@/entities/country/modal/types'
import Image from 'next/image'
import Link from 'next/link'
export function SelectCountryList({
	countries,
}: {
	countries: Country[] | null
}) {
	if (!countries?.length) return <NotFoundBlock />

	return (
		<VirtuosoGrid
			style={{ width: '100%' }}
			totalCount={countries.length}
			useWindowScroll
			listClassName='grid-list'
			components={{
				Item: ({ children, ...props }) => (
					<Box
						{...props}
						sx={{
							border: '2px solid gray',
							borderRadius: 2,
							padding: 1,
							boxSizing: 'border-box',
							width: '100%',
							maxWidth: '300px',
							height: {
								xs: 310,
								sm: 330,
								md: 360,
							},
						}}
					>
						{children}
					</Box>
				),
				List: React.forwardRef(function VirtuosoList({ style, children }, ref) {
					return (
						<Box
							ref={ref}
							style={style}
							sx={{
								display: 'grid',
								gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',

								justifyItems: 'center',
								// '@media (max-width:550px)': {
								// 	justifyItems: 'center',
								// },
								gap: 2,
							}}
						>
							{children}
						</Box>
					)
				}),
			}}
			itemContent={index => {
				const country = countries[index]
				return (
					<>
						<Image
							src={country.flags.png}
							style={{
								objectFit: 'contain',
								height: '100px',
								width: '100%',
							}}
							height={100}
							width={160}
							alt={country.name.common}
						/>
						{/* <Image
							src={country.flags.png}
							alt={country.name.common}
							fill // заставляет Image занять весь родительский Box
							style={{ objectFit: 'cover' }}
						/> */}
						<List sx={{ p: 0 }}>
							<ListItem sx={{ p: 0 }}>
								<Link href={`/country/${country.name.common}`}>
									<Typography variant='h6'>{country.name.common}</Typography>
								</Link>
							</ListItem>
							<ListItem sx={{ p: 0 }}>
								<Typography variant='body2'>
									Регіон: {country.region}
								</Typography>
							</ListItem>
							<ListItem sx={{ p: 0 }}>
								<Typography variant='body2'>
									Популяція: {country.population}
								</Typography>
							</ListItem>
							<ListItem sx={{ p: 0 }}>
								<Typography variant='body2'>
									Столиця: {country.capital}
								</Typography>
							</ListItem>
							<ListItem sx={{ p: 0 }}>
								<Typography variant='body2'>
									Мови: {Object.values(country.languages).join(', ')}
								</Typography>
							</ListItem>
							<ListItem sx={{ p: 0 }}>
								<Typography variant='body2'>
									Область: {country.area} км²
								</Typography>
							</ListItem>
						</List>
					</>
				)
			}}
		/>
	)
}
