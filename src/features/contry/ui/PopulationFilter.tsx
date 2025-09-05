import { Box, Input, Typography } from '@mui/material'

interface PopulationFilterProps {
	setPopulation: (value: { from: number; to: number }) => void
}

export function PopulationFilter({ setPopulation }: PopulationFilterProps) {
	return (
		<Box sx={{ mb: 2 }}>
			<Typography variant='h6' component='h2' sx={{ mb: 1 }}>
				Фільтр за населенням
			</Typography>
			<Box sx={{ display: 'flex', gap: 1 }}>
				<Input
					data-testid='population-from'
					type='number'
					placeholder='From'
					onChange={e =>
						setPopulation({ from: Number(e.target.value) || 0, to: 10_000_000 })
					}
					inputProps={{ min: 0 }}
					sx={{ flex: 1 }}
				/>
				<Input
					data-testid='population-to'
					type='number'
					placeholder='To'
					onChange={e =>
						setPopulation({ from: 0, to: Number(e.target.value) || 10_000_000 })
					}
					inputProps={{ min: 0 }}
					sx={{ flex: 1 }}
				/>
			</Box>
		</Box>
	)
}
