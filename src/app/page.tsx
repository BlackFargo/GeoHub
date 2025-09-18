import { Container } from '@mui/material'

import MainCountries from '@/widgets/countries/main/MainCountries'

export default function Home() {
	return (
		<>
			<Container
				sx={{ pt: '150px', pb: '50px' }}
				maxWidth={false}
				component={'main'}
			>
				<MainCountries />
			</Container>
		</>
	)
}
