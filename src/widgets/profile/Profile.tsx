'use client'
import UserAvatar from '@/entities/user/userAvatar/UserAvatar'
import UserInfo from '@/entities/user/userInfo/UserInfo'
import useAuthStore from '@/features/auth/model/useAuthStore'

import { Container, Typography, Box } from '@mui/material'
import { LikedCountries } from '../countries/liked/LikedCountries'

export default function Profile() {
	const { user } = useAuthStore()
	return (
		<Container maxWidth='lg' sx={{ mt: 20 }}>
			<Box>
				<UserAvatar src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTfWzNRwbPV73suJ1TbZgZgE3HIzVGH3SG2w&s' />

				<UserInfo nickname={user?.displayName} email={user?.email} />
			</Box>
			<Box>
				<Typography variant='h4' component={'h2'}>
					Liked Countries
				</Typography>
				<LikedCountries />
			</Box>
		</Container>
	)
}
