'use client'
import { Container, Typography, Box } from '@mui/material'
import Image from 'next/image'

export default function UserPage() {
	return (
		<>
			<Container maxWidth='lg' sx={{ mt: 20 }}>
				<Box>
					<Image
						src='/path/to/image.jpg'
						width={100}
						height={100}
						alt='User Avatar'
					/>

					<Typography variant='h3' component={'h1'}>
						User nickname
					</Typography>

					<Typography variant='body1'>User email: user@example.com</Typography>
				</Box>
				<Box>
					<Typography variant='h4' component={'h2'}>
						Saved countries
					</Typography>
				</Box>
			</Container>
		</>
	)
}
