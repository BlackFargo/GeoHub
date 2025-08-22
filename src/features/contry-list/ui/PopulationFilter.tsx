import { Input, Typography } from '@mui/material'

export function PopulationFilter({ setPopulation }) {
	return (
		<>
			<Typography variant='h6' component='h2'>
				Фільтр за населенням
			</Typography>
			<Input
				type='number'
				placeholder='Від'
				onChange={e =>
					setPopulation({ from: Number(e.target.value), to: 10000000 })
				}
			/>
			<Input
				type='number'
				placeholder='До'
				onChange={e => setPopulation({ from: 0, to: Number(e.target.value) })}
			/>
		</>
	)
}
