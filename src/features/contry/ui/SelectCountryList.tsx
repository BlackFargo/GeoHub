'use client'
import React from 'react'
import { VirtuosoGrid } from 'react-virtuoso'
import { Box, Typography, List, ListItem } from '@mui/material'
import NotFoundBlock from './NotFoundBlock'
import type { Country } from '../types'
import Image from 'next/image'
import Link from 'next/link'
export function SelectCountryList({
	countries,
	isLoading,
}: {
	countries: Country[] | null
	isLoading: boolean
}) {
	if (isLoading) return <h1>Loading...</h1>
	if (!countries?.length) return <NotFoundBlock />
	return (
		<VirtuosoGrid
			style={{ width: '100%' }}
			totalCount={countries.length}
			useWindowScroll
			listClassName='grid-list'
			components={{
				Item: ({ children, ...props }: React.ComponentProps<typeof Box>) => (
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
				List: React.forwardRef(function VirtuosoList(
					{
						style,
						children,
					}: { style?: React.CSSProperties; children?: React.ReactNode },
					ref
				) {
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
								<Typography variant='body2'>
									Region: {country.region}
								</Typography>
							</ListItem>
							<ListItem sx={{ p: 0 }}>
								<Typography variant='body2'>
									Population: {country.population}
								</Typography>
							</ListItem>
							<ListItem sx={{ p: 0 }}>
								<Typography variant='body2'>
									Capital: {country.capital}
								</Typography>
							</ListItem>
							<ListItem sx={{ p: 0 }}>
								<Typography variant='body2'>
									Languages: {Object.values(country.languages).join(', ')}
								</Typography>
							</ListItem>
							<ListItem sx={{ p: 0 }}>
								<Typography variant='body2'>
									Area: {country.area} km²
								</Typography>
							</ListItem>
						</List>
					</>
				)
			}}
		/>
	)
}
