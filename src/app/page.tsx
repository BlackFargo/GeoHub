import { Container } from '@mui/material'

import Container2 from '@/features/contry-list/ui/Container'

export default function Home() {
	return (
		<>
			<Container sx={{ pt: '200px' }} maxWidth={false}>
				<Container2 />
			</Container>
		</>
	)
}
