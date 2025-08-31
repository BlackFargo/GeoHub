'use client'
import { Container } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'next/navigation'
import { useState } from 'react'
import { z } from 'zod'

const countrySchema = z.object({
	batchcomplete: z.string(),
	continue: z.object({
		continue: z.string(),
		sroffset: z.number(),
	}),
	query: z.object({
		search: z.array(
			z.object({
				ns: z.number(),
				pageid: z.number(),
				size: z.number(),
				wordcount: z.number(),
				title: z.string(),
				snippet: z.string().optional(),
				timestamp: z.string().optional(),
			})
		),
		searchinfo: z.object({
			totalhits: z.number(),
			suggestion: z.string().optional(),
			suggestionsnippet: z.string().optional(),
		}),
	}),
})

export function CountryInfo() {
	const { name } = useParams<{ name: string }>()

	const { data, isLoading, error } = useQuery({
		queryKey: ['country', name],
		queryFn: () => fetch(`/api/wiki?q=${name}`).then(res => res.json()),
		select: rawData => {
			const parsed = countrySchema.safeParse(rawData)
			if (!parsed.success) {
				console.error('Invalid data format', parsed.error)
				return null
			}

			return parsed.data
		},
		staleTime: 1000 * 60 * 60 * 24,
	})
	console.log(isLoading)

	if (error) return <div>Error loading country</div>

	return (
		<Container sx={{ marginTop: '200px' }} maxWidth={false}>
			{isLoading && <h1>Loading...</h1>}
		</Container>
	)
}
