'use client'
import React from 'react'
import { VirtuosoGrid } from 'react-virtuoso'
import { Box } from '@mui/material'
import NotFoundBlock from './NotFoundBlock'
import type { Country } from '@/entities/country/modal/types'
import CountryPreviewCard from '@/entities/country/ui/CountryPreviewCard'

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
						component={'article'}
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
							component={'section'}
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
				return <CountryPreviewCard country={country} />
			}}
		/>
	)
}
