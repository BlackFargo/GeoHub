import { Container } from '@mui/material'

import { CountriesContainer } from '@/features/contry/ui/Сountries'

export default function Home() {
	return (
		<>
			<Container
				sx={{ pt: '150px', pb: '50px' }}
				maxWidth={false}
				component={'main'}
			>
				<CountriesContainer />
			</Container>
		</>
	)
}
