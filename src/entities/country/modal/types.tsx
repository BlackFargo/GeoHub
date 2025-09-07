import { z } from 'zod'
import { CountrySchema, WikiCountrySchema } from './schemas'

export type Country = z.infer<typeof CountrySchema>

export type WikiCountry = z.infer<typeof WikiCountrySchema>
export interface ISelectedRegion {
	id: string
	name: string
}
