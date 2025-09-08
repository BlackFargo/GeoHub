import { Box, Typography } from '@mui/material'
import React from 'react'

export default function UserInfo({
	nickname,
	email,
}: {
	nickname: string
	email: string
}) {
	return (
		<Box component={'section'} aria-label='User information'>
			<Typography variant='h3' component={'h1'}>
				{nickname || 'User nickname'}
			</Typography>

			<Typography variant='body1'>{`User email: ${email || 'user@example.com'}`}</Typography>
		</Box>
	)
}
