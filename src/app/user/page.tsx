'use client'
import UserAvatar from '@/entities/user/userAvatar/UserAvatar'
import UserInfo from '@/entities/user/userInfo/UserInfo'
import { Container, Typography, Box } from '@mui/material'

export default function UserPage() {
	return (
		<>
			<Container maxWidth='lg' sx={{ mt: 20 }}>
				<Box>
					<UserAvatar />

					<UserInfo nickname='John Doe' email='john.doe@example.com' />
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
