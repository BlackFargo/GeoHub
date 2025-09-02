import z from 'zod'

export const CountrySchema = z.object({
	area: z.number(),
	borders: z.array(z.string()).optional(),
	capital: z.array(z.string()).optional(),
	currencies: z
		.record(
			z.string(),
			z.object({
				name: z.string(),
				symbol: z.string().optional(),
			})
		)
		.optional(),
	flags: z.object({
		png: z.string().url(),
		svg: z.string().url(),
		alt: z.string().optional(),
	}),
	languages: z.record(z.string(), z.string()).optional(),
	name: z.object({
		common: z.string(),
		official: z.string(),
		nativeName: z
			.record(
				z.string(),
				z.object({
					official: z.string(),
					common: z.string(),
				})
			)
			.optional(),
	}),
	population: z.number(),
	region: z.string(),
	subregion: z.string().optional(),
})
export const CountriesSchema = z.array(CountrySchema)

export const WikiCountrySchema = z.object({
	title: z.string(),
	extract: z.string(),
	thumbnail: z.string().optional(),
	fullurl: z.string().optional(),
})
