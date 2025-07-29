export interface Country {
	name: {
		common: string
		official: string
		nativeName?: {
			[lang: string]: {
				official: string
				common: string
			}
		}
	}
	capital?: string[]
	flags: {
		png: string
		svg: string
		alt?: string
	}
	population: number
	region: string
	subregion?: string
	languages?: {
		[key: string]: string
	}
	currencies?: {
		[key: string]: {
			name: string
			symbol: string
		}
	}
	borders?: string[]
	area: number
}
