'use client'

import React from 'react'
import { VirtuosoGrid } from 'react-virtuoso'
import { Box, Typography, List, ListItem } from '@mui/material'
import NotFoundBlock from './NotFoundBlock'
import { Country } from '../types'

export function SelectCountryList({
	countries,
}: {
	countries: Country[] | null
}) {
	if (!countries?.length) return <NotFoundBlock />

	return (
		<Box sx={{ height: '80vh', width: '100%', marginTop: '20px' }}>
			<VirtuosoGrid
				style={{ height: '100%', width: '100%' }}
				totalCount={countries.length}
				components={{
					Item: ({ children, ...props }) => (
						<Box
							{...props}
							sx={{
								border: '2px solid gray',
								padding: 1,
								display: 'flex',
								flexDirection: 'column',
								borderRadius: 2,
							}}
						>
							{children}
						</Box>
					),
					List: React.forwardRef(({ style, children }, ref) => (
						<Box
							ref={ref}
							style={style}
							sx={{
								display: 'grid',
								gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
								gap: 2,
							}}
						>
							{children}
						</Box>
					)),
				}}
				itemContent={index => {
					const contry = countries[index]

					return (
						<>
							<img src={contry.flags.png} width={200} height={200} />
							<List sx={{ p: 0 }}>
								<ListItem sx={{ p: 0 }}>
									<Typography variant='h6'>
										Країна: {contry.name.common}
									</Typography>
								</ListItem>
								<ListItem sx={{ p: 0 }}>
									<Typography variant='body2'>
										Регіон: {contry.region}
									</Typography>
								</ListItem>
								<ListItem sx={{ p: 0 }}>
									<Typography variant='body2'>
										Популяція: {contry.population}
									</Typography>
								</ListItem>
								<ListItem sx={{ p: 0 }}>
									<Typography variant='body2'>
										Столиця: {contry.capital}
									</Typography>
								</ListItem>
								<ListItem sx={{ p: 0 }}>
									<Typography variant='body2'>
										Мови: {Object.values(contry.languages).join(', ')}
									</Typography>
								</ListItem>
								<ListItem sx={{ p: 0 }}>
									<Typography variant='body2'>
										Область: {contry.area} км²
									</Typography>
								</ListItem>
							</List>
						</>
					)
				}}
			/>
		</Box>
	)
}
