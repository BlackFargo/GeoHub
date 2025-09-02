import { z } from 'zod'
import { CountrySchema } from './schemas'

export type Country = z.infer<typeof CountrySchema>

// export interface Country {
// 	name: { common: string }
// 	population: number
// 	region: string
// }

export interface ISelectedRegion {
	id: string
	name: string
}
