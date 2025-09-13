'use client'
import Checkbox from '@mui/material/Checkbox'
import { REGIONS } from '@/entities/country/modal/constants'
import { ISelectedRegion } from './Сountries'

export function RegionFilter({
	selectedRegion,
	handleChange,
}: {
	selectedRegion: ISelectedRegion[]
	handleChange: (region: ISelectedRegion) => void
}) {
	return (
		<div>
			{REGIONS.map(region => (
				<label htmlFor={region.id} key={region.id}>
					<Checkbox
						id={region.id}
						checked={
							selectedRegion?.some(item => item.name === region.name) ?? false
						}
						onChange={() => handleChange(region)}
					/>
					{region.name}
				</label>
			))}
		</div>
	)
}
