'use client'
import Checkbox from '@mui/material/Checkbox'
import { useFilterCountries } from '../model/useFilterCountries'
import { useEffect, useState } from 'react'
const regions = [
	{ id: 'region-1', name: 'Europe' },
	{ id: 'region-2', name: 'Asia' },
	{ id: 'region-3', name: 'Africa' },
	{ id: 'region-4', name: 'Americas' },
	{ id: 'region-5', name: 'Antarctic' },
	{ id: 'region-6', name: 'Oceania' },
]

export function RegionFilter() {
	const [selectedRegion, setSelectedRegion] = useState([
		'Europe',
		'Asia',
		'Africa',
		'Americas',
		'Antarctic',
		'Oceania',
	])
	const { data, status } = useFilterCountries(selectedRegion)

	const handleChange = (regionName: string) => {
		if (selectedRegion.includes(regionName)) {
			setSelectedRegion(prev => prev.filter(item => item !== regionName))
		} else {
			setSelectedRegion([...selectedRegion, regionName])
		}
	}

	return (
		<div>
			{regions.map(region => (
				<label htmlFor={region.id} key={region.id}>
					<Checkbox
						id={region.id}
						checked={selectedRegion.includes(region.name) ? true : false}
						onChange={() => handleChange(region.name)}
					/>
					{region.name}
				</label>
			))}
		</div>
	)
}
